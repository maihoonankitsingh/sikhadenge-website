# Phase 6 — AI Expert Program backend funnel

Status: implemented on `feature/ai-masterclass-funnel-v2`; production activation is not authorized by this document.

## Commercial ladder

1. ChatGPT / Claude acquisition masterclass — Free or configured paid entry.
2. Product-specific implementation workshop — configured at ₹1,499 by default, flexible through environment configuration.
3. Unified SikhaDenge AI Expert Program — configured at ₹14,999 by default.

The original `funnel` (`chatgpt` / `claude`) and `offerMode` (`free` / `paid`) are retained through every downstream first-party event so final program revenue can be attributed back to the original acquisition cohort.

## Core-program eligibility

The backend program is not a public unrestricted checkout in this funnel.

A lead is eligible only when the database contains a `FunnelPayment` with:

- matching `leadId`,
- `purpose = implementation_workshop`,
- `status = captured`,
- source funnel `chatgpt` or `claude`.

A fully refunded workshop is no longer `captured`, therefore it cannot authorize a new core-program checkout.

Eligibility is rechecked:

- when the personalized program offer is rendered,
- when a signed checkout handoff is issued,
- when the checkout route is server-rendered,
- when the core payment is verified,
- when a captured payment is reconciled from Razorpay webhook.

This prevents a pending core order from becoming an enrollment after the qualifying workshop has been fully refunded.

## Secure checkout

`core_program` is a separate `CheckoutPurpose`.

The checkout token is HMAC-signed and binds:

- learner lead ID,
- source funnel,
- payment purpose,
- expiry.

Default lifetime: 2 hours.

The browser does not supply the payable amount. The server reads:

`NEXT_PUBLIC_AI_EXPERT_PROGRAM_PRICE` (default `14999`).

Before conversion, the payment layer verifies:

- stored Razorpay order ID,
- Razorpay checkout HMAC signature,
- provider payment status `captured`,
- provider order status `paid`,
- exact amount,
- exact currency,
- qualifying workshop still active.

## Routes

- `/program/ai-expert?lead_id=<lead>` — personalized offer.
- `/program/ai-expert/checkout?...` — short-lived server-authorized Razorpay checkout.
- `/program/ai-expert/thank-you?lead_id=<lead>` — database-verified enrollment confirmation.
- `/api/funnel/core/start` — eligibility check + signed checkout handoff.

## Core events

- `core_offer_seen`
- `advisor_cta_click` (only when advisor URL is configured)
- `core_checkout_started`
- `close_convert_lead` — created only for verified captured core-program payment
- `close_unconvert_lead` — available for CRM/manual lost-opportunity integration
- `refund` — provider-verified processed refund event

`close_convert_lead` carries the actual verified core-program value and is also mirrored to Meta CAPI as `Purchase` when CAPI is configured.

Browser Meta Purchase and server Meta CAPI Purchase use the same verified purchase event ID for deduplication.

## Lead states

Successful core-program payment:

`enrolled_ai_expert`

Full processed core-program refund:

`refunded_ai_expert`

## Refund handling

Only signed Razorpay `refund.processed` events are used to record final refund value.

- Partial refund: payment remains `captured`; refund value reduces dashboard Net Revenue.
- Full refund: payment becomes `refunded`; lead becomes `refunded_ai_expert` for core-program purpose.
- A fully refunded payment cannot be reactivated by replaying its old checkout callback.

## Program configuration

- `NEXT_PUBLIC_AI_EXPERT_PROGRAM_PRICE=14999`
- `NEXT_PUBLIC_AI_EXPERT_PROGRAM_DURATION=10-week structured program`
- `NEXT_PUBLIC_AI_EXPERT_ADVISOR_URL=` optional advisor destination

Changing the entry-masterclass price does not require changing the backend program code.

## Dashboard

For each ChatGPT/Claude × Free/Paid cohort the dashboard now exposes:

- registrations,
- WhatsApp send/delivery/read/community stages,
- masterclass attendance/retention,
- implementation workshop page/checkout/purchase,
- AI Expert core offer,
- optional advisor click,
- core checkout,
- verified ₹14,999 enrollment,
- lost lead,
- refunds,
- entry revenue,
- workshop revenue,
- core revenue,
- net revenue.

Meta ad spend, CPL, CAC and ROAS are intentionally not fabricated. They remain absent until a verified Meta Ads reporting source is integrated.

## Release blockers still open

Phase 6 code completion does not authorize production deployment. Before production traffic:

1. Current CI/security/build must pass.
2. Razorpay Test Mode must exercise the core-program order, payment, callback-loss webhook recovery, duplicate webhook, partial refund and full refund flows with real test credentials.
3. Database migrations from earlier funnel phases must be rehearsed outside production.
4. Meta Test Events must verify browser/server Lead and Purchase dedup.
5. The private WhatsApp service must implement the documented real callback contract.
6. Dependency advisories tracked in GitHub issue #109 must be remediated or explicitly accepted with evidence.
7. Advisor URL, program duration and final commercial copy must be production-configured before launch.
8. No merge to `main`, production migration or live-traffic activation should occur merely because this phase compiles.
