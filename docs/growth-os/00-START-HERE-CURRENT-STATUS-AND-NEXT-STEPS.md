# SikhaDenge Growth OS — Current State, Locked Decisions & Master Roadmap

> **Document purpose:** canonical handoff for future ChatGPT/Codex sessions.
>
> **As-of:** 2026-08-10 20:34 IST
>
> **Repository:** `maihoonankitsingh/sikhadenge-website`
>
> **Primary production branch:** `live-clean-sync-20260424`
>
> **Documentation branch base observed on GitHub:** `911a2aa5306bb048b9c46d9901f6ac328269b0a5`

---

## 0. How a new chat must use this document

This document is a **handoff and decision lock**, not permission to skip verification.

A new chat must:

1. Read this file first.
2. Verify the current remote production-branch SHA before doing any work.
3. If production runtime/VPS status matters, verify the **deployed** SHA/build/PM2 separately. Do not assume the remote branch is already deployed.
4. Treat historical PASS results as historical checkpoints unless the same runtime/source is still deployed.
5. Never call missing evidence PASS.
6. Use `REQUIRES_VERIFICATION` whenever evidence is missing or stale.
7. Do not merge or deploy without explicit approval.
8. Do not make direct development edits in the production checkout; use an isolated branch/worktree.

---

# 1. Critical correction: the master roadmap is 15 phases, not 18

The authoritative SikhaDenge Growth OS roadmap is:

```text
PHASE 0 through PHASE 14
TOTAL MASTER PHASES = 15
```

Earlier conversation references to “18 phases” were a misunderstanding and must **not** be used as the master roadmap.

There is also a separate website analytics/remediation sub-track that used its own `Phase 0`, `Phase 1`, etc. numbering. That sub-track must not be confused with the Growth OS master roadmap.

---

# 2. Current repository reference vs last fully runtime-verified analytics checkpoint

## 2.1 Current remote branch reference observed on 2026-08-10

GitHub branch:

```text
live-clean-sync-20260424
```

Observed remote SHA:

```text
911a2aa5306bb048b9c46d9901f6ac328269b0a5
```

Observed latest commit message at that SHA:

```text
Restore Meta conversion consent argument compatibility
```

**Important:** this is a remote Git reference. It is not, by itself, proof that the VPS currently runs this exact SHA.

## 2.2 Last fully verified Phase 3 analytics production checkpoint

The website analytics runtime was fully browser-verified after PR #103 at:

```text
PHASE3_VERIFIED_HEAD=82a6ee1e4dcd1c6fde8da119bcc41c37d7c7109f
PHASE3_VERIFIED_BUILD_ID=XnMdcKQ9hHXaR4I6ntSDT
PHASE3_VERIFIED_PM2_PID=2184273
PHASE3_VERIFIED_PM2_RESTARTS=54
```

At that checkpoint:

```text
APP_PRECONSENT_NETWORK=PASS
ANALYTICS_ONLY_GA4_ID=PASS
ANALYTICS_ONLY_GA_PAGEVIEW=PASS
ANALYTICS_ONLY_META_BLOCKED=PASS
BOTH_GRANTED_INITIAL=PASS
SOFT_NAV_CONTEXT_PRESERVED=PASS
GA_SPA_PAGEVIEW=PASS
META_SPA_PAGEVIEW=PASS
GOOGLE_SINGLE_LOADER=PASS
META_SINGLE_LOADER=PASS
META_SINGLE_INIT=PASS
PAGEVIEW_STABLE_NO_DUPLICATE=PASS
PAGES_ROUTER_META_PRECONSENT=PASS
PAGES_ROUTER_META_POSTCONSENT=PASS
DB_MUTATION_BY_TEST=NO
LEAD_CREATED=NO
ORDER_CREATED=NO
PAYMENT_ATTEMPTED=NO
```

Because the remote branch subsequently advanced, a future analytics investigation must first re-establish the currently deployed runtime identity.

