#!/usr/bin/env bash
set -Eeuo pipefail

SOURCE_URL="https://raw.githubusercontent.com/maihoonankitsingh/sikhadenge-website/65547366930f056de342b4df49a911ae92035a16/ops/deploy-golden-ai-video-faq-final-only.sh"
BASE_SCRIPT="/tmp/deploy-golden-ai-video-faq-final-only-base.sh"
PATCHED_SCRIPT="/tmp/deploy-golden-ai-video-faq-final-only-inline-fixed.sh"

for c in curl python3 bash grep; do
  command -v "$c" >/dev/null || { echo "❌ Missing command: $c" >&2; exit 1; }
done

echo "===== FETCH PINNED FAQ-ONLY DEPLOY BASE ====="
curl -fsSL "$SOURCE_URL" -o "$BASE_SCRIPT"
bash -n "$BASE_SCRIPT"

echo "===== PATCH EXTERNAL FAQ ASSET -> INLINE FAQ RUNTIME ====="
python3 - "$BASE_SCRIPT" "$PATCHED_SCRIPT" <<'PY'
from pathlib import Path
import sys

src = Path(sys.argv[1])
out = Path(sys.argv[2])
text = src.read_text(encoding="utf-8")

# Keep the generated FAQ JavaScript as a temporary build artifact only.
old = 'FAQ_JS="$NEW_RELEASE/public/$FAQ_JS_NAME"'
new = 'FAQ_JS="/tmp/ai-video-faq-final-only-${TS}.js"'
if old not in text:
    raise SystemExit("expected FAQ_JS public-path assignment not found")
text = text.replace(old, new, 1)

# Replace external-script injection with a single inline script block. Removing
# that exact block must reproduce the immutable golden HTML byte-for-byte.
start = text.index('log "6/11 — Inject one FAQ script tag into cloned HTML only"')
end = text.index('log "7/11 — Temporary-port preflight"')
step6 = r'''log "6/11 — Inject final FAQ runtime inline into cloned HTML only"
python3 - "$NEW_HTML" "$GOLDEN_HTML" "$FAQ_JS" <<'PYINLINE'
from pathlib import Path
import sys

new_html_path = Path(sys.argv[1])
golden_html_path = Path(sys.argv[2])
faq_js_path = Path(sys.argv[3])

base = golden_html_path.read_text(encoding='utf-8', errors='strict')
data = new_html_path.read_text(encoding='utf-8', errors='strict')
js = faq_js_path.read_text(encoding='utf-8', errors='strict')

if '</script' in js.lower():
    raise SystemExit('FAQ runtime contains an unsafe closing script token')
if 'id="ai-video-faq-final-only-inline"' in data:
    raise SystemExit('FAQ inline marker already present unexpectedly')
if '</body>' not in data:
    raise SystemExit('Closing body tag not found')

tag = '<script id="ai-video-faq-final-only-inline">\n' + js + '\n</script>'
data = data.replace('</body>', tag + '</body>', 1)
new_html_path.write_text(data, encoding='utf-8')

new_data = new_html_path.read_text(encoding='utf-8', errors='strict')
restored = new_data.replace(tag, '', 1)
if restored != base:
    raise SystemExit('Cloned HTML differs from golden beyond the inline FAQ runtime')
print('Golden HTML equivalence after removing inline FAQ runtime: PASS')
PYINLINE

grep -Fq 'id="ai-video-faq-final-only-inline"' "$NEW_HTML" || fail "Inline FAQ marker missing"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$NEW_HTML" || fail "Inline FAQ content missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$NEW_HTML" || fail "Advanced page marker changed: $marker"
done
echo "✅ HTML differs from golden only by one inline FAQ runtime block"

'''
text = text[:start] + step6 + text[end:]

