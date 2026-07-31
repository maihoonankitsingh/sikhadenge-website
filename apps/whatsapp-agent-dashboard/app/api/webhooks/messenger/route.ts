import { NextResponse } from "next/server";

import { processSocialWebhookAgentBridge } from "../../../../lib/agent/social-webhook-agent-bridge";
import { processMessengerWebhook } from "../../../../lib/messenger/webhook-processor";
import {
  getMessengerAppSecret,
  getMessengerVerifyToken,
  getMessengerWebhookMaxBytes,
} from "../../../../lib/meta/config";
import { verifyMetaSignature } from "../../../../lib/meta/signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  let expectedToken: string;
  try {
    expectedToken = getMessengerVerifyToken();
  } catch {
    return NextResponse.json(
      { error: "Messenger webhook verification is not configured." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }

  if (mode !== "subscribe" || !challenge || token !== expectedToken) {
    return NextResponse.json(
      { error: "Messenger webhook verification failed." },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }

  return new NextResponse(challenge, {
    status: 200,
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > getMessengerWebhookMaxBytes()) {
    return NextResponse.json(
      { error: "Messenger webhook payload is too large." },
      { status: 413, headers: NO_STORE_HEADERS },
    );
  }

  let appSecret: string;
  try {
    appSecret = getMessengerAppSecret();
  } catch {
    return NextResponse.json(
      { error: "Messenger webhook signature verification is not configured." },
      { status: 503, headers: NO_STORE_HEADERS },
    );
  }

  if (
    !verifyMetaSignature({
      rawBody,
      signatureHeader: request.headers.get("x-hub-signature-256"),
      appSecret,
    })
  ) {
    return NextResponse.json(
      { error: "Invalid Messenger webhook signature." },
      { status: 401, headers: NO_STORE_HEADERS },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { error: "Messenger webhook payload is not valid JSON." },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  try {
    const result = await processMessengerWebhook(payload, rawBody);

    let agent: Awaited<ReturnType<typeof processSocialWebhookAgentBridge>> | null = null;
    try {
      agent = await processSocialWebhookAgentBridge({
        payload,
        channel: "messenger",
      });
    } catch {
      agent = {
        matched: 0,
        analyzed: 0,
        queued: 0,
        sent: 0,
        handoffs: 0,
        skipped: 0,
        failed: 1,
      };
    }

    return NextResponse.json(
      { received: true, ...result, agent },
      { status: 200, headers: NO_STORE_HEADERS },
    );
  } catch {
    return NextResponse.json(
      { error: "Messenger webhook processing failed and can be retried." },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
