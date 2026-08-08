export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      source,
      course,
      message,
      page,
      promoCode,
      device,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_id,
      utm_adset,
      utm_ad,
      utm_campaign_id,
      utm_adset_id,
      utm_ad_id,
      fbclid,
      gclid,
      msclkid,
      landing_page,
      referrer,
    } = body || {};

    
    const stripTpl = (v: any) => {
      const s = typeof v === "string" ? v : null;
      if (!s) return null;
      return s.includes("{{") ? null : s;
    };
if (!phone) {
      return NextResponse.json({ ok: false, error: "Phone required" }, { status: 400 });
    }

    // Duplicate suppression (same phone within last 10 min)
    const since = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await prisma.lead.findFirst({
      where: { phone, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
    });
    if (existing) return NextResponse.json({ ok: true, lead: existing, created: false });

    const ua = req.headers.get("user-agent") || null;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const lead = await prisma.lead.create({
      data: {
        name: name || null,
        phone,
        source: stripTpl(source) || "website-modal",
        status: "new",
          utmSource: stripTpl(utm_source),
          utmMedium: stripTpl(utm_medium),
          utmCampaign: stripTpl(utm_campaign),
          utmCampaignId: stripTpl(utm_campaign_id),
          utmAdset: stripTpl(utm_adset),
          utmAdsetId: stripTpl(utm_adset_id),
          utmAd: stripTpl(utm_ad),
          utmAdId: stripTpl(utm_ad_id),
          fbclid: stripTpl(fbclid),
          landingPage: stripTpl(landing_page),
          referrer: stripTpl(referrer),
        notes: JSON.stringify({
          course,
          page,
          message,
          promoCode,
          device,
          userAgent: ua,
          ip,

            tracking: {
              utm_source: stripTpl(utm_source),
              utm_medium: stripTpl(utm_medium),
              utm_campaign: stripTpl(utm_campaign),
              utm_term: stripTpl(utm_term),
              utm_content: stripTpl(utm_content),
              utm_id: stripTpl(utm_id),
              utm_adset: stripTpl(utm_adset),
              utm_ad: stripTpl(utm_ad),
              utm_campaign_id: stripTpl(utm_campaign_id),
              utm_adset_id: stripTpl(utm_adset_id),
              utm_ad_id: stripTpl(utm_ad_id),
              fbclid: stripTpl(fbclid),
              gclid: stripTpl(gclid),
              msclkid: stripTpl(msclkid),
              landing_page: stripTpl(landing_page),
              referrer: stripTpl(referrer),
            },
        }),
      },
    });

    // Neodove PUSH (Custom Integration)
    const endpoint =
      "https://d20b0ff5-e234-4652-8def-6d7f3d5f5e8d.neodove.com/integration/custom/356b2e1f-9144-41ad-a8d2-b5a793910661/leads";

    const mobile = String(phone).replace(/\D/g, "").slice(-10);

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          name: name || "Website Lead",
          mobile,
          email: null,
          detail1: course || null,          // Course
          detail2: page || null,            // Page / Source
          detail3: message || null,          // Profile & Level
          detail4: promoCode || null,        // Promo Code
          detail5: device || null,           // Laptop / PC Available
        }),
    }).catch((e) => console.error("NEODOVE_PUSH_FAIL", e));

    return NextResponse.json({ ok: true, lead, created: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || "Server error") },
      { status: 500 }
    );
  }
}
