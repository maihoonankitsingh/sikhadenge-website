#!/usr/bin/env bash
set -Eeuo pipefail

LIVE='https://sikhadenge.in/masterclass/ai-video?css-sync-audit=20260910d'
CWD='/var/www/sikhadenge.in/releases/production-ai-video-golden-faq-final-20260904-130510'
HTML="$CWD/.next/server/pages/masterclass/ai-video.html"
CSS='/_next/static/css/0dc2b316d6c10c6c.css'
PAGEJS='/_next/static/chunks/pages/masterclass/ai-video-e4484da06cac6162.js'

curl -fsSL --connect-timeout 5 --max-time 25 "$LIVE" -o /tmp/ai-css-sync.html
printf 'PUBLIC_BYTES=%s\n' "$(wc -c </tmp/ai-css-sync.html)"
printf 'UPSTREAM_BYTES=%s\n' "$(wc -c <"$HTML")"
printf 'UPSTREAM_SHA=%s\n' "$(sha256sum "$HTML" | awk '{print $1}')"

echo '=== EXACT MISSING ASSETS: PUBLIC VS AI APP ==='
for u in "$CSS" "$PAGEJS"; do
  pub=$(curl -L -sS --connect-timeout 5 --max-time 15 -o /tmp/pub.out -w '%{http_code}' "https://sikhadenge.in$u" || true)
  ai=$(curl -L -sS --connect-timeout 2 --max-time 10 -o /tmp/ai.out -w '%{http_code}' "http://127.0.0.1:3940$u" || true)
  printf 'ASSET=%s PUBLIC=%s/%s AI3940=%s/%s\n' "$u" "$pub" "$(wc -c </tmp/pub.out 2>/dev/null || echo 0)" "$ai" "$(wc -c </tmp/ai.out 2>/dev/null || echo 0)"
  if [[ "$ai" == 200 ]]; then printf 'AI_SHA=%s\n' "$(sha256sum /tmp/ai.out | awk '{print $1}')"; fi
done

echo '=== NGINX AI STATIC ROUTES ==='
nginx -T 2>/dev/null | grep -nE 'ai-video|_next/static|3940' | head -240 || true

echo '=== PREFIX CANDIDATES ==='
for prefix in \
  '/ai-video-real-output-v77/v90-1-c216c8470d76-20260904-105133' \
  '/ai-video-real-output-v77' \
  '/ai-video-golden-faq' \
  '/masterclass/ai-video'; do
  for suffix in "$CSS" "$PAGEJS"; do
    url="https://sikhadenge.in${prefix}${suffix}"
    code=$(curl -L -sS --connect-timeout 5 --max-time 12 -o /tmp/pfx.out -w '%{http_code}' "$url" || true)
    printf '%s|%s|%s\n' "$code" "$(wc -c </tmp/pfx.out 2>/dev/null || echo 0)" "$url"
  done
done

echo '=== ALL LINKED ROOT ASSETS ==='
python3 - <<'PY' > /tmp/ai-linked-assets.txt
import re,html
s=open('/tmp/ai-css-sync.html',errors='ignore').read(); seen=set()
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

echo '=== APP FILE PRESENCE ==='
for f in "$CWD$CSS" "$CWD$PAGEJS"; do
  if [[ -f "$f" ]]; then echo "FILE|$(wc -c <"$f")|$(sha256sum "$f" | awk '{print $1}')|$f"; else echo "MISSING|$f"; fi
done

echo '=== DONE ==='
