// =============================================================
// Progress service — lesson ki progress save karna (resume + complete).
// Security: user us lesson tak tabhi likh sakta hai jab wo us course me
// enrolled ho (lesson -> module -> course -> enrollment chain check).
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";

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

  return serviceOk(saved);
}
