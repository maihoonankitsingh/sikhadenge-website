import {
  buildCanonicalBrowserEvent,
  type BuildBrowserEventInput,
} from "./browser-event-builder";

import {
  ANALYTICS_DESTINATION_RULES,
  ANALYTICS_EVENT_LIMITS,
  isDeniedAnalyticsKey,
} from "./event-policy";

import type {
  AnalyticsEventResponse,
  AnalyticsRejectedResponse,
  JsonValue,
  SikhadengeAnalyticsEvent,
} from "./event-contract";

export const ANALYTICS_COLLECTION_ENDPOINT =
  "/api/analytics/events";

export const BROWSER_TRANSPORT_TIMEOUT_MS =
  8_000;

const MAX_VALIDATION_ERRORS = 25;

const MAX_PROPERTY_NESTING_DEPTH = 12;

interface PreparedTransport {
  body: string;
  payloadBytes: number;
}

function rejectEvent(
  eventId: string,
  status: AnalyticsRejectedResponse["status"],
  errors: string[],
): AnalyticsRejectedResponse {
  return {
    accepted: false,
    event_id: eventId,
    status,
    errors,
  };
}

function addValidationError(
  errors: string[],
  message: string,
): void {
  if (errors.length < MAX_VALIDATION_ERRORS) {
    errors.push(message);
  }
}

function validateJsonValue(
  value: JsonValue,
  path: string,
  errors: string[],
  depth = 0,
  seenObjects: WeakSet<object> =
    new WeakSet<object>(),
): void {
  if (depth > MAX_PROPERTY_NESTING_DEPTH) {
    addValidationError(
      errors,
      `${path}: maximum nesting depth exceeded`,
    );

    return;
  }

  if (typeof value === "string") {
    if (
      value.length >
      ANALYTICS_EVENT_LIMITS.maximumStringPropertyLength
    ) {
      addValidationError(
        errors,
        `${path}: string value is too long`,
      );
    }

    return;
  }

  if (Array.isArray(value)) {
    if (seenObjects.has(value)) {
      addValidationError(
        errors,
        `${path}: cyclic analytics value detected`,
      );

      return;
    }

    seenObjects.add(value);

    value.forEach((item, index) => {
      validateJsonValue(
        item,
        `${path}[${index}]`,
        errors,
        depth + 1,
        seenObjects,
      );
    });

    seenObjects.delete(value);

    return;
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    if (seenObjects.has(value)) {
      addValidationError(
        errors,
        `${path}: cyclic analytics value detected`,
      );

      return;
    }

    seenObjects.add(value);

    for (
      const [key, nestedValue]
      of Object.entries(value)
    ) {
      if (isDeniedAnalyticsKey(key)) {
        addValidationError(
          errors,
          `${path}.${key}: prohibited analytics key`,
        );
      }

      if (
        key.length >
        ANALYTICS_EVENT_LIMITS.maximumPropertyKeyLength
      ) {
        addValidationError(
          errors,
          `${path}.${key}: property key is too long`,
        );
      }

      validateJsonValue(
        nestedValue,
        `${path}.${key}`,
        errors,
        depth + 1,
        seenObjects,
      );
    }

    seenObjects.delete(value);
  }
}

function validateCanonicalEvent(
  event: SikhadengeAnalyticsEvent,
): AnalyticsRejectedResponse | null {
  if (
    ANALYTICS_DESTINATION_RULES
      .internalCollectionRequiresAnalyticsConsent &&
    event.consent.analytics !== "granted"
  ) {
    return rejectEvent(
      event.event_id,
      "invalid_consent",
      [
        "Analytics consent is required for internal collection",
      ],
    );
  }

  const errors: string[] = [];

  if (
    event.event_id.length >
    ANALYTICS_EVENT_LIMITS.maximumEventIdLength
  ) {
    addValidationError(
      errors,
      "event_id exceeds the allowed length",
    );
  }

  if (
    event.event_name.length >
    ANALYTICS_EVENT_LIMITS.maximumEventNameLength
  ) {
    addValidationError(
      errors,
      "event_name exceeds the allowed length",
    );
  }

  if (
    event.page.url.length >
    ANALYTICS_EVENT_LIMITS.maximumUrlLength
  ) {
    addValidationError(
      errors,
      "page.url exceeds the allowed length",
    );
  }

  const propertyEntries =
    Object.entries(event.properties);

  if (
    propertyEntries.length >
    ANALYTICS_EVENT_LIMITS.maximumPropertyCount
  ) {
    addValidationError(
      errors,
      "properties exceeds the allowed count",
    );
  }

  for (const [key, value] of propertyEntries) {
    if (isDeniedAnalyticsKey(key)) {
      addValidationError(
        errors,
        `properties.${key}: prohibited analytics key`,
      );
    }

    if (
      key.length >
      ANALYTICS_EVENT_LIMITS.maximumPropertyKeyLength
    ) {
      addValidationError(
        errors,
        `properties.${key}: property key is too long`,
      );
    }

    validateJsonValue(
      value,
      `properties.${key}`,
      errors,
    );
  }

  if (errors.length > 0) {
    return rejectEvent(
      event.event_id,
      "invalid_schema",
      errors,
    );
  }

  return null;
}