---

# 3. Major work completed before this handoff

## 3.1 Consent/tracking foundation

Established and verified historically:

- Consent policy version: `2026-07-15.1`.
- Consent storage key: `sd_consent_v1`.
- Default analytics consent: denied.
- Default advertising consent: denied.
- Google tracking is consent-aware.
- Meta tracking is consent-aware.
- Broken/invalid Segment loading was disabled/gated in the GA4 consent-runtime remediation.

### Locked principle

Advertising identifiers must not be blindly persisted or activated before the relevant consent state.

---

## 3.2 Payment safety hardening — historical closed checkpoint

PR #101 hardened store payment verification and purchase analytics.

Verified behavior included:

- Invalid Razorpay signature -> no paid-state mutation.
- Already-paid + same payment ID -> idempotent success.
- Already-paid + different payment ID -> conflict / preserve existing paid state.
- Verified transaction ID required before emitting purchase tracking.
- Meta Purchase event ID derived deterministically from transaction ID.
- GA4 `transaction_id` contract preserved.

No real payment test was used for that safety validation.

### Important later-change warning

The current remote branch contains later changes to `app/api/store/verify-payment/route.ts`. Therefore the old Phase 1 result remains a historical contract, but the **current implementation must be revalidated before relying on it for a new payment change**.

---

## 3.3 First-party attribution continuity — historical closed checkpoint

PR #102 fixed campaign/source continuity across website flows.

Fields preserved where supported include:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `utm_id`
- `utm_campaign_id`
- `utm_adset_id`
- `utm_ad_id`
- `fbclid`
- `gclid`
- `msclkid`
- landing URL/page
- referrer

Validated behavior included:

- first-touch storage
- last-touch storage
- current URL precedence over stored fallback
- internal-navigation continuity
- advertising-consent gating for click IDs
- Lead persistence
- StoreOrder persistence

No Prisma migration was required for the Phase 2 implementation.

---

## 3.4 GA4 + Meta runtime remediation — historical closed checkpoint

PR #103 fixed two confirmed defects:

1. Pages Router Meta Pixel could load/init/PageView before advertising consent.
2. App Router Meta PageView did not increment on SPA navigation.

The remediation:

- removed unconditional Meta loader/init/PageView/noscript tracking from `pages/_document.tsx`
- added consent-gated Pages Router Meta runtime
- added pathname/search-aware App Router Meta PageView tracking
- added route-key dedupe
- preserved one loader and one Meta init
- preserved GA4 behavior

Post-deploy deterministic browser verification passed at the Phase 3 checkpoint listed above.

---

# 4. Important work merged after the Phase 3 checkpoint

The remote production branch is now **47 commits ahead** of the Phase 3 checkpoint `82a6ee1...` in the observed Git comparison.

This section records major repository activity, but does **not** automatically certify live VPS deployment/runtime for every later commit.

## PR #104 — SEO/security/crawl hardening

Merged scope included:

- private `/dashboard/*` and legacy `/admin/*` protection improvements
- `/api/admin/*` protection at middleware level
- central dashboard session validator usage
- removal of reviewed browser/query-string admin-token fallbacks
- private-surface `noindex` / no-store behavior
- sitemap/indexability containment for high-risk generated route families
- SEO guard / CI safety checks
- non-destructive blog inventory classifier
- isolated blog Prisma generation support
- dynamic `/store` behavior for clean builds

The PR explicitly kept destructive blog indexability decisions out of scope pending real evidence.

## PR #105 — robots source-of-truth hotfix

Merged to remove duplicate `public/robots.txt` behavior so `app/robots.ts` remains the intended source of truth and the SEO guard prevents reintroduction.

## PR #106 — private redirect cache hotfix

Merged to force private auth redirects to no-store instead of exposing public cache headers.

## Later observed branch changes

The comparison from Phase 3 checkpoint to the current observed remote SHA also includes changes in areas such as:

