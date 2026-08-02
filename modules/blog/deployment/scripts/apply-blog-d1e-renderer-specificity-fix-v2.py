#!/usr/bin/env python3
"""Apply the guarded D1E Blog renderer specificity fix to current production source.

This patch is designed for an isolated Git worktree created from local production
commit c7f4e55159cd513d9afeb2a9fac1d97966bf7a13. It refuses to run when the
Blog renderer blob, branch, or expected source snippets do not match. It never
edits Blog source shards, database state, sitemap state, PM2, or production.
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

EXPECTED_PAGE_BLOB = "d9957427ab51d8593c093b0c43cd275e33e0196f"
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

OLD_FAQS = '''  const merged = [...supplied, ...generated];
  return merged.filter((faq, index, all) => all.findIndex((item) => item.q === faq.q) === index).slice(0, 15);
'''

NEW_FAQS = '''  const dedupeFaqs = (items: GeneratedFaq[]) =>
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


def git(root: Path, *args: str) -> str:
    return subprocess.check_output(["git", "-C", str(root), *args], text=True).strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument("--expected-branch", required=True)
    args = parser.parse_args()

    root = args.root.resolve()
    target = root / TARGET_RELATIVE_PATH

    if not target.is_file():
        raise SystemExit(f"missing target file: {target}")

    branch = git(root, "branch", "--show-current")
    if branch != args.expected_branch:
        raise SystemExit(f"unexpected branch: {branch}")

    if git(root, "status", "--porcelain=v1"):
        raise SystemExit("worktree must be clean before patch")

    original_blob = git(root, "hash-object", str(TARGET_RELATIVE_PATH))
    if original_blob != EXPECTED_PAGE_BLOB:
        raise SystemExit(f"unexpected Blog renderer blob: {original_blob}")

    source = target.read_text(encoding="utf-8")
    if MARKER in source:
        raise SystemExit("D1E renderer specificity marker already present")
    if source.count(OLD_STEPS) != 1:
        raise SystemExit("expected steps snippet not found exactly once")
    if source.count(OLD_FAQS) != 1:
        raise SystemExit("expected FAQ snippet not found exactly once")

    patched = source.replace(OLD_STEPS, NEW_STEPS, 1).replace(OLD_FAQS, NEW_FAQS, 1)
    target.write_text(patched, encoding="utf-8")

    changed = git(root, "status", "--short")
    if changed != " M app/blog/[slug]/page.tsx":
        raise SystemExit(f"unexpected change scope: {changed!r}")

    subprocess.check_call(["git", "-C", str(root), "diff", "--check"])
    patched_blob = git(root, "hash-object", str(TARGET_RELATIVE_PATH))

    print("BLOG_D1E_RENDERER_SPECIFICITY_PATCH_V2_STATUS=PASS")
    print(f"BRANCH={branch}")
    print(f"ORIGINAL_PAGE_BLOB={original_blob}")
    print(f"PATCHED_PAGE_BLOB={patched_blob}")
    print("CHANGED_FILE=app/blog/[slug]/page.tsx")
    print("SOURCE_SHARDS_MODIFIED=NO")
    print("DATABASE_WRITE_PERFORMED=NO")
    print("PRODUCTION_MUTATION_PERFORMED=NO")
    print("NEXT_PHASE=D1E_CURRENT_BASE_BUILD_VALIDATION")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
