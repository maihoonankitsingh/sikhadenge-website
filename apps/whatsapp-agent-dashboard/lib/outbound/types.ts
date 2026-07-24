import type { MessageActor, MessageType } from "@prisma/client";

export type OutboundMode = "disabled" | "dry_run" | "live";

export type OutboundTextRequest = {
  kind: "text";
  text: string;
  replyToMetaMessageId?: string | null;
};

export type OutboundTemplateRequest = {
  kind: "template";
  templateId: string;
  components?: unknown[];
};

export type OutboundContent = OutboundTextRequest | OutboundTemplateRequest;

export type QueueOutboundInput = {
  conversationId: string;
  actor: MessageActor;
  sentById?: string | null;
  content: OutboundContent;
  idempotencyKey: string;
  now?: Date;
};

export type OutboundPolicyDecision = {
  allowed: boolean;
  reason: string | null;
  messageType: MessageType;
  serviceWindowOpen: boolean;
};

export type PreparedMetaMessage = {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "text" | "template";
  text?: {
    preview_url: boolean;
    body: string;
  };
  template?: {
    name: string;
    language: { code: string };
    components?: unknown[];
  };
  context?: {
    message_id: string;
  };
};

export type DispatchResult = {
  messageId: string;
  mode: OutboundMode;
  outboundSent: boolean;
  metaMessageId: string | null;
  status: "QUEUED" | "SENT" | "FAILED";
  retriable: boolean;
  reason: string | null;
  preparedPayload?: PreparedMetaMessage;
};
