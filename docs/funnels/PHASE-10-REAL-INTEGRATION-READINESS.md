# Phase 10 — Real Integration Readiness & Test Harness

Phase 10 converts the Funnel v2 release process from configuration-by-memory into an explicit, admin-visible integration gate.

This phase does **not** authorize production traffic, live Razorpay keys, live Meta optimization, or production database migration.

## Admin console

Route:

```text
/admin/funnel-integrations
```

The page calls admin-authenticated endpoints and returns only masked/non-secret readiness data.

Secrets are never returned to the browser.

## Readiness API

```text
GET /api/admin/funnel-integrations
```

Requires existing admin authentication.

It checks:

### Razorpay

- `RAZORPAY_KEY_ID` (or existing public-key fallback)
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- key prefix classification: `rzp_test_`, `rzp_live_`, unknown, missing

Phase 10 diagnostics accept only `rzp_test_` keys. A live key is intentionally rejected.

### Meta

- `NEXT_PUBLIC_META_PIXEL_ID`
- `META_CAPI_ACCESS_TOKEN`
- `META_TEST_EVENT_CODE`
- optional `META_GRAPH_API_VERSION`

A Meta diagnostic is considered ready only when Test Events mode is explicitly configured.

### WhatsApp

- `WHATSAPP_FUNNEL_WEBHOOK_URL`
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN`
- `WHATSAPP_FUNNEL_STATUS_TOKEN`

### Shared release configuration

- `PUBLIC_SITE_URL` or `NEXT_PUBLIC_SITE_URL`
- dedicated `FUNNEL_CHECKOUT_SECRET`

The checkout implementation can technically fall back to other secrets for backward compatibility, but production release readiness requires a dedicated `FUNNEL_CHECKOUT_SECRET` so signing material is isolated.

## Safe diagnostic endpoint

```text
POST /api/admin/funnel-integrations-test
Content-Type: application/json

{ "provider": "razorpay | meta | whatsapp" }
```

Requires admin authentication.

### Razorpay diagnostic

- Refuses non-`rzp_test_` keys.
- Requires the test key secret and webhook secret.
- Creates a ₹1 simulated Razorpay Test Mode order only.
- Does not capture money.
- Does not create a FunnelPayment or grant learner access.

### Meta diagnostic

- Requires Pixel ID, CAPI access token and `META_TEST_EVENT_CODE`.
- Sends a `ViewContent` diagnostic event through the existing server CAPI adapter.
- Uses a unique event ID.
- Does not count as a learner lead/purchase in the first-party funnel database.

### WhatsApp diagnostic

- Sends a provider-neutral `integration_healthcheck` payload with `dryRun: true`.
- Contains no learner PII or test phone number.
- A 2xx response confirms transport/auth compatibility only.
- The private WhatsApp service must explicitly support this health-check event for the diagnostic to pass.
- Real message delivery/read callbacks still require a controlled test learner.

## Automated readiness self-test

`npm run test:funnel-integrations` validates that:

- test/live/unknown Razorpay key modes are classified correctly,
- full synthetic Test Mode configuration resolves to `ready`,
- live Razorpay keys are never marked safe for Phase 10 diagnostics,
- Meta is blocked without `META_TEST_EVENT_CODE`,
- secret values are not present in readiness JSON.

## Automated HTTP lifecycle rehearsal

After the full production build, CI starts the real Next.js server against the temporary PostgreSQL database and runs `scripts/phase10-lifecycle-smoke.cjs`.

The rehearsal exercises the actual website APIs rather than inserting only synthetic database rows:

1. registers a ChatGPT FREE learner through `POST /api/funnel/register`,
2. verifies no checkout is created for FREE registration,
3. registers a Claude paid-entry learner at the configured ₹9 test price,
4. verifies a signed paid checkout handoff is returned,
5. sends authenticated WhatsApp `sent → delivered → read` callbacks through `POST /api/funnel/whatsapp/status`,
6. replays the delivered callback and verifies idempotency,
7. verifies Meta/UTM campaign and ad attribution is inherited into WhatsApp status events,
8. verifies FREE and paid acquisition cohorts remain distinct,
9. verifies this rehearsal creates no fake payment records,
10. cleans up the synthetic leads after assertions.

This proves the website-side registration, checkout-handoff and WhatsApp status-ingestion chain. It does **not** claim that Razorpay, Meta or the private WhatsApp provider has been externally verified.

The permanent Funnel v2 CI remains read-only and runs readiness/security/database/build/lifecycle/route gates from committed source.

## Real external gates still required

Code readiness is not the same as provider verification. Before production activation:

1. Configure Razorpay Test Mode credentials in a non-production environment.
2. Configure the test webhook URL/secret and run the Razorpay diagnostic.
3. Complete one real simulated masterclass payment in Razorpay Test Mode.
4. Verify callback loss, duplicate webhook, failed payment, partial refund and full refund scenarios.
5. Configure Meta Pixel/CAPI plus a Test Event Code and run the Meta diagnostic.
6. Confirm browser/server Lead and Purchase dedup in Meta Test Events for entry, workshop and core program stages.
7. Adapt the private WhatsApp service to the normalized outbound/status contract plus `integration_healthcheck`.
8. Run the WhatsApp connectivity diagnostic.
9. Use one controlled test learner and verify sent → delivered → read → community status events.
10. Observe the learner end-to-end in Funnel CRM and Funnel Dashboard.

## Security rules

- Never paste live or test secrets into GitHub source, issues, PR bodies or browser-visible variables.
- Razorpay Key Secret, webhook secret, Meta CAPI token and WhatsApp tokens are server-only.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `NEXT_PUBLIC_META_PIXEL_ID` may be public identifiers; secrets may not.
- Phase 10 admin diagnostics must remain behind `requireAdmin`.
- Live Razorpay keys are not accepted by the diagnostic endpoint.
- `FUNNEL_CHECKOUT_SECRET` should be dedicated signing material rather than reusing payment/admin secrets.

## Release state

Automated code/database/security readiness may be green while Phase 10 remains externally blocked. Production merge/deploy must wait for actual Razorpay Test Mode, Meta Test Events, WhatsApp callback and controlled learner evidence.
