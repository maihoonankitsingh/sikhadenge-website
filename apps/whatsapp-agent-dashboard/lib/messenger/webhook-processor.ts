import { Prisma } from "@prisma/client";

import { prisma } from "../db/prisma";
import { sha256Hex } from "../meta/signature";

export type MessengerWebhookProcessingResult = {
  accepted: number;
  duplicates: number;
};

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function isDuplicateKey(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export async function processMessengerWebhook(
  payload: unknown,
  rawBody: string,
): Promise<MessengerWebhookProcessingResult> {
  const eventKey = `messenger:${sha256Hex(rawBody)}`;

  try {
    await prisma.webhookEvent.create({
      data: {
        eventKey,
        eventType: "messenger.raw",
        payload: toJsonValue(payload),
        attemptCount: 1,
        processedAt: new Date(),
      },
    });
  } catch (error) {
    if (isDuplicateKey(error)) {
      return { accepted: 0, duplicates: 1 };
    }
    throw error;
  }

  return { accepted: 1, duplicates: 0 };
}