function prepareTransport(
  event: SikhadengeAnalyticsEvent,
): PreparedTransport | AnalyticsRejectedResponse {
  const validationFailure =
    validateCanonicalEvent(event);

  if (validationFailure) {
    return validationFailure;
  }

  let body: string;

  try {
    body = JSON.stringify(event);
  } catch {
    return rejectEvent(
      event.event_id,
      "invalid_schema",
      ["Analytics event could not be serialized"],
    );
  }

  const payloadBytes =
    new TextEncoder().encode(body).byteLength;

  if (
    payloadBytes >
    ANALYTICS_EVENT_LIMITS.maximumPayloadBytes
  ) {
    return rejectEvent(
      event.event_id,
      "payload_too_large",
      [
        `Payload exceeds ${ANALYTICS_EVENT_LIMITS.maximumPayloadBytes} bytes`,
      ],
    );
  }

  return {
    body,
    payloadBytes,
  };
}

function isAnalyticsEventResponse(
  value: unknown,
): value is AnalyticsEventResponse {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return false;
  }

  const response =
    value as Record<string, unknown>;

  if (response.accepted === true) {
    return (
      typeof response.event_id === "string" &&
      (
        response.status === "accepted" ||
        response.status === "queued" ||
        response.status === "duplicate"
      )
    );
  }

  if (response.accepted === false) {
    return (
      (
        response.status === "invalid_schema" ||
        response.status === "invalid_consent" ||
        response.status === "payload_too_large" ||
        response.status === "rate_limited" ||
        response.status === "internal_error"
      ) &&
      Array.isArray(response.errors) &&
      response.errors.every(
        (item) => typeof item === "string",
      )
    );
  }

  return false;
}

export async function sendCanonicalBrowserEvent(
  event: SikhadengeAnalyticsEvent,
): Promise<AnalyticsEventResponse> {
  const prepared = prepareTransport(event);

  if ("accepted" in prepared) {
    return prepared;
  }

  const controller =
    new AbortController();

  const timeout = window.setTimeout(
    () => controller.abort(),
    BROWSER_TRANSPORT_TIMEOUT_MS,
  );

  try {
    const response = await fetch(
      ANALYTICS_COLLECTION_ENDPOINT,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: prepared.body,
        credentials: "same-origin",
        cache: "no-store",
        keepalive: true,
        signal: controller.signal,
      },
    );

    const responseBody: unknown =
      await response.json().catch(
        () => null,
      );

    if (
      isAnalyticsEventResponse(responseBody)
    ) {
      return responseBody;
    }

    return rejectEvent(
      event.event_id,
      "internal_error",
      [
        `Analytics endpoint returned an invalid response (${response.status})`,
      ],
    );
  } catch (error) {
    const isTimeout =
      error instanceof DOMException &&
      error.name === "AbortError";

    return rejectEvent(
      event.event_id,
      "internal_error",
      [
        isTimeout
          ? "Analytics transport timed out"
          : "Analytics transport failed",
      ],
    );
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function sendBrowserEvent(
  input: BuildBrowserEventInput,
): Promise<AnalyticsEventResponse> {
  let event: SikhadengeAnalyticsEvent;

  try {
    event =
      buildCanonicalBrowserEvent(input);
  } catch {
    return {
      accepted: false,
      status: "invalid_schema",
      errors: [
        "Analytics event could not be built",
      ],
    };
  }

  return sendCanonicalBrowserEvent(event);
}

export function queueBrowserEvent(
  input: BuildBrowserEventInput,
): string | null {
  let event: SikhadengeAnalyticsEvent;

  try {
    event =
      buildCanonicalBrowserEvent(input);
  } catch {
    return null;
  }

  if (event.consent.analytics !== "granted") {
    return null;
  }

  void sendCanonicalBrowserEvent(event);

  return event.event_id;
}
