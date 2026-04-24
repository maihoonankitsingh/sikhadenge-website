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
    const status = (req.nextUrl.searchParams.get("status") || "").trim().toUpperCase();
    const q = (req.nextUrl.searchParams.get("q") || "").trim();
    const limitRaw = Number(req.nextUrl.searchParams.get("limit") || 50);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;

    const items = await prisma.affiliatePayout.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(code
          ? {
              affiliatePartner: {
                affiliateCode: code,
              },
            }
          : {}),
        ...(q
          ? {
              OR: [
                { payoutReference: { contains: q, mode: "insensitive" } },
                { payoutNotes: { contains: q, mode: "insensitive" } },
                { payoutMethod: { contains: q, mode: "insensitive" } },
                {
                  affiliatePartner: {
                    fullName: { contains: q, mode: "insensitive" },
                  },
                },
                {
                  affiliatePartner: {
                    affiliateCode: { contains: q, mode: "insensitive" },
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        affiliatePartnerId: true,
        periodStart: true,
        periodEnd: true,
        totalAmount: true,
        payoutMethod: true,
        payoutReference: true,
        payoutNotes: true,
        status: true,
        processedAt: true,
        createdAt: true,
        affiliatePartner: {
          select: {
            fullName: true,
            affiliateCode: true,
            status: true,
            phone: true,
            email: true,
            payoutName: true,
            payoutMethod: true,
            payoutUpiId: true,
          },
        },
      },
    });

    const totals = await prisma.affiliatePayout.aggregate({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(code
          ? {
              affiliatePartner: {
                affiliateCode: code,
              },
            }
          : {}),
      },
      _sum: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        filters: {
          code: code || "",
          status: status || "ALL",
          q,
          limit,
        },
        summary: {
          count: totals._count.id || 0,
          totalPayoutAmount: totals._sum.totalAmount || 0,
        },
        items,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate payouts list error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
