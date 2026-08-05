import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogPath = path.join(root, "data", "blogs.json");
const expertPath = path.join(root, "data", "generated-seo.json");
const MAX_SITEMAP_URLS = 50_000;

function readArray(filePath, label, required = true) {
  if (!fs.existsSync(filePath)) {
    const message = `${label}: missing ${path.relative(root, filePath)}`;
    if (required) throw new Error(message);
    console.warn(`WARN ${message}`);
    return [];
  }
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(parsed)) throw new Error(`${label}: expected a JSON array`);
  return parsed;
}

function auditRecords(records, label, requiredFields) {
  const errors = [];
  const warnings = [];
  const slugs = new Map();

  records.forEach((record, index) => {
    if (!record || typeof record !== "object") {
      errors.push(`${label}[${index}] is not an object`);
      return;
    }

    const slug = typeof record.slug === "string" ? record.slug.trim() : "";
    if (!slug) {
      errors.push(`${label}[${index}] has no valid slug`);
    } else {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        warnings.push(`${label}[${index}] has a non-normalized slug: ${slug}`);
      }
      const previous = slugs.get(slug);
      if (previous !== undefined) errors.push(`${label} duplicate slug: ${slug} at ${previous} and ${index}`);
      slugs.set(slug, index);
    }

    for (const field of requiredFields) {
      if (typeof record[field] !== "string" || record[field].trim().length === 0) {
        errors.push(`${label}[${index}] missing ${field}`);
      }
    }

    if (typeof record.title === "string" && record.title.trim().length < 12) {
      warnings.push(`${label}[${index}] title is unusually short: ${record.title}`);
    }
    if (typeof record.description === "string" && record.description.trim().length < 50) {
      warnings.push(`${label}[${index}] description is shorter than 50 characters: ${slug || index}`);
    }
  });

  return { errors, warnings, uniqueSlugs: slugs.size };
}

const blogs = readArray(blogPath, "blogs", false);
const experts = readArray(expertPath, "experts", true);

const blogAudit = auditRecords(blogs, "blogs", ["slug", "title"]);
const expertAudit = auditRecords(experts, "experts", ["slug", "title", "description", "skill"]);
const staticAndSkillEstimate = 20;
const estimatedSitemapUrls = staticAndSkillEstimate + blogAudit.uniqueSlugs + expertAudit.uniqueSlugs;

const errors = [...blogAudit.errors, ...expertAudit.errors];
const warnings = [...blogAudit.warnings, ...expertAudit.warnings];

if (estimatedSitemapUrls > MAX_SITEMAP_URLS) {
  errors.push(`Estimated sitemap contains ${estimatedSitemapUrls} URLs; split it before exceeding ${MAX_SITEMAP_URLS}`);
}

console.log(JSON.stringify({
  blogs: { records: blogs.length, uniqueSlugs: blogAudit.uniqueSlugs },
  experts: { records: experts.length, uniqueSlugs: expertAudit.uniqueSlugs },
  estimatedSitemapUrls,
  sitemapLimit: MAX_SITEMAP_URLS,
  warnings: warnings.length,
  errors: errors.length,
}, null, 2));

for (const warning of warnings.slice(0, 100)) console.warn(`WARN ${warning}`);
for (const error of errors.slice(0, 100)) console.error(`ERROR ${error}`);

if (errors.length > 0) process.exit(1);
