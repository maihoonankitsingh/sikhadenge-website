// =============================================================
// Assignment service (Phase 4) — project/task submission + grading.
// Skill courses ke liye important: student apna design/video submit karta
// hai, instructor grade + feedback deta hai.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { notify } from "../notify";
import { awardXp, awardBadge, touchStreak } from "./gamification";

const XP_SUBMIT = 15;

async function courseIdIfEnrolled(userId: string, lessonId: string): Promise<string | null> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { module: { select: { courseId: true } } },
  });
  if (!lesson) return null;
  const courseId = lesson.module.courseId;
  const enr = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  return enr ? courseId : null;
}

// ---------- Student ----------

export async function getAssignmentForStudent(userId: string, lessonId: unknown): Promise<ServiceResult<unknown>> {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  if (!(await courseIdIfEnrolled(userId, lessonId))) return serviceFail(403, "Not enrolled");

  const assignment = await prisma.assignment.findUnique({
    where: { lessonId },
    select: { id: true, instructions: true, dueAt: true },
  });
  if (!assignment) return serviceFail(404, "No assignment for this lesson");

  const submission = await prisma.submission.findUnique({
    where: { assignmentId_userId: { assignmentId: assignment.id, userId } },
    select: { fileUrl: true, text: true, grade: true, feedback: true, status: true, submittedAt: true },
  });

  return serviceOk({ assignment, submission });
}

export async function submitAssignment(
  userId: string,
  lessonId: unknown,
  input: { fileUrl?: unknown; text?: unknown }
): Promise<ServiceResult<{ submitted: boolean }>> {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  if (!(await courseIdIfEnrolled(userId, lessonId))) return serviceFail(403, "Not enrolled");

  const fileUrl = typeof input.fileUrl === "string" && input.fileUrl.trim() ? input.fileUrl.trim() : null;
  const text = typeof input.text === "string" && input.text.trim() ? input.text.trim() : null;
  if (!fileUrl && !text) return serviceFail(400, "Provide a file link or text");

  const assignment = await prisma.assignment.findUnique({ where: { lessonId }, select: { id: true } });
  if (!assignment) return serviceFail(404, "No assignment for this lesson");

  // Pehli submission? (XP + Creator badge sirf pehli baar.)
  const existing = await prisma.submission.findUnique({
    where: { assignmentId_userId: { assignmentId: assignment.id, userId } },
    select: { id: true },
  });

  // Naya submission -> status reset to submitted (re-grade needed).
  await prisma.submission.upsert({
    where: { assignmentId_userId: { assignmentId: assignment.id, userId } },
    create: { assignmentId: assignment.id, userId, fileUrl, text, status: "submitted" },
    update: { fileUrl, text, status: "submitted", grade: null, feedback: null },
  });

  await touchStreak(userId).catch(() => null);
  if (!existing) {
    await awardXp(userId, XP_SUBMIT).catch(() => null);
    await awardBadge(userId, "creator").catch(() => null);
  }

  return serviceOk({ submitted: true });
}

// ---------- Admin ----------

export async function updateAssignment(input: { lessonId?: unknown; instructions?: unknown; dueAt?: unknown }) {
  const { lessonId } = input;
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");

  const instructions = typeof input.instructions === "string" ? input.instructions.trim() || null : null;
  const dueAt = typeof input.dueAt === "string" && input.dueAt ? new Date(input.dueAt) : null;

  const assignment = await prisma.assignment.upsert({
    where: { lessonId },
    create: { lessonId, instructions, dueAt },
    update: { instructions, dueAt },
    select: { id: true },
  });
  return serviceOk({ assignment });
}

export async function listSubmissions(status?: unknown) {
  const where = status === "submitted" || status === "graded" ? { status } : {};
  const submissions = await prisma.submission.findMany({
    where,
    orderBy: { submittedAt: "desc" },
    take: 100,
    select: {
      id: true,
      fileUrl: true,
      text: true,
      grade: true,
      feedback: true,
      status: true,
      submittedAt: true,
      user: { select: { name: true, email: true, phone: true } },
      assignment: {
        select: { lesson: { select: { title: true, module: { select: { course: { select: { title: true } } } } } } },
      },
    },
  });
  return serviceOk({ submissions });
}

export async function gradeSubmission(input: { submissionId?: unknown; grade?: unknown; feedback?: unknown }) {
  const { submissionId } = input;
  if (typeof submissionId !== "string" || !submissionId) return serviceFail(400, "submissionId required");
  const grade = Number(input.grade);
  if (!Number.isInteger(grade) || grade < 0 || grade > 100) return serviceFail(400, "Grade must be 0-100");

  const updated = await prisma.submission.update({
    where: { id: submissionId },
    data: { grade, feedback: typeof input.feedback === "string" ? input.feedback.trim() || null : null, status: "graded" },
    select: {
      userId: true,
      assignment: { select: { lesson: { select: { title: true, module: { select: { course: { select: { slug: true } } } } } } } },
    },
  });

  await notify({
    userId: updated.userId,
    type: "grade",
    title: "Assignment graded ✅",
    body: `"${updated.assignment.lesson.title}" — you scored ${grade}/100.`,
    link: `/student/learn/${updated.assignment.lesson.module.course.slug}`,
  }).catch(() => null);

  return serviceOk({ graded: true });
}
