# SikhaDenge AI Masterclass Funnel v2

Isolated funnel engine on `feature/ai-masterclass-funnel-v2`.

## Phase status

- Phase 1: shared ChatGPT/Claude acquisition engine — implemented
- Phase 2: attribution, Meta Pixel/CAPI dedup, confirmation flow, modular sections, dashboard foundation — implemented
- Phase 3: Razorpay paid-entry order/checkout/verification/webhook flow — implemented in code, requires real env + migration + remote CI before live traffic
- Future: implementation-workshop funnel, core ₹14,999 program funnel, Meta Ads spend ingestion, complete refund reconciliation

Nothing in this branch is production-approved until CI passes, migrations are deployed in a controlled release, Razorpay Test Mode succeeds end-to-end, and production environment variables are verified.

## Routes

### ChatGPT
- `/masterclass/chatgpt/free`
- `/masterclass/chatgpt/paid`
- `/masterclass/chatgpt/checkout`
- `/masterclass/chatgpt/thank-you`

### Claude
- `/masterclass/claude/free`
- `/masterclass/claude/paid`
- `/masterclass/claude/checkout`
- `/masterclass/claude/thank-you`

### Admin
- `/admin/funnel-dashboard`

## Commercial ladder

1. Free or low-ticket masterclass
2. ₹1,499–₹1,999 implementation workshop
3. ₹14,999 AI Expert Program

Entry price is configuration-driven. Changing ₹9 to ₹49/₹99/etc. must not require page duplication.

## Code organization

- `components/funnel/FunnelPage.tsx` — acquisition orchestrator
- `components/funnel/sections/*` — isolated landing-page sections
- `components/funnel/RegistrationCard.tsx` — registration UX
- `components/funnel/CheckoutPage.tsx` — paid Razorpay checkout UX
- `components/funnel/ConfirmationPage.tsx` — shared confirmation UX
- `lib/funnel/client.ts` — browser attribution, dataLayer and Meta Pixel events
- `lib/funnel/metaCapi.ts` — Meta Conversions API adapter
- `lib/funnel/razorpay.ts` — Razorpay Orders/payment/signature helpers
- `lib/funnel/checkoutToken.ts` — short-lived signed checkout handoff tokens
- `pages/api/funnel/register.ts` — registration + lead integrations
- `pages/api/funnel/payment/create-order.ts` — server-fixed Razorpay order creation
- `pages/api/funnel/payment/verify.ts` — checkout signature + provider-state verification
- `pages/api/funnel/payment/webhook.ts` — signed webhook reconciliation
- `pages/api/funnel/event.ts` — first-party event persistence
- `pages/api/admin/funnel-dashboard.ts` — stage analytics API
- `data/funnels.ts` — ChatGPT/Claude configuration
- `public/funnels/shared/*` — funnel-owned media
- `styles/funnel.css` — acquisition design system
- `styles/funnel-checkout.css` — secure checkout design system
- `styles/funnel-confirmation.css` — confirmation design system

## Environment variables

### Existing application
- `DATABASE_URL`
- `SHADOW_DATABASE_URL`
- `ADMIN_COOKIE_SECRET`
- `NEODOVE_ENDPOINT` — optional
- `NEXT_PUBLIC_META_PIXEL_ID` — optional browser Meta Pixel

### Funnel configuration
- `NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE` — default `9`
- `NEXT_PUBLIC_MASTERCLASS_DATE_LABEL`
- `NEXT_PUBLIC_MASTERCLASS_TIME_LABEL`
- `NEXT_PUBLIC_CHATGPT_MASTERCLASS_BATCH_ID`
- `NEXT_PUBLIC_CLAUDE_MASTERCLASS_BATCH_ID`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE` — default `1499`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE` — default `1999`
- `NEXT_PUBLIC_GTM_ID` — optional
- `NEXT_PUBLIC_SITE_URL` or `PUBLIC_SITE_URL`

