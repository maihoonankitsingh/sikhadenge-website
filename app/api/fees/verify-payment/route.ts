import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { collectionPrisma } from "@/lib/collection-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const collectionId = String(body?.collectionId || "").trim();
    const razorpay_order_id = String(body?.razorpay_order_id || "").trim();
    const razorpay_payment_id = String(body?.razorpay_payment_id || "").trim();
    const razorpay_signature = String(body?.razorpay_signature || "").trim();

    if (!collectionId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification fields." }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Razorpay secret is missing on server." }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await collectionPrisma.installmentCollection.updateMany({
        where: {
          id: collectionId,
          razorpayOrderId: razorpay_order_id,
        },
        data: {
          status: "FAILED",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      });

      return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
    }

    const existing = await collectionPrisma.installmentCollection.findFirst({
      where: {
        id: collectionId,
        razorpayOrderId: razorpay_order_id,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Collection record not found." }, { status: 404 });
    }

    const updated = await collectionPrisma.installmentCollection.update({
      where: { id: existing.id },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: updated.razorpayOrderId,
      paymentId: updated.razorpayPaymentId,
      amount: updated.amount,
    });
  } catch (error) {
    console.error("VERIFY_PAYMENT_ERROR", error);
    return NextResponse.json({ error: "Payment verification failed." }, { status: 500 });
  }
}
