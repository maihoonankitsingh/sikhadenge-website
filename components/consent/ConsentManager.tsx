"use client";

import { ConsentBanner } from "./ConsentBanner";
import { ConsentPreferences } from "./ConsentPreferences";
import { ConsentSettingsButton } from "./ConsentSettingsButton";
import { ConsentTrackingRuntime } from "./ConsentTrackingRuntime";

export function ConsentManager() {
  return (
    <>
      <ConsentTrackingRuntime />
      <ConsentBanner />
      <ConsentPreferences />
      <ConsentSettingsButton />
    </>
  );
}
