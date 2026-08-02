import type {
  WorkspaceActorId,
  WorkspaceId,
} from "@/modules/workspaces/domain/workspace";

export type SecurityAuditAction =
  | "AUTHORIZATION_DENIED"
  | "OUTBOUND_BLOCKED"
  | "CREDENTIAL_VIEWED"
  | "KILL_SWITCH_ACTIVATED"
  | "KILL_SWITCH_DEACTIVATED"
  | "CONSENT_CHANGED"
  | "SUPPRESSION_CHANGED"
  | "WEBHOOK_REJECTED";

export type SecurityAuditOutcome = "SUCCESS" | "DENIED" | "FAILED";

export type SecurityAuditEvent = Readonly<{
  id: string;
  workspaceId: WorkspaceId;
  actorId?: WorkspaceActorId;
  action: SecurityAuditAction;
  outcome: SecurityAuditOutcome;
  entityType: string;
  entityId?: string;
  reasonCode?: string;
  requestId?: string;
  correlationId?: string;
  metadata?: Readonly<Record<string, string | number | boolean | null>>;
  occurredAt: Date;
}>;

const FORBIDDEN_METADATA_KEYS = [
  "token",
  "secret",
  "password",
  "authorization",
  "ciphertext",
  "rawpayload",
];

export function createSecurityAuditEvent(
  event: SecurityAuditEvent,
): SecurityAuditEvent {
  if (!event.id.trim()) throw new Error("audit event id is required.");
  if (!event.entityType.trim()) throw new Error("entityType is required.");
  if (Number.isNaN(event.occurredAt.getTime())) {
    throw new Error("occurredAt must be a valid date.");
  }

  for (const key of Object.keys(event.metadata ?? {})) {
    if (FORBIDDEN_METADATA_KEYS.includes(key.toLowerCase())) {
      throw new Error(`Sensitive audit metadata key is not allowed: ${key}.`);
    }
  }

  return Object.freeze({
    ...event,
    metadata: event.metadata
      ? Object.freeze({ ...event.metadata })
      : undefined,
  });
}
