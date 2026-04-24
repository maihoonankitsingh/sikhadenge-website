import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const FAMILY_CONFIG_PATH = path.join(ROOT, "config/seo/family-config.json");
const OUTPUT_PATH = path.join(ROOT, "config/seo/seed-slugs-expanded.json");

const GLOBAL_DIMENSIONS = {
  industries: [
    "education",
    "healthcare",
    "ecommerce",
    "agency",
    "startup",
    "creator-business",
    "coaching",
    "consulting",
    "real-estate",
    "finance"
  ],
  roles: [
    "students",
    "freelancers",
    "marketers",
    "designers",
    "founders",
    "job-seekers",
    "creators",
    "working-professionals",
    "small-business-owners",
    "agency-owners"
  ],
  platforms: [
    "instagram",
    "youtube",
    "linkedin",
    "whatsapp",
    "google",
    "meta",
    "facebook",
    "shopify"
  ],
  outcomes: [
    "earning",
    "lead-generation",
    "productivity",
    "content-creation",
    "client-work",
    "career-growth",
    "jobs",
    "sales",
    "business-growth",
    "portfolio-building"
  ],
  stages: [
    "beginners",
    "intermediate",
    "advanced",
    "without-coding",
    "without-experience",
    "for-freshers"
  ],
  intents: [
    "best",
    "roadmap",
    "guide",
    "how-to",
    "tools",
    "skills",
    "jobs",
    "salary",
    "course",
    "training"
  ],
  years: ["2026"],
  cities: [
    "delhi",
    "mumbai",
    "bangalore",
    "hyderabad",
    "pune",
    "chennai",
    "kolkata",
    "ahmedabad",
    "jaipur",
    "lucknow",
    "noida",
    "indore",
    "bhopal",
    "surat",
    "patna",
    "nagpur",
    "kanpur",
    "varanasi",
    "prayagraj",
    "chandigarh"
  ]
};

