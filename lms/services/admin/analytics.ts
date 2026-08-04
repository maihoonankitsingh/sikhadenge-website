// =============================================================
// Analytics service (Phase 8) — admin dashboard ke KPIs.
// Sirf existing data se compute; koi naya table nahi.
// =============================================================

import { prisma } from "../../../lib/prisma";
import { serviceOk } from "../../types";

export async function getAnalytics() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    students,
    publishedCourses,
    enrollments,
    revenueAll,
    revenueMonth,
    paidCount,
    certificates,
    pendingSubmissions,
    openDoubts,
    liveClasses,
    coursesForTop,
    recentPaymentsRaw,
    couponGroups,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.enrollment.count(),
    prisma.payment.aggregate({ _sum: { amountInr: true }, where: { status: "paid" } }),
    prisma.payment.aggregate({ _sum: { amountInr: true }, where: { status: "paid", createdAt: { gte: startOfMonth } } }),
    prisma.payment.count({ where: { status: "paid" } }),
    prisma.certificate.count(),
    prisma.submission.count({ where: { status: "submitted" } }),
    prisma.doubt.count({ where: { resolved: false } }),
    prisma.liveClass.count(),
    prisma.course.findMany({
      select: { id: true, title: true, priceInr: true, isPublished: true, _count: { select: { enrollments: true } } },
    }),
    prisma.payment.findMany({
      where: { status: "paid" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        amountInr: true,
        couponCode: true,
        createdAt: true,
        user: { select: { name: true } },
        course: { select: { title: true } },
      },
    }),
    prisma.payment.groupBy({
      by: ["couponCode"],
      where: { status: "paid", couponCode: { not: null } },
      _count: { _all: true },
      _sum: { amountInr: true },
    }),
  ]);

  const topCourses = coursesForTop
    .map((c) => ({ id: c.id, title: c.title, priceInr: c.priceInr, isPublished: c.isPublished, enrollments: c._count.enrollments }))
    .sort((a, b) => b.enrollments - a.enrollments)
    .slice(0, 6);

  const recentPayments = recentPaymentsRaw.map((p) => ({
    amountInr: p.amountInr,
    couponCode: p.couponCode,
    createdAt: p.createdAt,
    studentName: p.user.name,
    courseTitle: p.course.title,
  }));

  const topCoupons = couponGroups
    .map((g) => ({ code: g.couponCode, count: g._count._all, revenue: g._sum.amountInr || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return serviceOk({
    kpis: {
      students,
      publishedCourses,
      enrollments,
      revenueTotal: revenueAll._sum.amountInr || 0,
      revenueThisMonth: revenueMonth._sum.amountInr || 0,
      paidCount,
      certificates,
      pendingSubmissions,
      openDoubts,
      liveClasses,
    },
    topCourses,
    recentPayments,
    topCoupons,
  });
}
