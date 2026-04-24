export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ALLOWED_ORIGINS = new Set([
  "https://studio.sikhadenge.space",
  "https://sikhadenge.in",
  "https://sikhadenge.space",
]);

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}


function cleanStr(v: unknown) {
  return String(v ?? "").trim();
}
function cleanEmail(v: unknown) {
  return cleanStr(v).toLowerCase();
}
function cleanPhone(v: unknown) {
  // allow digits and +
  return cleanStr(v).replace(/[^\d+]/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = cleanStr(body?.name);
    const email = cleanEmail(body?.email);
    const phone = cleanPhone(body?.phone);

    const specialization = body?.specialization ? cleanStr(body.specialization) : null;
    const category = body?.category ? cleanStr(body.category) : null;
    const message = body?.message ? cleanStr(body.message) : null;

    // basic validation
    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400, headers: corsHeaders(req) });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400, headers: corsHeaders(req) });
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits || digits.length < 10) {
      return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400, headers: corsHeaders(req) });
    }

    // optional tracking/meta
    const page = body?.page ? cleanStr(body.page) : null;
    const utmSource = body?.utmSource ? cleanStr(body.utmSource) : null;
    const utmMedium = body?.utmMedium ? cleanStr(body.utmMedium) : null;
    const utmCampaign = body?.utmCampaign ? cleanStr(body.utmCampaign) : null;

    // DB save disabled (ContactSubmission model not present)
    const savedId: string | null = null;

    // 2) Push to NeoDove
    const endpoint = process.env.NEODOVE_ENDPOINT;
    if (!endpoint) {
      return NextResponse.json({ ok: false, error: "NeoDove endpoint missing in env" }, { status: 500, headers: corsHeaders(req) });
    }

    const neoPayload = {
      name,
      mobile: digits, // NeoDove expects number; keeping digits only
      email,
      detail1: specialization || category || "",
      detail2: message || "",
    };

    const neoRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(neoPayload),
      // avoid caching
      cache: "no-store",
    });

    const neoText = await neoRes.text();
    let neoJson: any = null;
    try { neoJson = JSON.parse(neoText); } catch {}

    if (!neoRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "NeoDove push failed",
          status: neoRes.status,
          neoResponse: neoJson ?? neoText,
          savedId,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      savedId,
      neoResponse: neoJson ?? neoText,
    }, { headers: corsHeaders(req) });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500, headers: corsHeaders(req) });
  }
}
