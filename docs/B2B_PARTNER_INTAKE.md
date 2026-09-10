# B2B partner enrollment integration

This integration keeps the public SikhaDenge website and the B2B OS as separate trust boundaries.

## Request path

`Browser -> sikhadenge-website -> server-side partner mapping -> B2B OS /api/v1/intake/enrollments`

The browser never receives the B2B service API key and cannot choose an organization, program, batch or funding mode. Those values come from server-only configuration.

## Production environment

Set the following only in the website server environment. Do not commit real keys.

```env
B2B_OS_API_BASE_URL=https://b2b.sikhadenge.in
B2B_INTAKE_ALLOWED_HOSTS=sikhadenge.in,www.sikhadenge.in
B2B_INTAKE_TRUST_PROXY_HEADERS=true
B2B_INTAKE_SHEAT_API_KEY=<SCOPED_SERVICE_KEY>
B2B_INTAKE_PARTNERS_JSON={"sheat":{"displayName":"SHEAT Group of Institutions","programLabel":"<REAL_PROGRAM_NAME>","organizationSlug":"sheat","programCode":"<REAL_PROGRAM_CODE>","batchCode":"<REAL_BATCH_CODE>","fundingMode":"<REAL_FUNDING_MODE>","apiKeyEnv":"B2B_INTAKE_SHEAT_API_KEY","noticeVersion":"<APPROVED_NOTICE_VERSION>"}}
```

`batchCode` may be omitted only when the B2B program intentionally accepts enrollment without a batch assignment.

Allowed funding modes are `PARTNER_FUNDED`, `LEARNER_FUNDED`, `MIXED`, `NO_FEE`, and `UNKNOWN`. The value is controlled by server configuration, never browser input.

## B2B API client

Create a dedicated API client in the B2B OS after the production database is provisioned and SHEAT exists:

```bash
npm run api-client:create -- --name sikhadenge-website-sheat-intake --scopes enrollments:write --organization sheat
```

Copy the generated raw key once into `B2B_INTAKE_SHEAT_API_KEY`. The B2B database stores only the hash.

Do not reuse dashboard, admin, automation or unscoped credentials for website intake.

## Activation gate

`/enroll/sheat` returns 404 until `B2B_INTAKE_PARTNERS_JSON` contains a valid `sheat` entry. This is intentional: no placeholder program or batch is exposed as a real enrollment target.

Before activation, verify the real B2B `programCode`, optional `batchCode`, funding mode and approved notice version against production records.

## Security controls

- service credential remains server-side
- same-origin validation for browser submissions
- optional explicit public-host allowlist
- per-process abuse throttle as a secondary control
- reverse-proxy/WAF rate limiting remains required in production
- honeypot field for basic bot filtering
- stable client idempotency key forwarded to B2B OS
- B2B OS performs canonical learner matching and duplicate-enrollment suppression
- partner/program/batch/funding mode are fixed server-side
- no enrollment page indexing by search engines
- operational enrollment acknowledgement is recorded separately from optional communication consent

`B2B_INTAKE_TRUST_PROXY_HEADERS=true` must only be used when the public reverse proxy overwrites `X-Forwarded-For`, `X-Real-IP` and `X-Forwarded-Host`; otherwise leave it unset/false.

## Acceptance test

1. Use a staging B2B API client scoped to SHEAT and `enrollments:write` only.
2. Submit a valid learner through `/enroll/sheat`.
3. Confirm `Person`, `OrganizationLearner`, `Admission`, `Enrollment`, consent, audit and outbox records are created.
4. Submit the same browser request again with the same idempotency key; confirm no duplicate record is created.
5. Retry with the same learner and a new idempotency key; confirm duplicate-enrollment suppression works.
6. Attempt to alter organization/program/batch/funding mode in the browser payload; confirm the website ignores those fields.
7. Attempt with a service credential scoped to another organization; confirm B2B OS returns access denied.
8. Confirm the raw B2B API key never appears in page HTML, browser JavaScript, network responses or client logs.
9. Confirm production reverse-proxy rate limits and request-size limits are enabled.
10. Confirm production privacy/notice wording and retention policy have been approved before collecting real learner data.
