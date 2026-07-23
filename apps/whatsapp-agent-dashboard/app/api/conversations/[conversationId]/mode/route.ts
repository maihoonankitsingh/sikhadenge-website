import { AgentMode, DashboardRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../../../lib/auth/session";
import { prisma } from "../../../../../lib/db/prisma";

export const runtime = "nodejs";

const ALLOWED_ROLES = new Set<DashboardRole>([
  DashboardRole.ADMIN,
  DashboardRole.MANAGER,
  DashboardRole.COUNSELOR,
]);

function getRequestIp(request: Request): string | null {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")
  );
}

export async function POST(
  request: Request,
  context: { params: { conversationId: string } },
) {
  const user = await getCurrentDashboardUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!ALLOWED_ROLES.has(user.role)) {
    return NextResponse.json({ error: "Insufficient permission." }, { status: 403 });
  }

  let payload: { mode?: unknown; reason?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const mode = typeof payload.mode === "string" ? payload.mode.toUpperCase() : "";
  if (![AgentMode.AI, AgentMode.HUMAN, AgentMode.PAUSED].includes(mode as AgentMode)) {
    return NextResponse.json({ error: "Unsupported conversation mode." }, { status: 400 });
  }

  const reason =
    typeof payload.reason === "string" && payload.reason.trim()
      ? payload.reason.trim().slice(0, 500)
      : null;

  const existing = await prisma.whatsAppConversation.findUnique({
    where: { id: context.params.conversationId },
    select: { id: true, agentMode: true, assignedToId: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  const nextMode = mode as AgentMode;
  const updated = await prisma.$transaction(async (transaction) => {
    const conversation = await transaction.whatsAppConversation.update({
      where: { id: existing.id },
      data: {
        agentMode: nextMode,
        assignedToId:
          nextMode === AgentMode.HUMAN && !existing.assignedToId
            ? user.id
            : existing.assignedToId,
        humanTakeoverAt: nextMode === AgentMode.HUMAN ? new Date() : null,
        humanTakeoverReason: nextMode === AgentMode.HUMAN ? reason : null,
      },
      select: {
        id: true,
        agentMode: true,
        assignedToId: true,
        humanTakeoverAt: true,
        humanTakeoverReason: true,
      },
    });

    await transaction.auditLog.create({
      data: {
        actorId: user.id,
        action: "CONVERSATION_MODE_CHANGED",
        entityType: "WhatsAppConversation",
        entityId: existing.id,
        before: { agentMode: existing.agentMode, assignedToId: existing.assignedToId },
        after: {
          agentMode: conversation.agentMode,
          assignedToId: conversation.assignedToId,
          reason,
        },
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get("user-agent"),
      },
    });

    return conversation;
  });

  return NextResponse.json(
    { conversation: updated },
    { headers: { "Cache-Control": "no-store" } },
  );
}