- admin/dashboard pages and auth
- middleware
- SEO guard/workflow
- site map and robots
- blog inventory tooling
- payment verification
- `lib/metaConversions.ts`
- package scripts

The current observed remote HEAD is a later Meta conversion compatibility commit. A new session must inspect current code before assuming the Phase 3 implementation is byte-for-byte unchanged.

---

# 5. Existing analytics governance documents already in the repository

Current repository includes `docs/analytics/` with governance-oriented files such as:

- `README.md`
- `metric-constitution.md`
- `data-source-authority.md`
- `data-quality-guardrails.md`
- `funnel-stage-contract.md`
- `phase03-event-collection-contract.md`

These should be reused rather than creating competing KPI definitions.

---

# 6. Locked analytics statement

Until real GA4 reporting/data evidence proves otherwise, keep:

```text
GA4_NOT_SET_SOLE_ROOT_CAUSE=NOT_YET_PROVEN
```

Do **not** reinterpret successful website attribution/runtime fixes as proof that every GA4 `(not set)` value had one cause.

Possible eventual evidence-backed outcomes:

```text
GA4_NOT_SET_ROOT_CAUSE=PROVEN_SINGLE
GA4_NOT_SET_ROOT_CAUSES=PROVEN_MULTIPLE
GA4_NOT_SET_ROOT_CAUSE=REQUIRES_MORE_DATA
```

---

# 7. Separate analytics-remediation sub-track status

This is **not** the 15-phase master roadmap. It is the website analytics/remediation track used during August 2026.

```text
Analytics Phase 0 — Consent foundation                    CLOSED historically
Analytics Phase 1 — Payment safety                       CLOSED historically
Analytics Phase 2 — Attribution continuity               CLOSED historically
Analytics Phase 3 — GA4/Meta runtime verification        CLOSED at verified checkpoint
Analytics Phase 4 — Real GA4 data diagnosis              PENDING / CURRENT NEXT ANALYTICS WORK
```

## Analytics Phase 4 objective

Read real GA4 data and prove:

- where `(not set)` occurs
- which dimension/scope is affected
- which events are affected
- historical vs current prevalence
- pre/post remediation difference
- client vs server/Measurement Protocol differences
- whether one or multiple causes exist

### Required Phase 4 discipline

- Start read-only.
- Verify numeric GA4 Property ID.
- Do not confuse Measurement ID with Property ID.
- Distinguish `(direct)`, `(none)`, `(not set)`, `Unassigned`, empty/null.
- Separate user-, session-, and event-scoped dimensions.
- Do not generate fake purchase/lead data merely to fill reports.
- Do not patch code until a defect is proven from real evidence.

---

# 8. Growth OS master roadmap — Phase 0 to Phase 14

## Phase 0 — Existing System Audit

### Goal
Establish ground truth before designing or automating anything.

### Scope

- repositories / branches / deployments
- PM2 / Nginx / cron / workers
- databases and Prisma schemas
- website forms and APIs
- GA4 / Meta / attribution
- WhatsApp / masterclass / Zoom
- payments
- dashboard routes and data sources
- backups / secrets / security controls

### Current maturity
**SUBSTANTIALLY DONE historically, but requires periodic reconciliation.**

A fresh master audit is required whenever major parallel work advances the branch significantly, as happened after Phase 3.

---

## Phase 1 — KPI & Measurement Definitions

### Goal
Make every business metric mean exactly one governed thing.

### Required artifacts

- KPI registry
- formula
- grain
- source-of-truth
- owner
- filters/exclusions
- timezone
- freshness SLA
- attribution window
- reconciliation policy

### Existing foundation
`docs/analytics/metric-constitution.md`, `data-source-authority.md`, guardrails, funnel contracts.

### Current maturity
**PARTIAL / FOUNDATION PRESENT.**

### Remaining
Reconcile these contracts against all Growth OS domains: CRM, workshop, counsellor, revenue, LMS, marketing and AI.

