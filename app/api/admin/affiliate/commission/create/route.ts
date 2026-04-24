export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { affiliateCorsPreflight, withAffiliateCors } from "@/lib/api-cors";
import {
  PrismaClient,
  AffiliateStatus,
  AffiliateCommissionType,
  AffiliateCommissionStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

export async function OPTIONS() {
  return affiliateCorsPreflight();
}

type CreateCommissionPayload = {
  affiliateId?: string;
  leadId?: string;
  paymentId?: string;
  admissionId?: string;
  commissionType?: "FIXED" | "PERCENT";
  commissionRate?: number | string;
  baseAmount?: number | string;
  commissionAmount?: number | string;
  remarks?: string;
};

function toNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateCommissionPayload;

    const affiliateId = (body.affiliateId || "").trim();
    const leadId = (body.leadId || "").trim() || null;
    const paymentId = (body.paymentId || "").trim() || null;
    const admissionId = (body.admissionId || "").trim() || null;
    const remarks = (body.remarks || "").trim() || null;

    const commissionType =
      (body.commissionType || "FIXED").toString().trim().toUpperCase() === "PERCENT"
        ? AffiliateCommissionType.PERCENT
        : AffiliateCommissionType.FIXED;

    const commissionRate = toNumber(body.commissionRate);
    const baseAmount = toNumber(body.baseAmount) ?? 0;
    let commissionAmount = toNumber(body.commissionAmount);

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
        status: true,
        fullName: true,
        affiliateCode: true,
      },
    });

    if (!affiliate) {
      return NextResponse.json(
        { ok: false, error: "Affiliate not found." },
        withAffiliateCors({ status: 404 })
      );
    }

    if (affiliate.status !== AffiliateStatus.APPROVED) {
      return NextResponse.json(
        { ok: false, error: "Commission can be created only for approved affiliate." },
        withAffiliateCors({ status: 409 })
      );
    }

    if (commissionType === AffiliateCommissionType.PERCENT) {
      if (commissionRate === null || commissionRate < 0) {
        return NextResponse.json(
          { ok: false, error: "Valid commissionRate is required for percent type." },
          withAffiliateCors({ status: 400 })
        );
      }
      commissionAmount = Number(((baseAmount * commissionRate) / 100).toFixed(2));
    }

    if (commissionAmount === null || commissionAmount < 0) {
      return NextResponse.json(
        { ok: false, error: "Valid commissionAmount is required." },
        withAffiliateCors({ status: 400 })
      );
    }

    const duplicate = await prisma.affiliateCommission.findFirst({
      where: {
        affiliatePartnerId: affiliate.id,
        commissionAmount,
        status: {
          in: [
            AffiliateCommissionStatus.PENDING,
            AffiliateCommissionStatus.APPROVED,
            AffiliateCommissionStatus.PAID,
          ],
        },
        ...(leadId ? { leadId } : {}),
        ...(paymentId ? { paymentId } : {}),
        ...(admissionId ? { admissionId } : {}),
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          ok: false,
          error: "Duplicate commission already exists for this affiliate mapping.",
          existing: duplicate,
        },
        withAffiliateCors({ status: 409 })
      );
    }

    const created = await prisma.affiliateCommission.create({
      data: {
        affiliatePartnerId: affiliate.id,
        leadId,
        paymentId,
        admissionId,
        commissionType,
        commissionRate,
        baseAmount,
        commissionAmount,
        status: AffiliateCommissionStatus.PENDING,
        remarks,
      },
      select: {
        id: true,
        affiliatePartnerId: true,
        leadId: true,
        paymentId: true,
        admissionId: true,
        commissionType: true,
        commissionRate: true,
        baseAmount: true,
        commissionAmount: true,
        status: true,
        remarks: true,
        createdAt: true,
        affiliatePartner: {
          select: {
            fullName: true,
            affiliateCode: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Affiliate commission created successfully.",
        commission: created,
      },
      withAffiliateCors({ status: 201 })
    );
  } catch (error) {
    console.error("Affiliate commission create error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      withAffiliateCors({ status: 500 })
    );
  }
}
