# SikhaDenge Funnel v2 — WhatsApp Integration Contract

This document defines the provider-neutral contract between the website funnel and the private SikhaDenge WhatsApp service.

The website does **not** guess private routes inside `whatsapp.sikhadenge.in`. The private service can adapt its own internal API to these normalized contracts.

## 1. Registration outbound hook

Website environment variables:

- `WHATSAPP_FUNNEL_WEBHOOK_URL`
- `WHATSAPP_FUNNEL_WEBHOOK_TOKEN`

When a new masterclass registration is stored, the website can POST a server-to-server payload to the configured webhook.

Current payload fields:

```json
{
  "event": "masterclass_registered",
  "leadId": "...",
  "name": "...",
  "phone": "...",
  "email": "...",
  "funnel": "chatgpt | claude",
  "offerMode": "free | paid",
  "entryPrice": 0,
  "batchId": "..."
}
```

Authorization:

```text
Authorization: Bearer <WHATSAPP_FUNNEL_WEBHOOK_TOKEN>
```

The private WhatsApp service should enqueue the correct template/message and preserve `leadId` as the external correlation ID.

## 2. Status callback into website

Endpoint:

```text
POST /api/funnel/whatsapp/status
```

Website environment variable:

- `WHATSAPP_FUNNEL_STATUS_TOKEN`

Authorization:

```text
Authorization: Bearer <WHATSAPP_FUNNEL_STATUS_TOKEN>
Content-Type: application/json
```

Required payload:

```json
{
  "status": "sent | delivered | read | failed | community_joined",
  "leadId": "website lead id",
  "providerMessageId": "stable provider message id",
  "provider": "sikhadenge-whatsapp",
  "occurredAt": "2026-08-21T03:30:00Z",
  "errorCode": "optional",
  "errorMessage": "optional"
}
```

`status`, `leadId`, and `providerMessageId` are mandatory.

Supported normalized statuses:

- `queued` → `whatsapp_message_queued`
- `sent` → `whatsapp_message_sent`
- `delivered` → `whatsapp_delivered`
- `read` → `whatsapp_read`
- `failed` → `whatsapp_failed`
- `community_joined` → `community_joined`

## 3. Idempotency

The website derives a deterministic first-party `eventId` from:

- normalized status
- provider message ID

Repeated callbacks for the same status + message are upserted instead of counted twice.

The provider must use a stable message ID. Do not generate a new ID when replaying the same delivery/read callback.

## 4. Attribution inheritance

The website looks up the lead's original `generate_lead` event and carries forward:

- visitor/session IDs
- ChatGPT/Claude funnel
- Free/Paid mode
- entry price
- batch ID
- UTM source/medium/campaign/content/term
- Meta campaign/ad set/ad IDs
- fbclid / fbp / fbc
- gclid
- landing variant

This allows WhatsApp delivery quality to be compared at campaign/ad/funnel level without trusting client-side analytics.

## 5. Dashboard metrics

Once callbacks are connected, `/admin/funnel-dashboard` can calculate:

- WhatsApp send rate = sent / leads
- delivery rate = delivered / sent
- read rate = read / delivered
- community join from read = community joined / read
- community join from lead = community joined / leads

This is specifically intended to diagnose the current community-join leakage correctly. Raw leads must not be treated as the denominator for delivery quality unless every lead was actually sent a message.

## 6. Critical communication rule

WhatsApp Community is an engagement layer, not the only route for critical session access.

The direct registered WhatsApp number should receive critical reminders/joining instructions so a Community non-joiner does not automatically become a webinar no-show.

## 7. Security

- All callbacks are server-to-server.
- Status endpoint rejects requests when `WHATSAPP_FUNNEL_STATUS_TOKEN` is not configured or does not match.
- Do not expose either WhatsApp token via `NEXT_PUBLIC_*` variables.
- Do not put secrets in query strings.
- Rotate integration tokens if they are ever exposed.

## 8. Still required before production

The exact private API implementation at `whatsapp.sikhadenge.in` remains an external dependency. Before live activation verify:

1. outbound registration message is accepted,
2. provider message ID is returned/preserved,
3. sent/delivered/read/failed callbacks are emitted,
4. callbacks include the original website `leadId`,
5. retry/replay behavior preserves message ID,
6. direct class reminders work independently of Community membership,
7. a real test lead appears through every expected dashboard stage.
