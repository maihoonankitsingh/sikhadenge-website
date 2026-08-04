// =============================================================
// Progress service — lesson ki progress save karna (resume + complete).
// Security: user us lesson tak tabhi likh sakta hai jab wo us course me
// enrolled ho (lesson -> module -> course -> enrollment chain check).
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { issueIfComplete } from "./certificates";
import { awardXp, awardBadge, touchStreak } from "./gamification";

const XP_LESSON_COMPLETE = 10;

export type SaveProgressInput = {
  lessonId?: unknown;
  lastPosSec?: unknown;
  completed?: unknown;
};

export type SaveProgressResult = { completed: boolean; lastPosSec: number };

export async function saveProgress(
  userId: string,
  input: SaveProgressInput
): Promise<ServiceResult<SaveProgressResult>> {
  const { lessonId, lastPosSec, completed } = input;

  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");

  const pos =
    typeof lastPosSec === "number" && Number.isFinite(lastPosSec) && lastPosSec >= 0
      ? Math.floor(lastPosSec)
      : 0;
  const isCompleted = completed === true;

  // Lesson ka course nikaalo, phir enrollment verify karo.
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, module: { select: { courseId: true } } },
  });
  if (!lesson) return serviceFail(404, "Lesson not found");

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: lesson.module.courseId } },
    select: { id: true },
  });
  if (!enrollment) return serviceFail(403, "Not enrolled");

  // Pehle se completed tha? (XP sirf pehli baar complete hone pe do.)
  const prev = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
    select: { completed: true },
  });
  const newlyCompleted = isCompleted && !prev?.completed;

  const saved = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId, lastPosSec: pos, completed: isCompleted },
    update: {
      lastPosSec: pos,
      // completed ko kabhi wapas false mat karo agar pehle true tha.
      ...(isCompleted ? { completed: true } : {}),
    },
    select: { completed: true, lastPosSec: true },
  });

  // Har activity par streak touch.
  await touchStreak(userId).catch(() => null);

  if (newlyCompleted) {
    await awardXp(userId, XP_LESSON_COMPLETE).catch(() => null);
    await awardBadge(userId, "first_steps").catch(() => null);
    // Course 100% ho gaya to certificate auto-issue.
    await issueIfComplete(userId, lesson.module.courseId).catch(() => null);
  }

  return serviceOk(saved);
}
