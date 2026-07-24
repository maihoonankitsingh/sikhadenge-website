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

- Knowledge upload/import workflow.
- Normalization, deduplication, chunking and checksums.
- Versioning, effective dates and approval workflow.
- Embeddings/vector retrieval with lexical fallback.
- Retrieval evaluation set and source-quality scoring.
- Conflict detection between active documents.
- Knowledge dashboard and publication controls.

## Phase 3 — Conversation memory and lead intelligence

- Durable customer profile memory.
- Rolling conversation summaries.
- Explicit fact extraction with provenance.
- Course-interest and goal discovery.
- Lead score, temperature and stage transitions.
- One-question-at-a-time discovery policy.
- Duplicate-question and repeated-contact handling.

## Phase 4 — Counselor handoff and operations

- AI/HUMAN/REVIEW_REQUIRED/PAUSED state machine.
- Assignment queues and SLA timers.
- Human takeover/resume controls.
- Internal notes, tags and follow-up scheduling.
- Complaint, refund and payment escalation queues.
- Audit history for every decision and mode change.

## Phase 5 — Controlled learning

- Low-confidence and corrected-answer capture.
- PII redaction before review.
- Admin/manager approve, reject or merge workflow.
- Approved corrections become versioned knowledge.
- No self-training from raw customer messages.

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
