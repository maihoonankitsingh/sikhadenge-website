export const revalidate = 0;
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sha512(v: string) {
  return crypto.createHash("sha512").update(v).digest("hex").toLowerCase();
}

function s(v: any) {
  return String(v ?? "").trim();
}

function buildReverseHash(body: Record<string, any>, salt: string) {
  const status = s(body.status);
  const udf1 = s(body.udf1);
  const udf2 = s(body.udf2);
  const udf3 = s(body.udf3);
  const udf4 = s(body.udf4);
  const udf5 = s(body.udf5);
  const email = s(body.email);
  const firstname = s(body.firstname);
  const productinfo = s(body.productinfo);
  const amount = s(body.amount);
  const txnid = s(body.txnid);
  const key = s(body.key);
  const additionalCharges = s(body.additionalCharges);

  if (additionalCharges) {
    return sha512(
      [
        additionalCharges,
        salt,
        status,
        "", "", "", "", "",
        udf5,
        udf4,
        udf3,
        udf2,
        udf1,
        email,
        firstname,
        productinfo,
        amount,
        txnid,
        key,
      ].join("|")
    );
  }

  return sha512(
    [
      salt,
      status,
      "", "", "", "", "",
      udf5,
      udf4,
      udf3,
      udf2,
      udf1,
      email,
      firstname,
      productinfo,
      amount,
      txnid,
      key,
    ].join("|")
  );
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const body: Record<string, any> = {};
    fd.forEach((v, k) => {
      body[k] = typeof v === "string" ? v : "";
    });

    const salt = s(process.env.PAYU_SALT);
    const appUrl = s(process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL);

    if (!salt) {
      return NextResponse.json({ ok: false, error: "PAYU_SALT missing" }, { status: 500 });
    }
    if (!appUrl) {
      return NextResponse.json({ ok: false, error: "NEXT_PUBLIC_APP_URL or APP_URL missing" }, { status: 500 });
    }

    const postedHash = s(body.hash).toLowerCase();
    const expectedHash = buildReverseHash(body, salt);
    const hashValid = !!postedHash && postedHash === expectedHash;

    const status = s(body.status).toLowerCase();
    const txnid = s(body.txnid);
    const mihpayid = s(body.mihpayid);
    const admissionId = s(body.udf1);
    const fatherName = s(body.udf2);
    const gender = s(body.udf3);
    const course = s(body.udf4);
    const address1 = s(body.udf5);
    const amountNum = Number(s(body.amount) || "0");
    const isSuccess = hashValid && status === "success";

    try {
      const payment = await prisma.payment.upsert({
        where: { razorpayPaymentId: mihpayid || `payu_${txnid}` },
        create: {
          admissionId: admissionId || null,
          razorpayPaymentId: mihpayid || `payu_${txnid}`,
          razorpayOrderId: txnid || null,
          razorpaySignature: postedHash || null,
          event: "payu.response",
          status: isSuccess ? "captured" : "failed",
          amount: Number.isFinite(amountNum) ? Math.floor(amountNum) : null,
          currency: "INR",
          raw: body,
          receivedAt: new Date(),
        },
        update: {
          admissionId: admissionId || undefined,
          razorpayOrderId: txnid || undefined,
          razorpaySignature: postedHash || undefined,
          status: isSuccess ? "captured" : "failed",
          amount: Number.isFinite(amountNum) ? Math.floor(amountNum) : undefined,
          currency: "INR",
          raw: body,
          receivedAt: new Date(),
        },
      });

      if (admissionId) {
        await prisma.admission.update({
          where: { id: admissionId },
          data: {
            feePaid: isSuccess && Number.isFinite(amountNum) ? Math.floor(amountNum) : undefined,
            updatedAt: new Date(),
          },
        });

        if (!payment.admissionId) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { admissionId },
          });
        }
      }
    } catch (e) {
      console.error("PAYU_RESPONSE_DB_ERROR", e);
    }

    if (isSuccess) {
      const url = new URL("/admission-payu/complete", appUrl);
      if (txnid) url.searchParams.set("orderId", txnid);
      if (mihpayid) url.searchParams.set("paymentId", mihpayid);
      if (admissionId) url.searchParams.set("admissionId", admissionId);
      return NextResponse.redirect(url, { status: 303 });
    }

    const failUrl = new URL("/admission-payu", appUrl);
    failUrl.searchParams.set("payu", "failed");
    if (txnid) failUrl.searchParams.set("txnid", txnid);
    if (!hashValid) failUrl.searchParams.set("reason", "hash");
    else if (status) failUrl.searchParams.set("reason", status);
    return NextResponse.redirect(failUrl, { status: 303 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
