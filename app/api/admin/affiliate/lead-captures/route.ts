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
    const code = (req.nextUrl.searchParams.get("code") || "").trim().toUpperCase();
    const q = (req.nextUrl.searchParams.get("q") || "").trim();
    const limitRaw = Number(req.nextUrl.searchParams.get("limit") || 50);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

    const items = await prisma.affiliateLeadCapture.findMany({
      where: {
        ...(code ? { affiliateCode: code } : {}),
        ...(q
          ? {
              OR: [
                { affiliateCode: { contains: q, mode: "insensitive" } },
                { fullName: { contains: q, mode: "insensitive" } },
                { phone: { contains: q } },
                { email: { contains: q, mode: "insensitive" } },
                { courseInterest: { contains: q, mode: "insensitive" } },
                { sourcePage: { contains: q, mode: "insensitive" } },
                { captureSource: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        affiliatePartnerId: true,
        affiliateCode: true,
        fullName: true,
        phone: true,
        email: true,
        courseInterest: true,
        sourcePage: true,
        externalLeadId: true,
        captureSource: true,
        referrerUrl: true,
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
    console.error("Affiliate lead-captures list error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
