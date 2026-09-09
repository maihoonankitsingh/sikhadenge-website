#!/usr/bin/env bash
set -Eeuo pipefail

AI='https://sikhadenge.in/masterclass/ai-video'
CL='https://sikhadenge.in/masterclass/claude/free'
AI_SNIP='/etc/nginx/snippets/sikhadenge-ai-video-3940.conf'
SITE='/etc/nginx/sites-enabled/sikhadenge.in-ssl'
CL_ASSETS='/etc/nginx/snippets/sikhadenge-claude-31aug6pm-assets-final.conf'
TS="$(date +%Y%m%d-%H%M%S)"
TMP="/tmp/two-funnel-lock-audit-$TS"
mkdir -p "$TMP"

fetch_page(){
  local name="$1" url="$2"
  curl -fsSL --connect-timeout 5 --max-time 30 -D "$TMP/$name.headers" "$url?lockaudit=$TS" -o "$TMP/$name.html"
  printf '%s_HTTP=200\n' "${name^^}"
  printf '%s_BYTES=%s\n' "${name^^}" "$(wc -c < "$TMP/$name.html")"
  printf '%s_SHA=%s\n' "${name^^}" "$(sha256sum "$TMP/$name.html" | awk '{print $1}')"
  grep -iE '^(content-type:|cache-control:|x-sd-|server:)' "$TMP/$name.headers" || true
}

asset_audit(){
  local name="$1" file="$2"
  python3 - "$file" <<'PY' > "$TMP/assets.$name.txt"
import html,re,sys
s=open(sys.argv[1],errors='ignore').read(); seen=set()
for kind,pat in [('CSS',r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)'),('JS',r'<script[^>]+src=["\']([^"\']+\.js[^"\']*)')]:
    for u in re.findall(pat,s,re.I):
        u=html.unescape(u)
        if u.startswith('/') and (kind,u) not in seen:
            seen.add((kind,u)); print(kind+'|'+u)
PY
  echo "=== ${name^^} LINKED ASSETS ==="
  while IFS='|' read -r kind u; do
    code=$(curl -L -sS --connect-timeout 4 --max-time 15 -o "$TMP/asset.bin" -w '%{http_code}' "https://sikhadenge.in$u" || true)
    bytes=$(wc -c < "$TMP/asset.bin" 2>/dev/null || echo 0)
    sha='-'; [[ "$code" == 200 ]] && sha=$(sha256sum "$TMP/asset.bin" | awk '{print $1}')
    printf '%s|%s|%s|%s|%s\n' "$kind" "$code" "$bytes" "$sha" "$u"
  done < "$TMP/assets.$name.txt"
}

echo '=== PAGE FINGERPRINTS ==='
fetch_page ai "$AI"
fetch_page claude "$CL"

echo '=== CONTENT MARKERS ==='
for m in 'Create cinematic AI videos' 'Six blocks' 'Understand the tools' 'Questions before you'; do grep -Fqi "$m" "$TMP/ai.html" && echo "AI_MARKER_OK=$m" || echo "AI_MARKER_MISSING=$m"; done
for m in 'AI tools' 'better results'; do grep -Fqi "$m" "$TMP/claude.html" && echo "CLAUDE_MARKER_OK=$m" || echo "CLAUDE_MARKER_MISSING=$m"; done

asset_audit ai "$TMP/ai.html"
asset_audit claude "$TMP/claude.html"

echo '=== AI UPSTREAM 3940 ==='
code=$(curl -sS --max-time 15 -o "$TMP/ai3940.html" -w '%{http_code}' http://127.0.0.1:3940/masterclass/ai-video || true)
echo "AI3940_HTTP=$code BYTES=$(wc -c < "$TMP/ai3940.html" 2>/dev/null || echo 0) SHA=$(sha256sum "$TMP/ai3940.html" 2>/dev/null | awk '{print $1}' || true)"

export HOME=/root PM2_HOME=/root/.pm2
pm2 jlist > "$TMP/pm2.json" 2>/dev/null || true
python3 - "$TMP/pm2.json" <<'PY'
import json,sys
try: a=json.load(open(sys.argv[1]))
except: a=[]
for x in a:
 n=x.get('name',''); e=x.get('pm2_env') or {}
 if any(k in n.lower() for k in ('ai-video','claude','sikhadenge-heading')):
  print('PM2|%s|%s|pid=%s|cwd=%s' % (n,e.get('status'),x.get('pid'),e.get('pm_cwd')))
PY

echo '=== NGINX OWNERSHIP / ROUTES ==='
for f in "$AI_SNIP" "$SITE" "$CL_ASSETS"; do
  if [[ -f "$f" ]]; then echo "FILE|$f|$(sha256sum "$f"|awk '{print $1}')|$(wc -c < "$f")"; else echo "MISSING|$f"; fi
done
nginx -T 2>/dev/null | grep -nE 'masterclass/ai-video|masterclass/claude/free|0dc2b316d6c10c6c|ai-video-e4484da06cac6162|X-SD-Claude-Snapshot|127\.0\.0\.1:3940' | head -220 || true

echo '=== EXISTING PROTECTION SERVICES/TIMERS/CRON ==='
systemctl list-unit-files --type=service --type=timer 2>/dev/null | grep -Ei 'sikhadenge|funnel|golden|claude|ai-video|watch|health|self' || true
systemctl list-timers --all 2>/dev/null | grep -Ei 'sikhadenge|funnel|golden|claude|ai-video|watch|health|self' || true
for f in /etc/cron.d/* /var/spool/cron/crontabs/root; do [[ -f "$f" ]] || continue; grep -HnEi 'sikhadenge|claude|ai-video|funnel|golden' "$f" || true; done

echo '=== BACKUP / GOLDEN INVENTORY ==='
find /var/backups/sikhadenge /var/www/sikhadenge.in/rollback-live /var/www/sikhadenge.in/releases -maxdepth 2 \
  \( -iname '*ai-video*' -o -iname '*claude*' -o -iname '*golden*' -o -iname '*last-best*' \) \
  -printf '%TY-%Tm-%Td %TH:%TM:%TS|%y|%s|%p\n' 2>/dev/null | sort | tail -100 || true

echo '=== FILESYSTEM + DISK ==='
df -h / /var/www /var/backups 2>/dev/null || true
stat -c '%A|%U:%G|%s|%n' "$AI_SNIP" "$SITE" "$CL_ASSETS" 2>/dev/null || true

echo '=== NGINX TEST ==='
nginx -t

echo '=== AUDIT COMPLETE ==='
