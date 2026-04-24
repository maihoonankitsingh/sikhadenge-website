export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient, AffiliatePayoutStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type Payload = {
  payoutId?: string;
  reason?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload;
    const payoutId = (body.payoutId || "").trim();
    const reason = (body.reason || "").trim();

    if (!payoutId) {
      return NextResponse.json(
        { ok: false, error: "payoutId is required." },
        withAffiliateCors({ status: 400 })
      );
    }

    const row = await prisma.affiliatePayout.findUnique({
      where: { id: payoutId },
      select: { id: true, status: true, payoutNotes: true },
    });

    if (!row) {
      return NextResponse.json(
        { ok: false, error: "Payout batch not found." },
        withAffiliateCors({ status: 404 })
      );
    }

    if (row.status === AffiliatePayoutStatus.PAID) {
      return NextResponse.json(
        { ok: false, error: "Paid payout cannot be marked failed." },
        withAffiliateCors({ status: 409 })
      );
    }

    if (row.status === AffiliatePayoutStatus.CANCELLED) {
      return NextResponse.json(
        { ok: false, error: "Cancelled payout cannot be marked failed." },
        withAffiliateCors({ status: 409 })
      );
    }

    const mergedNotes = [
      row.payoutNotes?.trim() || null,
      reason ? `[FAILED_REASON] ${reason}` : null,
    ].filter(Boolean).join("\n\n");

    const updated = await prisma.affiliatePayout.update({
      where: { id: payoutId },
      data: {
        status: AffiliatePayoutStatus.FAILED,
        payoutNotes: mergedNotes || row.payoutNotes,
      },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        payoutMethod: true,
        payoutReference: true,
        payoutNotes: true,
        processedAt: true,
        createdAt: true,
        affiliatePartner: {
          select: {
            fullName: true,
            affiliateCode: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Payout marked failed successfully.",
        payout: updated,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate payout mark-failed error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
