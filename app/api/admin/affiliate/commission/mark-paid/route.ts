export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient, AffiliateCommissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type MarkPaidPayload = {
  commissionId?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MarkPaidPayload;
    const commissionId = (body.commissionId || "").trim();

    if (!commissionId) {
      return NextResponse.json(
        { ok: false, error: "commissionId is required." },
        withAffiliateCors({ status: 400 })
      );
    }

    const row = await prisma.affiliateCommission.findUnique({
      where: { id: commissionId },
      select: { id: true, status: true },
    });

    if (!row) {
      return NextResponse.json(
        { ok: false, error: "Commission not found." },
        withAffiliateCors({ status: 404 })
      );
    }

    if (row.status === AffiliateCommissionStatus.PAID) {
      return NextResponse.json(
        { ok: false, error: "Commission is already marked paid." },
        withAffiliateCors({ status: 409 })
      );
    }

    if (
      row.status !== AffiliateCommissionStatus.APPROVED &&
      row.status !== AffiliateCommissionStatus.PENDING
    ) {
      return NextResponse.json(
        { ok: false, error: "Only pending or approved commission can be marked paid." },
        withAffiliateCors({ status: 409 })
      );
    }

    const updated = await prisma.affiliateCommission.update({
      where: { id: commissionId },
      data: {
        status: AffiliateCommissionStatus.PAID,
        paidAt: new Date(),
        approvedAt: row.status === AffiliateCommissionStatus.PENDING ? new Date() : undefined,
      },
      select: {
        id: true,
        status: true,
        approvedAt: true,
        paidAt: true,
        reversedAt: true,
        commissionAmount: true,
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
        message: "Commission marked paid successfully.",
        commission: updated,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate commission mark-paid error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
