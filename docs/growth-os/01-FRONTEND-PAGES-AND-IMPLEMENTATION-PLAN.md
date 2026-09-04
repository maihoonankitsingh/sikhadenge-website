# SikhaDenge Growth OS — Frontend Product Blueprint

> **Document purpose:** lock the target frontend information architecture, page responsibilities, reuse strategy and implementation order for future sessions.
>
> **As-of:** 2026-08-10 20:34 IST
>
> **Companion handoff:** `docs/growth-os/01-CURRENT-STATE-AND-MASTER-ROADMAP.md`

---

# 1. Product direction

The Growth OS frontend should **not** mirror the 15 master phases as 15 isolated technical pages.

The user-facing dashboard should organize work by business job-to-be-done:

```text
Monitor business
-> understand acquisition
-> manage leads/workshops/sales
-> reconcile revenue
-> manage students/learning
-> optimize marketing
-> run experiments
-> receive AI intelligence
-> monitor data quality/governance
```

Target:

```text
MAIN SIDEBAR DESTINATIONS = 16
DETAIL / DRILL-DOWN ROUTES = approximately 8–15 as domains mature
AUTH / UTILITY ROUTES = separate from core navigation
```

The exact number of detail routes can grow without increasing sidebar complexity.

---

# 2. Current frontend facts observed in repository

## Existing shell

Current `app/dashboard/layout.tsx` already provides a useful base:

- authenticated dashboard layout
- left sidebar
- founder/admin context
- top workspace header
- responsive two-column layout
- `SidebarNav` component

This shell should be **evolved**, not blindly replaced.

## Existing sidebar problems

Current `app/dashboard/_components/SidebarNav.tsx` contains useful routes, but the navigation is not yet a final Growth OS information architecture.

Observed issues include:

- duplicate `Employees`
- duplicate `Attendance`
- duplicate `Students`
- mixed business domains without clear grouping
- masterclass Zoom join exposed as a top-level navigation item
- no final Command Centre / CRM / Counsellor Sales / Marketing / Experiments / AI / Data Health grouping

Therefore the current sidebar should be treated as **legacy navigation input**, not the final nav specification.

## Existing useful route families

Current code/history contains useful dashboard surfaces such as:

- `/dashboard`
- `/dashboard/leads`
- `/dashboard/masterclass`
- `/dashboard/masterclass-zoom-join`
- `/dashboard/admissions`
- `/dashboard/students`
- `/dashboard/batches`
- `/dashboard/payments`
- `/dashboard/finance`
- `/dashboard/attendance`
- `/dashboard/lms`
- `/dashboard/influencer`
- `/dashboard/affiliate`
- `/dashboard/certificates`
- `/dashboard/employees`
- `/dashboard/team`
- `/dashboard/reports`
- `/dashboard/settings`
- `/dashboard/website-analytics`
- other admin/utility/detail routes

Do not delete these in bulk. First classify each as:

```text
KEEP
REUSE_AND_REDESIGN
MERGE_INTO_NEW_DOMAIN
DETAIL_ROUTE_ONLY
LEGACY_REDIRECT
REMOVE_AFTER_PROOF
```

---

# 3. Final navigation architecture

## Group A — Overview

1. **Command Centre**
2. **Growth OS Overview**
3. **Analytics**

## Group B — Customers & Sales

4. **CRM / Leads**
5. **Workshops**
6. **Counsellor Sales**
7. **Admissions**

## Group C — Revenue

8. **Payments & Revenue**

## Group D — Learning

9. **Students**
10. **LMS & Attendance**

## Group E — Growth

11. **Marketing**
12. **Experiments**
13. **AI Intelligence**

## Group F — System

14. **Data Health**
15. **Reports**
16. **Settings & Governance**

---

# 4. Page-by-page specification

## Page 1 — Command Centre

### Recommended route

```text
/dashboard
```

### Audience
Founder / senior operator.

### Purpose
Answer in one screen:

- What happened today?
- Are we on target?
- Where is the biggest funnel leak?
- Is anything broken?
- What requires action now?

### Top KPI strip

Suggested cards:

