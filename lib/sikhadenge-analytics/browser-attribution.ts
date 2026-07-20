import type {
  AnalyticsCampaign,
} from "./event-contract";

const ATTRIBUTION_STORAGE_KEY =
  "sd_analytics_attribution";

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

type CampaignKey =
  (typeof CAMPAIGN_KEYS)[number];

interface AttributionTouch {
  captured_at: string;
  landing_page: string;
  referrer: string | null;
  campaign: Partial<
    Record<CampaignKey, string>
  >;
}

interface StoredAttribution {
  first_touch: AttributionTouch;
  last_touch: AttributionTouch;
}

export interface BrowserAttribution {
  campaign: AnalyticsCampaign;
  landing_page: string;
  referrer: string | null;
}

function browserAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

function sanitizeUrl(value: string): string {
  try {
    const parsed = new URL(value);

    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return value.split(/[?#]/, 1)[0] || "/";
  }
}

function readCampaign(
  url: URL,
): Partial<Record<CampaignKey, string>> {
  const campaign: Partial<
    Record<CampaignKey, string>
  > = {};

  for (const key of CAMPAIGN_KEYS) {
    const value = url.searchParams.get(key)?.trim();

    if (value) {
      campaign[key] = value.slice(0, 500);
    }
  }

  return campaign;
}

function hasCampaignSignal(
  campaign: Partial<Record<CampaignKey, string>>,
): boolean {
  return Object.values(campaign).some(Boolean);
}

function createCurrentTouch(): AttributionTouch {
  const currentUrl = new URL(window.location.href);

  return {
    captured_at: new Date().toISOString(),
    landing_page: sanitizeUrl(currentUrl.href),
    referrer: document.referrer
      ? sanitizeUrl(document.referrer)
      : null,
    campaign: readCampaign(currentUrl),
  };
}

function parseStoredAttribution(
  value: string | null,
): StoredAttribution | null {
  if (!value) {
    return null;
  }

  try {
    const parsed =
      JSON.parse(value) as Partial<StoredAttribution>;

    if (
      !parsed.first_touch ||
      !parsed.last_touch ||
      typeof parsed.first_touch.captured_at !==
        "string" ||
      typeof parsed.last_touch.captured_at !==
        "string"
    ) {
      return null;
    }

    return parsed as StoredAttribution;
  } catch {
    return null;
  }
}

function readStoredAttribution():
  StoredAttribution | null {
  if (!browserAvailable()) {
    return null;
  }

  try {
    return parseStoredAttribution(
      window.localStorage.getItem(
        ATTRIBUTION_STORAGE_KEY,
      ),
    );
  } catch {
    return null;
  }
}

function writeStoredAttribution(
  attribution: StoredAttribution,
): void {
  if (!browserAvailable()) {
    return;
  }

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Analytics storage failure must not break the page.
  }
}

export function captureBrowserAttribution():
  StoredAttribution | null {
  if (!browserAvailable()) {
    return null;
  }

  const currentTouch = createCurrentTouch();
  const stored = readStoredAttribution();

  if (!stored) {
    const created: StoredAttribution = {
      first_touch: currentTouch,
      last_touch: currentTouch,
    };

    writeStoredAttribution(created);
    return created;
  }

  if (!hasCampaignSignal(currentTouch.campaign)) {
    return stored;
  }

  const updated: StoredAttribution = {
    first_touch: stored.first_touch,
    last_touch: currentTouch,
  };

  writeStoredAttribution(updated);
  return updated;
}

export function getBrowserAttribution():
  BrowserAttribution {
  const stored =
    captureBrowserAttribution();

  if (!stored) {
    return {
      campaign: {},
      landing_page: "/",
      referrer: null,
    };
  }

  return {
    campaign: {
      ...stored.last_touch.campaign,
      first_touch_at:
        stored.first_touch.captured_at,
      last_touch_at:
        stored.last_touch.captured_at,
    },
    landing_page:
      stored.first_touch.landing_page,
    referrer:
      stored.last_touch.referrer,
  };
}

export const BROWSER_ATTRIBUTION_CONSTANTS = {
  storageKey: ATTRIBUTION_STORAGE_KEY,
  campaignKeys: CAMPAIGN_KEYS,
} as const;
