import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AffiliateStatus } from "@prisma/client";

const prisma = new PrismaClient();

type ApplyPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  sourceType?: string;
  audienceType?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  telegramUrl?: string;
  websiteUrl?: string;
  experience?: string;
  promotionPlan?: string;
  notes?: string;
  payoutName?: string;
  payoutMethod?: string;
  payoutUpiId?: string;
  payoutBankName?: string;
  payoutAccountNo?: string;
  payoutIfsc?: string;
};

function clean(value?: string | null) {
  const v = (value || "").trim();
  return v.length ? v : null;
}

function normalizePhone(phone?: string | null) {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isValidEmail(email?: string | null) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrlMaybe(url?: string | null) {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ApplyPayload;

    const fullName = clean(body.fullName);
    const rawPhone = clean(body.phone);
    const phone = normalizePhone(rawPhone);
    const email = clean(body.email)?.toLowerCase() || null;

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { ok: false, error: "Valid 10-digit phone is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const urlFields = [
      body.instagramUrl,
      body.youtubeUrl,
      body.telegramUrl,
      body.websiteUrl,
    ];

    for (const value of urlFields) {
      if (!isValidUrlMaybe(clean(value))) {
        return NextResponse.json(
          { ok: false, error: "One or more profile URLs are invalid." },
          { status: 400 }
        );
      }
    }

    const existingByPhone = await prisma.affiliatePartner.findFirst({
      where: {
        phone,
        status: {
          in: [
            AffiliateStatus.PENDING,
            AffiliateStatus.APPROVED,
            AffiliateStatus.BLOCKED,
          ],
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    if (existingByPhone) {
      return NextResponse.json(
        {
          ok: false,
          error: "Application already exists for this phone number.",
          existingStatus: existingByPhone.status,
        },
        { status: 409 }
      );
    }

    const existingByEmail = email
      ? await prisma.affiliatePartner.findFirst({
          where: {
            email,
            status: {
              in: [
                AffiliateStatus.PENDING,
                AffiliateStatus.APPROVED,
                AffiliateStatus.BLOCKED,
              ],
            },
          },
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        })
      : null;

    if (existingByEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Application already exists for this email.",
          existingStatus: existingByEmail.status,
        },
        { status: 409 }
      );
    }

    const created = await prisma.affiliatePartner.create({
      data: {
        fullName,
        phone,
        email,
        city: clean(body.city),
        sourceType: clean(body.sourceType),
        audienceType: clean(body.audienceType),
        instagramUrl: clean(body.instagramUrl),
        youtubeUrl: clean(body.youtubeUrl),
        telegramUrl: clean(body.telegramUrl),
        websiteUrl: clean(body.websiteUrl),
        experience: clean(body.experience),
        promotionPlan: clean(body.promotionPlan),
        notes: clean(body.notes),
        payoutName: clean(body.payoutName),
        payoutMethod: clean(body.payoutMethod),
        payoutUpiId: clean(body.payoutUpiId),
        payoutBankName: clean(body.payoutBankName),
        payoutAccountNo: clean(body.payoutAccountNo),
        payoutIfsc: clean(body.payoutIfsc),
        status: AffiliateStatus.PENDING,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate application submitted successfully.",
        application: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Affiliate apply error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