### WhatsApp/community
- `WHATSAPP_FUNNEL_WEBHOOK_URL` — optional authenticated server adapter
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN` — optional Bearer token
- `NEXT_PUBLIC_CHATGPT_COMMUNITY_URL`
- `NEXT_PUBLIC_CLAUDE_COMMUNITY_URL`
- `NEXT_PUBLIC_MASTERCLASS_COMMUNITY_URL`
- `NEXT_PUBLIC_FUNNEL_SUPPORT_WHATSAPP_URL`

### Meta Conversions API
- `META_CAPI_ACCESS_TOKEN`
- `META_GRAPH_API_VERSION`
- `META_TEST_EVENT_CODE` — optional Test Events code
- `DEFAULT_PHONE_COUNTRY_CODE` — defaults to `91`

### Razorpay paid-entry
- `RAZORPAY_KEY_ID` — server key ID; preferred
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — optional public-key fallback only
- `RAZORPAY_KEY_SECRET` — server secret; never expose to browser
- `RAZORPAY_WEBHOOK_SECRET` — webhook signing secret
- `FUNNEL_CHECKOUT_SECRET` — recommended dedicated HMAC secret for checkout-link signing

If `FUNNEL_CHECKOUT_SECRET` is omitted, code falls back to an existing server secret. Production should configure a dedicated high-entropy value.

## Paid-entry security contract

The paid funnel does not trust browser price or browser success state.

1. Registration is stored first.
2. Server creates a short-lived signed checkout token bound to `leadId + funnel`.
3. Checkout order creation rejects invalid/expired/tampered tokens.
4. Server reads the configured masterclass price and converts it to paise.
5. Server creates a Razorpay Order and stores a `FunnelPayment` row.
6. Razorpay Checkout receives the server-created `order_id`.
7. On success, `/api/funnel/payment/verify` validates the checkout HMAC using the stored server order ID.
8. Server fetches Razorpay Payment + Order and requires:
   - exact order match
   - exact amount
   - exact currency
   - payment `captured`
   - order `paid`
9. Only then is the payment marked captured, the lead becomes `paid_masterclass`, and first-party `purchase` is created.
10. Browser Meta Pixel `Purchase` uses the same event ID returned by the server as the server-side Meta CAPI `Purchase` for deduplication.
11. Signed Razorpay `payment.captured` / `order.paid` webhooks can reconcile a payment when the browser callback is lost.
12. `payment.failed` never becomes purchase revenue.

Webhook endpoint:

`POST https://<site-host>/api/funnel/payment/webhook`

Configure at minimum Razorpay events:
- `payment.captured`
- `payment.failed`
- `order.paid`

Refund/reversal reconciliation is intentionally still a future phase and must be implemented before relying on net revenue after refunds.

## Database

Migrations:
- `prisma/migrations/20260820231500_funnel_events/migration.sql`
- `prisma/migrations/20260820235000_funnel_payments/migration.sql`

`FunnelEvent` stores attribution and funnel stages.

`FunnelPayment` stores provider order/payment identity, exact paise amount, status, purchase-event ID, failure details and timestamps. Provider order IDs, payment IDs, receipts and purchase event IDs are unique for idempotency.

Do not apply production migrations manually until the branch has passed CI and a controlled deployment window is approved.

## Attribution

Stored fields include:
- persistent visitor ID
- session ID
- UTM source/medium/campaign/content/term
- Meta campaign/adset/ad IDs
- `fbclid`, `_fbp`, `_fbc`
- `gclid`
- landing variant
- referrer
- funnel product
- offer mode
- entry price
- stable batch ID
- event ID
- lead ID

Recommended Meta URL parameters:

`utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}`

## Event taxonomy

Acquisition/payment:
- `view_masterclass_offer`
- `masterclass_cta_click`
- `registration_submit_click`
- `generate_lead`
- `begin_checkout`
- `purchase`

WhatsApp/community:
- `whatsapp_cta_click`
- `community_click`
- `join_group`

Masterclass:
- `masterclass_joined`
- `masterclass_30m`
- `masterclass_60m`
- `masterclass_offer_seen`

Workshop/core:
- `workshop_cta_click`
- `workshop_purchase`
- `workshop_attended`
- `qualify_lead`
- `working_lead`
- `core_offer_seen`
- `close_convert_lead`
- `close_unconvert_lead`
- `refund`

Only verified business events should be stored. Do not manufacture attendance, purchase, ad spend, revenue or CRM states.

## WhatsApp principle

Critical class reminders/joining instructions should be deliverable directly to the registered WhatsApp number. Community membership is an engagement layer, not the sole delivery dependency.

## Dashboard

`/admin/funnel-dashboard` uses first-party stored events and compares ChatGPT vs Claude and Free vs Paid across lead, attendance, retention, workshop and core-program stages.

Meta ad spend, CPL, CAC and ROAS are not fabricated. They require an authenticated Meta Ads reporting source in a later phase.

## CI / release gate

`.github/workflows/funnel-v2-ci.yml` runs:
- `npm ci`
- `prisma generate`
- `npm run build`

Required before live deployment:
1. remote CI PASS
2. Razorpay Test Mode end-to-end successful payment
3. invalid-signature test rejected
4. amount-tampering test rejected
5. webhook signature test
6. callback-loss/webhook reconciliation test
7. duplicate webhook/idempotency test
8. database migration rehearsal
9. Meta Test Events browser/server dedup verification
10. WhatsApp integration test

No merge to `main` or production activation should happen before these gates pass.
