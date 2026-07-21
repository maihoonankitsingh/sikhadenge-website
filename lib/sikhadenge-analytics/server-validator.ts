import {
  EVENT_CATALOG,
  type SikhadengeEventName,
} from "./event-catalog";
import {
  ANALYTICS_CONTRACT_VERSION,
  type AnalyticsEnvironment,
  type AnalyticsEventResponse,
  type AnalyticsSource,
  type ConsentState,
  type JsonValue,
  type SikhadengeAnalyticsEvent,
} from "./event-contract";
import {
  ANALYTICS_DESTINATION_RULES,
  ANALYTICS_EVENT_LIMITS,
  isDeniedAnalyticsKey,
} from "./event-policy";

export const SERVER_ANALYTICS_VALIDATION_LIMITS = {
  maximumNestingDepth: 12,
  maximumErrors: 25,
} as const;

export interface ServerAnalyticsValidationOptions {
  payloadBytes?: number;
  now?: Date;
  production?: boolean;
  allowedSources?: readonly AnalyticsSource[];
}

export type ServerAnalyticsValidationResult =
  | {
      ok: true;
      event: SikhadengeAnalyticsEvent;
    }
  | {
      ok: false;
      response: Extract<
        AnalyticsEventResponse,
        { accepted: false }
      >;
    };

type UnknownRecord = Record<string, unknown>;

const TOP_LEVEL_KEYS = [
  "contract_version",
  "event_id",
  "event_name",
  "occurred_at",
  "identity",
  "page",
  "campaign",
  "device",
  "geo",
  "properties",
  "consent",
  "context",
] as const;

const IDENTITY_KEYS = [
  "anonymous_id",
  "session_id",
  "user_id",
  "lead_id",
  "registration_id",
  "workshop_registration_id",
  "enrollment_id",
  "order_id",
  "payment_id",
] as const;

const PAGE_KEYS = [
  "url",
  "path",
  "title",
  "referrer",
  "landing_page",
] as const;

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "first_touch_at",
  "last_touch_at",
] as const;

const DEVICE_KEYS = [
  "category",
  "browser",
  "language",
] as const;

const GEO_KEYS = [
  "country",
  "state",
  "city",
  "source",
  "confidence",
] as const;

const CONSENT_KEYS = [
  "analytics",
  "advertising",
  "whatsapp",
  "email",
  "policy_version",
  "captured_at",
] as const;

const CONTEXT_KEYS = [
  "environment",
  "source",
  "sdk_version",
  "request_id",
] as const;

const CONSENT_STATES = [
  "granted",
  "denied",
  "unknown",
] as const;

const ENVIRONMENTS = [
  "production",
  "staging",
  "development",
  "test",
] as const;

const SOURCES = [
  "browser",
  "server",
  "webhook",
  "worker",
] as const;

const DEVICE_CATEGORIES = [
  "desktop",
  "mobile",
  "tablet",
  "unknown",
] as const;

const GEO_SOURCES = [
  "billing",
  "user_submitted",
  "counsellor_verified",
  "pincode",
  "ip_estimate",
  "unknown",
] as const;

const ISO_UTC_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

function addError(
  errors: string[],
  message: string,
): void {
  if (
    errors.length <
    SERVER_ANALYTICS_VALIDATION_LIMITS.maximumErrors
  ) {
    errors.push(message);
  }
}

function isPlainRecord(
  value: unknown,
): value is UnknownRecord {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (
    prototype === Object.prototype ||
    prototype === null
  );
}

function readObject(
  value: unknown,
  path: string,
  errors: string[],
): UnknownRecord {
  if (!isPlainRecord(value)) {
    addError(errors, `${path}: expected object`);
    return {};
  }

  return value;
}

function rejectUnknownKeys(
  value: UnknownRecord,
  allowedKeys: readonly string[],
  path: string,
  errors: string[],
): void {
  const allowed = new Set(allowedKeys);

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      addError(
        errors,
        `${path}.${key}: unknown property`,
      );
    }
  }
}

function readRequiredString(
  value: unknown,
  path: string,
  errors: string[],
  maximumLength: number,
): string {
  if (typeof value !== "string") {
    addError(errors, `${path}: expected string`);
    return "";
  }

  const normalized = value.trim();

  if (!normalized) {
    addError(errors, `${path}: value is required`);
  }

  if (normalized.length > maximumLength) {
    addError(
      errors,
      `${path}: exceeds ${maximumLength} characters`,
    );
  }

  return normalized;
}

