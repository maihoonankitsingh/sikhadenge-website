#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SNIP='/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf'
ASSET_SRC='/tmp/registration-whatsapp-outbound-tracking-v1-20260911.js'
ASSET_DIR='/var/www/sikhadenge.in/registration-whatsapp-outbound-tracking-v1-20260911'
ASSET_DST="$ASSET_DIR/registration-whatsapp-outbound-tracking-v1-20260911.js"
STATE='/var/tmp/sd-registration-wa-outbound-tracking-v1-last-backup'

EXPECTED_SNIP='f7007cf853659d6ec6fb7da9fb6a150d1d56156d87dae810c64a1eff9a7a8445'
EXPECTED_ASSET='ecf1473f4b7826dfdb0b2aafd7c1b6b87c8027d04c17ccae4e29f368e3fcee1f'
EXPECTED_HOT='bc9e84f6800bbbe856aaded94361c76dc5aee23a6c2dfe979926e15b4d50b313'
EXPECTED_PAGE1='13b891266630475342cd63ca28e5336d6b137b13490d6c13c3ddff71088fe592'
EXPECTED_NATIVE='c7b1e197a9636ff1a24229fd58095d8b42f62eb6f45d73a9a2518b239195d1d7'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE='87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355'

sha_file(){ sha256sum "$1" | awk '{print $1}'; }
fetch_sha(){ local url="$1" tmp; tmp="$(mktemp)"; curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 "$url" -o "$tmp"; sha_file "$tmp"; rm -f "$tmp"; }

rollback(){
  [[ -f "$STATE" ]] || { echo 'ROLLBACK_STATE_MISSING'; sikhadenge-funnel-lockctl lock || true; return 1; }
  local backup; backup="$(cat "$STATE")"
  [[ -d "$backup" ]] || { echo "ROLLBACK_BACKUP_MISSING=$backup"; sikhadenge-funnel-lockctl lock || true; return 1; }
  echo "ROLLBACK_FROM=$backup"
  sikhadenge-funnel-lockctl unlock 5 || true
  cp -a "$backup/sikhadenge-registration-v2-hot.conf" "$SNIP"
  if [[ -f "$backup/TARGET_EXISTED" ]] && grep -qx '0' "$backup/TARGET_EXISTED"; then rm -rf "$ASSET_DIR"; fi
  nginx -t
  systemctl reload nginx
  sikhadenge-funnel-lockctl reseal
  sikhadenge-funnel-lockctl lock
  sikhadenge-funnel-lockctl check
  /usr/local/sbin/sikhadenge-funnel-golden-guard --deep
  echo 'REGISTRATION_WA_OUTBOUND_TRACKING_V1_ROLLBACK_PASS=1'
}

if [[ "$MODE" == 'rollback' ]]; then rollback; exit 0; fi
[[ "$MODE" == 'stage' ]] || { echo "Unknown mode: $MODE" >&2; exit 2; }

[[ -f "$SNIP" ]] || { echo 'REGISTRATION_SNIPPET_MISSING'; exit 3; }
[[ -f "$ASSET_SRC" ]] || { echo 'ASSET_SOURCE_MISSING'; exit 4; }
[[ "$(sha_file "$ASSET_SRC")" == "$EXPECTED_ASSET" ]] || { echo "ASSET_SOURCE_SHA_MISMATCH=$(sha_file "$ASSET_SRC")"; exit 5; }
[[ "$(sha_file "$SNIP")" == "$EXPECTED_SNIP" ]] || { echo "SNIPPET_SHA_MISMATCH=$(sha_file "$SNIP")"; exit 6; }

sikhadenge-funnel-lockctl check
STATUS="$(sikhadenge-funnel-lockctl status)"
printf '%s\n' "$STATUS" | grep -E 'SEALED_AT|CLAUDE_PUBLIC_SHA|AI_PUBLIC_SHA|LOCK_STATE|LINKED_ASSETS|PROTECTED_SOURCE_FILES'
[[ "$(printf '%s\n' "$STATUS" | awk -F= '/^LOCK_STATE=/{print $2}')" == 'LOCKED' ]]
[[ "$(printf '%s\n' "$STATUS" | awk -F= '/^AI_PUBLIC_SHA=/{print $2}')" == "$EXPECTED_AI" ]]
[[ "$(printf '%s\n' "$STATUS" | awk -F= '/^CLAUDE_PUBLIC_SHA=/{print $2}')" == "$EXPECTED_CLAUDE" ]]
/usr/local/sbin/sikhadenge-funnel-golden-guard --deep

