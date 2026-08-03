import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { requireStudent } from "../../../lib/studentAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;

  const [courses, enrollments] = await Promise.all([
    prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        priceInr: true,
        _count: { select: { modules: true } },
      },
    }),
    prisma.enrollment.findMany({
      where: { userId: user.id },
      select: { courseId: true, status: true },
    }),
  ]);

  const enrolledMap = new Map(enrollments.map((e) => [e.courseId, e.status]));

  const enrolled = courses
    .filter((c) => enrolledMap.has(c.id))
    .map((c) => ({ ...c, enrollmentStatus: enrolledMap.get(c.id) }));

  const available = courses.filter((c) => !enrolledMap.has(c.id));

  return res.json({ ok: true, enrolled, available });
}
