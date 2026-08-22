const assert = require('node:assert/strict');
const { getIntegrationReadiness, classifyRazorpayKey } = require('../.tmp/funnel-integrations/integrationReadiness.js');

function reset() {
  for (const key of [
    'RAZORPAY_KEY_ID','NEXT_PUBLIC_RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET','RAZORPAY_WEBHOOK_SECRET',
    'NEXT_PUBLIC_META_PIXEL_ID','META_CAPI_ACCESS_TOKEN','META_TEST_EVENT_CODE','META_GRAPH_API_VERSION',
    'WHATSAPP_FUNNEL_WEBHOOK_URL','WHATSAPP_AGENT_REGISTRATION_URL','WHATSAPP_AGENT_BASE_URL',
    'MASTERCLASS_REGISTRATION_WEBHOOK_SECRET','WHATSAPP_FUNNEL_WEBHOOK_TOKEN','WHATSAPP_FUNNEL_STATUS_TOKEN',
    'WHATSAPP_AGENT_STATUS_URL','DEVELOPER_API_TOKEN','WHATSAPP_AGENT_STATUS_TOKEN',
    'PUBLIC_SITE_URL','NEXT_PUBLIC_SITE_URL','FUNNEL_CHECKOUT_SECRET',
  ]) delete process.env[key];
}

reset();
assert.equal(classifyRazorpayKey(''), 'missing');
assert.equal(classifyRazorpayKey('rzp_test_demo'), 'test');
assert.equal(classifyRazorpayKey('rzp_live_demo'), 'live');
assert.equal(classifyRazorpayKey('unexpected'), 'unknown');

// The preferred path reuses the existing provider/service configuration rather
// than inventing a second set of funnel-specific credentials.
process.env.RAZORPAY_KEY_ID = 'rzp_test_phase12';
process.env.RAZORPAY_KEY_SECRET = 'existing_razorpay_secret';
process.env.RAZORPAY_WEBHOOK_SECRET = 'same_account_webhook_secret';
process.env.NEXT_PUBLIC_META_PIXEL_ID = '123456789';
process.env.META_CAPI_ACCESS_TOKEN = 'existing_meta_capi_if_available';
process.env.META_TEST_EVENT_CODE = 'TEST123';
process.env.MASTERCLASS_REGISTRATION_WEBHOOK_SECRET = 'existing_masterclass_secret';
process.env.PUBLIC_SITE_URL = 'https://staging.sikhadenge.in';
process.env.FUNNEL_CHECKOUT_SECRET = 'dedicated_checkout_secret';

let state = getIntegrationReadiness();
assert.equal(state.overall, 'ready');
assert.equal(state.razorpay.keyMode, 'test');
assert.equal(state.razorpay.safeForTestDiagnostics, true);
assert.equal(state.meta.readyForTestEvents, true);
assert.equal(state.whatsapp.registrationEndpointSource, 'existing-default');
assert.equal(state.whatsapp.registrationSecretConfigured, true);
assert.equal(state.whatsapp.statusCallbackSecretConfigured, true, 'registration secret may authenticate the status callback when no separate status token is configured');
assert.equal(state.whatsapp.runtimeReady, true);
assert.equal(state.whatsapp.readyForConnectivityTest, false, 'runtime readiness must not imply a side-effect-free health diagnostic exists');
assert.equal(state.site.checkoutSigningSecretConfigured, true);
assert.equal(state.blockers.length, 0);

const serialized = JSON.stringify(state);
for (const secret of ['existing_razorpay_secret','same_account_webhook_secret','existing_meta_capi_if_available','existing_masterclass_secret','dedicated_checkout_secret']) {
  assert.equal(serialized.includes(secret), false, `Secret leaked into readiness JSON: ${secret}`);
}

// A safe agent health endpoint is optional and separate from the real learner
// registration webhook. Supplying it only enables the diagnostic button.
process.env.WHATSAPP_AGENT_STATUS_URL = 'https://example.invalid/status';
process.env.DEVELOPER_API_TOKEN = 'developer_health_token';
state = getIntegrationReadiness();
assert.equal(state.whatsapp.runtimeReady, true);
assert.equal(state.whatsapp.readyForConnectivityTest, true);
assert.equal(JSON.stringify(state).includes('developer_health_token'), false);

// A live Razorpay key may be a valid runtime configuration, but the admin's
// safe diagnostic must refuse to create even a ₹1 order against Live Mode.
process.env.RAZORPAY_KEY_ID = 'rzp_live_phase12';
state = getIntegrationReadiness();
assert.equal(state.razorpay.keyMode, 'live');
assert.equal(state.razorpay.safeForTestDiagnostics, false);
assert.equal(state.razorpay.configured, true);

process.env.RAZORPAY_KEY_ID = 'rzp_test_phase12';
delete process.env.META_TEST_EVENT_CODE;
state = getIntegrationReadiness();
assert.equal(state.meta.readyForTestEvents, false);
assert.ok(state.meta.missing.some((item) => item.includes('META_TEST_EVENT_CODE')));
assert.equal(state.meta.level, 'ready', 'existing Pixel reuse remains ready even when optional CAPI Test Events are unavailable');

console.log('Phase 12 existing-integration readiness self-tests: PASS');
