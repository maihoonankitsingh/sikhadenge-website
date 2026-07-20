"use client";

export {
  BROWSER_ANALYTICS_SDK_VERSION,
  buildCanonicalBrowserEvent,
} from "./browser-event-builder";

export type {
  BuildBrowserEventInput,
} from "./browser-event-builder";

export {
  ANALYTICS_COLLECTION_ENDPOINT,
  BROWSER_TRANSPORT_TIMEOUT_MS,
  queueBrowserEvent,
  sendBrowserEvent,
  sendCanonicalBrowserEvent,
} from "./browser-transport";

export {
  BROWSER_IDENTITY_CONSTANTS,
  getBrowserIdentity,
  getOrCreateAnonymousId,
  getOrCreateSession,
  refreshBrowserSession,
} from "./browser-identity";

export type {
  BrowserIdentity,
} from "./browser-identity";

export {
  BROWSER_ATTRIBUTION_CONSTANTS,
  captureBrowserAttribution,
  getBrowserAttribution,
} from "./browser-attribution";

export type {
  BrowserAttribution,
} from "./browser-attribution";

export {
  getBrowserDeviceContext,
  getBrowserGeoContext,
  getBrowserPageContext,
} from "./browser-context";

export {
  hasResolvedAdvertisingConsent,
  hasResolvedAnalyticsConsent,
  resolveBrowserConsent,
  subscribeToBrowserConsent,
} from "./browser-consent";

export type {
  BrowserConsentListener,
} from "./browser-consent";

export type {
  AnalyticsEventResponse,
  JsonValue,
  SikhadengeAnalyticsEvent,
} from "./event-contract";

export type {
  SikhadengeEventName,
} from "./event-catalog";