function readOptionalString(
  value: unknown,
  path: string,
  errors: string[],
  maximumLength: number,
): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    addError(
      errors,
      `${path}: expected string or null`,
    );

    return undefined;
  }

  const normalized = value.trim();

  if (normalized.length > maximumLength) {
    addError(
      errors,
      `${path}: exceeds ${maximumLength} characters`,
    );
  }

  return normalized || null;
}

function readEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  path: string,
  errors: string[],
): T {
  if (
    typeof value !== "string" ||
    !allowed.includes(value as T)
  ) {
    addError(
      errors,
      `${path}: unsupported value`,
    );

    return allowed[0];
  }

  return value as T;
}

function readOptionalEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  path: string,
  errors: string[],
): T | undefined {
  if (value === undefined) {
    return undefined;
  }

  return readEnum(
    value,
    allowed,
    path,
    errors,
  );
}

function readIsoTimestamp(
  value: unknown,
  path: string,
  errors: string[],
  required: boolean,
): string | null | undefined {
  if (value === undefined) {
    if (required) {
      addError(errors, `${path}: value is required`);
    }

    return undefined;
  }

  if (value === null) {
    if (required) {
      addError(errors, `${path}: value is required`);
    }

    return null;
  }

  if (
    typeof value !== "string" ||
    !ISO_UTC_PATTERN.test(value)
  ) {
    addError(
      errors,
      `${path}: expected UTC ISO-8601 timestamp`,
    );

    return undefined;
  }

  const parsed = new Date(value);

  if (!Number.isFinite(parsed.getTime())) {
    addError(errors, `${path}: invalid timestamp`);
    return undefined;
  }

  return parsed.toISOString();
}

function readHttpUrl(
  value: unknown,
  path: string,
  errors: string[],
  required: boolean,
): string | null | undefined {
  if (value === undefined) {
    if (required) {
      addError(errors, `${path}: value is required`);
    }

    return undefined;
  }

  if (value === null) {
    if (required) {
      addError(errors, `${path}: value is required`);
    }

    return null;
  }

  const raw = readRequiredString(
    value,
    path,
    errors,
    ANALYTICS_EVENT_LIMITS.maximumUrlLength,
  );

  if (!raw) {
    return required ? "" : null;
  }

  try {
    const parsed = new URL(raw);

    if (
      parsed.protocol !== "https:" &&
      parsed.protocol !== "http:"
    ) {
      addError(
        errors,
        `${path}: only http and https URLs are allowed`,
      );
    }

    if (parsed.username || parsed.password) {
      addError(
        errors,
        `${path}: URL credentials are prohibited`,
      );
    }

    parsed.username = "";
    parsed.password = "";
    parsed.search = "";
    parsed.hash = "";

    const normalized = parsed.toString();

    if (
      normalized.length >
      ANALYTICS_EVENT_LIMITS.maximumUrlLength
    ) {
      addError(
        errors,
        `${path}: normalized URL is too long`,
      );
    }

    return normalized;
  } catch {
    addError(errors, `${path}: invalid URL`);
    return raw;
  }
}

function readPagePath(
  value: unknown,
  path: string,
  errors: string[],
): string {
  const pagePath = readRequiredString(
    value,
    path,
    errors,
    ANALYTICS_EVENT_LIMITS.maximumUrlLength,
  );

  if (
    pagePath &&
    (
      !pagePath.startsWith("/") ||
      pagePath.includes("?") ||
      pagePath.includes("#")
    )
  ) {
    addError(
      errors,
      `${path}: expected sanitized pathname`,
    );
  }

  return pagePath;
}

