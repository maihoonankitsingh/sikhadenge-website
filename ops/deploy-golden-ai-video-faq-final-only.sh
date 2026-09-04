#!/usr/bin/env bash
set -Eeuo pipefail

export HOME=/root
export PM2_HOME=/root/.pm2

PORT="3940"
LIVE_URL="https://sikhadenge.in/masterclass/ai-video"
REGISTER_URL="https://sikhadenge.in/gen-ai-masterclass/register-one-step?source=ai-video-masterclass"

GOLDEN_APP="sikhadenge-ai-workflow-premium-3940"
GOLDEN_RELEASE="/var/www/sikhadenge.in/releases/production-ai-workflow-premium-zero-build-20260829-110420"
GOLDEN_HTML="$GOLDEN_RELEASE/.next/server/pages/masterclass/ai-video.html"
GOLDEN_RUNTIME="$GOLDEN_RELEASE/public/ai-video-icons-hotfix.js"
GOLDEN_BACKUP="/root/ai-video-GOLDEN-ADS-LIVE-20260903-125516"
EXPECTED_RUNTIME_SHA="6e8c050e8271f95d20e5e7df1f650dba477142eadd694aefdf6259e2fa73cb51"

RELEASES_DIR="/var/www/sikhadenge.in/releases"
TS="$(date +%Y%m%d-%H%M%S)"
VERSION="golden-faq-final-${TS}"
NEW_RELEASE="$RELEASES_DIR/production-ai-video-${VERSION}"
NEW_APP="sikhadenge-ai-video-golden-faq-3940-${TS}"
TEMP_APP="sikhadenge-ai-video-golden-faq-preflight-${TS}"
FAQ_JS_NAME="ai-video-faq-final-only.js"
FAQ_JS="$NEW_RELEASE/public/$FAQ_JS_NAME"
NEW_HTML="$NEW_RELEASE/.next/server/pages/masterclass/ai-video.html"
STATE_FILE="/root/ai-video-golden-faq-final-state-${TS}.env"
LIVE_BODY="/tmp/ai-video-golden-faq-final-${TS}.html"

CURRENT_APP=""
CURRENT_CWD=""
TEMP_STARTED=0
CUTOVER=0

