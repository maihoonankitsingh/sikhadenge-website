// =============================================================
// Quiz service (Phase 4) — MCQ quiz, auto-grading.
// Security: student ko correct answers submit se pehle nahi bhejte.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { awardXp, touchStreak } from "./gamification";

const XP_QUIZ_PASS = 20;

/** lesson -> course -> enrollment check. Enrolled ho to courseId, warna null. */
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

export async function getQuizForStudent(userId: string, lessonId: unknown): Promise<ServiceResult<unknown>> {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  if (!(await courseIdIfEnrolled(userId, lessonId))) return serviceFail(403, "Not enrolled");

  const quiz = await prisma.quiz.findUnique({
    where: { lessonId },
    select: {
      id: true,
      passPercent: true,
      questions: {
        orderBy: { order: "asc" },
        select: { id: true, text: true, options: true, order: true }, // NOTE: correctIndex NOT selected
      },
    },
  });
  if (!quiz) return serviceFail(404, "No quiz for this lesson");

  const bestAttempt = await prisma.quizAttempt.findFirst({
    where: { quizId: quiz.id, userId },
    orderBy: { score: "desc" },
    select: { score: true, total: true, passed: true, createdAt: true },
  });

  return serviceOk({ quiz, bestAttempt });
}

export async function submitQuizAttempt(
  userId: string,
  lessonId: unknown,
  answers: unknown
): Promise<ServiceResult<unknown>> {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  if (!Array.isArray(answers)) return serviceFail(400, "answers must be an array");
  if (!(await courseIdIfEnrolled(userId, lessonId))) return serviceFail(403, "Not enrolled");

  const quiz = await prisma.quiz.findUnique({
    where: { lessonId },
    select: {
      id: true,
      passPercent: true,
      questions: { orderBy: { order: "asc" }, select: { id: true, correctIndex: true } },
    },
  });
  if (!quiz || quiz.questions.length === 0) return serviceFail(404, "No quiz for this lesson");

  const total = quiz.questions.length;
  let score = 0;
  const correct: number[] = [];
  quiz.questions.forEach((q, i) => {
    correct.push(q.correctIndex);
    if (Number(answers[i]) === q.correctIndex) score++;
  });
  const passed = Math.round((score / total) * 100) >= quiz.passPercent;

  // XP sirf pehli baar pass hone pe.
  const alreadyPassed = await prisma.quizAttempt.findFirst({
    where: { quizId: quiz.id, userId, passed: true },
    select: { id: true },
  });

  await prisma.quizAttempt.create({ data: { quizId: quiz.id, userId, score, total, passed } });
  await touchStreak(userId).catch(() => null);
  if (passed && !alreadyPassed) await awardXp(userId, XP_QUIZ_PASS).catch(() => null);

  return serviceOk({ score, total, passed, passPercent: quiz.passPercent, correct });
}

// ---------- Admin ----------

/** Lesson ke liye quiz ensure karo (na ho to bana do). */
async function ensureQuiz(lessonId: string) {
  const existing = await prisma.quiz.findUnique({ where: { lessonId }, select: { id: true } });
  if (existing) return existing.id;
  const created = await prisma.quiz.create({ data: { lessonId }, select: { id: true } });
  return created.id;
}

export async function getQuizAdmin(lessonId: unknown) {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  const quiz = await prisma.quiz.findUnique({
    where: { lessonId },
    select: {
      id: true,
      passPercent: true,
      questions: { orderBy: { order: "asc" }, select: { id: true, text: true, options: true, correctIndex: true, order: true } },
    },
  });
  return serviceOk({ quiz });
}

export async function addQuestion(input: {
  lessonId?: unknown;
  text?: unknown;
  options?: unknown;
  correctIndex?: unknown;
}) {
  const { lessonId, text, options, correctIndex } = input;
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  if (typeof text !== "string" || text.trim().length < 1) return serviceFail(400, "Question text required");
  if (!Array.isArray(options) || options.length < 2 || !options.every((o) => typeof o === "string" && o.trim())) {
    return serviceFail(400, "At least 2 non-empty options required");
  }
  const ci = Number(correctIndex);
  if (!Number.isInteger(ci) || ci < 0 || ci >= options.length) return serviceFail(400, "Invalid correctIndex");

  const quizId = await ensureQuiz(lessonId);
  const order = await prisma.question.count({ where: { quizId } });
  const question = await prisma.question.create({
    data: { quizId, text: text.trim(), options: options.map((o) => (o as string).trim()), correctIndex: ci, order },
    select: { id: true },
  });
  return serviceOk({ question });
}

export async function deleteQuestion(questionId: unknown) {
  if (typeof questionId !== "string" || !questionId) return serviceFail(400, "questionId required");
  await prisma.question.delete({ where: { id: questionId } }).catch(() => null);
  return serviceOk({ deleted: true });
}
