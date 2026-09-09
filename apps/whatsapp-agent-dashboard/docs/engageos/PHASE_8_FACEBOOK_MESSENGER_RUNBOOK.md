# Phase 8 — Facebook Page Comments + Messenger Runbook

## Repository scope

Phase 8 extends the existing Messenger DM implementation with Page-comment normalization, deterministic targeting rules, guarded public comment reply contracts, and stricter Messenger response-window policy. Existing Messenger inbound message, delivery, read and echo processing remains the compatibility runtime.

## Safety defaults

- `FACEBOOK_PAGE_COMMENT_AUTOMATION_ENABLED=false`
- `FACEBOOK_PAGE_COMMENT_ACTION_MODE=disabled`
- `FACEBOOK_PAGE_COMMENT_ACTION_KILL_SWITCH=on`
- `MESSENGER_OUTBOUND_MODE=disabled`
- `AUTOMATION_ACTIONS_ENABLED=false`
- `INTEGRATION_EXTERNAL_WRITES_ENABLED=false`

No repository commit activates production writes.

## Messenger requirements

The official Messenger Send API requires a Page access token with messaging permissions and the recipient must be within the standard messaging response window unless a separately approved messaging path applies. This implementation fails closed when Page isolation, messaging capability, or the response window cannot be verified.

## Page comment behavior

Page comment webhook normalization accepts Page `feed`/`comments` changes that represent comment activity. Public replies are planned against the comment's `/comments` edge. Live writes require all external-action gates, a disabled kill switch, verified integration capability, deterministic idempotency, and selected Page/post targeting.

## Exit evidence

- signed Page webhook evidence
- read-only Page identity/task verification
- comment webhook normalization fixtures
- one controlled Page comment test
- duplicate webhook replay test
- public reply idempotency test
- Messenger inbound/outbound text regression
- delivery/read/echo regression
- 24-hour response-window rejection test
- Page isolation test across at least two Page identifiers
- kill-switch test
- rollback to disabled action mode

Production activation is separate from branch implementation and CI completion.
