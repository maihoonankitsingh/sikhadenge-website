# Phase 2 Security Persistence and Guard Integration

## Status

This change converts the Phase 2 security contracts into additive persistence and feature-flagged runtime integration.

It does not activate the new controls in production. All persisted runtime flags default to `false`, and the environment master switch is also required before any new authorization, outbound-policy, or replay behavior can run.

## Additive Prisma models

The migration adds only new `Engage*` tables:

```text
EngageWorkspace
EngageWorkspaceMembership
EngagePermissionGrant
EngageChannelConnection
EngageConnectionCredential
EngageCustomerConsentEvent
EngageCustomerSuppression
EngageKillSwitch
EngageWebhookReplayRecord
EngageSecurityAuditEvent
EngageFeatureFlag
```

Existing WhatsApp contacts, conversations, messages, templates, webhook events, users, sessions, leads, knowledge, learning, and audit tables are not renamed, altered, or dropped.

## Default workspace and membership backfill

The migration creates one internal workspace:

```text
id: engagews_default
slug: sikhadenge-default
name: SikhaDenge
```

Every existing `DashboardUser` receives one membership in that workspace. The persisted role is copied from the existing `DashboardRole` value, and active state is copied from `DashboardUser.isActive`.

This preserves current access semantics during the feature-flagged transition.

## Feature flags

The migration creates these disabled workspace flags:

```text
engageos.route_permissions = false
engageos.outbound_policy = false
engageos.webhook_replay = false
```

The application also requires:

```text
ENGAGEOS_SECURITY_PERSISTENCE_ENABLED=true
```

Effective activation therefore requires both the environment master switch and the relevant workspace database flag.

### Activation matrix

| Environment master | Database flag | Result |
|---|---:|---|
| false or absent | false | legacy behavior |
| false or absent | true | legacy behavior |
| true | false | legacy behavior with persisted context available |
| true | true | EngageOS control enforced |

## Persisted route authorization

The manual conversation-send route resolves the current user's active workspace membership when the master switch is enabled.

When `engageos.route_permissions` is false, the route retains the existing `DashboardRole` allowlist.

When the flag is true, the route requires the persisted `inbox.reply` permission and fails closed for:

- missing membership
- inactive membership
- workspace mismatch
- actor mismatch
- unsupported persisted role
- missing permission

Explicit `EngagePermissionGrant` records may add permissions to a membership; they do not silently remove permissions defined by the role matrix.

## Persisted outbound policy

The manual send route calls the persisted policy adapter before any external send or queue action when `engageos.outbound_policy` is true.

The adapter loads:

- active channel connection and capabilities
- latest matching consent events
- legacy WhatsApp marketing consent fallback
- active customer/channel/connection suppressions
- active workspace/channel/connection kill switches

Enforcement order remains:

```text
workspace and actor
  -> inbox.reply permission
  -> connected channel capability
  -> consent and suppression
  -> OUTBOUND_NEW kill switch
  -> queue/send
```

Manual text and media are treated as `SERVICE`. Templates with category `MARKETING` require affirmative marketing consent; other template categories are treated as `TRANSACTIONAL`.

No connection row is created automatically by the migration. This avoids falsely representing a platform account as verified or connected. Enabling outbound policy before a verified connection is configured fails closed.

## Webhook replay persistence

WhatsApp, Instagram, and Messenger webhook routes reserve a replay record only when `engageos.webhook_replay` is enabled for a verified active connection.

The replay key is connection-scoped and currently uses a deterministic SHA-256 digest of the exact raw request body when no provider event ID is supplied.

Semantics:

- first payload reserves the replay key
- duplicate payload returns HTTP 200 with `duplicate: true`
- successful processing retains the reservation until expiry
- failed processing releases the reservation so the provider retry can run
- database or replay-service failure returns HTTP 503 only when replay enforcement is active
- disabled flags preserve the previous webhook path

Default retention is 24 hours. A later maintenance job must delete expired replay rows.

## Credential persistence boundary

`EngageConnectionCredential` stores only encrypted envelope fields:

```text
algorithm
keyVersion
initializationVector
authenticationTag
ciphertext
expiresAt
```

This migration does not copy or decrypt existing production credentials. A separate credential-bootstrap and rotation procedure is required before credential persistence is activated.

## Migration regression CI

The GitHub Actions migration job tests the real additive upgrade path:

```text
pull-request base schema
  -> empty PostgreSQL 16 database
  -> legacy seed
  -> committed prisma migrate deploy
  -> prisma migrate status
  -> security persistence integration tests
```

The integration test verifies:

- default workspace creation
- user membership backfill
- flags default disabled
- legacy and persisted authorization modes
- verified channel connection policy loading
- service and marketing consent decisions
- suppression blocking
- kill-switch blocking
- replay duplicate detection and retry release

## Production migration prerequisites

Before `prisma migrate deploy` on production:

1. capture exact Git SHA
2. create and verify a PostgreSQL backup identifier
3. verify migration history and current database reachability
4. run migration on a recent database copy
5. verify row counts for `DashboardUser` and backfilled memberships
6. keep `ENGAGEOS_SECURITY_PERSISTENCE_ENABLED` absent or false
7. verify all three database flags remain false
8. deploy code and run normal smoke tests
9. activate one flag at a time in a separate change window

## Rollback

Application rollback is the primary rollback mechanism.

Because all new tables are additive, rolling application code back does not require dropping the tables. The environment master switch should be disabled first.

Do not drop `Engage*` tables after they begin receiving consent, suppression, replay, audit, or credential data. Physical schema removal requires a later destructive-migration approval and data-retention review.

## Current limitations

- only the manual conversation send route uses persisted route/outbound enforcement
- AI, automation, campaign, and queued outbound workers still require integration
- verified channel connections must be created through a controlled bootstrap process
- encrypted credentials are not migrated
- replay cleanup is not scheduled yet
- no security administration UI is active

These limitations keep the migration bounded and preserve existing production behavior until each control is independently activated and verified.
