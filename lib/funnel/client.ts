import type { FunnelConfig } from "./types";

export type FunnelAttribution = {
  visitorId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  campaignId: string;
  adsetId: string;
  adId: string;
  fbclid: string;
  landingVariant: string;
  referrer: string;
};

type TrackOptions = {
  persist?: boolean;
};

const VISITOR_KEY = "sd_funnel_visitor_id_v1";
const ATTRIBUTION_KEY = "sd_funnel_attribution_v1";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sd_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyAttribution(): FunnelAttribution {
  return {
    visitorId: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
    campaignId: "",
    adsetId: "",
    adId: "",
    fbclid: "",
    landingVariant: "",
    referrer: "",
  };
}

export function getAttribution(): FunnelAttribution {
  if (typeof window === "undefined") return emptyAttribution();

  let visitorId = "";
  try {
    visitorId = window.localStorage.getItem(VISITOR_KEY) || "";
    if (!visitorId) {
      visitorId = makeId();
      window.localStorage.setItem(VISITOR_KEY, visitorId);
    }
  } catch {
    visitorId = makeId();
  }

  const search = new URLSearchParams(window.location.search);
  const fresh: FunnelAttribution = {
    visitorId,
    utmSource: search.get("utm_source") || "",
    utmMedium: search.get("utm_medium") || "",
    utmCampaign: search.get("utm_campaign") || "",
    utmContent: search.get("utm_content") || "",
    utmTerm: search.get("utm_term") || "",
    campaignId: search.get("campaign_id") || search.get("fb_campaign_id") || "",
    adsetId: search.get("adset_id") || search.get("fb_adset_id") || "",
    adId: search.get("ad_id") || search.get("fb_ad_id") || "",
    fbclid: search.get("fbclid") || "",
    landingVariant: search.get("variant") || "",
    referrer: document.referrer || "",
  };

  const hasFreshAttribution = Object.entries(fresh).some(
    ([key, value]) => key !== "visitorId" && Boolean(value)
  );

  if (hasFreshAttribution) {
    try {
      window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fresh));
    } catch {
      // Analytics storage must never block the funnel.
    }
    return fresh;
  }

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<FunnelAttribution>;
      return { ...emptyAttribution(), ...parsed, visitorId };
    }
  } catch {
    // Ignore malformed browser storage.
  }

  return fresh;
}

export async function trackFunnelEvent(
  config: FunnelConfig,
  eventName: string,
  metadata: Record<string, unknown> = {},
  leadId?: string,
  options: TrackOptions = {}
) {
  if (typeof window === "undefined") return;

  const attribution = getAttribution();
  const payload = {
    eventName,
    visitorId: attribution.visitorId,
    leadId: leadId || null,
    funnel: config.product,
    offerMode: config.offerMode,
    entryPrice: config.entryPrice,
    batchId: `${config.product}:${config.dateLabel}:${config.timeLabel}`,
    pagePath: window.location.pathname,
    source: attribution.utmSource,
    medium: attribution.utmMedium,
    campaign: attribution.utmCampaign,
    content: attribution.utmContent,
    term: attribution.utmTerm,
    campaignId: attribution.campaignId,
    adsetId: attribution.adsetId,
    adId: attribution.adId,
    fbclid: attribution.fbclid,
    landingVariant: attribution.landingVariant,
    metadata,
  };

  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: eventName,
    funnel_product: config.product,
    offer_mode: config.offerMode,
    entry_price: config.entryPrice,
    visitor_id: attribution.visitorId,
    lead_id: leadId || undefined,
    ...metadata,
  });

  if (typeof w.fbq === "function") {
    if (eventName === "generate_lead") {
      w.fbq("track", "Lead", {
        content_name: `${config.product}_masterclass`,
        value: config.entryPrice,
        currency: "INR",
      });
    } else if (eventName === "view_masterclass_offer") {
      w.fbq("track", "ViewContent", {
        content_name: `${config.product}_masterclass`,
        content_category: "masterclass",
        value: config.entryPrice,
        currency: "INR",
      });
    } else if (eventName === "begin_checkout") {
      w.fbq("track", "InitiateCheckout", {
        content_name: `${config.product}_masterclass`,
        value: config.entryPrice,
        currency: "INR",
      });
    } else {
      w.fbq("trackCustom", eventName, {
        funnel_product: config.product,
        offer_mode: config.offerMode,
        entry_price: config.entryPrice,
      });
    }
  }

  if (options.persist === false) return;

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/funnel/event",
        new Blob([body], { type: "application/json" })
      );
      return;
    }

    await fetch("/api/funnel/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics must never block the funnel UX.
  }
}
