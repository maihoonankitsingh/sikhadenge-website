import { randomUUID } from "crypto";
import { prisma } from "../prisma";
import { rateLimit } from "../rateLimit";
import {
  ANALYTICS_EVENT_LIMITS,
} from "./event-policy";
import type {
  AnalyticsEnvironment,
  AnalyticsEventResponse,
  SikhadengeAnalyticsEvent,
} from "./event-contract";
import {
  validateServerAnalyticsEvent,
  type ServerAnalyticsValidationResult,
} from "./server-validator";
import {
  storeAnalyticsEvent,
  type AnalyticsEventStorageResult,
} from "./server-storage";

const COLLECTION_RATE_LIMIT = {
  limit: 60,
  windowMs: 60_000,
} as const;

const JSON_HEADERS = {
  "content-type":
    "application/json; charset=utf-8",
  "cache-control":
    "no-store, max-age=0",
} as const;

type RejectedStatus =
  Extract<
    AnalyticsEventResponse,
    { accepted: false }
  >["status"];

type Validator = (
  input: unknown,
  options: {
    payloadBytes: number;
    now: Date;
    production: boolean;
    allowedSources: readonly ["browser"];
  },
) => ServerAnalyticsValidationResult;

type Store = (
  event: SikhadengeAnalyticsEvent,
) => Promise<AnalyticsEventStorageResult>;

export interface AnalyticsCollectionDependencies {
  validate: Validator;
  store: Store;
  rateLimit: (
    request: Request,
  ) => Response | null;
  createRequestId: () => string;
  now: () => Date;
  environment: AnalyticsEnvironment;
  logError: (
    details: {
      request_id: string;
      event_id?: string;
      error_name: string;
    },
  ) => void;
}

type BodyResult =
  | {
      ok: true;
      text: string;
      byteLength: number;
    }
  | {
      ok: false;
      status:
        | "payload_too_large"
        | "invalid_schema";
      error: string;
    };

function jsonResponse(
  payload: AnalyticsEventResponse,
  status: number,
  extraHeaders:
    Record<string, string> = {},
): Response {
  return new Response(
    JSON.stringify(payload),
    {
      status,
      headers: {
        ...JSON_HEADERS,
        ...extraHeaders,
      },
    },
  );
}

function rejectedResponse(
  status: RejectedStatus,
  errors: string[],
  httpStatus: number,
  eventId?: string,
  headers:
    Record<string, string> = {},
): Response {
  return jsonResponse(
    {
      accepted: false,
      event_id:
        eventId || undefined,
      status,
      errors,
    },
    httpStatus,
    headers,
  );
}

function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const prototype =
    Object.getPrototypeOf(value);

  return (
    prototype === Object.prototype ||
    prototype === null
  );
}

function resolveEnvironment():
AnalyticsEnvironment {
  const configured =
    process.env.ANALYTICS_ENVIRONMENT
      ?.trim()
      .toLowerCase();

  if (
    configured === "production" ||
    configured === "staging" ||
    configured === "development" ||
    configured === "test"
  ) {
    return configured;
  }

  if (
    process.env.NODE_ENV === "production"
  ) {
    return "production";
  }

  if (
    process.env.NODE_ENV === "test"
  ) {
    return "test";
  }

  return "development";
}

function applyServerContext(
  input: unknown,
  environment: AnalyticsEnvironment,
  requestId: string,
): unknown {
  if (!isPlainObject(input)) {
    return input;
  }

  const output:
    Record<string, unknown> = {
      ...input,
    };

  if (
    isPlainObject(input.context)
  ) {
    output.context = {
      ...input.context,
      environment,
      source: "browser",
      request_id: requestId,
    };
  }

  if (
    isPlainObject(input.geo)
  ) {
    output.geo = {
      ...input.geo,
      source:
        input.geo.source ===
        "user_submitted"
          ? "user_submitted"
          : "unknown",
    };
  }

  return output;
}

function parseContentLength(
  request: Request,
):
  | {
      ok: true;
      value?: number;
    }
  | {
      ok: false;
    } {
  const raw =
    request.headers.get(
      "content-length",
    );

  if (raw === null) {
    return {
      ok: true,
    };
  }

  const normalized =
    raw.trim();

  if (
    !/^\d+$/.test(normalized)
  ) {
    return {
      ok: false,
    };
  }

  const value =
    Number(normalized);

  if (
    !Number.isSafeInteger(value) ||
    value < 0
  ) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    value,
  };
}

