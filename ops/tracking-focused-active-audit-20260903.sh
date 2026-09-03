#!/usr/bin/env bash
# trigger 2026-09-03T22:48+05:30
set -Eeuo pipefail
: "${SSH_HOST:?missing SSH_HOST}"; : "${SSH_USER:?missing SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"; KEY="$HOME/.ssh/prod"
ssh -p "$SSH_PORT" -i "$KEY" -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'REMOTE'
set -Eeu
pid_for_port(){ ss -ltnp 2>/dev/null | awk -v p=":$1" '$4 ~ p"$" {if(match($0,/pid=[0-9]+/)){print substr($0,RSTART+4,RLENGTH-4);exit}}'; }
for port in 3940 3971 3955; do
  pid="$(pid_for_port "$port" || true)"; cwd="$(readlink -f /proc/$pid/cwd 2>/dev/null || true)"; echo "===== PORT=$port CWD=$cwd ====="
  [[ -d "$cwd" ]] || continue
  echo '-- package --'; sed -n '1,80p' "$cwd/package.json" 2>/dev/null || true
  echo '-- likely source files --'
  find "$cwd" -maxdepth 5 -type f \( -name '_app.tsx' -o -name '_app.js' -o -name 'layout.tsx' -o -name 'layout.js' -o -name 'page.tsx' -o -name 'route.ts' -o -name 'metaPixel.ts' -o -name '*analytics*.ts' -o -name '*tracking*.ts' -o -name '*tracking*.js' -o -name 'server.js' \) -not -path '*/node_modules/*' -not -path '*/.next/*' | head -120
  echo '-- tracking lines --'
  mapfile -t fs < <(find "$cwd" -maxdepth 5 -type f \( -name '*.tsx' -o -name '*.ts' -o -name '*.jsx' -o -name '*.js' \) -not -path '*/node_modules/*' -not -path '*/.next/*' -not -path '*/backups/*' -not -path '*/backup*/*' | head -400)
  for f in "${fs[@]:-}"; do
    if grep -Eq 'clarity\.ms|Microsoft Clarity|analytics\.load|segment\.com|googletagmanager|gtag\(|fbq\(|META_PIXEL|GA4_|GOOGLE_ADS|utm_campaign_id|gclid|fbclid|analytics/events|masterclass/lead' "$f" 2>/dev/null; then
      echo "FILE=$f"; grep -nE -C 2 'clarity\.ms|Microsoft Clarity|analytics\.load|segment\.com|googletagmanager|gtag\(|fbq\(|META_PIXEL|GA4_|GOOGLE_ADS|utm_campaign_id|gclid|fbclid|analytics/events|masterclass/lead' "$f" 2>/dev/null | head -160 || true
    fi
  done
  echo '-- env public ids / key presence --'
  for e in "$cwd/.env" "$cwd/.env.local" "$cwd/.env.production" "$cwd/.env.production.local"; do
    [[ -f "$e" ]] || continue; echo "ENV=$e"
    grep -E '^(NEXT_PUBLIC_(GA|GA4|GOOGLE_ADS|META_PIXEL|CLARITY|SEGMENT)[A-Z0-9_]*|GA4_MEASUREMENT_ID|GOOGLE_ADS_ID|GOOGLE_ADS_CONVERSION_LABEL|META_PIXEL_ID|CLARITY_PROJECT_ID)=' "$e" 2>/dev/null | sed -E 's/=(.{0,32}).*/=\1.../' || true
    grep -E '^(GA4_API_SECRET|META_CAPI_ACCESS_TOKEN|META_CONVERSIONS_ACCESS_TOKEN|GOOGLE_ADS_ACCESS_TOKEN|SEGMENT_WRITE_KEY|LEAD_INGEST_WEBHOOK_SECRET)=' "$e" 2>/dev/null | sed -E 's/=.*/=PRESENT/' || true
  done
done
printf '%s\n' 'RESULT=FOCUSED_ACTIVE_TRACKING_AUDIT_COMPLETE'
REMOTE
