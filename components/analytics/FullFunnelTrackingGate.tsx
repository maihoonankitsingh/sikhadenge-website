"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { FullFunnelTrackingBridge } from "@/components/analytics/FullFunnelTrackingBridge";
import { useConsent } from "@/components/consent/ConsentProvider";

const AI_VIDEO_PATH = "/masterclass/ai-video";
const REGISTER_PATH = "/gen-ai-masterclass/register-one-step";
const CHECKOUT_PREFIX = "/checkout/";
const AD_CLICK_KEYS = ["fbclid", "gclid", "msclkid"] as const;

export function FullFunnelTrackingGate() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams?.toString() || "";
  const { state, ready } = useConsent();

  const enabled =
    pathname === AI_VIDEO_PATH ||
    pathname === REGISTER_PATH ||
    pathname.startsWith(CHECKOUT_PREFIX);

  useEffect(() => {
    if (!enabled || !ready || state.advertising !== "granted") {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    for (const key of AD_CLICK_KEYS) {
      const value = params.get(key)?.trim();
      if (!value) continue;

      try {
        window.localStorage.setItem(key, value.slice(0, 1000));
      } catch {
        // Advertising attribution storage failure must never break the funnel.
      }
    }
  }, [enabled, ready, state.advertising, pathname, search]);

  return enabled ? <FullFunnelTrackingBridge /> : null;
}
