"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { toGoogleConsentModeState } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";

const GOOGLE_SCRIPT_ID = "google-analytics-gtag";
const GOOGLE_PLACEHOLDER_ID = "G-XXXXXXXXXX";

type GtagFunction = (...args: unknown[]) => void;

type GoogleWindow = typeof window & {
  dataLayer?: unknown[];
  gtag?: GtagFunction;
  __sdGoogleConsentDefaultSet?: boolean;
  __sdGoogleAnalyticsInitialized?: boolean;
  __sdGoogleAnalyticsLastPageKey?: string;
};

function getOrCreateGtag(): GtagFunction {
  const googleWindow = window as GoogleWindow;

  googleWindow.dataLayer = googleWindow.dataLayer || [];

  if (typeof googleWindow.gtag === "function") {
    return googleWindow.gtag;
  }

  const gtag = function gtag(): void {
    googleWindow.dataLayer = googleWindow.dataLayer || [];
    googleWindow.dataLayer.push(arguments);
  } as GtagFunction;

  googleWindow.gtag = gtag;

  return gtag;
}

function ensureGoogleScript(
  measurementId: string,
): void {
  if (document.getElementById(GOOGLE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");

  script.id = GOOGLE_SCRIPT_ID;
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(measurementId);

  document.head.appendChild(script);
}

export function GoogleConsentBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";
  const { state, ready, hasDecision } = useConsent();

  useEffect(() => {
    if (!ready) return;

    if (
      !GA4_MEASUREMENT_ID ||
      GA4_MEASUREMENT_ID === GOOGLE_PLACEHOLDER_ID
    ) {
      return;
    }

    const googleWindow = window as GoogleWindow;
    const gtag = getOrCreateGtag();

    if (!googleWindow.__sdGoogleConsentDefaultSet) {
      gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });

      googleWindow.__sdGoogleConsentDefaultSet = true;
    }

    if (hasDecision) {
      gtag(
        "consent",
        "update",
        toGoogleConsentModeState(state),
      );
    }

    if (state.analytics !== "granted") {
      googleWindow.__sdGoogleAnalyticsLastPageKey = undefined;
      return;
    }

    if (!googleWindow.__sdGoogleAnalyticsInitialized) {
      gtag("js", new Date());

      gtag("config", GA4_MEASUREMENT_ID, {
        send_page_view: false,
      });

      googleWindow.__sdGoogleAnalyticsInitialized = true;
    }

    ensureGoogleScript(GA4_MEASUREMENT_ID);

    const pagePath = pathname || window.location.pathname || "/";
    const pageKey = search ? `${pagePath}?${search}` : pagePath;

    if (
      googleWindow.__sdGoogleAnalyticsLastPageKey === pageKey
    ) {
      return;
    }

    googleWindow.__sdGoogleAnalyticsLastPageKey = pageKey;

    gtag("event", "page_view", {
      send_to: GA4_MEASUREMENT_ID,
      page_title: document.title,
      page_location: window.location.href,
      page_path: pageKey,
    });
  }, [pathname, search, state, ready, hasDecision]);

  return null;
}
