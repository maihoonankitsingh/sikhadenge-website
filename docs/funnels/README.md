# SikhaDenge AI Funnel v2

Isolated implementation branch: `feature/ai-masterclass-funnel-v2`.

The system contains two acquisition funnels — ChatGPT and Claude — with configurable FREE / paid entry, a paid implementation workshop, the ₹14,999 AI Expert backend, first-party attribution, verified payments, WhatsApp diagnostics, CRM, dashboard and launch-readiness gates.

Nothing in this branch is production-approved until the external Phase 10 provider tests and final release review pass.

## Phase status

- Phase 1 — shared ChatGPT / Claude acquisition engine: implemented
- Phase 2 — attribution, Meta Pixel/CAPI event-ID dedup, modular sections and confirmation flow: implemented
- Phase 3 — verified Razorpay paid-entry checkout: implemented
- Phase 4 — WhatsApp status diagnostics and payment-security gates: implemented
- Phase 5 — ChatGPT / Claude ₹1,499–₹1,999 implementation workshop funnels: implemented
- Phase 6 — gated ₹14,999 AI Expert Program backend: implemented
- Phase 7 — Funnel CRM and learner lifecycle: implemented
- Phase 8 — fresh PostgreSQL migration rehearsal and schema integrity QA: implemented
- Phase 9 — Next.js 16 / React 19 dependency-security hardening and full-site route smoke: implemented; blocker #109 closed
- Phase 10 — admin integration readiness console, safe provider diagnostics and HTTP lifecycle rehearsal: implemented in code; real provider credentials/tests still required

## Commercial ladder

1. ChatGPT or Claude masterclass — FREE or configurable paid entry (currently test baseline ₹9)
2. ChatGPT or Claude implementation workshop — launch ₹1,499 / configurable regular ₹1,999
3. SikhaDenge AI Expert Program — configurable ₹14,999

Entry/workshop/core prices are server-configured. Browser-submitted prices are not authoritative.

## Routes

### ChatGPT acquisition

- `/masterclass/chatgpt/free`
- `/masterclass/chatgpt/paid`
- `/masterclass/chatgpt/checkout`
- `/masterclass/chatgpt/thank-you`

### Claude acquisition

- `/masterclass/claude/free`
- `/masterclass/claude/paid`
- `/masterclass/claude/checkout`
- `/masterclass/claude/thank-you`

### Implementation workshops

- `/workshop/chatgpt`
- `/workshop/chatgpt/checkout`
- `/workshop/chatgpt/thank-you`
- `/workshop/claude`
- `/workshop/claude/checkout`
- `/workshop/claude/thank-you`

### AI Expert backend

- `/program/ai-expert`
- `/program/ai-expert/checkout`
- `/program/ai-expert/thank-you`

### Admin

- `/admin/funnel-dashboard`
- `/admin/funnel-crm`
- `/admin/funnel-crm/[leadId]`
- `/admin/funnel-integrations`

## Core organization

- `components/funnel/FunnelPage.tsx` — acquisition orchestrator
- `components/funnel/sections/*` — isolated acquisition sections
- `components/funnel/workshop/*` — implementation-workshop experience
- `components/funnel/core/*` — AI Expert sales/enrollment experience
- `components/funnel/crm/*` — operational CRM views
- `data/funnels.ts` — ChatGPT / Claude product configuration
- `lib/funnel/client.ts` — browser attribution and events
- `lib/funnel/metaCapi.ts` — Meta CAPI adapter with Test Events support
- `lib/funnel/razorpay.ts` — Razorpay order/payment/signature helpers
- `lib/funnel/checkoutToken.ts` — purpose-bound signed handoff tokens
- `lib/funnel/paymentPurpose.ts` — masterclass/workshop/core payment classification
- `lib/funnel/integrationReadiness.ts` — masked Phase 10 provider readiness
- `pages/api/funnel/*` — registration, events, payment and WhatsApp APIs
- `pages/api/admin/funnel-*` — dashboard, CRM and integration diagnostics
- `prisma/schema.prisma` + `prisma/migrations/*` — first-party commercial data model
- `public/funnels/shared/*` — funnel-owned media
- `styles/funnel*.css` / `styles/workshop-funnel.css` — isolated funnel design systems

