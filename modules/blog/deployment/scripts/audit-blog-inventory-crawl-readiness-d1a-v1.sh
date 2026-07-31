#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

export HOME="${HOME:-/root}"
export PM2_HOME="${PM2_HOME:-/root/.pm2}"

ROOT="${ROOT:-/var/www/sikhadenge.in/sikhadenge-website-space}"
TARGET_COMMIT="${TARGET_COMMIT:-74af60d3a3026646a0b66feb869e5b7ce60bd229}"
PRODUCTION_BRANCH="${PRODUCTION_BRANCH:-live-clean-sync-20260424}"
EXPECTED_TOTAL="${EXPECTED_TOTAL:-120097}"
PM2_NAME="${PM2_NAME:-sikhadenge-in}"
ARTIFACT_ROOT="${ARTIFACT_ROOT:-/var/lib/sikhadenge-blog-artifacts}"
SAMPLE_COUNT="${SAMPLE_COUNT:-120}"
TS="$(date +%Y%m%d_%H%M%S)"
OUT="$ARTIFACT_ROOT/blog-d1a-inventory-crawl-readiness-v1-$TS"
STATUS="$OUT/status.txt"
DATABASE_URL=""

mkdir -p "$OUT/sitemaps"
chmod 700 "$OUT"

cleanup() {
  DATABASE_URL=""
}
trap cleanup EXIT

fail() {
  local reason="$1"
  {
    echo "BLOG_D1A_INVENTORY_CRAWL_READINESS_STATUS=FAIL"
    echo "REASON=$reason"
    echo "PRODUCTION_MUTATION_PERFORMED=NO"
    echo "PM2_RESTART_PERFORMED=NO"
    echo "DATABASE_WRITE_PERFORMED=NO"
    echo "REMOTE_BRANCH_CHANGED=NO"
    echo "REPORT=$OUT"
  } | tee "$STATUS" >&2
  exit 1
}

for cmd in git python3 psql curl jq pm2 sha256sum awk sort comm grep sed wc stat; do
  command -v "$cmd" >/dev/null 2>&1 || fail "${cmd}_not_found"
done

test -d "$ROOT/.git" || fail "production_repository_missing"
test -f "$ROOT/.env.local" || fail "production_env_missing"
test -s "$ROOT/.next/BUILD_ID" || fail "production_build_missing"
test -s "$ROOT/data/blogs/index.json" || fail "blog_manifest_missing"

LIVE_HEAD_BEFORE="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_BEFORE="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_BEFORE="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_BEFORE="$(cat "$ROOT/.next/BUILD_ID")"
REMOTE_HEAD_BEFORE="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
ENV_SHA_BEFORE="$(sha256sum "$ROOT/.env.local" | awk '{print $1}')"
PM2_BEFORE="$(pm2 jlist | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"

test "$LIVE_HEAD_BEFORE" = "$TARGET_COMMIT" || fail "production_head_mismatch"
test "$LIVE_BRANCH_BEFORE" = "$PRODUCTION_BRANCH" || fail "production_branch_mismatch"
test -z "$LIVE_STATUS_BEFORE" || fail "production_worktree_not_clean"
test "$REMOTE_HEAD_BEFORE" = "$TARGET_COMMIT" || fail "remote_production_head_mismatch"
test -n "$PM2_BEFORE" || fail "production_pm2_missing"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.status')" = "online" || fail "production_pm2_not_online"
test "$(printf '%s' "$PM2_BEFORE" | jq -r '.cwd')" = "$ROOT" || fail "production_pm2_cwd_mismatch"

DATABASE_URL="$(python3 - "$ROOT/.env.local" <<'PY'
from pathlib import Path
import re, sys
values=[]
for raw in Path(sys.argv[1]).read_text(encoding='utf-8').splitlines():
    m=re.match(r'^\s*DATABASE_URL\s*=(.*)$', raw)
    if not m: continue
    value=m.group(1).strip()
    if len(value)>=2 and value[0]==value[-1] and value[0] in {'"', "'"}: value=value[1:-1]
    values.append(value)
if len(values)!=1 or not values[0]: raise SystemExit(1)
sys.stdout.write(values[0])
PY
)" || fail "database_url_read_failed"

