export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AffiliateStatus } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeCode(value: string | null) {
  return (value || "").trim().toUpperCase();
}

export async function GET(req: NextRequest) {
  try {
    const code = normalizeCode(req.nextUrl.searchParams.get("code"));

    if (!code) {
      return NextResponse.json(
        { ok: false, error: "Affiliate code is required." },
        { status: 400 }
      );
    }

    const affiliate = await prisma.affiliatePartner.findFirst({
      where: {
        affiliateCode: code,
        status: AffiliateStatus.APPROVED,
      },
      select: {
        id: true,
        fullName: true,
        affiliateCode: true,
        referralLink: true,
        status: true,
        createdAt: true,
        approvedAt: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { ok: false, error: "Affiliate code not found or not approved." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        affiliate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Affiliate resolve error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
