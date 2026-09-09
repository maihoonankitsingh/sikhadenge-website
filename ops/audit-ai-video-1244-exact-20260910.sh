#!/usr/bin/env bash
set -Eeuo pipefail

echo '=== TARGET ==='
echo 'Screenshot time: 2026-09-04 12:44:42 +0530'
echo

dirs=(
  /var/backups/sikhadenge/claude-cta-conversion-v1-20260904-120126
  /var/backups/sikhadenge/footer-professional-v2-20260904-120934
  /var/backups/sikhadenge/footer-instagram-20260904-123019
  /var/backups/sikhadenge/claude-value-anchor-v1-20260904-125231
  /var/backups/sikhadenge/footer-outer-box-20260904-125907
  /var/backups/sikhadenge/claude-value-anchor-v1-final-20260904-125955
  /var/backups/sikhadenge/claude-cta-copy-v2-20260904-131549
)

extract_route(){
  python3 - "$1" <<'PY'
import sys,hashlib,re
p=sys.argv[1]
s=open(p,encoding='utf-8',errors='ignore').read()
needle='location = /masterclass/ai-video {'
a=s.find(needle)
if a<0:
    raise SystemExit(3)
q=s.find('{',a); d=0; end=None
for i in range(q,len(s)):
    if s[i]=='{': d+=1
    elif s[i]=='}':
        d-=1
        if d==0:
            end=i+1; break
if end is None: raise SystemExit(4)
seg=s[a:end]
print('ROUTE_SHA='+hashlib.sha256(seg.encode()).hexdigest())
print('ROUTE_BYTES='+str(len(seg.encode())))
pats=[r'proxy_pass\s+http://127\.0\.0\.1:\d+', r'X-SD-[A-Za-z0-9_-]+[^;]*', r'/[A-Za-z0-9._/-]+\.(?:js|css)(?:\?[^" ]*)?']
for pat in pats:
    vals=sorted(set(re.findall(pat,seg,re.I)))
    for v in vals: print('ASSET|'+v)
print('---ROUTE-BEGIN---')
print(seg)
print('---ROUTE-END---')
PY
}

for d in "${dirs[@]}"; do
  echo
  echo "=== SNAPSHOT $d ==="
  if [[ ! -d "$d" ]]; then echo 'MISSING_DIR'; continue; fi
  stat -c 'DIR_MTIME=%y' "$d" || true
  find "$d" -maxdepth 2 -type f -printf '%p|%s|%TY-%Tm-%Td %TH:%TM:%TS\n' 2>/dev/null | sort | head -80 || true
  found=0
  while IFS= read -r f; do
    if grep -Fq 'location = /masterclass/ai-video {' "$f" 2>/dev/null; then
      found=1
      echo "CONFIG_FILE=$f"
      extract_route "$f" || true
    fi
  done < <(find "$d" -maxdepth 2 -type f -size -2M 2>/dev/null)
  [[ "$found" = 1 ]] || echo 'NO_AI_ROUTE_CONFIG_FOUND'
done

echo
echo '=== CURRENT LIVE AI ROUTE ==='
nginx -T 2>/dev/null > /tmp/nginx-all.txt
extract_route /tmp/nginx-all.txt || true

echo
echo '=== UPSTREAM 3930 / 3940 IDENTITY ==='
for p in 3930 3940; do
  code=$(curl -sS --max-time 20 -o /tmp/ai-$p.html -w '%{http_code}' http://127.0.0.1:$p/masterclass/ai-video || true)
  sha=$(sha256sum /tmp/ai-$p.html 2>/dev/null | awk '{print $1}' || true)
  bytes=$(wc -c </tmp/ai-$p.html 2>/dev/null || echo 0)
  echo "PORT=$p HTTP=$code BYTES=$bytes SHA=$sha"
  for m in 'Create cinematic AI videos' 'From idea to finished AI video' 'Everyone says AI will replace you' '30 Crore' 'AI isn’t only changing jobs' 'Six blocks. Zero filler.' 'Understand the tools behind modern AI visuals.' 'Built for people who want better video output.' 'Real learners. Real experiences.' 'Know before you reserve your seat.' 'Stop guessing prompts. Start directing the output.' 'Trusted checkout experience'; do
    grep -Fqi "$m" /tmp/ai-$p.html 2>/dev/null && echo "YES|$m" || echo "NO|$m"
  done
done

echo
echo '=== DONE READ ONLY ==='
