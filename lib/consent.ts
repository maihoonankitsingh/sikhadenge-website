export const CONSENT_POLICY_VERSION = "2026-07-15.1";
export const CONSENT_STORAGE_KEY = "sd_consent_v1";
export const CONSENT_COOKIE_NAME = "sd_consent_v1";
export const CONSENT_CHANGE_EVENT = "sd:consent-change";

export type ConsentValue = "granted" | "denied";

export type ConsentState = {
  policyVersion: typeof CONSENT_POLICY_VERSION;
  analytics: ConsentValue;
  advertising: ConsentValue;
  updatedAt: string | null;
};

export const DEFAULT_CONSENT_STATE: ConsentState = {
  policyVersion: CONSENT_POLICY_VERSION,
  analytics: "denied",
  advertising: "denied",
  updatedAt: null,
};

export function isConsentValue(value: unknown): value is ConsentValue {
  return value === "granted" || value === "denied";
}

export function parseConsentState(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;

    if (value.policyVersion !== CONSENT_POLICY_VERSION) return null;
    if (!isConsentValue(value.analytics)) return null;
    if (!isConsentValue(value.advertising)) return null;
    if (typeof value.updatedAt !== "string" || !value.updatedAt) return null;

    return {
      policyVersion: CONSENT_POLICY_VERSION,
      analytics: value.analytics,
      advertising: value.advertising,
      updatedAt: value.updatedAt,
    };
  } catch {
    return null;
  }
}

export function hasConsentDecision(state: ConsentState | null): state is ConsentState {
  return Boolean(state && state.updatedAt);
}

export function createConsentState(input: {
  analytics: ConsentValue;
  advertising: ConsentValue;
}): ConsentState {
  return {
    policyVersion: CONSENT_POLICY_VERSION,
    analytics: input.analytics,
    advertising: input.advertising,
    updatedAt: new Date().toISOString(),
  };
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;

  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const item = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!item) return null;

  try {
    return parseConsentState(decodeURIComponent(item.slice(prefix.length)));
  } catch {
    return null;
  }
}

export function readStoredConsentState(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = parseConsentState(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (stored) return stored;
  } catch {}

  return readConsentCookie();
}

export function persistConsentState(state: ConsentState): void {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(state);

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  } catch {}

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const maxAge = 60 * 60 * 24 * 180;

  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(serialized)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;

  window.dispatchEvent(
    new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, {
      detail: state,
    })
  );
}

export function saveConsentDecision(input: {
  analytics: ConsentValue;
  advertising: ConsentValue;
}): ConsentState {
  const state = createConsentState(input);
  persistConsentState(state);
  return state;
}

export type GoogleConsentModeState = {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};

export type ClarityConsentState = {
  analytics_Storage: ConsentValue;
  ad_Storage: ConsentValue;
};

export function toGoogleConsentModeState(
  state: ConsentState
): GoogleConsentModeState {
  return {
    analytics_storage: state.analytics,
    ad_storage: state.advertising,
    ad_user_data: state.advertising,
    ad_personalization: state.advertising,
  };
}

export function toClarityConsentState(
  state: ConsentState
): ClarityConsentState {
  return {
    analytics_Storage: state.analytics,
    ad_Storage: state.advertising,
  };
}

export function getEffectiveConsentState(): ConsentState {
  const stored = readStoredConsentState();
  if (stored) return stored;

  return { ...DEFAULT_CONSENT_STATE };
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsentState()?.analytics === "granted";
}

export function hasAdvertisingConsent(): boolean {
  return readStoredConsentState()?.advertising === "granted";
}
