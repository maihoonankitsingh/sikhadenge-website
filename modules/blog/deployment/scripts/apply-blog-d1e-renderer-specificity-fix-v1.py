#!/usr/bin/env python3
"""Apply the guarded D1E Blog renderer specificity fix.

This patch is intended for an isolated Git worktree on the D1E remediation
branch. It refuses to run when the target file blob or expected source snippets
do not match. It does not touch Blog source shards, the database, sitemap,
runtime state, or production branch.
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

EXPECTED_PAGE_BLOB = "a438d6e0876dba8cc9cba21d773b7c4c3650fd89"
TARGET_RELATIVE_PATH = Path("app/blog/[slug]/page.tsx")
MARKER = "BLOG_D1E_RENDERER_SPECIFICITY_V1"

OLD_STEPS = '''  if (supplied.length >= 4) {
    return supplied.map((step, index) => ({
      title: step,
      description: `Complete this stage with a visible output and review it before moving to step ${index + 2}.`,
      meta: index === 0 ? "Define the goal" : index === supplied.length - 1 ? "Measure and improve" : "Build and review",
    }));
  }
'''

NEW_STEPS = '''  if (supplied.length >= 4) {
    // BLOG_D1E_RENDERER_SPECIFICITY_V1: render the page-specific source step
    // as the visible explanation instead of repeating one generic sentence.
    return supplied.map((step, index) => ({
      title: `Step ${index + 1}`,
      description: step,
      meta: index === 0 ? "Define the goal" : index === supplied.length - 1 ? "Measure and improve" : "Build and review",
    }));
  }
'''

OLD_FAQ_RETURN = '''  const merged = [...supplied, ...generated];
  return merged.filter((faq, index, all) => all.findIndex((item) => item.q === faq.q) === index).slice(0, 15);
'''

NEW_FAQ_RETURN = '''  const dedupeFaqs = (items: GeneratedFaq[]) =>
    items.filter(
      (faq, index, all) =>
        all.findIndex((item) => item.q.trim().toLowerCase() === faq.q.trim().toLowerCase()) === index,
    );

  // BLOG_D1E_RENDERER_SPECIFICITY_V1: complete source FAQs are authoritative.
  // Appending the same generic FAQ set to every page inflated template
  // dominance and weakened intent differentiation across otherwise distinct URLs.
  if (supplied.length >= 4) {
    return dedupeFaqs(supplied).slice(0, 8);
  }

  return dedupeFaqs([...supplied, ...generated]).slice(0, 6);
'''


def run(root: Path, *args: str) -> str:
    completed = subprocess.run(
        ["git", "-C", str(root), *args],
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return completed.stdout.strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument(
        "--expected-branch",
        default="audit/blog-content-remediation-d1e-20260802",
    )
    args = parser.parse_args()

    root = args.root.resolve()
    target = root / TARGET_RELATIVE_PATH

    run(root, "rev-parse", "--is-inside-work-tree")
    branch = run(root, "branch", "--show-current")
    if branch != args.expected_branch:
        raise SystemExit(f"unexpected branch: {branch}")

    if run(root, "status", "--porcelain=v1"):
        raise SystemExit("worktree must be clean before applying patch")

    if not target.is_file():
        raise SystemExit(f"missing target: {target}")

    actual_blob = run(root, "hash-object", str(target))
    if actual_blob != EXPECTED_PAGE_BLOB:
        raise SystemExit(
            f"page blob mismatch: expected={EXPECTED_PAGE_BLOB} actual={actual_blob}"
        )

    text = target.read_text(encoding="utf-8")
    if MARKER in text:
        raise SystemExit("D1E renderer specificity marker already present")
    if text.count(OLD_STEPS) != 1:
        raise SystemExit(f"steps source snippet count invalid: {text.count(OLD_STEPS)}")
    if text.count(OLD_FAQ_RETURN) != 1:
        raise SystemExit(
            f"FAQ source snippet count invalid: {text.count(OLD_FAQ_RETURN)}"
        )

    updated = text.replace(OLD_STEPS, NEW_STEPS, 1)
    updated = updated.replace(OLD_FAQ_RETURN, NEW_FAQ_RETURN, 1)

    if updated.count(MARKER) != 2:
        raise SystemExit("D1E marker verification failed")
    if OLD_STEPS in updated or OLD_FAQ_RETURN in updated:
        raise SystemExit("old renderer snippets remain after patch")

    target.write_text(updated, encoding="utf-8")

    changed = run(root, "status", "--short")
    expected_status = "M app/blog/[slug]/page.tsx"
    if changed.strip() != expected_status:
        raise SystemExit(f"unexpected changed files: {changed!r}")

    subprocess.run(
        ["git", "-C", str(root), "diff", "--check", "--", str(TARGET_RELATIVE_PATH)],
        check=True,
    )

    print("BLOG_D1E_RENDERER_SPECIFICITY_PATCH_STATUS=PASS")
    print(f"BRANCH={branch}")
    print(f"ORIGINAL_PAGE_BLOB={actual_blob}")
    print(f"PATCHED_PAGE_BLOB={run(root, 'hash-object', str(target))}")
    print("CHANGED_FILE=app/blog/[slug]/page.tsx")
    print("SOURCE_SHARDS_MODIFIED=NO")
    print("DATABASE_WRITE_PERFORMED=NO")
    print("PRODUCTION_MUTATION_PERFORMED=NO")
    print("NEXT_PHASE=D1E_RENDERER_SPECIFICITY_BUILD_VALIDATION")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