## Attribution stored end-to-end

- visitor ID
- session ID
- UTM source / medium / campaign / content / term
- Meta campaign / ad set / ad IDs
- `fbclid`, `_fbp`, `_fbc`
- `gclid`
- landing variant
- referrer
- ChatGPT / Claude
- FREE / paid acquisition mode
- entry price
- stable batch ID
- lead ID
- event ID

Original ChatGPT/Claude + FREE/paid acquisition attribution is preserved through WhatsApp, masterclass, workshop and AI Expert conversion.

Recommended Meta URL parameters:

```text
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}
```

## Payment security contract

Checkout tokens are cryptographically purpose-bound to:

- `masterclass_entry`
- `implementation_workshop`
- `core_program`

Payment flow does not trust browser success or browser price:

1. eligible lead is persisted / validated,
2. short-lived signed token is issued,
3. server reads configured amount,
4. server creates Razorpay Order,
5. checkout callback HMAC is verified,
6. server re-fetches Razorpay Payment + Order,
7. exact order / amount / INR / `captured` payment / `paid` order are required,
8. only then is commercial access granted and a first-party purchase event stored,
9. browser/server Meta Purchase use the verified event ID for dedup,
10. signed webhooks reconcile callback loss,
11. duplicate callbacks/webhooks are idempotent,
12. `refund.processed` supports partial/full refund reconciliation and Net Revenue adjustment,
13. a fully refunded qualifying workshop cannot be replayed to activate core enrollment.

Webhook:

```text
POST https://<site-host>/api/funnel/payment/webhook
```

Relevant events include `payment.captured`, `payment.failed`, `order.paid` and `refund.processed`.

## WhatsApp contract

Outbound registration adapter:

- `WHATSAPP_FUNNEL_WEBHOOK_URL`
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN`

Status callback into website:

```text
POST /api/funnel/whatsapp/status
Authorization: Bearer <WHATSAPP_FUNNEL_STATUS_TOKEN>
```

Normalized stages include queued, sent, delivered, read, failed and community joined. Provider message ID + status form the idempotent event identity, and original acquisition attribution is inherited server-side.

Phase 10 additionally defines a side-effect-free `integration_healthcheck` event for transport/auth verification. See `WHATSAPP-INTEGRATION-CONTRACT.md`.

Critical class access/reminders should be deliverable directly to the registered WhatsApp number. Community membership is an engagement layer, not the sole access dependency.

## CRM and dashboard

`/admin/funnel-crm` is the operational workspace for owner, priority, advisor state, qualification, lost reason, follow-up and notes. Manual CRM fields cannot manufacture payment truth.

Verified lifecycle and revenue are derived from `FunnelEvent` / `FunnelPayment`.

`/admin/funnel-dashboard` compares ChatGPT vs Claude and original FREE vs paid cohorts across:

- visitors / leads
- WhatsApp sent / delivered / read / community joined
- masterclass show-up and retention
- workshop offer / page / checkout / purchase / attendance
- AI Expert offer / advisor / checkout / verified enrollment
- entry / workshop / core revenue
- verified refunds and Net Revenue

Meta ad spend, CPL, CAC and ROAS are intentionally excluded until an authenticated Meta Ads reporting source is connected.

## Phase 10 Integration Console

Admin route:

```text
/admin/funnel-integrations
```

It shows masked readiness only; secrets are never returned to the browser.

Safe diagnostics:

- Razorpay: accepts **Test Mode only** (`rzp_test_`); live keys are refused
- Meta: requires Pixel ID + CAPI token + `META_TEST_EVENT_CODE`
- WhatsApp: sends non-PII `integration_healthcheck` with `dryRun: true`

Automated CI also runs a real HTTP lifecycle rehearsal against temporary PostgreSQL: registration APIs, signed paid handoff, WhatsApp sent/delivered/read callbacks, replay idempotency and attribution inheritance. This proves website-side behavior only, not external provider connectivity.

See `PHASE-10-REAL-INTEGRATION-READINESS.md`.

## Environment variables

### Application / database

- `DATABASE_URL`
- `SHADOW_DATABASE_URL`
- `ADMIN_COOKIE_SECRET`
- `PUBLIC_SITE_URL` or `NEXT_PUBLIC_SITE_URL`

### Funnel pricing / batches

- `NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE` — current test baseline `9`
- `NEXT_PUBLIC_MASTERCLASS_DATE_LABEL`
- `NEXT_PUBLIC_MASTERCLASS_TIME_LABEL`
- `NEXT_PUBLIC_CHATGPT_MASTERCLASS_BATCH_ID`
- `NEXT_PUBLIC_CLAUDE_MASTERCLASS_BATCH_ID`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE` — default `1499`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE` — default `1999`
- `NEXT_PUBLIC_AI_EXPERT_PROGRAM_PRICE` — default `14999`
- `NEXT_PUBLIC_AI_EXPERT_PROGRAM_DURATION`
- `NEXT_PUBLIC_AI_EXPERT_ADVISOR_URL` — optional

### Checkout / Razorpay

- `FUNNEL_CHECKOUT_SECRET` — dedicated high-entropy signing secret required for release readiness
- `RAZORPAY_KEY_ID`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — optional public identifier fallback
- `RAZORPAY_KEY_SECRET` — server-only
- `RAZORPAY_WEBHOOK_SECRET` — server-only

### Meta

- `NEXT_PUBLIC_META_PIXEL_ID`
- `META_CAPI_ACCESS_TOKEN` — server-only
- `META_TEST_EVENT_CODE` — required during Phase 10 Meta verification
- `META_GRAPH_API_VERSION`
- `DEFAULT_PHONE_COUNTRY_CODE` — defaults to `91`
- `NEXT_PUBLIC_GTM_ID` — optional

### WhatsApp

- `WHATSAPP_FUNNEL_WEBHOOK_URL`
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN` — server-only
- `WHATSAPP_FUNNEL_STATUS_TOKEN` — server-only
- `NEXT_PUBLIC_CHATGPT_COMMUNITY_URL`
- `NEXT_PUBLIC_CLAUDE_COMMUNITY_URL`
- `NEXT_PUBLIC_MASTERCLASS_COMMUNITY_URL`
- `NEXT_PUBLIC_FUNNEL_SUPPORT_WHATSAPP_URL`

