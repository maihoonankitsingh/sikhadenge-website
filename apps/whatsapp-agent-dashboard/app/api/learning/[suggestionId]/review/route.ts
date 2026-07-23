import { DashboardRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../../../lib/auth/session";
import { reviewLearningSuggestion } from "../../../../../lib/learning/learning-repository";

export const runtime = "nodejs";

const REVIEW_ROLES = new Set<DashboardRole>([
  DashboardRole.ADMIN,
  DashboardRole.MANAGER,
]);

function getRequestIp(request: Request): string | null {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")
  );
}

export async function POST(
  request: Request,
  context: { params: { suggestionId: string } },
) {
  const user = await getCurrentDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!REVIEW_ROLES.has(user.role)) {
    return NextResponse.json({ error: "Insufficient permission." }, { status: 403 });
  }

  let payload: { decision?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const decision =
    typeof payload.decision === "string" ? payload.decision.toUpperCase() : "";

  if (decision !== "APPROVE" && decision !== "REJECT") {
    return NextResponse.json({ error: "Decision must be APPROVE or REJECT." }, { status: 400 });
  }

  try {
    const result = await reviewLearningSuggestion({
      suggestionId: context.params.suggestionId,
      reviewerId: user.id,
      decision,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json(
      { result },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";

    if (code === "LEARNING_SUGGESTION_NOT_FOUND") {
      return NextResponse.json({ error: "Suggestion not found." }, { status: 404 });
    }

    if (code === "LEARNING_SUGGESTION_ALREADY_REVIEWED") {
      return NextResponse.json({ error: "Suggestion was already reviewed." }, { status: 409 });
    }

    throw error;
  }
}
