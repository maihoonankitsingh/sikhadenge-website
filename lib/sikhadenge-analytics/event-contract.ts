import type { SikhadengeEventName } from "./event-catalog";

export const ANALYTICS_CONTRACT_VERSION = "1.0" as const;

export type AnalyticsEnvironment =
  | "production"
  | "staging"
  | "development"
  | "test";

export type AnalyticsSource =
  | "browser"
  | "server"
  | "webhook"
  | "worker";

export type ConsentState =
  | "granted"
  | "denied"
  | "unknown";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface AnalyticsIdentity {
  anonymous_id: string;
  session_id: string;
  user_id?: string | null;
  lead_id?: string | null;
  registration_id?: string | null;
  workshop_registration_id?: string | null;
  enrollment_id?: string | null;
  order_id?: string | null;
  payment_id?: string | null;
}

export interface AnalyticsPage {
  url: string;
  path: string;
  title?: string | null;
  referrer?: string | null;
  landing_page?: string | null;
}

export interface AnalyticsCampaign {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
  first_touch_at?: string | null;
  last_touch_at?: string | null;
}

export interface AnalyticsDevice {
  category?: "desktop" | "mobile" | "tablet" | "unknown";
  browser?: string | null;
  language?: string | null;
}

export interface AnalyticsGeo {
  country?: string | null;
  state?: string | null;
  city?: string | null;
  source?:
    | "billing"
    | "user_submitted"
    | "counsellor_verified"
    | "pincode"
    | "ip_estimate"
    | "unknown";
  confidence?: number | null;
}

export interface AnalyticsConsent {
  analytics: ConsentState;
  advertising: ConsentState;
  whatsapp?: ConsentState;
  email?: ConsentState;
  policy_version?: string | null;
  captured_at?: string | null;
}

export interface AnalyticsRuntime {
  environment: AnalyticsEnvironment;
  source: AnalyticsSource;
  sdk_version: string;
  request_id?: string | null;
}

export interface SikhadengeAnalyticsEvent {
  contract_version: typeof ANALYTICS_CONTRACT_VERSION;
  event_id: string;
  event_name: SikhadengeEventName;
  occurred_at: string;
  identity: AnalyticsIdentity;
  page: AnalyticsPage;
  campaign: AnalyticsCampaign;
  device: AnalyticsDevice;
  geo: AnalyticsGeo;
  properties: Record<string, JsonValue>;
  consent: AnalyticsConsent;
  context: AnalyticsRuntime;
}

export type AnalyticsAcceptedStatus =
  | "accepted"
  | "queued"
  | "duplicate";

export interface AnalyticsAcceptedResponse {
  accepted: true;
  event_id: string;
  status: AnalyticsAcceptedStatus;
}

export interface AnalyticsRejectedResponse {
  accepted: false;
  event_id?: string;
  status:
    | "invalid_schema"
    | "invalid_consent"
    | "payload_too_large"
    | "rate_limited"
    | "internal_error";
  errors: string[];
}

export type AnalyticsEventResponse =
  | AnalyticsAcceptedResponse
  | AnalyticsRejectedResponse;
