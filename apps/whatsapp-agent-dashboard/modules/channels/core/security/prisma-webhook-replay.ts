import { createHash } from "node:crypto";
import { Prisma } from "@prisma/client";

import {
  channelConnectionId,
  type ChannelType,
} from "@/modules/channels/core/contracts/channel";
import {
  isSecurityPersistenceMasterEnabled,
  SECURITY_FEATURE_FLAGS,
  type EnvironmentMap,
} from "@/modules/auth/infrastructure/prisma-authorization";
import { webhookReplayKey } from "@/modules/channels/core/security/webhook-security";
import { prisma } from "@/lib/db/prisma";

export type WebhookReplayReservation = {
  enforced: boolean;
  duplicate: boolean;
  reservationId?: string;
  replayKey?: string;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function deriveWebhookExternalEventId(rawBody: string): string {
  return `payload-sha256:${sha256(rawBody)}`;
}

export async function reservePersistedWebhookReplay(input: {
  channel: ChannelType;
  rawBody: string;
  signatureHeader?: string | null;
  externalEventId?: string | null;
  now?: Date;
  ttlSeconds?: number;
  env?: EnvironmentMap;
}): Promise<WebhookReplayReservation> {
  if (!isSecurityPersistenceMasterEnabled(input.env)) {
    return { enforced: false, duplicate: false };
  }

  const connection = await prisma.engageChannelConnection.findFirst({
    where: {
      channel: input.channel,
      status: { in: ["CONNECTED", "DEGRADED"] },
      workspace: {
        isActive: true,
        featureFlags: {
          some: {
            key: SECURITY_FEATURE_FLAGS.webhookReplay,
            enabled: true,
          },
        },
      },
    },
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    select: {
      id: true,
      workspaceId: true,
    },
  });

  if (!connection) {
    return { enforced: false, duplicate: false };
  }

  const now = input.now ?? new Date();
  const ttlSeconds = Math.max(60, input.ttlSeconds ?? 86_400);
  const externalEventId =
    input.externalEventId?.trim() || deriveWebhookExternalEventId(input.rawBody);
  const replayKey = webhookReplayKey({
    connectionId: channelConnectionId(connection.id),
    externalEventId,
  });

  try {
    const reservation = await prisma.engageWebhookReplayRecord.create({
      data: {
        workspaceId: connection.workspaceId,
        connectionId: connection.id,
        replayKey,
        signatureDigest: sha256(input.signatureHeader || input.rawBody),
        receivedAt: now,
        expiresAt: new Date(now.getTime() + ttlSeconds * 1_000),
      },
      select: { id: true },
    });

    return {
      enforced: true,
      duplicate: false,
      reservationId: reservation.id,
      replayKey,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { enforced: true, duplicate: true, replayKey };
    }
    throw error;
  }
}

export async function releasePersistedWebhookReplay(
  reservation: WebhookReplayReservation,
): Promise<void> {
  if (!reservation.enforced || !reservation.reservationId) return;

  await prisma.engageWebhookReplayRecord.deleteMany({
    where: { id: reservation.reservationId },
  });
}
