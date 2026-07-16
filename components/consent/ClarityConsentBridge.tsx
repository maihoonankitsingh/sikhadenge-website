"use client";

import { useEffect } from "react";
import { toClarityConsentState } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

const CLARITY_PROJECT_ID = "w0wffqoi0q";
const CLARITY_SCRIPT_ID = "microsoft-clarity-remote";

type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

function getOrCreateClarity(): ClarityFunction {
  const clarityWindow = window as typeof window & {
    clarity?: ClarityFunction;
  };

  if (typeof clarityWindow.clarity === "function") {
    return clarityWindow.clarity;
  }

  const clarity = ((...args: unknown[]) => {
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  }) as ClarityFunction;

  clarityWindow.clarity = clarity;
  return clarity;
}

export function ClarityConsentBridge() {
  const { state, ready } = useConsent();

  useEffect(() => {
    if (!ready) return;

    const clarity = getOrCreateClarity();
    clarity("consentv2", toClarityConsentState(state));

    if (state.analytics !== "granted") return;
    if (document.getElementById(CLARITY_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = CLARITY_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;

    document.head.appendChild(script);
  }, [state, ready]);

  return null;
}
