#!/usr/bin/env python3
"""Build deterministic representative samples for D1D remediation validation.

This is a read-only planning tool. It consumes the D1D decision matrix and
corrected D1C2 evidence, then selects representative pages from every decision
bucket. It never edits content, URLs, the database, sitemap, runtime, or Git.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path
from typing import Any, Iterable

EXPECTED_TOTAL = 120097
EXPECTED_BUCKETS = {
    "SYSTEMIC_CLUSTER_REDESIGN",
    "LARGE_CLUSTER_REMEDIATION",
    "CLUSTER_DIFFERENTIATION",
    "SMALL_CLUSTER_REVIEW",
    "PAIR_REVIEW",
    "MEDIUM_SIMILARITY_REVIEW",
    "THIN_TEMPLATE_REWRITE",
    "TEMPLATE_DIFFERENTIATION",
}

VALIDATION_REQUIREMENTS = {
    "SYSTEMIC_CLUSTER_REDESIGN": "Map distinct search intents, identify hub candidates, and verify that any merge or redirect preserves unique user value.",
    "LARGE_CLUSTER_REMEDIATION": "Compare intent, evidence, audience, and freshness before selecting canonical survivors.",
    "CLUSTER_DIFFERENTIATION": "Confirm each retained page has a materially distinct purpose, evidence set, and answer structure.",
    "SMALL_CLUSTER_REVIEW": "Review every member together and choose retain, rewrite, merge, or redirect only after intent comparison.",
    "PAIR_REVIEW": "Compare the pair side by side; retain both only when intent and substantive evidence differ.",
    "MEDIUM_SIMILARITY_REVIEW": "Manually confirm whether similarity is genuine or caused by shared template language.",
    "THIN_TEMPLATE_REWRITE": "Validate a rewrite pattern that adds topic-specific evidence, examples, steps, limitations, and differentiated intent.",
    "TEMPLATE_DIFFERENTIATION": "Validate boilerplate reduction and increased page-specific contribution without changing valid search intent.",
}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def stable_rank(bucket: str, slug: str) -> str:
    return hashlib.sha256(f"{bucket}\0{slug}".encode("utf-8")).hexdigest()


def require_file(path: Path) -> None:
    if not path.is_file() or path.stat().st_size == 0:
        raise SystemExit(f"missing required evidence: {path}")


def read_matrix(path: Path) -> tuple[dict[str, dict[str, str]], dict[str, list[dict[str, str]]]]:
    rows: dict[str, dict[str, str]] = {}
    by_bucket: dict[str, list[dict[str, str]]] = defaultdict(list)
    expected = [
        "slug",
        "priority",
        "bucket",
        "recommendedAction",
        "highSimilarity",
        "mediumSimilarity",
        "highClusterSize",
        "findingCodes",
        "automaticMutationApproved",
    ]
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if reader.fieldnames != expected:
            raise SystemExit(f"unexpected matrix schema: {reader.fieldnames}")
        for row in reader:
            slug = row["slug"]
            if slug in rows:
                raise SystemExit(f"duplicate matrix slug: {slug}")
            if row["automaticMutationApproved"] != "NO":
                raise SystemExit(f"automatic mutation safety flag changed: {slug}")
            if row["bucket"] not in EXPECTED_BUCKETS:
                raise SystemExit(f"unexpected decision bucket: {row['bucket']}")
            rows[slug] = row
            by_bucket[row["bucket"]].append(row)
    if len(rows) != EXPECTED_TOTAL:
        raise SystemExit(f"unexpected matrix row count: {len(rows)}")
    missing = EXPECTED_BUCKETS.difference(by_bucket)
    if missing:
        raise SystemExit(f"missing decision buckets: {sorted(missing)}")
    return rows, by_bucket


def read_clusters(path: Path) -> tuple[dict[str, int], dict[str, int]]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        raise SystemExit("cluster evidence must be a JSON array")
    cluster_id: dict[str, int] = {}
    cluster_size: dict[str, int] = {}
    for index, cluster in enumerate(raw, start=1):
        size = int(cluster["size"])
        slugs = list(cluster["slugs"])
        if size != len(slugs):
            raise SystemExit(f"cluster {index} size mismatch")
        for slug in slugs:
            if slug in cluster_id:
                raise SystemExit(f"slug appears in multiple high clusters: {slug}")
            cluster_id[slug] = index
            cluster_size[slug] = size
    return cluster_id, cluster_size


def edge_score(row: dict[str, str]) -> tuple[int, int, float, float, str]:
    severity = 2 if row["severity"] == "HIGH" else 1
    return (
        severity,
        int(row["sharedSketchHashes"]),
        float(row["sketchResemblance"]),
        float(row["titleJaccard"]),
        row["rightSlug"],
    )


def read_best_edges(path: Path) -> dict[str, dict[str, str]]:
    best: dict[str, dict[str, str]] = {}
    required = {
        "severity",
        "sharedSketchHashes",
        "sketchResemblance",
        "lengthRatio",
        "titleJaccard",
        "leftSlug",
        "rightSlug",
        "leftWords",
        "rightWords",
        "discoverySharedHashes",
    }
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        if set(reader.fieldnames or []) != required:
            raise SystemExit(f"unexpected pair schema: {reader.fieldnames}")
        for row in reader:
            for slug, counterpart in (
                (row["leftSlug"], row["rightSlug"]),
                (row["rightSlug"], row["leftSlug"]),
            ):
                candidate = dict(row)
                candidate["counterpartSlug"] = counterpart
                current = best.get(slug)
                if current is None or edge_score(candidate) > edge_score(current):
                    best[slug] = candidate
    return best


def select_rows(
    bucket: str,
    rows: Iterable[dict[str, str]],
    count: int,
    cluster_ids: dict[str, int],
) -> list[dict[str, str]]:
    ordered = sorted(rows, key=lambda row: (stable_rank(bucket, row["slug"]), row["slug"]))
    clustered: dict[int, list[dict[str, str]]] = defaultdict(list)
    unclustered: list[dict[str, str]] = []
    for row in ordered:
        identifier = cluster_ids.get(row["slug"], 0)
        if identifier:
            clustered[identifier].append(row)
        else:
            unclustered.append(row)

    selected: list[dict[str, str]] = []
    if clustered:
        cluster_order = sorted(
            clustered,
            key=lambda identifier: stable_rank(bucket, f"cluster-{identifier}"),
        )
        for identifier in cluster_order:
            selected.append(clustered[identifier][0])
            if len(selected) >= count:
                return selected

    already = {row["slug"] for row in selected}
    for row in ordered:
        if row["slug"] in already:
            continue
        selected.append(row)
        if len(selected) >= count:
            break
    return selected


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--matrix-report", required=True, type=Path)
    parser.add_argument("--d1c2-report", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--samples-per-bucket", type=int, default=12)
    args = parser.parse_args()

    if args.samples_per_bucket < 1 or args.samples_per_bucket > 100:
        raise SystemExit("samples-per-bucket must be between 1 and 100")

    matrix_report = args.matrix_report.resolve()
    d1c2_report = args.d1c2_report.resolve()
    output = args.output.resolve()

    matrix = matrix_report / "remediation-decision-matrix.tsv"
    matrix_manifest = matrix_report / "manifest.json"
    pairs = d1c2_report / "near-duplicate-pairs.tsv"
    clusters = d1c2_report / "near-duplicate-clusters.json"
    summary = d1c2_report / "summary.json"

    for path in (matrix, matrix_manifest, pairs, clusters, summary):
        require_file(path)

    matrix_manifest_data = json.loads(matrix_manifest.read_text(encoding="utf-8"))
    summary_data = json.loads(summary.read_text(encoding="utf-8"))
    if matrix_manifest_data.get("status") != "PASS":
        raise SystemExit("decision matrix is not PASS")
    if matrix_manifest_data.get("automaticContentMutationApproved") is not False:
        raise SystemExit("matrix automatic mutation safety flag changed")
    if matrix_manifest_data.get("publicationOrIndexingApproved") is not False:
        raise SystemExit("matrix publication safety flag changed")
    if summary_data.get("exhaustiveSemanticDuplicateCertification") is not False:
        raise SystemExit("semantic certification safety flag changed")

    rows_by_slug, by_bucket = read_matrix(matrix)
    cluster_ids, cluster_sizes = read_clusters(clusters)
    best_edges = read_best_edges(pairs)

    output.mkdir(parents=True, exist_ok=False)
    samples_path = output / "representative-samples.tsv"
    summary_path = output / "bucket-sample-summary.tsv"
    selected_counts: dict[str, int] = {}

    sample_fields = [
        "bucket",
        "priority",
        "slug",
        "highSimilarity",
        "mediumSimilarity",
        "highClusterId",
        "highClusterSize",
        "counterpartSlug",
        "counterpartSeverity",
        "sharedSketchHashes",
        "sketchResemblance",
        "lengthRatio",
        "titleJaccard",
        "findingCodes",
        "validationRequirement",
        "automaticMutationApproved",
    ]

    with samples_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=sample_fields, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        for bucket in sorted(EXPECTED_BUCKETS):
            selected = select_rows(bucket, by_bucket[bucket], args.samples_per_bucket, cluster_ids)
            selected_counts[bucket] = len(selected)
            for row in selected:
                slug = row["slug"]
                edge = best_edges.get(slug, {})
                writer.writerow(
                    {
                        "bucket": bucket,
                        "priority": row["priority"],
                        "slug": slug,
                        "highSimilarity": row["highSimilarity"],
                        "mediumSimilarity": row["mediumSimilarity"],
                        "highClusterId": cluster_ids.get(slug, 0),
                        "highClusterSize": cluster_sizes.get(slug, 0),
                        "counterpartSlug": edge.get("counterpartSlug", ""),
                        "counterpartSeverity": edge.get("severity", ""),
                        "sharedSketchHashes": edge.get("sharedSketchHashes", ""),
                        "sketchResemblance": edge.get("sketchResemblance", ""),
                        "lengthRatio": edge.get("lengthRatio", ""),
                        "titleJaccard": edge.get("titleJaccard", ""),
                        "findingCodes": row["findingCodes"],
                        "validationRequirement": VALIDATION_REQUIREMENTS[bucket],
                        "automaticMutationApproved": "NO",
                    }
                )

    with summary_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow(["bucket", "totalPages", "selectedSamples"])
        for bucket in sorted(EXPECTED_BUCKETS):
            writer.writerow([bucket, len(by_bucket[bucket]), selected_counts[bucket]])

    sample_total = sum(selected_counts.values())
    manifest: dict[str, Any] = {
        "status": "PASS",
        "method": "deterministic bucket-balanced representative sampling",
        "sourcePageCount": len(rows_by_slug),
        "samplesPerBucketRequested": args.samples_per_bucket,
        "selectedSampleCount": sample_total,
        "selectedSamplesByBucket": dict(sorted(selected_counts.items())),
        "bucketPageCounts": {bucket: len(by_bucket[bucket]) for bucket in sorted(EXPECTED_BUCKETS)},
        "automaticContentMutationApproved": False,
        "publicationOrIndexingApproved": False,
        "exhaustiveSemanticDuplicateCertification": False,
        "representativeSamplingIsSemanticValidation": False,
        "inputs": {
            str(matrix): sha256_file(matrix),
            str(matrix_manifest): sha256_file(matrix_manifest),
            str(pairs): sha256_file(pairs),
            str(clusters): sha256_file(clusters),
            str(summary): sha256_file(summary),
        },
        "outputs": {
            samples_path.name: sha256_file(samples_path),
            summary_path.name: sha256_file(summary_path),
        },
        "nextPhase": "D1D_REPRESENTATIVE_CONTENT_AND_INTENT_REVIEW",
    }
    manifest_path = output / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("BLOG_D1D_REPRESENTATIVE_SAMPLE_VALIDATION_STATUS=PASS")
    print(f"SOURCE_PAGE_COUNT={manifest['sourcePageCount']}")
    print(f"SELECTED_SAMPLE_COUNT={sample_total}")
    for bucket, count in manifest["selectedSamplesByBucket"].items():
        print(f"SAMPLES_{bucket}={count}")
    print("REPRESENTATIVE_SAMPLING_IS_SEMANTIC_VALIDATION=NO")
    print("AUTOMATIC_CONTENT_MUTATION_APPROVED=NO")
    print("PUBLICATION_OR_INDEXING_APPROVED=NO")
    print("NEXT_PHASE=D1D_REPRESENTATIVE_CONTENT_AND_INTENT_REVIEW")
    print(f"OUTPUT={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
