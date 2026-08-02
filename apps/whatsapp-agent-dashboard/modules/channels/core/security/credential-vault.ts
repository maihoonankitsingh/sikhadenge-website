import type {
  ChannelConnectionId,
  ChannelType,
} from "@/modules/channels/core/contracts/channel";
import type { WorkspaceId } from "@/modules/workspaces/domain/workspace";

export type CredentialKind =
  | "ACCESS_TOKEN"
  | "REFRESH_TOKEN"
  | "APP_SECRET"
  | "WEBHOOK_SECRET"
  | "API_KEY";

export type EncryptedCredentialPayload = {
  algorithm: "AES_256_GCM";
  keyVersion: string;
  initializationVector: string;
  authenticationTag: string;
  ciphertext: string;
};

export type ConnectionCredentialRecord = {
  id: string;
  workspaceId: WorkspaceId;
  connectionId: ChannelConnectionId;
  channel: ChannelType;
  kind: CredentialKind;
  encrypted: EncryptedCredentialPayload;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ConnectionCredentialPublicView = {
  id: string;
  connectionId: ChannelConnectionId;
  channel: ChannelType;
  kind: CredentialKind;
  keyVersion: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  configured: true;
};

export function toCredentialPublicView(
  credential: ConnectionCredentialRecord,
): ConnectionCredentialPublicView {
  return {
    id: credential.id,
    connectionId: credential.connectionId,
    channel: credential.channel,
    kind: credential.kind,
    keyVersion: credential.encrypted.keyVersion,
    ...(credential.expiresAt
      ? { expiresAt: credential.expiresAt.toISOString() }
      : {}),
    createdAt: credential.createdAt.toISOString(),
    updatedAt: credential.updatedAt.toISOString(),
    configured: true,
  };
}

export function containsUsableCredentialMaterial(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;

  const serialized = JSON.stringify(value).toLowerCase();
  return [
    "ciphertext",
    "authenticationtag",
    "initializationvector",
    "access_token",
    "refresh_token",
    "app_secret",
    "webhook_secret",
    "api_key",
  ].some((field) => serialized.includes(`\"${field}\"`));
}