- Leads today
- Qualified leads
- Workshop registrations
- Workshop attendance
- Admissions/enrollments
- Collected revenue
- CAC / CPQL when trustworthy
- Refunds / payment failures

Every metric must include:

- current value
- comparison period
- freshness
- source badge
- data-quality status

### Main modules

1. Funnel snapshot
2. Revenue trend
3. Marketing spend/outcome snapshot
4. Workshop status
5. Counsellor SLA / backlog
6. Data-health alerts
7. AI/operator recommendations later

### Critical rule
Do not show fake “executive” numbers. If a source is not governed yet, show a clear unavailable/partial state.

---

## Page 2 — Growth OS Overview

### Recommended route

```text
/dashboard/growth-os
```

### Purpose
Show system maturity and business architecture, not daily operations.

### Sections

- Phase 0–14 roadmap
- domain readiness
- source-of-truth status
- key integration status
- open blockers
- data maturity
- operational readiness

### Suggested status vocabulary

```text
NOT_STARTED
FOUNDATION_PRESENT
PARTIAL
OPERATIONAL
VERIFIED
BLOCKED
REQUIRES_VERIFICATION
```

### Use case
This is where the founder/new technical session can understand **what is built vs what is still architectural work**.

---

## Page 3 — Analytics

### Recommended canonical route

```text
/dashboard/analytics
```

Existing `/dashboard/website-analytics` can initially redirect or be reused internally after audit.

### Purpose
Traffic and product/funnel measurement.

### Tabs

1. Overview
2. Acquisition
3. GA4 diagnostics
4. Attribution
5. Pages / Landing pages
6. Events
7. Conversion funnel
8. Data quality

### Key dimensions

- source / medium
- campaign
- channel group
- landing page
- city/region
- device/browser
- first user attribution
- session attribution

### Locked GA4 diagnostic requirement
Include explicit `(not set)` monitoring only after real GA4 Property/Data API access is verified.

Never merge:

- `(direct)`
- `(none)`
- `(not set)`
- `Unassigned`
- null/empty

into one “unknown” bucket without explanation.

---

## Page 4 — CRM / Leads

### Recommended route

```text
/dashboard/leads
```

Reuse the existing route to minimize churn.

### Purpose
Operate the complete lead lifecycle.

### Core table fields

- lead/person
- phone/email
- source/medium/campaign
- landing page
- city/state
- current stage
- owner
- last activity
- next action
- SLA state
- qualification
- created at

### Filters

- date
- stage
- owner
- source/campaign
- city/state
- workshop
- qualification
- stale/SLA breach

### Lead detail route

```text
/dashboard/leads/[id]
```

### Lead detail sections

- identity
- first/last attribution
- timeline
- status history
- owner history
- WhatsApp/call/activity log
- workshop history
- payment/enrollment links
- notes
- next action

### Required future principle
Do not rely on one mutable `status` field as the entire CRM history.

---

## Page 5 — Workshops

### Recommended route

```text
/dashboard/workshops
```

Existing `/dashboard/masterclass` should be reused or redirected after migration.

### Purpose
Operate masterclass/workshop lifecycle.

### List fields

- workshop/session ID
- title
- mentor
- date/time
- capacity
- registrations
- attendance
- no-show
- conversion
- revenue
- reminder state
- Zoom/community status

### Workshop detail

```text
/dashboard/workshops/[id]
```

### Detail tabs

- Overview
- Registrations
- Attendance
- Reminders/messages
- Zoom/community
- Counselling follow-up
- Conversion/revenue
- Issues/logs

### Existing Zoom join page
`/dashboard/masterclass-zoom-join` should ultimately become a detail/tool action, not permanent top-level navigation.

---

## Page 6 — Counsellor Sales

### Recommended route

```text
/dashboard/counsellor-sales
```

### Purpose
Operate sales follow-up and accountability.

### Views

- My Queue
- Team Queue
- Due Today
- Overdue
- High Intent
- Workshop Attendees
- Payment Pending
- Lost / recovery

### KPIs

- assigned leads
- first-response SLA
- contacted
- qualified
- counselling sessions
- conversions
- collected revenue
- lost reasons
- follow-up backlog

