# Phase 8 — Launch QA and Non-Production Rehearsal

## Scope

Phase 8 converts the Funnel v2 release process from compile-only confidence to evidence-backed launch gates.

This phase does **not** authorize production deployment, production database migration, Razorpay live mode, Meta live traffic, or a merge to `main`.

## Automated gates now in CI

The Funnel v2 CI workflow now provisions a real PostgreSQL 16 service and executes:

1. `npm ci`
2. payment / checkout-token security self-tests
3. production dependency audit visibility
4. `prisma generate`
5. `prisma migrate deploy` against a fresh PostgreSQL database
6. `npm run test:funnel-db`
7. full `npm run build` / Next.js production compile + TypeScript validation

## Migration-history finding and repair

The first fresh-database rehearsal proved that all historical migrations could apply successfully, but the current Prisma client failed immediately with:

`P2021: public.Influencer does not exist`

The current Prisma schema contains `Influencer`, `InfluencerSession`, `Lead.promoCode`, and `Lead.influencerId`, while those objects were not present in the visible historical migration chain.

Historical migration files were **not** edited.

A forward-only reconciliation migration was added:

`20260821100000_legacy_influencer_reconciliation`

The migration is intentionally non-destructive:

- `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`
- `CREATE TABLE IF NOT EXISTS`
- `CREATE INDEX IF NOT EXISTS`
- guarded foreign-key creation
- no table drops
- no destructive data rewrite

This supports both:

- a fresh database created entirely from migration history; and
- an existing database where influencer objects may already have been provisioned outside the recorded Prisma migration chain.

## Database smoke-test contract

`scripts/funnel-db-smoke.cjs` validates the current application schema after migration deploy by exercising:

- Influencer creation
- Lead creation with influencer relation
- CRM profile creation
- CRM activity creation
- FunnelEvent write/read
- FunnelPayment write/read
- CRM relation reads through Prisma
- cascade cleanup of CRM profile/activity when a Lead is deleted

External payment/provider network calls are deliberately excluded from this database test.

## Latest verified automated result

Funnel v2 CI run **#228** passed on branch head:

`3112d4db23e641d7cb94f63751622832c70fdbca`

Verified PASS stages:

- PostgreSQL service health
- dependency installation
- payment/token security tests
- Prisma client generation
- fresh-database migration deploy
- database integrity smoke test
- full Next.js production build / type-check

## External gates that remain unverified

These require actual test credentials or private service configuration and must not be marked PASS from code inspection alone.

### Razorpay Test Mode

Required:

- test credentials configured outside source control
- paid masterclass purchase
- implementation-workshop purchase
- ₹14,999 AI Expert purchase
- checkout-signature verification
- callback-loss recovery through webhook
- duplicate webhook replay
- failed payment path
- partial refund
- full refund
- full workshop refund before pending core-program capture
- final dashboard / CRM reconciliation

Required webhook events include the payment/order events used by the implementation plus `refund.processed`.

### Meta Test Events

Required:

- browser Pixel Lead event
- server CAPI Lead event using the same event ID
- browser/server Purchase dedup for masterclass entry
- browser/server Purchase dedup for implementation workshop
- browser/server Purchase dedup for AI Expert enrollment
- source / campaign / ad-set / ad attribution preserved into the first-party database

### Private WhatsApp service

`whatsapp.sikhadenge.in` must implement the documented authenticated contract in `WHATSAPP-INTEGRATION-CONTRACT.md` using real non-production credentials.

Required observed stages:

- outbound registration accepted
- sent
- delivered
- read
- failed where applicable
- community click/join signal where supported

The funnel must continue to deliver critical class communication directly and must not use Community membership as the only joining-link path.

### Real end-to-end test learner

Before production activation, one controlled test learner must be observable through:

Attribution → registration → WhatsApp → masterclass attendance → workshop offer → workshop checkout → verified workshop purchase → AI Expert offer → core checkout → verified enrollment → CRM learner timeline → revenue dashboard.

## Remaining release blockers

### #109 — production dependency advisories

Still open. Current production-only npm audit reports high-severity advisories involving Next.js, its transitive PostCSS, Sharp, and NanoID.

Do not use `npm audit fix --force` as a release shortcut. Next.js major migration and image/runtime regression testing require dedicated full-site work.

### Production configuration review

Before traffic activation verify:

- masterclass launch price
- implementation workshop launch and regular prices
- ₹14,999 program price
- actual program duration
- advisor destination
- live class date/time/batch IDs
- refund/legal copy
- privacy/terms links
- production support contact
- Razorpay live-mode environment values
- Meta Pixel/CAPI environment values
- WhatsApp private-service endpoint/token

## Current release decision

**NOT READY FOR PRODUCTION TRAFFIC YET.**

Automated application/database gates are green, but the external Test Mode integrations and dependency blocker #109 remain mandatory before production activation.
