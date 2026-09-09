#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

SNIP='/etc/nginx/snippets/sikhadenge-ai-video-3940.conf'
APP='sikhadenge-ai-video-golden-faq-3940-20260904-130510'
AI='https://sikhadenge.in/masterclass/ai-video'
CLAUDE='https://sikhadenge.in/masterclass/claude/free'
REGISTER='https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass'
CSS='/_next/static/css/0dc2b316d6c10c6c.css'
PAGEJS='/_next/static/chunks/pages/masterclass/ai-video-e4484da06cac6162.js'
CSS_SHA='b8a14f1749fa0ed41a228385c09df949b55805d8cf46cf7a7f34d1407390587c'
JS_SHA='24fd9da08dd61cd75b0528bbb680c15a5f8f1dedfb6834106603a963cea5f80c'
MARK_START='# SIKHADENGE_AI_VIDEO_GOLDEN_STATIC_V1_START'
MARK_END='# SIKHADENGE_AI_VIDEO_GOLDEN_STATIC_V1_END'
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="/var/backups/sikhadenge/ai-video-golden-static-fix-${TS}"
MUTATED=0

wait200(){
  local url="$1" code='' i
  for i in $(seq 1 30); do
    code=$(curl -L -sS --connect-timeout 4 --max-time 12 -o /dev/null -w '%{http_code}' "$url" || true)
    [[ "$code" == 200 ]] && return 0
    sleep 1
  done
  echo "HTTP wait failed: $url last=$code" >&2
  return 1
}

rollback(){
  trap - ERR INT TERM
  set +e
  echo 'ROLLBACK: restoring prior AI Video Nginx snippet'
  if [[ "$MUTATED" == 1 && -f "$BACKUP/sikhadenge-ai-video-3940.conf.before" ]]; then
    cp -a "$BACKUP/sikhadenge-ai-video-3940.conf.before" "$SNIP"
    nginx -t && systemctl reload nginx
  fi
  echo "ROLLBACK_BACKUP=$BACKUP"
  exit 1
}
trap rollback ERR INT TERM

[[ -f "$SNIP" ]] || { echo 'AI Video Nginx snippet missing' >&2; exit 1; }
mkdir -p "$BACKUP"
cp -a "$SNIP" "$BACKUP/sikhadenge-ai-video-3940.conf.before"
curl -fsSL --max-time 20 "$AI?before=$TS" -o "$BACKUP/ai.before.html"
curl -fsSL --max-time 20 "$CLAUDE?before=$TS" -o "$BACKUP/claude.before.html"
AI_BEFORE_SHA=$(sha256sum "$BACKUP/ai.before.html" | awk '{print $1}')
CLAUDE_BEFORE_SHA=$(sha256sum "$BACKUP/claude.before.html" | awk '{print $1}')
SNIP_BEFORE_SHA=$(sha256sum "$SNIP" | awk '{print $1}')

