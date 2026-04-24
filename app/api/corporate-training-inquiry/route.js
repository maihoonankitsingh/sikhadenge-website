export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, "").trim();
}

export async function POST(req) {
  try {
    const body = await req.json();

    const fullName = clean(body.fullName);
    const workEmail = clean(body.workEmail);
    const phoneNumber = normalizePhone(clean(body.phoneNumber));
    const companyName = clean(body.companyName);
    const teamSize = clean(body.teamSize);
    const preferredTrainingMode = clean(body.preferredTrainingMode);
    const trainingRequirement = clean(body.trainingRequirement);

    if (!fullName) {
      return NextResponse.json(
        { ok: false, message: "Full name is required." },
        { status: 400 }
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { ok: false, message: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(workEmail)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid work email." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.corporateTrainingInquiry.create({
      data: {
        fullName,
        workEmail: workEmail || null,
        phoneNumber,
        companyName: companyName || null,
        teamSize: teamSize || null,
        preferredTrainingMode: preferredTrainingMode || null,
        trainingRequirement: trainingRequirement || null,
        source: "corporate-training",
        status: "new",
        metadata: {
          page: "/corporate-training",
          submittedAt: new Date().toISOString(),
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Inquiry submitted successfully.",
      inquiryId: inquiry.id,
      createdAt: inquiry.createdAt,
    });
  } catch (error) {
    console.error("corporate-training-inquiry POST error:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
