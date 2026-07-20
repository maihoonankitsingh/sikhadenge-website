import {
  isSikhadengeEventName,
  type SikhadengeEventName,
} from "./event-catalog";

import {
  ANALYTICS_CONTRACT_VERSION,
  type AnalyticsCampaign,
  type AnalyticsDevice,
  type AnalyticsEnvironment,
  type AnalyticsGeo,
  type AnalyticsIdentity,
  type AnalyticsPage,
  type JsonValue,
  type SikhadengeAnalyticsEvent,
} from "./event-contract";

import {
  getBrowserAttribution,
} from "./browser-attribution";

import {
  resolveBrowserConsent,
} from "./browser-consent";

import {
  getBrowserDeviceContext,
  getBrowserGeoContext,
  getBrowserPageContext,
} from "./browser-context";

import {
  getBrowserIdentity,
} from "./browser-identity";

export const BROWSER_ANALYTICS_SDK_VERSION =
  "1.0.0" as const;

type IdentityOverrides = Partial<
  Omit<
    AnalyticsIdentity,
    "anonymous_id" | "session_id"
  >
>;

export interface BuildBrowserEventInput {
  event_name: SikhadengeEventName;
  event_id?: string;
  occurred_at?: string;
  properties?: Record<string, JsonValue>;
  identity?: IdentityOverrides;
  page?: Partial<AnalyticsPage>;
  campaign?: Partial<AnalyticsCampaign>;
  device?: Partial<AnalyticsDevice>;
  geo?: Partial<AnalyticsGeo>;
  environment?: AnalyticsEnvironment;
  request_id?: string | null;
}

function randomHex(bytes: number): string {
  const values = new Uint8Array(bytes);

  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.getRandomValues ===
      "function"
  ) {
    globalThis.crypto.getRandomValues(values);
  } else {
    for (
      let index = 0;
      index < values.length;
      index += 1
    ) {
      values[index] =
        Math.floor(Math.random() * 256);
    }
  }

  return Array.from(values)
    .map((value) =>
      value.toString(16).padStart(2, "0"),
    )
    .join("");
}

function createIdentifier(prefix: string): string {
  return `${prefix}_${Date.now()}_${randomHex(12)}`;
}

function normalizeTimestamp(
  value?: string,
): string {
  if (!value) {
    return new Date().toISOString();
  }

  const timestamp = Date.parse(value);

  if (!Number.isFinite(timestamp)) {
    throw new Error(
      "Invalid analytics event timestamp",
    );
  }

  return new Date(timestamp).toISOString();
}

function detectBrowserEnvironment():
  AnalyticsEnvironment {
  if (typeof window === "undefined") {
    return "test";
  }

  const hostname =
    window.location.hostname.toLowerCase();

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local")
  ) {
    return "development";
  }

  if (
    hostname.includes("staging") ||
    hostname.includes("preview")
  ) {
    return "staging";
  }

  return "production";
}

function createEphemeralBrowserIdentity(): {
  anonymous_id: string;
  session_id: string;
} {
  return {
    anonymous_id:
      createIdentifier("anon_ephemeral"),
    session_id:
      createIdentifier("ses_ephemeral"),
  };
}

export function buildCanonicalBrowserEvent(
  input: BuildBrowserEventInput,
): SikhadengeAnalyticsEvent {
  if (
    !isSikhadengeEventName(
      String(input.event_name),
    )
  ) {
    throw new Error(
      `Unsupported analytics event: ${String(
        input.event_name,
      )}`,
    );
  }

  const consent = resolveBrowserConsent();
  const persistentStorageAllowed =
    consent.analytics === "granted";

  const browserIdentity =
    persistentStorageAllowed
      ? getBrowserIdentity()
      : createEphemeralBrowserIdentity();

  const attribution =
    persistentStorageAllowed
      ? getBrowserAttribution()
      : {
          campaign: {},
          landing_page: null,
          referrer: null,
        };

  const basePage = getBrowserPageContext(
    attribution.landing_page,
  );

  const baseDevice =
    getBrowserDeviceContext();

  const baseGeo =
    getBrowserGeoContext();

  const page: AnalyticsPage = {
    ...basePage,
    ...input.page,
    url:
      input.page?.url ??
      basePage.url,
    path:
      input.page?.path ??
      basePage.path,
    referrer:
      input.page?.referrer ??
      attribution.referrer ??
      basePage.referrer ??
      null,
  };

  const identity: AnalyticsIdentity = {
    anonymous_id:
      browserIdentity.anonymous_id,
    session_id:
      browserIdentity.session_id,
    ...input.identity,
  };

  return {
    contract_version:
      ANALYTICS_CONTRACT_VERSION,

    event_id:
      input.event_id?.trim() ||
      createIdentifier("evt"),

    event_name:
      input.event_name,

    occurred_at:
      normalizeTimestamp(
        input.occurred_at,
      ),

    identity,

    page,

    campaign: {
      ...attribution.campaign,
      ...input.campaign,
    },

    device: {
      ...baseDevice,
      ...input.device,
    },

    geo: {
      ...baseGeo,
      ...input.geo,
    },

    properties:
      input.properties ?? {},

    consent,

    context: {
      environment:
        input.environment ??
        detectBrowserEnvironment(),
      source: "browser",
      sdk_version:
        BROWSER_ANALYTICS_SDK_VERSION,
      request_id:
        input.request_id ?? null,
    },
  };
}
