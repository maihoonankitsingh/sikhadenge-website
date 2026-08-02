#!/usr/bin/env python3
"""Inspect the available source-text evidence for D1D representative samples.

This is a deterministic, read-only diagnostic. It joins representative sample
rows to corrected D1C2 fingerprint/page-metric evidence, inventories available
fields, and emits bounded excerpts only when raw article text is already present
in the audit artifacts. It never edits content, URLs, the database, sitemap,
runtime, or Git state.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from collections import Counter
from pathlib import Path
from typing import Any

EXPECTED_SAMPLE_COUNT = 96
SLUG_KEYS = ("slug", "sourceSlug", "pageSlug")
TITLE_KEYS = ("title", "sourceTitle", "pageTitle", "headline")
TEXT_KEYS = (
    "sourceText",
    "sourceBody",
    "content",
    "body",
    "article",
    "markdown",
    "text",
    "renderedText",
    "description",
    "excerpt",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def clean(value: Any, limit: int) -> str:
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        value = json.dumps(value, ensure_ascii=False, sort_keys=True)
    text = re.sub(r"\s+", " ", str(value)).strip()
    return text[:limit]


def first_value(record: dict[str, Any], keys: tuple[str, ...]) -> tuple[str, str]:
    for key in keys:
        value = record.get(key)
        if value is not None and str(value).strip():
            return key, str(value)
    return "", ""


def read_tsv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def read_metrics(path: Path) -> dict[str, dict[str, str]]:
    rows = read_tsv(path)
    if not rows or "slug" not in rows[0]:
        raise SystemExit("page metrics missing slug column")
    return {row["slug"]: row for row in rows}


def find_slug(record: dict[str, Any]) -> str:
    _, value = first_value(record, SLUG_KEYS)
    return value


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--samples-report", required=True, type=Path)
    parser.add_argument("--d1c2-report", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--excerpt-chars", type=int, default=700)
    args = parser.parse_args()

    samples_path = args.samples_report.resolve() / "representative-samples.tsv"
    fingerprints_path = args.d1c2_report.resolve() / "fingerprints.jsonl"
    metrics_path = args.d1c2_report.resolve() / "page-metrics.tsv"
    output = args.output.resolve()

    for path in (samples_path, fingerprints_path, metrics_path):
        if not path.is_file() or path.stat().st_size == 0:
            raise SystemExit(f"missing input: {path}")
    if args.excerpt_chars < 100 or args.excerpt_chars > 5000:
        raise SystemExit("excerpt chars must be between 100 and 5000")

    samples = read_tsv(samples_path)
    if len(samples) != EXPECTED_SAMPLE_COUNT:
        raise SystemExit(f"unexpected sample count: {len(samples)}")

    selected: set[str] = set()
    for row in samples:
        selected.add(row["slug"])
        counterpart = row.get("counterpartSlug", "").strip()
        if counterpart:
            selected.add(counterpart)

    metrics = read_metrics(metrics_path)
    key_counts: Counter[str] = Counter()
    fingerprint_by_slug: dict[str, dict[str, Any]] = {}
    malformed_rows = 0
    duplicate_selected_slugs: list[str] = []

    with fingerprints_path.open(encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, start=1):
            if not line.strip():
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError:
                malformed_rows += 1
                continue
            if not isinstance(record, dict):
                malformed_rows += 1
                continue
            key_counts.update(record.keys())
            slug = find_slug(record)
            if slug in selected:
                if slug in fingerprint_by_slug:
                    duplicate_selected_slugs.append(slug)
                else:
                    fingerprint_by_slug[slug] = record

    output.mkdir(parents=True, exist_ok=False)

    inventory_path = output / "fingerprint-field-inventory.tsv"
    with inventory_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow(["field", "recordsContainingField"])
        for key, count in sorted(key_counts.items(), key=lambda item: (-item[1], item[0])):
            writer.writerow([key, count])

    comparison_path = output / "representative-content-source-inspection.tsv"
    raw_text_sample_count = 0
    matched_sample_count = 0
    matched_counterpart_count = 0
    missing_sample_slugs: list[str] = []
    missing_counterpart_slugs: list[str] = []

    columns = [
        "bucket", "priority", "slug", "counterpartSlug", "fingerprintMatched",
        "counterpartFingerprintMatched", "titleField", "titleExcerpt",
        "primaryTextField", "primaryTextChars", "primaryTextExcerpt",
        "counterpartTitleField", "counterpartTitleExcerpt",
        "counterpartTextField", "counterpartTextChars", "counterpartTextExcerpt",
        "sourceWords", "sourceContribution", "lexicalDiversity",
        "availableFingerprintFields", "automaticMutationApproved",
    ]

    with comparison_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns, delimiter="\t", lineterminator="\n")
        writer.writeheader()

        for sample in samples:
            slug = sample["slug"]
            counterpart_slug = sample.get("counterpartSlug", "").strip()
            record = fingerprint_by_slug.get(slug, {})
            counterpart = fingerprint_by_slug.get(counterpart_slug, {}) if counterpart_slug else {}

            if record:
                matched_sample_count += 1
            else:
                missing_sample_slugs.append(slug)
            if counterpart_slug:
                if counterpart:
                    matched_counterpart_count += 1
                else:
                    missing_counterpart_slugs.append(counterpart_slug)

            title_field, title = first_value(record, TITLE_KEYS)
            text_field, text = first_value(record, TEXT_KEYS)
            counterpart_title_field, counterpart_title = first_value(counterpart, TITLE_KEYS)
            counterpart_text_field, counterpart_text = first_value(counterpart, TEXT_KEYS)

            if text_field:
                raw_text_sample_count += 1

            metric = metrics.get(slug, {})
            writer.writerow({
                "bucket": sample["bucket"],
                "priority": sample["priority"],
                "slug": slug,
                "counterpartSlug": counterpart_slug,
                "fingerprintMatched": "YES" if record else "NO",
                "counterpartFingerprintMatched": "YES" if counterpart else "NO",
                "titleField": title_field,
                "titleExcerpt": clean(title, args.excerpt_chars),
                "primaryTextField": text_field,
                "primaryTextChars": len(text),
                "primaryTextExcerpt": clean(text, args.excerpt_chars),
                "counterpartTitleField": counterpart_title_field,
                "counterpartTitleExcerpt": clean(counterpart_title, args.excerpt_chars),
                "counterpartTextField": counterpart_text_field,
                "counterpartTextChars": len(counterpart_text),
                "counterpartTextExcerpt": clean(counterpart_text, args.excerpt_chars),
                "sourceWords": metric.get("sourceWords", ""),
                "sourceContribution": metric.get("sourceContribution", ""),
                "lexicalDiversity": metric.get("lexicalDiversity", ""),
                "availableFingerprintFields": ",".join(sorted(record.keys())),
                "automaticMutationApproved": "NO",
            })

    missing_path = output / "missing-selected-slugs.json"
    missing_path.write_text(
        json.dumps(
            {
                "missingSampleSlugs": sorted(set(missing_sample_slugs)),
                "missingCounterpartSlugs": sorted(set(missing_counterpart_slugs)),
                "duplicateSelectedFingerprintSlugs": sorted(set(duplicate_selected_slugs)),
            },
            indent=2,
            sort_keys=True,
        ) + "\n",
        encoding="utf-8",
    )

    raw_text_available = raw_text_sample_count > 0
    next_phase = (
        "D1D_REPRESENTATIVE_CONTENT_COMPARISON"
        if raw_text_available
        else "D1D_READ_ONLY_BLOG_SOURCE_LOCATOR"
    )

    manifest = {
        "status": "PASS",
        "method": "read-only representative fingerprint and content-field inspection",
        "selectedSampleCount": len(samples),
        "selectedSlugCountIncludingCounterparts": len(selected),
        "matchedSampleFingerprints": matched_sample_count,
        "matchedCounterpartFingerprints": matched_counterpart_count,
        "rawTextAvailableInAuditArtifacts": raw_text_available,
        "samplesWithRawText": raw_text_sample_count,
        "malformedFingerprintRows": malformed_rows,
        "duplicateSelectedFingerprintSlugs": len(set(duplicate_selected_slugs)),
        "automaticContentMutationApproved": False,
        "publicationOrIndexingApproved": False,
        "inputs": {
            str(samples_path): sha256(samples_path),
            str(fingerprints_path): sha256(fingerprints_path),
            str(metrics_path): sha256(metrics_path),
        },
        "outputs": {},
        "nextPhase": next_phase,
    }
    manifest_path = output / "manifest.json"
    manifest["outputs"] = {
        inventory_path.name: sha256(inventory_path),
        comparison_path.name: sha256(comparison_path),
        missing_path.name: sha256(missing_path),
    }
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("BLOG_D1D_REPRESENTATIVE_CONTENT_SOURCE_INSPECTION_STATUS=PASS")
    print(f"SELECTED_SAMPLE_COUNT={len(samples)}")
    print(f"SELECTED_SLUGS_WITH_COUNTERPARTS={len(selected)}")
    print(f"MATCHED_SAMPLE_FINGERPRINTS={matched_sample_count}")
    print(f"MATCHED_COUNTERPART_FINGERPRINTS={matched_counterpart_count}")
    print(f"RAW_TEXT_AVAILABLE_IN_AUDIT_ARTIFACTS={'YES' if raw_text_available else 'NO'}")
    print(f"SAMPLES_WITH_RAW_TEXT={raw_text_sample_count}")
    print(f"MALFORMED_FINGERPRINT_ROWS={malformed_rows}")
    print("AUTOMATIC_CONTENT_MUTATION_APPROVED=NO")
    print("PUBLICATION_OR_INDEXING_APPROVED=NO")
    print(f"NEXT_PHASE={next_phase}")
    print(f"OUTPUT={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
