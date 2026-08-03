import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireStudent } from "../../../lib/studentAuth";

// Phase 1: free/direct enroll. Payment gateway (Razorpay) plugs in here in Phase 5 —
// paid courses will require a verified Payment before this creates the Enrollment.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;

  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { courseId } = req.body || {};
  if (typeof courseId !== "string" || !courseId) {
    return res.status(400).json({ ok: false, error: "courseId required" });
  }

  const course = await prisma.course.findFirst({
    where: { id: courseId, isPublished: true },
    select: { id: true, priceInr: true },
  });
  if (!course) return res.status(404).json({ ok: false, error: "Course not found" });

  // Guard: paid courses cannot be free-enrolled until payment flow (Phase 5) is wired.
  if (course.priceInr > 0) {
    return res.status(402).json({ ok: false, error: "Payment required (coming soon)" });
  }

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    select: { id: true },
  });
  if (existing) return res.json({ ok: true, alreadyEnrolled: true });

  await prisma.enrollment.create({
    data: { userId: user.id, courseId: course.id, status: "ACTIVE" },
  });

  return res.json({ ok: true, enrolled: true });
}
