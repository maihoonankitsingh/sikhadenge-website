export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AffiliateStatus } from "@prisma/client";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";

const prisma = new PrismaClient();

function parseStatus(value: string | null): AffiliateStatus | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  if (
    normalized === "PENDING" ||
    normalized === "APPROVED" ||
    normalized === "REJECTED" ||
    normalized === "BLOCKED"
  ) {
    return normalized as AffiliateStatus;
  }
  return null;
}

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const status = parseStatus(searchParams.get("status"));
    const q = (searchParams.get("q") || "").trim();
    const limitRaw = Number(searchParams.get("limit") || 50);
    const limit = Number.isFinite(limitRaw)
      ? Math.min(Math.max(limitRaw, 1), 200)
      : 50;

    const items = await prisma.affiliatePartner.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(q
          ? {
              OR: [
                { fullName: { contains: q, mode: "insensitive" } },
                { phone: { contains: q } },
                { email: { contains: q, mode: "insensitive" } },
                { affiliateCode: { contains: q, mode: "insensitive" } },
                { city: { contains: q, mode: "insensitive" } },
                { sourceType: { contains: q, mode: "insensitive" } },
                { audienceType: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        city: true,
        sourceType: true,
        audienceType: true,
        status: true,
        affiliateCode: true,
        referralLink: true,
        approvedAt: true,
        rejectedAt: true,
        blockedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const counts = await prisma.affiliatePartner.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    const summary = {
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
      BLOCKED: 0,
      TOTAL: 0,
    };

    for (const row of counts) {
      summary[row.status] = row._count._all;
      summary.TOTAL += row._count._all;
    }

    return NextResponse.json(
      {
        ok: true,
        filters: {
          status: status || "ALL",
          q,
          limit,
        },
        summary,
        items,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate list error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
