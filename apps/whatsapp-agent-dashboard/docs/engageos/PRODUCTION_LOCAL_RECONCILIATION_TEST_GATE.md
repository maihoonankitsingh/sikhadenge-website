# Production-local reconciliation regression gate

The recovered production-only behavior is guarded by `test:production-local-reconciliation`, which is part of `test:agent`.

The gate covers:

- Recent / History / All scope normalization;
- deterministic 24-hour conversation boundaries;
- `limit=all` and numeric limit parsing;
- WhatsApp template-body parameter interpolation;
- both supported read-only analytics bearer-token aliases with empty/wrong-token rejection;
- Inbox image/video/audio MIME handling source invariants;
- Manrope typography with `ServiceWorkerRegistration` still present;
- canonical repository use of the shared time-filter and template-rendering policy.

This gate does not authorize production cleanup or deployment. Those remain separate hash-locked operations after full PR CI and review.