log(){ printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail(){ echo "❌ $*" >&2; return 1; }

pm2_value(){
  local app="$1" key="$2"
  pm2 jlist | python3 -c '
import json,sys
app,key=sys.argv[1],sys.argv[2]
for item in json.load(sys.stdin):
    if item.get("name")==app:
        env=item.get("pm2_env") or {}
        print(env.get(key,"missing"))
        break
else:
    print("missing")
' "$app" "$key"
}

wait_200(){
  local url="$1" tries="${2:-45}" code=""
  for ((i=1;i<=tries;i++)); do
    code="$(curl -L -sS -o /dev/null -w '%{http_code}' "$url" || true)"
    [[ "$code" == "200" ]] && return 0
    sleep 1
  done
  echo "Last HTTP: ${code:-none} for $url" >&2
  return 1
}

cleanup_temp(){
  set +e
  if [[ "$TEMP_STARTED" == "1" ]]; then
    pm2 delete "$TEMP_APP" >/dev/null 2>&1 || true
    TEMP_STARTED=0
  fi
  set -e
}

rollback(){
  trap - ERR INT TERM
  set +e
  echo
  echo "======================================================"
  echo "⚠️ FAQ-ONLY CUTOVER FAILED — RESTORING PREVIOUS APP"
  echo "======================================================"
  pm2 stop "$NEW_APP" >/dev/null 2>&1 || true
  pm2 delete "$NEW_APP" >/dev/null 2>&1 || true
  if [[ -n "$CURRENT_APP" ]]; then
    pm2 restart "$CURRENT_APP" >/dev/null 2>&1 || true
    wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || true
    wait_200 "${LIVE_URL}?faqRollback=${TS}" 45 || true
  fi
  pm2 save >/dev/null 2>&1 || true
  echo "Previous app restored: ${CURRENT_APP:-unknown}"
  echo "Original golden backup remains: $GOLDEN_BACKUP"
}

on_error(){
  local rc="$1" line="$2"
  trap - ERR INT TERM
  echo "❌ Deployment error at line $line (exit $rc)" >&2
  cleanup_temp || true
  [[ "$CUTOVER" == "1" ]] && rollback || true
  exit "$rc"
}

trap 'rc=$?; on_error "$rc" "$LINENO"' ERR
trap 'on_error 130 "$LINENO"' INT TERM

printf '%s\n' \
  "======================================================" \
  " SIKHADENGE AI VIDEO — GOLDEN FAQ-ONLY DEPLOY" \
  "======================================================" \
  "Base release: $GOLDEN_RELEASE" \
  "New release:  $NEW_RELEASE" \
  "Scope:        FAQ section only" \
  "" \
  "Safety policy:" \
  "- original golden HTML/runtime remain immutable" \
  "- no source-first rebuild" \
  "- no Nginx restart/reload" \
  "- no hero/CTA/tools/layout source edits" \
  "- failure auto-restores previous port-3940 app"

log "1/11 — Required tools"
for c in pm2 curl python3 cp grep fuser readlink sha256sum lsattr chattr node; do
  command -v "$c" >/dev/null || fail "Missing command: $c"
done

log "2/11 — Verify exact golden base"
[[ -d "$GOLDEN_BACKUP" ]] || fail "Golden backup missing: $GOLDEN_BACKUP"
[[ -d "$GOLDEN_RELEASE" ]] || fail "Golden release missing"
[[ -f "$GOLDEN_HTML" ]] || fail "Golden HTML missing"
[[ -f "$GOLDEN_RUNTIME" ]] || fail "Golden runtime missing"
BASE_HTML_SHA="$(sha256sum "$GOLDEN_HTML" | awk '{print $1}')"
BASE_RUNTIME_SHA="$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')"
[[ "$BASE_RUNTIME_SHA" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Golden runtime SHA mismatch"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Golden HTML is not immutable"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Golden runtime is not immutable"
node --check "$GOLDEN_RUNTIME" >/dev/null
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$GOLDEN_HTML" || fail "Golden page marker missing: $marker"
done
echo "✅ Exact advanced golden page verified"

log "3/11 — Identify current port-3940 app for rollback"
LISTENER_PID="$(fuser -n tcp "$PORT" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' | head -1 || true)"
[[ -n "$LISTENER_PID" ]] || fail "No current listener on port $PORT"
CURRENT_CWD="$(readlink -f "/proc/${LISTENER_PID}/cwd" 2>/dev/null || true)"
CURRENT_APP="$(pm2 jlist | python3 -c '
import json,os,sys
cwd=os.path.realpath(sys.argv[1])
for item in json.load(sys.stdin):
    env=item.get("pm2_env") or {}
    pcwd=env.get("pm_cwd") or ""
    if env.get("status")=="online" and pcwd and os.path.realpath(pcwd)==cwd:
        print(item.get("name", ""))
        break
' "$CURRENT_CWD")"
[[ -n "$CURRENT_APP" ]] || fail "Could not map current listener to PM2"
case "$CURRENT_CWD" in
  /var/www/sikhadenge.in/releases/production-ai-video-*|"$GOLDEN_RELEASE") ;;
  *) fail "Unexpected current app CWD: $CURRENT_CWD" ;;
esac
echo "Current app: $CURRENT_APP"
echo "Current CWD: $CURRENT_CWD"

log "4/11 — Clone golden release without touching original"
[[ ! -e "$NEW_RELEASE" ]] || fail "New release already exists: $NEW_RELEASE"
mkdir -p "$NEW_RELEASE"
cp -a "$GOLDEN_RELEASE/." "$NEW_RELEASE/"
chattr -i "$NEW_HTML" "$NEW_RELEASE/public/ai-video-icons-hotfix.js" 2>/dev/null || true
[[ -f "$NEW_HTML" ]] || fail "Cloned HTML missing"
[[ -f "$NEW_RELEASE/public/ai-video-icons-hotfix.js" ]] || fail "Cloned runtime missing"
[[ "$(sha256sum "$NEW_RELEASE/public/ai-video-icons-hotfix.js" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Cloned runtime drift"
echo "✅ Golden clone created"

log "5/11 — Add final FAQ-only runtime"
cat >"$FAQ_JS" <<'JS'
(function () {
  'use strict';

  var FAQS = [
    ["What exactly will I learn in this AI Video Generation Masterclass?", "You’ll learn a repeatable AI-video workflow from prompt and shot planning to generation, refinement and finishing. The session focuses on practical output for ads, reels, product films and image-to-video clips."],
    ["Is this AI video masterclass beginner-friendly?", "Yes. The masterclass is designed for beginners and explains the workflow step by step, so you can follow even if you are new to AI video tools."],
    ["How long is the live masterclass?", "The masterclass is a focused 2-hour live session built around practical demonstrations, workflow decisions and live Q&A."],
    ["Is the session live or recorded?", "This page is for a live masterclass. Recording availability is not promised on this page, so joining live is the best way to follow the demos and ask questions in real time."],
    ["Do I need video-editing experience before joining?", "No. Prior video-editing experience is not required. The session starts from the workflow basics and keeps the finishing process beginner friendly."],
    ["Do I need coding or technical AI knowledge?", "No. The workflow is creator friendly and does not require coding or an advanced technical background."],
    ["Will you cover both text-to-video and image-to-video?", "Yes. The masterclass covers both text-to-video and image-to-video workflows, including prompting, references, motion, iteration and consistency."],
    ["Which AI video tools will be discussed?", "The page features tools such as Kling AI, Higgsfield, Google Veo, Runway, Pika, Luma AI, Hailuo AI and Seedance. Tool interfaces can change, so the focus is on transferable workflow skills rather than memorising one dashboard."],
    ["Will I learn how to write better prompts for AI video?", "Yes. You’ll learn how to think beyond static prompts by defining the subject, action, camera, lighting, timing and sound so the model has clearer creative direction."],
    ["Will the masterclass cover camera movement, lighting and shot design?", "Yes. Shot design is a core part of the workflow, including framing, camera movement, lighting, style and the visual intent behind each clip."],
    ["Will I learn how to keep multiple AI-generated scenes consistent?", "Yes. The session covers references, shot planning and controlled iteration so multiple clips can feel connected instead of looking like unrelated generations."],
    ["Will we create ads, reels and product-style videos?", "Yes. Practical examples and workflows are built around product ads, reels, cinematic clips, creator content and short visual sequences."],
    ["Do I need every paid AI tool before joining?", "No. You can learn the workflow without owning every paid subscription. Individual tools may have their own free limits, credits or paid plans."],
    ["Who is this masterclass most useful for?", "It is designed for creators, video editors, freelancers, agencies, marketers, founders, students and beginners who want stronger AI-generated video output."],
    ["What language is the masterclass in, and can I ask questions live?", "The session is taught in easy Hinglish and includes live Q&A, so you can follow the demonstrations and ask questions during the masterclass."]
  ];

  var STYLE_ID = 'ai-video-faq-final-only-style';
  var PATCHED = false;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function findFaqSection() {
    var direct = document.querySelector('#faq, [data-section="faq"], [data-faq-section]');
    if (direct) return direct;
    var sections = Array.prototype.slice.call(document.querySelectorAll('section'));
    return sections.find(function (section) {
      var text = (section.textContent || '').replace(/\s+/g, ' ').trim();
      return /frequently asked|common questions|know before|questions about|faq/i.test(text);
    }) || null;
  }

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.ai-video-faq-final-only{position:relative;overflow:hidden;padding:92px 0 96px;background:radial-gradient(circle at 12% 8%,rgba(37,99,235,.055),transparent 28%),radial-gradient(circle at 88% 12%,rgba(124,58,237,.045),transparent 26%),linear-gradient(180deg,#f8fafc 0%,#f7f9fc 100%)}',
      '.ai-video-faq-final-shell{position:relative;z-index:1;width:min(1120px,calc(100% - 32px));margin:0 auto}',
      '.ai-video-faq-final-head{max-width:860px;margin:0 auto 34px;text-align:center}',
      '.ai-video-faq-final-eyebrow{display:inline-flex;min-height:32px;align-items:center;justify-content:center;padding:0 13px;border:1px solid #dbe7ff;border-radius:999px;background:rgba(255,255,255,.9);color:#2563eb;box-shadow:0 8px 24px rgba(37,99,235,.05);font-size:11px;font-weight:800;letter-spacing:.105em;text-transform:uppercase}',
      '.ai-video-faq-final-title{max-width:820px;margin:13px auto 12px;color:#0f172a;font-size:clamp(34px,4vw,52px);font-weight:850;line-height:1.07;letter-spacing:-.045em}',
      '.ai-video-faq-final-title em{background:linear-gradient(90deg,#2563eb,#5b5cf0 55%,#7c3aed);-webkit-background-clip:text;background-clip:text;color:transparent;font-style:normal}',
      '.ai-video-faq-final-sub{max-width:720px;margin:0 auto;color:#64748b;font-size:15px;line-height:1.72}',
      '.ai-video-faq-final-list{display:grid;width:min(100%,1040px);gap:10px;margin:0 auto}',
      '.ai-video-faq-final-item{overflow:hidden;border:1px solid #dce3ed;border-radius:15px;background:rgba(255,255,255,.98);box-shadow:0 2px 10px rgba(15,23,42,.025)}',
      '.ai-video-faq-final-item[open]{border-color:#bfd1f2;box-shadow:0 14px 34px rgba(37,99,235,.075)}',
      '.ai-video-faq-final-question{display:flex;min-height:62px;align-items:center;justify-content:space-between;gap:18px;padding:0 13px 0 18px;color:#172033;cursor:pointer;list-style:none;font-size:14px;font-weight:720;line-height:1.45}',
      '.ai-video-faq-final-question::-webkit-details-marker{display:none}',
      '.ai-video-faq-final-icon{display:grid;place-items:center;width:30px;height:30px;flex:0 0 30px;border:1px solid #d8e5fb;border-radius:9px;background:#f8fbff;color:#2563eb;font-size:17px;transition:transform .18s ease,background .18s ease,border-color .18s ease}',
      '.ai-video-faq-final-item[open] .ai-video-faq-final-icon{transform:rotate(180deg);border-color:#c8d9f6;background:#eef5ff}',
      '.ai-video-faq-final-answer{padding:0 58px 19px 18px}',
      '.ai-video-faq-final-answer p{max-width:900px;margin:0;color:#5f6f85;font-size:13.5px;line-height:1.75}',
      '@media(max-width:640px){.ai-video-faq-final-only{padding:62px 0 70px}.ai-video-faq-final-shell{width:min(100% - 24px,1120px)}.ai-video-faq-final-head{margin-bottom:24px}.ai-video-faq-final-title{margin-top:11px;font-size:30px;line-height:1.1}.ai-video-faq-final-sub{font-size:14px;line-height:1.65}.ai-video-faq-final-list{gap:9px}.ai-video-faq-final-item{border-radius:14px}.ai-video-faq-final-question{min-height:58px;gap:12px;padding:0 11px 0 14px;font-size:13.5px;line-height:1.4}.ai-video-faq-final-icon{width:28px;height:28px;flex-basis:28px;border-radius:8px}.ai-video-faq-final-answer{padding:0 44px 16px 14px}.ai-video-faq-final-answer p{font-size:13px;line-height:1.7}}',
      '@media(prefers-reduced-motion:reduce){.ai-video-faq-final-icon{transition:none}}'
    ].join('');
    document.head.appendChild(style);
  }

  function updateSchema() {
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(function (item) {
        return {
          '@type': 'Question',
          name: item[0],
          acceptedAnswer: { '@type': 'Answer', text: item[1] }
        };
      })
    };
    var scripts = Array.prototype.slice.call(document.querySelectorAll('script[type="application/ld+json"]'));
    var found = false;
    scripts.forEach(function (script) {
      try {
        var data = JSON.parse(script.textContent || '{}');
        if (data && data['@type'] === 'FAQPage') {
          script.textContent = JSON.stringify(schema);
          script.setAttribute('data-ai-video-faq-final', '1');
          found = true;
        }
      } catch (e) {}
    });
    if (!found) {
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-ai-video-faq-final', '1');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }

  function patchFaq() {
    if (PATCHED) return true;
    var section = findFaqSection();
    if (!section) return false;

    installStyle();
    section.className = 'ai-video-faq-final-only';
    section.id = 'faq';
    section.setAttribute('aria-labelledby', 'faq-title');

    var items = FAQS.map(function (item) {
      return '<details class="ai-video-faq-final-item">' +
        '<summary class="ai-video-faq-final-question"><span>' + escapeHtml(item[0]) + '</span><span class="ai-video-faq-final-icon" aria-hidden="true">⌄</span></summary>' +
        '<div class="ai-video-faq-final-answer"><p>' + escapeHtml(item[1]) + '</p></div>' +
      '</details>';
    }).join('');

    section.innerHTML = '<div class="ai-video-faq-final-shell">' +
      '<div class="ai-video-faq-final-head">' +
        '<span class="ai-video-faq-final-eyebrow">AI VIDEO MASTERCLASS FAQS</span>' +
        '<h2 class="ai-video-faq-final-title" id="faq-title">Everything you need to know <em>before you join live.</em></h2>' +
        '<p class="ai-video-faq-final-sub">Clear answers about the format, tools, skill level, language and practical workflow inside this focused 2-hour live session.</p>' +
      '</div>' +
      '<div class="ai-video-faq-final-list">' + items + '</div>' +
    '</div>';

    Array.prototype.forEach.call(section.querySelectorAll('details'), function (detail) {
      detail.addEventListener('toggle', function () {
        if (!detail.open) return;
        Array.prototype.forEach.call(section.querySelectorAll('details[open]'), function (other) {
          if (other !== detail) other.open = false;
        });
      });
    });

    updateSchema();
    PATCHED = true;
    document.documentElement.setAttribute('data-ai-video-faq-final', '15');
    return true;
  }

  function boot() {
    if (patchFaq()) return;
    [250, 700, 1400, 2400].forEach(function (delay) {
      window.setTimeout(patchFaq, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  window.addEventListener('load', patchFaq, { once: true });
})();
JS
node --check "$FAQ_JS"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$FAQ_JS" || fail "FAQ 1 missing"
grep -Fq 'What language is the masterclass in, and can I ask questions live?' "$FAQ_JS" || fail "FAQ 15 missing"
FAQ_COUNT="$(grep -o '^    \["' "$FAQ_JS" | wc -l | tr -d ' ')"
[[ "$FAQ_COUNT" == "15" ]] || fail "Expected 15 FAQs, found $FAQ_COUNT"
echo "✅ Final 15 FAQ points packaged"

log "6/11 — Inject one FAQ script tag into cloned HTML only"
python3 - "$NEW_HTML" "$FAQ_JS_NAME" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); name=sys.argv[2]
data=p.read_text(encoding='utf-8', errors='strict')
tag=f'<script src="/{name}" defer></script>'
if tag in data:
    raise SystemExit('FAQ tag already present unexpectedly')
if '</body>' not in data:
    raise SystemExit('Closing body tag not found')
data=data.replace('</body>', tag+'</body>', 1)
p.write_text(data, encoding='utf-8')
PY
python3 - "$GOLDEN_HTML" "$NEW_HTML" "$FAQ_JS_NAME" <<'PY'
from pathlib import Path
import sys
base=Path(sys.argv[1]).read_text(encoding='utf-8')
new=Path(sys.argv[2]).read_text(encoding='utf-8')
tag=f'<script src="/{sys.argv[3]}" defer></script>'
restored=new.replace(tag,'',1)
if restored != base:
    raise SystemExit('Cloned HTML differs from golden beyond FAQ script injection')
print('Golden HTML equivalence after removing FAQ tag: PASS')
PY
grep -Fq "src=\"/$FAQ_JS_NAME\"" "$NEW_HTML" || fail "FAQ script tag missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$NEW_HTML" || fail "Advanced page marker changed: $marker"
done
echo "✅ HTML differs from golden only by FAQ script tag"

log "7/11 — Temporary-port preflight"
TEMP_PORT=""
for p in {3951..3960}; do
  if ! ss -ltnH 2>/dev/null | awk '{print $4}' | grep -Eq "(^|:)${p}$"; then TEMP_PORT="$p"; break; fi
done
[[ -n "$TEMP_PORT" ]] || fail "No free preflight port"
NODE_ENV=production pm2 start npm --name "$TEMP_APP" --cwd "$NEW_RELEASE" -- start -- -p "$TEMP_PORT"
TEMP_STARTED=1
wait_200 "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" 45 || fail "Preflight page failed"
wait_200 "http://127.0.0.1:${TEMP_PORT}/$FAQ_JS_NAME" 20 || fail "FAQ runtime asset failed"
PREFLIGHT_HTML="$(mktemp)"
curl -fsSL "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" -o "$PREFLIGHT_HTML"
grep -Fq "src=\"/$FAQ_JS_NAME\"" "$PREFLIGHT_HTML" || fail "Preflight FAQ tag missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$PREFLIGHT_HTML" || fail "Preflight advanced marker missing: $marker"
done
cleanup_temp
echo "✅ FAQ-only golden clone preflight passed"

log "8/11 — Atomic same-port cutover"
CUTOVER=1
pm2 stop "$CURRENT_APP"
for _ in {1..30}; do
  ! fuser -n tcp "$PORT" >/dev/null 2>&1 && break
  sleep 1
done
! fuser -n tcp "$PORT" >/dev/null 2>&1 || fail "Port $PORT did not release"
NODE_ENV=production pm2 start npm --name "$NEW_APP" --cwd "$NEW_RELEASE" -- start -- -p "$PORT"
wait_200 "http://127.0.0.1:${PORT}/masterclass/ai-video" 45 || fail "New FAQ-only app health failed"
echo "✅ FAQ-only golden app online"

log "9/11 — Public live smoke"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?faqFinal=${TS}" -o "$LIVE_BODY"
grep -Fq "src=\"/$FAQ_JS_NAME\"" "$LIVE_BODY" || fail "Live FAQ script tag missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$LIVE_BODY" || fail "Live advanced marker missing: $marker"
done
wait_200 "${LIVE_URL%/}/$FAQ_JS_NAME" 20 || true
FAQ_JS_CODE="$(curl -L -sS -o /tmp/ai-video-faq-final-live-${TS}.js -w '%{http_code}' "https://sikhadenge.in/$FAQ_JS_NAME" || true)"
[[ "$FAQ_JS_CODE" == "200" ]] || fail "Live FAQ runtime unavailable: $FAQ_JS_CODE"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "/tmp/ai-video-faq-final-live-${TS}.js" || fail "Live FAQ content mismatch"
echo "✅ Public advanced page + final FAQ runtime verified"

log "10/11 — Registration + golden integrity"
wait_200 "$REGISTER_URL" 20 || fail "Registration route failed"
[[ "$(sha256sum "$GOLDEN_HTML" | awk '{print $1}')" == "$BASE_HTML_SHA" ]] || fail "Original golden HTML changed"
[[ "$(sha256sum "$GOLDEN_RUNTIME" | awk '{print $1}')" == "$EXPECTED_RUNTIME_SHA" ]] || fail "Original golden runtime changed"
[[ "$(lsattr -d "$GOLDEN_HTML" | awk '{print $1}')" == *i* ]] || fail "Original golden HTML lost immutable lock"
[[ "$(lsattr -d "$GOLDEN_RUNTIME" | awk '{print $1}')" == *i* ]] || fail "Original golden runtime lost immutable lock"
[[ "$(pm2_value "$NEW_APP" status)" == "online" ]] || fail "New app is not online"
[[ "$(pm2_value "$CURRENT_APP" status)" == "stopped" ]] || fail "Previous rollback app must remain stopped"
echo "✅ Registration healthy and original golden untouched"

log "11/11 — Persist rollback state"
cat >"$STATE_FILE" <<EOF
DEPLOYED_AT=$TS
NEW_APP=$NEW_APP
NEW_RELEASE=$NEW_RELEASE
PREVIOUS_APP=$CURRENT_APP
PREVIOUS_CWD=$CURRENT_CWD
GOLDEN_APP=$GOLDEN_APP
GOLDEN_RELEASE=$GOLDEN_RELEASE
GOLDEN_HTML_SHA=$BASE_HTML_SHA
GOLDEN_RUNTIME_SHA=$EXPECTED_RUNTIME_SHA
FAQ_COUNT=15
FAQ_RUNTIME=/$FAQ_JS_NAME
EOF
pm2 save
CUTOVER=0

LIVE_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "${LIVE_URL}?faqFinalCheck=${TS}")"
REG_CODE="$(curl -L -sS -o /dev/null -w '%{http_code}' "$REGISTER_URL")"

echo
echo "======================================================"
echo "✅ GOLDEN AI VIDEO + FINAL FAQ-ONLY UPDATE COMPLETE"
echo "======================================================"
echo "Live landing HTTP:  $LIVE_CODE"
echo "Registration HTTP:  $REG_CODE"
echo "FAQ count:          15"
echo "New app:            $NEW_APP ($(pm2_value "$NEW_APP" status))"
echo "Rollback app:       $CURRENT_APP ($(pm2_value "$CURRENT_APP" status))"
echo "New release:        $NEW_RELEASE"
echo "Golden HTML SHA:    $BASE_HTML_SHA"
echo "Golden runtime SHA: $EXPECTED_RUNTIME_SHA"
echo "FAQ runtime:        /$FAQ_JS_NAME"
echo "State file:         $STATE_FILE"
echo "======================================================"
