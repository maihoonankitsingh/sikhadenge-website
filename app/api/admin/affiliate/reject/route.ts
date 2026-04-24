export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import { PrismaClient, AffiliateStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type RejectPayload = {
  affiliateId?: string;
  reason?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RejectPayload;
    const affiliateId = (body.affiliateId || "").trim();
    const reason = (body.reason || "").trim();

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
        status: true,
        notes: true,
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
        { ok: false, error: "Blocked affiliate cannot be rejected." },
        withAffiliateCors({ status: 409 })
      );
    }

    const mergedNotes = [
      partner.notes?.trim() || null,
      reason ? `[REJECTION_REASON] ${reason}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const updated = await prisma.affiliatePartner.update({
      where: { id: affiliateId },
      data: {
        status: AffiliateStatus.REJECTED,
        rejectedAt: new Date(),
        approvedAt: null,
        notes: mergedNotes || partner.notes,
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
        rejectedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate rejected successfully.",
        affiliate: updated,
      },
      withAffiliateCors({ status: 200 })
    );
  } catch (error) {
    console.error("Affiliate reject error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
