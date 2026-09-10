#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
STAGED='/tmp/claude-bonus-value-v1-20260910.js'
TARGET='/var/www/sikhadenge.in/claude-bonus-value-v1-20260910.js'
PUBLIC='/claude-bonus-value-v1-20260910.js'
MARKER='/var/backups/sikhadenge/.claude-bonus-value-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE_BEFORE='13f379fcc8b81c37c1b2efd126de2bb2d857477da38ff47ed7e827ee4b5af0f3'

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
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == 'rollback' ]]; then rollback; exit 0; fi
[[ "$MODE" == 'stage' ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-bonus-value-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$TARGET" ]] && cp -a "$TARGET" "$BK/target.before" || true
printf '%s\n' "$BK" > "$MARKER"

onerr(){ rc=$?; echo "BONUS_VALUE_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

test -s "$STAGED"
node --check "$STAGED"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?bonus_v1_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?bonus_v1_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
echo "BONUS_VALUE_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE_BEFORE"

sikhadenge-funnel-lockctl check
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

if grep -Fq 'SIKHADENGE_CLAUDE_BONUS_VALUE_V1_20260910' "$SITE"; then echo 'Bonus V1 route marker already exists' >&2; exit 31; fi
if grep -Fq 'SIKHADENGE_CLAUDE_BONUS_VALUE_V1_ASSET_20260910' "$ASSETS"; then echo 'Bonus V1 asset marker already exists' >&2; exit 32; fi

install -m 0644 "$STAGED" "$TARGET"
TARGET_SHA="$(sha256sum "$TARGET" | awk '{print $1}')"
echo "BONUS_VALUE_V1_TARGET_SHA=$TARGET_SHA"
node --check "$TARGET"

cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_BONUS_VALUE_V1_ASSET_20260910
location = $PUBLIC {
    alias $TARGET;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "bonus-value-v1-20260910" always;
}
EOF

python3 - "$SITE" "$PUBLIC" <<'PY'
import sys
p,public=sys.argv[1:]
s=open(p,encoding='utf-8',errors='ignore').read()
needle='location = /masterclass/claude/free {'
a=s.find(needle)
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
if 'SIKHADENGE_CLAUDE_BONUS_VALUE_V1_20260910' in route: raise SystemExit('Bonus marker unexpectedly present')
body_line="        sub_filter '</body>'"
if route.count(body_line)!=1: raise SystemExit(f'expected one body sub_filter, got {route.count(body_line)}')
anchor='<script defer src="/claude-testimonials-conversion-v1b-20260910.js"></script></body>'
if route.count(anchor)!=1: raise SystemExit(f'expected one testimonials body anchor, got {route.count(anchor)}')
replacement='<script defer src="/claude-testimonials-conversion-v1b-20260910.js"></script><script defer src="'+public+'"></script></body>'
route=route.replace(anchor,replacement,1)
route=route.replace(body_line,"        # SIKHADENGE_CLAUDE_BONUS_VALUE_V1_20260910\n"+body_line,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('BONUS_VALUE_V1_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/bonus.public.js" -w '%{http_code}' "https://sikhadenge.in${PUBLIC}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/bonus.public.js" | awk '{print $1}')"
echo "BONUS_VALUE_V1_CANONICAL_HTTP=$code"
echo "BONUS_VALUE_V1_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$TARGET_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?bonus_v1_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$PUBLIC" <<'PY'
import sys
raw=open(sys.argv[1],encoding='utf-8',errors='ignore').read(); public=sys.argv[2]
if raw.count(f'<script defer src="{public}"></script>')!=1: raise SystemExit('Bonus script tag missing or duplicated')
required=[
 '/funnel-attribution-bridge-v1.js?v=20260903-1',
 '/claude-testimonials-conversion-v1b-20260910.js',
 '/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910',
 '/claude-faq-v2.js?v=faq15-final2-20260904',
 '/claude-cta-typography-v3.js?v=cta-type-v3b-20260904',
 'FREE AI MASTERCLASS BONUS KIT',
 'AI Workflow Playbook',
 'Prompt + Context Framework',
 'Workbook + Deep-Work Checklist',
 'Master <mark>Claude + 25+ AI Tools</mark>',
 '<strong>150,000+ Learners</strong>',
]
for x in required:
    if x not in raw: raise SystemExit('CLAUDE_AFTER_MISSING '+repr(x))
print('BONUS_VALUE_V1_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?bonus_v1_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "BONUS_VALUE_V1_STAGE_PASS=$BK"