---

## Phase 2 — Identity & Attribution

### Goal
Connect one human journey across anonymous web visit, lead, workshop, counsellor, payment and student lifecycle.

### Target identity chain

```text
anonymous visitor
  -> web session
  -> lead
  -> workshop registration
  -> workshop attendance
  -> counsellor activity
  -> admission/enrollment
  -> payment/order
  -> student
```

### Existing foundation
Website attribution continuity is strongly improved and historically validated.

### Current maturity
**PARTIAL / WEBSITE ATTRIBUTION STRONGER; CANONICAL CROSS-SYSTEM IDENTITY GRAPH STILL BROADER THAN CURRENT PROOF.**

### Remaining
Canonical person/customer ID, identity resolution, source precedence, duplicate handling, WhatsApp/Zoom/payment/LMS cross-linking.

---

## Phase 3 — Event Infrastructure

### Goal
Standardize all important business actions as reliable events.

### Target event examples

- `page_view`
- `lead_created`
- `lead_qualified`
- `workshop_registered`
- `workshop_attended`
- `counsellor_contacted`
- `checkout_started`
- `payment_captured`
- `refund_created`
- `enrollment_created`

### Required infrastructure

- central event contract
- schema versioning
- idempotency
- durable outbox/queue
- retry
- dead-letter handling
- replay
- monitoring
- privacy rules

### Existing foundation
Analytics event contracts exist; website and multiple operational event flows exist.

### Current maturity
**PARTIAL.** Full central durable Growth OS event backbone is not yet proven.

---

## Phase 4 — CRM & Geo Intelligence

### Goal
Operate leads through an auditable lifecycle with ownership, next action and geographic intelligence.

### Required features

- canonical lead profile
- stage/status history
- owner history
- activities
- next action
- follow-up SLA
- lost reason
- qualification fields
- city/state/region normalization
- geo conversion/revenue analytics

### Current maturity
**PARTIAL.** Leads/admissions surfaces exist; fully governed CRM history/geo intelligence is not yet proven end-to-end.

---

## Phase 5 — Workshop Engine

### Goal
Turn masterclasses/workshops into first-class operational entities.

### Required lifecycle

```text
workshop created
-> registration
-> reminder
-> Zoom/community participation
-> attendance/no-show
-> replay/follow-up
-> counselling
-> enrollment/revenue
```

### Existing foundation
Masterclass registration, automation and Zoom-related flows exist in the wider repository history.

### Current maturity
**PARTIAL / STRONG FOUNDATION, FULL GROWTH-OS LIFECYCLE STILL TO BE RECONCILED.**

---

## Phase 6 — Counsellor Sales System

### Goal
Give counsellors and managers a real sales operating system.

### Required

- lead assignment
- counsellor queue
- callback/follow-up tasks
- activities / calls / WhatsApp notes
- disposition
- next action
- lost reason
- payment/enrollment handoff
- counsellor SLA
- conversion/revenue performance
- RBAC

### Current maturity
**EARLY / PARTIAL; full governed sales workspace not proven.**

---

## Phase 7 — Payments & Revenue

### Goal
Create finance-grade truth beyond a simple paid-order flag.

### Required entities

- Order
- Payment Attempt
- Captured Payment
- Failed Payment
- Refund
- Chargeback
- Settlement
- Gateway Fee
- GST/tax
- Invoice
- installment/EMI
- affiliate commission
- contribution margin

### Existing foundation
Payment verification hardening and purchase analytics contracts exist.

### Current maturity
**PARTIAL.** Broader finance reconciliation and margin layer remain.

---

## Phase 8 — LMS & Student Analytics

### Goal
Track the post-enrollment learning journey and outcomes.

### Required

- student master
- course
- batch
- enrollment
- class session
- attendance
- activation
- progress
- assessments
- completion
- certificate
- outcome
- retention
- referral/re-enrollment

