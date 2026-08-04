// =============================================================
// Certificate service (Phase 6).
// Course 100% complete -> certificate auto-issue (unique serial).
// Public verify: koi bhi serial se certificate check kar sakta hai.
// =============================================================

import crypto from "crypto";
import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { notify } from "../notify";
import { awardXp, awardBadge } from "./gamification";

const XP_CERTIFICATE = 100;

function makeSerial(): string {
  // e.g. SD-4F9K2A7C
  return `SD-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

/**
 * Agar user ne course ke saare lessons complete kar liye -> certificate
 * issue karo (idempotent). progress save hone ke baad call hota hai.
 */
export async function issueIfComplete(userId: string, courseId: string): Promise<void> {
  const existing = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  if (existing) return;

  const totalLessons = await prisma.lesson.count({ where: { module: { courseId } } });
  if (totalLessons === 0) return;

  const completed = await prisma.lessonProgress.count({
    where: { userId, completed: true, lesson: { module: { courseId } } },
  });
  if (completed < totalLessons) return;

  const course = await prisma.course.findUnique({ where: { id: courseId }, select: { title: true } });

  // Serial unique hone tak retry.
  let serial = makeSerial();
  for (let i = 0; i < 5; i++) {
    const clash = await prisma.certificate.findUnique({ where: { serial }, select: { id: true } });
    if (!clash) break;
    serial = makeSerial();
  }

  await prisma.certificate
    .create({ data: { userId, courseId, serial } })
    .catch(() => null);

  await awardXp(userId, XP_CERTIFICATE).catch(() => null);
  await awardBadge(userId, "graduate").catch(() => null);

  await notify({
    userId,
    type: "certificate",
    title: "🎉 Certificate unlocked!",
    body: `Aapne "${course?.title || "course"}" complete kar liya. Apna certificate dekho.`,
    link: `/certificate/${serial}`,
  });
}

export async function listMyCertificates(userId: string) {
  const certs = await prisma.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
    select: { serial: true, issuedAt: true, course: { select: { title: true } } },
  });
  return serviceOk({ certificates: certs });
}

/** Public verify — koi auth nahi. Serial se certificate details. */
export async function getCertificateBySerial(serial: unknown): Promise<ServiceResult<unknown>> {
  if (typeof serial !== "string" || !serial) return serviceFail(400, "serial required");
  const cert = await prisma.certificate.findUnique({
    where: { serial },
    select: {
      serial: true,
      issuedAt: true,
      user: { select: { name: true } },
      course: { select: { title: true } },
    },
  });
  if (!cert) return serviceFail(404, "Certificate not found");
  return serviceOk({
    certificate: {
      serial: cert.serial,
      issuedAt: cert.issuedAt,
      studentName: cert.user.name,
      courseTitle: cert.course.title,
    },
  });
}
