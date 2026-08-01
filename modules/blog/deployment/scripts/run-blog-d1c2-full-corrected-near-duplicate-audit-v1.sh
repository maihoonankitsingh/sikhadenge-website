#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
SOURCE_COMMIT="${SOURCE_COMMIT:-b71607ee4b65afc9b16561d77eeb9045051db288}"
SOURCE_SCRIPT="${SOURCE_SCRIPT:-modules/blog/deployment/scripts/audit-blog-near-duplicate-template-quality-d1c-v1.sh}"
EXPECTED_SOURCE_BLOB="${EXPECTED_SOURCE_BLOB:-fe1eb7864eb201a6c3c21187d885aae92719e438}"
EXPECTED_SOURCE_PAYLOAD_SHA256="${EXPECTED_SOURCE_PAYLOAD_SHA256:-01befd09bdd1061a2c28b8339d88acde46eb4c494912406ca01ad66fca1ce43e}"
TMP_WRAPPER="$(mktemp /tmp/sikhadenge-blog-d1c2-source-wrapper.XXXXXX.sh)"
TMP_PAYLOAD="$(mktemp /tmp/sikhadenge-blog-d1c2-corrected-payload.XXXXXX.sh)"

cleanup() {
  rm -f "$TMP_WRAPPER" "$TMP_PAYLOAD"
}
trap cleanup EXIT

for cmd in git python3 sha256sum bash; do
  command -v "$cmd" >/dev/null 2>&1 || {
    echo "BLOG_D1C2_FULL_CORRECTED_NEAR_DUPLICATE_STATUS=FAIL"
    echo "REASON=${cmd}_not_found"
    exit 1
  }
done

test -d "$ROOT/.git" || {
  echo "BLOG_D1C2_FULL_CORRECTED_NEAR_DUPLICATE_STATUS=FAIL"
  echo "REASON=production_repository_missing"
  exit 1
}

ACTUAL_SOURCE_BLOB="$(git -C "$ROOT" rev-parse "$SOURCE_COMMIT:$SOURCE_SCRIPT")"
test "$ACTUAL_SOURCE_BLOB" = "$EXPECTED_SOURCE_BLOB" || {
  echo "BLOG_D1C2_FULL_CORRECTED_NEAR_DUPLICATE_STATUS=FAIL"
  echo "REASON=source_script_blob_mismatch"
  echo "EXPECTED_SOURCE_BLOB=$EXPECTED_SOURCE_BLOB"
  echo "ACTUAL_SOURCE_BLOB=$ACTUAL_SOURCE_BLOB"
  exit 1
}

git -C "$ROOT" show "$SOURCE_COMMIT:$SOURCE_SCRIPT" > "$TMP_WRAPPER"

test -s "$TMP_WRAPPER" || {
  echo "BLOG_D1C2_FULL_CORRECTED_NEAR_DUPLICATE_STATUS=FAIL"
  echo "REASON=source_wrapper_missing"
  exit 1
}

python3 - "$TMP_WRAPPER" "$TMP_PAYLOAD" "$EXPECTED_SOURCE_PAYLOAD_SHA256" <<'PY'
from pathlib import Path
import base64
import gzip
import hashlib
import sys

wrapper_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])
expected_payload_sha = sys.argv[3]
text = wrapper_path.read_text(encoding="utf-8")
marker = "base64 -d <<'PAYLOAD' | gzip -dc > \"$TMP\"\n"
start = text.find(marker)
if start < 0:
    raise SystemExit("source_payload_start_marker_missing")
start += len(marker)
end = text.find("\nPAYLOAD\n", start)
if end < 0:
    raise SystemExit("source_payload_end_marker_missing")
encoded = "".join(text[start:end].split())
raw = gzip.decompress(base64.b64decode(encoded))
actual_sha = hashlib.sha256(raw).hexdigest()
if actual_sha != expected_payload_sha:
    raise SystemExit(f"source_payload_sha_mismatch:{actual_sha}")
payload = raw.decode("utf-8")
bad = 'word_re = re.compile(r"[^\\\\W_]+", re.UNICODE)'
good = 'word_re = re.compile(r"[^\\W_]+", re.UNICODE)'
if payload.count(bad) != 1:
    raise SystemExit(f"tokenizer_bug_occurrence_invalid:{payload.count(bad)}")
payload = payload.replace(bad, good, 1)
payload = payload.replace(
    "BLOG_D1C_NEAR_DUPLICATE_TEMPLATE_QUALITY_STATUS",
    "BLOG_D1C2_FULL_CORRECTED_NEAR_DUPLICATE_STATUS",
)
payload = payload.replace(
    "blog-d1c-near-duplicate-template-quality-v1",
    "blog-d1c2-full-corrected-near-duplicate-v1",
)
payload = payload.replace(
    "sikhadenge-blog-d1c-near-duplicate-template-quality.lock",
    "sikhadenge-blog-d1c2-full-corrected-near-duplicate.lock",
)
payload = payload.replace("SKD-D1C", "SKD-D1C2")
payload = payload.replace("D1C_", "D1C2_")
verification = 'word_re = re.compile(r"[^\\W_]+", re.UNICODE)'
if payload.count(verification) != 1:
    raise SystemExit("corrected_tokenizer_verification_failed")
out_path.write_text(payload, encoding="utf-8")
print(f"SOURCE_PAYLOAD_SHA256={actual_sha}")
print("TOKENIZER_CORRECTION_APPLIED=YES")
PY

chmod 700 "$TMP_PAYLOAD"
bash -n "$TMP_PAYLOAD"
exec /usr/bin/bash "$TMP_PAYLOAD"
