"use client";

import { Suspense } from "react";
import ClarityEvents from "@/app/ClarityEvents";
import { FullFunnelTrackingBridge } from "@/components/analytics/FullFunnelTrackingBridge";
import { SikhadengeAnalyticsRuntime } from "@/components/analytics/SikhadengeAnalyticsRuntime";
import { ClarityConsentBridge } from "./ClarityConsentBridge";
import { GoogleConsentBridge } from "./GoogleConsentBridge";
import { MetaConsentBridge } from "./MetaConsentBridge";
import { SegmentConsentBridge } from "./SegmentConsentBridge";
import { useConsent } from "./ConsentProvider";

export function ConsentTrackingRuntime() {
  const { state, ready } = useConsent();

  return (
    <>
      <Suspense fallback={null}>
        <GoogleConsentBridge />
      </Suspense>
      <ClarityConsentBridge />
      <Suspense fallback={null}>
        <MetaConsentBridge />
      </Suspense>

      {ready && state.analytics === "granted" ? (
        <>
          <SikhadengeAnalyticsRuntime />
          <ClarityEvents />
          <SegmentConsentBridge />
        </>
      ) : null}

      <Suspense fallback={null}>
        <FullFunnelTrackingBridge />
      </Suspense>
    </>
  );
}
