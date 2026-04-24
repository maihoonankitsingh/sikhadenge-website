import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function dayRangeIST(dateStr?: string | null) {
  const d = (dateStr || "").trim();
  const base =
    d ||
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

  const start = new Date(`${base}T00:00:00.000+05:30`);
  const end = new Date(`${base}T23:59:59.999+05:30`);
  return { base, start, end };
}

function getTokenFromReq(req: Request) {
  const u = new URL(req.url);
  return (u.searchParams.get("token") || "").trim();
}

export async function GET(req: NextRequest) {
  try {
    const required = (process.env.ADMIN_TOKEN || "").trim();

    if (required) {
      const got = getTokenFromReq(req);
      if (!got || got !== required) {
        return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
      }
    }

    const u = new URL(req.url);
    const date = u.searchParams.get("date");
    const { base, start, end } = dayRangeIST(date);

    const whereDay = { createdAt: { gte: start, lte: end } } as const;

    const [total, laptopYes, laptopNo, laptopUnknown] = await Promise.all([
      prisma.masterclassLead.count({ where: whereDay as any }),
      prisma.masterclassLead.count({ where: { ...(whereDay as any), laptop: true } }),
      prisma.masterclassLead.count({ where: { ...(whereDay as any), laptop: false } }),
      prisma.masterclassLead.count({ where: { ...(whereDay as any), laptop: null } }),
    ]);

    let topSources: Array<{ key: string; count: number }> = [];
    let topPages: Array<{ key: string; count: number }> = [];

    try {
      const rows = await prisma.masterclassLead.groupBy({
        by: ["source"],
        where: whereDay as any,
        _count: { source: true },
        orderBy: { _count: { source: "desc" } },
        take: 8,
      });

      topSources = rows
        .map((r) => ({ key: (r as any).source || "unknown", count: (r as any)._count?.source || 0 }))
        .filter((x) => x.count > 0);
    } catch {}

    try {
      const rows = await prisma.masterclassLead.groupBy({
        by: ["page"],
        where: whereDay as any,
        _count: { page: true },
        orderBy: { _count: { page: "desc" } },
        take: 8,
      });

      topPages = rows
        .map((r) => ({ key: (r as any).page || "unknown", count: (r as any)._count?.page || 0 }))
        .filter((x) => x.count > 0);
    } catch {}

    const recent = await prisma.masterclassLead.findMany({
      where: whereDay as any,
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        name: true,
        phone: true,
        email: true,
        laptop: true,
        source: true,
        page: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        date: base,
        range: { start: start.toISOString(), end: end.toISOString() },
        counts: {
          total,
          laptop_yes: laptopYes,
          laptop_no: laptopNo,
          will_arrange_soon_or_unknown: laptopUnknown,
        },
        topSources,
        topPages,
        recent,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (e) {
    console.error("masterclass-metrics error:", e);

    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        counts: {
          total: 0,
          laptop_yes: 0,
          laptop_no: 0,
          will_arrange_soon_or_unknown: 0,
        },
        topSources: [],
        topPages: [],
        recent: [],
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  }
}
