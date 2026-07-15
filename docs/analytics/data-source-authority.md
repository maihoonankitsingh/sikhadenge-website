# SikhaDenge Data Source Authority

This document defines which system controls each business and analytics record.

## 1. Core Source Authority

| Business Object | Controlling Source |
|---|---|
| Website sessions and page activity | SikhaDenge event collector |
| Marketing UTMs and click IDs | Stored attribution touchpoints |
| Lead identity | Canonical person and lead records |
| Lead lifecycle status | CRM status history |
| Workshop registration | Workshop registration record |
| Workshop attendance | Verified Zoom or provider attendance |
| Counsellor activity | CRM activity history |
| Orders | Operational order records |
| Captured payments | Verified payment-provider records |
| Refunds | Verified payment-provider refund records |
| Enrollment | Verified enrollment linked to payment |
| Learning progress | LMS activity records |
| Advertising spend | Advertising-platform spend imports |
| Final revenue | Verified payment and refund ledger |

## 2. Analytics Platform Roles

### GA4
GA4 is used for behavioural exploration, traffic analysis, and funnel diagnostics.

GA4 is not the controlling source for payments, refunds, enrollments, counsellor performance, or final revenue.

### Google Ads and Meta
Advertising platforms are used for campaign delivery, attribution signals, and optimization.

Platform-reported conversions are not the final business or finance source of truth.

### Operational PostgreSQL
Operational PostgreSQL controls current application records and transactional state.

Heavy dashboard queries must not be added directly to production transaction paths.

## 3. Reporting and Reconciliation

### Analytical Warehouse
When introduced, the analytical warehouse becomes the canonical reporting layer after reconciliation with operational systems.

The warehouse must not invent, overwrite, or silently repair operational records.

### Financial Reconciliation Order

1. payment-provider verified transaction
2. operational payment and refund record
3. verified enrollment linkage
4. analytical warehouse fact record
5. dashboard aggregation
6. advertising-platform reported conversion

Any mismatch between provider, operational database, warehouse, and dashboard must be visible and investigated.

### Identity Reconciliation Order

Use canonical IDs first, then verified normalized phone or email according to approved identity rules.

Historical records must be linked through auditable reconciliation, not destructive duplicate deletion.