# Preflight the page itself; no separate FAQ URL exists anymore.
start = text.index('log "7/11 — Temporary-port preflight"')
end = text.index('log "8/11 — Atomic same-port cutover"')
step7 = r'''log "7/11 — Temporary-port preflight"
TEMP_PORT=""
for p in {3951..3960}; do
  if ! ss -ltnH 2>/dev/null | awk '{print $4}' | grep -Eq "(^|:)${p}$"; then TEMP_PORT="$p"; break; fi
done
[[ -n "$TEMP_PORT" ]] || fail "No free preflight port"
NODE_ENV=production pm2 start npm --name "$TEMP_APP" --cwd "$NEW_RELEASE" -- start -- -p "$TEMP_PORT"
TEMP_STARTED=1
wait_200 "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" 45 || fail "Preflight page failed"
PREFLIGHT_HTML="$(mktemp)"
curl -fsSL "http://127.0.0.1:${TEMP_PORT}/masterclass/ai-video" -o "$PREFLIGHT_HTML"
grep -Fq 'id="ai-video-faq-final-only-inline"' "$PREFLIGHT_HTML" || fail "Preflight inline FAQ marker missing"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$PREFLIGHT_HTML" || fail "Preflight FAQ 1 missing"
grep -Fq 'What language is the masterclass in, and can I ask questions live?' "$PREFLIGHT_HTML" || fail "Preflight FAQ 15 missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$PREFLIGHT_HTML" || fail "Preflight advanced marker missing: $marker"
done
cleanup_temp
echo "✅ Inline FAQ-only golden clone preflight passed"

'''
text = text[:start] + step7 + text[end:]

# Public smoke verifies the live HTML directly, eliminating the Nginx/public
# asset route that caused the prior 404 and rollback.
start = text.index('log "9/11 — Public live smoke"')
end = text.index('log "10/11 — Registration + golden integrity"')
step9 = r'''log "9/11 — Public live smoke"
curl -fsSL -H 'Cache-Control: no-cache' "${LIVE_URL}?faqFinalInline=${TS}" -o "$LIVE_BODY"
grep -Fq 'id="ai-video-faq-final-only-inline"' "$LIVE_BODY" || fail "Live inline FAQ marker missing"
grep -Fq 'What exactly will I learn in this AI Video Generation Masterclass?' "$LIVE_BODY" || fail "Live FAQ 1 missing"
grep -Fq 'What language is the masterclass in, and can I ask questions live?' "$LIVE_BODY" || fail "Live FAQ 15 missing"
for marker in 'Create cinematic AI videos' 'Kling' 'Higgsfield' '150,000+ Students' 'Get My Free Seat'; do
  grep -Fq "$marker" "$LIVE_BODY" || fail "Live advanced marker missing: $marker"
done
echo "✅ Public advanced page + inline final FAQ runtime verified"

'''
text = text[:start] + step9 + text[end:]

text = text.replace('FAQ_RUNTIME=/$FAQ_JS_NAME', 'FAQ_RUNTIME=inline-html', 1)
text = text.replace('echo "FAQ runtime:        /$FAQ_JS_NAME"', 'echo "FAQ runtime:        inline-html"', 1)

# Static safety invariants for the patched deploy script.
required = [
    'id="ai-video-faq-final-only-inline"',
    'Golden HTML equivalence after removing inline FAQ runtime: PASS',
    'FAQ_RUNTIME=inline-html',
    'What exactly will I learn in this AI Video Generation Masterclass?',
    'What language is the masterclass in, and can I ask questions live?',
]
for token in required:
    if token not in text:
        raise SystemExit(f'missing patched invariant: {token}')

for forbidden in [
    'wait_200 "${LIVE_URL%/}/$FAQ_JS_NAME"',
    'https://sikhadenge.in/$FAQ_JS_NAME',
    'src=\\"/$FAQ_JS_NAME\\"',
]:
    if forbidden in text:
        raise SystemExit(f'forbidden external FAQ asset dependency remains: {forbidden}')

out.write_text(text, encoding="utf-8")
print(f"Patched deploy written: {out}")
PY

chmod 700 "$PATCHED_SCRIPT"
bash -n "$PATCHED_SCRIPT"

grep -Fq 'FAQ_RUNTIME=inline-html' "$PATCHED_SCRIPT"
grep -Fq 'id="ai-video-faq-final-only-inline"' "$PATCHED_SCRIPT"
! grep -Fq 'https://sikhadenge.in/$FAQ_JS_NAME' "$PATCHED_SCRIPT"

echo "✅ Inline retry patch syntax + safety invariants PASS"

if [[ "${PATCH_ONLY:-0}" == "1" ]]; then
  echo "PATCH_ONLY=1 — deploy execution intentionally skipped"
  exit 0
fi

echo
echo "===== STARTING INLINE FAQ-ONLY GOLDEN DEPLOY ====="
exec bash "$PATCHED_SCRIPT"