### Current maturity
**PARTIAL.** Dashboard/LMS-related routes exist, but full trusted student outcome analytics are not yet proven.

---

## Phase 9 — Data Warehouse

### Goal
Create a governed analytical layer separate from transactional app tables.

### Target model

- staging/raw sources
- dimensions such as customer, campaign, course, geography
- facts such as lead, workshop, payment, attendance, enrollment
- incremental loads
- backfills
- lineage
- freshness monitoring
- data quality tests

### Current maturity
**NOT PROVEN / MAJOR FUTURE FOUNDATION.**

---

## Phase 10 — Dashboards / Command Centre

### Goal
Provide decision-focused founder and functional dashboards backed by governed metrics.

### Required views

- founder command centre
- acquisition funnel
- CRM
- workshop funnel
- counsellor sales
- payments/revenue
- LMS/student outcomes
- marketing
- data health

### Existing foundation
A broad `/dashboard` application already exists.

### Current maturity
**PARTIAL / UI SURFACE EXISTS; FINAL INFORMATION ARCHITECTURE AND SOURCE GOVERNANCE STILL TO BE BUILT.**

The companion frontend blueprint in this folder is the locked target UX/IA direction.

---

## Phase 11 — Performance Marketing Operations

### Goal
Connect ad spend to real downstream business outcomes.

### Required

- Meta/Google campaign hierarchy
- spend
- leads
- qualified leads
- attendance
- enrollment
- captured revenue
- refunds
- CAC / CPQL / ROAS / contribution margin
- city/audience performance
- creative metadata and revenue outcome
- offline conversion feedback

### Current maturity
**PARTIAL FOUNDATION.** GA4/Meta tracking exists; full spend-to-margin operating layer remains.

---

## Phase 12 — Experimentation Platform

### Goal
Run measurable experiments instead of informal page changes.

### Required

- experiment ID
- hypothesis
- primary metric
- guardrails
- variants
- assignment
- exposure event
- sample size
- date window
- result
- decision log

### Current maturity
**FUTURE / NOT YET PROVEN AS A GOVERNED PLATFORM.**

---

## Phase 13 — AI Marketing & Revenue Intelligence

### Goal
Use trustworthy data to make recommendations, predictions and alerts.

### Target capabilities

- lead conversion probability
- attendance probability
- enrollment probability
- expected revenue
- refund risk
- best contact time
- recommended counsellor
- creative intelligence
- anomaly detection
- budget recommendations
- daily founder brief

### Rule
AI comes **after** stable identity, KPIs, events and warehouse data. Do not automate important money-moving decisions without human approval initially.

### Current maturity
**FUTURE / DEPENDENT ON EARLIER DATA FOUNDATIONS.**

---

## Phase 14 — Privacy, Governance & Reliability

### Goal
Make the whole Growth OS production-grade and governable.

### Required

- consent records
- PII minimization/encryption
- RBAC
- audit logs
- secrets rotation
- API rate limits
- webhook signature validation
- retention/deletion workflow
- backups + restore tests
- CI/tests
- security headers
- observability
- SLOs
- incident response
- deployment provenance
- worker reliability

### Existing foundation
Auth/SEO private-surface hardening, no-store redirects, SEO safety guard and several consent/security controls exist.

### Current maturity
**PARTIAL.** Full enterprise-grade governance/reliability remains broader than current proof.

---

# 9. Recommended execution order from here

Do not try to “finish all 15 phases” sequentially in a vacuum. Use dependencies.

## Immediate next workstream A — current-state reconciliation

Because the branch advanced substantially after the last analytics checkpoint:

1. verify current remote SHA
2. verify current deployed VPS SHA/build/PM2
3. compare deployed source to remote
4. confirm which PR104/105/106/later changes are actually live
5. update this document when runtime identity changes materially

## Immediate next workstream B — Analytics Phase 4 real-data diagnosis

Read-only first:

