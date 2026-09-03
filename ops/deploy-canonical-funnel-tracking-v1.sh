#!/usr/bin/env bash
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeuo pipefail
export PM2_HOME=/root/.pm2
TS="$(date +%Y%m%d-%H%M%S)"
BACK="/var/backups/sikhadenge/canonical-funnel-tracking-v1-$TS"
mkdir -p "$BACK"
V72=/var/www/sikhadenge.in/registration-stable-v72-20260903-131023
PAGE_SHA='13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592'
HOT_SHA='bc9e84f6800bbbe856aaded94361c76dc5aee23a6c2dfe979926e15b4d50b313'
D=/opt/sikhadenge-dashboard
D_COMMIT='8884c76570d03595aa145513e6a39fcb27e74f72'
TARGETS=(
  'app/api/webhooks/leads/route.ts'
  'app/dashboard/analytics/funnel/page.tsx'
  'app/dashboard/analytics/funnel/lead/[id]/page.tsx'
  'app/dashboard/analytics/page.tsx'
)

pid_for(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
pm2_name_for_pid(){ local pid="$1"; pm2 jlist | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{let a=JSON.parse(s),p=Number(process.argv[1]);let x=a.find(v=>Number(v.pid)===p);if(x)process.stdout.write(x.name||"")})' "$pid"; }
run_build(){ if [[ -f pnpm-lock.yaml ]] && command -v pnpm >/dev/null 2>&1; then pnpm run build; elif [[ -f yarn.lock ]] && command -v yarn >/dev/null 2>&1; then yarn build; else npm run build; fi; }
check_v72(){
  [[ "$(sha256sum "$V72/registration-stable-page1-v72.js" | awk '{print $1}')" == "$PAGE_SHA" ]]
  [[ "$(sha256sum "$V72/registration-stable-hot-v72.js" | awk '{print $1}')" == "$HOT_SHA" ]]
}
check_v72 || { echo V72_PRE_HASH_GUARD_FAIL; exit 1; }

echo '===== DASHBOARD_PREFLIGHT ====='
[[ -d "$D/.git" ]] || { echo DASHBOARD_REPO_MISSING; exit 1; }
cd "$D"
git fetch origin main
if ! git merge-base --is-ancestor "$D_COMMIT" origin/main; then echo DASHBOARD_REQUIRED_COMMIT_NOT_ON_ORIGIN_MAIN; exit 1; fi
for f in "${TARGETS[@]}"; do
  if [[ -n "$(git status --porcelain -- "$f")" ]]; then echo "DASHBOARD_TARGET_DIRTY=$f"; exit 1; fi
done
D_PID="$(pid_for 3400)"; D_APP="$(pm2_name_for_pid "$D_PID")"
[[ -n "$D_PID" && -n "$D_APP" ]] || { echo DASHBOARD_PM2_GUARD_FAIL; exit 1; }
echo "DASHBOARD_APP=$D_APP"

# The existing unrelated live local modifications are copied into the isolated build.
DBUILD="/opt/sikhadenge-dashboard-tracking-build-$TS"
rm -rf "$DBUILD"
mkdir -p "$DBUILD"
rsync -a --delete --exclude='.git' --exclude='.next' --exclude='node_modules' "$D/" "$DBUILD/"
ln -s "$D/node_modules" "$DBUILD/node_modules"
for f in "${TARGETS[@]}"; do
  mkdir -p "$DBUILD/$(dirname "$f")"
  git -C "$D" show "origin/main:$f" > "$DBUILD/$f"
done
cd "$DBUILD"
run_build

# Backup only source targets plus a reversible atomic build directory.
mkdir -p "$BACK/dashboard-sources"
for f in 'app/api/webhooks/leads/route.ts' 'app/dashboard/analytics/page.tsx'; do mkdir -p "$BACK/dashboard-sources/$(dirname "$f")"; cp -a "$D/$f" "$BACK/dashboard-sources/$f"; done
D_OLD_NEXT="$D/.next.canonical-tracking-before-$TS"
[[ -d "$D/.next" ]] || { echo DASHBOARD_NEXT_MISSING; exit 1; }

rollback_dashboard(){
  echo ROLLBACK_DASHBOARD_TRACKING
  cp -a "$BACK/dashboard-sources/app/api/webhooks/leads/route.ts" "$D/app/api/webhooks/leads/route.ts" || true
  cp -a "$BACK/dashboard-sources/app/dashboard/analytics/page.tsx" "$D/app/dashboard/analytics/page.tsx" || true
  rm -rf "$D/app/dashboard/analytics/funnel" || true
  if [[ -d "$D_OLD_NEXT" ]]; then rm -rf "$D/.next"; mv "$D_OLD_NEXT" "$D/.next"; fi
  pm2 restart "$D_APP" --update-env >/dev/null 2>&1 || true
}

for f in "${TARGETS[@]}"; do mkdir -p "$D/$(dirname "$f")"; cp -a "$DBUILD/$f" "$D/$f"; done
mv "$D/.next" "$D_OLD_NEXT"
mv "$DBUILD/.next" "$D/.next"
pm2 restart "$D_APP" --update-env
sleep 4
if ! curl -fsS --max-time 12 'http://127.0.0.1:3400/api/masterclass/lead' >/dev/null; then rollback_dashboard; echo DASHBOARD_HEALTH_FAIL; exit 1; fi

echo 'DASHBOARD_TRACKING_DEPLOY=PASS'

# Validate the signed webhook contract with an intentionally invalid identity payload.
D_SECRET="$(tr '\0' '\n' < "/proc/$(pid_for 3400)/environ" | sed -n 's/^LEAD_INGEST_WEBHOOK_SECRET=//p' | head -1)"
[[ -n "$D_SECRET" ]] || { rollback_dashboard; echo DASHBOARD_LEAD_SECRET_MISSING; exit 1; }
probe='{"source":"tracking-contract-probe"}'
ts="$(date +%s)"
sig="$(printf '%s' "$ts.$probe" | openssl dgst -sha256 -hmac "$D_SECRET" -hex | awk '{print $NF}')"
code="$(curl -sS -o /tmp/canonical-probe.json -w '%{http_code}' -X POST 'http://127.0.0.1:3400/api/webhooks/leads' -H 'content-type: application/json' -H "x-sikhadenge-signature: t=$ts,v1=$sig" -H 'idempotency-key: tracking-contract-probe' --data "$probe")"
[[ "$code" == '400' ]] && grep -Fq 'email_or_phone_required' /tmp/canonical-probe.json || { rollback_dashboard; echo "DASHBOARD_SIGNED_WEBHOOK_PROBE_FAIL HTTP=$code"; cat /tmp/canonical-probe.json; exit 1; }
echo 'DASHBOARD_SIGNED_WEBHOOK_PROBE=PASS'

# -------------------------------------------------------------------
# Registration API: isolated build with additive fail-soft CRM sync.
# -------------------------------------------------------------------
echo '===== REGISTRATION_CANONICAL_SYNC ====='
R_PID="$(pid_for 3955)"; R_CWD="$(readlink -f /proc/$R_PID/cwd)"; R_APP="$(pm2_name_for_pid "$R_PID")"
R_ROUTE='app/api/masterclass/lead/route.ts'
[[ -n "$R_PID" && -n "$R_CWD" && -n "$R_APP" && -f "$R_CWD/$R_ROUTE" ]] || { rollback_dashboard; echo REGISTRATION_RUNTIME_GUARD_FAIL; exit 1; }
echo "REGISTRATION_APP=$R_APP"
RBUILD="/var/www/sikhadenge.in/.canonical-registration-build-$TS"
rm -rf "$RBUILD"; mkdir -p "$RBUILD"
rsync -a --delete --exclude='.next' --exclude='node_modules' "$R_CWD/" "$RBUILD/"
ln -s "$R_CWD/node_modules" "$RBUILD/node_modules"

python3 - "$RBUILD/$R_ROUTE" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text()
if 'CANONICAL_DASHBOARD_LEAD_SYNC_V1' not in s:
    marker='async function sendMetaLeadEvent(args: {'
    if marker not in s: raise SystemExit('sendMetaLeadEvent marker missing')
    helper=r'''// CANONICAL_DASHBOARD_LEAD_SYNC_V1
async function pushToCanonicalDashboardLead(args: {
  name: string;
  email: string;
  phone: string;
  source?: string | null;
  page: string;
  createdId?: string | null;
  submissionId?: string | null;
  tracking: any;
  raw: any;
  advertisingAttributionAllowed: boolean;
}) {
  const secret = process.env.LEAD_INGEST_WEBHOOK_SECRET?.trim() || "";
  const endpoint = process.env.LEAD_INGEST_WEBHOOK_ENDPOINT?.trim() ||
    "http://127.0.0.1:3400/api/webhooks/leads";
  if (!secret || !args.createdId) {
    console.log("CANONICAL_DASHBOARD_LEAD_SYNC_SKIPPED", {
      reason: !secret ? "secret_missing" : "lead_id_missing",
      leadId: args.createdId || null,
    });
    return;
  }
  const payload = {
    masterclassLeadId: args.createdId,
    masterclassSubmissionId: args.submissionId || undefined,
    name: args.name,
    email: args.email,
    phone: args.phone,
    source: args.source || "website",
    course: "Gen AI Masterclass",
    landingPage: args.tracking?.landing_url || args.raw?.landingUrl || undefined,
    referrer: args.tracking?.referrer || args.raw?.referrer || undefined,
    utmSource: args.tracking?.utm_source || undefined,
    utmMedium: args.tracking?.utm_medium || undefined,
    utmCampaign: args.tracking?.utm_campaign || undefined,
    utmCampaignId: args.tracking?.utm_campaign_id || undefined,
    utmAd: args.raw?.utm_ad || undefined,
    utmAdId: args.tracking?.utm_ad_id || undefined,
    utmAdset: args.raw?.utm_adset || undefined,
    utmAdsetId: args.tracking?.utm_adset_id || undefined,
    utmTerm: args.tracking?.utm_term || undefined,
    utmContent: args.tracking?.utm_content || undefined,
    utmId: args.tracking?.utm_id || undefined,
    fbclid: args.advertisingAttributionAllowed ? args.tracking?.fbclid || undefined : undefined,
    gclid: args.advertisingAttributionAllowed ? args.tracking?.gclid || undefined : undefined,
    msclkid: args.advertisingAttributionAllowed ? args.tracking?.msclkid || undefined : undefined,
    anonymousId: args.raw?.anonymousId || undefined,
    sessionId: args.raw?.sessionId || undefined,
    firstTouch: args.raw?.firstTouch || undefined,
    lastTouch: args.raw?.lastTouch || undefined,
    advertisingConsent: args.advertisingAttributionAllowed,
    consent: {
      marketing: args.raw?.marketingConsent === true,
      whatsapp: args.raw?.whatsappConsent === true,
      termsAccepted: args.raw?.termsAccepted === true || args.raw?.consent === true,
    },
  };
  const body = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
  const idempotencyKey = `masterclass:${args.createdId}:${args.submissionId || "lead"}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-sikhadenge-signature": `t=${timestamp},v1=${signature}`,
      "idempotency-key": idempotencyKey,
    },
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  const text = await response.text().catch(() => "");
  if (!response.ok) {
    throw new Error(`Canonical dashboard lead sync failed: ${response.status} ${text.slice(0, 240)}`);
  }
  console.log("CANONICAL_DASHBOARD_LEAD_SYNC_OK", {
    leadId: args.createdId,
    submissionId: args.submissionId || null,
    status: response.status,
  });
}

'''
    s=s.replace(marker,helper+marker,1)

call_marker='''    await pushToNeodoveRealtime({\n      name,\n      phone,\n      email,\n      page,\n    });'''
if 'CANONICAL_DASHBOARD_LEAD_SYNC_CALL_V1' not in s:
    if call_marker not in s: raise SystemExit('NeoDove call marker missing')
    call=r'''    // CANONICAL_DASHBOARD_LEAD_SYNC_CALL_V1
    try {
      await pushToCanonicalDashboardLead({
        name,
        email,
        phone,
        source: created?.source ?? data.source ?? null,
        page,
        createdId: created?.id ?? null,
        submissionId,
        tracking,
        raw,
        advertisingAttributionAllowed,
      });
    } catch (canonicalSyncError) {
      console.error("CANONICAL_DASHBOARD_LEAD_SYNC_ERROR", canonicalSyncError);
    }

'''
    s=s.replace(call_marker,call+call_marker,1)
p.write_text(s)
PY

cd "$RBUILD"
run_build
mkdir -p "$BACK/registration-source"
cp -a "$R_CWD/$R_ROUTE" "$BACK/registration-source/route.ts.before"
R_OLD_NEXT="$R_CWD/.next.canonical-tracking-before-$TS"
[[ -d "$R_CWD/.next" ]] || { rollback_dashboard; echo REGISTRATION_NEXT_MISSING; exit 1; }

rollback_registration(){
  echo ROLLBACK_REGISTRATION_CANONICAL_SYNC
  cp -a "$BACK/registration-source/route.ts.before" "$R_CWD/$R_ROUTE" || true
  if [[ -d "$R_OLD_NEXT" ]]; then rm -rf "$R_CWD/.next"; mv "$R_OLD_NEXT" "$R_CWD/.next"; fi
  pm2 restart "$R_APP" --update-env >/dev/null 2>&1 || true
}

cp -a "$RBUILD/$R_ROUTE" "$R_CWD/$R_ROUTE"
mv "$R_CWD/.next" "$R_OLD_NEXT"
mv "$RBUILD/.next" "$R_CWD/.next"
export LEAD_INGEST_WEBHOOK_SECRET="$D_SECRET"
export LEAD_INGEST_WEBHOOK_ENDPOINT='http://127.0.0.1:3400/api/webhooks/leads'
pm2 restart "$R_APP" --update-env
pm2 save >/dev/null
sleep 5
if ! curl -LfsS --max-time 15 'https://sikhadenge.in/gen-ai-masterclass/register-one-step?tracking=canonical-v1' >/tmp/registration-canonical-check.html; then rollback_registration; rollback_dashboard; echo REGISTRATION_HEALTH_FAIL; exit 1; fi
grep -Fq '/funnel-attribution-bridge-v1.js?v=20260903-1' /tmp/registration-canonical-check.html || { rollback_registration; rollback_dashboard; echo REGISTRATION_BRIDGE_MISSING_AFTER_RESTART; exit 1; }

# Runtime env handoff presence only; never print the secret.
R_PID2="$(pid_for 3955)"
if ! tr '\0' '\n' < "/proc/$R_PID2/environ" | grep -q '^LEAD_INGEST_WEBHOOK_SECRET=.'; then rollback_registration; rollback_dashboard; echo REGISTRATION_SECRET_HANDOFF_FAIL; exit 1; fi

grep -Fq 'CANONICAL_DASHBOARD_LEAD_SYNC_V1' "$R_CWD/$R_ROUTE"
check_v72 || { rollback_registration; rollback_dashboard; echo V72_POST_HASH_GUARD_FAIL; exit 1; }

echo 'REGISTRATION_CANONICAL_SYNC=PASS'
echo 'V72_HASH_LOCK=PASS'
echo "BACKUP=$BACK"
echo "DASHBOARD_OLD_NEXT=$D_OLD_NEXT"
echo "REGISTRATION_OLD_NEXT=$R_OLD_NEXT"
echo 'RESULT=CANONICAL_FUNNEL_TRACKING_V1_LIVE'
REMOTE
