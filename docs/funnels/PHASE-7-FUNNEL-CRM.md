# Phase 7 — Funnel CRM & Learner Lifecycle

## Purpose

Add an operational CRM layer for the AI Masterclass Funnel v2 without weakening the verified event/payment source of truth.

The CRM is not allowed to manually invent commercial conversions. Payment captures, refunds and funnel events remain authoritative for lifecycle and revenue.

## Admin routes

- `/admin/funnel-crm` — searchable/filterable learner queue
- `/admin/funnel-crm/[leadId]` — learner detail, CRM controls and complete audit timeline
- `/admin/funnel-dashboard` — aggregate commercial funnel analytics

## Data model

### `FunnelCrmProfile`

One optional operational profile per funnel lead:

- pipeline stage
- owner
- priority
- advisor status
- qualification
- lost reason
- next follow-up
- last contact timestamp
- updated-by admin identity

Missing profiles are treated as `new_lead / normal / not_started` in the CRM UI. The profile is created on first operational update.

### `FunnelCrmActivity`

Append-only admin audit records for:

- field changes
- internal notes
- actor/admin identity
- previous and new values
- timestamp

Both CRM tables are related to `Lead` with `ON DELETE CASCADE` so deleted leads do not leave orphan operational records.

## Derived lifecycle

Lifecycle is computed from funnel events and payment states, not from CRM dropdowns.

Progression includes:

1. Registered
2. WhatsApp sent / delivered / read
3. Paid masterclass entry where applicable
4. Masterclass joined / 30m / 60m
5. Workshop offer / checkout / purchase / attendance
6. AI Expert offer / checkout / verified enrollment

## Revenue

The learner detail derives:

- entry revenue
- workshop revenue
- core-program revenue
- verified refund value
- gross revenue
- net tracked revenue

Only verified first-party funnel events contribute to these values.

## Filters

The list API supports:

- free-text learner search
- ChatGPT / Claude
- Free / Paid entry
- operational pipeline stage
- owner
- priority
- advisor status
- overdue / next-24h / no follow-up date

## Security / integrity

- All CRM APIs require the existing admin session.
- CRM values use strict allowlists where applicable.
- Notes and text fields have explicit length limits.
- Learner IDs must resolve to a `funnel:*` source.
- CRM updates do not alter verified `FunnelPayment` records.
- CRM updates do not create fake purchase events.
- Every changed operational field is audit logged.

## Migration

`prisma/migrations/20260821094500_funnel_crm/migration.sql`

This migration must be rehearsed in a non-production environment before production activation.

## Release gate

Do not merge/deploy solely because the code compiles. Before production activation:

1. Full Funnel v2 CI must pass.
2. CRM migration must be rehearsed against a non-production PostgreSQL database.
3. Admin auth access must be verified for list/detail APIs and pages.
4. At least one end-to-end test learner should show consistent attribution, lifecycle, payments/refunds and CRM activity.
5. Existing production dependency advisory blocker remains independently tracked.
