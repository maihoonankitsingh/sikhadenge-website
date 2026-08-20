# SikhaDenge AI Masterclass Funnel v2

Isolated funnel engine introduced on `feature/ai-masterclass-funnel-v2`.

## Phase 1 routes
- `/masterclass/chatgpt/free`
- `/masterclass/chatgpt/paid`
- `/masterclass/claude/free`
- `/masterclass/claude/paid`
- `/admin/funnel-dashboard`

The four acquisition pages share one implementation and differ through configuration. Do not fork page markup to change price, date, product, or offer mode.

## Commercial ladder
1. Free or low-ticket live masterclass
2. Optional implementation workshop (`₹1,499` test price / `₹1,999` regular configuration)
3. Core AI Expert Program (later funnel phase)

The acquisition page does not directly pitch the core program.

## Environment variables
Existing: `DATABASE_URL`, `SHADOW_DATABASE_URL`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEODOVE_ENDPOINT`, `ADMIN_COOKIE_SECRET`.

Funnel configuration:
- `NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE` — paid entry amount, default `9`
- `NEXT_PUBLIC_MASTERCLASS_DATE_LABEL` — display date / batch label
- `NEXT_PUBLIC_MASTERCLASS_TIME_LABEL` — display time, default `8:00 PM IST`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE` — default `1499`
- `NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE` — default `1999`
- `NEXT_PUBLIC_GTM_ID` — optional GTM container, format `GTM-XXXXXXX`

Paid checkout hooks: `CHATGPT_MASTERCLASS_CHECKOUT_URL`, `CLAUDE_MASTERCLASS_CHECKOUT_URL`, or shared `MASTERCLASS_CHECKOUT_URL`. No payment provider was present in the audited repository, so Phase 1 does not invent gateway credentials. A production payment integration still requires an authenticated server-side order flow and verified payment webhook before `purchase` is treated as completed payment.

## Tracking
Browser events are pushed to `window.dataLayer`. If the existing Meta Pixel is loaded, supported signals are emitted to Meta browser tracking. Important funnel events are also persisted to PostgreSQL `FunnelEvent`.

Events include `view_masterclass_offer`, `masterclass_cta_click`, `registration_submit_click`, `generate_lead`, `begin_checkout`, `purchase`, `whatsapp_cta_click`, `community_click`, `join_group`, `masterclass_joined`, `masterclass_30m`, `masterclass_60m`, `masterclass_offer_seen`, `workshop_cta_click`, `workshop_purchase`, `workshop_attended`, `qualify_lead`, `working_lead`, `core_offer_seen`, `close_convert_lead`, `close_unconvert_lead`, and `refund`.

`generate_lead` is persisted server-side by `/api/funnel/register`; the browser copy is sent only to dataLayer/Meta to avoid duplicate first-party rows.

Attribution captures visitor ID, UTM source/medium/campaign/content/term, Meta campaign ID, ad set ID, ad ID, `fbclid`, landing variant, referrer, funnel product, offer mode, entry price and batch ID. Use `campaign_id`, `adset_id`, and `ad_id` in ad URLs for stable reporting.

## Lead system
The existing `Lead` model and NeoDove integration remain in place. Funnel detail is stored in `Lead.notes`. Sources: `funnel:chatgpt:free`, `funnel:chatgpt:paid`, `funnel:claude:free`, `funnel:claude:paid`.

## Database
Apply `prisma/migrations/20260820231500_funnel_events/migration.sql` before live traffic, then regenerate Prisma Client as required by deployment.

## Dashboard
`/admin/funnel-dashboard` is protected by the existing admin session. Phase 1 shows first-party events only. It deliberately does not fabricate ad spend, CAC or ROAS; those require a verified Meta Ads reporting source.

## WhatsApp
The audited repository did not expose the authenticated API contract for `whatsapp.sikhadenge.in`, so Phase 1 does not guess endpoints or secrets. Critical live-class joining instructions should be sent directly to the registered WhatsApp number; Community membership should be an engagement layer, not the only delivery path.

## Assets
Funnel assets are isolated under `public/funnels/shared/`. Phase 1 reuses verified repository-owned SikhaDenge logo and mentor media instead of introducing unverified testimonial or third-party brand artwork.

## Claims
Pages do not claim guaranteed income, jobs, salary growth, business results, or affiliation with OpenAI/Anthropic. Future testimonials should only use verified learner records and consented media.
