export const revalidate = 0;

import crypto from "crypto";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAdmissionCompletionToken } from "@/lib/admission-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function asString(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : value == null
      ? ""
      : String(value).trim();
}

function verifySignature(
  secret: string,
  orderId: string,
  paymentId: string,
  signature: string
) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  try {
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");

    return (
      expectedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    );
  } catch {
    return false;
  }
}

function jsonSafe(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}

function successResponse(admissionId: string) {
  const token = createAdmissionCompletionToken(admissionId);

  const response = NextResponse.json({
    ok: true,
    admissionId,
    next: "/admission/complete",
  });

  response.cookies.set("sd_admission_complete", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 60 * 60,
  });

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = asString(body?.razorpay_order_id);
    const paymentId = asString(body?.razorpay_payment_id);
    const signature = asString(body?.razorpay_signature);

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { ok: false, error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const keyId = String(process.env.RAZORPAY_KEY_ID || "").trim();
    const keySecret = String(process.env.RAZORPAY_KEY_SECRET || "").trim();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { ok: false, error: "Payment configuration unavailable" },
        { status: 503 }
      );
    }

    if (!verifySignature(keySecret, orderId, paymentId, signature)) {
      return NextResponse.json(
        { ok: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const existingPayment = await prisma.payment.findUnique({
      where: {
        razorpayPaymentId: paymentId,
      },
      select: {
        admissionId: true,
        status: true,
      },
    });

    if (
      existingPayment?.status === "captured" &&
      existingPayment.admissionId
    ) {
      return successResponse(existingPayment.admissionId);
    }

    const pendingPayment = await prisma.payment.findFirst({
      where: {
        razorpayOrderId: orderId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (
      !pendingPayment ||
      !pendingPayment.admissionId ||
      pendingPayment.amount == null
    ) {
      return NextResponse.json(
        { ok: false, error: "Payment order is not linked to an admission" },
        { status: 404 }
      );
    }

    const admission = await prisma.admission.findUnique({
      where: {
        id: pendingPayment.admissionId,
      },
      select: {
        id: true,
        feeTotal: true,
        feePaid: true,
      },
    });

    if (!admission || admission.feeTotal !== pendingPayment.amount) {
      return NextResponse.json(
        { ok: false, error: "Admission fee record mismatch" },
        { status: 409 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const gatewayPayment: any = await razorpay.payments.fetch(paymentId);

    const gatewayOrderId = asString(gatewayPayment?.order_id);
    const gatewayCurrency = asString(gatewayPayment?.currency).toUpperCase();
    const gatewayStatus = asString(gatewayPayment?.status).toLowerCase();
    const gatewayAmountPaise = Number(gatewayPayment?.amount);

    if (gatewayOrderId !== orderId) {
      return NextResponse.json(
        { ok: false, error: "Payment order mismatch" },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(gatewayAmountPaise) ||
      gatewayAmountPaise !== pendingPayment.amount * 100
    ) {
      return NextResponse.json(
        { ok: false, error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    if (gatewayCurrency !== "INR") {
      return NextResponse.json(
        { ok: false, error: "Payment currency mismatch" },
        { status: 400 }
      );
    }

    if (gatewayStatus !== "captured") {
      return NextResponse.json(
        {
          ok: false,
          error: `Payment is not captured yet (${gatewayStatus || "unknown"})`,
        },
        { status: 409 }
      );
    }

    try {
      await prisma.$transaction([
        prisma.payment.update({
          where: {
            id: pendingPayment.id,
          },
          data: {
            razorpayPaymentId: paymentId,
            razorpaySignature: signature,
            event: "checkout.verified",
            status: "captured",
            amount: pendingPayment.amount,
            currency: "INR",
            receivedAt: new Date(),
            raw: jsonSafe({
              callback: {
                razorpay_order_id: orderId,
                razorpay_payment_id: paymentId,
                razorpay_signature: signature,
              },
              gatewayPayment,
            }),
          },
        }),
        prisma.admission.update({
          where: {
            id: admission.id,
          },
          data: {
            feePaid: pendingPayment.amount,
          },
        }),
      ]);
    } catch (transactionError: any) {
      if (transactionError?.code === "P2002") {
        const duplicate = await prisma.payment.findUnique({
          where: {
            razorpayPaymentId: paymentId,
          },
          select: {
            admissionId: true,
            status: true,
          },
        });

        if (duplicate?.status === "captured" && duplicate.admissionId) {
          return successResponse(duplicate.admissionId);
        }
      }

      throw transactionError;
    }

    return successResponse(admission.id);
  } catch (error) {
    console.error("ADMISSION_VERIFY_ERROR", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Payment verification failed. Contact support with payment ID.",
      },
      { status: 500 }
    );
  }
}