### Counsellor detail

```text
/dashboard/counsellors/[id]
```

### Permissions
Founder/admin can see team; counsellor should only see authorized scope.

---

## Page 7 — Admissions

### Recommended route

```text
/dashboard/admissions
```

Reuse existing route if its data contract is valid.

### Purpose
Bridge sale to official enrollment.

### Sections

- pending admissions
- documents/details pending
- payment status
- enrollment handoff
- batch/course assignment
- admission completion
- exceptions

### Avoid
Do not make Admissions a duplicate of CRM or Students. It is the controlled transition from conversion to enrolled learner.

---

## Page 8 — Payments & Revenue

### Recommended canonical route

```text
/dashboard/revenue
```

Existing `/dashboard/payments` and `/dashboard/finance` can feed/migrate into this domain.

### Tabs

1. Revenue overview
2. Orders
3. Payments
4. Failed attempts
5. Refunds
6. Settlements
7. Fees/tax
8. Reconciliation
9. Affiliate commissions

### KPIs

- gross order value
- captured revenue
- refunds
- net collected revenue
- gateway fees
- settlement pending
- payment success rate
- reconciliation mismatch

### Payment detail

```text
/dashboard/payments/[id]
```

### Safety
Never expose payment secrets/signatures. Mask sensitive IDs where appropriate.

---

## Page 9 — Students

### Recommended route

```text
/dashboard/students
```

Reuse existing route.

### Purpose
Canonical enrolled-student view.

### Student list fields

- student identity
- admission/enrollment
- course
- batch
- activation
- attendance
- progress
- payment state
- completion
- risk/status

### Student detail

```text
/dashboard/students/[id]
```

### Tabs

- Profile
- Enrollment
- Payments
- Attendance
- Progress
- Assessments
- Certificates
- Outcomes
- Activity

---

## Page 10 — LMS & Attendance

### Recommended route

```text
/dashboard/lms
```

### Purpose
Academic operations.

### Tabs

- Courses
- Batches
- Sessions/classes
- Attendance
- Progress
- Assessments
- Certificates
- Completion/outcomes

### Existing routes to fold in

- `/dashboard/batches`
- `/dashboard/attendance`
- `/dashboard/certificates`

Keep detail routes as necessary, but reduce top-level sidebar noise.

---

## Page 11 — Marketing

### Recommended route

```text
/dashboard/marketing
```

### Purpose
Connect ad spend to downstream business outcomes.

### Tabs

1. Overview
2. Meta Ads
3. Google Ads
4. Campaigns
5. Ad sets / audiences
6. Creatives
7. Geography
8. Influencer
9. Affiliate
10. Offline conversion feedback

### KPIs

- spend
- impressions/clicks where available
- leads
- qualified leads
- registrations
- attendance
- enrollments
- revenue
- refunds
- CPL
- CPQL
- CAC
- ROAS
- contribution margin

### Existing routes to merge into domain

- `/dashboard/influencer`
- `/dashboard/affiliate`

These can remain functional detail routes but should no longer be isolated product silos in navigation.

---

## Page 12 — Experiments

### Recommended route

```text
/dashboard/experiments
```

### Purpose
Operate A/B and controlled experiments.

### Experiment list

- ID
- hypothesis
- surface
- status
- variants
- primary metric
- guardrails
- sample size
- start/end
- result
- decision

### Experiment detail

```text
/dashboard/experiments/[id]
```

### Requirement
Do not launch a serious experiment framework before stable assignment identity and event measurement exist.

---

## Page 13 — AI Intelligence

### Recommended route

```text
/dashboard/ai-intelligence
```

### Purpose
Surface recommendations and anomalies after data quality is trustworthy.

### Future modules

- Founder daily brief
- lead propensity
- attendance propensity
- enrollment propensity
- revenue forecast
- refund risk
- counsellor recommendations
- best contact time
- creative insights
- anomaly alerts

### Governance
Recommendations should show:

- supporting signals
- freshness
- confidence
- intended action
- approval requirement

Do not allow autonomous budget/payment/customer-impact actions by default.

---

## Page 14 — Data Health

### Recommended route

```text
/dashboard/data-health
```

