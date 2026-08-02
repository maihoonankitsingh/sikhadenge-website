import {
  asNonEmptyStringBrand,
  type Brand,
} from "@/shared/types/brand";
import type { WorkspaceId } from "@/modules/workspaces/domain/workspace";

export type ChannelConnectionId = Brand<string, "ChannelConnectionId">;

export type ChannelType =
  | "WHATSAPP"
  | "INSTAGRAM"
  | "MESSENGER"
  | "FACEBOOK"
  | "TELEGRAM"
  | "LINKEDIN"
  | "X"
  | "YOUTUBE"
  | "GOOGLE_BUSINESS"
  | "THREADS";

export type ChannelCapability =
  | "WEBHOOK_VERIFY"
  | "INBOUND_MESSAGE"
  | "OUTBOUND_TEXT"
  | "OUTBOUND_MEDIA"
  | "DELIVERY_STATUS"
  | "READ_STATUS"
  | "COMMENT_EVENTS"
  | "PUBLIC_COMMENT_REPLY"
  | "PRIVATE_COMMENT_REPLY"
  | "STORY_REPLY"
  | "MENTION_EVENTS";

export type ChannelConnectionStatus =
  | "PENDING"
  | "CONNECTED"
  | "DEGRADED"
  | "EXPIRED"
  | "REVOKED"
  | "DISCONNECTED";

export type ChannelCapabilities = Readonly<
  Record<ChannelCapability, boolean>
>;

export type ChannelConnection = {
  id: ChannelConnectionId;
  workspaceId: WorkspaceId;
  channel: ChannelType;
  externalAccountId: string;
  displayName?: string;
  status: ChannelConnectionStatus;
  capabilities: ChannelCapabilities;
};

export function channelConnectionId(value: string): ChannelConnectionId {
  return asNonEmptyStringBrand<"ChannelConnectionId">(
    value,
    "channelConnectionId",
  );
}

export function supportsCapability(
  connection: Pick<ChannelConnection, "capabilities">,
  capability: ChannelCapability,
): boolean {
  return connection.capabilities[capability] === true;
}

export function emptyChannelCapabilities(): ChannelCapabilities {
  return {
    WEBHOOK_VERIFY: false,
    INBOUND_MESSAGE: false,
    OUTBOUND_TEXT: false,
    OUTBOUND_MEDIA: false,
    DELIVERY_STATUS: false,
    READ_STATUS: false,
    COMMENT_EVENTS: false,
    PUBLIC_COMMENT_REPLY: false,
    PRIVATE_COMMENT_REPLY: false,
    STORY_REPLY: false,
    MENTION_EVENTS: false,
  };
}
