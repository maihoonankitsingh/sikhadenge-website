"use client";

import ClarityEvents from "@/app/ClarityEvents";
import { ClarityConsentBridge } from "./ClarityConsentBridge";
import { GoogleConsentBridge } from "./GoogleConsentBridge";
import { MetaConsentBridge } from "./MetaConsentBridge";
import { SegmentConsentBridge } from "./SegmentConsentBridge";
import { useConsent } from "./ConsentProvider";

export function ConsentTrackingRuntime() {
  const { state, ready } = useConsent();

  return (
    <>
      <GoogleConsentBridge />
      <ClarityConsentBridge />
      <MetaConsentBridge />

      {ready && state.analytics === "granted" ? (
        <>
          <ClarityEvents />
          <SegmentConsentBridge />
        </>
      ) : null}
    </>
  );
}
