// =============================================================
// Payment service (Phase 5 · Razorpay).
//
// Flow:
//  1. createCourseOrder -> Razorpay order + Payment(created). Coupon
//     (influencer promo code) ho to discount lagta hai.
//  2. Client Razorpay checkout kholta hai -> pay karta hai.
//  3. verifyAndEnroll -> signature verify -> Payment(paid) + Enrollment.
//
// Ye paid-course enrollment ka single rasta hai (free course enroll.ts se).
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { isRazorpayConfigured, razorpayKeyId, createOrder, verifyPaymentSignature } from "../razorpay";
import { notify } from "../notify";

function referralDiscountPercent(): number {
  const p = parseInt(process.env.REFERRAL_DISCOUNT_PERCENT || "10", 10);
  if (Number.isNaN(p) || p < 0) return 0;
  return Math.min(100, p);
}

/** Coupon (influencer promo code) valid ho to discount % return karo. */
async function resolveCoupon(couponCode: string | undefined): Promise<{ code: string; percent: number } | null> {
  if (!couponCode) return null;
  const code = couponCode.trim().toUpperCase().replace(/\s+/g, "");
  if (!code) return null;
  const influencer = await prisma.influencer.findUnique({
    where: { promoCode: code },
    select: { isActive: true },
  });
  if (!influencer || !influencer.isActive) return null;
  return { code, percent: referralDiscountPercent() };
}

export type CreateOrderResult = {
  orderId: string;
  amountInr: number;
  keyId: string;
  courseTitle: string;
  discountInr: number;
};

export async function createCourseOrder(
  userId: string,
  courseId: unknown,
  couponCode?: unknown
): Promise<ServiceResult<CreateOrderResult>> {
  if (!isRazorpayConfigured()) return serviceFail(503, "Payments not configured");
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");

  const course = await prisma.course.findFirst({
    where: { id: courseId, isPublished: true },
    select: { id: true, title: true, priceInr: true },
  });
  if (!course) return serviceFail(404, "Course not found");
  if (course.priceInr <= 0) return serviceFail(400, "This is a free course — enroll directly");

  const already = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
    select: { id: true },
  });
  if (already) return serviceFail(409, "Already enrolled");

  const coupon = await resolveCoupon(typeof couponCode === "string" ? couponCode : undefined);
  const discountInr = coupon ? Math.floor((course.priceInr * coupon.percent) / 100) : 0;
  const payable = Math.max(1, course.priceInr - discountInr);

  let order;
  try {
    order = await createOrder(payable, `course_${course.id}_${Date.now()}`, {
      userId,
      courseId: course.id,
      coupon: coupon?.code || "",
    });
  } catch (e) {
    return serviceFail(502, e instanceof Error ? e.message : "Order failed");
  }

  await prisma.payment.create({
    data: {
      userId,
      courseId: course.id,
      razorpayOrderId: order.id,
      amountInr: payable,
      baseAmountInr: course.priceInr,
      couponCode: coupon?.code || null,
      status: "created",
    },
  });

  return serviceOk({
    orderId: order.id,
    amountInr: payable,
    keyId: razorpayKeyId(),
    courseTitle: course.title,
    discountInr,
  });
}

export type VerifyInput = {
  razorpayOrderId?: unknown;
  razorpayPaymentId?: unknown;
  razorpaySignature?: unknown;
};

export async function verifyAndEnroll(
  userId: string,
  input: VerifyInput
): Promise<ServiceResult<{ enrolled: boolean; courseId: string }>> {
  const orderId = input.razorpayOrderId;
  const paymentId = input.razorpayPaymentId;
  const signature = input.razorpaySignature;

  if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
    return serviceFail(400, "Invalid payment payload");
  }

  const payment = await prisma.payment.findUnique({
    where: { razorpayOrderId: orderId },
    select: { id: true, userId: true, courseId: true, status: true },
  });
  if (!payment || payment.userId !== userId) return serviceFail(404, "Payment not found");
  if (payment.status === "paid") return serviceOk({ enrolled: true, courseId: payment.courseId });

  const valid = verifyPaymentSignature(orderId, paymentId, signature);
  if (!valid) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "failed", razorpayPaymentId: paymentId } });
    return serviceFail(400, "Payment verification failed");
  }

  // Signature valid -> enroll + mark paid.
  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId, courseId: payment.courseId } },
    create: { userId, courseId: payment.courseId, status: "ACTIVE" },
    update: {},
    select: { id: true },
  });

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "paid", razorpayPaymentId: paymentId, enrollmentId: enrollment.id },
  });

  const course = await prisma.course.findUnique({ where: { id: payment.courseId }, select: { title: true, slug: true } });
  await notify({
    userId,
    type: "payment",
    title: "Payment successful 🎉",
    body: `You are enrolled in "${course?.title || "the course"}". Start learning now!`,
    link: course?.slug ? `/student/learn/${course.slug}` : "/student",
  }).catch(() => null);

  return serviceOk({ enrolled: true, courseId: payment.courseId });
}
