# SikhaDenge Phase 03 Event Collection Contract

## Objective

Phase 03 creates a SikhaDenge-owned analytics collection layer.

The central flow will be:

```text
Browser or trusted server
        ↓
SikhaDenge Analytics SDK
        ↓
POST /api/analytics/events
        ↓
Schema and payload validation
        ↓
Consent and environment validation
        ↓
PII-key rejection
        ↓
event_id deduplication
        ↓
Immutable raw-event storage
        ↓
Delivery queue and logs
        ↓
GA4, Meta and future warehouse
```

This architecture does not replace the existing GA4 or Meta conversion implementation until compatibility and deduplication are verified.

## Identity hierarchy

Events may connect these identifiers:

1. `anonymous_id`
2. `session_id`
3. `user_id`
4. `lead_id`
5. `registration_id`
6. `workshop_registration_id`
7. `enrollment_id`
8. `order_id`
9. `payment_id`

Browser events require `anonymous_id` and `session_id`.

Known identifiers are added only after the application establishes the relevant business relationship.

## Attribution

The collection layer supports:

- First-touch attribution
- Lead-creation attribution
- Last non-direct attribution
- Last paid attribution
- Self-reported attribution
- Platform attribution

Preserved campaign fields include:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `msclkid`

First-touch values are immutable after initial capture.

Last-touch values may update during later meaningful sessions.

## Consent

Rules:

- Analytics collection requires analytics consent.
- GA4 delivery requires analytics consent.
- Meta browser delivery requires advertising consent.
- Meta server delivery requires advertising consent.
- Advertising consent is not inferred from analytics consent.
- Test and staging events must not enter production reporting.
- Consent state must be recorded inside the event envelope.

## PII prohibition

The raw analytics payload must not contain:

- Names
- Email addresses
- Phone numbers
- Postal addresses
- Passwords
- OTP values
- PAN or Aadhaar values
- Payment-card details
- Razorpay signatures
- Access tokens
- Authorization headers
- Cookies

Opaque internal identifiers such as `lead_id`, `order_id` and `payment_id` are allowed.

## Event deduplication

`event_id` is globally unique.

Browser and server events representing the same business action must use the same deterministic `event_id`.

A duplicate event:

- Is not inserted again
- Is not delivered again
- Returns an accepted duplicate response

Initial duplicate retention is seven days.

## Time validation

- `occurred_at` must be valid ISO-8601.
- Events more than five minutes in the future are rejected.
- Events older than thirty days are rejected from the normal endpoint.
- Historical backfills require a separate trusted workflow.

## API response design

Accepted event response contains:

- `accepted: true`
- The submitted `event_id`
- Status `accepted` or `queued`

Duplicate event response contains:

- `accepted: true`
- The submitted `event_id`
- Status `duplicate`

Rejected event response contains:

- `accepted: false`
- A rejection status
- One or more validation errors

Proposed HTTP status codes:

- `200` — accepted duplicate
- `202` — accepted or queued
- `400` — invalid schema
- `403` — consent rejected
- `413` — payload too large
- `429` — rate limited
- `500` — internal failure

## Business transaction safety

Analytics is secondary to the primary application transaction.

Admission creation, payment verification and enrollment must not fail only because analytics collection or destination delivery fails.

Analytics failures must be logged and retried independently.

## Compatibility requirements

Phase 03 must preserve:

- Existing GA4 WhatsApp and phone click events
- Existing masterclass lead tracking
- Existing verified purchase analytics
- Existing Meta CompleteRegistration browser/server deduplication
- Existing Meta Purchase shared event ID
- Existing Razorpay signature verification
- Existing captured-payment validation
- Existing consent runtime and bridges

The central event layer must not create duplicate GA4 or Meta conversions.

## Storage boundary

A dedicated immutable raw-event database model will be created in a later Phase 03 batch.

This architecture batch performs no Prisma schema change or database migration.

## Environment separation

Every event identifies one environment:

- `production`
- `staging`
- `development`
- `test`

Production reporting accepts only production events.

## Initial quality controls

The runtime implementation must include:

- Payload-size validation
- Schema validation
- Event-name validation
- Timestamp validation
- Consent validation
- PII-key rejection
- Duplicate event detection
- Internal staff flag
- Bot flag
- Test environment separation
- Delivery attempt logs
- Retry handling
- Dead-letter handling