async function readRequestBodyWithLimit(
  request: Request,
  maximumBytes: number,
): Promise<BodyResult> {
  const declared =
    parseContentLength(request);

  if (!declared.ok) {
    return {
      ok: false,
      status: "invalid_schema",
      error:
        "content-length: invalid header",
    };
  }

  if (
    declared.value !== undefined &&
    declared.value > maximumBytes
  ) {
    return {
      ok: false,
      status:
        "payload_too_large",
      error:
        `Payload exceeds ${maximumBytes} bytes`,
    };
  }

  if (!request.body) {
    return {
      ok: true,
      text: "",
      byteLength: 0,
    };
  }

  const reader =
    request.body.getReader();

  const chunks:
    Uint8Array[] = [];

  let totalBytes = 0;

  while (true) {
    const result =
      await reader.read();

    if (result.done) {
      break;
    }

    totalBytes +=
      result.value.byteLength;

    if (
      totalBytes > maximumBytes
    ) {
      await reader
        .cancel()
        .catch(() => undefined);

      return {
        ok: false,
        status:
          "payload_too_large",
        error:
          `Payload exceeds ${maximumBytes} bytes`,
      };
    }

    chunks.push(
      result.value,
    );
  }

  const bytes =
    new Uint8Array(
      totalBytes,
    );

  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(
      chunk,
      offset,
    );

    offset +=
      chunk.byteLength;
  }

  try {
    const decoder =
      new TextDecoder(
        "utf-8",
        {
          fatal: true,
        },
      );

    return {
      ok: true,
      text:
        decoder.decode(bytes),
      byteLength:
        totalBytes,
    };
  } catch {
    return {
      ok: false,
      status:
        "invalid_schema",
      error:
        "body: invalid UTF-8 encoding",
    };
  }
}

function mapRateLimit(
  response: Response,
): Response {
  const retryAfter =
    response.headers.get(
      "retry-after",
    ) || "60";

  return rejectedResponse(
    "rate_limited",
    [
      "Request rate limit exceeded",
    ],
    429,
    undefined,
    {
      "retry-after":
        retryAfter,
    },
  );
}

export function createDefaultAnalyticsCollectionDependencies():
AnalyticsCollectionDependencies {
  return {
    validate:
      validateServerAnalyticsEvent,

    store:
      (
        event:
          SikhadengeAnalyticsEvent,
      ) =>
        storeAnalyticsEvent(
          prisma,
          event,
        ),

    rateLimit:
      (request: Request) =>
        rateLimit(
          request,
          COLLECTION_RATE_LIMIT,
        ),

    createRequestId:
      randomUUID,

    now:
      () => new Date(),

    environment:
      resolveEnvironment(),

    logError:
      (details) => {
        console.error(
          "ANALYTICS_COLLECTION_ERROR",
          details,
        );
      },
  };
}

export async function
handleAnalyticsEventRequest(
  request: Request,
  dependencies:
    AnalyticsCollectionDependencies,
): Promise<Response> {
  const requestId =
    dependencies
      .createRequestId()
      .trim();

  let eventId:
    | string
    | undefined;

  try {
    if (!requestId) {
      throw new Error(
        "empty_request_id",
      );
    }

    const limited =
      dependencies.rateLimit(
        request,
      );

    if (limited) {
      return mapRateLimit(
        limited,
      );
    }

    const contentType =
      (
        request.headers.get(
          "content-type",
        ) || ""
      )
        .split(";")[0]
        .trim()
        .toLowerCase();

    if (
      contentType !==
      "application/json"
    ) {
      return rejectedResponse(
        "invalid_schema",
        [
          "content-type: application/json required",
        ],
        400,
      );
    }

    const body =
      await readRequestBodyWithLimit(
        request,
        ANALYTICS_EVENT_LIMITS
          .maximumPayloadBytes,
      );

    if (!body.ok) {
      return rejectedResponse(
        body.status,
        [body.error],
        body.status ===
          "payload_too_large"
          ? 413
          : 400,
      );
    }

    if (
      body.text.trim() === ""
    ) {
      return rejectedResponse(
        "invalid_schema",
        [
          "body: JSON payload required",
        ],
        400,
      );
    }

    let parsed: unknown;

    try {
      parsed =
        JSON.parse(body.text);
    } catch {
      return rejectedResponse(
        "invalid_schema",
        [
          "body: invalid JSON",
        ],
        400,
      );
    }

    if (
      isPlainObject(parsed) &&
      typeof parsed.event_id ===
        "string"
    ) {
      eventId =
        parsed.event_id
          .trim()
          .slice(
            0,
            ANALYTICS_EVENT_LIMITS
              .maximumEventIdLength,
          ) ||
        undefined;
    }

    const controlledInput =
      applyServerContext(
        parsed,
        dependencies.environment,
        requestId,
      );

    const validation =
      dependencies.validate(
        controlledInput,
        {
          payloadBytes:
            body.byteLength,

          now:
            dependencies.now(),

          production:
            dependencies
              .environment ===
            "production",

          allowedSources:
            ["browser"],
        },
      );

    if (!validation.ok) {
      const rejected =
        validation.response;

      const httpStatus =
        rejected.status ===
        "invalid_consent"
          ? 403
          : rejected.status ===
              "payload_too_large"
            ? 413
            : 400;

      return jsonResponse(
        rejected,
        httpStatus,
      );
    }

    eventId =
      validation.event.event_id;

    const stored =
      await dependencies.store(
        validation.event,
      );

    return jsonResponse(
      {
        accepted: true,
        event_id:
          stored.event_id,
        status:
          stored.status,
      },
      stored.status ===
        "duplicate"
        ? 200
        : 202,
    );
  } catch (error) {
    dependencies.logError({
      request_id: requestId,
      event_id: eventId,
      error_name:
        error instanceof Error
          ? error.name
          : "UnknownError",
    });

    return rejectedResponse(
      "internal_error",
      [
        "Analytics event could not be stored",
      ],
      500,
      eventId,
    );
  }
}
