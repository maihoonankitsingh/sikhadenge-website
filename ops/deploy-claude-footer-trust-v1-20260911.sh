#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
STAGED='/tmp/claude-footer-trust-v1-20260911.js'
TARGET='/var/www/sikhadenge.in/claude-footer-trust-v1-20260911.js'
PUBLIC='/claude-footer-trust-v1-20260911.js'
MARKER='/var/backups/sikhadenge/.claude-footer-trust-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE='87f0dd7849d2f26b6eb1eb24a886f6faedb046bbbfd37414553761d3274d7355'
FINAL='/claude-final-handoff-v1-20260910.js'

rollback(){
  set +e
  if [[ ! -s "$MARKER" ]]; then
    sikhadenge-funnel-lockctl lock || true
    return 0
  fi
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/sikhadenge.in-ssl.before" ]] && cat "$B/sikhadenge.in-ssl.before" > "$SITE"
  [[ -s "$B/claude-assets.before" ]] && cat "$B/claude-assets.before" > "$ASSETS"
  if [[ -f "$B/target.before" ]]; then cp -a "$B/target.before" "$TARGET"; else rm -f "$TARGET"; fi
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  /usr/local/sbin/sikhadenge-funnel-golden-guard --deep || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == 'rollback' ]]; then rollback; exit 0; fi
[[ "$MODE" == 'stage' ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

test -s "$STAGED"
node --check "$STAGED"

# Fail closed before creating a rollback marker or unlocking anything.
sikhadenge-funnel-lockctl check
/usr/local/sbin/sikhadenge-funnel-golden-guard --deep
STATUS="$(sikhadenge-funnel-lockctl status)"
test "$(printf '%s\n' "$STATUS" | awk -F= '/^LOCK_STATE=/{print $2}')" = 'LOCKED'
test "$(printf '%s\n' "$STATUS" | awk -F= '/^CLAUDE_PUBLIC_SHA=/{print $2}')" = "$EXPECTED_CLAUDE"
test "$(printf '%s\n' "$STATUS" | awk -F= '/^AI_PUBLIC_SHA=/{print $2}')" = "$EXPECTED_AI"

TS="$(date +%Y%m%d-%H%M%S)"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?footer_trust_before=$TS" -o "/tmp/footer-ai-before-$TS.html"
AI_BEFORE="$(sha256sum "/tmp/footer-ai-before-$TS.html" | awk '{print $1}')"
rm -f "/tmp/footer-ai-before-$TS.html"
echo "FOOTER_TRUST_V1_AI_BEFORE_SHA=$AI_BEFORE"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?footer_trust_before=$TS" -o "/tmp/footer-claude-before-$TS.html"
CLAUDE_BEFORE="$(sha256sum "/tmp/footer-claude-before-$TS.html" | awk '{print $1}')"
rm -f "/tmp/footer-claude-before-$TS.html"
echo "FOOTER_TRUST_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE"

python3 - "$SITE" "$FINAL" "$PUBLIC" <<'PY'
import sys
p,final,public=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
q=s.find('{',a); d=0; quote=None; esc=False; end=None
for i in range(q,len(s)):
    ch=s[i]
    if esc: esc=False; continue
    if ch=='\\': esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"): quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0: end=i+1; break
if end is None: raise SystemExit('Claude route parse failed')
route=s[a:end]
anchor=f'<script defer src="{final}"></script></body>'
print('FOOTER_TRUST_PREFLIGHT_ANCHOR_COUNT',route.count(anchor),'PUBLIC_COUNT',route.count(public))
if route.count(anchor)!=1 or route.count(public)!=0: raise SystemExit('unexpected footer trust route state')
if 'SIKHADENGE_CLAUDE_FOOTER_TRUST_V1_20260911' in route: raise SystemExit('footer trust route marker unexpectedly present')
PY

if grep -Fq 'SIKHADENGE_CLAUDE_FOOTER_TRUST_V1_ASSET_20260911' "$ASSETS"; then echo 'Footer trust asset marker already exists' >&2; exit 31; fi
if [[ -e "$TARGET" ]]; then echo 'Footer trust target unexpectedly exists' >&2; exit 32; fi

BK="/var/backups/sikhadenge/claude-footer-trust-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
printf '%s\n' "$BK" > "$MARKER"

onerr(){ rc=$?; echo "FOOTER_TRUST_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

install -m 0644 "$STAGED" "$TARGET"
TARGET_SHA="$(sha256sum "$TARGET" | awk '{print $1}')"
echo "FOOTER_TRUST_V1_TARGET_SHA=$TARGET_SHA"
node --check "$TARGET"

cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_FOOTER_TRUST_V1_ASSET_20260911
location = $PUBLIC {
    alias $TARGET;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "footer-trust-v1-20260911" always;
}
EOF

python3 - "$SITE" "$FINAL" "$PUBLIC" <<'PY'
import sys
p,final,public=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude exact route missing')
q=s.find('{',a); d=0; quote=None; esc=False; end=None
for i in range(q,len(s)):
    ch=s[i]
    if esc: esc=False; continue
    if ch=='\\': esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"): quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0: end=i+1; break
if end is None: raise SystemExit('Claude route parse failed')
route=s[a:end]
body_line="        sub_filter '</body>'"
anchor=f'<script defer src="{final}"></script></body>'
if route.count(body_line)!=1: raise SystemExit(f'expected one body sub_filter, got {route.count(body_line)}')
if route.count(anchor)!=1: raise SystemExit(f'expected one final handoff body anchor, got {route.count(anchor)}')
if public in route: raise SystemExit('footer trust public path already present')
replacement=f'<script defer src="{final}"></script><script defer src="{public}"></script></body>'
route=route.replace(anchor,replacement,1)
route=route.replace(body_line,"        # SIKHADENGE_CLAUDE_FOOTER_TRUST_V1_20260911\n"+body_line,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('FOOTER_TRUST_V1_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/footer-trust.public.js" -w '%{http_code}' "https://sikhadenge.in${PUBLIC}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/footer-trust.public.js" | awk '{print $1}')"
echo "FOOTER_TRUST_V1_CANONICAL_HTTP=$code"
echo "FOOTER_TRUST_V1_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$TARGET_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?footer_trust_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$PUBLIC" <<'PY'
import sys
raw=open(sys.argv[1],encoding='utf-8',errors='ignore').read(); public=sys.argv[2]
if raw.count(f'<script defer src="{public}"></script>')!=1: raise SystemExit('footer trust script tag missing or duplicated')
required=[
 '/funnel-attribution-bridge-v1.js?v=20260903-1',
 '/claude-faq-conversion-v1-20260910.js?v=faq-conversion-v1-20260910',
 '/claude-testimonials-conversion-v1b-20260910.js',
 '/claude-bonus-value-v1-20260910.js',
 '/claude-final-handoff-v1-20260910.js',
 '/gen-ai-masterclass/register-one-step',
 'Privacy Policy',
 'Terms &amp; Conditions',
]
for x in required:
    if x not in raw: raise SystemExit('CLAUDE_AFTER_MISSING '+repr(x))
print('FOOTER_TRUST_V1_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?footer_trust_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "FOOTER_TRUST_V1_STAGE_PASS=$BK"
