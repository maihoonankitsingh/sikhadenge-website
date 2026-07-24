import { KnowledgeStatus } from "@prisma/client";

import { prisma } from "../db/prisma";
import { getAgentPolicy } from "./policy";
import type { AgentKnowledgeReference } from "./types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "what",
  "when",
  "which",
  "with",
  "you",
  "your",
  "hai",
  "hain",
  "ka",
  "ke",
  "ki",
  "kya",
  "ko",
  "main",
  "mai",
  "mujhe",
  "aur",
  "se",
  "ye",
  "है",
  "का",
  "के",
  "की",
  "क्या",
  "को",
  "और",
  "से",
  "यह",
]);

function tokenize(value: string): string[] {
  return Array.from(
    new Set(
      value
        .toLocaleLowerCase("en-IN")
        .match(/[\p{L}\p{N}]+/gu)
        ?.filter((token) => token.length > 1 && !STOP_WORDS.has(token)) ?? [],
    ),
  );
}

function lexicalScore(queryTokens: string[], value: string): number {
  if (queryTokens.length === 0) return 0;
  const normalized = value.toLocaleLowerCase("en-IN");
  let matched = 0;
  let weighted = 0;

  for (const token of queryTokens) {
    if (!normalized.includes(token)) continue;
    matched += 1;
    weighted += token.length >= 7 ? 1.25 : token.length >= 4 ? 1 : 0.75;
  }

  const coverage = matched / queryTokens.length;
  const density = Math.min(1, weighted / Math.max(4, queryTokens.length));
  return Math.min(1, coverage * 0.72 + density * 0.28);
}

export async function retrieveApprovedKnowledge(
  query: string,
): Promise<AgentKnowledgeReference[]> {
  const policy = getAgentPolicy();
  const queryTokens = tokenize(query).slice(0, 24);
  if (queryTokens.length === 0) return [];

  const now = new Date();
  const chunks = await prisma.knowledgeChunk.findMany({
    where: {
      document: {
        status: KnowledgeStatus.APPROVED,
        AND: [
          {
            OR: [{ effectiveFrom: null }, { effectiveFrom: { lte: now } }],
          },
          {
            OR: [{ effectiveTo: null }, { effectiveTo: { gt: now } }],
          },
        ],
      },
    },
    select: {
      id: true,
      heading: true,
      content: true,
      document: {
        select: {
          id: true,
          title: true,
          category: true,
          version: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 400,
  });

  return chunks
    .map((chunk) => {
      const titleScore = lexicalScore(queryTokens, chunk.document.title);
      const headingScore = lexicalScore(queryTokens, chunk.heading ?? "");
      const contentScore = lexicalScore(queryTokens, chunk.content);
      const score = Math.min(
        1,
        titleScore * 0.22 + headingScore * 0.28 + contentScore * 0.5,
      );

      return {
        chunkId: chunk.id,
        documentId: chunk.document.id,
        title: chunk.document.title,
        heading: chunk.heading,
        content: chunk.content,
        score: Number(score.toFixed(4)),
      } satisfies AgentKnowledgeReference;
    })
    .filter((reference) => reference.score >= policy.knowledgeMinimumScore)
    .sort((left, right) => right.score - left.score)
    .slice(0, policy.maximumKnowledgeChunks);
}
