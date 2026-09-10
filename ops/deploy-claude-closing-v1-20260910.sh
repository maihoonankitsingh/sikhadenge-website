#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
DIR="$CWD/.next/static/chunks/pages/masterclass/claude"
BASE_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806.js'
CURRENT_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-20260910.js'
NEW_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1b-closing-v1-20260910.js'
CURRENT="$DIR/$CURRENT_NAME"
NEW="$DIR/$NEW_NAME"
BASE_URL="/_next/static/chunks/pages/masterclass/claude/$BASE_NAME"
CURRENT_URL="/_next/static/chunks/pages/masterclass/claude/$CURRENT_NAME"
NEW_URL="/_next/static/chunks/pages/masterclass/claude/$NEW_NAME"
MARKER='/var/backups/sikhadenge/.claude-closing-v1-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE_BEFORE='8969a803bf40da796f5da5a31e98170ac4f6b5f054b1512de5802873fbeb832a'
OLD_CLIENT="Reserve your free seat and learn practical workflows across today's most useful AI tools."
NEW_COPY='Join the free live masterclass and learn a repeatable AI workflow for research, content, productivity and everyday work — in easy Hinglish, with no coding required.'
OLD_SSR='Reserve your free seat and learn practical workflows across today&#x27;s most useful AI tools.'

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
BK="/var/backups/sikhadenge/claude-closing-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$NEW" ]] && cp -a "$NEW" "$BK/new-chunk.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "CLOSING_V1_STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?closing_v1_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?closing_v1_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
echo "CLOSING_V1_CLAUDE_BEFORE_SHA=$CLAUDE_BEFORE"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE_BEFORE"

sikhadenge-funnel-lockctl check
test -s "$CURRENT"
CURRENT_LOCAL_SHA="$(sha256sum "$CURRENT" | awk '{print $1}')"
curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in${CURRENT_URL}" -o "$BK/current.public.js"
test "$(sha256sum "$BK/current.public.js" | awk '{print $1}')" = "$CURRENT_LOCAL_SHA"

sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

if grep -Fq 'SIKHADENGE_CLAUDE_CLOSING_V1_20260910' "$SITE"; then
  echo 'Closing V1 route marker already exists' >&2; exit 31
fi
if grep -Fq 'SIKHADENGE_CLAUDE_CLOSING_V1_ASSET_20260910' "$ASSETS"; then
  echo 'Closing V1 asset marker already exists' >&2; exit 32
fi

cp -a "$CURRENT" "$NEW"
python3 - "$NEW" "$OLD_CLIENT" "$NEW_COPY" <<'PY'
import sys
p,old,new=sys.argv[1:]
s=open(p,encoding='utf-8').read()
c=s.count(old)
print('CLOSING_CLIENT_REPLACE_COUNT',c)
if c!=1: raise SystemExit(f'expected one client closing paragraph, got {c}')
s=s.replace(old,new,1)
open(p,'w',encoding='utf-8').write(s)
print('CLOSING_CLIENT_CHUNK_PATCH=PASS')
PY
node --check "$NEW"
NEW_SHA="$(sha256sum "$NEW" | awk '{print $1}')"
echo "CLOSING_V1_NEW_CHUNK_SHA=$NEW_SHA"

cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_CLOSING_V1_ASSET_20260910
location = $NEW_URL {
    alias $NEW;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "closing-v1-20260910" always;
}
EOF

python3 - "$SITE" "$BASE_URL" "$CURRENT_URL" "$NEW_URL" "$OLD_SSR" "$NEW_COPY" <<'PY'
import sys
p,baseurl,currenturl,newurl,oldssr,newcopy=sys.argv[1:]
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
if route.count(old_line)!=1: raise SystemExit(f'current chunk mapping count={route.count(old_line)}')
route=route.replace(old_line,new_line,1)
if oldssr not in open('/var/backups/sikhadenge/.noop','w').name:
    pass
# Exact upstream HTML uses today&#x27;s. Add one narrow first-paint replacement.
marker='        # SIKHADENGE_CLAUDE_CLOSING_V1_20260910\n'
filter_line='        sub_filter '+repr(oldssr)+' '+repr(newcopy)+';\n'
route=route.replace(new_line+'\n',new_line+'\n'+marker+filter_line,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('CLOSING_V1_ROUTE_PATCH=PASS')
PY
rm -f /var/backups/sikhadenge/.noop

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  -o "$BK/closing.public.js" -w '%{http_code}' "https://sikhadenge.in${NEW_URL}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/closing.public.js" | awk '{print $1}')"
echo "CLOSING_V1_CANONICAL_HTTP=$code"
echo "CLOSING_V1_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$NEW_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?closing_v1_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$NEW_URL" "$NEW_COPY" "$OLD_SSR" <<'PY'
import html,re,sys
p,newurl,newcopy,oldssr=sys.argv[1:]
raw=open(p,encoding='utf-8',errors='ignore').read()
text=html.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',raw)))
if newurl not in raw: raise SystemExit('new closing chunk URL missing from SSR')
if newcopy not in text: raise SystemExit('new closing paragraph missing from SSR text')
if html.unescape(oldssr) in text: raise SystemExit('old closing paragraph still visible in SSR')
required=[
 'Master Claude + 25+ AI Tools',
 '150,000+ Learners',
 'LIVE MASTERCLASS AGENDA',
 'WHO THIS MASTERCLASS IS FOR',
 'FREE AI MASTERCLASS BONUS KIT',
 'Learn AI. Apply it.',
 'Frequently asked questions.',
]
for x in required:
    if x not in text: raise SystemExit('SSR_MISSING '+repr(x))
for src in [
 '/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910',
 '/claude-testimonials-conversion-v1b-20260910.js',
 '/claude-bonus-value-v1-20260910.js',
 '/funnel-attribution-bridge-v1.js?v=20260903-1',
]:
    if src not in raw: raise SystemExit('SSR_SCRIPT_MISSING '+src)
print('CLOSING_V1_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?closing_v1_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

trap - ERR
echo "CLOSING_V1_STAGE_PASS=$BK"
