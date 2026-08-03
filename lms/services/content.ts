// =============================================================
// Content service — enrolled student ke liye course ka poora content
// (modules -> lessons) + uski progress. Enrollment check zaroori hai.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";

export type LessonNode = {
  id: string;
  title: string;
  type: string;
  order: number;
  videoUrl: string | null;
  durationSec: number | null;
  contentMd: string | null;
  isPreview: boolean;
  completed: boolean;
  lastPosSec: number;
};

export type ModuleNode = {
  id: string;
  title: string;
  order: number;
  lessons: LessonNode[];
};

export type CourseContent = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  modules: ModuleNode[];
  totalLessons: number;
  completedLessons: number;
};

/**
 * Course ka content sirf tab deta hai jab student us course me enrolled ho.
 * Har lesson ke saath us user ki progress (completed, lastPosSec) attach hoti hai.
 */
export async function getCourseContentForStudent(
  userId: string,
  slug: unknown
): Promise<ServiceResult<CourseContent>> {
  if (typeof slug !== "string" || !slug) return serviceFail(400, "Invalid course");

  const course = await prisma.course.findFirst({
    where: { slug, isPublished: true },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          order: true,
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              type: true,
              order: true,
              videoUrl: true,
              durationSec: true,
              contentMd: true,
              isPreview: true,
            },
          },
        },
      },
    },
  });

  if (!course) return serviceFail(404, "Course not found");

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
    select: { id: true },
  });
  if (!enrollment) return serviceFail(403, "You are not enrolled in this course");

  // Ek hi query me is user ki saari progress le lo, phir map kar do.
  const progress = await prisma.lessonProgress.findMany({
    where: { userId, lesson: { module: { courseId: course.id } } },
    select: { lessonId: true, completed: true, lastPosSec: true },
  });
  const progressMap = new Map(progress.map((p) => [p.lessonId, p]));

  let totalLessons = 0;
  let completedLessons = 0;

  const modules: ModuleNode[] = course.modules.map((m) => ({
    id: m.id,
    title: m.title,
    order: m.order,
    lessons: m.lessons.map((l) => {
      totalLessons++;
      const p = progressMap.get(l.id);
      if (p?.completed) completedLessons++;
      return {
        id: l.id,
        title: l.title,
        type: l.type,
        order: l.order,
        videoUrl: l.videoUrl,
        durationSec: l.durationSec,
        contentMd: l.contentMd,
        isPreview: l.isPreview,
        completed: p?.completed ?? false,
        lastPosSec: p?.lastPosSec ?? 0,
      };
    }),
  }));

  return serviceOk({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    modules,
    totalLessons,
    completedLessons,
  });
}