### Purpose
Answer: “Can we trust the dashboard?”

### Sections

- source freshness
- pipeline status
- event volume anomalies
- attribution coverage
- unmatched identities
- payment reconciliation
- warehouse jobs
- API failures
- queue backlog
- schema/contract violations
- data-quality tests

### Status model

```text
HEALTHY
DEGRADED
STALE
FAILED
UNKNOWN
```

### Detail route

```text
/dashboard/data-health/jobs/[id]
```

---

## Page 15 — Reports

### Recommended route

```text
/dashboard/reports
```

Reuse existing route after audit.

### Report families

- daily founder report
- weekly business review
- monthly business review
- acquisition report
- workshop report
- counsellor performance
- payments/revenue
- student/LMS outcomes
- marketing performance
- data-quality report

### Requirements

- exact date range
- generated timestamp
- source/freshness note
- export where appropriate
- no unaudited metric duplication

---

## Page 16 — Settings & Governance

### Recommended route

```text
/dashboard/settings
```

### Tabs

1. Users
2. Roles & permissions
3. Integrations
4. Consent/privacy
5. Metric definitions
6. Data sources
7. Alerts
8. Audit log
9. Environment/status — presence only, no secrets
10. Retention / governance

### Existing admin/employee/team routes
Depending on product requirements, `/dashboard/employees`, `/dashboard/team`, `/dashboard/admin-control`, and related pages should be reviewed and either moved under Settings/Governance or retained as authorized detail modules.

---

# 5. Recommended final sidebar

```text
SikhaDenge Growth OS

OVERVIEW
  Command Centre
  Growth OS
  Analytics

CUSTOMERS & SALES
  CRM / Leads
  Workshops
  Counsellor Sales
  Admissions

REVENUE
  Payments & Revenue

LEARNING
  Students
  LMS & Attendance

GROWTH
  Marketing
  Experiments
  AI Intelligence

SYSTEM
  Data Health
  Reports
  Settings & Governance
```

Top-level nav should stay stable even if detail routes increase.

---

# 6. Shared dashboard shell specification

## Desktop shell

Recommended:

- collapsible sidebar
- expanded width approximately 260–280px
- collapsed icon rail approximately 68–76px
- sticky top bar
- responsive content canvas
- maximum width configurable per page; dense data tables can use full width

## Top bar

Global controls:

- date range
- comparison period
- workspace/business scope if needed
- data freshness indicator
- global alerts
- search / command palette later
- current role/user

## Page header

Every page should support:

- title
- short purpose statement
- freshness/status
- primary action
- secondary filters/actions

---

# 7. Shared component system

Build reusable components before copying card/table markup across pages.

## Core components

- `MetricCard`
- `MetricStrip`
- `TrendChart`
- `FunnelChart`
- `SourceBadge`
- `FreshnessBadge`
- `DataQualityBadge`
- `StatusBadge`
- `FilterBar`
- `DateRangePicker`
- `ComparisonPicker`
- `DataTable`
- `EmptyState`
- `ErrorState`
- `StaleDataState`
- `DrilldownDrawer`
- `ActivityTimeline`
- `OwnerChip`
- `AttributionSummary`
- `ExportAction`

## Table requirements

- server-side pagination for large datasets
- stable sorting
- filters reflected in URL where practical
- row selection only when a real bulk action exists
- clear empty state
- loading skeleton
- export permissions
- no hidden PII leakage

---

# 8. Visual design direction

The dashboard should feel like a serious operating system, not a marketing landing page.

## Design principles

- light neutral canvas
- high information density without clutter
- strong typographic hierarchy
- restrained status colors
- consistent spacing
- data-first cards
- clear drill-down affordances
- sticky filters for long tables
- no decorative gradients where they harm readability
- charts only when they answer a decision question

## Accessibility

- keyboard navigation
- visible focus state
- semantic headings
- accessible dialogs
- sufficient color contrast
- do not encode status by color alone
- table labels and responsive fallback

---

# 9. Responsive behavior

## Desktop
Full sidebar + multi-column cards/tables.

## Tablet
Collapsible sidebar/drawer; 2-column KPI layout; tables may horizontally scroll.

