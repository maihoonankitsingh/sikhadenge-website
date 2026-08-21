const assert = require('assert/strict');
const crypto = require('crypto');

process.env.FUNNEL_CHECKOUT_SECRET = 'ci-funnel-checkout-secret';
process.env.RAZORPAY_KEY_ID = 'rzp_test_ci';
process.env.RAZORPAY_KEY_SECRET = 'ci-razorpay-secret';
process.env.RAZORPAY_WEBHOOK_SECRET = 'ci-webhook-secret';

const { createCheckoutToken, verifyCheckoutToken } = require('../.tmp/funnel-security/checkoutToken.js');
const {
  verifyRazorpayCheckoutSignature,
  verifyRazorpayWebhookSignature,
} = require('../.tmp/funnel-security/razorpay.js');

function hmacHex(secret, value) {
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

function hmacBase64Url(secret, value) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function checkoutTokenTests() {
  const token = createCheckoutToken({ leadId: 'lead_test_123', funnel: 'chatgpt', ttlSeconds: 600 });
  const verified = verifyCheckoutToken(token);
  assert.equal(verified?.leadId, 'lead_test_123');
  assert.equal(verified?.funnel, 'chatgpt');
  assert.equal(verified?.purpose, 'masterclass_entry');

  const workshopToken = createCheckoutToken({
    leadId: 'lead_test_123',
    funnel: 'claude',
    purpose: 'implementation_workshop',
    ttlSeconds: 600,
  });
  const verifiedWorkshop = verifyCheckoutToken(workshopToken);
  assert.equal(verifiedWorkshop?.leadId, 'lead_test_123');
  assert.equal(verifiedWorkshop?.funnel, 'claude');
  assert.equal(verifiedWorkshop?.purpose, 'implementation_workshop');

  const [payload, sig] = token.split('.');
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  decoded.leadId = 'lead_attacker';
  const tamperedPayload = Buffer.from(JSON.stringify(decoded), 'utf8').toString('base64url');
  assert.equal(verifyCheckoutToken(`${tamperedPayload}.${sig}`), null, 'tampered token must fail');

  const [workshopPayload, workshopSig] = workshopToken.split('.');
  const workshopDecoded = JSON.parse(Buffer.from(workshopPayload, 'base64url').toString('utf8'));
  workshopDecoded.purpose = 'masterclass_entry';
  const tamperedPurposePayload = Buffer.from(JSON.stringify(workshopDecoded), 'utf8').toString('base64url');
  assert.equal(
    verifyCheckoutToken(`${tamperedPurposePayload}.${workshopSig}`),
    null,
    'tampered checkout purpose must fail'
  );

  const expiredPayload = Buffer.from(
    JSON.stringify({ leadId: 'lead_test_123', funnel: 'chatgpt', purpose: 'masterclass_entry', exp: Math.floor(Date.now() / 1000) - 60 }),
    'utf8'
  ).toString('base64url');
  const expiredSig = hmacBase64Url(process.env.FUNNEL_CHECKOUT_SECRET, expiredPayload);
  assert.equal(verifyCheckoutToken(`${expiredPayload}.${expiredSig}`), null, 'expired token must fail');

  const invalidFunnelPayload = Buffer.from(
    JSON.stringify({ leadId: 'lead_test_123', funnel: 'gemini', purpose: 'masterclass_entry', exp: Math.floor(Date.now() / 1000) + 600 }),
    'utf8'
  ).toString('base64url');
  const invalidFunnelSig = hmacBase64Url(process.env.FUNNEL_CHECKOUT_SECRET, invalidFunnelPayload);
  assert.equal(verifyCheckoutToken(`${invalidFunnelPayload}.${invalidFunnelSig}`), null, 'unsupported funnel token must fail');

  const invalidPurposePayload = Buffer.from(
    JSON.stringify({ leadId: 'lead_test_123', funnel: 'chatgpt', purpose: 'core_program', exp: Math.floor(Date.now() / 1000) + 600 }),
    'utf8'
  ).toString('base64url');
  const invalidPurposeSig = hmacBase64Url(process.env.FUNNEL_CHECKOUT_SECRET, invalidPurposePayload);
  assert.equal(verifyCheckoutToken(`${invalidPurposePayload}.${invalidPurposeSig}`), null, 'unsupported checkout purpose must fail');
}

function razorpayCheckoutSignatureTests() {
  const orderId = 'order_ci_123';
  const paymentId = 'pay_ci_456';
  const signature = hmacHex(process.env.RAZORPAY_KEY_SECRET, `${orderId}|${paymentId}`);

  assert.equal(verifyRazorpayCheckoutSignature({ orderId, paymentId, signature }), true, 'valid Razorpay checkout signature must pass');
  assert.equal(verifyRazorpayCheckoutSignature({ orderId, paymentId, signature: signature.slice(0, -1) + '0' }), false, 'tampered Razorpay checkout signature must fail');
  assert.equal(verifyRazorpayCheckoutSignature({ orderId: `${orderId}_tampered`, paymentId, signature }), false, 'tampered order id must fail signature verification');
}

function razorpayWebhookSignatureTests() {
  const body = Buffer.from(JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_ci_456' } } } }));
  const signature = hmacHex(process.env.RAZORPAY_WEBHOOK_SECRET, body);

  assert.equal(verifyRazorpayWebhookSignature(body, signature), true, 'valid webhook signature must pass');
  assert.equal(verifyRazorpayWebhookSignature(Buffer.from(`${body.toString('utf8')} `), signature), false, 'mutated raw webhook body must fail');
  assert.equal(verifyRazorpayWebhookSignature(body, ''), false, 'missing webhook signature must fail');
}

checkoutTokenTests();
razorpayCheckoutSignatureTests();
razorpayWebhookSignatureTests();

console.log('Funnel payment security self-tests: PASS');
