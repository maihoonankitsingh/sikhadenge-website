#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
EXPECTED_COMMIT="${EXPECTED_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
EXPECTED_BUILD_ID="${EXPECTED_BUILD_ID:-rmOFYZtEaWPw35Ygy2l7q}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
EXPECTED_TOTAL="${EXPECTED_TOTAL:-120097}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
D1B_STATE="${D1B_STATE:-$ARTIFACT_ROOT/blog-d1b-full-origin-crawl-state-v1-70407e279140396e62c8}"
EXPECTED_D1B_SHA256="${EXPECTED_D1B_SHA256:-8bf396da48afd3a881c3459b2f1a373f01cfbd6b7ed24c29754c3ce4b8f7a827}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-d1c2-tokenizer-metric-verification-v1-$TS"
STATUS="$OUT/status.txt"
LOCK_FILE="/var/lock/sikhadenge-blog-d1c2-tokenizer-metric-verification.lock"

mkdir -p "$OUT"
chmod 700 "$OUT"

fail() {
  local reason="$1"
  {
    echo "BLOG_D1C2_TOKENIZER_METRIC_VERIFICATION_STATUS=FAIL"
    echo "REASON=$reason"
    echo "SOURCE_MODIFIED=NO"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_PRODUCTION_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

for cmd in git jq python3 sha256sum pm2 flock awk wc tr grep sort; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

exec 9>"$LOCK_FILE"
flock -n 9 || fail "d1c2_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/data/blogs/index.json" || fail "blog_manifest_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -s "$D1B_STATE/results.jsonl" || fail "d1b_results_missing"

test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$EXPECTED_COMMIT" || fail "production_commit_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_id_mismatch"

REMOTE_HEAD_BEFORE="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
test "$REMOTE_HEAD_BEFORE" = "$EXPECTED_COMMIT" || fail "remote_production_head_mismatch"
SOURCE_SHA_BEFORE="$(sha256sum "$ROOT/data/blogs/index.json" "$ROOT"/data/blogs/blogs-*.json | sha256sum | awk '{print $1}')"
D1B_SHA_BEFORE="$(sha256sum "$D1B_STATE/results.jsonl" | awk '{print $1}')"
test "$D1B_SHA_BEFORE" = "$EXPECTED_D1B_SHA256" || fail "d1b_results_hash_mismatch"
PM2_BEFORE="$(pm2 jlist 2>"$OUT/pm2-before.stderr" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"
test -n "$PM2_BEFORE" || fail "production_pm2_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.cwd')" = "$ROOT" || fail "production_pm2_cwd_mismatch"

cat > "$OUT/analyze-corrected.py" <<'PY'
from __future__ import annotations

from pathlib import Path
from collections import Counter
import hashlib
import heapq
import json
import re
import sys
import time
import unicodedata

root = Path(sys.argv[1])
d1b_results = Path(sys.argv[2])
out = Path(sys.argv[3])
expected = int(sys.argv[4])
sketch_size = 24
shingle_size = 5

# Correct tokenizer: one backslash before W inside a raw regex string.
# The prior D1C pattern used r"[^\\W_]+", which excluded literal backslash,
# uppercase W, and underscore instead of expressing Unicode word characters.
word_re = re.compile(r"[^\W_]+", re.UNICODE)

def tokens_for(value: str):
    value = unicodedata.normalize("NFKC", str(value or "")).lower()
    return word_re.findall(value)

def hash64(value: str) -> int:
    return int.from_bytes(
        hashlib.blake2b(value.encode("utf-8"), digest_size=8, person=b"SKD-D1C2").digest(),
        "big",
    )

def bottom_sketch(tokens):
    if not tokens:
        return ()
    if len(tokens) < shingle_size:
        values = {hash64(" ".join(tokens))}
    else:
        values = {
            hash64(" ".join(tokens[index:index + shingle_size]))
            for index in range(len(tokens) - shingle_size + 1)
        }
    return tuple(heapq.nsmallest(sketch_size, values))

def percentile(values, fraction):
    if not values:
        return 0
    ordered = sorted(values)
    index = int((len(ordered) - 1) * fraction)
    return ordered[index]

rendered = {}
for raw in d1b_results.read_text(encoding="utf-8", errors="ignore").splitlines():
    if not raw.strip():
        continue
    item = json.loads(raw)
    slug = str(item.get("slug") or "")
    if slug and slug not in rendered:
        rendered[slug] = {
            "visibleWords": int(item.get("visibleWords") or 0),
            "responseMs": int(item.get("responseMs") or 0),
        }

manifest = json.loads((root / "data/blogs/index.json").read_text(encoding="utf-8"))
shards = manifest.get("shards") or []
rows = []
seen = set()
started = time.time()

for shard in shards:
    file_name = str(shard.get("file") or "")
    if not file_name:
        raise SystemExit("manifest_shard_missing_file")
    payload = json.loads((root / "data/blogs" / file_name).read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise SystemExit(f"invalid_shard:{file_name}")
    for item in payload:
        if not isinstance(item, dict):
            raise SystemExit(f"invalid_item:{file_name}")
        slug = str(item.get("slug") or "").strip()
        if not slug:
            raise SystemExit(f"missing_slug:{file_name}")
        if slug in seen:
            raise SystemExit(f"duplicate_slug:{slug}")
        seen.add(slug)
        if slug not in rendered:
            raise SystemExit(f"missing_d1b_result:{slug}")

        title = str(item.get("title") or "").strip()
        excerpt = str(item.get("excerpt") or "").strip()
        intro = str(item.get("intro") or "").strip()
        summary = [str(v).strip() for v in (item.get("summaryPoints") or []) if str(v).strip()]
        steps = [str(v).strip() for v in (item.get("practicalSteps") or []) if str(v).strip()]
        mistakes = [str(v).strip() for v in (item.get("mistakes") or []) if str(v).strip()]
        faq_items = []
        for faq in item.get("faqs") or []:
            if not isinstance(faq, dict):
                continue
            q = str(faq.get("q") or "").strip()
            a = str(faq.get("a") or "").strip()
            if q and a:
                faq_items.append((q, a))

        faq_parts = [part for pair in faq_items for part in pair]
        parts = [title, excerpt, intro, *summary, *steps, *mistakes, *faq_parts]
        source_tokens = tokens_for(" ".join(part for part in parts if part))
        source_words = len(source_tokens)
        rendered_words = rendered[slug]["visibleWords"]
        contribution = min(1.0, source_words / max(rendered_words, 1))
        dominance = max(0.0, 1.0 - contribution)
        diversity = len(set(source_tokens)) / max(source_words, 1)
        section_score = sum([
            bool(excerpt),
            bool(intro),
            len(summary) >= 3,
            len(steps) >= 4,
            len(mistakes) >= 4,
            len(faq_items) >= 5,
        ]) / 6.0
        sketch = bottom_sketch(source_tokens)

        rows.append({
            "slug": slug,
            "sourceWords": source_words,
            "renderedWords": rendered_words,
            "sourceContribution": contribution,
            "templateDominance": dominance,
            "lexicalDiversity": diversity,
            "sectionCompleteness": section_score,
            "faqCount": len(faq_items),
            "sketchCardinality": len(sketch),
            "responseMs": rendered[slug]["responseMs"],
        })

if len(rows) != expected:
    raise SystemExit(f"source_count_mismatch:{len(rows)}:{expected}")
if len(rendered) != expected:
    raise SystemExit(f"d1b_count_mismatch:{len(rendered)}:{expected}")

metrics_path = out / "corrected-page-metrics.tsv"
with metrics_path.open("w", encoding="utf-8") as fh:
    fh.write("slug\tsourceWords\trenderedWords\tsourceContribution\ttemplateDominance\tlexicalDiversity\tsectionCompleteness\tfaqCount\tsketchCardinality\tresponseMs\n")
    for row in rows:
        fh.write(
            f"{row['slug']}\t{row['sourceWords']}\t{row['renderedWords']}\t"
            f"{row['sourceContribution']:.6f}\t{row['templateDominance']:.6f}\t"
            f"{row['lexicalDiversity']:.6f}\t{row['sectionCompleteness']:.6f}\t"
            f"{row['faqCount']}\t{row['sketchCardinality']}\t{row['responseMs']}\n"
        )

source_words = [row["sourceWords"] for row in rows]
contributions = [row["sourceContribution"] for row in rows]
dominances = [row["templateDominance"] for row in rows]
diversities = [row["lexicalDiversity"] for row in rows]
sketches = [row["sketchCardinality"] for row in rows]
sections = [row["sectionCompleteness"] for row in rows]

summary = {
    "total": len(rows),
    "tokenizerPattern": r"[^\W_]+",
    "tokenizerCorrectionVerified": all(row["sourceWords"] > 1 for row in rows),
    "sourceWordsP10": int(percentile(source_words, 0.10)),
    "sourceWordsP50": int(percentile(source_words, 0.50)),
    "sourceWordsP90": int(percentile(source_words, 0.90)),
    "sourceWordsUnder300": sum(1 for value in source_words if value < 300),
    "sourceWords300To599": sum(1 for value in source_words if 300 <= value < 600),
    "sourceWords600OrMore": sum(1 for value in source_words if value >= 600),
    "sourceContributionP10": round(percentile(contributions, 0.10), 6),
    "sourceContributionP50": round(percentile(contributions, 0.50), 6),
    "sourceContributionP90": round(percentile(contributions, 0.90), 6),
    "sourceContributionUnder40Percent": sum(1 for value in contributions if value < 0.40),
    "sourceContribution40To59Percent": sum(1 for value in contributions if 0.40 <= value < 0.60),
    "sourceContribution60PercentOrMore": sum(1 for value in contributions if value >= 0.60),
    "templateDominanceP50": round(percentile(dominances, 0.50), 6),
    "lexicalDiversityP10": round(percentile(diversities, 0.10), 6),
    "lexicalDiversityP50": round(percentile(diversities, 0.50), 6),
    "lexicalDiversityP90": round(percentile(diversities, 0.90), 6),
    "sectionCompletenessUnder75Percent": sum(1 for value in sections if value < 0.75),
    "sectionCompleteness75To99Percent": sum(1 for value in sections if 0.75 <= value < 1.0),
    "sectionCompleteness100Percent": sum(1 for value in sections if value >= 1.0),
    "sketchCardinalityP10": int(percentile(sketches, 0.10)),
    "sketchCardinalityP50": int(percentile(sketches, 0.50)),
    "sketchCardinalityP90": int(percentile(sketches, 0.90)),
    "pagesWithFullSketch24": sum(1 for value in sketches if value == 24),
    "candidateGenerationReady": sum(1 for value in sketches if value >= 3) == len(rows),
    "completedAtEpoch": int(time.time()),
}
(out / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")

samples = {
    "chatgpt-se-resume-kaise-banaye",
    "ai-se-freelancing-kaise-start-kare",
    "how-to-learn-ai-skills-for-students-in-2026",
    "advanced-techniques-in-ai-automation-for-agencies-in-2026",
    "gemini-vs-chatgpt",
    "chatgpt-vs-gemini",
    "how-to-start-midjourney-for-business-owners-in-2026",
}
(out / "sample-metrics.json").write_text(
    json.dumps([row for row in rows if row["slug"] in samples], indent=2, ensure_ascii=False) + "\n",
    encoding="utf-8",
)
print(json.dumps(summary, separators=(",", ":")))
PY

nice -n 15 python3 "$OUT/analyze-corrected.py" "$ROOT" "$D1B_STATE/results.jsonl" "$OUT" "$EXPECTED_TOTAL" > "$OUT/analyze.stdout.log" 2> "$OUT/analyze.stderr.log" || fail "corrected_analysis_failed"
test -s "$OUT/summary.json" || fail "summary_missing"
test -s "$OUT/corrected-page-metrics.tsv" || fail "metrics_missing"
test "$(jq -r '.total' "$OUT/summary.json")" = "$EXPECTED_TOTAL" || fail "summary_total_mismatch"
test "$(jq -r '.tokenizerCorrectionVerified' "$OUT/summary.json")" = "true" || fail "tokenizer_correction_not_verified"

SOURCE_SHA_AFTER="$(sha256sum "$ROOT/data/blogs/index.json" "$ROOT"/data/blogs/blogs-*.json | sha256sum | awk '{print $1}')"
D1B_SHA_AFTER="$(sha256sum "$D1B_STATE/results.jsonl" | awk '{print $1}')"
PM2_AFTER="$(pm2 jlist 2>"$OUT/pm2-after.stderr" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"
REMOTE_HEAD_AFTER="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"

test "$SOURCE_SHA_AFTER" = "$SOURCE_SHA_BEFORE" || fail "source_changed"
test "$D1B_SHA_AFTER" = "$D1B_SHA_BEFORE" || fail "d1b_results_changed"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "pm2_state_changed"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$EXPECTED_COMMIT" || fail "production_head_changed"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_changed"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_changed"
test "$REMOTE_HEAD_AFTER" = "$REMOTE_HEAD_BEFORE" || fail "remote_production_branch_changed"

sha256sum "$OUT/corrected-page-metrics.tsv" "$OUT/summary.json" "$OUT/sample-metrics.json" > "$OUT/evidence.sha256"

{
  echo "BLOG_D1C2_TOKENIZER_METRIC_VERIFICATION_STATUS=PASS"
  echo "PRODUCTION_COMMIT=$EXPECTED_COMMIT"
  echo "PRODUCTION_BUILD_ID=$EXPECTED_BUILD_ID"
  echo "SOURCE_PAGE_COUNT=$(jq -r '.total' "$OUT/summary.json")"
  echo "TOKENIZER_PATTERN=$(jq -r '.tokenizerPattern' "$OUT/summary.json")"
  echo "TOKENIZER_CORRECTION_VERIFIED=$(jq -r 'if .tokenizerCorrectionVerified then "YES" else "NO" end' "$OUT/summary.json")"
  echo "SOURCE_WORDS_P10=$(jq -r '.sourceWordsP10' "$OUT/summary.json")"
  echo "SOURCE_WORDS_P50=$(jq -r '.sourceWordsP50' "$OUT/summary.json")"
  echo "SOURCE_WORDS_P90=$(jq -r '.sourceWordsP90' "$OUT/summary.json")"
  echo "SOURCE_WORDS_UNDER_300=$(jq -r '.sourceWordsUnder300' "$OUT/summary.json")"
  echo "SOURCE_WORDS_300_TO_599=$(jq -r '.sourceWords300To599' "$OUT/summary.json")"
  echo "SOURCE_WORDS_600_OR_MORE=$(jq -r '.sourceWords600OrMore' "$OUT/summary.json")"
  echo "SOURCE_CONTRIBUTION_P10=$(jq -r '.sourceContributionP10' "$OUT/summary.json")"
  echo "SOURCE_CONTRIBUTION_P50=$(jq -r '.sourceContributionP50' "$OUT/summary.json")"
  echo "SOURCE_CONTRIBUTION_P90=$(jq -r '.sourceContributionP90' "$OUT/summary.json")"
  echo "SOURCE_CONTRIBUTION_UNDER_40_PERCENT=$(jq -r '.sourceContributionUnder40Percent' "$OUT/summary.json")"
  echo "TEMPLATE_DOMINANCE_P50=$(jq -r '.templateDominanceP50' "$OUT/summary.json")"
  echo "LEXICAL_DIVERSITY_P50=$(jq -r '.lexicalDiversityP50' "$OUT/summary.json")"
  echo "SECTION_COMPLETENESS_100_PERCENT=$(jq -r '.sectionCompleteness100Percent' "$OUT/summary.json")"
  echo "SKETCH_CARDINALITY_P50=$(jq -r '.sketchCardinalityP50' "$OUT/summary.json")"
  echo "PAGES_WITH_FULL_SKETCH_24=$(jq -r '.pagesWithFullSketch24' "$OUT/summary.json")"
  echo "CANDIDATE_GENERATION_READY=$(jq -r 'if .candidateGenerationReady then "YES" else "NO" end' "$OUT/summary.json")"
  echo "PUBLICATION_OR_INDEXING_APPROVED=NO"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "SOURCE_MODIFIED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "REMOTE_PRODUCTION_BRANCH_CHANGED=NO"
  echo "NEXT_PHASE=D1C2_FULL_CORRECTED_NEAR_DUPLICATE_CANDIDATE_AUDIT"
  echo "REPORT=$OUT"
} | tee "$STATUS"
