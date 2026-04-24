import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function pick(obj: any, keys: string[]) {
  return Object.fromEntries(
    keys
      .map((k) => [k, obj?.[k]])
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ua = req.headers.get("user-agent") || null;
    const ref = req.headers.get("referer") || null;
    const fbp = req.cookies.get("_fbp")?.value ?? body.fbp ?? null;
    const fbc = req.cookies.get("_fbc")?.value ?? body.fbc ?? null;

    const name = String(body.name || "").trim() || null;
    const email = body.email ? String(body.email).trim() : null;
    const phone = String(body.phone || "").trim();
    const city = String(body.city || "").trim() || null;

    if (!phone) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const attrib = {
      ...pick(body, [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "fbclid",
        "campaign_id",
        "adset_id",
        "ad_id",
        "landing_path",
      ]),
      fbp,
      fbc,
      referrer: body.referrer ?? ref,
      user_agent: ua,
    };

    const now = new Date();

    const row = await prisma.masterclassLead.create({
      data: {
        id: crypto.randomUUID(),
        name,
        phone,
        email,
        city,
        laptop: body.laptop ?? null,
        goal: body.goal ?? null,
        source: body.source ?? "meta",
        page: body.page ?? "/masterclass-free",
        attribution: attrib,
        updatedAt: now,
      } as any,
    });

    try {
      await prisma.masterclassSubmission.create({
        data: {
          leadId: (row as any).id,
          name: (row as any).name ?? name ?? "Unknown",
          phone: (row as any).phone ?? phone,
          email: (row as any).email ?? email,
          laptop: (row as any).laptop ?? (body.laptop ?? null),
          goal: (row as any).goal ?? (body.goal ?? null),
          source: (row as any).source ?? (body.source ?? "meta"),
          page: (row as any).page ?? (body.page ?? "/masterclass-free"),
          attribution: (row as any).attribution ?? attrib ?? Prisma.JsonNull,
          utm_source: body.utm_source ?? null,
          utm_medium: body.utm_medium ?? null,
          utm_campaign: body.utm_campaign ?? null,
          utm_content: body.utm_content ?? null,
          utm_term: body.utm_term ?? null,
          fbclid: body.fbclid ?? null,
          referrer: body.referrer ?? ref ?? null,
        } as any,
      });
    } catch (submissionErr) {
      console.error("MASTERCLASS_SUBMISSION_LOG_FAILED_SRC", submissionErr);
    }

    return NextResponse.json({
      ok: true,
      id: (row as any).id,
      message: "Lead saved successfully",
      debugRoute: "src/app/api/masterclass/lead/route.ts",
    });
  } catch (e: any) {
    console.error("MASTERCLASS_LEAD_CREATE_ERROR_SRC", e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
