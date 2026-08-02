#!/usr/bin/env python3
"""Build a deterministic, read-only D1D remediation decision matrix.

This tool consumes the corrected D1C2 evidence files and produces a review plan.
It never edits blog source, the database, sitemap, runtime state, or Git state.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path
from typing import Any


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_quality(path: Path) -> dict[str, set[str]]:
    findings: dict[str, set[str]] = defaultdict(set)
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        required = {"slug", "severity", "code", "detail"}
        if set(reader.fieldnames or []) != required:
            raise SystemExit(f"unexpected quality schema: {reader.fieldnames}")
        for row in reader:
            findings[row["slug"]].add(row["code"])
    return findings


def read_pairs(path: Path) -> tuple[set[str], set[str]]:
    high: set[str] = set()
    medium: set[str] = set()
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        for row in reader:
            target = high if row["severity"] == "HIGH" else medium
            target.add(row["leftSlug"])
            target.add(row["rightSlug"])
    return high, medium


def read_clusters(path: Path) -> tuple[dict[str, int], list[dict[str, Any]]]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        raise SystemExit("cluster evidence must be a JSON array")
    membership: dict[str, int] = {}
    for index, cluster in enumerate(raw, start=1):
        size = int(cluster["size"])
        slugs = list(cluster["slugs"])
        if size != len(slugs):
            raise SystemExit(f"cluster {index} size mismatch")
        for slug in slugs:
            if slug in membership:
                raise SystemExit(f"slug appears in multiple high clusters: {slug}")
            membership[slug] = size
    return membership, raw


def decide(codes: set[str], high: bool, medium: bool, cluster_size: int) -> tuple[str, str, str]:
    thin_300 = "SOURCE_WORDS_UNDER_300" in codes
    template_heavy = "SOURCE_CONTRIBUTION_UNDER_40_PERCENT" in codes

    if cluster_size > 50:
        return "P0", "SYSTEMIC_CLUSTER_REDESIGN", "Inspect intent families; retain authoritative hubs and rewrite, merge, or redirect members only after manual review."
    if 26 <= cluster_size <= 50:
        return "P0", "LARGE_CLUSTER_REMEDIATION", "Map search intent and select canonical survivors before controlled rewrites or redirects."
    if 11 <= cluster_size <= 25:
        return "P1", "CLUSTER_DIFFERENTIATION", "Differentiate page purpose and evidence; merge pages with materially identical intent."
    if 3 <= cluster_size <= 10:
        return "P1", "SMALL_CLUSTER_REVIEW", "Review cluster manually and choose retain, rewrite, merge, or redirect per intent."
    if cluster_size == 2:
        return "P1", "PAIR_REVIEW", "Compare the two pages and preserve both only when search intent and substantive evidence differ."
    if medium and not high:
        return "P2", "MEDIUM_SIMILARITY_REVIEW", "Manually validate similarity before any content or URL action."
    if thin_300 and template_heavy:
        return "P2", "THIN_TEMPLATE_REWRITE", "Add topic-specific evidence, examples, steps, limitations, and differentiated intent."
    if template_heavy:
        return "P3", "TEMPLATE_DIFFERENTIATION", "Reduce boilerplate and increase page-specific source contribution."
    return "P3", "STRUCTURE_REVIEW", "Validate required sections and editorial completeness without automatic publication approval."


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()

    report = args.report.resolve()
    output = args.output.resolve()
    quality = report / "quality-findings.tsv"
    pairs = report / "near-duplicate-pairs.tsv"
    clusters = report / "near-duplicate-clusters.json"
    summary = report / "summary.json"

    for path in (quality, pairs, clusters, summary):
        if not path.is_file() or path.stat().st_size == 0:
            raise SystemExit(f"missing evidence: {path}")

    summary_data = json.loads(summary.read_text(encoding="utf-8"))
    if summary_data.get("total") != 120097:
        raise SystemExit("unexpected source page count")
    if summary_data.get("exhaustiveSemanticDuplicateCertification") is not False:
        raise SystemExit("semantic certification safety flag changed")

    findings = read_quality(quality)
    high_pages, medium_pages = read_pairs(pairs)
    cluster_membership, cluster_data = read_clusters(clusters)

    output.mkdir(parents=True, exist_ok=False)
    matrix_path = output / "remediation-decision-matrix.tsv"
    counts: dict[str, int] = defaultdict(int)

    with matrix_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle, delimiter="\t", lineterminator="\n")
        writer.writerow([
            "slug", "priority", "bucket", "recommendedAction", "highSimilarity",
            "mediumSimilarity", "highClusterSize", "findingCodes", "automaticMutationApproved"
        ])
        for slug in sorted(findings):
            codes = findings[slug]
            high = slug in high_pages
            medium = slug in medium_pages
            cluster_size = cluster_membership.get(slug, 0)
            priority, bucket, action = decide(codes, high, medium, cluster_size)
            counts[bucket] += 1
            writer.writerow([
                slug, priority, bucket, action, "YES" if high else "NO",
                "YES" if medium else "NO", cluster_size, ",".join(sorted(codes)), "NO"
            ])

    if sum(counts.values()) != 120097:
        raise SystemExit("decision matrix page count mismatch")

    manifest = {
        "status": "PASS",
        "method": "deterministic evidence-based provisional classification",
        "sourcePageCount": 120097,
        "decisionRows": sum(counts.values()),
        "bucketCounts": dict(sorted(counts.items())),
        "highSimilarityPages": len(high_pages),
        "mediumSimilarityPages": len(medium_pages),
        "highClusterCount": len(cluster_data),
        "automaticContentMutationApproved": False,
        "publicationOrIndexingApproved": False,
        "exhaustiveSemanticDuplicateCertification": False,
        "inputs": {
            quality.name: sha256(quality),
            pairs.name: sha256(pairs),
            clusters.name: sha256(clusters),
            summary.name: sha256(summary),
        },
        "outputs": {matrix_path.name: sha256(matrix_path)},
        "nextPhase": "D1D_REPRESENTATIVE_SAMPLE_VALIDATION",
    }
    manifest_path = output / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print("BLOG_D1D_REMEDIATION_DECISION_MATRIX_STATUS=PASS")
    print(f"SOURCE_PAGE_COUNT={manifest['sourcePageCount']}")
    print(f"DECISION_ROWS={manifest['decisionRows']}")
    for key, value in manifest["bucketCounts"].items():
        print(f"BUCKET_{key}={value}")
    print("AUTOMATIC_CONTENT_MUTATION_APPROVED=NO")
    print("PUBLICATION_OR_INDEXING_APPROVED=NO")
    print("NEXT_PHASE=D1D_REPRESENTATIVE_SAMPLE_VALIDATION")
    print(f"OUTPUT={output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
