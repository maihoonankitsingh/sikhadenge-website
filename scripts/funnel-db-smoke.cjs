const assert = require('assert/strict');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const suffix = crypto.randomBytes(6).toString('hex');
  const influencerId = `ci_influencer_${suffix}`;
  const leadId = `ci_lead_${suffix}`;
  const eventId = `ci_event_${suffix}`;
  const paymentId = `ci_payment_${suffix}`;
  const receipt = `ci_receipt_${suffix}`;
  const orderId = `ci_order_${suffix}`;

  try {
    await prisma.influencer.create({
      data: {
        id: influencerId,
        name: 'CI Funnel QA',
        email: `ci-${suffix}@example.com`,
        passwordHash: 'ci-not-a-real-password-hash',
        promoCode: `CI${suffix}`,
        isActive: true,
      },
    });

    const lead = await prisma.lead.create({
      data: {
        id: leadId,
        name: 'CI Funnel Learner',
        phone: `98${suffix.slice(0, 8)}`,
        source: 'funnel:chatgpt:paid',
        status: 'registered',
        promoCode: `CI${suffix}`,
        influencerId,
        notes: JSON.stringify({ schema: 'funnel-v2', funnel: 'chatgpt', offerMode: 'paid' }),
        funnelCrmProfile: {
          create: {
            pipelineStage: 'new_lead',
            priority: 'high',
            advisorStatus: 'not_started',
            owner: 'ci-admin',
          },
        },
        funnelCrmActivities: {
          create: {
            activityType: 'note',
            note: 'Phase 8 fresh-database smoke test',
            adminId: 'ci-admin',
          },
        },
      },
      include: {
        influencer: true,
        funnelCrmProfile: true,
        funnelCrmActivities: true,
      },
    });

    assert.equal(lead.influencer?.id, influencerId);
    assert.equal(lead.funnelCrmProfile?.priority, 'high');
    assert.equal(lead.funnelCrmActivities.length, 1);

    await prisma.funnelEvent.create({
      data: {
        eventId,
        eventName: 'generate_lead',
        leadId,
        funnel: 'chatgpt',
        offerMode: 'paid',
        entryPrice: 9,
        batchId: 'ci-phase8',
        source: 'meta',
        campaignId: 'ci-campaign',
        adsetId: 'ci-adset',
        adId: 'ci-ad',
      },
    });

    await prisma.funnelPayment.create({
      data: {
        id: paymentId,
        provider: 'razorpay',
        purpose: 'masterclass_entry',
        leadId,
        funnel: 'chatgpt',
        offerMode: 'paid',
        batchId: 'ci-phase8',
        amountPaise: 900,
        currency: 'INR',
        status: 'captured',
        receipt,
        providerOrderId: orderId,
        providerPaymentId: `pay_${suffix}`,
        purchaseEventId: `purchase_${suffix}`,
        paidAt: new Date(),
      },
    });

    const [eventCount, paymentCount] = await Promise.all([
      prisma.funnelEvent.count({ where: { leadId } }),
      prisma.funnelPayment.count({ where: { leadId } }),
    ]);
    assert.equal(eventCount, 1);
    assert.equal(paymentCount, 1);

    await prisma.lead.delete({ where: { id: leadId } });

    const [profileCount, activityCount] = await Promise.all([
      prisma.funnelCrmProfile.count({ where: { leadId } }),
      prisma.funnelCrmActivity.count({ where: { leadId } }),
    ]);
    assert.equal(profileCount, 0, 'CRM profile must cascade when Lead is deleted');
    assert.equal(activityCount, 0, 'CRM activity must cascade when Lead is deleted');

    await prisma.funnelEvent.deleteMany({ where: { leadId } });
    await prisma.funnelPayment.deleteMany({ where: { leadId } });
    await prisma.influencer.delete({ where: { id: influencerId } });

    console.log('Funnel database migration/schema smoke test: PASS');
  } finally {
    await prisma.funnelEvent.deleteMany({ where: { leadId } }).catch(() => {});
    await prisma.funnelPayment.deleteMany({ where: { leadId } }).catch(() => {});
    await prisma.funnelCrmActivity.deleteMany({ where: { leadId } }).catch(() => {});
    await prisma.funnelCrmProfile.deleteMany({ where: { leadId } }).catch(() => {});
    await prisma.lead.deleteMany({ where: { id: leadId } }).catch(() => {});
    await prisma.influencer.deleteMany({ where: { id: influencerId } }).catch(() => {});
  }
}

main()
  .catch((error) => {
    console.error('Funnel database migration/schema smoke test: FAIL');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
