// =============================================================
// Admin course-builder service — course/module/lesson banana & manage.
// Ye sirf admin routes se call hota hai (requireAdmin guard ke peeche).
// Business logic yahin; koi HTTP/cookie yahan nahi.
// =============================================================

import { prisma } from "../../../lib/prisma";
import { serviceOk, serviceFail } from "../../types";

const LESSON_TYPES = ["VIDEO", "LIVE_RECORDING", "PDF", "TEXT", "QUIZ", "ASSIGNMENT"] as const;
type LessonType = (typeof LESSON_TYPES)[number];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || "course";
  let slug = root;
  let n = 1;
  // Slug free hone tak counter badhao.
  while (await prisma.course.findUnique({ where: { slug }, select: { id: true } })) {
    n += 1;
    slug = `${root}-${n}`;
  }
  return slug;
}

/** Saare courses (draft + published) counts ke saath. */
export async function listCourses() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      priceInr: true,
      isPublished: true,
      createdAt: true,
      _count: { select: { modules: true, enrollments: true } },
    },
  });
  return serviceOk({ courses });
}

export async function createCourse(input: { title?: unknown; priceInr?: unknown; description?: unknown }) {
  const { title, priceInr, description } = input;
  if (typeof title !== "string" || title.trim().length < 2) {
    return serviceFail(400, "Title required (min 2 chars)");
  }
  const price = typeof priceInr === "number" && priceInr >= 0 ? Math.floor(priceInr) : 0;
  const slug = await uniqueSlug(title);

  const course = await prisma.course.create({
    data: {
      title: title.trim(),
      slug,
      priceInr: price,
      description: typeof description === "string" ? description.trim() : null,
    },
    select: { id: true, slug: true },
  });
  return serviceOk({ course });
}

/** Editing ke liye poora tree (modules + lessons). */
export async function getCourseTree(courseId: unknown) {
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      priceInr: true,
      isPublished: true,
      thumbnail: true,
      modules: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          order: true,
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, type: true, order: true, videoUrl: true, durationSec: true, isPreview: true },
          },
        },
      },
    },
  });
  if (!course) return serviceFail(404, "Course not found");
  return serviceOk({ course });
}

export async function updateCourse(input: {
  courseId?: unknown;
  title?: unknown;
  description?: unknown;
  priceInr?: unknown;
  thumbnail?: unknown;
  isPublished?: unknown;
}) {
  const { courseId } = input;
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");

  const data: Record<string, unknown> = {};
  if (typeof input.title === "string" && input.title.trim().length >= 2) data.title = input.title.trim();
  if (typeof input.description === "string") data.description = input.description.trim() || null;
  if (typeof input.priceInr === "number" && input.priceInr >= 0) data.priceInr = Math.floor(input.priceInr);
  if (typeof input.thumbnail === "string") data.thumbnail = input.thumbnail.trim() || null;
  if (typeof input.isPublished === "boolean") data.isPublished = input.isPublished;

  if (Object.keys(data).length === 0) return serviceFail(400, "Nothing to update");

  const course = await prisma.course.update({
    where: { id: courseId },
    data,
    select: { id: true, isPublished: true },
  });
  return serviceOk({ course });
}

export async function createModule(input: { courseId?: unknown; title?: unknown }) {
  const { courseId, title } = input;
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");
  if (typeof title !== "string" || title.trim().length < 2) return serviceFail(400, "Module title required");

  const count = await prisma.module.count({ where: { courseId } });
  const module = await prisma.module.create({
    data: { courseId, title: title.trim(), order: count },
    select: { id: true },
  });
  return serviceOk({ module });
}

export async function createLesson(input: {
  moduleId?: unknown;
  title?: unknown;
  type?: unknown;
  videoUrl?: unknown;
  durationSec?: unknown;
  contentMd?: unknown;
  isPreview?: unknown;
}) {
  const { moduleId, title } = input;
  if (typeof moduleId !== "string" || !moduleId) return serviceFail(400, "moduleId required");
  if (typeof title !== "string" || title.trim().length < 2) return serviceFail(400, "Lesson title required");

  const type: LessonType = LESSON_TYPES.includes(input.type as LessonType) ? (input.type as LessonType) : "VIDEO";
  const count = await prisma.lesson.count({ where: { moduleId } });

  const lesson = await prisma.lesson.create({
    data: {
      moduleId,
      title: title.trim(),
      type,
      order: count,
      videoUrl: typeof input.videoUrl === "string" ? input.videoUrl.trim() || null : null,
      durationSec:
        typeof input.durationSec === "number" && input.durationSec >= 0 ? Math.floor(input.durationSec) : null,
      contentMd: typeof input.contentMd === "string" ? input.contentMd.trim() || null : null,
      isPreview: input.isPreview === true,
    },
    select: { id: true },
  });
  return serviceOk({ lesson });
}

export async function deleteLesson(lessonId: unknown) {
  if (typeof lessonId !== "string" || !lessonId) return serviceFail(400, "lessonId required");
  await prisma.lesson.delete({ where: { id: lessonId } }).catch(() => null);
  return serviceOk({ deleted: true });
}

export async function deleteModule(moduleId: unknown) {
  if (typeof moduleId !== "string" || !moduleId) return serviceFail(400, "moduleId required");
  await prisma.module.delete({ where: { id: moduleId } }).catch(() => null);
  return serviceOk({ deleted: true });
}
