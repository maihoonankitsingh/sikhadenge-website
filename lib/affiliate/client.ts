export const AFFILIATE_STORAGE_KEY = "sd_affiliate_ref";
export const AFFILIATE_CLICKED_KEY = "sd_affiliate_click_logged";

type ResolveResponse = {
  ok: boolean;
  affiliate?: {
    id: string;
    fullName: string;
    affiliateCode: string;
    referralLink?: string | null;
    status: string;
  };
  error?: string;
};

function canUseBrowser() {
  return typeof window !== "undefined";
}

export function getStoredAffiliateCode() {
  if (!canUseBrowser()) return "";
  return (window.localStorage.getItem(AFFILIATE_STORAGE_KEY) || "").trim().toUpperCase();
}

export function setStoredAffiliateCode(code: string) {
  if (!canUseBrowser()) return;
  window.localStorage.setItem(AFFILIATE_STORAGE_KEY, code.trim().toUpperCase());
}

export function getTrackedClickKey(code: string) {
  return `${AFFILIATE_CLICKED_KEY}:${code.trim().toUpperCase()}`;
}

export function hasTrackedClick(code: string) {
  if (!canUseBrowser()) return false;
  return window.sessionStorage.getItem(getTrackedClickKey(code)) === "1";
}

export function markTrackedClick(code: string) {
  if (!canUseBrowser()) return;
  window.sessionStorage.setItem(getTrackedClickKey(code), "1");
}

export function getAffiliateCodeFromUrl() {
  if (!canUseBrowser()) return "";
  const url = new URL(window.location.href);
  return (url.searchParams.get("ref") || "").trim().toUpperCase();
}

export async function resolveAffiliateCode(code: string) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;

  const res = await fetch(`/api/affiliate/resolve?code=${encodeURIComponent(normalized)}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = (await res.json()) as ResolveResponse;
  if (!res.ok || !data?.ok || !data?.affiliate) return null;
  return data.affiliate;
}

export async function trackAffiliateClick(code: string) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;

  const res = await fetch("/api/affiliate/track-click", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: normalized,
      landingPage: canUseBrowser() ? window.location.href : "",
      referrerUrl: canUseBrowser() ? document.referrer || "" : "",
      utmSource: canUseBrowser() ? new URL(window.location.href).searchParams.get("utm_source") || "" : "",
      utmMedium: canUseBrowser() ? new URL(window.location.href).searchParams.get("utm_medium") || "" : "",
      utmCampaign: canUseBrowser() ? new URL(window.location.href).searchParams.get("utm_campaign") || "" : "",
      utmTerm: canUseBrowser() ? new URL(window.location.href).searchParams.get("utm_term") || "" : "",
      utmContent: canUseBrowser() ? new URL(window.location.href).searchParams.get("utm_content") || "" : "",
    }),
  });

  const data = await res.json();
  if (!res.ok || !data?.ok) return null;
  return data;
}
