# Phase 5 — ChatGPT + Claude Implementation Workshop Funnel

## Goal

Convert qualified masterclass learners into a paid 5–7 day implementation experience without losing the original acquisition attribution.

Commercial configuration:

- current workshop price: `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE` (default `1499`)
- regular/reference price: `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE` (default `1999`)
- downstream AI Expert Program: ₹14,999 (later phase)

The workshop price is server-configured. Browser-submitted amounts are never trusted.

## Routes

### ChatGPT

- `/workshop/chatgpt?lead_id=<lead>` — implementation workshop sales page
- `/workshop/chatgpt/checkout?lead_id=<lead>&token=<signed-token>` — secure checkout
- `/workshop/chatgpt/thank-you?lead_id=<lead>` — server-verified confirmation

### Claude

- `/workshop/claude?lead_id=<lead>`
- `/workshop/claude/checkout?lead_id=<lead>&token=<signed-token>`
- `/workshop/claude/thank-you?lead_id=<lead>`

## Attribution rule

The original masterclass acquisition mode is preserved through the workshop funnel:

- `funnel:chatgpt:free` stays ChatGPT / Free
- `funnel:chatgpt:paid` stays ChatGPT / Paid
- `funnel:claude:free` stays Claude / Free
- `funnel:claude:paid` stays Claude / Paid

This allows a downstream comparison of Free vs low-ticket acquisition by workshop purchase and later ₹14,999 enrollment rather than by CPL alone.

## Offer handoff

`POST /api/funnel/workshop/start`

Input:

```json
{
  "leadId": "...",
  "funnel": "chatgpt | claude"
}
```

The server verifies that the lead belongs to the matching masterclass funnel. If no captured workshop payment exists, it creates a short-lived HMAC-signed token bound to:

- lead ID
- ChatGPT/Claude funnel
- `implementation_workshop` purpose
- expiry

A masterclass checkout token cannot be reused as a workshop checkout token.

## Workshop sales page tracking

Separate events are used for each stage:

- `masterclass_offer_seen` — learner was exposed to the workshop offer in the live masterclass flow
- `workshop_offer_viewed` — personalized workshop sales page actually loaded
- `workshop_cta_click` — learner clicked the workshop CTA
- `workshop_checkout_started` — secure Razorpay checkout window was initiated
- `workshop_purchase` — verified captured workshop payment
- `workshop_attended` — later delivery/attendance integration

Do not merge `masterclass_offer_seen` and `workshop_offer_viewed`; they answer different conversion questions.

## Payment purpose isolation

`FunnelPayment.purpose` distinguishes:

- `masterclass_entry`
- `implementation_workshop`

Both products reuse the same hardened Razorpay engine, but each has its own:

- server-fixed configured price
- signed checkout purpose
- receipt prefix
- provider order record
- purchase event
- lead status
- confirmation URL
- revenue stage

Workshop purchase creates `workshop_purchase_<razorpay_payment_id>` and sets lead status `paid_workshop`.

Masterclass purchase remains `purchase_<razorpay_payment_id>` and sets `paid_masterclass`.

## Payment verification

A workshop payment is counted only after all of the following pass:

1. stored payment record exists
2. stored Razorpay order matches callback order
3. checkout HMAC signature verifies
4. provider Payment is fetched server-to-server
5. provider Order is fetched server-to-server
6. amount exactly matches stored workshop amount
7. currency matches INR configuration
8. payment is `captured`
9. order is `paid`

Browser success alone never creates workshop revenue.

## Webhook recovery

The signed Razorpay webhook can reconcile a captured workshop payment even when the browser callback is lost.

The webhook branches by `FunnelPayment.purpose`, so a ₹1,499 workshop payment cannot be counted as a ₹9 masterclass purchase.

## Refund reconciliation

Only the signed Razorpay `refund.processed` webhook creates a first-party `refund` event. Razorpay recommends using `refund.processed` for the definitive final refund status.

The webhook:

- matches the provider payment ID to `FunnelPayment`
- re-fetches the provider Payment
- validates amount/currency
- records an idempotent `refund_<refund_id>` event
- supports partial refund amount tracking
- marks a full refund payment as `refunded`
- prevents an old checkout callback from reactivating a fully refunded enrollment

Dashboard Net Revenue = tracked gross revenue minus processed refund events.

## Dashboard stages

For each ChatGPT/Claude × Free/Paid acquisition cohort the admin dashboard can show:

1. leads
2. WhatsApp sent / delivered / read / Community join
3. masterclass joined / 30m / 60m
4. live workshop offer seen
5. workshop sales page viewed
6. workshop checkout started
7. workshop purchase
8. workshop attendance
9. core program offer / purchase (later phase)
10. gross revenue / refunds / net revenue

Key workshop diagnostics:

- live offer → workshop page
- workshop page → checkout
- checkout → verified workshop purchase
- live offer → workshop purchase

## Security CI

`npm run test:funnel-security` now tests:

- valid masterclass token
- valid implementation-workshop token
- lead tampering rejection
- purpose tampering rejection
- unsupported purpose rejection
- expired token rejection
- unsupported funnel rejection
- Razorpay checkout HMAC verification
- order/signature tampering rejection
- raw webhook HMAC verification
- mutated webhook body rejection

## Still not a production release

Before production activation:

- Razorpay Test Mode must be exercised end-to-end with real test credentials.
- `refund.processed` must be subscribed on the Razorpay webhook configuration.
- private WhatsApp callbacks must be connected using the documented integration contract.
- database migrations must be rehearsed outside production first.
- Meta Test Events must verify browser/server Purchase dedup.
- dependency advisory issue #109 remains a release blocker.
- PR #108 must remain draft until all release gates are explicitly cleared.
