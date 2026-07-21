import {
  Prisma,
  type PrismaClient,
} from "@prisma/client";
import { randomUUID } from "crypto";
import type {
  SikhadengeAnalyticsEvent,
} from "./event-contract";

export type AnalyticsEventStorageClient =
  Pick<PrismaClient, "$queryRaw">;

export type AnalyticsEventStorageStatus =
  | "accepted"
  | "duplicate";

export interface AnalyticsEventStorageResult {
  event_id: string;
  status: AnalyticsEventStorageStatus;
}

export interface AnalyticsEventStorageOptions {
  receivedAt?: Date;
  createRecordId?: () => string;
}

type InsertedAnalyticsEventRow = {
  eventId: string;
};

function serializeJson(
  value: unknown,
  field: string,
): string {
  const serialized = JSON.stringify(value);

  if (serialized === undefined) {
    throw new Error(
      `${field}: value cannot be serialized`,
    );
  }

  return serialized;
}

function assertValidDate(
  value: Date,
  field: string,
): void {
  if (
    !(value instanceof Date) ||
    !Number.isFinite(value.getTime())
  ) {
    throw new Error(`${field}: invalid date`);
  }
}

export async function storeAnalyticsEvent(
  client: AnalyticsEventStorageClient,
  event: SikhadengeAnalyticsEvent,
  options: AnalyticsEventStorageOptions = {},
): Promise<AnalyticsEventStorageResult> {
  const receivedAt =
    options.receivedAt ?? new Date();

  const occurredAt =
    new Date(event.occurred_at);

  assertValidDate(
    receivedAt,
    "receivedAt",
  );

  assertValidDate(
    occurredAt,
    "occurredAt",
  );

  const createRecordId =
    options.createRecordId ?? randomUUID;

  const recordId =
    createRecordId().trim();

  if (!recordId) {
    throw new Error(
      "createRecordId: empty record id",
    );
  }

  const rows =
    await client.$queryRaw<
      InsertedAnalyticsEventRow[]
    >(
      Prisma.sql`
        INSERT INTO "AnalyticsEvent" (
          "id",
          "eventId",
          "contractVersion",
          "eventName",
          "occurredAt",
          "receivedAt",
          "anonymousId",
          "sessionId",
          "environment",
          "source",
          "pagePath",
          "requestId",
          "identity",
          "page",
          "campaign",
          "device",
          "geo",
          "properties",
          "consent",
          "context",
          "payload"
        )
        VALUES (
          ${recordId},
          ${event.event_id},
          ${event.contract_version},
          ${event.event_name},
          ${occurredAt},
          ${receivedAt},
          ${event.identity.anonymous_id},
          ${event.identity.session_id},
          ${event.context.environment},
          ${event.context.source},
          ${event.page.path},
          ${event.context.request_id ?? null},
          ${serializeJson(
            event.identity,
            "identity",
          )}::jsonb,
          ${serializeJson(
            event.page,
            "page",
          )}::jsonb,
          ${serializeJson(
            event.campaign,
            "campaign",
          )}::jsonb,
          ${serializeJson(
            event.device,
            "device",
          )}::jsonb,
          ${serializeJson(
            event.geo,
            "geo",
          )}::jsonb,
          ${serializeJson(
            event.properties,
            "properties",
          )}::jsonb,
          ${serializeJson(
            event.consent,
            "consent",
          )}::jsonb,
          ${serializeJson(
            event.context,
            "context",
          )}::jsonb,
          ${serializeJson(
            event,
            "payload",
          )}::jsonb
        )
        ON CONFLICT ("eventId")
        DO NOTHING
        RETURNING "eventId"
      `,
    );

  if (!Array.isArray(rows)) {
    throw new Error(
      "AnalyticsEvent insert returned invalid result",
    );
  }

  if (rows.length === 0) {
    return {
      event_id: event.event_id,
      status: "duplicate",
    };
  }

  if (
    rows.length !== 1 ||
    rows[0]?.eventId !== event.event_id
  ) {
    throw new Error(
      "AnalyticsEvent insert returned unexpected event id",
    );
  }

  return {
    event_id: event.event_id,
    status: "accepted",
  };
}