[[ "$(fetch_sha 'https://sikhadenge.in/registration-stable-hot-v72.js?v=20260903-131023')" == "$EXPECTED_HOT" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/registration-stable-page1-v72.js?v=20260903-131023')" == "$EXPECTED_PAGE1" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910')" == "$EXPECTED_NATIVE" ]]

TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/var/backups/sikhadenge/registration-wa-outbound-tracking-v1-$TS"
mkdir -p "$BACKUP"
cp -a "$SNIP" "$BACKUP/sikhadenge-registration-v2-hot.conf"
if [[ -d "$ASSET_DIR" ]]; then echo 1 > "$BACKUP/TARGET_EXISTED"; cp -a "$ASSET_DIR" "$BACKUP/asset-dir.before"; else echo 0 > "$BACKUP/TARGET_EXISTED"; fi
printf '%s' "$BACKUP" > "$STATE"

echo "BACKUP=$BACKUP"
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

install -d -m 755 "$ASSET_DIR"
install -m 644 "$ASSET_SRC" "$ASSET_DST"
[[ "$(sha_file "$ASSET_DST")" == "$EXPECTED_ASSET" ]]

python3 - "$SNIP" <<'PY'
import sys
p=sys.argv[1]
s=open(p,encoding='utf-8').read()
old='<script src="/registration-stable-hot-v72.js?v=20260903-131023"></script><script src="/registration-stable-page1-v72.js?v=20260903-131023"></script><script src="/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910"></script></body>'
new='<script src="/registration-stable-hot-v72.js?v=20260903-131023"></script><script src="/registration-stable-page1-v72.js?v=20260903-131023"></script><script src="/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910"></script><script src="/registration-whatsapp-outbound-tracking-v1-20260911.js?v=20260911-1"></script></body>'
marker='# SIKHADENGE_SITEWIDE_LIVE_PROOF_V1_REGISTRATION'
block='''# SIKHADENGE_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_START
location = /registration-whatsapp-outbound-tracking-v1-20260911.js {
    alias /var/www/sikhadenge.in/registration-whatsapp-outbound-tracking-v1-20260911/registration-whatsapp-outbound-tracking-v1-20260911.js;
    default_type application/javascript;
    add_header Cache-Control "private, no-store, no-cache, must-revalidate, max-age=0" always;
    add_header X-SD-Registration-Asset "wa-outbound-tracking-v1-20260911" always;
    access_log off;
}
# SIKHADENGE_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_END

'''
if s.count(old)!=1: raise SystemExit(f'expected body injector once, got {s.count(old)}')
if new in s or 'SIKHADENGE_REGISTRATION_WHATSAPP_OUTBOUND_TRACKING_V1_START' in s: raise SystemExit('tracking layer already present')
if s.count(marker)!=1: raise SystemExit(f'expected marker once, got {s.count(marker)}')
s=s.replace(old,new,1)
s=s.replace(marker,block+marker,1)
open(p,'w',encoding='utf-8').write(s)
print('REGISTRATION_WA_TRACKING_SNIPPET_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

ASSET_HTTP="$(curl -sS -o /tmp/sd-wa-track.js -w '%{http_code}' --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 'https://sikhadenge.in/registration-whatsapp-outbound-tracking-v1-20260911.js?v=20260911-1')"
[[ "$ASSET_HTTP" == '200' ]]
[[ "$(sha_file /tmp/sd-wa-track.js)" == "$EXPECTED_ASSET" ]]
rm -f /tmp/sd-wa-track.js

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 'https://sikhadenge.in/gen-ai-masterclass/register-one-step?wa_track_stage=1' -o /tmp/sd-reg-stage.html
[[ "$(grep -o '/registration-whatsapp-outbound-tracking-v1-20260911.js?v=20260911-1' /tmp/sd-reg-stage.html | wc -l)" -eq 1 ]]
[[ "$(grep -o '/registration-stable-hot-v72.js?v=20260903-131023' /tmp/sd-reg-stage.html | wc -l)" -eq 1 ]]
[[ "$(grep -o '/registration-stable-page1-v72.js?v=20260903-131023' /tmp/sd-reg-stage.html | wc -l)" -eq 1 ]]
[[ "$(grep -o '/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910' /tmp/sd-reg-stage.html | wc -l)" -eq 1 ]]
rm -f /tmp/sd-reg-stage.html

[[ "$(fetch_sha 'https://sikhadenge.in/registration-stable-hot-v72.js?v=20260903-131023')" == "$EXPECTED_HOT" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/registration-stable-page1-v72.js?v=20260903-131023')" == "$EXPECTED_PAGE1" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910')" == "$EXPECTED_NATIVE" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/masterclass/ai-video')" == "$EXPECTED_AI" ]]
[[ "$(fetch_sha 'https://sikhadenge.in/masterclass/claude/free')" == "$EXPECTED_CLAUDE" ]]

echo "TRACKER_CANONICAL_SHA=$EXPECTED_ASSET"
echo "AI_UNCHANGED_SHA=$EXPECTED_AI"
echo "CLAUDE_UNCHANGED_SHA=$EXPECTED_CLAUDE"
echo "REGISTRATION_WA_OUTBOUND_TRACKING_V1_STAGE_PASS=$BACKUP"
