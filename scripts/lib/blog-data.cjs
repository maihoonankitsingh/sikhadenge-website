const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const BLOGS_DIR = path.join(ROOT, "data", "blogs");
const INDEX_PATH = path.join(BLOGS_DIR, "index.json");
const SLUG_INDEX_PATH = path.join(BLOGS_DIR, "slug-index.json");
const SHARD_SIZE = 10000;

function readJson(filePath, fallback = []) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function readBlogs() {
  const manifest = readJson(INDEX_PATH, null);
  if (manifest && Array.isArray(manifest.shards)) {
    return manifest.shards.flatMap((shard) => readJson(path.join(BLOGS_DIR, shard.file), []));
  }

  const data = readJson(BLOGS_PATH, []);
  return Array.isArray(data) ? data : [];
}

function writeBlogs(blogs) {
  fs.mkdirSync(BLOGS_DIR, { recursive: true });

  for (const name of fs.readdirSync(BLOGS_DIR)) {
    if (/^blogs-\d+\.json$/.test(name)) {
      fs.unlinkSync(path.join(BLOGS_DIR, name));
    }
  }

  const shards = [];
  const slugIndex = {};
  for (let start = 0; start < blogs.length; start += SHARD_SIZE) {
    const end = Math.min(start + SHARD_SIZE, blogs.length);
    const file = `blogs-${String(shards.length + 1).padStart(3, "0")}.json`;
    const items = blogs.slice(start, end);
    fs.writeFileSync(path.join(BLOGS_DIR, file), JSON.stringify(items));
    for (const item of items) {
      if (item && typeof item.slug === "string" && item.slug.trim()) {
        slugIndex[item.slug.trim()] = file;
      }
    }
    shards.push({ file, start, end, count: items.length });
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    total: blogs.length,
    shardSize: SHARD_SIZE,
    shards,
  };

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
  fs.writeFileSync(SLUG_INDEX_PATH, JSON.stringify({ version: 1, generatedAt: index.generatedAt, total: blogs.length, slugs: slugIndex }));
  fs.writeFileSync(BLOGS_PATH, JSON.stringify({ split: true, manifest: "blogs/index.json", total: blogs.length }, null, 2));
}

module.exports = {
  BLOGS_PATH,
  readBlogs,
  writeBlogs,
};