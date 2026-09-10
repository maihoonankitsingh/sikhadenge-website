#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SNIP='/etc/nginx/snippets/sikhadenge-registration-v2-hot.conf'
ASSET_DIR='/var/www/sikhadenge.in/registration-native-suppress-v1-20260910'
ASSET="$ASSET_DIR/registration-native-suppress-v1-20260910.js"
TMP_ASSET='/tmp/registration-native-suppress-v1-20260910.js'
MARKER='/var/backups/sikhadenge/.registration-native-suppress-v1-last'
EXPECTED_CLAUDE='6c89ce95c27a5f56ab90bbf36d646233fae94a90c2bf7cdc6d2504900bb4871f'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
SCRIPT_URL='/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910'
OLD_BODY='<script src="/registration-stable-hot-v72.js?v=20260903-131023"></script><script src="/registration-stable-page1-v72.js?v=20260903-131023"></script></body>'
NEW_BODY='<script src="/registration-stable-hot-v72.js?v=20260903-131023"></script><script src="/registration-stable-page1-v72.js?v=20260903-131023"></script><script src="/registration-native-suppress-v1-20260910.js?v=native-suppress-v1-20260910"></script></body>'

rollback() {
  set +e
  if [[ ! -s "$MARKER" ]]; then
    sikhadenge-funnel-lockctl lock || true
    return 0
  fi
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/registration-snippet.before" ]] && cat "$B/registration-snippet.before" > "$SNIP"
  if [[ -f "$B/asset.before" ]]; then
    mkdir -p "$ASSET_DIR"; cp -a "$B/asset.before" "$ASSET"
  else
    rm -f "$ASSET"; rmdir "$ASSET_DIR" 2>/dev/null || true
  fi
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  /usr/local/sbin/sikhadenge-funnel-golden-guard --deep || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

test -s "$TMP_ASSET"
node --check "$TMP_ASSET"
TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/registration-native-suppress-v1-$TS"
mkdir -p "$BK"
cp -L "$SNIP" "$BK/registration-snippet.before"
[[ -f "$ASSET" ]] && cp -a "$ASSET" "$BK/asset.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "REG_NATIVE_SUPPRESS_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

sikhadenge-funnel-lockctl check
STATUS="$(sikhadenge-funnel-lockctl status)"
test "$(printf '%s\n' "$STATUS" | awk -F= '/^LOCK_STATE=/{print $2}')" = 'LOCKED'
test "$(printf '%s\n' "$STATUS" | awk -F= '/^CLAUDE_PUBLIC_SHA=/{print $2}')" = "$EXPECTED_CLAUDE"
test "$(printf '%s\n' "$STATUS" | awk -F= '/^AI_PUBLIC_SHA=/{print $2}')" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?reg_native_before=$TS" -o "$BK/claude.before.html"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?reg_native_before=$TS" -o "$BK/ai.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE"
test "$AI_BEFORE" = "$EXPECTED_AI"

python3 - "$SNIP" "$OLD_BODY" "$NEW_BODY" <<'PY'
import sys
p,old,new=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read()
print('PREFLIGHT_BODY_COUNTS',s.count(old),s.count(new))
if s.count(old)!=1 or s.count(new)!=0: raise SystemExit('unexpected registration body injector state')
if 'SIKHADENGE_REGISTRATION_NATIVE_SUPPRESS_V1_20260910' in s: raise SystemExit('native suppress marker already present')
PY

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

mkdir -p "$ASSET_DIR"
install -m 0644 "$TMP_ASSET" "$ASSET"
LOCAL_SHA="$(sha256sum "$ASSET" | awk '{print $1}')"
echo "REG_NATIVE_SUPPRESS_V1_LOCAL_SHA=$LOCAL_SHA"

python3 - "$SNIP" "$OLD_BODY" "$NEW_BODY" "$ASSET" <<'PY'
import sys
p,old,new,asset=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read()
if s.count(old)!=1: raise SystemExit(f'old body injector count={s.count(old)}')
s=s.replace(old,new,1)
block=f'''\n# SIKHADENGE_REGISTRATION_NATIVE_SUPPRESS_V1_20260910\nlocation = /registration-native-suppress-v1-20260910.js {{\n    alias {asset};\n    default_type application/javascript;\n    add_header Cache-Control "no-store" always;\n    add_header X-SD-Registration-Asset "native-suppress-v1-20260910" always;\n}}\n'''
s=s.rstrip()+"\n"+block
open(p,'w',encoding='utf-8').write(s)
print('REG_NATIVE_SUPPRESS_V1_SNIPPET_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/native-suppress.public.js" -w '%{http_code}' "https://sikhadenge.in${SCRIPT_URL}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/native-suppress.public.js" | awk '{print $1}')"
echo "REG_NATIVE_SUPPRESS_V1_CANONICAL_HTTP=$code"
echo "REG_NATIVE_SUPPRESS_V1_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$LOCAL_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=claude-masterclass&native_suppress_server=$TS" -o "$BK/registration.after.html"
test "$(grep -Fo "$SCRIPT_URL" "$BK/registration.after.html" | wc -l)" -eq 1
grep -Fq '/registration-stable-hot-v72.js?v=20260903-131023' "$BK/registration.after.html"
grep -Fq '/registration-stable-page1-v72.js?v=20260903-131023' "$BK/registration.after.html"
grep -Fq '/funnel-attribution-bridge-v1.js?v=20260903-1' "$BK/registration.after.html"
echo 'REG_NATIVE_SUPPRESS_V1_SERVER_INJECTION=PASS'

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?reg_native_after=$TS" -o "$BK/claude.after.html"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?reg_native_after=$TS" -o "$BK/ai.after.html"
CLAUDE_AFTER="$(sha256sum "$BK/claude.after.html" | awk '{print $1}')"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$CLAUDE_AFTER" = "$CLAUDE_BEFORE"
test "$AI_AFTER" = "$AI_BEFORE"
echo "CLAUDE_UNCHANGED_SHA=$CLAUDE_AFTER"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "REG_NATIVE_SUPPRESS_V1_STAGE_PASS=$BK"
