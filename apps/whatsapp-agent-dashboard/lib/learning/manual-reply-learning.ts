import {
  LearningStatus,
  MessageActor,
  MessageDirection,
  MessageType,
  Prisma,
} from "@prisma/client";

import { prisma } from "../db/prisma";
import { validateProposedLearningAnswer } from "./policy";
import { normalizeLearningText, redactLearningText } from "./redaction";

const NON_LEARNING_INTENTS = new Set([
  "GREETING",
  "OPT_OUT",
  "COUNSELOR_REQUEST",
  "PAYMENT_SUPPORT",
  "REFUND_OR_COMPLAINT",
]);

const LOW_VALUE_TEXT = /^(?:hi+|hello+|hey+|namaste|good\s+(?:morning|afternoon|evening)|ok+|okay|thanks?|thank\s+you|welcome|done|yes|no|haan|han|ji|hmm+|call\s+me)$/iu;

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function normalizeIntent(intent: string | null): string {
  return (intent ?? "").trim().replace(/\s+/g, " ").slice(0, 100).toUpperCase();
}

function categoryFromIntent(intent: string | null): string {
  const normalized = normalizeIntent(intent);
  if (!normalized || normalized === "UNKNOWN") return "MANUAL_COUNSELOR_REPLY";
  return normalized;
}

export type ManualReplyLearningResult =
  | {
      captured: true;
      suggestionId: string;
      duplicate: boolean;
      updatedExisting: boolean;
    }
  | {
      captured: false;
      reason:
        | "OUTBOUND_MESSAGE_NOT_ELIGIBLE"
        | "NO_INBOUND_QUESTION"
        | "LOW_VALUE_EXCHANGE"
        | "NON_LEARNING_INTENT";
    };

/**
 * Pairs a counselor's manual text reply with the latest inbound customer text.
 * The pair is saved as a PENDING learning suggestion only. It never becomes
 * active knowledge until an ADMIN or MANAGER reviews and approves it.
 */
export async function captureManualReplyLearningCandidate(input: {
  conversationId: string;
  outboundMessageId: string;
  actorId: string;
}): Promise<ManualReplyLearningResult> {
  const outbound = await prisma.whatsAppMessage.findFirst({
    where: {
      id: input.outboundMessageId,
      conversationId: input.conversationId,
      direction: MessageDirection.OUTBOUND,
      actor: MessageActor.COUNSELOR,
      type: MessageType.TEXT,
    },
    select: {
      id: true,
      text: true,
      messageTimestamp: true,
      conversation: { select: { currentIntent: true } },
    },
  });

  const rawAnswer = outbound?.text?.trim() ?? "";
  if (!outbound || rawAnswer.length < 10 || LOW_VALUE_TEXT.test(rawAnswer)) {
    return { captured: false, reason: "OUTBOUND_MESSAGE_NOT_ELIGIBLE" };
  }

  const inbound = await prisma.whatsAppMessage.findFirst({
    where: {
      conversationId: input.conversationId,
      direction: MessageDirection.INBOUND,
      actor: MessageActor.CUSTOMER,
      type: MessageType.TEXT,
      text: { not: null },
      messageTimestamp: { lte: outbound.messageTimestamp },
    },
    orderBy: [{ messageTimestamp: "desc" }, { createdAt: "desc" }],
    select: { id: true, text: true },
  });

  const rawQuestion = inbound?.text?.trim() ?? "";
  if (!inbound || !rawQuestion) {
    return { captured: false, reason: "NO_INBOUND_QUESTION" };
  }

  if (LOW_VALUE_TEXT.test(rawQuestion)) {
    return { captured: false, reason: "LOW_VALUE_EXCHANGE" };
  }

  const normalizedIntent = normalizeIntent(outbound.conversation.currentIntent);
  if (NON_LEARNING_INTENTS.has(normalizedIntent)) {
    return { captured: false, reason: "NON_LEARNING_INTENT" };
  }

  const questionResult = redactLearningText(rawQuestion);
  const answerResult = redactLearningText(validateProposedLearningAnswer(rawAnswer));
  const userQuestion = normalizeLearningText(questionResult.text, 4_000);
  const proposedAnswer = normalizeLearningText(answerResult.text, 4_000);

  if (userQuestion.length < 3) {
    return { captured: false, reason: "LOW_VALUE_EXCHANGE" };
  }

  const category = categoryFromIntent(outbound.conversation.currentIntent);
  const correctionReason =
    "Captured from a manual counselor reply. Review or edit before the agent can use it.";

  return prisma.$transaction(async (transaction) => {
    const existingForQuestion = await transaction.learningSuggestion.findFirst({
      where: {
        sourceMessageId: inbound.id,
        status: LearningStatus.PENDING,
      },
      orderBy: { createdAt: "desc" },
    });

    if (existingForQuestion) {
      const updated = await transaction.learningSuggestion.update({
        where: { id: existingForQuestion.id },
        data: {
          category,
          userQuestion,
          proposedAnswer,
          correctionReason,
          redactedPayload: toJson({
            autoCaptured: false,
            manualReplyCaptured: true,
            outboundMessageId: outbound.id,
            createdById: input.actorId,
            detectedIntent: normalizedIntent || null,
            replacedPendingCandidate: true,
            requiresHumanReview: true,
            redacted: {
              question: questionResult.categories,
              proposedAnswer: answerResult.categories,
            },
            rawContentStored: false,
          }),
        },
        select: { id: true },
      });

      await transaction.auditLog.create({
        data: {
          actorId: input.actorId,
          action: "LEARNING_SUGGESTION_ENRICHED_FROM_MANUAL_REPLY",
          entityType: "LearningSuggestion",
          entityId: updated.id,
          after: toJson({
            category,
            sourceMessageId: inbound.id,
            outboundMessageId: outbound.id,
            requiresHumanReview: true,
            rawContentStored: false,
          }),
        },
      });

      return {
        captured: true,
        suggestionId: updated.id,
        duplicate: false,
        updatedExisting: true,
      };
    }

    const duplicate = await transaction.learningSuggestion.findFirst({
      where: {
        status: LearningStatus.PENDING,
        category,
        userQuestion,
        proposedAnswer,
      },
      select: { id: true },
    });

    if (duplicate) {
      return {
        captured: true,
        suggestionId: duplicate.id,
        duplicate: true,
        updatedExisting: false,
      };
    }

    const suggestion = await transaction.learningSuggestion.create({
      data: {
        sourceMessageId: inbound.id,
        category,
        userQuestion,
        originalAnswer: null,
        proposedAnswer,
        correctionReason,
        redactedPayload: toJson({
          autoCaptured: false,
          manualReplyCaptured: true,
          outboundMessageId: outbound.id,
          createdById: input.actorId,
          detectedIntent: normalizedIntent || null,
          requiresHumanReview: true,
          redacted: {
            question: questionResult.categories,
            proposedAnswer: answerResult.categories,
          },
          rawContentStored: false,
        }),
      },
      select: { id: true },
    });

    await transaction.auditLog.create({
      data: {
        actorId: input.actorId,
        action: "LEARNING_SUGGESTION_CAPTURED_FROM_MANUAL_REPLY",
        entityType: "LearningSuggestion",
        entityId: suggestion.id,
        after: toJson({
          category,
          sourceMessageId: inbound.id,
          outboundMessageId: outbound.id,
          requiresHumanReview: true,
          rawContentStored: false,
        }),
      },
    });

    return {
      captured: true,
      suggestionId: suggestion.id,
      duplicate: false,
      updatedExisting: false,
    };
  });
}