### Optional existing integration

- `NEODOVE_ENDPOINT`

Do not commit or paste secrets into source, PR bodies, issues or browser-visible variables.

## Database migrations

Current Funnel v2 additions include:

- `20260820231500_funnel_events`
- `20260820235000_funnel_payments`
- `20260820235500_funnel_event_id_unique`
- `20260821094500_funnel_crm`
- `20260821100000_legacy_influencer_reconciliation`

Fresh PostgreSQL rehearsal applies the complete repository migration history before DB integrity tests. Historical migrations are not rewritten.

## Permanent CI release gate

`.github/workflows/funnel-v2-ci.yml` is read-only and currently gates:

1. `npm ci` from committed lockfile
2. payment/token security self-tests
3. Phase 10 integration-readiness self-tests
4. production dependency audit with zero high findings required
5. Prisma generation
6. fresh PostgreSQL `prisma migrate deploy`
7. database integrity smoke test
8. full Next.js 16 production build/type-check
9. Phase 10 HTTP lifecycle rehearsal
10. production route smoke across existing site + funnel/admin routes

Phase 9 dependency blocker #109 was closed only after the clean committed-lockfile CI passed zero-high audit, full build, fresh DB and route smoke.

## External gates before production

Automated code readiness is not provider verification. Production remains blocked until:

1. Razorpay Test Mode credentials/webhook are configured in a non-production environment,
2. real Test Mode entry/workshop/core payment flows pass,
3. callback-loss, duplicate webhook, failed payment, partial/full refund and workshop-refund-before-core scenarios pass,
4. Meta Test Events verifies browser/server Lead + Purchase dedup for all commercial stages,
5. private `whatsapp.sikhadenge.in` supports outbound + healthcheck + status callbacks,
6. one controlled real learner is observed through attribution → WhatsApp → masterclass → workshop → AI Expert → CRM/dashboard,
7. final prices, batch IDs/date/time, advisor destination, support contacts and legal/refund copy are reviewed,
8. only then are production migration, PR merge, Razorpay Live Mode and live traffic separately authorized.
