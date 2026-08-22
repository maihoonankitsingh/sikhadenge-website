import type { FunnelConfig } from "./types";

export type FunnelAttribution = {
  visitorId: string;
  sessionId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  campaignId: string;
  adsetId: string;
  adId: string;
  fbclid: string;
  fbp: string;
  fbc: string;
  gclid: string;
  landingVariant: string;
  referrer: string;
};

type TrackOptions = { persist?: boolean; eventId?: string };

const VISITOR_KEY = "sd_funnel_visitor_id_v2";
const SESSION_KEY = "sd_funnel_session_id_v2";
const ATTRIBUTION_KEY = "sd_funnel_attribution_v2";

function makeId(prefix = "sd") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export function createFunnelEventId(eventName: string) {
  return makeId(`sd_${eventName.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`);
}

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;
  const item = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : "";
}

function emptyAttribution(): FunnelAttribution {
  return { visitorId: "", sessionId: "", utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "", campaignId: "", adsetId: "", adId: "", fbclid: "", fbp: "", fbc: "", gclid: "", landingVariant: "", referrer: "" };
}

function getOrCreateVisitorId() {
  try {
    let visitorId = window.localStorage.getItem(VISITOR_KEY) || "";
    if (!visitorId) { visitorId = makeId("visitor"); window.localStorage.setItem(VISITOR_KEY, visitorId); }
    return visitorId;
  } catch { return makeId("visitor"); }
}

function getOrCreateSessionId() {
  try {
    let sessionId = window.sessionStorage.getItem(SESSION_KEY) || "";
    if (!sessionId) { sessionId = makeId("session"); window.sessionStorage.setItem(SESSION_KEY, sessionId); }
    return sessionId;
  } catch { return makeId("session"); }
}

function deriveFbc(fbclid: string, existingFbc: string) {
  if (existingFbc) return existingFbc;
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : "";
}

export function getAttribution(): FunnelAttribution {
  if (typeof window === "undefined") return emptyAttribution();
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const search = new URLSearchParams(window.location.search);
  const fbclid = search.get("fbclid") || "";
  const fbp = readCookie("_fbp");
  const fbc = deriveFbc(fbclid, readCookie("_fbc"));
  const fresh: FunnelAttribution = {
    visitorId, sessionId,
    utmSource: search.get("utm_source") || "", utmMedium: search.get("utm_medium") || "", utmCampaign: search.get("utm_campaign") || "",
    utmContent: search.get("utm_content") || "", utmTerm: search.get("utm_term") || "",
    campaignId: search.get("campaign_id") || search.get("fb_campaign_id") || "", adsetId: search.get("adset_id") || search.get("fb_adset_id") || "",
    adId: search.get("ad_id") || search.get("fb_ad_id") || "", fbclid, fbp, fbc, gclid: search.get("gclid") || "",
    landingVariant: search.get("variant") || "", referrer: document.referrer || "",
  };
  const hasFreshAttribution = Object.entries(fresh).some(([key, value]) => !["visitorId", "sessionId", "fbp"].includes(key) && Boolean(value));
  if (hasFreshAttribution) {
    try { window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(fresh)); } catch {}
    return fresh;
  }
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<FunnelAttribution>;
      return { ...emptyAttribution(), ...parsed, visitorId, sessionId, fbp: fbp || parsed.fbp || "", fbc: readCookie("_fbc") || parsed.fbc || "" };
    }
  } catch {}
  return fresh;
}

function metaStandardEvent(eventName: string) {
  switch (eventName) {
    case "generate_lead": return "Lead";
    case "view_masterclass_offer":
    case "core_offer_seen": return "ViewContent";
    case "begin_checkout":
    case "workshop_checkout_started":
    case "core_checkout_started": return "InitiateCheckout";
    case "purchase":
    case "workshop_purchase":
    case "close_convert_lead": return "Purchase";
    default: return null;
  }
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
  const eventId = options.eventId || createFunnelEventId(eventName);
  const numericValue = typeof metadata.value === "number"
    ? metadata.value
    : eventName === "purchase"
      ? config.entryPrice
      : eventName === "workshop_purchase"
        ? config.workshopPrice
        : eventName === "close_convert_lead"
          ? config.coreProgramPrice
          : undefined;

  const payload = {
    eventName, eventId, visitorId: attribution.visitorId, sessionId: attribution.sessionId, leadId: leadId || null,
    funnel: config.product, offerMode: config.offerMode, entryPrice: config.entryPrice, batchId: config.batchId,
    pagePath: window.location.pathname, source: attribution.utmSource, medium: attribution.utmMedium, campaign: attribution.utmCampaign,
    content: attribution.utmContent, term: attribution.utmTerm, campaignId: attribution.campaignId, adsetId: attribution.adsetId, adId: attribution.adId,
    fbclid: attribution.fbclid, fbp: attribution.fbp, fbc: attribution.fbc, gclid: attribution.gclid, landingVariant: attribution.landingVariant,
    metadata, eventValue: numericValue, currency: typeof metadata.currency === "string" ? metadata.currency : "INR",
  };

  const w = window as typeof window & { dataLayer?: Array<Record<string, unknown>>; fbq?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, event_id: eventId, funnel_product: config.product, offer_mode: config.offerMode, entry_price: config.entryPrice,
    batch_id: config.batchId, visitor_id: attribution.visitorId, session_id: attribution.sessionId, lead_id: leadId || undefined,
    fbp: attribution.fbp || undefined, fbc: attribution.fbc || undefined, gclid: attribution.gclid || undefined, ...metadata });

  if (typeof w.fbq === "function") {
    const standardEvent = metaStandardEvent(eventName);
    const isWorkshopEvent = eventName.startsWith("workshop_");
    const isCoreEvent = eventName.startsWith("core_") || eventName === "close_convert_lead" || eventName === "advisor_cta_click";
    const category = isCoreEvent ? "ai_expert_program" : isWorkshopEvent ? "implementation_workshop" : "masterclass";
    const metaPayload: Record<string, unknown> = {
      content_name: isCoreEvent ? "sikhadenge_ai_expert_program" : `${config.product}_${category}`,
      content_category: category,
      currency: "INR",
    };
    if (typeof numericValue === "number") metaPayload.value = numericValue;
    else if (eventName !== "generate_lead") metaPayload.value = isCoreEvent ? config.coreProgramPrice : isWorkshopEvent ? config.workshopPrice : config.entryPrice;
    if (standardEvent) w.fbq("track", standardEvent, metaPayload, { eventID: eventId });
    else w.fbq("trackCustom", eventName, { funnel_product: config.product, offer_mode: config.offerMode, entry_price: config.entryPrice, batch_id: config.batchId, content_category: category }, { eventID: eventId });
  }

  if (options.persist === false) return eventId;
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/funnel/event", new Blob([body], { type: "application/json" }));
      return eventId;
    }
    await fetch("/api/funnel/event", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {}
  return eventId;
}
