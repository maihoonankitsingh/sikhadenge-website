#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
STAGED='/tmp/claude-testimonials-conversion-v1b-20260910.js'
TARGET='/var/www/sikhadenge.in/claude-testimonials-conversion-v1b-20260910.js'
PUBLIC='/claude-testimonials-conversion-v1b-20260910.js'
MARKER='/var/backups/sikhadenge/.claude-testimonials-v1b-last'
EXPECTED_AI='b03ab6b210bceed43573d2037816ae8f8208969ea73cecaba60e14eef10c12d2'
EXPECTED_CLAUDE_BEFORE='06453cdded91aad388608d58124921a471dc6cdc5af8b1ab90fcfcdb2e372530'

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
  if [[ -f "$B/target.before" ]]; then
    cp -a "$B/target.before" "$TARGET"
  else
    rm -f "$TARGET"
  fi
  if nginx -t; then systemctl reload nginx; fi
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  sikhadenge-funnel-lockctl check || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == 'rollback' ]]; then
  rollback
  exit 0
fi
[[ "$MODE" == 'stage' ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-testimonials-v1b-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$TARGET" ]] && cp -a "$TARGET" "$BK/target.before" || true
printf '%s\n' "$BK" > "$MARKER"

onerr() {
  rc=$?
  echo "TESTIMONIALS_V1B_STAGE_ERROR_RC=$rc"
  rollback
  exit "$rc"
}
trap onerr ERR

test -s "$STAGED"
node --check "$STAGED"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?testimonials_v1b_before=$TS" -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html" | awk '{print $1}')"
test "$AI_BEFORE" = "$EXPECTED_AI"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?testimonials_v1b_before=$TS" -o "$BK/claude.before.html"
CLAUDE_BEFORE="$(sha256sum "$BK/claude.before.html" | awk '{print $1}')"
test "$CLAUDE_BEFORE" = "$EXPECTED_CLAUDE_BEFORE"

sikhadenge-funnel-lockctl check
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

# One-time immutable publication. Never overwrite an already-published URL with different bytes.
if grep -Fq 'SIKHADENGE_CLAUDE_TESTIMONIALS_CONVERSION_V1B_20260910' "$SITE"; then
  echo 'Testimonials V1B route marker already exists' >&2
  exit 31
fi
if grep -Fq 'SIKHADENGE_CLAUDE_TESTIMONIALS_CONVERSION_V1B_ASSET_20260910' "$ASSETS"; then
  echo 'Testimonials V1B asset marker already exists' >&2
  exit 32
fi

install -m 0644 "$STAGED" "$TARGET"
TARGET_SHA="$(sha256sum "$TARGET" | awk '{print $1}')"
echo "TESTIMONIALS_V1B_TARGET_SHA=$TARGET_SHA"
node --check "$TARGET"

cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_TESTIMONIALS_CONVERSION_V1B_ASSET_20260910
location = $PUBLIC {
    alias $TARGET;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "testimonials-conversion-v1b-20260910" always;
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
    if esc:
        esc=False; continue
    if ch=='\\':
        esc=True; continue
    if quote:
        if ch==quote: quote=None
        continue
    if ch in ('"',"'"):
        quote=ch; continue
    if ch=='{': d+=1
    elif ch=='}':
        d-=1
        if d==0:
            end=i+1; break
if end is None: raise SystemExit('Claude route parse failed')
route=s[a:end]
if 'SIKHADENGE_CLAUDE_TESTIMONIALS_CONVERSION_V1B_20260910' in route:
    raise SystemExit('Testimonials V1B marker unexpectedly present')
body_line="        sub_filter '</body>'"
if route.count(body_line)!=1:
    raise SystemExit(f'expected one body sub_filter, got {route.count(body_line)}')
anchor='<script defer src="/claude-cta-typography-v3.js?v=cta-type-v3b-20260904"></script></body>'
if route.count(anchor)!=1:
    raise SystemExit(f'expected one CTA typography body anchor, got {route.count(anchor)}')
replacement='<script defer src="/claude-cta-typography-v3.js?v=cta-type-v3b-20260904"></script><script defer src="'+public+'"></script></body>'
route=route.replace(anchor,replacement,1)
route=route.replace(body_line,"        # SIKHADENGE_CLAUDE_TESTIMONIALS_CONVERSION_V1B_20260910\n"+body_line,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('TESTIMONIALS_V1B_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

# Canonical immutable URL must expose exactly the bytes just published, without a cache-busting query.
code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  -o "$BK/testimonials-v1b.public.js" -w '%{http_code}' "https://sikhadenge.in${PUBLIC}")"
test "$code" = '200'
PUBLIC_SHA="$(sha256sum "$BK/testimonials-v1b.public.js" | awk '{print $1}')"
echo "TESTIMONIALS_V1B_CANONICAL_HTTP=$code"
echo "TESTIMONIALS_V1B_CANONICAL_SHA=$PUBLIC_SHA"
test "$PUBLIC_SHA" = "$TARGET_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/claude/free?testimonials_v1b_after=$TS" -o "$BK/claude.after.html"
python3 - "$BK/claude.after.html" "$PUBLIC" <<'PY'
import sys
raw=open(sys.argv[1],encoding='utf-8',errors='ignore').read(); public=sys.argv[2]
if raw.count(f'<script defer src="{public}"></script>') != 1:
    raise SystemExit('Testimonials V1B script tag missing or duplicated')
required=[
 '/funnel-attribution-bridge-v1.js?v=20260903-1',
 '/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910',
 '/claude-faq-v2.js?v=faq15-final2-20260904',
 '/claude-cta-typography-v3.js?v=cta-type-v3b-20260904',
 'WHO THIS MASTERCLASS IS FOR',
 'Students &amp; freshers',
 'LIVE MASTERCLASS AGENDA',
 'Master <mark>Claude + 25+ AI Tools</mark>',
 '<strong>150,000+ Learners</strong>',
 '>What you can <span class="sd-heading-highlight">do with AI</span></h2>',
]
for x in required:
    if x not in raw: raise SystemExit('CLAUDE_AFTER_MISSING '+repr(x))
print('TESTIMONIALS_V1B_SERVER_HTML_CHECK=PASS')
PY

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 \
  "https://sikhadenge.in/masterclass/ai-video?testimonials_v1b_after=$TS" -o "$BK/ai.after.html"
AI_AFTER="$(sha256sum "$BK/ai.after.html" | awk '{print $1}')"
test "$AI_AFTER" = "$AI_BEFORE"
echo "AI_UNCHANGED_SHA=$AI_AFTER"

# Protect against accidental mutation of the six original testimonial posters/videos.
declare -A J V
J[01]='502d195b3237dc3fd068d8b209d2e4f5b77168d40b0951b02e6958f773054c4c'; V[01]='5d5f402a39e8f1a964b6812a7f10619521773becd3058f67c005ed45370812b7'
J[02]='c273728d708b6e3e92cb806065c5b4174e8d704d3d24dd7c7d457a7a46c2db17'; V[02]='c16705591c52f2dfd1a699b8731a84fa09fa5fcf16badfad0a082a102525ac55'
J[03]='4ef625b52208a83cacb68b4bbce29d0863764d5de6a0dc9bd41eca24315f24f6'; V[03]='9f316bb7120af70f036709f4efcecfdfc1d2713a37da2794b573f3b3bcbc7755'
J[04]='b6fa9ae9a7e623b85c0a7f00939ecb68c0dd8bc8c14c073dbcee9fd0e2c65d67'; V[04]='d464f5b001a55d1d957bd74b7b6344aa35ed96a5ccf85ff26d889680fd37e792'
J[05]='6d15c560e3e0e5d1bf7b5b4428210e0182b3685ba533ad012c14bfc449342413'; V[05]='51aab4b4bbb71702ae85de27e85c23797a01cc881178ac0e286103ce3aedf33f'
J[06]='292b52d9e05a8f678a037e6771c70628c7170434743d9919978653941779f8e4'; V[06]='6ee3c51da54f7dd622f3c374c379b04d75b2ba3c96dbbcd59dd98b495de37bae'
for n in 01 02 03 04 05 06; do
  test "$(sha256sum "/var/www/sikhadenge.in/ai-video-testimonials/$n.jpg" | awk '{print $1}')" = "${J[$n]}"
  test "$(sha256sum "/var/www/sikhadenge.in/ai-video-testimonials/$n.mp4" | awk '{print $1}')" = "${V[$n]}"
done
echo 'TESTIMONIAL_MEDIA_UNCHANGED=PASS'

trap - ERR
echo "TESTIMONIALS_V1B_STAGE_PASS=$BK"