echo '[1/7] Guard exact AI Video runtime + source CSS/JS'
pm2 jlist > "$BACKUP/pm2.before.json"
python3 - "$APP" "$BACKUP/pm2.before.json" <<'PY'
import json,sys
app,p=sys.argv[1:]
a=[x for x in json.load(open(p)) if x.get('name')==app]
assert len(a)==1, len(a)
e=a[0].get('pm2_env') or {}
assert e.get('status')=='online', e.get('status')
print('PM2_OK')
PY
for spec in "$CSS|$CSS_SHA" "$PAGEJS|$JS_SHA"; do
  u=${spec%%|*}; want=${spec##*|}
  code=$(curl -sS --max-time 12 -o /tmp/ai-static-source -w '%{http_code}' "http://127.0.0.1:3940$u")
  [[ "$code" == 200 ]]
  got=$(sha256sum /tmp/ai-static-source | awk '{print $1}')
  [[ "$got" == "$want" ]] || { echo "Source hash mismatch $u got=$got" >&2; exit 1; }
done
curl -fsSL --max-time 12 "http://127.0.0.1:3940$CSS" -o /tmp/ai-golden.css
for cls in 'ai-video-masterclass_outcomeCard__uo9Xf' 'ai-video-masterclass_moduleGrid__LvmU9' 'ai-video-masterclass_toolGrid__kIEhe'; do
  grep -Fq "$cls" /tmp/ai-golden.css || { echo "Expected class missing from Golden CSS: $cls" >&2; exit 1; }
done
echo 'SOURCE_ASSETS_AND_BROKEN_SECTION_CLASSES=VERIFIED'

echo '[2/7] Ensure no conflicting exact locations exist'
NGINX_ALL="$BACKUP/nginx.before.txt"
nginx -T >"$NGINX_ALL" 2>/dev/null
for u in "$CSS" "$PAGEJS"; do
  c=$(awk -v needle="location = $u {" 'index($0,needle){n++} END{print n+0}' "$NGINX_ALL")
  echo "EXISTING_EXACT_LOCATION_COUNT|$c|$u"
  [[ "$c" -le 1 ]] || { echo "Conflicting locations for $u count=$c" >&2; exit 1; }
done

echo '[3/7] Install only two exact hashed asset routes'
python3 - "$SNIP" "$MARK_START" "$MARK_END" <<'PY'
from pathlib import Path
import sys,re
p=Path(sys.argv[1]); start=sys.argv[2]; end=sys.argv[3]
s=p.read_text()
pat=re.compile(r'\n?'+re.escape(start)+r'.*?'+re.escape(end)+r'\n?',re.S)
s=pat.sub('\n',s)
block=r'''
# SIKHADENGE_AI_VIDEO_GOLDEN_STATIC_V1_START
# Exact immutable assets required by the locked Sep-4 AI Video Golden HTML.
# Narrow exact locations avoid affecting Claude/home/other Next.js applications.
location = /_next/static/css/0dc2b316d6c10c6c.css {
    proxy_pass http://127.0.0.1:3940;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    access_log off;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}
location = /_next/static/chunks/pages/masterclass/ai-video-e4484da06cac6162.js {
    proxy_pass http://127.0.0.1:3940;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    access_log off;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
}
# SIKHADENGE_AI_VIDEO_GOLDEN_STATIC_V1_END
'''
p.write_text(s.rstrip()+"\n"+block)
PY
MUTATED=1
nginx -t
systemctl reload nginx

echo '[4/7] Verify exact public assets now match Golden source'
for spec in "$CSS|$CSS_SHA" "$PAGEJS|$JS_SHA"; do
  u=${spec%%|*}; want=${spec##*|}
  wait200 "https://sikhadenge.in$u"
  curl -fsSL --max-time 15 "https://sikhadenge.in$u?verify=$TS" -o /tmp/public-static
  got=$(sha256sum /tmp/public-static | awk '{print $1}')
  [[ "$got" == "$want" ]] || { echo "Public hash mismatch $u got=$got" >&2; exit 1; }
  echo "PUBLIC_ASSET_OK|$u|$got"
done

echo '[5/7] Verify every linked AI Video CSS/JS asset is healthy'
curl -fsSL --max-time 20 "$AI?after=$TS" -o "$BACKUP/ai.after.html"
python3 - "$BACKUP/ai.after.html" <<'PY' > /tmp/ai-linked-assets-after.txt
import re,html,sys
s=open(sys.argv[1],errors='ignore').read(); seen=set()
for pat in [r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)',r'<script[^>]+src=["\']([^"\']+\.js[^"\']*)']:
  for u in re.findall(pat,s,re.I):
    u=html.unescape(u)
    if u.startswith('/') and u not in seen: seen.add(u); print(u)
PY
bad=0; total=0
while IFS= read -r u; do
  total=$((total+1)); code=$(curl -L -sS --connect-timeout 4 --max-time 12 -o /dev/null -w '%{http_code}' "https://sikhadenge.in$u" || true)
  echo "LINKED_ASSET|$code|$u"
  [[ "$code" == 200 || "$code" == 204 || "$code" == 304 ]] || bad=$((bad+1))
done < /tmp/ai-linked-assets-after.txt
[[ "$bad" == 0 ]] || { echo "Broken linked assets remain: $bad/$total" >&2; exit 1; }
echo "ALL_LINKED_ASSETS_OK=$total"

echo '[6/7] Funnel and Claude isolation checks'
wait200 "$AI?final=$TS"
wait200 "$REGISTER"
curl -fsSL --max-time 20 "$CLAUDE?after=$TS" -o "$BACKUP/claude.after.html"
CLAUDE_AFTER_SHA=$(sha256sum "$BACKUP/claude.after.html" | awk '{print $1}')
[[ "$CLAUDE_AFTER_SHA" == "$CLAUDE_BEFORE_SHA" ]] || { echo 'Claude changed during AI-only asset fix' >&2; exit 1; }
for m in 'Learn the workflow behind' 'Six blocks.' 'Understand the tools behind' 'Everyone says AI will replace you' '30 Crore' 'Questions before you'; do
  grep -Fqi "$m" "$BACKUP/ai.after.html" || { echo "AI content marker missing: $m" >&2; exit 1; }
done

echo '[7/7] Final state'
cp -a "$SNIP" "$BACKUP/sikhadenge-ai-video-3940.conf.after"
SNIP_AFTER_SHA=$(sha256sum "$SNIP" | awk '{print $1}')
trap - ERR INT TERM
printf '%s\n' \
  '============================================================' \
  'AI VIDEO GOLDEN STATIC ASSET FIX COMPLETE' \
  "BACKUP=$BACKUP" \
  "AI_BEFORE_SHA=$AI_BEFORE_SHA" \
  "CLAUDE_SHA=$CLAUDE_AFTER_SHA" \
  "NGINX_BEFORE_SHA=$SNIP_BEFORE_SHA" \
  "NGINX_AFTER_SHA=$SNIP_AFTER_SHA" \
  'CSS_PUBLIC=200_HASH_MATCH' \
  'PAGE_JS_PUBLIC=200_HASH_MATCH' \
  "ALL_LINKED_ASSETS_OK=$total" \
  'UNCHANGED=AI content,CTA,forms,tracking,API,registration,Claude' \
  '============================================================'
