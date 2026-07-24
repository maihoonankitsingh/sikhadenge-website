import { DashboardRole, MessageActor } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentDashboardUser } from "../../../../../lib/auth/session";
import { queueOutboundMessage } from "../../../../../lib/outbound/outbound-service";
import type { OutboundContent } from "../../../../../lib/outbound/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ROLES = new Set<DashboardRole>([
  DashboardRole.ADMIN,
  DashboardRole.MANAGER,
  DashboardRole.COUNSELOR,
]);

type SendPayload = {
  kind?: unknown;
  text?: unknown;
  templateId?: unknown;
  components?: unknown;
  replyToMetaMessageId?: unknown;
  idempotencyKey?: unknown;
};

export async function POST(
  request: Request,
  context: { params: { conversationId: string } },
) {
  const user = await getCurrentDashboardUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!ALLOWED_ROLES.has(user.role)) {
    return NextResponse.json({ error: "Insufficient permission." }, { status: 403 });
  }

  let payload: SendPayload;
  try {
    payload = (await request.json()) as SendPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const kind = typeof payload.kind === "string" ? payload.kind.toLowerCase() : "";
  const idempotencyKey =
    typeof payload.idempotencyKey === "string"
      ? payload.idempotencyKey.trim()
      : "";
  if (!idempotencyKey || idempotencyKey.length > 200) {
    return NextResponse.json(
      { error: "A 1-200 character idempotencyKey is required." },
      { status: 400 },
    );
  }

  let content: OutboundContent;
  if (kind === "text") {
    const text = typeof payload.text === "string" ? payload.text.trim() : "";
    if (!text || text.length > 4_096) {
      return NextResponse.json(
        { error: "Text must contain 1-4,096 characters." },
        { status: 400 },
      );
    }
    content = {
      kind: "text",
      text,
      replyToMetaMessageId:
        typeof payload.replyToMetaMessageId === "string"
          ? payload.replyToMetaMessageId.trim().slice(0, 300) || null
          : null,
    };
  } else if (kind === "template") {
    const templateId =
      typeof payload.templateId === "string" ? payload.templateId.trim() : "";
    if (!templateId) {
      return NextResponse.json(
        { error: "templateId is required for template messages." },
        { status: 400 },
      );
    }
    content = {
      kind: "template",
      templateId,
      components: Array.isArray(payload.components) ? payload.components : [],
    };
  } else {
    return NextResponse.json(
      { error: "kind must be text or template." },
      { status: 400 },
    );
  }

  try {
    const result = await queueOutboundMessage({
      conversationId: context.params.conversationId,
      actor: MessageActor.COUNSELOR,
      sentById: user.id,
      content,
      idempotencyKey,
    });

    return NextResponse.json(result, {
      status: result.duplicate ? 200 : 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Queueing failed.";
    const status = detail.includes("not found") ? 404 : 422;
    return NextResponse.json({ error: detail, outboundSent: false }, { status });
  }
}
