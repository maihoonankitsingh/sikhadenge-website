# Phase 12A — Existing Integration Audit

## Objective

Funnel v2 must reuse SikhaDenge's existing provider/service boundaries wherever they already exist. This phase does **not** create a parallel Razorpay account, Meta Pixel, WhatsApp sender stack, or CRM truth source.

Secrets must remain server-side. This document records environment-variable names and service boundaries only; it must never contain credential values.

## Deployment connector observation

The connected Vercel workspace exposed no SikhaDenge website project during this audit. Therefore this phase does not read, copy, create, or mutate production environment variables through Vercel. Runtime-secret verification must occur in the actual hosting environment that serves SikhaDenge.

## Authoritative reuse matrix

| Integration | Existing SikhaDenge evidence | Funnel v2 runtime contract | Classification | Remaining real-world evidence |
| --- | --- | --- | --- | --- |
| Razorpay account / Key ID / Key Secret | Existing admission flow uses `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` | Same variables are used by `lib/funnel/razorpay.ts` | **Direct reuse confirmed** | Controlled Test Mode order/payment on the existing Razorpay account |
| Razorpay signed webhook | Existing audited admission API exposes create/complete/verify routes; no signed Razorpay webhook route was present in that admission API inventory | `RAZORPAY_WEBHOOK_SECRET` verifies `X-Razorpay-Signature` for callback-loss/idempotent recovery | **Additional reliability configuration on the same Razorpay account; not a second payment stack** | Configure/confirm same-account webhook signing secret and deliver signed Test Mode webhooks |
| Meta Pixel | Existing website uses `NEXT_PUBLIC_META_PIXEL_ID` | Funnel v2 uses the same variable | **Direct reuse confirmed** | Browser Pixel event check on controlled funnel traffic |
| Meta CAPI | Existing Pixel does not prove server-side CAPI is configured | Optional `META_CAPI_ACCESS_TOKEN`; optional `META_TEST_EVENT_CODE` for Test Events | **Conditional reuse only if the existing runtime already has CAPI access** | Test Events browser/server dedup if existing CAPI is available |
| Meta Ads spend / Insights | No trusted Ads Insights/ad-account read configuration was found in the audited website source | No spend source is assumed | **Unavailable until verified** | Connect trusted existing Ads reporting access before CPL/CAC/ROAS are shown |
| WhatsApp masterclass registration | Existing service boundary `https://whatsapp.sikhadenge.in`; masterclass registration contract `/api/webhooks/masterclass-registration` | Runtime defaults to the existing agent and prefers `MASTERCLASS_REGISTRATION_WEBHOOK_SECRET` | **Direct reuse confirmed** | Controlled learner receives the expected real registration/joining flow |
| WhatsApp status callback | Funnel v2 ingests authenticated sent/delivered/read/failed/community stages | `WHATSAPP_FUNNEL_STATUS_TOKEN` when present, otherwise the existing masterclass shared secret may authenticate the callback | **Compatible reuse** | Real provider/agent callbacks for a controlled learner |
| WhatsApp safe health diagnostic | A registration webhook is not a health endpoint and must never receive a fake learner payload for diagnostics | Optional `WHATSAPP_AGENT_STATUS_URL` + existing `DEVELOPER_API_TOKEN`/status token if such a side-effect-free contract is available | **Optional diagnostic only; not a runtime blocker** | Use only when the existing agent exposes a safe authenticated status route; otherwise use controlled learner verification |
| NeoDove | Existing registration API supports optional `NEODOVE_ENDPOINT` | Same optional bridge remains usable | **Reuse if already configured** | Operational verification only; first-party PostgreSQL/CRM remains commercial source of truth |

## Runtime rules

### Razorpay

1. Do not create a second Razorpay merchant/account for Funnel v2.
2. Reuse the existing runtime's `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
3. Browser amount is never authoritative.
4. Server creates the order and verifies exact amount/currency/provider state.
5. `RAZORPAY_WEBHOOK_SECRET` is a same-account webhook signing control. The audited admission flow did not provide the webhook recovery layer required by Funnel v2.
6. Admin diagnostics refuse `rzp_live_` keys. Live Mode is never used merely to test connectivity.

### Meta

1. Reuse `NEXT_PUBLIC_META_PIXEL_ID`; do not create a duplicate Pixel for the new funnel.
2. Pixel presence does not imply CAPI exists.
3. If `META_CAPI_ACCESS_TOKEN` is already available in the actual runtime, Funnel v2 can reuse it and validate dedup with `META_TEST_EVENT_CODE`.
4. If CAPI is absent, Pixel reuse remains valid; CAPI must be shown as unavailable rather than silently invented.
5. Spend, CPL, CAC and ROAS remain unavailable until a trusted Meta Ads reporting source is connected. Revenue-per-lead and revenue-per-visitor may still be reported from first-party truth.

### WhatsApp

1. Reuse the existing SikhaDenge masterclass agent.
2. Default registration endpoint remains `https://whatsapp.sikhadenge.in/api/webhooks/masterclass-registration` unless an explicit existing endpoint is configured.
3. Prefer the existing `MASTERCLASS_REGISTRATION_WEBHOOK_SECRET`; the legacy generic token remains a fallback only.
4. FREE registration may enter the existing WhatsApp masterclass workflow after explicit consent.
5. Paid-entry registration must not enter the paid masterclass workflow until Razorpay payment is verified captured.
6. Status callbacks remain idempotent and inherit original acquisition attribution.
7. Never POST a fake registration to test health. A safe health diagnostic is optional and must use a side-effect-free status endpoint if the existing agent exposes one.

## Readiness semantics

The Integration Console intentionally distinguishes:

- **provider/runtime readiness** — enough existing configuration for the real funnel path;
- **safe diagnostic readiness** — optional ability to make a side-effect-free provider health/Test Events request;
- **external evidence** — actual Test Mode or controlled-learner proof.

A working WhatsApp registration bridge must not appear blocked merely because an optional health endpoint is unavailable. Conversely, a configured environment variable is not proof that a real external transaction or callback works.

## No-secret policy

The admin readiness API may expose only booleans, modes, masked identifiers, and missing-capability labels. It must never return:

- Razorpay Key Secret or webhook secret;
- Meta access token or Test Event Code value;
- WhatsApp shared/developer tokens;
- checkout signing secret;
- raw provider credentials in diagnostic failures.

## Phase 12A exit criteria

- [x] Existing Razorpay Key ID/Secret env names mapped to Funnel v2.
- [x] Old admission webhook inventory audited; signed webhook is treated as a same-account reliability addition, not a duplicate payment stack.
- [x] Existing Meta Pixel env name mapped directly.
- [x] CAPI separated from Pixel readiness instead of being assumed.
- [x] Existing WhatsApp masterclass agent/default endpoint + shared-secret fallback reflected in readiness.
- [x] Fake registration healthcheck removed from admin diagnostic behavior.
- [x] Safe health diagnostics separated from real WhatsApp runtime readiness.
- [x] No Meta spend/CPL/CAC/ROAS fabricated without a trusted spend source.
- [ ] Real Razorpay Test Mode entry/workshop/core evidence.
- [ ] Real signed Razorpay webhook/refund evidence.
- [ ] Real Meta Test Events dedup evidence if existing CAPI is available.
- [ ] Real controlled WhatsApp learner + callback evidence.
- [ ] One controlled end-to-end learner reconciled across CRM and Decision Intelligence.

## Production gate

Phase 12A is an audit/alignment phase only. It does not authorize production database migration, PR merge, Razorpay Live Mode switching, or live advertising traffic.
