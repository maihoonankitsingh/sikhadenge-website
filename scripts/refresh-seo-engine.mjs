import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

const MASTER_PATH = path.join(ROOT, "data/generated-seo-master.json");
const OLD_PATH = path.join(ROOT, "data/generated-seo.json");
const MERGED_PATH = path.join(ROOT, "data/generated-seo-merged.json");
const FAMILY_DIR = path.join(ROOT, "data/generated-seo-families");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
}

function main() {
  console.log("Step 1: generating config-driven SEO pages...");
  execSync("node scripts/generate-seo-pages.mjs", { stdio: "inherit" });

  console.log("Step 2: validating generated outputs...");
  ensureExists(MASTER_PATH);
  ensureExists(OLD_PATH);

  const oldData = readJson(OLD_PATH);
  const newData = readJson(MASTER_PATH);

  console.log("Step 3: merging old + new datasets...");
  const merged = {};

  for (const item of oldData) {
    const slug = item?.slug;
    if (slug) merged[slug] = item;
  }

  for (const item of newData) {
    const slug = item?.slug;
    if (slug) merged[slug] = item;
  }

  const final = Object.values(merged).sort((a, b) => {
    const aSlug = a.slug || "";
    const bSlug = b.slug || "";
    return aSlug.localeCompare(bSlug);
  });

  writeJson(MERGED_PATH, final);

  const oldSlugs = new Set(oldData.map((x) => x?.slug).filter(Boolean));
  const newSlugs = new Set(newData.map((x) => x?.slug).filter(Boolean));
  const mergedSlugs = new Set(final.map((x) => x?.slug).filter(Boolean));

  const missingFromMerged = [...oldSlugs].filter((slug) => !mergedSlugs.has(slug));
  const addedInMerged = [...mergedSlugs].filter((slug) => !oldSlugs.has(slug));

  console.log("----- SEO ENGINE SUMMARY -----");
  console.log("Old records:", oldData.length);
  console.log("New generated records:", newData.length);
  console.log("Merged records:", final.length);
  console.log("Missing old slugs after merge:", missingFromMerged.length);
  console.log("New slugs added:", addedInMerged.length);
  console.log("Family outputs dir:", FAMILY_DIR);
  console.log("Master file:", MASTER_PATH);
  console.log("Merged file:", MERGED_PATH);

  if (missingFromMerged.length > 0) {
    console.log("Sample missing slugs:", missingFromMerged.slice(0, 20));
    throw new Error("Merge validation failed: some old slugs are missing from merged dataset.");
  }

  console.log("SEO engine refresh complete.");
}

try {
  main();
} catch (error) {
  console.error("SEO engine refresh failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
