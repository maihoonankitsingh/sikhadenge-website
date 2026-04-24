export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AffiliateStatus } from "@prisma/client";

const prisma = new PrismaClient();

type TrackClickPayload = {
  code?: string;
  landingPage?: string;
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

function clean(value?: string | null) {
  const v = (value || "").trim();
  return v.length ? v : null;
}

function normalizeCode(value?: string | null) {
  return (value || "").trim().toUpperCase();
}

function getIpAddress(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    null
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TrackClickPayload;
    const code = normalizeCode(body.code);

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
        affiliateCode: true,
        fullName: true,
        status: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { ok: false, error: "Affiliate code not found or not approved." },
        { status: 404 }
      );
    }

    const click = await prisma.affiliateClick.create({
      data: {
        affiliatePartnerId: affiliate.id,
        affiliateCode: affiliate.affiliateCode,
        landingPage: clean(body.landingPage),
        referrerUrl: clean(body.referrerUrl),
        ipAddress: clean(getIpAddress(req)),
        userAgent: clean(req.headers.get("user-agent")),
        utmSource: clean(body.utmSource),
        utmMedium: clean(body.utmMedium),
        utmCampaign: clean(body.utmCampaign),
        utmTerm: clean(body.utmTerm),
        utmContent: clean(body.utmContent),
      },
      select: {
        id: true,
        affiliatePartnerId: true,
        affiliateCode: true,
        landingPage: true,
        referrerUrl: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
        utmTerm: true,
        utmContent: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate click tracked successfully.",
        click,
        affiliate: {
          id: affiliate.id,
          fullName: affiliate.fullName,
          affiliateCode: affiliate.affiliateCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Affiliate track-click error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