function validateJsonValue(
  value: unknown,
  path: string,
  errors: string[],
  depth = 0,
  seenObjects: WeakSet<object> =
    new WeakSet<object>(),
): JsonValue {
  if (
    depth >
    SERVER_ANALYTICS_VALIDATION_LIMITS.maximumNestingDepth
  ) {
    addError(
      errors,
      `${path}: maximum nesting depth exceeded`,
    );

    return null;
  }

  if (
    value === null ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "string") {
    if (
      value.length >
      ANALYTICS_EVENT_LIMITS
        .maximumStringPropertyLength
    ) {
      addError(
        errors,
        `${path}: string value is too long`,
      );
    }

    return value;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      addError(
        errors,
        `${path}: number must be finite`,
      );

      return null;
    }

    return value;
  }

  if (Array.isArray(value)) {
    if (seenObjects.has(value)) {
      addError(
        errors,
        `${path}: cyclic analytics value detected`,
      );

      return null;
    }

    seenObjects.add(value);

    const output = value.map(
      (item, index) =>
        validateJsonValue(
          item,
          `${path}[${index}]`,
          errors,
          depth + 1,
          seenObjects,
        ),
    );

    seenObjects.delete(value);

    return output;
  }

  if (!isPlainRecord(value)) {
    addError(
      errors,
      `${path}: unsupported JSON value`,
    );

    return null;
  }

  if (seenObjects.has(value)) {
    addError(
      errors,
      `${path}: cyclic analytics value detected`,
    );

    return null;
  }

  const entries = Object.entries(value);

  if (
    entries.length >
    ANALYTICS_EVENT_LIMITS.maximumPropertyCount
  ) {
    addError(
      errors,
      `${path}: too many object properties`,
    );
  }

  seenObjects.add(value);

  const output: Record<string, JsonValue> = {};

  for (const [key, nestedValue] of entries) {
    if (
      key.length >
      ANALYTICS_EVENT_LIMITS.maximumPropertyKeyLength
    ) {
      addError(
        errors,
        `${path}.${key}: property key is too long`,
      );
    }

    if (isDeniedAnalyticsKey(key)) {
      addError(
        errors,
        `${path}.${key}: prohibited analytics key`,
      );
    }

    output[key] = validateJsonValue(
      nestedValue,
      `${path}.${key}`,
      errors,
      depth + 1,
      seenObjects,
    );
  }

  seenObjects.delete(value);

  return output;
}

