export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AffiliateStatus } from "@prisma/client";

const prisma = new PrismaClient();

type CapturePayload = {
  affiliateCode?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  courseInterest?: string;
  sourcePage?: string;
  externalLeadId?: string;
  captureSource?: string;
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

function normalizePhone(value?: string | null) {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits || null;
}

function isValidEmail(email?: string | null) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CapturePayload;

    const affiliateCode = normalizeCode(body.affiliateCode);
    const fullName = clean(body.fullName);
    const phone = normalizePhone(body.phone);
    const email = clean(body.email)?.toLowerCase() || null;

    if (!affiliateCode) {
      return NextResponse.json(
        { ok: false, error: "affiliateCode is required." },
        { status: 400 }
      );
    }

    if (!phone && !email) {
      return NextResponse.json(
        { ok: false, error: "phone or email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const affiliate = await prisma.affiliatePartner.findFirst({
      where: {
        affiliateCode,
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

    const existing = await prisma.affiliateLeadCapture.findFirst({
      where: {
        affiliatePartnerId: affiliate.id,
        ...(phone ? { phone } : {}),
        ...(email ? { email } : {}),
        ...(clean(body.externalLeadId) ? { externalLeadId: clean(body.externalLeadId) } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          ok: true,
          deduped: true,
          message: "Affiliate lead capture already exists.",
          capture: existing,
        },
        { status: 200 }
      );
    }

    const capture = await prisma.affiliateLeadCapture.create({
      data: {
        affiliatePartnerId: affiliate.id,
        affiliateCode: affiliate.affiliateCode,
        fullName,
        phone,
        email,
        courseInterest: clean(body.courseInterest),
        sourcePage: clean(body.sourcePage),
        externalLeadId: clean(body.externalLeadId),
        captureSource: clean(body.captureSource) || "manual-api",
        referrerUrl: clean(body.referrerUrl),
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
        fullName: true,
        phone: true,
        email: true,
        courseInterest: true,
        sourcePage: true,
        externalLeadId: true,
        captureSource: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate lead captured successfully.",
        capture,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Affiliate capture-lead error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
