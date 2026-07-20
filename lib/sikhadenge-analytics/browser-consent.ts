import {
  CONSENT_CHANGE_EVENT,
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  hasConsentDecision,
  readStoredConsentState,
} from "../consent";

import type {
  AnalyticsConsent,
} from "./event-contract";

export type BrowserConsentListener = (
  consent: AnalyticsConsent,
) => void;

function browserAvailable(): boolean {
  return typeof window !== "undefined";
}

export function resolveBrowserConsent():
  AnalyticsConsent {
  const stored = readStoredConsentState();

  if (!hasConsentDecision(stored)) {
    return {
      analytics: "unknown",
      advertising: "unknown",
      policy_version: CONSENT_POLICY_VERSION,
      captured_at: null,
    };
  }

  return {
    analytics: stored.analytics,
    advertising: stored.advertising,
    policy_version: stored.policyVersion,
    captured_at: stored.updatedAt,
  };
}

export function hasResolvedAnalyticsConsent():
  boolean {
  return (
    resolveBrowserConsent().analytics ===
    "granted"
  );
}

export function hasResolvedAdvertisingConsent():
  boolean {
  return (
    resolveBrowserConsent().advertising ===
    "granted"
  );
}

export function subscribeToBrowserConsent(
  listener: BrowserConsentListener,
): () => void {
  if (!browserAvailable()) {
    return () => undefined;
  }

  const emit = (): void => {
    listener(resolveBrowserConsent());
  };

  const consentChangeHandler: EventListener =
    () => {
      emit();
    };

  const storageHandler = (
    event: StorageEvent,
  ): void => {
    if (
      event.key === null ||
      event.key === CONSENT_STORAGE_KEY
    ) {
      emit();
    }
  };

  window.addEventListener(
    CONSENT_CHANGE_EVENT,
    consentChangeHandler,
  );

  window.addEventListener(
    "storage",
    storageHandler,
  );

  emit();

  return () => {
    window.removeEventListener(
      CONSENT_CHANGE_EVENT,
      consentChangeHandler,
    );

    window.removeEventListener(
      "storage",
      storageHandler,
    );
  };
}
