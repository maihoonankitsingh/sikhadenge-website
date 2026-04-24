export const revalidate = 0;
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


const DEBUG_VERSION = "verify-2026-02-22-02";
function hmac(secret: string, data: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

function asStr(v: any) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function asInt(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, form } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ ok: false, error: "Missing payment fields" }, { status: 400 });
    }

    const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    if (!secret) {
      return NextResponse.json({ ok: false, error: "RAZORPAY_KEY_SECRET missing" }, { status: 500 });
    }

    const expected = hmac(secret, `${razorpay_order_id}|${razorpay_payment_id}`);
    if (expected !== razorpay_signature) {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
    }

    // ---- DB save (best-effort; should not break checkout) ----
    let dbSaved = false;
    let admissionId: string | null = null;

    try {
      // admissionId can be passed either as top-level or inside form
      admissionId = asStr((body && (body.admissionId ?? body?.form?.admissionId)) || "").trim() || null;

      // optional fields (only used if present)
      const amountRupees =
        asInt(body?.amountRupees ?? body?.amountInRupees ?? body?.amount ?? body?.form?.amountRupees ?? body?.form?.amount) ?? null;

      const currency = asStr(body?.currency ?? body?.form?.currency ?? "INR").trim() || "INR";

      // Create/update Payment (idempotent by unique razorpayPaymentId)
      const payment = await prisma.payment.upsert({
        where: { razorpayPaymentId: asStr(razorpay_payment_id) },
        create: {
          admissionId: admissionId,
          razorpayPaymentId: asStr(razorpay_payment_id),
          razorpayOrderId: asStr(razorpay_order_id),
          razorpaySignature: asStr(razorpay_signature),
          event: "checkout.verify",
          status: "captured", // signature verified on client flow; actual capture status can be refined via webhook later
          amount: amountRupees,
          currency,
          raw: body ?? null,
          receivedAt: new Date(),
        },
        update: {
          admissionId: admissionId ?? undefined,
          razorpayOrderId: asStr(razorpay_order_id),
          razorpaySignature: asStr(razorpay_signature),
          status: "captured",
          amount: amountRupees ?? undefined,
          currency,
          raw: body ?? null,
          receivedAt: new Date(),
        },
      });

      // Update Admission feePaid if admissionId is available
      if (admissionId) {
        // feePaid: if amount provided, set to amount; else keep existing
        const upd: any = { updatedAt: new Date() };
        if (amountRupees != null) upd.feePaid = amountRupees;

        await prisma.admission.update({
          where: { id: admissionId },
          data: upd,
        });

        // Ensure payment.admissionId set if admission row exists
        if (!payment.admissionId) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { admissionId },
          });
        }
      }

      dbSaved = true;
    } catch (e: any) {
      console.error("ADMISSION_VERIFY_DB_ERROR", e);
        console.log("ADMISSION_VERIFY_DB_ERROR_STR", String(((e as any)?.stack || e) ?? ""));
// continue; do not fail payment success response
    }

    return NextResponse.json({
      ok: true,
      dbSaved,
      admissionId,
      debugVersion: DEBUG_VERSION,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
