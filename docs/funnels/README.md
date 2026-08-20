# SikhaDenge AI Masterclass Funnel v2

Isolated funnel engine on `feature/ai-masterclass-funnel-v2`.

## Current phase status

Phase 1 established the shared ChatGPT/Claude acquisition engine. Phase 2 hardens attribution, Meta browser/server event deduplication, confirmation flows, modular page structure, WhatsApp integration hooks, and dashboard-ready first-party events.

Nothing in this branch should be treated as production-ready until the database migration, environment variables, payment webhook, WhatsApp contract, and remote build are verified.

## Routes

### ChatGPT
- `/masterclass/chatgpt/free`
- `/masterclass/chatgpt/paid`
- `/masterclass/chatgpt/thank-you`

### Claude
- `/masterclass/claude/free`
- `/masterclass/claude/paid`
- `/masterclass/claude/thank-you`

### Admin
- `/admin/funnel-dashboard`

The four acquisition pages share one implementation. Product, offer mode, entry price, batch, date, time, copy and theme are configuration-driven. Do not fork full page markup for price or cohort changes.

## Commercial ladder

1. Free or low-ticket live masterclass
2. Optional implementation workshop (`₹1,499` test price / `₹1,999` regular configuration)
3. Core AI Expert Program (`₹14,999` business offer, to be implemented in a later funnel phase)

The acquisition page does not directly pitch the core program.

## Code organization

- `components/funnel/FunnelPage.tsx` — lightweight orchestrator only
- `components/funnel/sections/*` — isolated landing-page sections
- `components/funnel/RegistrationCard.tsx` — registration UX
- `components/funnel/ConfirmationPage.tsx` — shared confirmation UX
- `components/funnel/FunnelAnalytics.tsx` — optional GTM bootstrap
- `components/funnel/FunnelTracker.tsx` — page-view funnel event
- `lib/funnel/client.ts` — browser attribution + dataLayer + Meta Pixel events
- `lib/funnel/metaCapi.ts` — optional Meta Conversions API adapter
- `pages/api/funnel/register.ts` — validated registration + integrations
- `pages/api/funnel/event.ts` — first-party event persistence
- `data/funnels.ts` — ChatGPT/Claude offer configuration
- `public/funnels/shared/*` — verified shared funnel media
- `styles/funnel.css` — acquisition-page design system
- `styles/funnel-confirmation.css` — confirmation-page design system

## Core environment variables

Existing application variables:
- `DATABASE_URL`
- `SHADOW_DATABASE_URL`
- `NEODOVE_ENDPOINT` — optional
- `ADMIN_COOKIE_SECRET`
- `NEXT_PUBLIC_META_PIXEL_ID` — existing Meta Pixel ID

Funnel display/configuration:
- `NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE` — paid entry amount, default `9`
- `NEXT_PUBLIC_MASTERCLASS_DATE_LABEL` — human-readable event date/batch label
- `NEXT_PUBLIC_MASTERCLASS_TIME_LABEL` — display time, default `8:00 PM IST`
- `NEXT_PUBLIC_CHATGPT_MASTERCLASS_BATCH_ID` — stable ChatGPT cohort ID
- `NEXT_PUBLIC_CLAUDE_MASTERCLASS_BATCH_ID` — stable Claude cohort ID
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE` — default `1499`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE` — default `1999`
- `NEXT_PUBLIC_GTM_ID` — optional GTM container (`GTM-XXXXXXX`)
- `NEXT_PUBLIC_SITE_URL` or server `PUBLIC_SITE_URL` — canonical event source base; server fallback is `https://sikhadenge.in`

Community/support:
- `NEXT_PUBLIC_CHATGPT_COMMUNITY_URL` — optional ChatGPT cohort Community URL
- `NEXT_PUBLIC_CLAUDE_COMMUNITY_URL` — optional Claude cohort Community URL
- `NEXT_PUBLIC_MASTERCLASS_COMMUNITY_URL` — optional shared fallback Community URL
- `NEXT_PUBLIC_FUNNEL_SUPPORT_WHATSAPP_URL` — optional direct support CTA

