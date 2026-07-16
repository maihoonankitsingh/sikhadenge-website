"use client";

import { useEffect } from "react";
import { toGoogleConsentModeState } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleConsentBridge() {
  const { state, ready, hasDecision } = useConsent();

  useEffect(() => {
    if (!ready || !hasDecision) return;
    if (typeof window.gtag !== "function") return;

    window.gtag(
      "consent",
      "update",
      toGoogleConsentModeState(state)
    );
  }, [state, ready, hasDecision]);

  return null;
}