const BOOST_FAMILIES = new Set([
  "ai-skills",
  "ai-expert",
  "ai-course",
  "ai-marketing",
  "ai-automation",
  "prompt-engineering",
  "ai-learning-path"
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function unique(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function add(set, value) {
  if (value && typeof value === "string") set.add(value);
}

function limit(arr, max) {
  return arr.slice(0, max);
}

function buildSeedsForFamily(family) {
  const seeds = new Set();
  const familyKey = family.familyKey;
  const rootSlug = family.rootSlug;
  const isBoost = BOOST_FAMILIES.has(familyKey);

  const dims = family.seedDimensions || {};
  const audiences = unique([...(dims.audiences || []), ...GLOBAL_DIMENSIONS.roles]);
  const cities = unique([...(dims.cities || []), ...(dims.locations || []), ...GLOBAL_DIMENSIONS.cities]);
  const usecases = unique(dims.usecases || []);
  const modifiers = unique([...(dims.modifiers || []), ...GLOBAL_DIMENSIONS.stages]);
  const industries = GLOBAL_DIMENSIONS.industries;
  const platforms = GLOBAL_DIMENSIONS.platforms;
  const outcomes = GLOBAL_DIMENSIONS.outcomes;
  const intents = GLOBAL_DIMENSIONS.intents;
  const years = GLOBAL_DIMENSIONS.years;

  const A = isBoost ? limit(audiences, 10) : limit(audiences, 8);
  const C = isBoost ? limit(cities, 20) : limit(cities, 10);
  const U = isBoost ? limit(usecases, 10) : limit(usecases, 8);
  const M = isBoost ? limit(modifiers, 10) : limit(modifiers, 8);
  const I = isBoost ? limit(industries, 10) : limit(industries, 8);
  const P = isBoost ? limit(platforms, 8) : limit(platforms, 6);
  const O = isBoost ? limit(outcomes, 10) : limit(outcomes, 8);
  const T = isBoost ? limit(intents, 10) : limit(intents, 8);

  add(seeds, rootSlug);

  for (const audience of audiences) add(seeds, `${familyKey}-for-${audience}`);
  for (const city of cities) add(seeds, `${familyKey}-in-${city}`);
  for (const usecase of usecases) add(seeds, `${familyKey}-for-${usecase}`);
  for (const modifier of modifiers) add(seeds, `${familyKey}-${modifier}`);
  for (const modifier of modifiers) add(seeds, `${familyKey}-roadmap-for-${modifier}`);

  for (const intent of intents) {
    add(seeds, `${intent}-${familyKey}`);
    add(seeds, `${intent}-${familyKey}-in-2026`);
  }

  for (const year of years) {
    add(seeds, `${familyKey}-in-${year}`);
    for (const audience of A) add(seeds, `${familyKey}-for-${audience}-in-${year}`);
  }

  for (const audience of A) {
    for (const city of C) add(seeds, `${familyKey}-for-${audience}-in-${city}`);
    for (const usecase of U) add(seeds, `${familyKey}-for-${audience}-for-${usecase}`);
    for (const modifier of M) add(seeds, `${familyKey}-for-${audience}-${modifier}`);
    for (const outcome of O) add(seeds, `${familyKey}-for-${audience}-for-${outcome}`);
    for (const platform of P) add(seeds, `${familyKey}-for-${audience}-for-${platform}`);
    for (const intent of T) add(seeds, `${intent}-${familyKey}-for-${audience}`);
  }

  for (const usecase of U) {
    for (const city of C) add(seeds, `${familyKey}-for-${usecase}-in-${city}`);
    for (const outcome of O) add(seeds, `${familyKey}-for-${usecase}-for-${outcome}`);
    for (const platform of P) add(seeds, `${familyKey}-for-${usecase}-for-${platform}`);
    for (const intent of T) add(seeds, `${intent}-${familyKey}-for-${usecase}`);
  }

  for (const city of C) {
    for (const modifier of M) add(seeds, `${familyKey}-${modifier}-in-${city}`);
    for (const outcome of O) add(seeds, `${familyKey}-for-${outcome}-in-${city}`);
  }

  for (const industry of I) {
    add(seeds, `${familyKey}-for-${industry}`);
    for (const audience of A) add(seeds, `${familyKey}-for-${audience}-in-${industry}`);
    for (const usecase of U) add(seeds, `${familyKey}-for-${industry}-for-${usecase}`);
  }

  for (const platform of P) {
    add(seeds, `${familyKey}-for-${platform}`);
    for (const audience of A) add(seeds, `${familyKey}-for-${audience}-for-${platform}`);
    for (const usecase of U) add(seeds, `${familyKey}-for-${platform}-for-${usecase}`);
  }

  for (const outcome of O) {
    add(seeds, `${familyKey}-for-${outcome}`);
    for (const audience of A) add(seeds, `${familyKey}-for-${audience}-for-${outcome}`);
    for (const platform of P) add(seeds, `${familyKey}-for-${outcome}-for-${platform}`);
  }

  if (isBoost) {
    for (const audience of limit(A, 8)) {
      for (const usecase of limit(U, 8)) {
        for (const city of limit(C, 12)) {
          add(seeds, `${familyKey}-for-${audience}-for-${usecase}-in-${city}`);
        }
      }
    }

    for (const audience of limit(A, 8)) {
      for (const platform of limit(P, 6)) {
        for (const outcome of limit(O, 6)) {
          add(seeds, `${familyKey}-for-${audience}-for-${platform}-for-${outcome}`);
        }
      }
    }

    for (const audience of limit(A, 8)) {
      for (const industry of limit(I, 8)) {
        for (const city of limit(C, 10)) {
          add(seeds, `${familyKey}-for-${audience}-in-${industry}-in-${city}`);
        }
      }
    }

    for (const intent of limit(T, 8)) {
      for (const audience of limit(A, 8)) {
        for (const city of limit(C, 10)) {
          add(seeds, `${intent}-${familyKey}-for-${audience}-in-${city}`);
        }
      }
    }
  }

  return unique([...seeds]).sort();
}

function main() {
  const familyConfig = readJson(FAMILY_CONFIG_PATH);
  const families = familyConfig.families || [];

  const expanded = {
    version: "3.0",
    seedSet: "top-families-expanded-deep-boosted",
    generatedAt: new Date().toISOString().slice(0, 10),
    families: []
  };

  let total = 0;

  for (const family of families) {
    const seedSlugs = buildSeedsForFamily(family);
    total += seedSlugs.length;

    expanded.families.push({
      familyKey: family.familyKey,
      rootSlug: family.rootSlug,
      seedSlugs
    });

    console.log(`${family.familyKey}: ${seedSlugs.length} slugs`);
  }

  writeJson(OUTPUT_PATH, expanded);

  console.log("----- EXPANDED SEED SUMMARY -----");
  console.log("Family count:", expanded.families.length);
  console.log("Total expanded seed slugs:", total);
  console.log("Output:", OUTPUT_PATH);
}

try {
  main();
} catch (error) {
  console.error("Seed expansion failed.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
