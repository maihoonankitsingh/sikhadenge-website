import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";

const NEODOVE_REALTIME_ENDPOINT = "https://d20b0ff5-e234-4652-8def-6d7f3d5f5e8d.neodove.com/integration/custom/2878f1fd-6d9b-4520-add8-c8a500aabae0/leads";

const MASTERCLASS_REDIRECT_TO =
  "https://us06web.zoom.us/j/88979724523?pwd=FlKRIJwdYOrbqqHAl1wYLfLwNgAyPt.1";

export const dynamic = "force-dynamic";

function normalizeIndianMobile(raw: string) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits;
}

async function pushToNeodoveRealtime(input: {
  name?: string;
  phone?: string;
  email?: string;
  page?: string;
}) {
  try {
    if (String(input.page || "").trim() !== "/gen-ai-masterclass/register-one-step") return;

    const mobile = normalizeIndianMobile(String(input.phone || ""));
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      console.log("NEODOVE_REALTIME_SKIP_INVALID_MOBILE", {
        raw: input.phone,
        normalized: mobile,
      });
      return;
    }

    const payload = {
      name: String(input.name || "").trim(),
      mobile,
      email: String(input.email || "").trim(),
    };

    const res = await fetch(NEODOVE_REALTIME_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("NEODOVE_REALTIME_ERROR", res.status, text);
    } else {
      console.log("NEODOVE_REALTIME_OK", { status: res.status, mobile });
    }
  } catch (error) {
    console.error("NEODOVE_REALTIME_FETCH_ERROR", error);
  }
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function sendMetaLeadEvent(args: {
  req: NextRequest;
  name: string;
  email: string;
  phone: string;
  page: string;
  createdId?: string | null;
  tracking: { fbclid?: string; utm_source?: string; utm_campaign?: string };
  raw: any;
}) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const userAgent = args.req.headers.get("user-agent") || undefined;
  const forwardedFor = args.req.headers.get("x-forwarded-for") || "";
  const clientIp = forwardedFor.split(",")[0]?.trim() || undefined;

  const fbc = args.raw?.fbc
    ? String(args.raw.fbc)
    : args.tracking?.fbclid
    ? `fb.1.${Date.now()}.${String(args.tracking.fbclid)}`
    : undefined;

  const fbp = args.raw?.fbp ? String(args.raw.fbp) : undefined;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url:
          (args.raw?.landingUrl ? String(args.raw.landingUrl) : "") ||
          `https://sikhadenge.in${args.page || "/masterclass"}`,
        user_data: {
          em: args.email ? [sha256(args.email)] : undefined,
          ph: args.phone ? [sha256(args.phone.replace(/\D/g, ""))] : undefined,
          fn: args.name ? [sha256(args.name.split(" ")[0])] : undefined,
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbc,
          fbp,
        },
        custom_data: {
          content_name: "Gen AI Masterclass Registration",
          status: "registered",
          page: args.page || "/masterclass",
          utm_source: args.tracking?.utm_source || undefined,
          utm_campaign: args.tracking?.utm_campaign || undefined,
        },
        event_id: args.createdId || undefined,
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/v23.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("META_CAPI_LEAD_ERROR", res.status, json);
  } else {
    console.log("META_CAPI_LEAD_OK", json);
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let raw: any = {};

    if (contentType.includes("application/json")) {
      raw = await req.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      raw = Object.fromEntries(form.entries());
    } else {
      raw = await req.json().catch(() => ({}));
    }

    const name = String(raw?.name ?? "").trim();
    const email = String(raw?.email ?? "").trim();
    const phone = String(raw?.phone ?? "").trim();
    const goal = String(raw?.goal ?? "").trim();
    const laptop = String(raw?.laptop ?? "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    const page = String(raw?.page ?? "/masterclass").trim();

    const tracking = {
      utm_source: raw?.utm_source ? String(raw.utm_source) : "",
      utm_medium: raw?.utm_medium ? String(raw.utm_medium) : "",
      utm_campaign: raw?.utm_campaign ? String(raw.utm_campaign) : "",
      utm_term: raw?.utm_term ? String(raw.utm_term) : "",
      utm_content: raw?.utm_content ? String(raw.utm_content) : "",
      utm_campaign_id: raw?.utm_campaign_id ? String(raw.utm_campaign_id) : "",
      utm_adset_id: raw?.utm_adset_id ? String(raw.utm_adset_id) : "",
      utm_ad_id: raw?.utm_ad_id ? String(raw.utm_ad_id) : "",
      fbclid: raw?.fbclid ? String(raw.fbclid) : "",
    };

    const laptopBool = laptop === "true" ? true : laptop === "false" ? false : null;

    const data: any = {
      name,
      email,
      phone,
      goal,
      laptop: laptopBool,
      page,
      source: raw?.source ?? "website",
      attribution: {
        ...tracking,
        page,
      },
      createdAt: new Date(),
    };

    if (tracking.utm_source) data.utm_source = tracking.utm_source;
    if (tracking.utm_medium) data.utm_medium = tracking.utm_medium;
    if (tracking.utm_campaign) data.utm_campaign = tracking.utm_campaign;
    if (tracking.utm_term) data.utm_term = tracking.utm_term;
    if (tracking.utm_content) data.utm_content = tracking.utm_content;
    if (tracking.utm_campaign_id) data.utm_campaign_id = tracking.utm_campaign_id;
    if (tracking.utm_adset_id) data.utm_adset_id = tracking.utm_adset_id;
    if (tracking.utm_ad_id) data.utm_ad_id = tracking.utm_ad_id;
    if (tracking.fbclid) data.fbclid = tracking.fbclid;

    let created: any = null;
    let isNewLead = false;

    if (page === "/masterclass") {
      const existingZoomJoin = await prisma.masterclassZoomJoin.findFirst({
        where: { phone },
      });

      created = existingZoomJoin
        ? await prisma.masterclassZoomJoin.update({
            where: { id: existingZoomJoin.id },
            data: {
              phone: data.phone,
              name: data.name,
              email: data.email,
              utm_source: data.utm_source || null,
              utm_medium: data.utm_medium || null,
              utm_campaign: data.utm_campaign || null,
              utm_content: data.utm_content || null,
              utm_term: data.utm_term || null,
              redirectTo: MASTERCLASS_REDIRECT_TO,
              leadName: data.name || null,
              leadEmail: data.email || null,
              leadPhone: data.phone || null,
              status: existingZoomJoin.status || "registered",
            },
          })
        : await prisma.masterclassZoomJoin.create({
            data: {
              phone: data.phone,
              name: data.name,
              email: data.email,
              utm_source: data.utm_source || null,
              utm_medium: data.utm_medium || null,
              utm_campaign: data.utm_campaign || null,
              utm_content: data.utm_content || null,
              utm_term: data.utm_term || null,
              redirectTo: MASTERCLASS_REDIRECT_TO,
              leadName: data.name || null,
              leadEmail: data.email || null,
              leadPhone: data.phone || null,
              status: "registered",
            },
          });

      isNewLead = !existingZoomJoin;
    } else {
      const existingLead = await prisma.masterclassLead.findUnique({
        where: { phone },
      });

      created = existingLead
        ? await prisma.masterclassLead.update({
            where: { phone },
            data: {
              name: data.name,
              email: data.email,
              laptop: data.laptop,
              goal: data.goal,
              source: data.source,
              page: data.page,
              attribution: data.attribution,
              utm_source: data.utm_source,
              utm_medium: data.utm_medium,
              utm_campaign: data.utm_campaign,
              utm_term: data.utm_term,
              utm_content: data.utm_content,
              utm_campaign_id: data.utm_campaign_id,
              utm_adset_id: data.utm_adset_id,
              utm_ad_id: data.utm_ad_id,
              fbclid: data.fbclid,
            },
          })
        : await prisma.masterclassLead.create({
            data,
          });

      isNewLead = !existingLead;
    }

    try {
      await prisma.masterclassSubmission.create({
        data: {
          leadId: created?.id ?? null,
          name: created?.name ?? name,
          phone: created?.phone ?? phone,
          email: created?.email ?? email ?? null,
          laptop:
            typeof created?.laptop === "boolean"
              ? created.laptop
              : typeof data.laptop === "boolean"
              ? data.laptop
              : null,
          goal: created?.goal ?? goal ?? null,
          source: created?.source ?? data.source ?? null,
          page: created?.page ?? page ?? null,
          attribution: created?.attribution ?? data.attribution ?? Prisma.JsonNull,
          utm_source: created?.utm_source ?? data.utm_source ?? null,
          utm_medium: created?.utm_medium ?? data.utm_medium ?? null,
          utm_campaign: created?.utm_campaign ?? data.utm_campaign ?? null,
          utm_content: created?.utm_content ?? data.utm_content ?? null,
          utm_term: created?.utm_term ?? data.utm_term ?? null,
          utm_id: created?.utm_id ?? null,
          utm_campaign_id: created?.utm_campaign_id ?? data.utm_campaign_id ?? null,
          utm_adset_id: created?.utm_adset_id ?? data.utm_adset_id ?? null,
          utm_ad_id: created?.utm_ad_id ?? data.utm_ad_id ?? null,
          fbclid: created?.fbclid ?? data.fbclid ?? null,
          gclid: created?.gclid ?? null,
          msclkid: created?.msclkid ?? null,
          landing_url: raw?.landingUrl ? String(raw.landingUrl) : null,
          referrer: raw?.referrer ? String(raw.referrer) : null,
        } as any,
      });
      console.log("MASTERCLASS_SUBMISSION_LOG_OK_APP", {
        leadId: created?.id ?? null,
        phone: created?.phone ?? phone,
        source: created?.source ?? data.source ?? null,
      });
    } catch (submissionErr) {
      console.error("MASTERCLASS_SUBMISSION_LOG_FAILED_APP", submissionErr);
    }

    if (isNewLead) {
      try {
        const recentQueued = await prisma.aisensyReminderQueue.findFirst({
          where: {
            phone: created.phone,
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { createdAt: "desc" },
        });

        if (!recentQueued) {
          await prisma.aisensyReminderQueue.create({
            data: {
              phone: created.phone,
              name: created.name || "Friend",
              sendAt: new Date(Date.now() + 10 * 60 * 1000),
              status: "pending",
            },
          });
        }
      } catch (queueError) {
        console.error("MASTERCLASS_AISENSY_QUEUE_CREATE_ERROR", queueError);
      }
    }

    try {
      await sendMetaLeadEvent({
        req,
        name,
        email,
        phone,
        page,
        createdId: created?.id ?? null,
        tracking,
        raw,
      });
    } catch (metaError) {
      console.error("META_CAPI_LEAD_THROWN", metaError);
    }

    const accept = req.headers.get("accept") || "";
    const isBrowserForm =
      !contentType.includes("application/json") && accept.includes("text/html");

    if (isBrowserForm) {
      const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "sikhadenge.in";
      const proto = req.headers.get("x-forwarded-proto") || "https";
      const redirectUrl = `${proto}://${host}/masterclass?ok=1&phone=${encodeURIComponent(
        created.phone
      )}`;
      return NextResponse.redirect(redirectUrl, { status: 302 });
    }

    return NextResponse.json({
      ok: true,
      id: created?.id ?? null,
      message: "Lead saved successfully",
    });
  } catch (error: any) {
    console.error("MASTERCLASS_LEAD_CREATE_ERROR_APP", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
