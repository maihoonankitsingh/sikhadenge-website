// =============================================================
// Course service — student ke liye course listing.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, type CourseCard, type ServiceResult } from "../types";

export type StudentCourseLists = {
  enrolled: CourseCard[];
  available: CourseCard[];
};

/** Published courses ko enrolled vs available me baant kar deta hai. */
export async function listCoursesForStudent(userId: string): Promise<ServiceResult<StudentCourseLists>> {
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
      where: { userId },
      select: { courseId: true, status: true },
    }),
  ]);

  const enrolledMap = new Map(enrollments.map((e) => [e.courseId, e.status]));

  const enrolled = courses
    .filter((c) => enrolledMap.has(c.id))
    .map((c) => ({ ...c, enrollmentStatus: enrolledMap.get(c.id) }));

  const available = courses.filter((c) => !enrolledMap.has(c.id));

  return serviceOk({ enrolled, available });
}
