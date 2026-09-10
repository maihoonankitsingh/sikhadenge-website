#!/usr/bin/env bash
set -Eeuo pipefail

MODE="${1:-stage}"
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-icons-hotfix-20260829-091916'
DIR="$CWD/.next/static/chunks/pages/masterclass/claude"
BASE_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806.js'
CURRENT_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-20260910.js'
NEW_NAME='free-802d96fd8696db68-v315r-20260830-204006-v316-20260830-204806-hero-v1-trust-v1-outcomes-v1-agenda-v1-audience-v1-20260910.js'
CURRENT="$DIR/$CURRENT_NAME"
NEW="$DIR/$NEW_NAME"
BASE_URL="/_next/static/chunks/pages/masterclass/claude/$BASE_NAME"
CURRENT_URL="/_next/static/chunks/pages/masterclass/claude/$CURRENT_NAME"
NEW_URL="/_next/static/chunks/pages/masterclass/claude/$NEW_NAME"
MARKER='/var/backups/sikhadenge/.claude-audience-v1-last'

rollback() {
  set +e
  [[ -s "$MARKER" ]] || { sikhadenge-funnel-lockctl lock || true; return 0; }
  B="$(cat "$MARKER")"
  echo "ROLLBACK_FROM=$B"
  sikhadenge-funnel-lockctl unlock 5 || true
  [[ -s "$B/sikhadenge.in-ssl.before" ]] && cat "$B/sikhadenge.in-ssl.before" > "$SITE"
  [[ -s "$B/claude-assets.before" ]] && cat "$B/claude-assets.before" > "$ASSETS"
  if [[ -f "$B/new-chunk.before" ]]; then cp -a "$B/new-chunk.before" "$NEW"; else rm -f "$NEW"; fi
  nginx -t && systemctl reload nginx
  sikhadenge-funnel-lockctl reseal || true
  sikhadenge-funnel-lockctl lock || true
  echo "ROLLBACK_DONE=$B"
}

if [[ "$MODE" == rollback ]]; then rollback; exit 0; fi
[[ "$MODE" == stage ]] || { echo "usage: $0 stage|rollback" >&2; exit 2; }

TS="$(date +%Y%m%d-%H%M%S)"
BK="/var/backups/sikhadenge/claude-audience-v1-$TS"
mkdir -p "$BK"
cp -L "$SITE" "$BK/sikhadenge.in-ssl.before"
cp -L "$ASSETS" "$BK/claude-assets.before"
[[ -f "$NEW" ]] && cp -a "$NEW" "$BK/new-chunk.before" || true
printf '%s\n' "$BK" > "$MARKER"
onerr(){ rc=$?; echo "STAGE_ERROR_RC=$rc"; rollback; exit "$rc"; }
trap onerr ERR

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 'https://sikhadenge.in/masterclass/ai-video?audience_before=1' -o "$BK/ai.before.html"
AI_BEFORE="$(sha256sum "$BK/ai.before.html"|awk '{print $1}')"

sikhadenge-funnel-lockctl check
test "$(sha256sum "$CURRENT"|awk '{print $1}')" = 'ad12771c1d5d9b23d995afbf7d019a2b8c4b9710fb6527fab586d5e3f827719a'
sikhadenge-funnel-lockctl unlock 15
sikhadenge-funnel-lockctl assert-unlocked

cp -a "$CURRENT" "$NEW"
python3 - "$NEW" <<'PY'
import sys
p=sys.argv[1]; s=open(p,encoding='utf-8').read()
reps=[
 ('BUILT FOR PRACTICAL LEARNERS','WHO THIS MASTERCLASS IS FOR'),
 ('Use the right AI tool where speed, ','Built for beginners who want '),
 ('quality and structured output matter.','AI skills they can actually use.'),
 ('Working professionals','Working professionals & business owners'),
 ('Improve research, writing and everyday digital work.','Apply AI to research, writing, planning and everyday digital work.'),
 ('Students & job seekers','Students & freshers'),
 ('Build a practical AI workflow for projects and career preparation.','Use AI for projects, research and practical career preparation.'),
 ('Freelancers & creators','Freelancers & creators'),
 ('Structure client work, research and content more efficiently.','Research, create and deliver client work more efficiently with repeatable AI workflows.'),
 ('Business owners','Job seekers & career switchers'),
 ('Use AI to improve planning, communication and decision support.','Use AI for LinkedIn, interviews, research and faster skill-building.'),
]
for old,new in reps:
    if old==new: continue
    c=s.count(old); print('AUDIENCE_REPLACE_COUNT',repr(old),c)
    if c!=1: raise SystemExit(f'expected one occurrence of {old!r}, got {c}')
    s=s.replace(old,new,1)
open(p,'w',encoding='utf-8').write(s)
print('AUDIENCE_CHUNK_PATCH=PASS')
PY
node --check "$NEW"
NEW_SHA="$(sha256sum "$NEW"|awk '{print $1}')"
echo "NEW_CHUNK_SHA=$NEW_SHA"

