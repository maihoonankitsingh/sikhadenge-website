const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const { PrismaClient } = require('@prisma/client');

const PORT = 3001;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const STATUS_TOKEN = process.env.WHATSAPP_FUNNEL_STATUS_TOKEN || '';
const prisma = new PrismaClient();

const server = spawn(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)],
  {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let serverLog = '';
server.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  serverLog += text;
  process.stdout.write(text);
});
server.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  serverLog += text;
  process.stderr.write(text);
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'user-agent': 'sikhadenge-phase11-lifecycle-smoke/1.0',
        ...(init.headers || {}),
      },
    });
    const body = await response.json().catch(() => null);
    return { response, body };
  } finally {
    clearTimeout(timer);
  }
}

async function waitUntilReady() {
  for (let attempt = 1; attempt <= 60; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Next server exited early (${server.exitCode}).\n${serverLog}`);
    try {
      const response = await fetch(`${BASE_URL}/`, { signal: AbortSignal.timeout(2000) });
      if (response.status >= 200 && response.status < 500) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Next server did not become ready.\n${serverLog}`);
}

async function register(payload) {
  const { response, body } = await request('/api/funnel/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  assert.equal(response.status, 200, `registration failed: ${JSON.stringify(body)}`);
  assert.equal(body?.ok, true);
  assert.ok(body?.leadId);
  return body;
}

async function whatsappStatus(leadId, status, providerMessageId, metadata = {}) {
  const { response, body } = await request('/api/funnel/whatsapp/status', {
    method: 'POST',
    headers: { authorization: `Bearer ${STATUS_TOKEN}` },
    body: JSON.stringify({
      status,
      leadId,
      providerMessageId,
      provider: 'phase11-ci',
      occurredAt: new Date().toISOString(),
      ...metadata,
    }),
  });
  assert.equal(response.status, 200, `WhatsApp ${status} failed: ${JSON.stringify(body)}`);
  assert.equal(body?.ok, true);
  return body;
}

async function main() {
  if (!STATUS_TOKEN) throw new Error('WHATSAPP_FUNNEL_STATUS_TOKEN is required for lifecycle smoke');
  if (!process.env.FUNNEL_CHECKOUT_SECRET) throw new Error('FUNNEL_CHECKOUT_SECRET is required for paid registration handoff smoke');

  let freeLeadId = '';
  let paidLeadId = '';
  try {
    await waitUntilReady();

    const free = await register({
      fullName: 'Phase Eleven Free Learner',
      phone: '9876500011',
      email: 'phase11-free@example.invalid',
      funnel: 'chatgpt',
      offerMode: 'free',
      entryPrice: 0,
      batchId: 'chatgpt-ci',
      page: '/masterclass/chatgpt/free',
      occupation: 'CI',
      goal: 'integration and decision-intelligence verification',
      laptop: 'yes',
      city: 'Varanasi',
      consent: true,
      attribution: {
        visitorId: 'phase11-free-visitor',
        sessionId: 'phase11-free-session',
        utmSource: 'phase11-ci',
        utmMedium: 'synthetic',
        utmCampaign: 'phase11-chatgpt-free',
        campaignId: 'campaign-free',
        adsetId: 'adset-free',
        adId: 'ad-free',
        landingVariant: 'ci-free',
      },
    });
    freeLeadId = free.leadId;
    assert.equal(free.checkoutUrl, null);
    assert.ok(String(free.confirmationUrl).includes('/masterclass/chatgpt/thank-you'));

    const paid = await register({
      fullName: 'Phase Eleven Paid Learner',
      phone: '9876500012',
      email: 'phase11-paid@example.invalid',
      funnel: 'claude',
      offerMode: 'paid',
      entryPrice: 9,
      batchId: 'claude-ci',
      page: '/masterclass/claude/paid',
      occupation: 'CI',
      goal: 'paid handoff verification',
      laptop: 'yes',
      city: 'Varanasi',
      consent: true,
      attribution: {
        visitorId: 'phase11-paid-visitor',
        sessionId: 'phase11-paid-session',
        utmSource: 'phase11-ci',
        utmMedium: 'synthetic',
        utmCampaign: 'phase11-claude-paid',
        campaignId: 'campaign-paid',
        adsetId: 'adset-paid',
        adId: 'ad-paid',
        landingVariant: 'ci-paid',
      },
    });
    paidLeadId = paid.leadId;
    assert.ok(String(paid.checkoutUrl).startsWith('/masterclass/claude/checkout?'));
    assert.ok(String(paid.checkoutUrl).includes('token='));
    assert.equal(paid.entryPrice, 9);

    const providerMessageId = 'phase11-message-001';
    const messageMetadata = {
      messageType: 'registration_confirmation',
      journeyStage: 'masterclass_registration',
      templateName: 'phase11_registration_ci',
      automationId: 'phase11-ci-automation',
      scheduledFor: new Date(Date.now() - 60_000).toISOString(),
    };
    await whatsappStatus(freeLeadId, 'sent', providerMessageId, messageMetadata);
    await whatsappStatus(freeLeadId, 'delivered', providerMessageId, messageMetadata);
    await whatsappStatus(freeLeadId, 'read', providerMessageId, messageMetadata);
    await whatsappStatus(freeLeadId, 'delivered', providerMessageId, messageMetadata); // replay/idempotency

    const freeRegistration = await prisma.funnelEvent.findFirst({
      where: { leadId: freeLeadId, eventName: 'generate_lead' },
    });
    assert.ok(freeRegistration);
    assert.equal(freeRegistration.funnel, 'chatgpt');
    assert.equal(freeRegistration.offerMode, 'free');
    assert.equal(freeRegistration.campaignId, 'campaign-free');
    assert.equal(freeRegistration.adId, 'ad-free');

    const freeLead = await prisma.lead.findUnique({ where: { id: freeLeadId } });
    assert.ok(freeLead);
    const freeNotes = JSON.parse(freeLead.notes || '{}');
    assert.equal(freeNotes?.consent?.whatsappMasterclass, true, 'WhatsApp consent must be persisted');

    const waEvents = await prisma.funnelEvent.findMany({
      where: { leadId: freeLeadId, eventName: { in: ['whatsapp_message_sent', 'whatsapp_delivered', 'whatsapp_read'] } },
      orderBy: { createdAt: 'asc' },
    });
    assert.equal(waEvents.length, 3, 'replayed delivered callback must not create a fourth event');
    for (const event of waEvents) {
      assert.equal(event.funnel, 'chatgpt');
      assert.equal(event.offerMode, 'free');
      assert.equal(event.campaignId, 'campaign-free');
      assert.equal(event.adId, 'ad-free');
      assert.equal(event.metadata?.messageType, 'registration_confirmation');
      assert.equal(event.metadata?.journeyStage, 'masterclass_registration');
      assert.equal(event.metadata?.templateName, 'phase11_registration_ci');
    }

    const paidRegistration = await prisma.funnelEvent.findFirst({
      where: { leadId: paidLeadId, eventName: 'generate_lead' },
    });
    assert.ok(paidRegistration);
    assert.equal(paidRegistration.funnel, 'claude');
    assert.equal(paidRegistration.offerMode, 'paid');
    assert.equal(paidRegistration.entryPrice, 9);
    assert.equal(paidRegistration.campaignId, 'campaign-paid');

    const paidWhatsAppBeforePayment = await prisma.funnelEvent.count({
      where: {
        leadId: paidLeadId,
        eventName: { in: ['whatsapp_message_queued', 'whatsapp_message_sent', 'whatsapp_delivered', 'whatsapp_read'] },
      },
    });
    assert.equal(paidWhatsAppBeforePayment, 0, 'paid-entry learner must not be activated in WhatsApp before verified payment');

    const unexpectedPayments = await prisma.funnelPayment.count({
      where: { leadId: { in: [freeLeadId, paidLeadId] } },
    });
    assert.equal(unexpectedPayments, 0, 'registration/WhatsApp smoke must never invent payment records');

    console.log('Phase 11 HTTP lifecycle + follow-up telemetry smoke: PASS');
  } finally {
    if (freeLeadId || paidLeadId) {
      await prisma.lead.deleteMany({ where: { id: { in: [freeLeadId, paidLeadId].filter(Boolean) } } }).catch(() => {});
    }
    await prisma.$disconnect().catch(() => {});
    if (server.exitCode === null) {
      server.kill('SIGTERM');
      await Promise.race([new Promise((resolve) => server.once('exit', resolve)), sleep(3000)]);
      if (server.exitCode === null) server.kill('SIGKILL');
    }
  }
}

main().catch((error) => {
  console.error('Phase 11 HTTP lifecycle + follow-up telemetry smoke: FAIL');
  console.error(error);
  process.exitCode = 1;
});
