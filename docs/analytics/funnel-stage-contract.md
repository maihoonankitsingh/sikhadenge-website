# SikhaDenge Funnel Stage Contract

This document defines the canonical lifecycle stages used across website analytics, CRM, workshops, counselling, payments, and LMS.

## 1. Visitor Stages

- VISITOR
- ENGAGED_VISITOR
- FORM_STARTED

Visitor stages are event-derived and do not automatically create a CRM lead.

## 2. Lead Stages

- NEW
- VALIDATING
- VALID
- INVALID
- DUPLICATE
- ASSIGNED
- CONTACT_ATTEMPTED
- CONNECTED
- QUALIFIED
- DISQUALIFIED

NEW: lead accepted by the system.
VALIDATING: automated validation is in progress.
VALID: usable identity and contact information.
INVALID: spam, invalid identity, invalid phone, or unusable record.
DUPLICATE: linked to an existing person or lead according to identity rules.
ASSIGNED: assigned to an owner or work queue.
CONTACT_ATTEMPTED: at least one valid contact attempt exists.
CONNECTED: two-way contact has been established.
QUALIFIED: approved fit and intent criteria are satisfied.
DISQUALIFIED: qualification failed and a controlled reason is mandatory.

## 3. Workshop Stages

- WORKSHOP_REGISTERED
- WORKSHOP_CONFIRMED
- WORKSHOP_JOINED
- WORKSHOP_ENGAGED
- WORKSHOP_LEFT_EARLY
- WORKSHOP_NO_SHOW
- WORKSHOP_REPLAY_VIEWED
- OFFER_VIEWED

WORKSHOP_REGISTERED: valid registration accepted for a specific workshop.
WORKSHOP_CONFIRMED: registration confirmed and communication eligibility verified.
WORKSHOP_JOINED: verified provider or internal join activity exists.
WORKSHOP_ENGAGED: approved attendance or engagement threshold is satisfied.
WORKSHOP_LEFT_EARLY: attendee joined but did not satisfy the engagement threshold.
WORKSHOP_NO_SHOW: confirmed registrant has no verified join activity.
WORKSHOP_REPLAY_VIEWED: verified replay activity exists.
OFFER_VIEWED: attendee or lead received or viewed the tracked offer.

## 4. Sales Stages

- COUNSELLING_BOOKED
- COUNSELLING_COMPLETED
- OFFER_SHARED
- PAYMENT_LINK_SHARED
- PAYMENT_PENDING
- PAYMENT_FAILED
- ENROLLED
- LOST

COUNSELLING_BOOKED: a valid counselling appointment is scheduled.
COUNSELLING_COMPLETED: the scheduled counselling interaction is completed.
OFFER_SHARED: a tracked course or program offer is shared.
PAYMENT_LINK_SHARED: a valid tracked payment link is shared.
PAYMENT_PENDING: a valid order or payment intent exists but payment is not captured.
PAYMENT_FAILED: a valid payment attempt failed or was rejected.
ENROLLED: verified successful payment or an approved finance rule exists.
LOST: the lead is closed without enrollment and a controlled reason is mandatory.

A submitted admission form alone must not create the ENROLLED stage.

## 5. Post-Enrollment Stages

- ACCOUNT_CREATED
- ACTIVATED
- ACTIVE_STUDENT
- AT_RISK
- INACTIVE
- REACTIVATED
- COURSE_COMPLETED
- OUTCOME_ACHIEVED
- REFUND_REQUESTED
- REFUNDED
- ALUMNI

ACCOUNT_CREATED: LMS or student account is successfully created.
ACTIVATED: the approved student activation criteria are satisfied.
ACTIVE_STUDENT: the student has recent valid learning activity.
AT_RISK: one or more approved risk rules are triggered.
INACTIVE: the student exceeds the approved inactivity threshold.
REACTIVATED: valid activity resumes after an inactive or at-risk state.
COURSE_COMPLETED: required completion criteria are satisfied.
OUTCOME_ACHIEVED: a defined and verified student outcome is recorded.
REFUND_REQUESTED: a valid refund request is recorded.
REFUNDED: the verified refund is completed.
ALUMNI: the student has completed the applicable program lifecycle.

## 6. Controlled Reason Codes

### Disqualification Reasons

- INVALID_PHONE
- INVALID_EMAIL
- SPAM
- DUPLICATE
- WRONG_AUDIENCE
- NO_REQUIRED_DEVICE
- NO_CURRENT_INTENT
- WRONG_COURSE
- AGE_OR_CONSENT
- OTHER_REVIEWED

### Lost Reasons

- PRICE
- TIMING
- NO_RESPONSE
- PAYMENT_FAILURE
- PARENT_OR_GUARDIAN_APPROVAL
- TRUST
- COMPETITOR
- NOT_READY
- COURSE_MISMATCH
- OTHER_REVIEWED

Free-text notes may supplement but must not replace a controlled reason code.
