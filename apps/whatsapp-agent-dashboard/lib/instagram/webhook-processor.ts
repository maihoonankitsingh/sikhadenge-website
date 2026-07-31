import { Prisma } from "@prisma/client";

import { prisma } from "../db/prisma";
import { sha256Hex } from "../meta/signature";

export type InstagramWebhookProcessingResult = {
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

export async function processInstagramWebhook(
  payload: unknown,
  rawBody: string,
): Promise<InstagramWebhookProcessingResult> {
  const eventKey = `instagram:${sha256Hex(rawBody)}`;

  try {
    await prisma.webhookEvent.create({
      data: {
        eventKey,
        eventType: "instagram.raw",
        payload: toJsonValue(payload),
        attemptCount: 1,
      },
    });

    return { accepted: 1, duplicates: 0 };
  } catch (error) {
    if (isDuplicateKey(error)) {
      return { accepted: 0, duplicates: 1 };
    }
    throw error;
  }
}
