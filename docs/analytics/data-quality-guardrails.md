# SikhaDenge Data Quality Guardrails

This document defines the minimum quality thresholds required before analytics data can be trusted for decisions.

## 1. Identity Quality Thresholds

- Valid leads with canonical lead ID: at least 99.9 percent
- Workshop registrations linked to lead ID: at least 99 percent
- Workshop attendance linked to registration: at least 98 percent
- Admissions linked to canonical person or lead: at least 98 percent
- Captured payments linked to order and person: at least 99.5 percent
- Enrollments linked to verified payment: 100 percent

## 2. Attribution Quality Thresholds

- Paid leads with source and campaign: at least 95 percent
- Meta paid leads with campaign, ad-set, and ad IDs: at least 95 percent
- Google paid leads with a valid click identifier: at least 90 percent
- Paid enrollments with an attributable touchpoint: at least 90 percent

Organic and direct traffic must not be falsely assigned to a paid source.

## 3. Event Quality Thresholds

- Critical-event delivery success: at least 99.5 percent
- Duplicate critical-event rate: below 0.5 percent
- Invalid-schema event rate: below 0.5 percent
- Critical-event processing delay: below 5 minutes
- Unlinked critical business events: below 1 percent

Critical events include valid lead creation, workshop registration, workshop attendance, payment capture, refund, enrollment, and student activation.

## 4. Communication Quality Thresholds

- WhatsApp reminder failure rate: below 3 percent
- Stuck processing reminders: zero
- Expired pending reminders: zero
- Duplicate reminder sends: below 0.1 percent
- Valid reminders with provider response ID: at least 99 percent

The current historical AiSensy failure rate is a remediation baseline, not an accepted production target.

## 5. Financial Reconciliation

- Captured payments must reconcile daily with provider records.
- Completed refunds must reconcile daily with provider records.
- Every enrollment must link to an approved verified payment.
- Payment and dashboard mismatches must remain visible until resolved.
- Created orders must not be counted as collected revenue.

## 6. Privacy and Consent Guardrails

- Raw email and phone must not enter analytics event parameters.
- Personally identifiable information must not appear in URLs.
- Non-essential analytics must follow analytics consent.
- Advertising tracking must follow advertising consent.
- Consent records must include timestamp and policy version.
- Internal and test traffic must be separately identified.
- Historical identity matching must remain auditable.