## Mobile
Focus on operational essentials:

- KPI strip becomes stacked/scrollable
- filters in drawer/sheet
- tables convert to compact cards only when necessary
- primary action remains visible
- no attempt to reproduce desktop density exactly

---

# 10. Role-based UX

Do not rely only on backend authorization; frontend navigation should also respect scope.

Suggested roles:

```text
FOUNDER
ADMIN
MARKETING
COUNSELLOR
FINANCE
OPERATIONS
ACADEMIC / TUTOR
READ_ONLY_ANALYST
```

Examples:

- counsellor: CRM + own queue + authorized workshop/admission detail
- finance: revenue/reconciliation, limited PII where possible
- marketing: analytics/marketing/experiments, not admin user management
- academic: students/LMS, not payment internals
- founder/admin: broad access

Backend authorization remains authoritative.

---

# 11. Data contract rule for every frontend page

Before calling a page “complete”, document:

```text
PRIMARY_SOURCE=
SECONDARY_SOURCE=
METRIC_CONTRACT=
FRESHNESS_SLA=
EMPTY_STATE=
ERROR_STATE=
PERMISSION_MODEL=
DRILLDOWN_KEY=
EXPORT_POLICY=
```

A polished UI with unknown source semantics is not complete.

---

# 12. Existing-route migration strategy

Do not perform a “big bang” route deletion.

For each current route:

1. inspect source
2. inspect actual data/API dependency
3. classify route
4. migrate UI/data contract
5. add redirect only when replacement is verified
6. monitor for internal links/bookmarks
7. remove legacy code later

## Example mapping

```text
/dashboard                     -> Command Centre
/dashboard/website-analytics   -> /dashboard/analytics (after migration)
/dashboard/leads               -> CRM / Leads
/dashboard/masterclass         -> /dashboard/workshops
/dashboard/masterclass-zoom-join -> Workshop detail/tool action
/dashboard/payments            -> Payments & Revenue detail/source
/dashboard/finance             -> Payments & Revenue
/dashboard/batches             -> LMS & Attendance
/dashboard/attendance          -> LMS & Attendance
/dashboard/certificates        -> LMS & Attendance
/dashboard/influencer          -> Marketing / Influencer
/dashboard/affiliate           -> Marketing / Affiliate
/dashboard/employees           -> Settings/Governance or Operations detail
/dashboard/team                -> Settings/Governance or Operations detail
```

Do not implement redirects until each target page is functional and verified.

---

# 13. Frontend implementation waves

## Wave 0 — Inventory & safety

- inventory all current dashboard routes
- inventory API/data source for each
- identify static/mock/prototype pages
- identify duplicate pages
- identify permission requirements
- capture screenshots before redesign

**No route deletion.**

---

## Wave 1 — Shell + information architecture

- redesign/clean `SidebarNav`
- grouped navigation
- collapse behavior
- global topbar
- date/freshness framework
- common page header
- permission-aware nav
- shared status badges

Acceptance:

- no duplicate nav items
- all existing required destinations reachable
- no auth regression
- mobile navigation works

---

## Wave 2 — Command Centre + Analytics

Build first because they validate the metric/source architecture.

- Command Centre
- Analytics
- Growth OS overview
- data freshness widgets

Do not fake missing metrics.

---

## Wave 3 — CRM / Workshop / Counsellor / Admissions

Build the revenue funnel operating surfaces:

- Leads
- lead detail/timeline
- Workshops
- workshop detail
- Counsellor Sales
- Admissions

This wave depends on canonical lifecycle/status contracts.

---

## Wave 4 — Revenue + Students + LMS

- Payments & Revenue
- reconciliation
- Students
- student detail
- LMS/attendance/batches/certificates

Requires finance/student identity contracts.

---

## Wave 5 — Marketing + Experiments + AI

- Marketing operating dashboard
- campaign/creative/geo drilldowns
- Experiments
- AI Intelligence

AI should initially be recommendation-only.

---

## Wave 6 — Data Health + Reports + Settings/Governance

- data health
- reports
- roles/permissions
- integrations
- audit logs
- governance controls

---

