"use client";

import { useEffect } from "react";
import { toGoogleConsentModeState } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";

const GOOGLE_SCRIPT_ID = "google-analytics-gtag";
const GOOGLE_PLACEHOLDER_ID = "G-XXXXXXXXXX";

type GtagFunction = (...args: unknown[]) => void;

type GoogleWindow = typeof window & {
  dataLayer?: unknown[][];
  gtag?: GtagFunction;
  __sdGoogleConsentDefaultSet?: boolean;
  __sdGoogleAnalyticsInitialized?: boolean;
};

function getOrCreateGtag(): GtagFunction {
  const googleWindow = window as GoogleWindow;

  googleWindow.dataLayer = googleWindow.dataLayer || [];

  if (typeof googleWindow.gtag === "function") {
    return googleWindow.gtag;
  }

  const gtag: GtagFunction = (...args: unknown[]) => {
    googleWindow.dataLayer = googleWindow.dataLayer || [];
    googleWindow.dataLayer.push(args);
  };

  googleWindow.gtag = gtag;

  return gtag;
}

export function GoogleConsentBridge() {
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
        toGoogleConsentModeState(state)
      );
    }

    if (state.analytics !== "granted") return;

    if (!googleWindow.__sdGoogleAnalyticsInitialized) {
      gtag("js", new Date());

      gtag("config", GA4_MEASUREMENT_ID, {
        send_page_view: true,
      });

      googleWindow.__sdGoogleAnalyticsInitialized = true;
    }

    if (document.getElementById(GOOGLE_SCRIPT_ID)) return;

    const script = document.createElement("script");

    script.id = GOOGLE_SCRIPT_ID;
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA4_MEASUREMENT_ID);

    document.head.appendChild(script);
  }, [state, ready, hasDecision]);

  return null;
}
