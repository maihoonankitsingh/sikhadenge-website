import { createHash } from "node:crypto";
import { KnowledgeStatus, LearningStatus } from "@prisma/client";

import { prisma } from "../db/prisma";

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
    },
  });
}

export async function reviewLearningSuggestion(input: {
  suggestionId: string;
  reviewerId: string;
  decision: "APPROVE" | "REJECT";
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  return prisma.$transaction(async (transaction) => {
    const suggestion = await transaction.learningSuggestion.findUnique({
      where: { id: input.suggestionId },
    });

    if (!suggestion) {
      throw new Error("LEARNING_SUGGESTION_NOT_FOUND");
    }

    if (suggestion.status !== LearningStatus.PENDING) {
      throw new Error("LEARNING_SUGGESTION_ALREADY_REVIEWED");
    }

    if (input.decision === "REJECT") {
      const rejected = await transaction.learningSuggestion.update({
        where: { id: suggestion.id },
        data: {
          status: LearningStatus.REJECTED,
          reviewedById: input.reviewerId,
          reviewedAt: new Date(),
        },
      });

      await transaction.auditLog.create({
        data: {
          actorId: input.reviewerId,
          action: "LEARNING_SUGGESTION_REJECTED",
          entityType: "LearningSuggestion",
          entityId: suggestion.id,
          before: { status: suggestion.status },
          after: { status: rejected.status },
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        },
      });

      return { suggestion: rejected, knowledgeDocumentId: null };
    }

    const checksum = createHash("sha256")
      .update(`${suggestion.userQuestion}\n${suggestion.proposedAnswer}`)
      .digest("hex");

    const document = await transaction.knowledgeDocument.create({
      data: {
        title: `Approved learned response: ${suggestion.userQuestion.slice(0, 80)}`,
        category: suggestion.category,
        sourceType: "HUMAN_APPROVED_LEARNING",
        status: KnowledgeStatus.APPROVED,
        approvedAt: new Date(),
        chunks: {
          create: {
            heading: suggestion.userQuestion,
            content: suggestion.proposedAnswer,
            checksum,
            metadata: {
              learningSuggestionId: suggestion.id,
              correctionReason: suggestion.correctionReason,
            },
          },
        },
      },
    });

    const merged = await transaction.learningSuggestion.update({
      where: { id: suggestion.id },
      data: {
        status: LearningStatus.MERGED,
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
        before: { status: suggestion.status },
        after: {
          status: merged.status,
          knowledgeDocumentId: document.id,
        },
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });

    return { suggestion: merged, knowledgeDocumentId: document.id };
  });
}
