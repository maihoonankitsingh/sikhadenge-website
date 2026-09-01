"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useConsent } from "@/components/consent/ConsentProvider";
import { trackGoogleEvent } from "@/lib/analytics";
import {
  captureBrowserAttribution,
  queueBrowserEvent,
} from "@/lib/sikhadenge-analytics/browser";

const REGISTER_PATH = "/gen-ai-masterclass/register-one-step";
const AI_VIDEO_PATH = "/masterclass/ai-video";
const LEAD_ENDPOINT = "/api/masterclass/lead";
const CREATE_ORDER_ENDPOINT = "/api/store/create-order";
const VERIFY_PAYMENT_ENDPOINT = "/api/store/verify-payment";

const GOOGLE_ADS_LEAD_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO || "";

const GOOGLE_ADS_PURCHASE_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO || "";

const CANONICAL_ATTRIBUTION_KEY = "sd_analytics_attribution";

const LEGACY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_campaign_id",
  "utm_adset_id",
  "utm_ad_id",
  "fbclid",
  "gclid",
  "msclkid",
  "landing_page",
  "referrer",
  "source",
] as const;

type ConsentSnapshot = {
  analytics: "granted" | "denied";
  advertising: "granted" | "denied";
};

type CampaignRecord = Record<string, string | undefined>;

type AttributionTouch = {
  captured_at?: string;
  landing_page?: string;
  referrer?: string | null;
  campaign?: CampaignRecord;
};

type StoredAttribution = {
  first_touch?: AttributionTouch;
  last_touch?: AttributionTouch;
};

type FunnelAttribution = {
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_id: string;
  utm_campaign_id: string;
  utm_adset_id: string;
  utm_ad_id: string;
  fbclid: string;
  gclid: string;
  msclkid: string;
  landingUrl: string;
  referrer: string;
};

type SegmentAnalytics = {
  track?: (
    eventName: string,
    properties?: Record<string, unknown>,
  ) => unknown;
};

type ClarityFunction = (...args: unknown[]) => void;

type GtagFunction = (...args: unknown[]) => void;

type FunnelWindow = typeof window & {
  analytics?: SegmentAnalytics;
  clarity?: ClarityFunction;
  gtag?: GtagFunction;
  dataLayer?: unknown[];
  __sdFullFunnelFetchPatched?: boolean;
  __sdFullFunnelOriginalFetch?: typeof window.fetch;
  __sdFullFunnelConsent?: ConsentSnapshot;
  __sdLastLeadEventId?: string;
  __sdFunnelEventKeys?: Set<string>;
  __sdGoogleAdsConfigured?: Record<string, boolean>;
};

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readLocalStorage(key: string): string {
  try {
    return window.localStorage.getItem(key)?.trim() || "";
  } catch {
    return "";
  }
}

function readCanonicalAttribution(): StoredAttribution {
  try {
    const raw = window.localStorage.getItem(CANONICAL_ATTRIBUTION_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as StoredAttribution)
      : {};
  } catch {
    return {};
  }
}

function readCookie(name: string): string {
  const prefix = `${name}=`;

  for (const rawPart of document.cookie.split(";")) {
    const part = rawPart.trim();
    if (!part.startsWith(prefix)) continue;

    const raw = part.slice(prefix.length);

    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }

  return "";
}

function currentParam(...keys: string[]): string {
  const params = new URLSearchParams(window.location.search);

  for (const key of keys) {
    const value = params.get(key)?.trim();
    if (value) return value;
  }

  return "";
}

function storedCampaignValue(
  stored: StoredAttribution,
  key: string,
): string {
  return (
    stored.last_touch?.campaign?.[key]?.trim() ||
    stored.first_touch?.campaign?.[key]?.trim() ||
    ""
  );
}

function legacyValue(...keys: string[]): string {
  for (const key of keys) {
    const value = readLocalStorage(key);
    if (value) return value;
  }

  return "";
}

function deriveSource(): string {
  const explicit =
    currentParam("source") ||
    legacyValue("source");

  if (explicit) return explicit;

  if (window.location.pathname === AI_VIDEO_PATH) {
    return "ai-video-masterclass";
  }

  if (document.referrer.includes(AI_VIDEO_PATH)) {
    return "ai-video-masterclass";
  }

  return "website";
}

