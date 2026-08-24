import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
import { CONSENT_COOKIE_NAME, parseConsentState } from "../../../../lib/consent";

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


async function pushToMasterclassWhatsApp(input: {
  registrationId: string;
  name: string;
  phone: string;
  email?: string;
  consent: boolean;
}) {
  const endpoint =
    process.env.MASTERCLASS_WHATSAPP_WEBHOOK_ENDPOINT?.trim() || "";

  const secret =
    process.env.MASTERCLASS_WHATSAPP_WEBHOOK_SECRET?.trim() || "";

  if (!endpoint || !secret) {
    throw new Error(
      "Masterclass WhatsApp webhook is not configured"
    );
  }

  const mobile = normalizeIndianMobile(input.phone);

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    throw new Error(
      "Invalid Indian WhatsApp mobile number"
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      registrationId: input.registrationId,
      name: input.name,
      phone: `91${mobile}`,
      email: input.email || undefined,
      source: "WEBSITE_MASTERCLASS",
      consent: input.consent,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  const responseText =
    await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(
      `Masterclass WhatsApp webhook failed: ` +
      `${response.status} ${responseText.slice(0, 300)}`
    );
  }

  console.log(
    "MASTERCLASS_WHATSAPP_WEBHOOK_OK",
    {
      status: response.status,
      registrationId: input.registrationId,
    }
  );
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function readAdvertisingConsentFromRequest(req: NextRequest) {
  const rawCookie = req.cookies.get(CONSENT_COOKIE_NAME)?.value;
  if (!rawCookie) return "denied" as const;

  try {
    const decoded = decodeURIComponent(rawCookie);
    const state = parseConsentState(decoded);
    return state?.advertising === "granted"
      ? "granted" as const
      : "denied" as const;
  } catch {
    return "denied" as const;
  }
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

    const advertisingAttributionAllowed =
      raw?.advertisingConsent === "granted" &&
      readAdvertisingConsentFromRequest(req) === "granted";

    const tracking = {
      utm_source: raw?.utm_source ? String(raw.utm_source) : "",
      utm_medium: raw?.utm_medium ? String(raw.utm_medium) : "",
      utm_campaign: raw?.utm_campaign ? String(raw.utm_campaign) : "",
      utm_term: raw?.utm_term ? String(raw.utm_term) : "",
      utm_content: raw?.utm_content ? String(raw.utm_content) : "",
      utm_id: raw?.utm_id ? String(raw.utm_id) : "",
      utm_campaign_id: raw?.utm_campaign_id ? String(raw.utm_campaign_id) : "",
      utm_adset_id: raw?.utm_adset_id ? String(raw.utm_adset_id) : "",
      utm_ad_id: raw?.utm_ad_id ? String(raw.utm_ad_id) : "",
      fbclid:
        advertisingAttributionAllowed && raw?.fbclid
          ? String(raw.fbclid)
          : "",
      gclid:
        advertisingAttributionAllowed && raw?.gclid
          ? String(raw.gclid)
          : "",
      msclkid:
        advertisingAttributionAllowed && raw?.msclkid
          ? String(raw.msclkid)
          : "",
      landing_url: raw?.landingUrl
        ? String(raw.landingUrl).slice(0, 190)
        : "",
      referrer: raw?.referrer
        ? String(raw.referrer).slice(0, 190)
        : "",
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
    if (tracking.utm_id) data.utm_id = tracking.utm_id;
    if (tracking.utm_campaign_id) data.utm_campaign_id = tracking.utm_campaign_id;
    if (tracking.utm_adset_id) data.utm_adset_id = tracking.utm_adset_id;
    if (tracking.utm_ad_id) data.utm_ad_id = tracking.utm_ad_id;
    if (tracking.fbclid) data.fbclid = tracking.fbclid;
    if (tracking.gclid) data.gclid = tracking.gclid;
    if (tracking.msclkid) data.msclkid = tracking.msclkid;
    if (tracking.landing_url) data.landing_url = tracking.landing_url;
    if (tracking.referrer) data.referrer = tracking.referrer;

    let created: any = null;

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
              utm_id: data.utm_id,
              utm_campaign_id: data.utm_campaign_id,
              utm_adset_id: data.utm_adset_id,
              utm_ad_id: data.utm_ad_id,
              fbclid: data.fbclid,
              gclid: data.gclid,
              msclkid: data.msclkid,
              landing_url: data.landing_url,
              referrer: data.referrer,
            },
          })
        : await prisma.masterclassLead.create({
            data,
          });

    }

    let submissionId: string | null = null;

    try {
      const submission = await prisma.masterclassSubmission.create({
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
          utm_id: created?.utm_id ?? data.utm_id ?? null,
          utm_campaign_id: created?.utm_campaign_id ?? data.utm_campaign_id ?? null,
          utm_adset_id: created?.utm_adset_id ?? data.utm_adset_id ?? null,
          utm_ad_id: created?.utm_ad_id ?? data.utm_ad_id ?? null,
          fbclid: created?.fbclid ?? data.fbclid ?? null,
          gclid: created?.gclid ?? data.gclid ?? null,
          msclkid: created?.msclkid ?? data.msclkid ?? null,
          landing_url: created?.landing_url ?? data.landing_url ?? null,
          referrer: created?.referrer ?? data.referrer ?? null,
        } as any,
      });
      submissionId = submission.id;
      console.log("MASTERCLASS_SUBMISSION_LOG_OK_APP", {
        leadId: created?.id ?? null,
        phone: created?.phone ?? phone,
        source: created?.source ?? data.source ?? null,
      });
    } catch (submissionErr) {
      console.error("MASTERCLASS_SUBMISSION_LOG_FAILED_APP", submissionErr);
    }

    await pushToNeodoveRealtime({
      name,
      phone,
      email,
      page,
    });

    const whatsappConsent =
      raw?.whatsappConsent === true;

    if (whatsappConsent) {
      const registrationId =
        submissionId || created?.id || "";

      if (!registrationId) {
        console.error(
          "MASTERCLASS_WHATSAPP_WEBHOOK_SKIPPED",
          { reason: "registration_id_missing" }
        );
      } else {
        try {
          await pushToMasterclassWhatsApp({
            registrationId,
            name,
            phone,
            email,
            consent: true,
          });
        } catch (whatsappError) {
          console.error(
            "MASTERCLASS_WHATSAPP_WEBHOOK_ERROR",
            whatsappError
          );
        }
      }
    } else {
      console.log(
        "MASTERCLASS_WHATSAPP_WEBHOOK_SKIPPED",
        {
          reason: "whatsapp_consent_not_granted",
          registrationId:
            submissionId || created?.id || null,
        }
      );
    }


    if (advertisingAttributionAllowed) {
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
    } else {
      console.log("META_CAPI_LEAD_SKIPPED_NO_AD_CONSENT", {
        leadId: created?.id ?? null,
        page,
      });
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
