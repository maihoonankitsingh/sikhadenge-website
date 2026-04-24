import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const razorpay_payment_id = String(form.get("razorpay_payment_id") || "").trim();
    const razorpay_order_id = String(form.get("razorpay_order_id") || "").trim();
    const razorpay_signature = String(form.get("razorpay_signature") || "").trim();

    console.log("STORE_RAZORPAY_CALLBACK_HIT", JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
    }));

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.redirect(new URL("/checkout/welcome?status=failed", req.url));
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const order = await prisma.storeOrder.findFirst({
      where: { paymentOrderId: razorpay_order_id },
    });

    if (!order) {
      console.error("STORE_RAZORPAY_CALLBACK_ORDER_NOT_FOUND", razorpay_order_id);
      return NextResponse.redirect(new URL("/checkout/welcome?status=missing-order", req.url));
    }

    if (expectedSignature !== razorpay_signature) {
      await prisma.storeOrder.update({
        where: { id: order.id },
        data: {
          paymentStatus: "FAILED",
          paymentId: razorpay_payment_id,
          paymentSignature: razorpay_signature,
        },
      });

      console.error("STORE_RAZORPAY_CALLBACK_SIGNATURE_MISMATCH", razorpay_order_id);
      return NextResponse.redirect(new URL(`/checkout/welcome?storeOrderId=${order.id}&status=failed`, req.url));
    }

    await prisma.storeOrder.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
      },
    });

    console.log("STORE_RAZORPAY_CALLBACK_OK", JSON.stringify({
      storeOrderId: order.id,
      razorpay_order_id,
      razorpay_payment_id,
    }));

    return NextResponse.redirect(new URL(`/checkout/welcome?storeOrderId=${order.id}`, req.url));
  } catch (error: any) {
    console.error("STORE_RAZORPAY_CALLBACK_ERROR", error?.message || error);
    return NextResponse.redirect(new URL("/checkout/welcome?status=error", req.url));
  }
}