1. establish GA4 Data API access
2. verify numeric Property ID
3. establish exact date windows
4. baseline `(not set)`
5. segment by session/user/event scope
6. inspect important events including purchase without generating fake purchases
7. compare pre/post attribution/runtime fixes
8. classify root causes

## Immediate next workstream C — Growth OS frontend architecture

Use the companion frontend blueprint:

```text
docs/growth-os/02-FRONTEND-PRODUCT-BLUEPRINT.md
```

Do not redesign random pages independently. Lock shell/navigation/data-source contracts first.

## Foundational backend sequence after reconciliation

Priority dependency chain:

```text
KPI definitions
-> canonical identity
-> event contracts
-> CRM/workshop/sales lifecycle
-> finance/student truth
-> warehouse
-> dashboards
-> performance marketing
-> experiments
-> AI
-> governance/reliability hardening
```

---

# 10. Safety rules locked for future sessions

## Source/deployment safety

- No direct development edits in production checkout.
- Use isolated worktree/feature branch.
- Verify exact base SHA.
- Review exact diff.
- Build/test before PR.
- Open draft PR by default.
- Merge only after explicit approval.
- Deploy only after separate explicit approval.
- Restart only the intended PM2 service.
- Never restart unrelated services.

## Evidence discipline

- `PASS` requires evidence.
- Missing/stale proof = `REQUIRES_VERIFICATION`.
- Historical reports remain historical; do not silently rewrite them.
- Test-harness failure is not automatically a production defect.
- Correlation is not root-cause proof.

## Payments

- No real payment test unless explicitly approved.
- Do not mutate paid state in a diagnostic.
- Preserve idempotency and transaction identity contracts.

## Analytics

- Keep `GA4_NOT_SET_SOLE_ROOT_CAUSE=NOT_YET_PROVEN` until real GA4 evidence changes it.
- Do not contaminate production analytics unnecessarily.
- When browser testing, intercept vendor delivery when the test goal does not require a real hit.

## Database

- No Prisma migration unless schema change is genuinely required and separately reviewed.
- Prefer read-only inspection before any DB write.
- Controlled synthetic rows must be uniquely identifiable and cleaned if a test requires them.

---

# 11. New-chat starting prompt

A future session can be started with:

> Read `docs/growth-os/01-CURRENT-STATE-AND-MASTER-ROADMAP.md` and `docs/growth-os/02-FRONTEND-PRODUCT-BLUEPRINT.md` from the current SikhaDenge repository branch. Treat them as the handoff baseline, but first verify current remote and deployed runtime identity. Do not repeat questions already answered in the docs. Use PASS/FAIL/REQUIRES_VERIFICATION evidence gates. Do not merge or deploy without explicit approval.

---

# 12. Status summary

```text
MASTER_GROWTH_OS_PHASES=15
MASTER_PHASE_RANGE=0..14

ANALYTICS_FOUNDATION=STRONG_HISTORICAL_CHECKPOINT
PAYMENT_SAFETY=HISTORICALLY_HARDENED
FIRST_PARTY_ATTRIBUTION=HISTORICALLY_VALIDATED
GA4_META_RUNTIME=HISTORICALLY_VALIDATED_AT_PHASE3_CHECKPOINT
GA4_REAL_DATA_ROOT_CAUSE_DIAGNOSIS=PENDING

CURRENT_REMOTE_BRANCH_REFERENCE=911a2aa5306bb048b9c46d9901f6ac328269b0a5
CURRENT_VPS_DEPLOYED_SHA=REQUIRES_FRESH_VERIFICATION

FRONTEND_FINAL_IA=DEFINED_IN_COMPANION_DOC
WAREHOUSE=NOT_YET_PROVEN
EXPERIMENT_PLATFORM=NOT_YET_PROVEN
AI_INTELLIGENCE=DEPENDENT_ON_DATA_FOUNDATIONS

GA4_NOT_SET_SOLE_ROOT_CAUSE=NOT_YET_PROVEN
```
