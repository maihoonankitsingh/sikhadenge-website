// =============================================================
// Portfolio service (Phase 7) — skill-course ka USP.
// Student apne graded projects + certificates ko ek public page pe
// showcase karta hai: /portfolio/<handle>. Recruiter/client ko bhej sake.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";

function normHandle(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

// ---------- Student (edit) ----------

/** Editor ke liye: profile + graded projects (showcase flag) + certificates. */
export async function getEditablePortfolio(userId: string) {
  const [user, submissions, certs] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, handle: true, headline: true, bio: true, portfolioPublic: true },
    }),
    prisma.submission.findMany({
      where: { userId, status: "graded" },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        fileUrl: true,
        grade: true,
        showcased: true,
        assignment: { select: { lesson: { select: { title: true, module: { select: { course: { select: { title: true } } } } } } } },
      },
    }),
    prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
      select: { serial: true, course: { select: { title: true } } },
    }),
  ]);

  const projects = submissions.map((s) => ({
    id: s.id,
    fileUrl: s.fileUrl,
    grade: s.grade,
    showcased: s.showcased,
    title: s.assignment.lesson.title,
    courseTitle: s.assignment.lesson.module.course.title,
  }));

  return serviceOk({ profile: user, projects, certificates: certs });
}

export async function updatePortfolioProfile(input: {
  userId: string;
  handle?: unknown;
  headline?: unknown;
  bio?: unknown;
  portfolioPublic?: unknown;
}): Promise<ServiceResult<{ handle: string | null }>> {
  const data: Record<string, unknown> = {};

  if (typeof input.handle === "string") {
    const handle = normHandle(input.handle);
    if (handle.length < 3) return serviceFail(400, "Handle min 3 chars (a-z, 0-9, -)");
    const clash = await prisma.user.findFirst({
      where: { handle, NOT: { id: input.userId } },
      select: { id: true },
    });
    if (clash) return serviceFail(409, "Handle already taken");
    data.handle = handle;
  }
  if (typeof input.headline === "string") data.headline = input.headline.trim().slice(0, 100) || null;
  if (typeof input.bio === "string") data.bio = input.bio.trim().slice(0, 600) || null;
  if (typeof input.portfolioPublic === "boolean") data.portfolioPublic = input.portfolioPublic;

  if (Object.keys(data).length === 0) return serviceFail(400, "Nothing to update");

  // Public karne se pehle handle hona zaroori.
  if (data.portfolioPublic === true) {
    const u = await prisma.user.findUnique({ where: { id: input.userId }, select: { handle: true } });
    if (!u?.handle && !data.handle) return serviceFail(400, "Set a handle before going public");
  }

  const user = await prisma.user.update({
    where: { id: input.userId },
    data,
    select: { handle: true },
  });
  return serviceOk({ handle: user.handle });
}

export async function toggleShowcase(userId: string, submissionId: unknown, showcased: unknown) {
  if (typeof submissionId !== "string" || !submissionId) return serviceFail(400, "submissionId required");
  // Sirf apna hi submission toggle kar sakta hai.
  const sub = await prisma.submission.findFirst({ where: { id: submissionId, userId }, select: { id: true } });
  if (!sub) return serviceFail(404, "Submission not found");

  await prisma.submission.update({ where: { id: sub.id }, data: { showcased: showcased === true } });
  return serviceOk({ showcased: showcased === true });
}

// ---------- Public ----------

export async function getPublicPortfolio(handle: unknown): Promise<ServiceResult<unknown>> {
  if (typeof handle !== "string" || !handle) return serviceFail(400, "handle required");

  const user = await prisma.user.findUnique({
    where: { handle: handle.toLowerCase() },
    select: { id: true, name: true, headline: true, bio: true, portfolioPublic: true },
  });
  if (!user || !user.portfolioPublic) return serviceFail(404, "Portfolio not found");

  const [submissions, certs] = await Promise.all([
    prisma.submission.findMany({
      where: { userId: user.id, showcased: true, status: "graded" },
      orderBy: { updatedAt: "desc" },
      select: {
        fileUrl: true,
        grade: true,
        assignment: { select: { lesson: { select: { title: true, module: { select: { course: { select: { title: true } } } } } } } },
      },
    }),
    prisma.certificate.findMany({
      where: { userId: user.id },
      orderBy: { issuedAt: "desc" },
      select: { serial: true, course: { select: { title: true } } },
    }),
  ]);

  return serviceOk({
    portfolio: {
      name: user.name,
      headline: user.headline,
      bio: user.bio,
      projects: submissions.map((s) => ({
        title: s.assignment.lesson.title,
        courseTitle: s.assignment.lesson.module.course.title,
        fileUrl: s.fileUrl,
        grade: s.grade,
      })),
      certificates: certs,
    },
  });
}
