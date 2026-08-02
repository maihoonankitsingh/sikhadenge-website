#!/usr/bin/env python3
"""Extract exact source records for D1D representative Blog samples.

This deterministic diagnostic reads only the existing Blog shard source files
referenced by data/blogs/slug-index.json. It joins those records to the D1D
representative sample plan and writes review artifacts. It never edits Blog
content, URLs, the database, sitemap, runtime state, or Git state.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path
from typing import Any

EXPECTED_SAMPLE_ROWS = 96
EXPECTED_SELECTED_SLUGS = 168
SOURCE_FIELDS = (
    "slug",
    "title",
    "excerpt",
    "category",
    "readTime",
    "intro",
    "summaryPoints",
    "practicalSteps",
    "mistakes",
    "faqs",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clean_text(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    return " ".join(value.split())


def list_count(value: Any) -> int:
    return len(value) if isinstance(value, list) else 0


def nonempty(value: Any) -> bool:
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, list):
        return len(value) > 0
    return value is not None


def normalize_title(value: Any) -> str:
    return " ".join(clean_text(value).lower().split())


def load_samples(path: Path) -> tuple[list[dict[str, str]], dict[str, list[dict[str, str]]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        rows = list(csv.DictReader(handle, delimiter="\t"))

    if len(rows) != EXPECTED_SAMPLE_ROWS:
        raise SystemExit(f"unexpected representative sample row count: {len(rows)}")

    roles: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        slug = (row.get("slug") or "").strip()
        counterpart = (row.get("counterpartSlug") or "").strip()
        if not slug:
            raise SystemExit("representative sample row missing slug")
        roles[slug].append({"role": "SAMPLE", **row})
        if counterpart:
            roles[counterpart].append({"role": "COUNTERPART", **row})

    if len(roles) != EXPECTED_SELECTED_SLUGS:
        raise SystemExit(f"unexpected selected slug count: {len(roles)}")

    return rows, roles


def load_slug_index(path: Path) -> dict[str, str]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    slugs = payload.get("slugs") if isinstance(payload, dict) else None
    if not isinstance(slugs, dict):
        raise SystemExit("invalid Blog slug-index schema")
    cleaned = {
        str(slug): str(file_name)
        for slug, file_name in slugs.items()
        if isinstance(slug, str) and isinstance(file_name, str) and slug and file_name
    }
    return cleaned


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument("--samples-report", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--excerpt-chars", type=int, default=500)
    args = parser.parse_args()

    root = args.root.resolve()
    samples_report = args.samples_report.resolve()
    output = args.output.resolve()
    samples_path = samples_report / "representative-samples.tsv"
    slug_index_path = root / "data" / "blogs" / "slug-index.json"
    shard_root = root / "data" / "blogs"
    renderer_path = root / "app" / "blog" / "[slug]" / "page.tsx"
    loader_path = root / "lib" / "blogs.ts"

    for path in (samples_path, slug_index_path, renderer_path, loader_path):
        if not path.is_file() or path.stat().st_size == 0:
            raise SystemExit(f"missing required input: {path}")

    if not 100 <= args.excerpt_chars <= 2000:
        raise SystemExit("excerpt-chars must be between 100 and 2000")

    sample_rows, roles = load_samples(samples_path)
    slug_index = load_slug_index(slug_index_path)

    missing_index = sorted(slug for slug in roles if slug not in slug_index)
    if missing_index:
        raise SystemExit(f"selected slugs missing from slug-index: {len(missing_index)}")

    by_shard: dict[str, set[str]] = defaultdict(set)
    for slug in roles:
        by_shard[slug_index[slug]].add(slug)

    records: dict[str, dict[str, Any]] = {}
    shard_hashes: dict[str, str] = {}
    duplicate_records: list[str] = []

    for shard_name in sorted(by_shard):
        shard_path = (shard_root / shard_name).resolve()
        try:
            shard_path.relative_to(shard_root.resolve())
        except ValueError as exc:
            raise SystemExit(f"unsafe shard path: {shard_name}") from exc
        if not shard_path.is_file() or shard_path.stat().st_size == 0:
            raise SystemExit(f"missing Blog shard: {shard_path}")

        payload = json.loads(shard_path.read_text(encoding="utf-8"))
        if not isinstance(payload, list):
            raise SystemExit(f"Blog shard is not an array: {shard_path}")
        shard_hashes[shard_name] = sha256(shard_path)

        wanted = by_shard[shard_name]
        for item in payload:
            if not isinstance(item, dict):
                continue
            slug = item.get("slug")
            if slug not in wanted:
                continue
            if slug in records:
                duplicate_records.append(str(slug))
                continue
            records[str(slug)] = item

    missing_records = sorted(set(roles) - set(records))
    if missing_records or duplicate_records:
        raise SystemExit(
            f"source record identity failure: missing={len(missing_records)} duplicate={len(duplicate_records)}"
        )

    output.mkdir(parents=True, exist_ok=False)
    source_jsonl = output / "representative-source-records.jsonl"
    inventory_tsv = output / "representative-source-field-inventory.tsv"
    pair_tsv = output / "representative-pair-source-comparison.tsv"
    shard_tsv = output / "source-shard-inventory.tsv"

    field_counts = defaultdict(int)
    field_nonempty_counts = defaultdict(int)

    with source_jsonl.open("w", encoding="utf-8") as handle:
        for slug in sorted(records):
            record = records[slug]
            for field in SOURCE_FIELDS:
                if field in record:
                    field_counts[field] += 1
                if nonempty(record.get(field)):
                    field_nonempty_counts[field] += 1
            envelope = {
                "slug": slug,
                "sourceShard": slug_index[slug],
                "sampleRoles": roles[slug],
                "sourceRecord": record,
            }
            handle.write(json.dumps(envelope, ensure_ascii=False, sort_keys=True) + "\n")

    with inventory_tsv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow(["field", "recordsContainingField", "recordsWithNonEmptyValue"])
        for field in SOURCE_FIELDS:
            writer.writerow([field, field_counts[field], field_nonempty_counts[field]])

    with pair_tsv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow([
            "bucket",
            "priority",
            "slug",
            "counterpartSlug",
            "sourceShard",
            "counterpartSourceShard",
            "title",
            "counterpartTitle",
            "normalizedTitlesEqual",
            "excerptPresent",
            "counterpartExcerptPresent",
            "introPresent",
            "counterpartIntroPresent",
            "summaryPointsCount",
            "counterpartSummaryPointsCount",
            "practicalStepsCount",
            "counterpartPracticalStepsCount",
            "mistakesCount",
            "counterpartMistakesCount",
            "faqsCount",
            "counterpartFaqsCount",
            "nonEmptySourceFields",
            "counterpartNonEmptySourceFields",
            "introExcerpt",
            "counterpartIntroExcerpt",
            "automaticMutationApproved",
        ])
        for row in sample_rows:
            slug = row["slug"].strip()
            counterpart = (row.get("counterpartSlug") or "").strip()
            left = records[slug]
            right = records[counterpart] if counterpart else {}
            left_nonempty = [field for field in SOURCE_FIELDS if nonempty(left.get(field))]
            right_nonempty = [field for field in SOURCE_FIELDS if nonempty(right.get(field))]
            writer.writerow([
                row.get("bucket", ""),
                row.get("priority", ""),
                slug,
                counterpart,
                slug_index[slug],
                slug_index.get(counterpart, ""),
                clean_text(left.get("title")),
                clean_text(right.get("title")),
                "YES" if counterpart and normalize_title(left.get("title")) == normalize_title(right.get("title")) else "NO",
                "YES" if nonempty(left.get("excerpt")) else "NO",
                "YES" if nonempty(right.get("excerpt")) else "NO",
                "YES" if nonempty(left.get("intro")) else "NO",
                "YES" if nonempty(right.get("intro")) else "NO",
                list_count(left.get("summaryPoints")),
                list_count(right.get("summaryPoints")),
                list_count(left.get("practicalSteps")),
                list_count(right.get("practicalSteps")),
                list_count(left.get("mistakes")),
                list_count(right.get("mistakes")),
                list_count(left.get("faqs")),
                list_count(right.get("faqs")),
                ",".join(left_nonempty),
                ",".join(right_nonempty),
                clean_text(left.get("intro"))[: args.excerpt_chars],
                clean_text(right.get("intro"))[: args.excerpt_chars],
                "NO",
            ])

    with shard_tsv.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow(["shard", "selectedSlugCount", "sha256"])
        for shard_name in sorted(by_shard):
            writer.writerow([shard_name, len(by_shard[shard_name]), shard_hashes[shard_name]])

    outputs = {
        source_jsonl.name: sha256(source_jsonl),
        inventory_tsv.name: sha256(inventory_tsv),
        pair_tsv.name: sha256(pair_tsv),
        shard_tsv.name: sha256(shard_tsv),
    }
    manifest = {
        "status": "PASS",
        "method": "read-only slug-index-directed representative Blog source extraction",
        "selectedSampleRows": len(sample_rows),
        "selectedSlugCountIncludingCounterparts": len(roles),
        "matchedSourceRecords": len(records),
        "sourceShardCount": len(by_shard),
        "missingSlugIndexEntries": len(missing_index),
        "missingSourceRecords": len(missing_records),
        "duplicateSourceRecords": len(duplicate_records),
        "automaticContentMutationApproved": False,
        "publicationOrIndexingApproved": False,
        "inputs": {
            str(samples_path): sha256(samples_path),
            str(slug_index_path): sha256(slug_index_path),
            str(renderer_path): sha256(renderer_path),
            str(loader_path): sha256(loader_path),
        },
        "sourceShards": shard_hashes,
        "outputs": outputs,
        "nextPhase": "D1D_REPRESENTATIVE_RAW_CONTENT_AND_INTENT_REVIEW",
    }
    manifest_path = output / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("BLOG_D1D_REPRESENTATIVE_SOURCE_RECORD_EXTRACTION_STATUS=PASS")
    print(f"SELECTED_SAMPLE_ROWS={len(sample_rows)}")
    print(f"SELECTED_SLUGS_WITH_COUNTERPARTS={len(roles)}")
    print(f"MATCHED_SOURCE_RECORDS={len(records)}")
    print(f"SOURCE_SHARD_COUNT={len(by_shard)}")
    print("AUTOMATIC_CONTENT_MUTATION_APPROVED=NO")
    print("PUBLICATION_OR_INDEXING_APPROVED=NO")
    print("NEXT_PHASE=D1D_REPRESENTATIVE_RAW_CONTENT_AND_INTENT_REVIEW")
    print(f"OUTPUT={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