function validateIdentity(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["identity"] {
  const object = readObject(
    value,
    "identity",
    errors,
  );

  rejectUnknownKeys(
    object,
    IDENTITY_KEYS,
    "identity",
    errors,
  );

  return {
    anonymous_id: readRequiredString(
      object.anonymous_id,
      "identity.anonymous_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    session_id: readRequiredString(
      object.session_id,
      "identity.session_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    user_id: readOptionalString(
      object.user_id,
      "identity.user_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    lead_id: readOptionalString(
      object.lead_id,
      "identity.lead_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    registration_id: readOptionalString(
      object.registration_id,
      "identity.registration_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    workshop_registration_id:
      readOptionalString(
        object.workshop_registration_id,
        "identity.workshop_registration_id",
        errors,
        ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
      ),
    enrollment_id: readOptionalString(
      object.enrollment_id,
      "identity.enrollment_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    order_id: readOptionalString(
      object.order_id,
      "identity.order_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
    payment_id: readOptionalString(
      object.payment_id,
      "identity.payment_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
  };
}

function validatePage(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["page"] {
  const object = readObject(
    value,
    "page",
    errors,
  );

  rejectUnknownKeys(
    object,
    PAGE_KEYS,
    "page",
    errors,
  );

  const url =
    readHttpUrl(
      object.url,
      "page.url",
      errors,
      true,
    ) ?? "";

  const path = readPagePath(
    object.path,
    "page.path",
    errors,
  );

  try {
    if (
      url &&
      path &&
      new URL(url).pathname !== path
    ) {
      addError(
        errors,
        "page.path: does not match page.url pathname",
      );
    }
  } catch {
    // URL validation already reported the issue.
  }

  return {
    url,
    path,
    title: readOptionalString(
      object.title,
      "page.title",
      errors,
      ANALYTICS_EVENT_LIMITS
        .maximumStringPropertyLength,
    ),
    referrer: readHttpUrl(
      object.referrer,
      "page.referrer",
      errors,
      false,
    ),
    landing_page: readHttpUrl(
      object.landing_page,
      "page.landing_page",
      errors,
      false,
    ),
  };
}

function validateCampaign(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["campaign"] {
  const object = readObject(
    value,
    "campaign",
    errors,
  );

  rejectUnknownKeys(
    object,
    CAMPAIGN_KEYS,
    "campaign",
    errors,
  );

  const readCampaignString = (
    key: string,
  ) =>
    readOptionalString(
      object[key],
      `campaign.${key}`,
      errors,
      ANALYTICS_EVENT_LIMITS
        .maximumStringPropertyLength,
    );

  return {
    utm_source: readCampaignString("utm_source"),
    utm_medium: readCampaignString("utm_medium"),
    utm_campaign:
      readCampaignString("utm_campaign"),
    utm_content:
      readCampaignString("utm_content"),
    utm_term: readCampaignString("utm_term"),
    gclid: readCampaignString("gclid"),
    gbraid: readCampaignString("gbraid"),
    wbraid: readCampaignString("wbraid"),
    fbclid: readCampaignString("fbclid"),
    msclkid: readCampaignString("msclkid"),
    first_touch_at: readIsoTimestamp(
      object.first_touch_at,
      "campaign.first_touch_at",
      errors,
      false,
    ),
    last_touch_at: readIsoTimestamp(
      object.last_touch_at,
      "campaign.last_touch_at",
      errors,
      false,
    ),
  };
}

function validateDevice(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["device"] {
  const object = readObject(
    value,
    "device",
    errors,
  );

  rejectUnknownKeys(
    object,
    DEVICE_KEYS,
    "device",
    errors,
  );

  return {
    category: readOptionalEnum(
      object.category,
      DEVICE_CATEGORIES,
      "device.category",
      errors,
    ),
    browser: readOptionalString(
      object.browser,
      "device.browser",
      errors,
      128,
    ),
    language: readOptionalString(
      object.language,
      "device.language",
      errors,
      64,
    ),
  };
}

function validateGeo(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["geo"] {
  const object = readObject(
    value,
    "geo",
    errors,
  );

  rejectUnknownKeys(
    object,
    GEO_KEYS,
    "geo",
    errors,
  );

  let confidence:
    | number
    | null
    | undefined;

  if (object.confidence === undefined) {
    confidence = undefined;
  } else if (object.confidence === null) {
    confidence = null;
  } else if (
    typeof object.confidence !== "number" ||
    !Number.isFinite(object.confidence) ||
    object.confidence < 0 ||
    object.confidence > 1
  ) {
    addError(
      errors,
      "geo.confidence: expected number from 0 to 1",
    );

    confidence = undefined;
  } else {
    confidence = object.confidence;
  }

  return {
    country: readOptionalString(
      object.country,
      "geo.country",
      errors,
      128,
    ),
    state: readOptionalString(
      object.state,
      "geo.state",
      errors,
      128,
    ),
    city: readOptionalString(
      object.city,
      "geo.city",
      errors,
      128,
    ),
    source: readOptionalEnum(
      object.source,
      GEO_SOURCES,
      "geo.source",
      errors,
    ),
    confidence,
  };
}

function validateConsent(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["consent"] {
  const object = readObject(
    value,
    "consent",
    errors,
  );

  rejectUnknownKeys(
    object,
    CONSENT_KEYS,
    "consent",
    errors,
  );

  return {
    analytics: readEnum(
      object.analytics,
      CONSENT_STATES,
      "consent.analytics",
      errors,
    ),
    advertising: readEnum(
      object.advertising,
      CONSENT_STATES,
      "consent.advertising",
      errors,
    ),
    whatsapp: readOptionalEnum(
      object.whatsapp,
      CONSENT_STATES,
      "consent.whatsapp",
      errors,
    ),
    email: readOptionalEnum(
      object.email,
      CONSENT_STATES,
      "consent.email",
      errors,
    ),
    policy_version: readOptionalString(
      object.policy_version,
      "consent.policy_version",
      errors,
      128,
    ),
    captured_at: readIsoTimestamp(
      object.captured_at,
      "consent.captured_at",
      errors,
      false,
    ),
  };
}

function validateContext(
  value: unknown,
  errors: string[],
): SikhadengeAnalyticsEvent["context"] {
  const object = readObject(
    value,
    "context",
    errors,
  );

  rejectUnknownKeys(
    object,
    CONTEXT_KEYS,
    "context",
    errors,
  );

  return {
    environment: readEnum(
      object.environment,
      ENVIRONMENTS,
      "context.environment",
      errors,
    ) as AnalyticsEnvironment,
    source: readEnum(
      object.source,
      SOURCES,
      "context.source",
      errors,
    ) as AnalyticsSource,
    sdk_version: readRequiredString(
      object.sdk_version,
      "context.sdk_version",
      errors,
      64,
    ),
    request_id: readOptionalString(
      object.request_id,
      "context.request_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    ),
  };
}

function rejected(
  status:
    | "invalid_schema"
    | "invalid_consent"
    | "payload_too_large",
  errors: string[],
  eventId?: string,
): ServerAnalyticsValidationResult {
  return {
    ok: false,
    response: {
      accepted: false,
      event_id: eventId || undefined,
      status,
      errors,
    },
  };
}

export function validateServerAnalyticsEvent(
  input: unknown,
  options: ServerAnalyticsValidationOptions = {},
): ServerAnalyticsValidationResult {
  const eventId =
    isPlainRecord(input) &&
    typeof input.event_id === "string"
      ? input.event_id.trim().slice(
          0,
          ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
        )
      : undefined;

  if (
    options.payloadBytes !== undefined &&
    (
      !Number.isFinite(options.payloadBytes) ||
      options.payloadBytes < 0 ||
      options.payloadBytes >
        ANALYTICS_EVENT_LIMITS.maximumPayloadBytes
    )
  ) {
    return rejected(
      "payload_too_large",
      [
        `Payload exceeds ${ANALYTICS_EVENT_LIMITS.maximumPayloadBytes} bytes`,
      ],
      eventId,
    );
  }

  const errors: string[] = [];

  const object = readObject(
    input,
    "event",
    errors,
  );

  rejectUnknownKeys(
    object,
    TOP_LEVEL_KEYS,
    "event",
    errors,
  );

  const contractVersion =
    readRequiredString(
      object.contract_version,
      "contract_version",
      errors,
      16,
    );

  if (
    contractVersion !==
    ANALYTICS_CONTRACT_VERSION
  ) {
    addError(
      errors,
      "contract_version: unsupported contract version",
    );
  }

  const validatedEventId =
    readRequiredString(
      object.event_id,
      "event_id",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventIdLength,
    );

  const eventNameValue =
    readRequiredString(
      object.event_name,
      "event_name",
      errors,
      ANALYTICS_EVENT_LIMITS.maximumEventNameLength,
    );

  if (
    !Object.prototype.hasOwnProperty.call(
      EVENT_CATALOG,
      eventNameValue,
    )
  ) {
    addError(
      errors,
      "event_name: unsupported canonical event",
    );
  }

  const occurredAt =
    readIsoTimestamp(
      object.occurred_at,
      "occurred_at",
      errors,
      true,
    ) ?? "";

  const identity = validateIdentity(
    object.identity,
    errors,
  );

  const page = validatePage(
    object.page,
    errors,
  );

  const campaign = validateCampaign(
    object.campaign,
    errors,
  );

  const device = validateDevice(
    object.device,
    errors,
  );

  const geo = validateGeo(
    object.geo,
    errors,
  );

  const propertiesObject = readObject(
    object.properties,
    "properties",
    errors,
  );

  const properties =
    validateJsonValue(
      propertiesObject,
      "properties",
      errors,
    ) as Record<string, JsonValue>;

  const consent = validateConsent(
    object.consent,
    errors,
  );

  const context = validateContext(
    object.context,
    errors,
  );

  const now = options.now ?? new Date();

  if (occurredAt) {
    const occurredTime =
      new Date(occurredAt).getTime();

    const futureLimit =
      now.getTime() +
      ANALYTICS_EVENT_LIMITS
        .maximumFutureClockSkewSeconds *
        1000;

    const pastLimit =
      now.getTime() -
      ANALYTICS_EVENT_LIMITS
        .maximumPastAgeDays *
        24 *
        60 *
        60 *
        1000;

    if (occurredTime > futureLimit) {
      addError(
        errors,
        "occurred_at: event timestamp is too far in the future",
      );
    }

    if (occurredTime < pastLimit) {
      addError(
        errors,
        "occurred_at: event timestamp is too old",
      );
    }
  }

  if (
    options.production === true &&
    ANALYTICS_DESTINATION_RULES
      .productionAcceptsTestEnvironmentEvents ===
      false &&
    context.environment === "test"
  ) {
    addError(
      errors,
      "context.environment: test events are not accepted in production",
    );
  }

  if (
    options.allowedSources &&
    !options.allowedSources.includes(
      context.source,
    )
  ) {
    addError(
      errors,
      "context.source: source is not allowed for this endpoint",
    );
  }

  if (errors.length > 0) {
    return rejected(
      "invalid_schema",
      errors,
      validatedEventId || eventId,
    );
  }

  if (
    ANALYTICS_DESTINATION_RULES
      .internalCollectionRequiresAnalyticsConsent &&
    consent.analytics !== "granted"
  ) {
    return rejected(
      "invalid_consent",
      [
        "consent.analytics: granted consent is required",
      ],
      validatedEventId,
    );
  }

  return {
    ok: true,
    event: {
      contract_version:
        ANALYTICS_CONTRACT_VERSION,
      event_id: validatedEventId,
      event_name:
        eventNameValue as SikhadengeEventName,
      occurred_at: occurredAt,
      identity,
      page,
      campaign,
      device,
      geo,
      properties,
      consent,
      context,
    },
  };
}
