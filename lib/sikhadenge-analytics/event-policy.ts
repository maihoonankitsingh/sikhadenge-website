export const ANALYTICS_EVENT_LIMITS = {
  maximumPayloadBytes: 64 * 1024,
  maximumEventIdLength: 128,
  maximumEventNameLength: 64,
  maximumUrlLength: 2048,
  maximumPropertyCount: 64,
  maximumPropertyKeyLength: 64,
  maximumStringPropertyLength: 2048,
  maximumFutureClockSkewSeconds: 5 * 60,
  maximumPastAgeDays: 30,
  duplicateRetentionDays: 7,
} as const;

export const ANALYTICS_PII_DENYLIST = [
  "name",
  "full_name",
  "first_name",
  "last_name",
  "email",
  "email_address",
  "phone",
  "phone_number",
  "mobile",
  "mobile_number",
  "address",
  "street_address",
  "password",
  "otp",
  "pan",
  "aadhaar",
  "aadhar",
  "card_number",
  "cvv",
  "razorpay_signature",
  "access_token",
  "authorization",
  "cookie",
] as const;

export const ANALYTICS_CLICK_ID_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export const ANALYTICS_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const ANALYTICS_DESTINATION_RULES = {
  internalCollectionRequiresAnalyticsConsent: true,
  ga4RequiresAnalyticsConsent: true,
  metaBrowserRequiresAdvertisingConsent: true,
  metaServerRequiresAdvertisingConsent: true,
  rawPiiAllowed: false,
  productionAcceptsTestEnvironmentEvents: false,
  criticalBusinessActionDependsOnAnalytics: false,
} as const;

export type AnalyticsPiiKey =
  (typeof ANALYTICS_PII_DENYLIST)[number];

export function normalizeAnalyticsKey(
  key: string,
): string {
  return key.trim().toLowerCase().replace(/[-\s]+/g, "_");
}

export function isDeniedAnalyticsKey(
  key: string,
): boolean {
  const normalized = normalizeAnalyticsKey(key);

  return (
    ANALYTICS_PII_DENYLIST as readonly string[]
  ).includes(normalized);
}
