#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="https://raw.githubusercontent.com/maihoonankitsingh/sikhadenge-website/fb23f9ce6e09df5d7122c05bf6ad42517ecfe985/ops/deploy-ai-video-faq-premium-v3-recovery-safe.sh"
TMP_SCRIPT="$(mktemp --suffix=.sh)"
trap 'rm -f "$TMP_SCRIPT"' EXIT

curl -fsSL "$BASE_URL" -o "$TMP_SCRIPT"

python3 - "$TMP_SCRIPT" <<'PY'
from pathlib import Path
import sys
p = Path(sys.argv[1])
s = p.read_text(encoding='utf-8')
old = """        html=pat.sub('<script id=\"ai-video-faq-premium-v3-inline\">\\n'+js+'\\n</script>',html,count=1); break"""
new = """        replacement='<script id=\"ai-video-faq-premium-v3-inline\">\\n'+js+'\\n</script>'
        html=pat.sub(lambda _m: replacement,html,count=1); break"""
if old not in s:
    raise SystemExit('Expected unsafe re.sub replacement line not found; refusing to run')
s = s.replace(old, new, 1)
if "pat.sub(lambda _m: replacement" not in s:
    raise SystemExit('Lambda replacement patch did not apply')
p.write_text(s, encoding='utf-8')
PY

chmod 700 "$TMP_SCRIPT"
bash -n "$TMP_SCRIPT"

# Run the original recovery-safe deployment with only the Python replacement fix applied.
exec bash "$TMP_SCRIPT"