DB_SIGNATURE_BEFORE="$(psql "$DATABASE_URL" -X -At -F'|' -v ON_ERROR_STOP=1 -c "SELECT (SELECT count(*) FROM blog_content.pages),(SELECT count(*) FROM blog_content.page_versions),(SELECT count(*) FROM blog_content.content_fingerprints),(SELECT count(*) FROM blog_content.publications),(SELECT count(*) FROM blog_content.quality_runs),(SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_before_failed"
echo "$DB_SIGNATURE_BEFORE" > "$OUT/database-signature-before.txt"

python3 - "$ROOT" "$OUT" "$EXPECTED_TOTAL" <<'PY'
from pathlib import Path
from collections import Counter, defaultdict
import csv, hashlib, json, re, sys

root=Path(sys.argv[1]); out=Path(sys.argv[2]); expected=int(sys.argv[3])
manifest=json.loads((root/'data/blogs/index.json').read_text(encoding='utf-8'))
shards=manifest.get('shards') or []
raw=[]; shard_errors=[]
for entry in shards:
    name=str(entry.get('file') or '')
    path=root/'data/blogs'/name
    if not name or not path.is_file():
        shard_errors.append(f'missing:{name}'); continue
    payload=json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(payload,list):
        shard_errors.append(f'not_list:{name}'); continue
    declared=entry.get('count')
    if isinstance(declared,int) and declared!=len(payload): shard_errors.append(f'count:{name}:{declared}:{len(payload)}')
    raw.extend(payload)

def clean(v): return v.strip() if isinstance(v,str) else ''
def norm(v): return re.sub(r'\s+',' ',re.sub(r'[^a-z0-9]+',' ',clean(v).lower())).strip()
def text_of(item):
    parts=[clean(item.get(k)) for k in ('title','excerpt','intro')]
    for k in ('summaryPoints','practicalSteps','mistakes'):
        vals=item.get(k) or []
        if isinstance(vals,list): parts.extend(clean(x) for x in vals)
    faqs=item.get('faqs') or []
    if isinstance(faqs,list):
        for faq in faqs:
            if isinstance(faq,dict): parts += [clean(faq.get('q')),clean(faq.get('a'))]
    return '\n'.join(x for x in parts if x)

seen=set(); runtime=[]; raw_slug_counts=Counter(); invalid_rows=0
for item in raw:
    if not isinstance(item,dict): invalid_rows+=1; continue
    slug=clean(item.get('slug')); title=clean(item.get('title'))
    if slug: raw_slug_counts[slug]+=1
    if not slug or not title or slug in seen: invalid_rows+=1; continue
    seen.add(slug); runtime.append(item)

slug_re=re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
title_counts=Counter(); excerpt_counts=Counter(); intro_counts=Counter(); exact_counts=Counter(); normalized_counts=Counter()
missing=Counter(); invalid_slugs=[]; rows=[]
for item in runtime:
    slug=clean(item.get('slug')); title=clean(item.get('title')); excerpt=clean(item.get('excerpt')); intro=clean(item.get('intro'))
    summary=item.get('summaryPoints') if isinstance(item.get('summaryPoints'),list) else []
    steps=item.get('practicalSteps') if isinstance(item.get('practicalSteps'),list) else []
    mistakes=item.get('mistakes') if isinstance(item.get('mistakes'),list) else []
    faqs=item.get('faqs') if isinstance(item.get('faqs'),list) else []
    body=text_of(item); exact=hashlib.sha256(body.encode()).hexdigest(); normalized=hashlib.sha256(norm(body).encode()).hexdigest()
    title_counts[norm(title)]+=1
    if excerpt: excerpt_counts[norm(excerpt)]+=1
    if intro: intro_counts[norm(intro)]+=1
    exact_counts[exact]+=1; normalized_counts[normalized]+=1
    if not slug_re.fullmatch(slug): invalid_slugs.append(slug)
    if not excerpt: missing['excerpt']+=1
    if not intro: missing['intro']+=1
    if len([x for x in summary if clean(x)])<3: missing['summary_fallback']+=1
    if len([x for x in steps if clean(x)])<4: missing['steps_fallback']+=1
    if len([x for x in mistakes if clean(x)])<4: missing['mistakes_fallback']+=1
    if len([x for x in faqs if isinstance(x,dict) and clean(x.get('q')) and clean(x.get('a'))])<1: missing['faq_fallback']+=1
    rows.append((slug,title,exact,normalized,len(norm(body).split())))

def dup_stats(counter):
    groups=sum(1 for n in counter.values() if n>1); rows=sum(n for n in counter.values() if n>1)
    return groups,rows
metrics={
 'MANIFEST_DECLARED_TOTAL':manifest.get('total',0),'SHARD_COUNT':len(shards),'SHARD_ERROR_COUNT':len(shard_errors),
 'RAW_ITEM_COUNT':len(raw),'RUNTIME_SANITIZED_COUNT':len(runtime),'RUNTIME_DROPPED_ROWS':invalid_rows,
 'UNIQUE_SLUG_COUNT':len(seen),'RAW_DUPLICATE_SLUG_ROWS':sum(n for n in raw_slug_counts.values() if n>1),
 'INVALID_SLUG_COUNT':len(invalid_slugs),'MISSING_EXCERPT_COUNT':missing['excerpt'],'MISSING_INTRO_COUNT':missing['intro'],
 'FALLBACK_SUMMARY_COUNT':missing['summary_fallback'],'FALLBACK_STEPS_COUNT':missing['steps_fallback'],
 'FALLBACK_MISTAKES_COUNT':missing['mistakes_fallback'],'FALLBACK_FAQ_COUNT':missing['faq_fallback'],
}
for prefix,counter in [('TITLE',title_counts),('EXCERPT',excerpt_counts),('INTRO',intro_counts),('EXACT_BODY',exact_counts),('NORMALIZED_BODY',normalized_counts)]:
    g,r=dup_stats(counter); metrics[f'DUPLICATE_{prefix}_GROUPS']=g; metrics[f'DUPLICATE_{prefix}_ROWS']=r
(out/'source-metrics.env').write_text('\n'.join(f'{k}={v}' for k,v in metrics.items())+'\n',encoding='utf-8')
(out/'shard-errors.txt').write_text('\n'.join(shard_errors)+'\n',encoding='utf-8')
(out/'invalid-slugs.txt').write_text('\n'.join(invalid_slugs)+'\n',encoding='utf-8')
with (out/'source-items.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(['slug','title','exact_body_hash','normalized_body_hash','normalized_word_count']); w.writerows(rows)
(out/'source-slugs.txt').write_text('\n'.join(sorted(seen))+'\n',encoding='utf-8')
(out/'expected-blog-urls.txt').write_text('\n'.join('https://sikhadenge.in/blog/'+s for s in sorted(seen))+'\n',encoding='utf-8')
for name,counter in [('title',title_counts),('excerpt',excerpt_counts),('intro',intro_counts),('exact-body',exact_counts),('normalized-body',normalized_counts)]:
    data=sorted(((n,k) for k,n in counter.items() if n>1),reverse=True)[:200]
    (out/f'duplicate-{name}-groups.tsv').write_text('\n'.join(f'{n}\t{k}' for n,k in data)+'\n',encoding='utf-8')
if len(raw)!=expected or len(runtime)!=expected: (out/'source-count-warning.txt').write_text(f'expected={expected} raw={len(raw)} runtime={len(runtime)}\n')
PY

test -s "$OUT/source-metrics.env" || fail "source_audit_output_missing"
# shellcheck disable=SC1090
. "$OUT/source-metrics.env"

psql "$DATABASE_URL" -X -q -v ON_ERROR_STOP=1 -c "COPY (SELECT p.slug,p.\"canonicalPath\",p.title,p.\"lifecycleStatus\"::text,p.\"indexEligibility\"::text,v.title AS version_title,v.\"metaTitle\",v.\"metaDescription\",v.h1,v.\"wordCount\",v.\"exactHash\",v.\"normalizedHash\" FROM blog_content.pages p JOIN (SELECT DISTINCT ON (\"pageId\") \"pageId\",title,\"metaTitle\",\"metaDescription\",h1,\"wordCount\",\"exactHash\",\"normalizedHash\" FROM blog_content.page_versions ORDER BY \"pageId\",\"versionNumber\" DESC) v ON v.\"pageId\"=p.id ORDER BY p.slug) TO STDOUT WITH (FORMAT CSV, HEADER TRUE)" > "$OUT/database-pages.csv" || fail "database_inventory_export_failed"

curl -fsS --max-time 60 'https://sikhadenge.in/sitemap.xml' -o "$OUT/sitemap-index.xml" || fail "sitemap_index_fetch_failed"
curl -fsS --max-time 60 'https://sikhadenge.in/robots.txt' -o "$OUT/robots.txt" || fail "robots_fetch_failed"

python3 - "$OUT" <<'PY'
from pathlib import Path
import csv, json, sys, urllib.robotparser, xml.etree.ElementTree as ET
out=Path(sys.argv[1])
root=ET.parse(out/'sitemap-index.xml').getroot()
locs=[]
for node in root.iter():
    if node.tag.endswith('loc') and node.text and 'sitemap-blogs-' in node.text: locs.append(node.text.strip())
(out/'blog-sitemap-urls.txt').write_text('\n'.join(locs)+'\n',encoding='utf-8')
rp=urllib.robotparser.RobotFileParser(); rp.parse((out/'robots.txt').read_text(encoding='utf-8',errors='replace').splitlines())
allowed=rp.can_fetch('Googlebot','https://sikhadenge.in/blog/example-page')
(out/'robots-metrics.env').write_text(f'ROBOTS_GOOGLEBOT_BLOG_ALLOWED={"YES" if allowed else "NO"}\nBLOG_SITEMAP_SHARD_COUNT={len(locs)}\n')
PY

while IFS= read -r url; do
  test -n "$url" || continue
  name="$(printf '%s' "$url" | sed 's#^.*/##')"
  curl -fsS --max-time 120 "$url" -o "$OUT/sitemaps/$name" || fail "blog_sitemap_fetch_failed_$name"
done < "$OUT/blog-sitemap-urls.txt"

python3 - "$OUT" "$EXPECTED_TOTAL" <<'PY'
from pathlib import Path
from collections import Counter
import csv, sys, xml.etree.ElementTree as ET
out=Path(sys.argv[1]); expected=int(sys.argv[2])
source_rows=list(csv.DictReader((out/'source-items.csv').open(encoding='utf-8')))
db_rows=list(csv.DictReader((out/'database-pages.csv').open(encoding='utf-8')))
source_slugs={r['slug'] for r in source_rows}; db_slugs=[r['slug'] for r in db_rows]; db_set=set(db_slugs)
urls=[]
for path in sorted((out/'sitemaps').glob('*.xml')):
    root=ET.parse(path).getroot()
    for node in root.iter():
        if node.tag.endswith('loc') and node.text: urls.append(node.text.strip())
url_counts=Counter(urls); url_set=set(urls); expected_urls={'https://sikhadenge.in/blog/'+s for s in source_slugs}
life=Counter(r['lifecycleStatus'] for r in db_rows); index=Counter(r['indexEligibility'] for r in db_rows)
normalized=Counter(r['normalizedHash'] for r in db_rows if r['normalizedHash']); exact=Counter(r['exactHash'] for r in db_rows if r['exactHash'])
def dups(c): return sum(1 for n in c.values() if n>1),sum(n for n in c.values() if n>1)
ng,nr=dups(normalized); eg,er=dups(exact)
metrics={
 'DATABASE_PAGE_ROWS':len(db_rows),'DATABASE_UNIQUE_SLUGS':len(db_set),'SOURCE_DATABASE_MISSING_SLUGS':len(source_slugs-db_set),
 'DATABASE_SOURCE_EXTRA_SLUGS':len(db_set-source_slugs),'DATABASE_EXACT_HASH_DUPLICATE_GROUPS':eg,'DATABASE_EXACT_HASH_DUPLICATE_ROWS':er,
 'DATABASE_NORMALIZED_HASH_DUPLICATE_GROUPS':ng,'DATABASE_NORMALIZED_HASH_DUPLICATE_ROWS':nr,
 'SITEMAP_URL_ROWS':len(urls),'SITEMAP_UNIQUE_URLS':len(url_set),'SITEMAP_DUPLICATE_ROWS':sum(n for n in url_counts.values() if n>1),
 'SITEMAP_MISSING_SOURCE_URLS':len(expected_urls-url_set),'SITEMAP_EXTRA_URLS':len(url_set-expected_urls),
 'DATABASE_DISCOVERED_COUNT':life.get('DISCOVERED',0),'DATABASE_WRITING_COUNT':life.get('WRITING',0),
 'DATABASE_INDEX_BLOCKED_COUNT':index.get('BLOCKED',0),'DATABASE_INDEX_ELIGIBLE_COUNT':index.get('ELIGIBLE',0),'DATABASE_INDEX_INDEXED_COUNT':index.get('INDEXED',0),
}
(out/'crosscheck-metrics.env').write_text('\n'.join(f'{k}={v}' for k,v in metrics.items())+'\n',encoding='utf-8')
(out/'sitemap-missing-source-urls.txt').write_text('\n'.join(sorted(expected_urls-url_set))+'\n',encoding='utf-8')
(out/'sitemap-extra-urls.txt').write_text('\n'.join(sorted(url_set-expected_urls))+'\n',encoding='utf-8')
(out/'source-database-missing-slugs.txt').write_text('\n'.join(sorted(source_slugs-db_set))+'\n',encoding='utf-8')
(out/'database-source-extra-slugs.txt').write_text('\n'.join(sorted(db_set-source_slugs))+'\n',encoding='utf-8')
# Deterministic evenly spaced live sample.
ordered=sorted(source_slugs); n=min(120,len(ordered)); picks=[]
if n:
    for i in range(n): picks.append(ordered[(i*len(ordered))//n])
(out/'http-sample-paths.txt').write_text('\n'.join('/blog/'+s for s in picks)+'\n',encoding='utf-8')
PY

# shellcheck disable=SC1090
. "$OUT/crosscheck-metrics.env"
# shellcheck disable=SC1090
. "$OUT/robots-metrics.env"

: > "$OUT/http-sample.tsv"
while IFS= read -r path; do
  test -n "$path" || continue
  result="$(curl -sS -L -o /dev/null --max-time 30 -w '%{http_code}\t%{num_redirects}\t%{time_total}\t%{url_effective}' "https://sikhadenge.in$path" || printf '000\t0\t30\thttps://sikhadenge.in%s' "$path")"
  printf '%s\t%s\n' "$result" "$path" >> "$OUT/http-sample.tsv"
done < "$OUT/http-sample-paths.txt"

HTTP_SAMPLE_TOTAL="$(wc -l < "$OUT/http-sample.tsv" | tr -d ' ')"
HTTP_SAMPLE_200="$(awk -F'\t' '$1==200{n++} END{print n+0}' "$OUT/http-sample.tsv")"
HTTP_SAMPLE_NON_200="$((HTTP_SAMPLE_TOTAL-HTTP_SAMPLE_200))"
HTTP_SAMPLE_REDIRECTED="$(awk -F'\t' '$2>0{n++} END{print n+0}' "$OUT/http-sample.tsv")"

DB_SIGNATURE_AFTER="$(psql "$DATABASE_URL" -X -At -F'|' -v ON_ERROR_STOP=1 -c "SELECT (SELECT count(*) FROM blog_content.pages),(SELECT count(*) FROM blog_content.page_versions),(SELECT count(*) FROM blog_content.content_fingerprints),(SELECT count(*) FROM blog_content.publications),(SELECT count(*) FROM blog_content.quality_runs),(SELECT count(*) FROM blog_content.editorial_reviews);")" || fail "database_signature_after_failed"
echo "$DB_SIGNATURE_AFTER" > "$OUT/database-signature-after.txt"
test "$DB_SIGNATURE_AFTER" = "$DB_SIGNATURE_BEFORE" || fail "database_signature_changed"

LIVE_HEAD_AFTER="$(git -C "$ROOT" rev-parse HEAD)"
LIVE_BRANCH_AFTER="$(git -C "$ROOT" branch --show-current)"
LIVE_STATUS_AFTER="$(git -C "$ROOT" status --porcelain)"
LIVE_BUILD_ID_AFTER="$(cat "$ROOT/.next/BUILD_ID")"
REMOTE_HEAD_AFTER="$(git -C "$ROOT" ls-remote origin "refs/heads/$PRODUCTION_BRANCH" | awk '{print $1}')"
ENV_SHA_AFTER="$(sha256sum "$ROOT/.env.local" | awk '{print $1}')"
PM2_AFTER="$(pm2 jlist | jq -c --arg name "$PM2_NAME" '.[] | select(.name==$name) | {pid,status:.pm2_env.status,restarts:.pm2_env.restart_time,cwd:.pm2_env.pm_cwd}')"

test "$LIVE_HEAD_AFTER" = "$LIVE_HEAD_BEFORE" || fail "production_head_changed"
test "$LIVE_BRANCH_AFTER" = "$LIVE_BRANCH_BEFORE" || fail "production_branch_changed"
test -z "$LIVE_STATUS_AFTER" || fail "production_worktree_changed"
test "$LIVE_BUILD_ID_AFTER" = "$LIVE_BUILD_ID_BEFORE" || fail "production_build_changed"
test "$REMOTE_HEAD_AFTER" = "$REMOTE_HEAD_BEFORE" || fail "remote_branch_changed"
test "$ENV_SHA_AFTER" = "$ENV_SHA_BEFORE" || fail "production_env_changed"
test "$PM2_AFTER" = "$PM2_BEFORE" || fail "production_pm2_state_changed"

SOURCE_SLUG_UNIQUENESS="$(test "$UNIQUE_SLUG_COUNT" = "$EXPECTED_TOTAL" && test "$RAW_DUPLICATE_SLUG_ROWS" = 0 && echo PASS || echo FINDINGS)"
SOURCE_EXACT_BODY_UNIQUENESS="$(test "$DUPLICATE_EXACT_BODY_ROWS" = 0 && echo PASS || echo FINDINGS)"
SOURCE_NORMALIZED_BODY_UNIQUENESS="$(test "$DUPLICATE_NORMALIZED_BODY_ROWS" = 0 && echo PASS || echo FINDINGS)"
SITEMAP_COVERAGE="$(test "$SITEMAP_MISSING_SOURCE_URLS" = 0 && test "$SITEMAP_EXTRA_URLS" = 0 && test "$SITEMAP_DUPLICATE_ROWS" = 0 && echo PASS || echo FINDINGS)"
HTTP_SAMPLE_RESULT="$(test "$HTTP_SAMPLE_NON_200" = 0 && echo PASS || echo FINDINGS)"

{
  echo "BLOG_D1A_INVENTORY_CRAWL_READINESS_STATUS=PASS"
  echo "PRODUCTION_COMMIT=$TARGET_COMMIT"
  echo "PRODUCTION_BUILD_ID=$LIVE_BUILD_ID_AFTER"
  echo "SOURCE_MANIFEST_TOTAL=$MANIFEST_DECLARED_TOTAL"
  echo "SOURCE_RAW_ITEM_COUNT=$RAW_ITEM_COUNT"
  echo "SOURCE_RUNTIME_SANITIZED_COUNT=$RUNTIME_SANITIZED_COUNT"
  echo "SOURCE_UNIQUE_SLUG_COUNT=$UNIQUE_SLUG_COUNT"
  echo "SOURCE_DUPLICATE_SLUG_ROWS=$RAW_DUPLICATE_SLUG_ROWS"
  echo "SOURCE_INVALID_SLUG_COUNT=$INVALID_SLUG_COUNT"
  echo "SOURCE_SLUG_UNIQUENESS=$SOURCE_SLUG_UNIQUENESS"
  echo "SOURCE_DUPLICATE_TITLE_GROUPS=$DUPLICATE_TITLE_GROUPS"
  echo "SOURCE_DUPLICATE_TITLE_ROWS=$DUPLICATE_TITLE_ROWS"
  echo "SOURCE_DUPLICATE_EXACT_BODY_GROUPS=$DUPLICATE_EXACT_BODY_GROUPS"
  echo "SOURCE_DUPLICATE_EXACT_BODY_ROWS=$DUPLICATE_EXACT_BODY_ROWS"
  echo "SOURCE_EXACT_BODY_UNIQUENESS=$SOURCE_EXACT_BODY_UNIQUENESS"
  echo "SOURCE_DUPLICATE_NORMALIZED_BODY_GROUPS=$DUPLICATE_NORMALIZED_BODY_GROUPS"
  echo "SOURCE_DUPLICATE_NORMALIZED_BODY_ROWS=$DUPLICATE_NORMALIZED_BODY_ROWS"
  echo "SOURCE_NORMALIZED_BODY_UNIQUENESS=$SOURCE_NORMALIZED_BODY_UNIQUENESS"
  echo "FALLBACK_INTRO_COUNT=$MISSING_INTRO_COUNT"
  echo "FALLBACK_SUMMARY_COUNT=$FALLBACK_SUMMARY_COUNT"
  echo "FALLBACK_STEPS_COUNT=$FALLBACK_STEPS_COUNT"
  echo "FALLBACK_MISTAKES_COUNT=$FALLBACK_MISTAKES_COUNT"
  echo "FALLBACK_FAQ_COUNT=$FALLBACK_FAQ_COUNT"
  echo "DATABASE_PAGE_COUNT=$DATABASE_PAGE_ROWS"
  echo "DATABASE_SOURCE_MISSING_SLUGS=$SOURCE_DATABASE_MISSING_SLUGS"
  echo "DATABASE_SOURCE_EXTRA_SLUGS=$DATABASE_SOURCE_EXTRA_SLUGS"
  echo "DATABASE_NORMALIZED_HASH_DUPLICATE_ROWS=$DATABASE_NORMALIZED_HASH_DUPLICATE_ROWS"
  echo "DATABASE_INDEX_BLOCKED_COUNT=$DATABASE_INDEX_BLOCKED_COUNT"
  echo "DATABASE_INDEX_ELIGIBLE_COUNT=$DATABASE_INDEX_ELIGIBLE_COUNT"
  echo "DATABASE_INDEX_INDEXED_COUNT=$DATABASE_INDEX_INDEXED_COUNT"
  echo "BLOG_SITEMAP_SHARD_COUNT=$BLOG_SITEMAP_SHARD_COUNT"
  echo "SITEMAP_URL_ROWS=$SITEMAP_URL_ROWS"
  echo "SITEMAP_UNIQUE_URLS=$SITEMAP_UNIQUE_URLS"
  echo "SITEMAP_DUPLICATE_ROWS=$SITEMAP_DUPLICATE_ROWS"
  echo "SITEMAP_MISSING_SOURCE_URLS=$SITEMAP_MISSING_SOURCE_URLS"
  echo "SITEMAP_EXTRA_URLS=$SITEMAP_EXTRA_URLS"
  echo "SITEMAP_COVERAGE=$SITEMAP_COVERAGE"
  echo "ROBOTS_GOOGLEBOT_BLOG_ALLOWED=$ROBOTS_GOOGLEBOT_BLOG_ALLOWED"
  echo "HTTP_SAMPLE_TOTAL=$HTTP_SAMPLE_TOTAL"
  echo "HTTP_SAMPLE_200=$HTTP_SAMPLE_200"
  echo "HTTP_SAMPLE_NON_200=$HTTP_SAMPLE_NON_200"
  echo "HTTP_SAMPLE_REDIRECTED=$HTTP_SAMPLE_REDIRECTED"
  echo "HTTP_SAMPLE_RESULT=$HTTP_SAMPLE_RESULT"
  echo "FULL_HTTP_CRAWL_PERFORMED=NO"
  echo "ALL_PAGES_LIVE_CERTIFIED=NO"
  echo "ALL_PAGES_INDEXED_CERTIFIED=NO"
  echo "DATABASE_SIGNATURE_UNCHANGED=YES"
  echo "DATABASE_WRITE_PERFORMED=NO"
  echo "PM2_RESTART_PERFORMED=NO"
  echo "PRODUCTION_MUTATION_PERFORMED=NO"
  echo "REMOTE_BRANCH_CHANGED=NO"
  echo "NEXT_PHASE=D1B_FULL_THROTTLED_HTTP_CRAWL_AND_RENDERED_DUPLICATE_AUDIT"
  echo "REPORT=$OUT"
} | tee "$STATUS"

cleanup
trap - EXIT
