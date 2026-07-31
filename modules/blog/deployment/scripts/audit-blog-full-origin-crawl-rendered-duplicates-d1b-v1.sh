#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
EXPECTED_COMMIT="${EXPECTED_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
EXPECTED_BUILD_ID="${EXPECTED_BUILD_ID:-rmOFYZtEaWPw35Ygy2l7q}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
REQUESTS_PER_SECOND="${REQUESTS_PER_SECOND:-4}"
WORKERS="${WORKERS:-3}"
REQUEST_TIMEOUT_SECONDS="${REQUEST_TIMEOUT_SECONDS:-30}"
MIN_VISIBLE_WORDS="${MIN_VISIBLE_WORDS:-300}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-d1b-full-origin-crawl-v1-$TS"
STATUS="$OUT/status.txt"
LOCK_FILE="/var/lock/sikhadenge-blog-d1b-full-origin-crawl.lock"
DATABASE_URL=""

mkdir -p "$OUT"
chmod 700 "$OUT"

cleanup_secret() {
  DATABASE_URL=""
}
trap cleanup_secret EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_D1B_FULL_ORIGIN_CRAWL_STATUS=FAIL"
    echo "REASON=$reason"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "PREVIEW_TOKEN_CHANGED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

read_env_value() {
  local key="$1"
  python3 - "$ROOT/.env.local" "$key" <<'PY'
from pathlib import Path
import re
import sys
path = Path(sys.argv[1])
key = sys.argv[2]
values = []
pattern = re.compile(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$')
for raw in path.read_text(encoding='utf-8').splitlines():
    stripped = raw.lstrip()
    if not stripped or stripped.startswith('#'):
        continue
    match = pattern.match(raw)
    if not match or match.group(1) != key:
        continue
    value = match.group(2).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        value = value[1:-1]
    values.append(value)
if len(values) != 1 or not values[0]:
    raise SystemExit(1)
sys.stdout.write(values[0])
PY
}

for cmd in git jq pm2 psql python3 sha256sum flock awk sort wc tr stat grep cut nice curl; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

exec 9>"$LOCK_FILE"
flock -n 9 || fail "d1b_crawl_lock_busy"

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -f "$ROOT/data/blogs/index.json" || fail "blog_manifest_missing"

test "$(git -C "$ROOT" branch --show-current)" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test "$(git -C "$ROOT" rev-parse HEAD)" = "$EXPECTED_COMMIT" || fail "production_commit_mismatch"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_not_clean"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_id_mismatch"

REMOTE_HEAD_BEFORE="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
test "$REMOTE_HEAD_BEFORE" = "$EXPECTED_COMMIT" || fail "remote_production_head_mismatch"
ENV_SHA_BEFORE="$(sha256sum "$ROOT/.env.local" | awk '{print $1}')"
TOKEN_LINES_BEFORE="$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)"
test "$TOKEN_LINES_BEFORE" = "1" || fail "preview_token_entry_count_invalid"

PM2_JSON_BEFORE="$(pm2 jlist 2>"$OUT/pm2-before.stderr")" || fail "pm2_snapshot_before_failed"
printf '%s' "$PM2_JSON_BEFORE" | jq -e 'type == "array"' >/dev/null || fail "pm2_json_before_invalid"
PM2_BEFORE="$(printf '%s' "$PM2_JSON_BEFORE" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"
test -n "$PM2_BEFORE" || fail "production_pm2_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.cwd')" = "$ROOT" || fail "production_pm2_cwd_mismatch"

DATABASE_URL="$(read_env_value DATABASE_URL)" || fail "database_url_read_failed"
DB_SIGNATURE_BEFORE="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_before_failed"
printf '%s\n' "$DB_SIGNATURE_BEFORE" > "$OUT/database-signature-before.txt"

SOURCE_KEY="$(sha256sum "$ROOT/data/blogs/index.json" "$ROOT"/data/blogs/blogs-*.json | sha256sum | awk '{print substr($1,1,20)}')"
STATE="$ARTIFACT_ROOT/blog-d1b-full-origin-crawl-state-v1-$SOURCE_KEY"
mkdir -p "$STATE"
chmod 700 "$STATE"

printf '%s\n' "$SOURCE_KEY" > "$OUT/source-key.txt"
printf '%s\n' "$STATE" > "$OUT/state-dir.txt"

python3 - "$ROOT" "$OUT/urls.tsv" "$SOURCE_KEY" "$STATE" <<'PY'
from pathlib import Path
import hashlib
import json
import sys

root = Path(sys.argv[1])
out = Path(sys.argv[2])
source_key = sys.argv[3]
state = Path(sys.argv[4])
manifest = json.loads((root / 'data/blogs/index.json').read_text(encoding='utf-8'))
rows = []
for shard in manifest.get('shards', []):
    file_name = shard.get('file')
    if not file_name:
        raise SystemExit('manifest_shard_missing_file')
    payload = json.loads((root / 'data/blogs' / file_name).read_text(encoding='utf-8'))
    if not isinstance(payload, list):
        raise SystemExit(f'invalid_shard:{file_name}')
    for item in payload:
        if not isinstance(item, dict):
            raise SystemExit(f'invalid_item:{file_name}')
        slug = str(item.get('slug') or '').strip()
        if not slug:
            raise SystemExit(f'missing_slug:{file_name}')
        rows.append(slug)
expected = int(manifest.get('total') or 0)
if len(rows) != expected:
    raise SystemExit(f'raw_count_mismatch:{len(rows)}:{expected}')
if len(set(rows)) != len(rows):
    raise SystemExit('duplicate_source_slugs')
out.write_text(''.join(f'{slug}\thttps://sikhadenge.in/blog/{slug}\n' for slug in rows), encoding='utf-8')
meta = state / 'source-meta.json'
payload = {'sourceKey': source_key, 'expectedCount': expected}
if meta.exists():
    existing = json.loads(meta.read_text(encoding='utf-8'))
    if existing != payload:
        raise SystemExit('state_source_mismatch')
else:
    meta.write_text(json.dumps(payload, indent=2) + '\n', encoding='utf-8')
print(f'SOURCE_URL_COUNT={expected}')
print(f'SOURCE_KEY={source_key}')
print(f'STATE_DIR={state}')
PY

SOURCE_URL_COUNT="$(wc -l < "$OUT/urls.tsv" | tr -d ' ')"
test "$SOURCE_URL_COUNT" = "120097" || fail "source_url_count_invalid"

cat > "$OUT/crawl.py" <<'PY'
from __future__ import annotations

from concurrent.futures import FIRST_COMPLETED, ThreadPoolExecutor, wait
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
import hashlib
import http.client
import json
import os
import re
import sys
import threading
import time

urls_file = Path(sys.argv[1])
state_dir = Path(sys.argv[2])
workers = int(sys.argv[3])
rps = float(sys.argv[4])
timeout = float(sys.argv[5])
min_visible_words = int(sys.argv[6])
results_path = state_dir / 'results.jsonl'
progress_path = state_dir / 'progress.json'
summary_path = state_dir / 'summary.json'
findings_path = state_dir / 'findings.tsv'
duplicate_groups_path = state_dir / 'duplicate-groups.json'

rows = []
for raw in urls_file.read_text(encoding='utf-8').splitlines():
    slug, url = raw.split('\t', 1)
    rows.append((slug, url))
expected_count = len(rows)

valid_results = []
completed = set()
if results_path.exists():
    for raw in results_path.read_text(encoding='utf-8', errors='ignore').splitlines():
        try:
            item = json.loads(raw)
        except Exception:
            continue
        slug = item.get('slug')
        if isinstance(slug, str) and slug and slug not in completed:
            completed.add(slug)
            valid_results.append(item)
    tmp = results_path.with_suffix('.jsonl.clean')
    with tmp.open('w', encoding='utf-8') as fh:
        for item in valid_results:
            fh.write(json.dumps(item, separators=(',', ':'), ensure_ascii=False) + '\n')
    tmp.replace(results_path)

pending = [(slug, url) for slug, url in rows if slug not in completed]

class RateLimiter:
    def __init__(self, rate: float):
        self.interval = 1.0 / max(rate, 0.1)
        self.lock = threading.Lock()
        self.next_at = time.monotonic()

    def wait(self):
        with self.lock:
            now = time.monotonic()
            delay = max(0.0, self.next_at - now)
            self.next_at = max(self.next_at, now) + self.interval
        if delay:
            time.sleep(delay)

limiter = RateLimiter(rps)
cores = max(os.cpu_count() or 1, 1)

class PageParser(HTMLParser):
    skip_tags = {'script', 'style', 'noscript', 'template', 'svg'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title_parts = []
        self.h1_values = []
        self.current_h1 = None
        self.canonical = ''
        self.robots = []
        self.body_parts = []
        self.main_parts = []
        self.in_title = 0
        self.in_h1 = 0
        self.in_body = 0
        self.in_main = 0
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        attrs = {str(k).lower(): str(v or '') for k, v in attrs}
        if tag in self.skip_tags:
            self.skip_depth += 1
        if tag == 'title':
            self.in_title += 1
        elif tag == 'h1':
            self.in_h1 += 1
            self.current_h1 = []
        elif tag == 'body':
            self.in_body += 1
        elif tag == 'main':
            self.in_main += 1
        elif tag == 'link':
            rel = {part.lower() for part in attrs.get('rel', '').split()}
            if 'canonical' in rel and not self.canonical:
                self.canonical = attrs.get('href', '').strip()
        elif tag == 'meta':
            name = attrs.get('name', '').strip().lower()
            if name in {'robots', 'googlebot'}:
                self.robots.append(attrs.get('content', '').strip())

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == 'title' and self.in_title:
            self.in_title -= 1
        elif tag == 'h1' and self.in_h1:
            self.in_h1 -= 1
            value = ' '.join(self.current_h1 or []).strip()
            self.h1_values.append(value)
            self.current_h1 = None
        elif tag == 'body' and self.in_body:
            self.in_body -= 1
        elif tag == 'main' and self.in_main:
            self.in_main -= 1
        if tag in self.skip_tags and self.skip_depth:
            self.skip_depth -= 1

    def handle_data(self, data):
        value = data.strip()
        if not value:
            return
        if self.in_title:
            self.title_parts.append(value)
        if self.in_h1 and self.current_h1 is not None:
            self.current_h1.append(value)
        if self.skip_depth == 0 and self.in_body:
            self.body_parts.append(value)
            if self.in_main:
                self.main_parts.append(value)

space_re = re.compile(r'\s+')
word_re = re.compile(r"[\w'-]+", re.UNICODE)


def compact(value: str) -> str:
    return space_re.sub(' ', value).strip()


def normalized(value: str) -> str:
    return compact(value).lower()


def sha(value: str) -> str:
    return hashlib.sha256(value.encode('utf-8')).hexdigest()


def wait_for_load():
    while True:
        try:
            load1 = os.getloadavg()[0]
        except OSError:
            return
        if load1 <= cores * 1.25:
            return
        time.sleep(2.0)


def request_once(path: str):
    limiter.wait()
    wait_for_load()
    started = time.monotonic()
    connection = http.client.HTTPConnection('127.0.0.1', 3000, timeout=timeout)
    try:
        connection.request('GET', path, headers={
            'Host': 'sikhadenge.in',
            'X-Forwarded-Host': 'sikhadenge.in',
            'X-Forwarded-Proto': 'https',
            'User-Agent': 'SikhadengeBlogAudit/1.0 (+internal-origin-audit)',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Encoding': 'identity',
            'Connection': 'close',
        })
        response = connection.getresponse()
        headers = {k.lower(): v for k, v in response.getheaders()}
        body = response.read(3 * 1024 * 1024 + 1)
        elapsed_ms = int((time.monotonic() - started) * 1000)
        return response.status, headers, body, elapsed_ms
    finally:
        connection.close()


def crawl_one(row):
    slug, source_url = row
    original_path = f'/blog/{slug}'
    path = original_path
    redirects = []
    direct_status = None
    total_ms = 0
    headers = {}
    body = b''
    error = ''

    for retry in range(3):
        try:
            current_path = path
            redirects = []
            total_ms = 0
            for hop in range(4):
                status, headers, body, elapsed_ms = request_once(current_path)
                total_ms += elapsed_ms
                if direct_status is None:
                    direct_status = status
                if status in {301, 302, 303, 307, 308} and headers.get('location'):
                    location = urljoin(f'https://sikhadenge.in{current_path}', headers['location'])
                    parsed = urlparse(location)
                    if parsed.netloc and parsed.netloc.lower() != 'sikhadenge.in':
                        redirects.append(location)
                        current_path = location
                        break
                    next_path = parsed.path or '/'
                    if parsed.query:
                        next_path += '?' + parsed.query
                    redirects.append(next_path)
                    current_path = next_path
                    continue
                path = current_path
                break
            error = ''
            break
        except Exception as exc:
            error = f'{type(exc).__name__}:{exc}'[:300]
            time.sleep(1.0 + retry)
    final_status = int(status) if not error else 0
    content_type = headers.get('content-type', '')
    x_robots = headers.get('x-robots-tag', '')
    too_large = len(body) > 3 * 1024 * 1024
    if too_large:
        body = body[:3 * 1024 * 1024]

    title = ''
    h1_values = []
    canonical = ''
    meta_robots = ''
    visible_text = ''
    parse_error = ''
    if final_status == 200 and 'html' in content_type.lower() and body:
        try:
            text = body.decode('utf-8', errors='replace')
            parser = PageParser()
            parser.feed(text)
            title = compact(' '.join(parser.title_parts))
            h1_values = [compact(value) for value in parser.h1_values if compact(value)]
            canonical = urljoin(source_url, parser.canonical) if parser.canonical else ''
            meta_robots = ','.join(value for value in parser.robots if value)
            visible_parts = parser.main_parts if parser.main_parts else parser.body_parts
            visible_text = compact(' '.join(visible_parts))
        except Exception as exc:
            parse_error = f'{type(exc).__name__}:{exc}'[:300]

    visible_words = len(word_re.findall(visible_text))
    robots_value = f'{meta_robots},{x_robots}'.lower()
    expected_canonical = source_url
    result = {
        'slug': slug,
        'sourceUrl': source_url,
        'directStatus': int(direct_status or 0),
        'finalStatus': final_status,
        'redirectCount': len(redirects),
        'redirects': redirects,
        'finalPath': path,
        'contentType': content_type,
        'responseBytes': len(body),
        'responseMs': total_ms,
        'error': error,
        'parseError': parse_error,
        'tooLarge': too_large,
        'title': title,
        'titleNormalized': normalized(title),
        'h1Count': len(h1_values),
        'h1': h1_values[0] if h1_values else '',
        'h1Normalized': normalized(h1_values[0]) if h1_values else '',
        'canonical': canonical,
        'canonicalSelf': canonical == expected_canonical,
        'metaRobots': meta_robots,
        'xRobotsTag': x_robots,
        'noindex': 'noindex' in robots_value,
        'visibleWords': visible_words,
        'visibleChars': len(visible_text),
        'visibleExactHash': sha(visible_text) if visible_text else '',
        'visibleNormalizedHash': sha(normalized(visible_text)) if visible_text else '',
        'thin': visible_words < min_visible_words,
    }
    return result

print(f'D1B_EXPECTED_TOTAL={expected_count}', flush=True)
print(f'D1B_RESUME_COMPLETED={len(completed)}', flush=True)
print(f'D1B_PENDING={len(pending)}', flush=True)
print(f'D1B_WORKERS={workers}', flush=True)
print(f'D1B_REQUESTS_PER_SECOND={rps}', flush=True)

start_time = time.time()
new_count = 0
with results_path.open('a', encoding='utf-8') as output, ThreadPoolExecutor(max_workers=workers) as executor:
    iterator = iter(pending)
    in_flight = set()

    def fill():
        while len(in_flight) < workers * 2:
            try:
                row = next(iterator)
            except StopIteration:
                return
            in_flight.add(executor.submit(crawl_one, row))

    fill()
    while in_flight:
        finished, in_flight = wait(in_flight, return_when=FIRST_COMPLETED)
        for future in finished:
            result = future.result()
            output.write(json.dumps(result, separators=(',', ':'), ensure_ascii=False) + '\n')
            new_count += 1
            if new_count % 50 == 0:
                output.flush()
            total_done = len(completed) + new_count
            if total_done % 1000 == 0 or total_done == expected_count:
                elapsed = max(time.time() - start_time, 0.001)
                recent_rate = new_count / elapsed if new_count else 0.0
                remaining = expected_count - total_done
                eta_seconds = int(remaining / recent_rate) if recent_rate > 0 else None
                progress = {
                    'expected': expected_count,
                    'completed': total_done,
                    'pending': remaining,
                    'newThisRun': new_count,
                    'runRatePerSecond': round(recent_rate, 3),
                    'etaSeconds': eta_seconds,
                    'updatedAtEpoch': int(time.time()),
                }
                progress_path.write_text(json.dumps(progress, indent=2) + '\n', encoding='utf-8')
                print('D1B_PROGRESS=' + json.dumps(progress, separators=(',', ':')), flush=True)
        fill()
    output.flush()

records = []
seen = set()
for raw in results_path.read_text(encoding='utf-8', errors='ignore').splitlines():
    try:
        item = json.loads(raw)
    except Exception:
        continue
    slug = item.get('slug')
    if isinstance(slug, str) and slug and slug not in seen:
        seen.add(slug)
        records.append(item)
if len(records) != expected_count:
    raise SystemExit(f'incomplete_results:{len(records)}:{expected_count}')


def add_group(store, key, slug):
    if not key:
        return
    existing = store.get(key)
    if existing is None:
        store[key] = slug
    elif isinstance(existing, str):
        store[key] = [existing, slug]
    else:
        existing.append(slug)

exact_groups = {}
normalized_groups = {}
title_groups = {}
h1_groups = {}
for item in records:
    add_group(exact_groups, item.get('visibleExactHash', ''), item['slug'])
    add_group(normalized_groups, item.get('visibleNormalizedHash', ''), item['slug'])
    add_group(title_groups, item.get('titleNormalized', ''), item['slug'])
    add_group(h1_groups, item.get('h1Normalized', ''), item['slug'])

exact_dups = {k: v for k, v in exact_groups.items() if isinstance(v, list)}
normalized_dups = {k: v for k, v in normalized_groups.items() if isinstance(v, list)}
title_dups = {k: v for k, v in title_groups.items() if isinstance(v, list)}
h1_dups = {k: v for k, v in h1_groups.items() if isinstance(v, list)}

red = set()
yellow = set()
findings = []

def issue(slug, severity, code, detail=''):
    findings.append((slug, severity, code, str(detail).replace('\t', ' ').replace('\n', ' ')[:500]))
    if severity == 'RED':
        red.add(slug)
        yellow.discard(slug)
    elif severity == 'YELLOW' and slug not in red:
        yellow.add(slug)

for item in records:
    slug = item['slug']
    if item.get('error'):
        issue(slug, 'RED', 'REQUEST_ERROR', item['error'])
    if item.get('directStatus') != 200:
        issue(slug, 'RED', 'DIRECT_STATUS_NOT_200', item.get('directStatus'))
    if item.get('finalStatus') != 200:
        issue(slug, 'RED', 'FINAL_STATUS_NOT_200', item.get('finalStatus'))
    if item.get('redirectCount', 0) > 0:
        issue(slug, 'RED', 'SITEMAP_URL_REDIRECTS', item.get('redirects'))
    if not item.get('canonical'):
        issue(slug, 'RED', 'CANONICAL_MISSING')
    elif not item.get('canonicalSelf'):
        issue(slug, 'RED', 'CANONICAL_NOT_SELF', item.get('canonical'))
    if item.get('noindex'):
        issue(slug, 'RED', 'NOINDEX_PRESENT', f"{item.get('metaRobots')}|{item.get('xRobotsTag')}")
    if item.get('thin'):
        issue(slug, 'RED', 'THIN_RENDERED_TEXT', item.get('visibleWords'))
    if item.get('parseError'):
        issue(slug, 'RED', 'HTML_PARSE_ERROR', item.get('parseError'))
    if item.get('tooLarge'):
        issue(slug, 'YELLOW', 'HTML_OVER_3MB')
    if item.get('h1Count') == 0:
        issue(slug, 'YELLOW', 'H1_MISSING')
    elif item.get('h1Count', 0) > 1:
        issue(slug, 'YELLOW', 'MULTIPLE_H1', item.get('h1Count'))
    if not item.get('title'):
        issue(slug, 'YELLOW', 'TITLE_MISSING')
    if item.get('responseMs', 0) > 3000:
        issue(slug, 'YELLOW', 'SLOW_RESPONSE_OVER_3S', item.get('responseMs'))

for groups, code, severity in [
    (exact_dups, 'DUPLICATE_RENDERED_EXACT_TEXT', 'RED'),
    (normalized_dups, 'DUPLICATE_RENDERED_NORMALIZED_TEXT', 'RED'),
    (title_dups, 'DUPLICATE_TITLE', 'YELLOW'),
    (h1_dups, 'DUPLICATE_H1', 'YELLOW'),
]:
    for key, slugs in groups.items():
        detail = f'group_size={len(slugs)} hash={key}'
        for slug in slugs:
            issue(slug, severity, code, detail)

with findings_path.open('w', encoding='utf-8') as fh:
    fh.write('slug\tseverity\tcode\tdetail\n')
    for row in sorted(findings):
        fh.write('\t'.join(row) + '\n')

duplicate_groups_path.write_text(json.dumps({
    'exactRenderedText': exact_dups,
    'normalizedRenderedText': normalized_dups,
    'titles': title_dups,
    'h1': h1_dups,
}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

all_slugs = {item['slug'] for item in records}
green = all_slugs - red - yellow
summary = {
    'total': expected_count,
    'direct200': sum(1 for item in records if item.get('directStatus') == 200),
    'final200': sum(1 for item in records if item.get('finalStatus') == 200),
    'non200': sum(1 for item in records if item.get('finalStatus') != 200),
    'requestErrors': sum(1 for item in records if item.get('error')),
    'redirected': sum(1 for item in records if item.get('redirectCount', 0) > 0),
    'canonicalSelf': sum(1 for item in records if item.get('canonicalSelf')),
    'canonicalMissing': sum(1 for item in records if not item.get('canonical')),
    'canonicalMismatch': sum(1 for item in records if item.get('canonical') and not item.get('canonicalSelf')),
    'noindex': sum(1 for item in records if item.get('noindex')),
    'h1Missing': sum(1 for item in records if item.get('h1Count') == 0),
    'h1Multiple': sum(1 for item in records if item.get('h1Count', 0) > 1),
    'titleMissing': sum(1 for item in records if not item.get('title')),
    'thinRendered': sum(1 for item in records if item.get('thin')),
    'slowOver3s': sum(1 for item in records if item.get('responseMs', 0) > 3000),
    'exactDuplicateGroups': len(exact_dups),
    'exactDuplicateRows': sum(len(v) for v in exact_dups.values()),
    'normalizedDuplicateGroups': len(normalized_dups),
    'normalizedDuplicateRows': sum(len(v) for v in normalized_dups.values()),
    'duplicateTitleGroups': len(title_dups),
    'duplicateTitleRows': sum(len(v) for v in title_dups.values()),
    'duplicateH1Groups': len(h1_dups),
    'duplicateH1Rows': sum(len(v) for v in h1_dups.values()),
    'green': len(green),
    'yellow': len(yellow),
    'red': len(red),
    'allPagesLiveCertified': all(item.get('directStatus') == 200 and not item.get('error') and item.get('redirectCount', 0) == 0 for item in records),
    'allPagesRenderedExactUniqueCertified': len(exact_dups) == 0 and len(normalized_dups) == 0,
    'allPagesBasicCrawlReadyCertified': len(red) == 0,
    'completedAtEpoch': int(time.time()),
}
summary_path.write_text(json.dumps(summary, indent=2) + '\n', encoding='utf-8')
print('D1B_SUMMARY=' + json.dumps(summary, separators=(',', ':')), flush=True)
PY

set +e
nice -n 15 python3 "$OUT/crawl.py" "$OUT/urls.tsv" "$STATE" "$WORKERS" "$REQUESTS_PER_SECOND" "$REQUEST_TIMEOUT_SECONDS" "$MIN_VISIBLE_WORDS" >"$OUT/crawl.stdout.log" 2>"$OUT/crawl.stderr.log"
CRAWL_RC=$?
set -e
cat "$OUT/crawl.stdout.log"
test "$CRAWL_RC" -eq 0 || fail "full_origin_crawl_failed"
test -s "$STATE/summary.json" || fail "crawl_summary_missing"
test -s "$STATE/findings.tsv" || fail "crawl_findings_missing"
test -s "$STATE/results.jsonl" || fail "crawl_results_missing"

SUMMARY="$STATE/summary.json"
TOTAL="$(jq -r '.total' "$SUMMARY")"
DIRECT_200="$(jq -r '.direct200' "$SUMMARY")"
FINAL_200="$(jq -r '.final200' "$SUMMARY")"
NON_200="$(jq -r '.non200' "$SUMMARY")"
REQUEST_ERRORS="$(jq -r '.requestErrors' "$SUMMARY")"
REDIRECTED="$(jq -r '.redirected' "$SUMMARY")"
CANONICAL_SELF="$(jq -r '.canonicalSelf' "$SUMMARY")"
CANONICAL_MISSING="$(jq -r '.canonicalMissing' "$SUMMARY")"
CANONICAL_MISMATCH="$(jq -r '.canonicalMismatch' "$SUMMARY")"
NOINDEX="$(jq -r '.noindex' "$SUMMARY")"
H1_MISSING="$(jq -r '.h1Missing' "$SUMMARY")"
H1_MULTIPLE="$(jq -r '.h1Multiple' "$SUMMARY")"
TITLE_MISSING="$(jq -r '.titleMissing' "$SUMMARY")"
THIN_RENDERED="$(jq -r '.thinRendered' "$SUMMARY")"
SLOW_OVER_3S="$(jq -r '.slowOver3s' "$SUMMARY")"
EXACT_DUP_GROUPS="$(jq -r '.exactDuplicateGroups' "$SUMMARY")"
EXACT_DUP_ROWS="$(jq -r '.exactDuplicateRows' "$SUMMARY")"
NORMALIZED_DUP_GROUPS="$(jq -r '.normalizedDuplicateGroups' "$SUMMARY")"
NORMALIZED_DUP_ROWS="$(jq -r '.normalizedDuplicateRows' "$SUMMARY")"
DUP_TITLE_GROUPS="$(jq -r '.duplicateTitleGroups' "$SUMMARY")"
DUP_TITLE_ROWS="$(jq -r '.duplicateTitleRows' "$SUMMARY")"
DUP_H1_GROUPS="$(jq -r '.duplicateH1Groups' "$SUMMARY")"
DUP_H1_ROWS="$(jq -r '.duplicateH1Rows' "$SUMMARY")"
GREEN="$(jq -r '.green' "$SUMMARY")"
YELLOW="$(jq -r '.yellow' "$SUMMARY")"
RED="$(jq -r '.red' "$SUMMARY")"
ALL_LIVE="$(jq -r 'if .allPagesLiveCertified then "YES" else "NO" end' "$SUMMARY")"
ALL_EXACT_UNIQUE="$(jq -r 'if .allPagesRenderedExactUniqueCertified then "YES" else "NO" end' "$SUMMARY")"
ALL_BASIC_CRAWL_READY="$(jq -r 'if .allPagesBasicCrawlReadyCertified then "YES" else "NO" end' "$SUMMARY")"

test "$TOTAL" = "$SOURCE_URL_COUNT" || fail "crawl_total_mismatch"

# Public edge remains covered by D1A's evenly distributed sample. Recheck a small
# deterministic public sample after the full local-origin crawl.
python3 - "$OUT/urls.tsv" "$OUT/public-post-crawl-sample.tsv" <<'PY'
from pathlib import Path
import sys
rows = Path(sys.argv[1]).read_text(encoding='utf-8').splitlines()
indexes = sorted(set([0, len(rows)//4, len(rows)//2, (len(rows)*3)//4, len(rows)-1]))
Path(sys.argv[2]).write_text('\n'.join(rows[i].split('\t', 1)[1] for i in indexes) + '\n', encoding='utf-8')
PY
PUBLIC_SAMPLE_TOTAL=0
PUBLIC_SAMPLE_200=0
while IFS= read -r URL; do
  test -n "$URL" || continue
  PUBLIC_SAMPLE_TOTAL=$((PUBLIC_SAMPLE_TOTAL+1))
  CODE="$(curl -sS -L -o /dev/null -w '%{http_code}' --max-time 45 "$URL" || true)"
  printf '%s\t%s\n' "$CODE" "$URL" >> "$OUT/public-post-crawl-results.tsv"
  test "$CODE" = "200" && PUBLIC_SAMPLE_200=$((PUBLIC_SAMPLE_200+1))
done < "$OUT/public-post-crawl-sample.tsv"
test "$PUBLIC_SAMPLE_TOTAL" = "5" || fail "public_post_crawl_sample_count_invalid"
test "$PUBLIC_SAMPLE_200" = "$PUBLIC_SAMPLE_TOTAL" || fail "public_post_crawl_sample_failed"

DB_SIGNATURE_AFTER="$(psql "$DATABASE_URL" -X -At -F'|' -c "SELECT
  (SELECT count(*) FROM blog_content.workspaces),
  (SELECT count(*) FROM blog_content.pages),
  (SELECT count(*) FROM blog_content.page_versions),
  (SELECT count(*) FROM blog_content.content_fingerprints),
  (SELECT count(*) FROM blog_content.publications),
  (SELECT count(*) FROM blog_content.quality_runs),
  (SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_after_failed"
printf '%s\n' "$DB_SIGNATURE_AFTER" > "$OUT/database-signature-after.txt"
test "$DB_SIGNATURE_AFTER" = "$DB_SIGNATURE_BEFORE" || fail "database_signature_changed"

PM2_JSON_AFTER="$(pm2 jlist 2>"$OUT/pm2-after.stderr")" || fail "pm2_snapshot_after_failed"
printf '%s' "$PM2_JSON_AFTER" | jq -e 'type == "array"' >/dev/null || fail "pm2_json_after_invalid"
PM2_AFTER="$(printf '%s' "$PM2_JSON_AFTER" | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "pm2_state_changed_during_crawl"

test "$(git -C "$ROOT" rev-parse HEAD)" = "$EXPECTED_COMMIT" || fail "production_head_changed"
test -z "$(git -C "$ROOT" status --porcelain)" || fail "production_worktree_changed"
test "$(cat "$ROOT/.next/BUILD_ID")" = "$EXPECTED_BUILD_ID" || fail "production_build_changed"
test "$(sha256sum "$ROOT/.env.local" | awk '{print $1}')" = "$ENV_SHA_BEFORE" || fail "production_env_changed"
test "$(grep -cE '^[[:space:]]*BLOG_REVIEW_PREVIEW_TOKEN=' "$ROOT/.env.local" || true)" = "$TOKEN_LINES_BEFORE" || fail "preview_token_changed"
test "$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')" = "$REMOTE_HEAD_BEFORE" || fail "remote_branch_changed"

cp "$STATE/summary.json" "$OUT/summary.json"
cp "$STATE/findings.tsv" "$OUT/findings.tsv"
cp "$STATE/duplicate-groups.json" "$OUT/duplicate-groups.json"
sha256sum "$STATE/results.jsonl" "$OUT/summary.json" "$OUT/findings.tsv" "$OUT/duplicate-groups.json" > "$OUT/evidence.sha256"

{
  echo "BLOG_D1B_FULL_ORIGIN_CRAWL_STATUS=PASS"
  echo "PRODUCTION_COMMIT=$EXPECTED_COMMIT"
  echo "PRODUCTION_BUILD_ID=$EXPECTED_BUILD_ID"
  echo "CRAWL_TRANSPORT=LOCAL_ORIGIN_WITH_PUBLIC_HOST_HEADERS"
  echo "CRAWL_WORKERS=$WORKERS"
  echo "CRAWL_REQUESTS_PER_SECOND=$REQUESTS_PER_SECOND"
  echo "CRAWL_RESUMABLE_STATE=$STATE"
  echo "HTTP_FULL_TOTAL=$TOTAL"
  echo "HTTP_DIRECT_200=$DIRECT_200"
  echo "HTTP_FINAL_200=$FINAL_200"
  echo "HTTP_NON_200=$NON_200"
  echo "HTTP_REQUEST_ERRORS=$REQUEST_ERRORS"
  echo "HTTP_REDIRECTED=$REDIRECTED"
  echo "CANONICAL_SELF_COUNT=$CANONICAL_SELF"
  echo "CANONICAL_MISSING_COUNT=$CANONICAL_MISSING"
  echo "CANONICAL_MISMATCH_COUNT=$CANONICAL_MISMATCH"
  echo "NOINDEX_COUNT=$NOINDEX"
  echo "H1_MISSING_COUNT=$H1_MISSING"
  echo "H1_MULTIPLE_COUNT=$H1_MULTIPLE"
  echo "TITLE_MISSING_COUNT=$TITLE_MISSING"
  echo "THIN_RENDERED_COUNT=$THIN_RENDERED"
  echo "SLOW_OVER_3S_COUNT=$SLOW_OVER_3S"
  echo "RENDERED_EXACT_DUPLICATE_GROUPS=$EXACT_DUP_GROUPS"
  echo "RENDERED_EXACT_DUPLICATE_ROWS=$EXACT_DUP_ROWS"
  echo "RENDERED_NORMALIZED_DUPLICATE_GROUPS=$NORMALIZED_DUP_GROUPS"
  echo "RENDERED_NORMALIZED_DUPLICATE_ROWS=$NORMALIZED_DUP_ROWS"
  echo "DUPLICATE_TITLE_GROUPS=$DUP_TITLE_GROUPS"
  echo "DUPLICATE_TITLE_ROWS=$DUP_TITLE_ROWS"
  echo "DUPLICATE_H1_GROUPS=$DUP_H1_GROUPS"
  echo "DUPLICATE_H1_ROWS=$DUP_H1_ROWS"
  echo "GREEN_PAGE_COUNT=$GREEN"
  echo "YELLOW_PAGE_COUNT=$YELLOW"
  echo "RED_PAGE_COUNT=$RED"
  echo "ALL_PAGES_LIVE_CERTIFIED=$ALL_LIVE"
  echo "ALL_PAGES_RENDERED_EXACT_UNIQUE_CERTIFIED=$ALL_EXACT_UNIQUE"
  echo "ALL_PAGES_BASIC_CRAWL_READY_CERTIFIED=$ALL_BASIC_CRAWL_READY"
  echo "PUBLIC_EDGE_FULL_CRAWL_PERFORMED=NO"
  echo "PUBLIC_EDGE_POST_CRAWL_SAMPLE_TOTAL=$PUBLIC_SAMPLE_TOTAL"
  echo "PUBLIC_EDGE_POST_CRAWL_SAMPLE_200=$PUBLIC_SAMPLE_200"
  echo "DATABASE_INDEX_BLOCKED_COUNT=120097"
  echo "ALL_PAGES_INDEX_READY_CERTIFIED=NO"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PREVIEW_TOKEN_CHANGED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "REMOTE_BRANCH_CHANGED=NO"
  echo "NEXT_PHASE=D1C_NEAR_DUPLICATE_TEMPLATE_RATIO_AND_QUALITY_CLUSTER_AUDIT"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup_secret
trap - EXIT
