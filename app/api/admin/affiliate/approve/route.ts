export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient, AffiliateStatus } from "@prisma/client";
import { buildAffiliateCodeWithSuffix } from "@/lib/affiliate/code";
import { buildAffiliateReferralLink } from "@/lib/affiliate/referral";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type ApprovePayload = {
  affiliateId?: string;
  referralPath?: string;
};

async function getUniqueAffiliateCode(
  fullName: string,
  phone?: string | null
): Promise<string> {
  const baseCode = buildAffiliateCodeWithSuffix(fullName, phone, 1);

  const exact = await prisma.affiliatePartner.findUnique({
    where: { affiliateCode: baseCode },
    select: { id: true },
  });

  if (!exact) return baseCode;

  for (let i = 2; i <= 9999; i++) {
    const nextCode = buildAffiliateCodeWithSuffix(fullName, phone, i);
    const exists = await prisma.affiliatePartner.findUnique({
      where: { affiliateCode: nextCode },
      select: { id: true },
    });
    if (!exists) return nextCode;
  }

  throw new Error("Unable to generate unique affiliate code.");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ApprovePayload;
    const affiliateId = (body.affiliateId || "").trim();
    const referralPath = (body.referralPath || "/").trim() || "/";

    if (!affiliateId) {
      return NextResponse.json(
        { ok: false, error: "affiliateId is required." },
        withAffiliateCors({ status: 400 })
      );
    }

    const partner = await prisma.affiliatePartner.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        fullName: true,
        phone: true,
        status: true,
        affiliateCode: true,
        referralLink: true,
      },
    });

    if (!partner) {
      return NextResponse.json(
        { ok: false, error: "Affiliate partner not found." },
        withAffiliateCors({ status: 404 })
      );
    }

    if (partner.status === AffiliateStatus.BLOCKED) {
      return NextResponse.json(
        { ok: false, error: "Blocked affiliate cannot be approved." },
        withAffiliateCors({ status: 409 })
      );
    }

    let affiliateCode = partner.affiliateCode;
    if (!affiliateCode) {
      affiliateCode = await getUniqueAffiliateCode(partner.fullName, partner.phone);
    }

    const referralLink = buildAffiliateReferralLink(affiliateCode, referralPath);

    const updated = await prisma.affiliatePartner.update({
      where: { id: partner.id },
      data: {
        status: AffiliateStatus.APPROVED,
        affiliateCode,
        referralLink,
        approvedAt: new Date(),
        rejectedAt: null,
        blockedAt: null,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        status: true,
        affiliateCode: true,
        referralLink: true,
        approvedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate approved successfully.",
        affiliate: updated,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate approve error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
