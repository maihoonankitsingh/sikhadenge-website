// =============================================================
// Enrollment service — student ko course me enroll karna.
//
// Phase 1: free/direct enroll. Phase 5 me Razorpay yahin plug hoga —
// paid course ke liye pehle verified Payment check hoga, phir enrollment.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";

export type EnrollResult = { enrolled: boolean; alreadyEnrolled?: boolean };

export async function enrollStudent(userId: string, courseId: unknown): Promise<ServiceResult<EnrollResult>> {
  if (typeof courseId !== "string" || !courseId) {
    return serviceFail(400, "courseId required");
  }

  const course = await prisma.course.findFirst({
    where: { id: courseId, isPublished: true },
    select: { id: true, priceInr: true },
  });
  if (!course) return serviceFail(404, "Course not found");

  // Paid courses cannot be free-enrolled until the payment flow (Phase 5) is wired.
  if (course.priceInr > 0) return serviceFail(402, "Payment required (coming soon)");

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
    select: { id: true },
  });
  if (existing) return serviceOk({ enrolled: true, alreadyEnrolled: true });

  await prisma.enrollment.create({
    data: { userId, courseId: course.id, status: "ACTIVE" },
  });

  return serviceOk({ enrolled: true });
}