if ! grep -Fq 'SIKHADENGE_CLAUDE_AUDIENCE_V1_ASSET_20260910' "$ASSETS"; then
cat >> "$ASSETS" <<EOF

# SIKHADENGE_CLAUDE_AUDIENCE_V1_ASSET_20260910
location = $NEW_URL {
    alias $NEW;
    default_type application/javascript;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-SD-Claude-Asset "audience-v1-20260910" always;
}
EOF
fi

python3 - "$SITE" "$BASE_URL" "$CURRENT_URL" "$NEW_URL" <<'PY'
import sys
p,baseurl,currenturl,newurl=sys.argv[1:]
s=open(p,encoding='utf-8').read(); needle='location = /masterclass/claude/free {'; a=s.find(needle)
if a<0: raise SystemExit('Claude route missing')
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
if end is None: raise SystemExit('route parse failed')
route=s[a:end]
if '# SIKHADENGE_CLAUDE_AUDIENCE_V1_20260910' in route: raise SystemExit('unexpected Audience V1 marker')
old_line=f"        sub_filter '{baseurl}' '{currenturl}';"
new_line=f"        sub_filter '{baseurl}' '{newurl}';"
if route.count(old_line)!=1: raise SystemExit(f'current chunk route line count={route.count(old_line)}')
route=route.replace(old_line,new_line,1)
filters=[
 ('BUILT FOR PRACTICAL LEARNERS','WHO THIS MASTERCLASS IS FOR'),
 ('Use the right AI tool where speed, ','Built for beginners who want '),
 ('quality and structured output matter.','AI skills they can actually use.'),
 ('Working professionals','Working professionals & business owners'),
 ('Improve research, writing and everyday digital work.','Apply AI to research, writing, planning and everyday digital work.'),
 ('Students & job seekers','Students & freshers'),
 ('Build a practical AI workflow for projects and career preparation.','Use AI for projects, research and practical career preparation.'),
 ('Structure client work, research and content more efficiently.','Research, create and deliver client work more efficiently with repeatable AI workflows.'),
 ('Business owners','Job seekers & career switchers'),
 ('Use AI to improve planning, communication and decision support.','Use AI for LinkedIn, interviews, research and faster skill-building.'),
]
block='\n        # SIKHADENGE_CLAUDE_AUDIENCE_V1_20260910\n'
for old,new in filters:
    block += '        sub_filter '+repr(old)+' '+repr(new)+';\n'
route=route.replace(new_line+'\n',new_line+'\n'+block,1)
open(p,'w',encoding='utf-8').write(s[:a]+route+s[end:])
print('AUDIENCE_ROUTE_PATCH=PASS')
PY

nginx -t
systemctl reload nginx
sleep 2

code="$(curl -L -sS --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 -o "$BK/new.public.js" -w '%{http_code}' "https://sikhadenge.in${NEW_URL}?first=$TS")"
test "$code" = 200; echo "NEW_CHUNK_HTTP=$code"
test "$(sha256sum "$BK/new.public.js"|awk '{print $1}')" = "$NEW_SHA"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 "https://sikhadenge.in/masterclass/claude/free?audience_server=$TS" -o "$BK/claude.after.html"
grep -Fq "$NEW_URL" "$BK/claude.after.html"
grep -Fq 'WHO THIS MASTERCLASS IS FOR' "$BK/claude.after.html"
grep -Fq 'Built for beginners who want ' "$BK/claude.after.html"
grep -Fq 'AI skills they can actually use.' "$BK/claude.after.html"
grep -Fq 'Working professionals & business owners' "$BK/claude.after.html"
grep -Fq 'Students & freshers' "$BK/claude.after.html"
grep -Fq 'Job seekers & career switchers' "$BK/claude.after.html"
grep -Fq '/claude-proof-static-v5.js?v=job-impact-evidence-v1-20260910' "$BK/claude.after.html"
grep -Fq 'Master <mark>Claude + 25+ AI Tools</mark>' "$BK/claude.after.html"
grep -Fq '<strong>150,000+ Learners</strong>' "$BK/claude.after.html"
grep -Fq '>What you can <span class="sd-heading-highlight">do with AI</span></h2>' "$BK/claude.after.html"
grep -Fq 'LIVE MASTERCLASS AGENDA' "$BK/claude.after.html"

curl -fsSL --retry 3 --retry-all-errors --connect-timeout 5 --max-time 35 'https://sikhadenge.in/masterclass/ai-video?audience_after=1' -o "$BK/ai.after.html"
test "$AI_BEFORE" = "$(sha256sum "$BK/ai.after.html"|awk '{print $1}')"
echo "AI_UNCHANGED_SHA=$AI_BEFORE"
trap - ERR
echo "AUDIENCE_STAGE_PASS=$BK"
