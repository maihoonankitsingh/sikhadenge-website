import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    console.log("STORE_VERIFY_PAYMENT_HIT", JSON.stringify(body || {}));
    console.log("STORE_VERIFY_PAYMENT_HIT", JSON.stringify(body || {}));

    const razorpay_order_id = String(body?.razorpay_order_id || "").trim();
    const razorpay_payment_id = String(body?.razorpay_payment_id || "").trim();
    const razorpay_signature = String(body?.razorpay_signature || "").trim();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "Razorpay secret is not configured" },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("STORE_VERIFY_PAYMENT_SIGNATURE_MISMATCH", JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id
      }));
      console.error("STORE_VERIFY_PAYMENT_SIGNATURE_MISMATCH", JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id
      }));
      await prisma.storeOrder.updateMany({
        where: { paymentOrderId: razorpay_order_id },
        data: {
          paymentStatus: "FAILED",
          paymentId: razorpay_payment_id,
          paymentSignature: razorpay_signature,
        },
      });

      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const order = await prisma.storeOrder.findFirst({
      where: { paymentOrderId: razorpay_order_id },
      include: {
        product: {
          select: {
            slug: true,
            title: true,
            price: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Store order not found" },
        { status: 404 }
      );
    }

    console.log("STORE_VERIFY_PAYMENT_MATCHED", JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      storeOrderId: order.id
    }));

    console.log("STORE_VERIFY_PAYMENT_MATCHED", JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      storeOrderId: order.id
    }));

    const updated = await prisma.storeOrder.update({
      where: { id: order.id },
      data: {
        paymentStatus: "PAID",
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
      },
      include: {
        product: {
          select: {
            slug: true,
            title: true,
            price: true,
          },
        },
      },
    });

    console.log("STORE_VERIFY_PAYMENT_OK", JSON.stringify({
      storeOrderId: updated.id,
      paymentStatus: updated.paymentStatus,
      paymentId: updated.paymentId
    }));

    console.log("STORE_VERIFY_PAYMENT_OK", JSON.stringify({
      storeOrderId: updated.id,
      paymentStatus: updated.paymentStatus,
      paymentId: updated.paymentId
    }));

    return NextResponse.json({
      success: true,
      storeOrderId: updated.id,
      paymentStatus: updated.paymentStatus,
      product: updated.product,
      redirectUrl: `/payment-success?storeOrderId=${updated.id}`,
    });
  } catch (error: any) {
    console.error("STORE_VERIFY_PAYMENT_ERROR", error?.message || error);
    return NextResponse.json(
      { success: false, error: "Unable to verify store payment" },
      { status: 500 }
    );
  }
}