## Wave 7 — Legacy cleanup

Only after replacement proof:

- redirects
- remove duplicate route code
- remove prototype pages
- remove dead nav entries
- accessibility audit
- performance audit
- bundle review
- screenshot regression

---

# 14. Frontend completion criteria

A main page is not “done” just because it renders.

Each page must pass:

```text
ROUTE=PASS
AUTHORIZATION=PASS
SOURCE_CONTRACT=PASS
LOADING_STATE=PASS
EMPTY_STATE=PASS
ERROR_STATE=PASS
FRESHNESS_VISIBILITY=PASS
RESPONSIVE=PASS
ACCESSIBILITY=PASS
DRILLDOWN=PASS where applicable
NO_FAKE_DATA=PASS
NO_SECRET_EXPOSURE=PASS
```

For critical business pages also require:

```text
METRIC_RECONCILIATION=PASS
DATA_QUALITY_STATUS=VISIBLE
```

---

# 15. Technical guardrails

## Next.js

- preserve existing routing conventions unless migration value is clear
- prefer server-side data fetching for protected business data where appropriate
- avoid exposing secrets to client bundles
- use client components only where interaction requires them

## Performance

- no giant client-side all-record fetches
- pagination/virtualization for large tables
- lazy-load heavy charts
- avoid duplicate chart libraries
- measure bundle impact

## Security

- backend auth is authoritative
- no sensitive query-string tokens
- no secrets in HTML/client JS
- private pages remain noindex/no-store where required
- explicit logout/session behavior

## Analytics

Internal dashboard usage analytics should not pollute public marketing analytics unless intentionally designed and separated.

---

# 16. What NOT to do

Do not:

- create one sidebar page per backend table
- create one frontend page per Growth OS phase
- redesign every route simultaneously
- delete legacy routes before replacement validation
- show fake KPIs to make the dashboard look complete
- invent API data not yet available
- mix GA4 reporting metrics with internal DB metrics without source labels
- hide stale data
- put all roles behind one identical UI if permissions differ
- add AI actions before reliable data and approval controls

---

# 17. Recommended first frontend execution prompt for a new chat

> Read `docs/growth-os/01-CURRENT-STATE-AND-MASTER-ROADMAP.md` and `docs/growth-os/02-FRONTEND-PRODUCT-BLUEPRINT.md`. Then audit the current `app/dashboard` route tree, `app/dashboard/layout.tsx`, `app/dashboard/_components/SidebarNav.tsx`, and each page’s data source. Do not edit yet. Produce a route classification table with KEEP / REUSE_AND_REDESIGN / MERGE_INTO_NEW_DOMAIN / DETAIL_ROUTE_ONLY / LEGACY_REDIRECT / REMOVE_AFTER_PROOF. Verify current remote and deployed runtime identity first. Do not merge/deploy without explicit approval.

---

# 18. Locked frontend summary

```text
FRONTEND_PRODUCT=SikhaDenge Growth OS
MASTER_PHASES=15
FRONTEND_MAIN_NAV_PAGES=16

FRONTEND_STRATEGY=REUSE_AND_CONSOLIDATE
BIG_BANG_REWRITE=NO
BIG_BANG_ROUTE_DELETE=NO
FAKE_DATA=NO

CORE_GROUPS=
  OVERVIEW
  CUSTOMERS_AND_SALES
  REVENUE
  LEARNING
  GROWTH
  SYSTEM

FIRST_IMPLEMENTATION_WAVE=
  INVENTORY
  -> SHELL_AND_NAV
  -> COMMAND_CENTRE_AND_ANALYTICS

CURRENT_SIDEBAR=LEGACY_INPUT_NOT_FINAL_IA
CURRENT_DASHBOARD_SHELL=REUSE_CANDIDATE

AUTHORIZATION_REQUIRED=YES
DATA_SOURCE_CONTRACT_REQUIRED=YES
FRESHNESS_REQUIRED=YES
DATA_QUALITY_REQUIRED=YES

MERGE_REQUIRES_EXPLICIT_APPROVAL=YES
DEPLOY_REQUIRES_EXPLICIT_APPROVAL=YES
```
