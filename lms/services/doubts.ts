// =============================================================
// Doubts / discussion service (Phase 4b).
// Student course me doubt puchta hai; team (admin) ya peers reply karte
// hain; team reply "staff" tag ke saath highlight hoti hai.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { notify } from "../notify";

const STAFF_NAME = "Sikhadenge Team";

async function isEnrolled(userId: string, courseId: string): Promise<boolean> {
  const enr = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  return Boolean(enr);
}

// ---------- Student ----------

export async function listDoubts(userId: string, courseId: unknown): Promise<ServiceResult<unknown>> {
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");
  if (!(await isEnrolled(userId, courseId))) return serviceFail(403, "Not enrolled");

  const doubts = await prisma.doubt.findMany({
    where: { courseId },
    orderBy: [{ resolved: "asc" }, { createdAt: "desc" }],
    take: 100,
    select: {
      id: true,
      title: true,
      body: true,
      authorName: true,
      resolved: true,
      createdAt: true,
      userId: true,
      replies: {
        orderBy: { createdAt: "asc" },
        select: { id: true, body: true, authorName: true, isStaff: true, createdAt: true },
      },
    },
  });

  // Kaunsa doubt is user ka apna hai (resolve karne ke liye).
  const withOwn = doubts.map((d) => ({ ...d, isOwn: d.userId === userId, userId: undefined }));
  return serviceOk({ doubts: withOwn });
}

export async function postDoubt(
  userId: string,
  authorName: string,
  input: { courseId?: unknown; lessonId?: unknown; title?: unknown; body?: unknown }
) {
  const { courseId, title, body } = input;
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");
  if (typeof title !== "string" || title.trim().length < 3) return serviceFail(400, "Title too short");
  if (typeof body !== "string" || body.trim().length < 3) return serviceFail(400, "Please describe your doubt");
  if (!(await isEnrolled(userId, courseId))) return serviceFail(403, "Not enrolled");

  const doubt = await prisma.doubt.create({
    data: {
      courseId,
      lessonId: typeof input.lessonId === "string" && input.lessonId ? input.lessonId : null,
      userId,
      authorName,
      title: title.trim(),
      body: body.trim(),
    },
    select: { id: true },
  });
  return serviceOk({ doubt });
}

export async function replyToDoubt(userId: string, authorName: string, doubtId: unknown, body: unknown) {
  if (typeof doubtId !== "string" || !doubtId) return serviceFail(400, "doubtId required");
  if (typeof body !== "string" || body.trim().length < 1) return serviceFail(400, "Reply cannot be empty");

  const doubt = await prisma.doubt.findUnique({ where: { id: doubtId }, select: { courseId: true } });
  if (!doubt) return serviceFail(404, "Doubt not found");
  if (!(await isEnrolled(userId, doubt.courseId))) return serviceFail(403, "Not enrolled");

  await prisma.doubtReply.create({
    data: { doubtId, userId, authorName, isStaff: false, body: body.trim() },
  });
  return serviceOk({ replied: true });
}

/** Apna doubt resolved/unresolved toggle. */
export async function setDoubtResolved(userId: string, doubtId: unknown, resolved: unknown) {
  if (typeof doubtId !== "string" || !doubtId) return serviceFail(400, "doubtId required");
  const doubt = await prisma.doubt.findUnique({ where: { id: doubtId }, select: { userId: true } });
  if (!doubt) return serviceFail(404, "Doubt not found");
  if (doubt.userId !== userId) return serviceFail(403, "Not your doubt");

  await prisma.doubt.update({ where: { id: doubtId }, data: { resolved: resolved === true } });
  return serviceOk({ resolved: resolved === true });
}

// ---------- Admin / staff ----------

export async function listDoubtsAdmin(status?: unknown) {
  const where = status === "open" ? { resolved: false } : status === "resolved" ? { resolved: true } : {};
  const doubts = await prisma.doubt.findMany({
    where,
    orderBy: [{ resolved: "asc" }, { createdAt: "desc" }],
    take: 100,
    select: {
      id: true,
      title: true,
      body: true,
      authorName: true,
      resolved: true,
      createdAt: true,
      course: { select: { title: true } },
      replies: { orderBy: { createdAt: "asc" }, select: { id: true, body: true, authorName: true, isStaff: true, createdAt: true } },
    },
  });
  return serviceOk({ doubts });
}

export async function staffReply(doubtId: unknown, body: unknown) {
  if (typeof doubtId !== "string" || !doubtId) return serviceFail(400, "doubtId required");
  if (typeof body !== "string" || body.trim().length < 1) return serviceFail(400, "Reply cannot be empty");

  const doubt = await prisma.doubt.findUnique({
    where: { id: doubtId },
    select: { id: true, userId: true, title: true, course: { select: { slug: true } } },
  });
  if (!doubt) return serviceFail(404, "Doubt not found");

  await prisma.doubtReply.create({
    data: { doubtId, userId: null, authorName: STAFF_NAME, isStaff: true, body: body.trim() },
  });
  // Staff ke jawab dene par doubt ko resolved maan lo.
  await prisma.doubt.update({ where: { id: doubtId }, data: { resolved: true } });

  await notify({
    userId: doubt.userId,
    type: "doubt",
    title: "Your doubt was answered 💬",
    body: `Team replied to "${doubt.title}".`,
    link: `/student/learn/${doubt.course.slug}`,
  }).catch(() => null);

  return serviceOk({ replied: true });
}

export async function adminSetResolved(doubtId: unknown, resolved: unknown) {
  if (typeof doubtId !== "string" || !doubtId) return serviceFail(400, "doubtId required");
  await prisma.doubt.update({ where: { id: doubtId }, data: { resolved: resolved === true } }).catch(() => null);
  return serviceOk({ resolved: resolved === true });
}
