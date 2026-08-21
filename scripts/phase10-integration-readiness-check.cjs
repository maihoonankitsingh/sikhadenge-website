const assert = require('node:assert/strict');
const { getIntegrationReadiness, classifyRazorpayKey } = require('../.tmp/funnel-integrations/integrationReadiness.js');

function reset() {
  for (const key of [
    'RAZORPAY_KEY_ID','NEXT_PUBLIC_RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET','RAZORPAY_WEBHOOK_SECRET',
    'NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_TEST_EVENT_CODE','META_GRAPH_API_VERSION',
    'WHATSAPP_FUNNEL_WEBHOOK_URL','WHATSAPP_FUNNEL_WEBHOOK_TOKEN','WHATSAPP_FUNNEL_STATUS_TOKEN',
    'PUBLIC_SITE_URL','NEXT_PUBLIC_SITE_URL','FUNNEL_CHECKOUT_SECRET',
  ]) delete process.env[key];
}

reset();
assert.equal(classifyRazorpayKey(''), 'missing');
assert.equal(classifyRazorpayKey('rzp_test_demo'), 'test');
assert.equal(classifyRazorpayKey('rzp_live_demo'), 'live');
assert.equal(classifyRazorpayKey('unexpected'), 'unknown');

process.env.RAZORPAY_KEY_ID = 'rzp_test_phase10';
process.env.RAZORPAY_KEY_SECRET = 'test_secret';
process.env.RAZORPAY_WEBHOOK_SECRET = 'test_webhook';
process.env.NEXT_PUBLIC_META_PIXEL_ID = '123456789';
process.env.META_CAPI_ACCESS_TOKEN = 'meta_test_token';
process.env.META_TEST_EVENT_CODE = 'TEST123';
process.env.WHATSAPP_FUNNEL_WEBHOOK_URL = 'https://example.invalid/outbound';
process.env.WHATSAPP_FUNNEL_WEBHOOK_TOKEN = 'wa_outbound';
process.env.WHATSAPP_FUNNEL_STATUS_TOKEN = 'wa_status';
process.env.PUBLIC_SITE_URL = 'https://staging.sikhadenge.in';
process.env.FUNNEL_CHECKOUT_SECRET = 'dedicated_checkout_secret';

let state = getIntegrationReadiness();
assert.equal(state.overall, 'ready');
assert.equal(state.razorpay.keyMode, 'test');
assert.equal(state.razorpay.safeForTestDiagnostics, true);
assert.equal(state.meta.readyForTestEvents, true);
assert.equal(state.whatsapp.readyForConnectivityTest, true);
assert.equal(state.site.checkoutSigningSecretConfigured, true);
assert.equal(state.blockers.length, 0);
assert.equal(JSON.stringify(state).includes('test_secret'), false, 'Razorpay secret must never leak into readiness JSON');
assert.equal(JSON.stringify(state).includes('meta_test_token'), false, 'Meta token must never leak into readiness JSON');
assert.equal(JSON.stringify(state).includes('wa_outbound'), false, 'WhatsApp token must never leak into readiness JSON');

process.env.RAZORPAY_KEY_ID = 'rzp_live_phase10';
state = getIntegrationReadiness();
assert.equal(state.razorpay.keyMode, 'live');
assert.equal(state.razorpay.safeForTestDiagnostics, false);
assert.ok(state.blockers.some((item) => item.includes('Razorpay Test Mode')));

process.env.RAZORPAY_KEY_ID = 'rzp_test_phase10';
delete process.env.META_TEST_EVENT_CODE;
state = getIntegrationReadiness();
assert.equal(state.meta.readyForTestEvents, false);
assert.ok(state.meta.missing.includes('META_TEST_EVENT_CODE'));

console.log('Phase 10 integration readiness self-tests: PASS');
