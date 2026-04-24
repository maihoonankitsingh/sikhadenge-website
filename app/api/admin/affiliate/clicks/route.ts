export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status")?.trim().toUpperCase() || "";
    const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase() || "";
    const q = req.nextUrl.searchParams.get("q")?.trim() || "";
    const limitRaw = Number(req.nextUrl.searchParams.get("limit") || 50);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

    const items = await prisma.affiliateClick.findMany({
      where: {
        ...(code ? { affiliateCode: code } : {}),
        ...(q
          ? {
              OR: [
                { affiliateCode: { contains: q, mode: "insensitive" } },
                { landingPage: { contains: q, mode: "insensitive" } },
                { referrerUrl: { contains: q, mode: "insensitive" } },
                { utmSource: { contains: q, mode: "insensitive" } },
                { utmMedium: { contains: q, mode: "insensitive" } },
                { utmCampaign: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(status
          ? {
              affiliatePartner: {
                status: status as any,
              },
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        affiliatePartnerId: true,
        affiliateCode: true,
        landingPage: true,
        referrerUrl: true,
        ipAddress: true,
        userAgent: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        utmTerm: true,
        utmContent: true,
        createdAt: true,
        affiliatePartner: {
          select: {
            fullName: true,
            phone: true,
            email: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        filters: {
          status: status || "ALL",
          code: code || "",
          q,
          limit,
        },
        count: items.length,
        items,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate clicks list error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