function resolveAttribution(): FunnelAttribution {
  const stored = readCanonicalAttribution();

  const pick = (
    currentKeys: string[],
    storedKey: string,
    legacyKeys: string[] = [storedKey],
  ) => {
    return (
      currentParam(...currentKeys) ||
      storedCampaignValue(stored, storedKey) ||
      legacyValue(...legacyKeys)
    );
  };

  const landingUrl =
    stored.first_touch?.landing_page?.trim() ||
    legacyValue("landing_page") ||
    window.location.href;

  const referrer =
    stored.first_touch?.referrer?.trim() ||
    stored.last_touch?.referrer?.trim() ||
    legacyValue("referrer") ||
    document.referrer ||
    "";

  return {
    source: deriveSource(),
    utm_source: pick(["utm_source"], "utm_source"),
    utm_medium: pick(["utm_medium"], "utm_medium"),
    utm_campaign: pick(["utm_campaign"], "utm_campaign"),
    utm_term: pick(["utm_term"], "utm_term"),
    utm_content: pick(["utm_content"], "utm_content"),
    utm_id: pick(["utm_id"], "utm_id"),
    utm_campaign_id: pick(
      ["utm_campaign_id", "campaign_id"],
      "utm_campaign_id",
    ),
    utm_adset_id: pick(
      ["utm_adset_id", "adset_id"],
      "utm_adset_id",
    ),
    utm_ad_id: pick(
      ["utm_ad_id", "ad_id"],
      "utm_ad_id",
    ),
    fbclid: pick(["fbclid"], "fbclid"),
    gclid: pick(["gclid"], "gclid"),
    msclkid: pick(["msclkid"], "msclkid"),
    landingUrl,
    referrer,
  };
}

function currentConsent(): ConsentSnapshot {
  const funnelWindow = window as FunnelWindow;

  return (
    funnelWindow.__sdFullFunnelConsent || {
      analytics: "denied",
      advertising: "denied",
    }
  );
}

function once(key: string, callback: () => void): void {
  const funnelWindow = window as FunnelWindow;
  funnelWindow.__sdFunnelEventKeys ||= new Set<string>();

  if (funnelWindow.__sdFunnelEventKeys.has(key)) return;

  funnelWindow.__sdFunnelEventKeys.add(key);
  callback();
}

function trackSegment(
  eventName: string,
  properties: Record<string, unknown>,
): void {
  if (currentConsent().analytics !== "granted") return;

  const analytics = (window as FunnelWindow).analytics;

  if (typeof analytics?.track === "function") {
    analytics.track(eventName, properties);
  }
}

function trackClarity(eventName: string): void {
  if (currentConsent().analytics !== "granted") return;

  const clarity = (window as FunnelWindow).clarity;

  if (typeof clarity === "function") {
    clarity("event", eventName);
  }
}

function getOrCreateGtag(): GtagFunction {
  const funnelWindow = window as FunnelWindow;

  if (typeof funnelWindow.gtag === "function") {
    return funnelWindow.gtag;
  }

  funnelWindow.dataLayer = funnelWindow.dataLayer || [];

  const gtag = function gtag(): void {
    funnelWindow.dataLayer = funnelWindow.dataLayer || [];
    funnelWindow.dataLayer.push(arguments);
  } as GtagFunction;

  funnelWindow.gtag = gtag;
  return gtag;
}

function ensureGoogleAdsDestination(sendTo: string): string {
  const destination = sendTo.split("/")[0]?.trim() || "";

  if (!/^AW-\d+$/.test(destination)) {
    return "";
  }

  const funnelWindow = window as FunnelWindow;
  const gtag = getOrCreateGtag();

  funnelWindow.__sdGoogleAdsConfigured ||= {};

  if (!funnelWindow.__sdGoogleAdsConfigured[destination]) {
    const existingGtagScript = document.querySelector<HTMLScriptElement>(
      'script[src*="googletagmanager.com/gtag/js"]',
    );

    if (!existingGtagScript) {
      const script = document.createElement("script");
      script.async = true;
      script.id = "google-ads-gtag";
      script.src =
        "https://www.googletagmanager.com/gtag/js?id=" +
        encodeURIComponent(destination);
      document.head.appendChild(script);
    }

    gtag("js", new Date());
    gtag("config", destination, {
      send_page_view: false,
    });

    funnelWindow.__sdGoogleAdsConfigured[destination] = true;
  }

  return destination;
}

