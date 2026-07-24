import { KnowledgeStatus, LearningStatus, Prisma } from "@prisma/client";

import { prisma } from "../db/prisma";
import { knowledgeChecksum } from "../knowledge/text-processing";
import { normalizeLearningText, redactLearningText } from "./redaction";
import { validateProposedLearningAnswer } from "./policy";

function toJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

export async function listPendingLearningSuggestions(limit = 50) {
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  return prisma.learningSuggestion.findMany({
    where: { status: LearningStatus.PENDING },
    orderBy: { createdAt: "asc" },
    take: safeLimit,
    select: {
      id: true,
      category: true,
      userQuestion: true,
      originalAnswer: true,
      proposedAnswer: true,
      correctionReason: true,
      createdAt: true,
      sourceMessageId: true,
      redactedPayload: true,
    },
  });
}

export async function createLearningSuggestion(input: {
  category: string;
  userQuestion: string;
  proposedAnswer: string;
  originalAnswer?: string | null;
  correctionReason?: string | null;
  sourceMessageId?: string | null;
  actorId: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const category = normalizeLearningText(input.category, 100).toUpperCase();
  const questionResult = redactLearningText(input.userQuestion);
  const answerResult = redactLearningText(validateProposedLearningAnswer(input.proposedAnswer));
  const originalResult = input.originalAnswer
    ? redactLearningText(input.originalAnswer)
    : null;
  const reasonResult = input.correctionReason
    ? redactLearningText(input.correctionReason)
    : null;

  const userQuestion = normalizeLearningText(questionResult.text, 4_000);
  const proposedAnswer = normalizeLearningText(answerResult.text, 4_000);
  const originalAnswer = originalResult?.text
    ? normalizeLearningText(originalResult.text, 4_000)
    : null;
  const correctionReason = reasonResult?.text
    ? normalizeLearningText(reasonResult.text, 2_000)
    : null;

  return prisma.$transaction(async (transaction) => {
    if (input.sourceMessageId) {
      const source = await transaction.whatsAppMessage.findUnique({
        where: { id: input.sourceMessageId },
        select: { id: true },
      });
      if (!source) throw new Error("LEARNING_SOURCE_MESSAGE_NOT_FOUND");
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
    if (duplicate) return { suggestionId: duplicate.id, duplicate: true };

    const suggestion = await transaction.learningSuggestion.create({
      data: {
        sourceMessageId: input.sourceMessageId ?? null,
        category,
        userQuestion,
        originalAnswer,
        proposedAnswer,
        correctionReason,
        redactedPayload: toJson({
          createdById: input.actorId,
          redacted: {
            question: questionResult.categories,
            proposedAnswer: answerResult.categories,
            originalAnswer: originalResult?.categories ?? [],
            correctionReason: reasonResult?.categories ?? [],
          },
          rawContentStored: false,
        }),
      },
      select: {
        id: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    await transaction.auditLog.create({
      data: {
        actorId: input.actorId,
        action: "LEARNING_SUGGESTION_CREATED",
        entityType: "LearningSuggestion",
        entityId: suggestion.id,
        after: toJson({
          category,
          status: suggestion.status,
          sourceMessageId: input.sourceMessageId ?? null,
          rawContentStored: false,
        }),
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });

    return { suggestionId: suggestion.id, duplicate: false };
  });
}

export async function reviewLearningSuggestion(input: {
  suggestionId: string;
  reviewerId: string;
  decision: "APPROVE" | "REJECT";
  correctedAnswer?: string | null;
  reason?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  return prisma.$transaction(async (transaction) => {
    const suggestion = await transaction.learningSuggestion.findUnique({
      where: { id: input.suggestionId },
    });

    if (!suggestion) throw new Error("LEARNING_SUGGESTION_NOT_FOUND");
    if (suggestion.status !== LearningStatus.PENDING) {
      throw new Error("LEARNING_SUGGESTION_ALREADY_REVIEWED");
    }

    const reviewReason = input.reason
      ? normalizeLearningText(input.reason, 2_000)
      : null;

    if (input.decision === "REJECT") {
      const rejected = await transaction.learningSuggestion.update({
        where: { id: suggestion.id },
        data: {
          status: LearningStatus.REJECTED,
          reviewedById: input.reviewerId,
          reviewedAt: new Date(),
          correctionReason: reviewReason ?? suggestion.correctionReason,
        },
      });

      await transaction.auditLog.create({
        data: {
          actorId: input.reviewerId,
          action: "LEARNING_SUGGESTION_REJECTED",
          entityType: "LearningSuggestion",
          entityId: suggestion.id,
          before: toJson({ status: suggestion.status }),
          after: toJson({ status: rejected.status, reason: reviewReason }),
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });

      return { suggestion: rejected, knowledgeDocumentId: null, duplicateKnowledge: false };
    }

    const approvedAnswer = normalizeLearningText(
      redactLearningText(
        validateProposedLearningAnswer(
          input.correctedAnswer?.trim() || suggestion.proposedAnswer,
        ),
      ).text,
      4_000,
    );
    const checksum = knowledgeChecksum(`${suggestion.userQuestion}\n${approvedAnswer}`);

    const duplicateChunk = await transaction.knowledgeChunk.findFirst({
      where: {
        checksum,
        document: { status: KnowledgeStatus.APPROVED },
      },
      select: { documentId: true },
    });

    let knowledgeDocumentId = duplicateChunk?.documentId ?? null;
    let duplicateKnowledge = Boolean(duplicateChunk);

    if (!knowledgeDocumentId) {
      const title = `Reviewed learning: ${suggestion.category}`;
      const latest = await transaction.knowledgeDocument.findFirst({
        where: { title, category: suggestion.category },
        orderBy: { version: "desc" },
        select: { version: true },
      });

      await transaction.knowledgeDocument.updateMany({
        where: {
          title,
          category: suggestion.category,
          status: KnowledgeStatus.APPROVED,
        },
        data: { status: KnowledgeStatus.ARCHIVED },
      });

      const document = await transaction.knowledgeDocument.create({
        data: {
          title,
          category: suggestion.category,
          sourceType: "HUMAN_APPROVED_LEARNING",
          version: (latest?.version ?? 0) + 1,
          status: KnowledgeStatus.APPROVED,
          approvedAt: new Date(),
          chunks: {
            create: {
              heading: suggestion.userQuestion,
              content: approvedAnswer,
              checksum,
              metadata: toJson({
                learningSuggestionId: suggestion.id,
                correctionReason: reviewReason ?? suggestion.correctionReason,
                reviewerId: input.reviewerId,
                rawContentStored: false,
              }),
            },
          },
        },
        select: { id: true },
      });
      knowledgeDocumentId = document.id;
      duplicateKnowledge = false;
    }

    const merged = await transaction.learningSuggestion.update({
      where: { id: suggestion.id },
      data: {
        status: LearningStatus.MERGED,
        proposedAnswer: approvedAnswer,
        correctionReason: reviewReason ?? suggestion.correctionReason,
        reviewedById: input.reviewerId,
        reviewedAt: new Date(),
      },
    });

    await transaction.auditLog.create({
      data: {
        actorId: input.reviewerId,
        action: "LEARNING_SUGGESTION_APPROVED",
        entityType: "LearningSuggestion",
        entityId: suggestion.id,
        before: toJson({ status: suggestion.status }),
        after: toJson({
          status: merged.status,
          knowledgeDocumentId,
          duplicateKnowledge,
          rawContentStored: false,
        }),
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });

    return { suggestion: merged, knowledgeDocumentId, duplicateKnowledge };
  });
}
