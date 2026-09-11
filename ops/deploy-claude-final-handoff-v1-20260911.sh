#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
DIR="$CWD/.next/static/chunks/pages/masterclass/claude"
BASE_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806.js'
CURRENT_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-closing-v1-20260910.js'
NEW_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-closing-v1-handoff-v1-20260911.js'
CURRENT="$DIR/$CURRENT_NAME"
NEW="$DIR/$NEW_NAME"
BASE_URL="/_next/static/chunks/pages/masterclass/claude/$BASE_NAME"
CURRENT_URL="/_next/static/chunks/pages/masterclass/claude/$CURRENT_NAME"
NEW_URL="/_next/static/chunks/pages/masterclass/claude/$NEW_NAME"
MARKER='/var/backups/sikhadenge/.claude-final-handoff-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE_BEFORE='7c27c30a3d042e65eabb28d91d0a668e9f373f46df514d7d083e6f3d9ba41b85'
EXPECTED_CURRENT_CHUNK_SHA='59664d0c769afb5f1425beb15ea7f19008e0a12d1334c86cea58ca87a5c76f48'
OLD_COPY='Reserve your free seat and continue to the existing SikhaDenge registration page.'
NEW_COPY='Reserve your free seat for the live masterclass. Complete registration once, then follow the confirmation and WhatsApp joining instructions to attend.'

rollback() {
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
  if [[ -f "$B/new-chunk.before" ]]; then cp -a "$B/new-chunk.before" "$NEW"; else rm -f "$NEW"; fi
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-final-handoff-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$NEW" ]] && cp -a "$NEW" "$BK/new-chunk.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "FINAL_HANDOFF_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  "https://sikhadenge.in/masterclass/ai-video?handoff_v1_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  "https://sikhadenge.in/masterclass/claude/free?handoff_v1_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
echo "FINAL_HANDOFF_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE_BEFORE"
grep -Fq "$OLD_COPY" "$BK/claude.before.html"

sikhadenge-funnel-lockctl check
test -s "$CURRENT"
CURRENT_LOCAL_SHA="$(sha256sum "$CURRENT" | awk '{print $1}')"
echo "FINAL_HANDOFF_V1_CURRENT_LOCAL_SHA=$CURRENT_LOCAL_SHA"
test "$CURRENT_LOCAL_SHA" = "$EXPECTED_CURRENT_CHUNK_SHA"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  "https://sikhadenge.in${CURRENT_URL}" -o "$BK/current.public.js"
test "$(sha256sum "$BK/current.public.js" | awk '{print $1}')" = "$CURRENT_LOCAL_SHA"

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

if grep -Fq 'SIKHADENGE_CLAUDE_FINAL_HANDOFF_V1_20260911' "$SITE"; then
  echo 'Final Handoff V1 route marker already exists' >&2; exit 31
fi
if grep -Fq 'SIKHADENGE_CLAUDE_FINAL_HANDOFF_V1_ASSET_20260911' "$ASSETS"; then
  echo 'Final Handoff V1 asset marker already exists' >&2; exit 32
fi

cp -a "$CURRENT" "$NEW"
python3 - "$NEW" "$OLD_COPY" "$NEW_COPY" <<'PY'
import sys
p,old,new=sys.argv[1:]
s=open(p,encoding='utf-8').read()
c=s.count(old)
print('FINAL_HANDOFF_CLIENT_REPLACE_COUNT',c)
if c!=1: raise SystemExit(f'expected one final handoff paragraph, got {c}')
s=s.replace(old,new,1)
open(p,'w',encoding='utf-8').write(s)
print('FINAL_HANDOFF_V1_CLIENT_CHUNK_PATCH=PASS')
PY
node --check "$NEW"
NEW_SHA="$(sha256sum "$NEW" | awk '{print $1}')"
echo "FINAL_HANDOFF_V1_NEW_CHUNK_SHA=$NEW_SHA"

cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_FINAL_HANDOFF_V1_ASSET_20260911
location = $NEW_URL {
    alias $NEW;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "final-handoff-v1-20260911" always;
}
EOF

python3 - "$SITE" "$BASE_URL" "$CURRENT_URL" "$NEW_URL" "$OLD_COPY" "$NEW_COPY" <<'PY'
import sys
p,baseurl,currenturl,newurl,oldcopy,newcopy=sys.argv[1:]
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
old_line=f"        sub_filter '{baseurl}' '{currenturl}';"
new_line=f"        sub_filter '{baseurl}' '{newurl}';"
print('FINAL_HANDOFF_CURRENT_MAPPING_COUNT',route.count(old_line))
if route.count(old_line)!=1: raise SystemExit(f'current chunk mapping count={route.count(old_line)}')
route=route.replace(old_line,new_line,1)
marker='        # SIKHADENGE_CLAUDE_FINAL_HANDOFF_V1_20260911\n'
filter_line='        sub_filter '+repr(oldcopy)+' '+repr(newcopy)+';\n'
route=route.replace(new_line+'\n',new_line+'\n'+marker+filter_line,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('FINAL_HANDOFF_V1_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  -o "$BK/handoff.public.js" -w '%{http_code}' "https://sikhadenge.in${NEW_URL}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/handoff.public.js" | awk '{print $1}')"
echo "FINAL_HANDOFF_V1_CANONICAL_HTTP=$code"
echo "FINAL_HANDOFF_V1_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$NEW_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  "https://sikhadenge.in/masterclass/claude/free?handoff_v1_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$NEW_URL" "$NEW_COPY" "$OLD_COPY" <<'PY'
import html,re,sys
p,newurl,newcopy,oldcopy=sys.argv[1:]
raw=open(p,encoding='utf-8',errors='ignore').read()
text=html.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',raw)))
if newurl not in raw: raise SystemExit('new handoff chunk URL missing from SSR')
if newcopy not in text: raise SystemExit('new handoff paragraph missing from SSR text')
if oldcopy in text: raise SystemExit('old handoff paragraph still visible in SSR')
required=[
 'Master Claude + 25+ AI Tools',
 '150,000+ Learners',
 'LIVE MASTERCLASS AGENDA',
 'WHO THIS MASTERCLASS IS FOR',
 'FREE AI MASTERCLASS BONUS KIT',
 'Learn AI. Apply it.',
 'Frequently asked questions.',
 'Your first AI workflow starts with one',
]
for x in required:
    if x not in text: raise SystemExit('SSR_MISSING '+repr(x))
for src in [
 '/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910',
 '/claude-testimonials-conversion-v1b-20260910.js',
 '/claude-bonus-value-v1-20260910.js',
 '/claude-faq-conversion-v1-20260910.js?v=faq-conversion-v1-20260910',
 '/funnel-attribution-bridge-v1.js?v=20260903-1',
]:
    if src not in raw: raise SystemExit('SSR_SCRIPT_MISSING '+src)
print('FINAL_HANDOFF_V1_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 40 \
  "https://sikhadenge.in/masterclass/ai-video?handoff_v1_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "FINAL_HANDOFF_V1_STAGE_PASS=$BK"
