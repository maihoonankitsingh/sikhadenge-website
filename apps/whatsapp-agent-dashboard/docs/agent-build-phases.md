# SikhaDenge WhatsApp AI Agent — Production Build Phases

This application remains isolated inside `apps/whatsapp-agent-dashboard`. The existing SikhaDenge dashboard and its PM2 process must not be modified.

## Operating principles

- WhatsApp-first Hindi, English and Hinglish communication.
- Approved knowledge is the source of truth for fees, batches, certificates, offers, policies and commitments.
- The agent may reason internally, but it stores and exposes only a short decision summary—not private chain-of-thought.
- Low-confidence, payment, refund, complaint, legal and explicit-human requests move to a counselor.
- Permanent learning requires manager/admin approval.
- Outbound WhatsApp delivery remains disabled until the final Meta/AiSensy cutover.
- Every phase must pass typecheck, build and rollback checks before deployment.

## Phase 1 — Agent Core and safe preview

Status: implemented on `feature/whatsapp-ai-agent-roadmap`.

- Language detection for Hindi, English and Hinglish.
- Deterministic intent classifier and high-risk routing.
- Prompt-injection and sensitive-data checks.
- Approved-knowledge lexical retrieval.
- OpenAI Responses API adapter with structured output and `store: false`.
- RAG orchestration with confidence threshold and no-answer protection.
- Conversation/contact/lead context loader.
- Authenticated preview API that never sends a WhatsApp message.
- Smoke checks for core routing and safety behavior.

Preview endpoint:

```text
POST /api/agent/preview
```

Example authenticated request:

```json
{
  "message": "AI Expert course ki fees aur next batch kab hai?",
  "conversationId": "optional-existing-conversation-id"
}
```

The response always includes `previewOnly: true` and `outboundSent: false`.

Required runtime variables for model-backed previews:

```text
OPENAI_API_KEY=<server-secret>
OPENAI_MODEL=gpt-5-mini
OPENAI_TIMEOUT_MS=25000
AGENT_AUTO_REPLY_CONFIDENCE=0.78
AGENT_KNOWLEDGE_MIN_SCORE=0.18
AGENT_MAX_REPLY_CHARACTERS=1200
AGENT_MAX_HISTORY_MESSAGES=16
AGENT_MAX_KNOWLEDGE_CHUNKS=5
```

Do not commit secrets or print them in logs.

## Phase 2 — RAG ingestion and knowledge operations

Status: implemented on `feature/whatsapp-ai-agent-roadmap`.

- Knowledge upload/import workflow.
- Normalization, deduplication, chunking and checksums.
- Versioning, effective dates and approval workflow.
- Optional embeddings with hybrid lexical/semantic retrieval.
- Active-version archival and audit logging.
- Authenticated ingestion, review and search APIs.
- Content-preservation smoke tests.

## Phase 3 — Conversation memory and lead intelligence

Status: implemented on `feature/whatsapp-ai-agent-roadmap`.

- Durable redacted conversation summaries in `aiSummary`.
- Explicit contact, course, goal, timeline and availability memory.
- Deterministic lead score, temperature and non-regressive stage transitions.
- Automatic `REVIEW_REQUIRED` mode for low-confidence or handoff decisions.
- Opt-out persistence and counselor-request tracking.
- Authenticated analysis endpoint with audit logging.
- No outbound WhatsApp message is sent by this phase.

Analysis endpoint:

```text
POST /api/agent/conversations/{conversationId}/analyze
```

An optional `message` may be supplied; otherwise the latest inbound customer text is analyzed. The response always includes `outboundSent: false`.

## Phase 4 — Counselor handoff and operations

Status: implemented on `feature/whatsapp-ai-agent-roadmap`.

- Validated AI/HUMAN/REVIEW_REQUIRED/PAUSED mode transitions.
- Validated OPEN/WAITING/RESOLVED/CLOSED/SPAM status transitions.
- Counselor self-assignment and manager/admin assignment controls.
- Conversation and lead assignee synchronization.
- Internal lead notes, conversation tags and follow-up scheduling.
- Derived SLA state, priority score and operational priority band.
- Due, unassigned and counselor-specific queue filters.
- Audit logging with actor, IP address, user agent and before/after state.
- No outbound WhatsApp message is sent by this phase.

Operations endpoints:

```text
POST /api/conversations/{conversationId}/mode
POST /api/conversations/{conversationId}/assignment
POST /api/conversations/{conversationId}/status
POST /api/conversations/{conversationId}/follow-up
POST /api/conversations/{conversationId}/notes
POST /api/conversations/{conversationId}/tags
GET  /api/operations/queue
```

All write responses include `outboundSent: false`. Queue filters support `assignedToId`, `unassigned`, `due` and `limit` query parameters.

## Phase 5 — Controlled learning

Status: implemented on `feature/whatsapp-ai-agent-roadmap`.

- Automatic pending-candidate capture only for low-confidence, missing-approved-knowledge and model-unavailable decisions.
- Manual counselor correction capture with admin/manager review.
- OTP, payment number, phone, email, Aadhaar and secret redaction before storage.
- Raw customer content is not stored in learning metadata.
- Auto-captured candidates require a reviewed corrected answer before approval.
- Pending-suggestion and approved-knowledge duplicate protection.
- Approved corrections become versioned `HUMAN_APPROVED_LEARNING` knowledge.
- Earlier approved versions in the same reviewed-learning category are archived.
- Complete create, reject, approve and merge audit events.
- No outbound WhatsApp message is sent by this phase.

Learning endpoints:

```text
GET  /api/learning
POST /api/learning
POST /api/learning/{suggestionId}/review
```

Counselors may create redacted pending suggestions. Only managers and admins may list the review queue or approve/reject suggestions. Approval responses include `outboundSent: false`.

## Phase 6 — WhatsApp outbound delivery

- Meta text/media/template sender.
- 24-hour service-window enforcement.
- Approved-template selection outside the service window.
- Idempotency, queueing, retry and dead-letter handling.
- Sent/delivered/read/failed status reconciliation.
- Rate limits, circuit breaker and global kill switch.

## Phase 7 — Evaluation, observability and cost control

- Golden conversation test suite.
- Intent, retrieval, grounding, handoff and safety metrics.
- Latency and token-usage tracking.
- Model fallback and budget limits.
- Structured redacted logs and operational alerts.
- Regression gate before deployment.

## Phase 8 — Final Meta/AiSensy cutover

- Complete SIM verification after the telecom security hold.
- Verify phone registration readiness and two-step PIN.
- Back up current provider configuration.
- Controlled deregistration/registration window.
- Webhook and outbound live tests from a separate number.
- Rollback procedure and post-cutover monitoring.
