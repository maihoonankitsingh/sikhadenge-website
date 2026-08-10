import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendMetaConversionEvent } from "@/lib/metaConversions";

const TRACKED_CHECKOUT_SLUG = "ai-prompt-starter-pack";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function finiteNumber(value: unknown): number | null {
  const numberValue = Number(value);

  return Number.isFinite(numberValue)
    ? numberValue
    : null;
}

function splitCustomerName(name: string) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.length > 1
      ? parts.slice(1).join(" ")
      : "",
  };
}

function purchaseTracking(order: any) {
  const pricingMeta = asRecord(order?.pricingMeta);

  const value =
    finiteNumber(pricingMeta?.totalAmount) ??
    finiteNumber(order?.amount) ??
    0;

  const tax =
    finiteNumber(pricingMeta?.gstAmount) ??
    finiteNumber(order?.gstAmount) ??
    0;

  const contentIds = [
    order?.product?.slug,
    order?.bumpProduct?.slug,
  ].filter((value): value is string => Boolean(value));

  return {
    eventId: `store_purchase_${order.id}`,
    value,
    tax,
    currency: String(order?.currency || "INR"),
    contentIds,
  };
}

async function sendTrackedCheckoutPurchase(
  req: NextRequest,
  order: any,
) {
  if (order?.product?.slug !== TRACKED_CHECKOUT_SLUG) {
    return;
  }

  const tracking = purchaseTracking(order);
  const { firstName, lastName } = splitCustomerName(order.name);

  const eventSourceUrl =
    req.headers.get("referer") ||
    order.landingPage ||
    `https://sikhadenge.in/checkout/${TRACKED_CHECKOUT_SLUG}`;

  const result = await sendMetaConversionEvent({
    req,
    eventName: "Purchase",
    eventId: tracking.eventId,
    eventSourceUrl,
    user: {
      email: order.email || undefined,
      phone: order.phone || undefined,
      firstName,
      lastName,
    },
    customData: {
      currency: tracking.currency,
      value: tracking.value,
      content_ids: tracking.contentIds,
      content_type: "product",
      contents: tracking.contentIds.map((id) => ({
        id,
        quantity: 1,
      })),
      order_id: order.id,
      tax: tracking.tax,
    },
  });

  console.log("STORE_META_CAPI_PURCHASE", {
    storeOrderId: order.id,
    eventId: tracking.eventId,
    status: result.status,
    reason: result.reason || null,
    httpStatus: result.httpStatus || null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

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

    const signatureMatches =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf8"),
        Buffer.from(razorpay_signature, "utf8"),
      );

    if (!signatureMatches) {
      console.error("STORE_VERIFY_PAYMENT_SIGNATURE_MISMATCH", {
        razorpay_order_id,
        razorpay_payment_id,
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
        bumpProduct: {
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

    if (order.paymentStatus === "PAID") {
      if (order.paymentId === razorpay_payment_id) {
        const tracking = purchaseTracking(order);

        console.log("STORE_VERIFY_PAYMENT_IDEMPOTENT_OK", {
          razorpay_order_id,
          razorpay_payment_id,
          storeOrderId: order.id,
        });

        return NextResponse.json({
          success: true,
          storeOrderId: order.id,
          paymentStatus: order.paymentStatus,
          product: order.product,
          tracking: {
            metaEventId: tracking.eventId,
            value: tracking.value,
            tax: tracking.tax,
            currency: tracking.currency,
            contentIds: tracking.contentIds,
          },
          redirectUrl: `/payment-success?storeOrderId=${order.id}`,
        });
      }

      console.error("STORE_VERIFY_PAYMENT_ALREADY_PAID_CONFLICT", {
        razorpay_order_id,
        incomingPaymentId: razorpay_payment_id,
        existingPaymentId: order.paymentId,
        storeOrderId: order.id,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Store order is already paid with a different payment",
        },
        { status: 409 }
      );
    }

    console.log("STORE_VERIFY_PAYMENT_MATCHED", {
      razorpay_order_id,
      razorpay_payment_id,
      storeOrderId: order.id,
    });

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
        bumpProduct: {
          select: {
            slug: true,
            title: true,
            price: true,
          },
        },
      },
    });

    console.log("STORE_VERIFY_PAYMENT_OK", {
      storeOrderId: updated.id,
      paymentStatus: updated.paymentStatus,
      paymentId: updated.paymentId,
    });

    try {
      await sendTrackedCheckoutPurchase(req, updated);
    } catch (trackingError) {
      console.error("STORE_META_CAPI_PURCHASE_UNEXPECTED_ERROR", {
        storeOrderId: updated.id,
        error:
          trackingError instanceof Error
            ? trackingError.message
            : "unknown",
      });
    }

    const tracking = purchaseTracking(updated);

    return NextResponse.json({
      success: true,
      storeOrderId: updated.id,
      paymentStatus: updated.paymentStatus,
      product: updated.product,
      tracking: {
        metaEventId: tracking.eventId,
        value: tracking.value,
        tax: tracking.tax,
        currency: tracking.currency,
        contentIds: tracking.contentIds,
      },
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
