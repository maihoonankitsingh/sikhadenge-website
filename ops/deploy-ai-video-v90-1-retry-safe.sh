#!/usr/bin/env bash
set -Eeuo pipefail

# Safe retry wrapper for the already-reviewed V90.1 production deploy plan.
# Root cause fixed: scripts/audit-ai-video-masterclass.mjs derives repo paths
# from process.cwd(), so it must execute with NEW_RELEASE as cwd.

BASE_COMMIT="d6490ef32fb82e73b962e45d93731a0c7511850b"
BASE_URL="https://raw.githubusercontent.com/maihoonankitsingh/sikhadenge-website/${BASE_COMMIT}/ops/deploy-ai-video-v90-1.sh"
TMP="$(mktemp /root/deploy-ai-video-v90-1-fixed.XXXXXX.sh)"
trap 'rm -f "$TMP"' EXIT

curl -fsSL "$BASE_URL" -o "$TMP"

python3 - "$TMP" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text(encoding="utf-8")
old = 'node "$NEW_RELEASE/scripts/audit-ai-video-masterclass.mjs"'
new = '(cd "$NEW_RELEASE" && node scripts/audit-ai-video-masterclass.mjs)'
count = text.count(old)
if count != 1:
    raise SystemExit(f"Expected exactly one cwd-sensitive audit invocation, found {count}")
path.write_text(text.replace(old, new), encoding="utf-8")
PY

chmod 700 "$TMP"
bash -n "$TMP"

grep -Fq '(cd "$NEW_RELEASE" && node scripts/audit-ai-video-masterclass.mjs)' "$TMP" || {
  echo "❌ CWD-safe audit patch missing" >&2
  exit 1
}

if grep -Fq 'node "$NEW_RELEASE/scripts/audit-ai-video-masterclass.mjs"' "$TMP"; then
  echo "❌ Unsafe audit invocation still present" >&2
  exit 1
fi

exec bash "$TMP"
