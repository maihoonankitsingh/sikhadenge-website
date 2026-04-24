import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const FAMILY_CONFIG_PATH = path.join(ROOT, "config/seo/family-config.json");
const RULES_PATH = path.join(ROOT, "config/seo/generator-rules.json");
const SEEDS_PATH = path.join(ROOT, "config/seo/seed-slugs-expanded.json");

const OUTPUT_MASTER_PATH = path.join(ROOT, "data/generated-seo-master.json");
const OUTPUT_FAMILY_DIR = path.join(ROOT, "data/generated-seo-families");

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function titleCase(input = "") {
  const specialMap = {
    ai: "AI",
    seo: "SEO",
    ui: "UI",
    ux: "UX",
    api: "API",
    saas: "SaaS",
    whatsapp: "WhatsApp",
    meta: "Meta",
    google: "Google",
    ads: "Ads",
    jobs: "Jobs",
    india: "India",
    delhi: "Delhi",
    mumbai: "Mumbai",
    bangalore: "Bangalore",
    hyderabad: "Hyderabad",
    pune: "Pune",
    chennai: "Chennai",
    kolkata: "Kolkata",
    ahmedabad: "Ahmedabad",
    jaipur: "Jaipur",
    lucknow: "Lucknow"
  };

  return input
    .split("-")
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      if (specialMap[lower]) return specialMap[lower];
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function fillTemplate(template, values) {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function unique(arr) {
  return [...new Set(arr)];
}

function inferValueFromSlug(slug, candidates = []) {
  const sorted = [...candidates].sort((a, b) => b.length - a.length);
  return sorted.find((item) => slug.includes(item)) || null;
}

function inferPageKind(slug, family) {
  const { rootSlug, seedDimensions = {}, titlePatterns = {} } = family;
  const audiences = seedDimensions.audiences || [];
  const cities = seedDimensions.cities || [];
  const locations = seedDimensions.locations || [];
  const usecases = seedDimensions.usecases || [];
  const modifiers = seedDimensions.modifiers || [];

  if (slug === rootSlug) return "root";
  if (slug.includes("salary-in-") && titlePatterns.salary) return "salary";
  if (slug.includes("roadmap") && titlePatterns.roadmap) return "roadmap";

  const audienceHit = inferValueFromSlug(slug, audiences);
  if (audienceHit && titlePatterns.audience) return "audience";

  const cityHit = inferValueFromSlug(slug, [...cities, ...locations]);
  if (cityHit && titlePatterns.city) return "city";

  const usecaseHit = inferValueFromSlug(slug, usecases);
  if (usecaseHit && titlePatterns.usecase) return "usecase";

  if (slug.includes("career") && titlePatterns.career) return "career";
  if (slug.includes("best") && titlePatterns.modifier) return "modifier";
  if (slug.includes("future") && titlePatterns.modifier) return "modifier";

  const modifierHit = inferValueFromSlug(slug, modifiers);
  if (modifierHit && titlePatterns.modifier) return "modifier";

  if (titlePatterns.modifier) return "modifier";
  return "root";
}

function inferDynamicValues(slug, family) {
  const { seedDimensions = {}, rootSlug, topicLabel } = family;
  const audiences = seedDimensions.audiences || [];
  const cities = seedDimensions.cities || [];
  const locations = seedDimensions.locations || [];
  const usecases = seedDimensions.usecases || [];
  const modifiers = seedDimensions.modifiers || [];

  const audience = inferValueFromSlug(slug, audiences);
  const city = inferValueFromSlug(slug, cities);
  const location = inferValueFromSlug(slug, locations) || city;
  const usecase = inferValueFromSlug(slug, usecases);
  const modifier =
    inferValueFromSlug(slug, modifiers) ||
    slug
      .replace(rootSlug, "")
      .replace(/^[-]+/, "")
      .replace(/salary-in-[a-z-]+/, "")
      .replace(/for-[a-z-]+/, "")
      .replace(/in-[a-z-]+/, "")
      .replace(/--+/g, "-")
      .replace(/^[-]+|[-]+$/g, "") ||
    "practical-guide";

  return {
    topicLabel,
    audience: audience ? titleCase(audience) : "Beginners",
    city: city ? titleCase(city) : "India",
    location: location ? titleCase(location) : "India",
    usecase: usecase ? titleCase(usecase) : "Practical Work",
    modifier: titleCase(modifier)
  };
}

function buildTitleAndDescription(slug, family, rules) {
  const pageKind = inferPageKind(slug, family);
  const dynamicValues = inferDynamicValues(slug, family);
  const titlePatterns = family.titlePatterns || {};
  const descriptionPatterns = family.descriptionPatterns || {};
  const genericTitlePatterns = rules.genericTitlePatterns || {};

  const titleTemplate =
    titlePatterns[pageKind] ||
    genericTitlePatterns[family.templateType] ||
    `${family.topicLabel} | Sikhadenge`;

  const descriptionTemplate =
    descriptionPatterns[pageKind] ||
    descriptionPatterns.root ||
    `Explore ${family.topicLabel} with Sikhadenge.`;

  const title = fillTemplate(titleTemplate, dynamicValues).replace(/\s+/g, " ").trim();
  const description = fillTemplate(descriptionTemplate, dynamicValues).replace(/\s+/g, " ").trim();

  return { title, description, pageKind, dynamicValues };
}

function buildRecord(slug, family, rules) {
  const { title, description, pageKind, dynamicValues } = buildTitleAndDescription(slug, family, rules);

  return {
    slug,
    title,
    description,
    familyKey: family.familyKey,
    rootSlug: family.rootSlug,
    templateType: family.templateType,
    topicLabel: family.topicLabel,
    primaryIntent: family.primaryIntent,
    pageKind,
    ctaMode: family.ctaMode,
    relatedFamilies: family.relatedFamilies || [],
    sitemapGroup: family.sitemapGroup,
    wordRange: rules.wordRules || { minimumWords: 700, targetWords: 950, maximumWords: 1200 },
    dynamicValues
  };
}

function main() {
  const familyConfig = readJson(FAMILY_CONFIG_PATH);
  const generatorRules = readJson(RULES_PATH);
  const seedConfig = readJson(SEEDS_PATH);

  ensureDir(OUTPUT_FAMILY_DIR);

  const familyMap = new Map(
    (familyConfig.families || []).map((family) => [family.familyKey, family])
  );

  const master = [];
  const seen = new Set();

  for (const familySeed of seedConfig.families || []) {
    const family = familyMap.get(familySeed.familyKey);

    if (!family) {
      throw new Error(`Missing family config for: ${familySeed.familyKey}`);
    }

    const familyRecords = [];

    for (const slug of unique(familySeed.seedSlugs || [])) {
      if (seen.has(slug)) {
        throw new Error(`Duplicate slug detected: ${slug}`);
      }
      seen.add(slug);

      const record = buildRecord(slug, family, generatorRules);
      familyRecords.push(record);
      master.push(record);
    }

    const familyOutputPath = path.join(OUTPUT_FAMILY_DIR, `${family.familyKey}.json`);
    fs.writeFileSync(familyOutputPath, JSON.stringify(familyRecords, null, 2));
  }

  fs.writeFileSync(OUTPUT_MASTER_PATH, JSON.stringify(master, null, 2));

  console.log("Generated master records:", master.length);
  console.log("Family files written:", (seedConfig.families || []).length);
  console.log("Master output:", OUTPUT_MASTER_PATH);
  console.log("Family output dir:", OUTPUT_FAMILY_DIR);
}

try {
  main();
} catch (error) {
  console.error("Generation failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
