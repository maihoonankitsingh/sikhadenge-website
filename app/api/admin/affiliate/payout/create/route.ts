export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import {
  PrismaClient,
  AffiliatePayoutStatus,
  AffiliateCommissionStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type CreatePayoutPayload = {
  affiliateId?: string;
  periodStart?: string;
  periodEnd?: string;
  payoutMethod?: string;
  payoutReference?: string;
  payoutNotes?: string;
};

function clean(value?: string | null) {
  const v = (value || "").trim();
  return v.length ? v : null;
}

function parseDate(value?: string | null) {
  const v = clean(value);
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreatePayoutPayload;

    const affiliateId = clean(body.affiliateId);
    const periodStart = parseDate(body.periodStart);
    const periodEnd = parseDate(body.periodEnd);
    const payoutMethod = clean(body.payoutMethod);
    const payoutReference = clean(body.payoutReference);
    const payoutNotes = clean(body.payoutNotes);

    if (!affiliateId) {
      return NextResponse.json(
        { ok: false, error: "affiliateId is required." },
        withAffiliateCors({ status: 400 })
      );
    }

    const affiliate = await prisma.affiliatePartner.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        fullName: true,
        affiliateCode: true,
        status: true,
        payoutMethod: true,
        payoutName: true,
        payoutUpiId: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { ok: false, error: "Affiliate not found." },
        withAffiliateCors({ status: 404 })
      );
    }

    const commissionWhere: any = {
      affiliatePartnerId: affiliate.id,
      status: {
        in: [AffiliateCommissionStatus.APPROVED, AffiliateCommissionStatus.PAID],
      },
    };

    if (periodStart || periodEnd) {
      commissionWhere.createdAt = {};
      if (periodStart) commissionWhere.createdAt.gte = periodStart;
      if (periodEnd) commissionWhere.createdAt.lte = periodEnd;
    }

    const totals = await prisma.affiliateCommission.aggregate({
      where: commissionWhere,
      _sum: {
        commissionAmount: true,
      },
      _count: {
        id: true,
      },
    });

    const totalAmount = Number(totals._sum.commissionAmount || 0);
    const commissionCount = Number(totals._count.id || 0);

    if (commissionCount <= 0 || totalAmount <= 0) {
      return NextResponse.json(
        { ok: false, error: "No eligible commissions found for payout batch." },
        withAffiliateCors({ status: 409 })
      );
    }

    const duplicateBatch = await prisma.affiliatePayout.findFirst({
      where: {
        affiliatePartnerId: affiliate.id,
        totalAmount,
        ...(periodStart ? { periodStart } : {}),
        ...(periodEnd ? { periodEnd } : {}),
        status: {
          in: [
            AffiliatePayoutStatus.PENDING,
            AffiliatePayoutStatus.PROCESSING,
            AffiliatePayoutStatus.PAID,
          ],
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (duplicateBatch) {
      return NextResponse.json(
        {
          ok: false,
          error: "Similar payout batch already exists.",
          existing: duplicateBatch,
        },
        withAffiliateCors({ status: 409 })
      );
    }

    const created = await prisma.affiliatePayout.create({
      data: {
        affiliatePartnerId: affiliate.id,
        periodStart,
        periodEnd,
        totalAmount,
        payoutMethod: payoutMethod || affiliate.payoutMethod || "MANUAL",
        payoutReference,
        payoutNotes:
          payoutNotes ||
          `Payout batch created from ${commissionCount} eligible commissions.`,
        status: AffiliatePayoutStatus.PENDING,
      },
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
            payoutName: true,
            payoutMethod: true,
            payoutUpiId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate payout batch created successfully.",
        eligibleCommissionCount: commissionCount,
        payout: created,
      },
      withAffiliateCors({ status: 201 })
    );
  } catch (error) {
    console.error("Affiliate payout create error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
