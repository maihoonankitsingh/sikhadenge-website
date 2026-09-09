#!/usr/bin/env bash
set -Eeuo pipefail

LIVE='https://sikhadenge.in/masterclass/ai-video?css-sync-audit=20260910'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510'
HTML="$CWD/.next/server/pages/masterclass/ai-video.html"

curl -fsSL --connect-timeout 5 --max-time 25 "$LIVE" -o /tmp/ai-css-sync.html
printf 'PUBLIC_BYTES=%s\n' "$(wc -c </tmp/ai-css-sync.html)"
printf 'UPSTREAM_BYTES=%s\n' "$(wc -c <"$HTML")"
printf 'UPSTREAM_SHA=%s\n' "$(sha256sum "$HTML" | awk '{print $1}')"

echo '=== PAGE LINKED ASSETS ==='
python3 - <<'PY' > /tmp/ai-linked-assets.txt
import re,html
s=open('/tmp/ai-css-sync.html',errors='ignore').read()
seen=set()
for kind,pat in [('CSS',r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)'),('JS',r'<script[^>]+src=["\']([^"\']+\.js[^"\']*)')]:
    for u in re.findall(pat,s,re.I):
        u=html.unescape(u)
        if u.startswith('/') and (kind,u) not in seen:
            seen.add((kind,u)); print(kind+'|'+u)
PY
while IFS='|' read -r kind u; do
  code=$(curl -L -sS --connect-timeout 5 --max-time 15 -o /tmp/asset.bin -w '%{http_code}' "https://sikhadenge.in$u" || true)
  printf '%s|%s|%s|%s\n' "$kind" "$code" "$(wc -c </tmp/asset.bin 2>/dev/null || echo 0)" "$u"
done < /tmp/ai-linked-assets.txt

echo '=== BROKEN SECTION CONTEXT ==='
python3 - <<'PY'
import re
s=open('/tmp/ai-css-sync.html',errors='ignore').read()
for needle in ['Learn the workflow behind','Six blocks.','Understand the tools behind']:
    i=s.lower().find(needle.lower())
    print('\nMARKER',repr(needle),'POS',i)
    if i < 0: continue
    chunk=s[max(0,i-7000):min(len(s),i+18000)]
    print('IDS',sorted(set(re.findall(r'id=["\']([^"\']+)',chunk,re.I)))[:120])
    print('CLASSES',sorted(set(c for v in re.findall(r'class=["\']([^"\']+)',chunk,re.I) for c in v.split()))[:220])
PY

echo '=== INLINE STYLE COVERAGE ==='
python3 - <<'PY'
import re
s=open('/tmp/ai-css-sync.html',errors='ignore').read()
styles=[]
for m in re.finditer(r'<style([^>]*)>(.*?)</style>',s,re.I|re.S):
    attrs,css=m.group(1),m.group(2)
    q=re.search(r'id=["\']([^"\']+)',attrs,re.I)
    styles.append((q.group(1) if q else '(no-id)',css))
for needle in ['#outcomes','#learn','#ai-workflow-v4','#ai-video-tools','workflow-v4','six blocks','tools behind']:
    hits=[sid for sid,css in styles if needle.lower() in css.lower()]
    print(needle,'COUNT',len(hits),'IDS',hits[:60])
print('STYLE_OPEN',s.lower().count('<style'),'STYLE_CLOSE',s.lower().count('</style>'))
print('SCRIPT_OPEN',s.lower().count('<script'),'SCRIPT_CLOSE',s.lower().count('</script>'))
PY

echo '=== APP STATIC CSS INVENTORY ==='
find "$CWD/.next/static" -type f -name '*.css' -printf '%s|%p\n' 2>/dev/null | sort -n

echo '=== HISTORICAL AI VIDEO CANDIDATE CSS ==='
find /var/www/sikhadenge.in/releases /var/backups/sikhadenge -type f -path '*/.next/static/css/*.css' -newermt '2026-09-03 00:00:00' ! -newermt '2026-09-05 00:00:00' -printf '%s|%TY-%Tm-%Td %TH:%TM:%TS|%p\n' 2>/dev/null | sort -t'|' -k2,2 | tail -120

echo '=== DONE ==='
