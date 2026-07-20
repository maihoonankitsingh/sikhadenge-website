import type {
  AnalyticsDevice,
  AnalyticsGeo,
  AnalyticsPage,
} from "./event-contract";

function browserAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof navigator !== "undefined"
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

function detectDeviceCategory():
  AnalyticsDevice["category"] {
  if (!browserAvailable()) {
    return "unknown";
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (
    /ipad|tablet|kindle|silk/.test(userAgent) ||
    (
      /android/.test(userAgent) &&
      !/mobile/.test(userAgent)
    )
  ) {
    return "tablet";
  }

  if (
    /mobile|iphone|ipod|android|blackberry|iemobile|opera mini/
      .test(userAgent)
  ) {
    return "mobile";
  }

  return "desktop";
}

function detectBrowser(): string | null {
  if (!browserAvailable()) {
    return null;
  }

  const userAgent = navigator.userAgent;

  if (/Edg\//.test(userAgent)) {
    return "Edge";
  }

  if (/OPR\//.test(userAgent)) {
    return "Opera";
  }

  if (/Chrome\//.test(userAgent)) {
    return "Chrome";
  }

  if (/Firefox\//.test(userAgent)) {
    return "Firefox";
  }

  if (
    /Safari\//.test(userAgent) &&
    !/Chrome\//.test(userAgent)
  ) {
    return "Safari";
  }

  return "Other";
}

export function getBrowserPageContext(
  landingPage?: string | null,
): AnalyticsPage {
  if (!browserAvailable()) {
    return {
      url: "/",
      path: "/",
      title: null,
      referrer: null,
      landing_page: landingPage || null,
    };
  }

  return {
    url: sanitizeUrl(window.location.href),
    path: window.location.pathname || "/",
    title: document.title || null,
    referrer: document.referrer
      ? sanitizeUrl(document.referrer)
      : null,
    landing_page: landingPage || null,
  };
}

export function getBrowserDeviceContext():
  AnalyticsDevice {
  if (!browserAvailable()) {
    return {
      category: "unknown",
      browser: null,
      language: null,
    };
  }

  return {
    category: detectDeviceCategory(),
    browser: detectBrowser(),
    language:
      navigator.language ||
      navigator.languages?.[0] ||
      null,
  };
}

export function getBrowserGeoContext():
  AnalyticsGeo {
  return {
    country: null,
    state: null,
    city: null,
    source: "unknown",
    confidence: null,
  };
}