Authenticated WhatsApp integration adapter:
- `WHATSAPP_FUNNEL_WEBHOOK_URL` — optional server-to-server registration webhook
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN` — optional Bearer credential

The exact private API contract for `whatsapp.sikhadenge.in` was not exposed in the audited website repository, so the code uses a configurable server-side adapter instead of guessing private routes or credentials.

## Meta Pixel + Conversions API

Browser tracking continues through the existing Meta Pixel. Phase 2 adds optional server-side Lead delivery through Meta Conversions API.

Server variables:
- `META_CAPI_ACCESS_TOKEN` — Meta CAPI access token; never expose as `NEXT_PUBLIC_*`
- `META_GRAPH_API_VERSION` — configurable Graph API version
- `META_TEST_EVENT_CODE` — optional Meta Events Manager test code
- `DEFAULT_PHONE_COUNTRY_CODE` — defaults to `91` for normalizing 10-digit Indian numbers before hashing

For a new lead:
1. The server generates one `registrationEventId`.
2. The first-party `generate_lead` row stores that ID.
3. The server sends Meta CAPI `Lead` with the same ID when CAPI credentials are configured.
4. The browser sends Meta Pixel `Lead` using the same `eventID` and does **not** persist a duplicate first-party row.

This is the browser/server deduplication contract. CAPI failure must never block registration.

User matching data sent by the server is normalized and SHA-256 hashed where required. Browser attribution captures `_fbp` and `_fbc` when available.

## Attribution contract

Stored first-party fields include:
- persistent `visitorId`
- per-session `sessionId`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Meta `campaign_id`, `adset_id`, `ad_id`
- `fbclid`, `_fbp`, `_fbc`
- `gclid`
- landing-page variant
- referrer
- funnel product
- offer mode
- entry price
- stable batch ID
- event ID
- lead ID where known

Recommended Meta ad URL parameters:

`utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}`

Use stable IDs for reporting even when campaign/ad names change.

## First-party event taxonomy

Acquisition:
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

Live masterclass:
- `masterclass_joined`
- `masterclass_30m`
- `masterclass_60m`
- `masterclass_offer_seen`

Implementation workshop:
- `workshop_cta_click`
- `workshop_purchase`
- `workshop_attended`

Core program / CRM:
- `qualify_lead`
- `working_lead`
- `core_offer_seen`
- `close_convert_lead`
- `close_unconvert_lead`
- `refund`

Only verified business events should be written. Do not manufacture attendance, purchase, ad spend, revenue or qualification records.

## Lead system

The existing `Lead` model remains the master lead record. Funnel registration details are stored in `Lead.notes` until a later normalized CRM migration is justified.

Sources:
- `funnel:chatgpt:free`
- `funnel:chatgpt:paid`
- `funnel:claude:free`
- `funnel:claude:paid`

New registrations can be pushed to the existing NeoDove endpoint and the optional authenticated WhatsApp webhook in parallel. External integration failure is logged but does not invalidate the stored registration.

## Confirmation flow

Free registration redirects to the product-specific thank-you page. Critical joining instructions should be delivered directly to the registered WhatsApp number.

WhatsApp Community is intentionally an engagement layer, not the only route for the live-class link. This prevents Community non-joiners from becoming automatic webinar no-shows.

## Paid checkout — production blocker

No payment provider/order/webhook implementation was present in the audited repository.

Current paid pages can only hand off to configured checkout URLs:
- `CHATGPT_MASTERCLASS_CHECKOUT_URL`
- `CLAUDE_MASTERCLASS_CHECKOUT_URL`
- shared fallback `MASTERCLASS_CHECKOUT_URL`

Do **not** treat redirect-to-checkout as a purchase.

Before paid traffic is production-ready, implement:
1. server-created payment/order
2. gateway signature verification
3. authenticated payment webhook
4. idempotent payment/order record
5. `purchase` only after verified success
6. exact amount/currency/order/payment IDs
7. verified paid thank-you flow
8. refund/reversal reconciliation

The payment provider must be explicitly chosen and its real server credentials configured; the repository currently does not establish one.

## Database

Migration:
- `prisma/migrations/20260820231500_funnel_events/migration.sql`

It creates the first-party `FunnelEvent` model with event ID, visitor/session IDs, attribution IDs, batch ID, revenue fields and indexes.

Apply the migration before live funnel traffic and regenerate Prisma Client as part of deployment.

## Dashboard

`/admin/funnel-dashboard` is protected by the existing admin session.

The dashboard uses first-party stored events. Meta ad spend, CPL, CAC and ROAS must only be shown after a verified Meta Ads reporting source is connected. They are intentionally not estimated from browser events.

## CI / validation

`.github/workflows/funnel-v2-ci.yml` runs:
- `npm ci`
- `prisma generate`
- `npm run build`

A remote CI PASS is required before merge/deployment. The current connector session has not yet exposed a completed workflow result, so build status must not be represented as PASS until GitHub records a successful check.

## Assets and claims

Shared media is under `public/funnels/shared/`.

Do not add unverified learner counts, job guarantees, salary claims, fake scarcity, fake bonus values, or claims of OpenAI/Anthropic affiliation. Testimonials must use verified learner records and consented media.
