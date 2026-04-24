export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

export async function GET() {
  try {
    const [
      totalAffiliates,
      pendingAffiliates,
      approvedAffiliates,
      rejectedAffiliates,
      blockedAffiliates,
      totalClicks,
      latestClicks,
      clicksByAffiliateRaw,
    ] = await Promise.all([
      prisma.affiliatePartner.count(),
      prisma.affiliatePartner.count({ where: { status: "PENDING" } }),
      prisma.affiliatePartner.count({ where: { status: "APPROVED" } }),
      prisma.affiliatePartner.count({ where: { status: "REJECTED" } }),
      prisma.affiliatePartner.count({ where: { status: "BLOCKED" } }),
      prisma.affiliateClick.count(),
      prisma.affiliateClick.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          affiliateCode: true,
          landingPage: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          createdAt: true,
          affiliatePartner: {
            select: {
              fullName: true,
              status: true,
            },
          },
        },
      }),
      prisma.affiliateClick.groupBy({
        by: ["affiliatePartnerId", "affiliateCode"],
        _count: { _all: true },
        orderBy: {
          _count: {
            affiliatePartnerId: "desc",
          },
        },
      }),
    ]);

    const partnerIds = clicksByAffiliateRaw.map((x) => x.affiliatePartnerId);
    const partners = partnerIds.length
      ? await prisma.affiliatePartner.findMany({
          where: { id: { in: partnerIds } },
          select: {
            id: true,
            fullName: true,
            status: true,
            phone: true,
            email: true,
          },
        })
      : [];

    const partnerMap = new Map(partners.map((p) => [p.id, p]));

    const clicksByAffiliate = clicksByAffiliateRaw.map((row) => ({
      affiliatePartnerId: row.affiliatePartnerId,
      affiliateCode: row.affiliateCode,
      clicks: row._count._all,
      affiliate: partnerMap.get(row.affiliatePartnerId) || null,
    }));

    return NextResponse.json(
      {
        ok: true,
        summary: {
          totalAffiliates,
          pendingAffiliates,
          approvedAffiliates,
          rejectedAffiliates,
          blockedAffiliates,
          totalClicks,
        },
        clicksByAffiliate,
        latestClicks,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate stats error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