function trackGoogleAdsConversion(
  sendTo: string,
  parameters: Record<string, unknown>,
): void {
  if (currentConsent().advertising !== "granted") return;
  if (!sendTo) return;

  const destination = ensureGoogleAdsDestination(sendTo);
  if (!destination) return;

  const gtag = getOrCreateGtag();

  gtag("event", "conversion", {
    send_to: sendTo,
    ...parameters,
  });
}

function queueInternalEvent(
  eventName:
    | "landing_page_viewed"
    | "cta_clicked"
    | "form_submitted"
    | "lead_created"
    | "checkout_started"
    | "payment_successful"
    | "payment_failed",
  properties: Record<string, string | number | boolean | null>,
): void {
  if (currentConsent().analytics !== "granted") return;

  queueBrowserEvent({
    event_name: eventName,
    properties,
  });
}

function appendAttributionToRegistrationUrl(url: URL): URL {
  const attribution = resolveAttribution();

  const values: Record<string, string> = {
    source: attribution.source,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    utm_id: attribution.utm_id,
    utm_campaign_id: attribution.utm_campaign_id,
    utm_adset_id: attribution.utm_adset_id,
    utm_ad_id: attribution.utm_ad_id,
  };

  if (currentConsent().advertising === "granted") {
    values.fbclid = attribution.fbclid;
    values.gclid = attribution.gclid;
    values.msclkid = attribution.msclkid;
  }

  for (const [key, value] of Object.entries(values)) {
    if (value && !url.searchParams.get(key)) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}

function enrichLeadPayload(
  body: Record<string, unknown>,
): Record<string, unknown> {
  const attribution = resolveAttribution();
  const consent = currentConsent();

  const fbclid =
    consent.advertising === "granted"
      ? attribution.fbclid
      : "";

  const gclid =
    consent.advertising === "granted"
      ? attribution.gclid
      : "";

  const msclkid =
    consent.advertising === "granted"
      ? attribution.msclkid
      : "";

  const fbp =
    consent.advertising === "granted"
      ? readCookie("_fbp")
      : "";

  const cookieFbc =
    consent.advertising === "granted"
      ? readCookie("_fbc")
      : "";

  const fbc =
    cookieFbc ||
    (fbclid
      ? `fb.1.${Date.now()}.${fbclid}`
      : "");

  const existingAttribution = asRecord(body.attribution);

  return {
    ...body,
    source: attribution.source || stringValue(body.source) || "website",
    utm_source: attribution.utm_source || body.utm_source || null,
    utm_medium: attribution.utm_medium || body.utm_medium || null,
    utm_campaign: attribution.utm_campaign || body.utm_campaign || null,
    utm_term: attribution.utm_term || body.utm_term || null,
    utm_content: attribution.utm_content || body.utm_content || null,
    utm_id: attribution.utm_id || body.utm_id || null,
    utm_campaign_id:
      attribution.utm_campaign_id || body.utm_campaign_id || null,
    utm_adset_id:
      attribution.utm_adset_id || body.utm_adset_id || null,
    utm_ad_id: attribution.utm_ad_id || body.utm_ad_id || null,
    fbclid: fbclid || body.fbclid || null,
    gclid: gclid || body.gclid || null,
    msclkid: msclkid || body.msclkid || null,
    landingUrl: attribution.landingUrl || body.landingUrl || null,
    referrer: attribution.referrer || body.referrer || null,
    fbp: fbp || body.fbp || null,
    fbc: fbc || body.fbc || null,
    attribution: {
      ...existingAttribution,
      source: attribution.source,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
      utm_id: attribution.utm_id,
      utm_campaign_id: attribution.utm_campaign_id,
      utm_adset_id: attribution.utm_adset_id,
      utm_ad_id: attribution.utm_ad_id,
      fbclid,
      gclid,
      msclkid,
      landingUrl: attribution.landingUrl,
      referrer: attribution.referrer,
      registrationUrl: window.location.href,
    },
  };
}

function enrichCheckoutPayload(
  body: Record<string, unknown>,
): Record<string, unknown> {
  const attribution = resolveAttribution();
  const consent = currentConsent();

  return {
    ...body,
    source: stringValue(body.source) || attribution.source || "store_checkout",
    utmSource: attribution.utm_source || body.utmSource || "",
    utmMedium: attribution.utm_medium || body.utmMedium || "",
    utmCampaign: attribution.utm_campaign || body.utmCampaign || "",
    utmContent: attribution.utm_content || body.utmContent || "",
    utmTerm: attribution.utm_term || body.utmTerm || "",
    utmId: attribution.utm_id || body.utmId || "",
    utmCampaignId:
      attribution.utm_campaign_id || body.utmCampaignId || "",
    utmAdsetId: attribution.utm_adset_id || body.utmAdsetId || "",
    utmAdId: attribution.utm_ad_id || body.utmAdId || "",
    fbclid:
      consent.advertising === "granted"
        ? attribution.fbclid || body.fbclid || ""
        : "",
    gclid:
      consent.advertising === "granted"
        ? attribution.gclid || body.gclid || ""
        : "",
    msclkid:
      consent.advertising === "granted"
        ? attribution.msclkid || body.msclkid || ""
        : "",
    landingPage: attribution.landingUrl || body.landingPage || "",
    referrer: attribution.referrer || body.referrer || "",
  };
}

async function responseJson(response: Response): Promise<Record<string, unknown>> {
  try {
    const parsed = await response.clone().json();
    return asRecord(parsed);
  } catch {
    return {};
  }
}

function requestUrl(input: RequestInfo | URL): URL | null {
  try {
    if (typeof input === "string") {
      return new URL(input, window.location.href);
    }

    if (input instanceof URL) {
      return new URL(input.toString());
    }

    return new URL(input.url, window.location.href);
  } catch {
    return null;
  }
}

function parseJsonBody(init?: RequestInit): Record<string, unknown> | null {
  if (!init || typeof init.body !== "string") return null;

  try {
    const parsed = JSON.parse(init.body);
    return asRecord(parsed);
  } catch {
    return null;
  }
}

function installFetchPatch(): () => void {
  const funnelWindow = window as FunnelWindow;

  if (funnelWindow.__sdFullFunnelFetchPatched) {
    return () => undefined;
  }

  const originalFetch = window.fetch.bind(window);
  funnelWindow.__sdFullFunnelOriginalFetch = originalFetch;

  const patchedFetch: typeof window.fetch = async (input, init) => {
    const url = requestUrl(input);
    const path = url?.pathname || "";
    const method = (init?.method || "GET").toUpperCase();

    let nextInit = init;

    if (method === "POST" && path === LEAD_ENDPOINT) {
      const body = parseJsonBody(init);

      if (body) {
        const enriched = enrichLeadPayload(body);
        nextInit = {
          ...init,
          body: JSON.stringify(enriched),
        };

        once("masterclass_form_submitted", () => {
          queueInternalEvent("form_submitted", {
            form: "gen-ai-masterclass-register-one-step",
            source: stringValue(enriched.source) || "website",
          });
        });
      }
    }

    if (method === "POST" && path === CREATE_ORDER_ENDPOINT) {
      const body = parseJsonBody(init);

      if (body) {
        const enriched = enrichCheckoutPayload(body);
        nextInit = {
          ...init,
          body: JSON.stringify(enriched),
        };

        once("store_checkout_started", () => {
          queueInternalEvent("checkout_started", {
            funnel: "store_checkout",
            product_slug: stringValue(enriched.slug) || "unknown",
          });
          trackSegment("Checkout Started", {
            product_slug: stringValue(enriched.slug) || "unknown",
          });
          trackClarity("checkout_started");
        });
      }
    }

    const response = await originalFetch(input, nextInit);

    if (path === LEAD_ENDPOINT && response.ok) {
      const data = await responseJson(response);
      const leadId = stringValue(data.id);

      if (leadId) {
        funnelWindow.__sdLastLeadEventId = leadId;
      }

      once(`masterclass_lead_created_${leadId || "ok"}`, () => {
        const attribution = resolveAttribution();

        queueInternalEvent("lead_created", {
          funnel: "gen_ai_masterclass",
          source: attribution.source,
        });

        trackSegment("Lead Created", {
          funnel: "gen_ai_masterclass",
          source: attribution.source,
        });

        trackClarity("lead_created");

        trackGoogleAdsConversion(GOOGLE_ADS_LEAD_SEND_TO, {});
      });
    }

    if (path === VERIFY_PAYMENT_ENDPOINT) {
      const data = await responseJson(response);
      const success = response.ok && data.success === true;
      const storeOrderId = stringValue(data.storeOrderId);
      const tracking = asRecord(data.tracking);
      const value = Number(tracking.value || 0);
      const currency = stringValue(tracking.currency) || "INR";

      if (success) {
        once(`store_payment_successful_${storeOrderId || "ok"}`, () => {
          queueInternalEvent("payment_successful", {
            order_id: storeOrderId || "unknown",
            value: Number.isFinite(value) ? value : 0,
            currency,
          });

          trackSegment("Payment Successful", {
            order_id: storeOrderId || "unknown",
            value: Number.isFinite(value) ? value : 0,
            currency,
          });

          trackClarity("payment_successful");

          trackGoogleAdsConversion(GOOGLE_ADS_PURCHASE_SEND_TO, {
            transaction_id: storeOrderId || undefined,
            value: Number.isFinite(value) ? value : undefined,
            currency,
          });
        });
      } else if (!response.ok) {
        once(`store_payment_failed_${Date.now()}`, () => {
          queueInternalEvent("payment_failed", {
            order_id: storeOrderId || "unknown",
          });
          trackSegment("Payment Failed", {
            order_id: storeOrderId || "unknown",
          });
          trackClarity("payment_failed");
        });
      }
    }

    return response;
  };

  window.fetch = patchedFetch;
  funnelWindow.__sdFullFunnelFetchPatched = true;

  return () => {
    if (window.fetch === patchedFetch) {
      window.fetch = originalFetch;
    }

    funnelWindow.__sdFullFunnelFetchPatched = false;
  };
}

export function FullFunnelTrackingBridge() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams?.toString() || "";
  const { state, ready } = useConsent();

  useEffect(() => {
    if (!ready) return;

    const funnelWindow = window as FunnelWindow;
    funnelWindow.__sdFullFunnelConsent = {
      analytics: state.analytics,
      advertising: state.advertising,
    };

    if (state.analytics === "granted") {
      captureBrowserAttribution();
    }
  }, [ready, state.analytics, state.advertising, pathname, search]);

  useEffect(() => {
    if (!ready) return;

    return installFetchPatch();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    if (pathname === AI_VIDEO_PATH) {
      once(`landing_page_viewed:${AI_VIDEO_PATH}:${search}`, () => {
        queueInternalEvent("landing_page_viewed", {
          landing_page: AI_VIDEO_PATH,
          source: deriveSource(),
        });
        trackSegment("Landing Page Viewed", {
          landing_page: AI_VIDEO_PATH,
          source: deriveSource(),
        });
        trackClarity("ai_video_landing_viewed");
      });
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let url: URL;

      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname !== REGISTER_PATH) return;

      const enrichedUrl = appendAttributionToRegistrationUrl(url);
      anchor.href = enrichedUrl.toString();

      const attribution = resolveAttribution();

      queueInternalEvent("cta_clicked", {
        cta: "masterclass_registration",
        source: attribution.source,
        from_path: pathname,
      });

      if (currentConsent().analytics === "granted") {
        trackGoogleEvent("select_content", {
          content_type: "cta",
          item_id: "masterclass_registration",
          page_path: pathname,
          source: attribution.source,
        });
      }

      trackSegment("CTA Clicked", {
        cta: "masterclass_registration",
        source: attribution.source,
        from_path: pathname,
      });

      trackClarity("masterclass_cta_clicked");
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ready, pathname, search]);

  return null;
}

export const FULL_FUNNEL_TRACKING_LEGACY_KEYS = LEGACY_KEYS;
