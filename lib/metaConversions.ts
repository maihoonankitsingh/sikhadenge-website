import crypto from "crypto";
import type { NextRequest } from "next/server";
import {
  CONSENT_COOKIE_NAME,
  parseConsentState,
} from "@/lib/consent";

type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbp?: string;
  fbc?: string;
};

type MetaConversionArguments = {
  req: NextRequest;
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  user: MetaUserData;
  customData?: Record<string, unknown>;
};

export type MetaConversionResult = {
  status: "sent" | "skipped" | "failed";
  reason?: string;
  httpStatus?: number;
};

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

function normalizeEmail(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function normalizePhone(value?: string) {
  const digits = String(value || "")
    .replace(/\D/g, "");

  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `91${digits}`;
  }

  return digits;
}

function normalizeName(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function advertisingConsentGranted(req: NextRequest) {
  const raw = req.cookies.get(CONSENT_COOKIE_NAME)?.value;

  if (!raw) return false;

  const candidates = [raw];

  try {
    candidates.push(decodeURIComponent(raw));
  } catch {}

  for (const candidate of candidates) {
    const state = parseConsentState(candidate);

    if (state?.advertising === "granted") {
      return true;
    }
  }

  return false;
}

function graphVersion() {
  const configured = String(
    process.env.META_GRAPH_API_VERSION || ""
  ).trim();

  if (/^v\d+\.\d+$/.test(configured)) {
    return configured;
  }

  return "v25.0";
}

function clientIp(req: NextRequest) {
  const cloudflare = req.headers.get("cf-connecting-ip");

  if (cloudflare) return cloudflare.trim();

  const forwarded = req.headers.get("x-forwarded-for") || "";
  const first = forwarded.split(",")[0]?.trim();

  if (first) return first;

  return req.headers.get("x-real-ip")?.trim() || undefined;
}

export async function sendMetaConversionEvent(
  args: MetaConversionArguments
): Promise<MetaConversionResult> {
  try {
    if (!advertisingConsentGranted(args.req)) {
      return {
        status: "skipped",
        reason: "advertising_consent_denied",
      };
    }

    const pixelId = String(
      process.env.META_PIXEL_ID ||
        process.env.NEXT_PUBLIC_META_PIXEL_ID ||
        ""
    ).trim();

    const accessToken = String(
      process.env.META_CAPI_ACCESS_TOKEN ||
        process.env.META_CONVERSIONS_API_TOKEN ||
        ""
    ).trim();

    if (!pixelId || !accessToken) {
      return {
        status: "skipped",
        reason: "missing_meta_capi_configuration",
      };
    }

    const email = normalizeEmail(args.user.email);
    const phone = normalizePhone(args.user.phone);
    const firstName = normalizeName(args.user.firstName);
    const lastName = normalizeName(args.user.lastName);

    const userData: Record<string, unknown> = {};

    if (email) userData.em = [sha256(email)];
    if (phone) userData.ph = [sha256(phone)];
    if (firstName) userData.fn = [sha256(firstName)];
    if (lastName) userData.ln = [sha256(lastName)];

    const ip = clientIp(args.req);
    const userAgent = args.req.headers.get("user-agent") || undefined;
    const fbp = args.user.fbp || reqCookie(args.req, "_fbp");
    const fbc = args.user.fbc || reqCookie(args.req, "_fbc");

    if (ip) userData.client_ip_address = ip;
    if (userAgent) userData.client_user_agent = userAgent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;

    const requestBody: Record<string, unknown> = {
      data: [
        {
          event_name: args.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: args.eventId,
          action_source: "website",
          event_source_url: args.eventSourceUrl,
          user_data: userData,
          custom_data: args.customData || {},
        },
      ],
    };

    const testEventCode = String(
      process.env.META_TEST_EVENT_CODE || ""
    ).trim();

    if (testEventCode) {
      requestBody.test_event_code = testEventCode;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(
        `https://graph.facebook.com/${graphVersion()}/${encodeURIComponent(
          pixelId
        )}/events?access_token=${encodeURIComponent(accessToken)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      const responseBody = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("META_CAPI_EVENT_ERROR", {
          eventName: args.eventName,
          eventId: args.eventId,
          status: response.status,
          response: responseBody,
        });

        return {
          status: "failed",
          reason: "meta_http_error",
          httpStatus: response.status,
        };
      }

      console.log("META_CAPI_EVENT_OK", {
        eventName: args.eventName,
        eventId: args.eventId,
      });

      return {
        status: "sent",
        httpStatus: response.status,
      };
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("META_CAPI_EVENT_THROWN", {
      eventName: args.eventName,
      eventId: args.eventId,
      error:
        error instanceof Error
          ? error.message
          : "unknown",
    });

    return {
      status: "failed",
      reason:
        error instanceof Error
          ? error.message
          : "unknown_error",
    };
  }
}

function reqCookie(req: NextRequest, name: string) {
  const value = req.cookies.get(name)?.value;
  return value ? String(value).trim() : undefined;
}
