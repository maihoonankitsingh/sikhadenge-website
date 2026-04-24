const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const ROLLOUT_DIR = path.join(ROOT, "output", "blog-rollout-10k");

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function formatLabel(value) {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bSeo\b/g, "SEO")
    .replace(/\bAeo\b/g, "AEO")
    .replace(/\bGeo\b/g, "GEO")
    .replace(/\bChatgpt\b/g, "ChatGPT")
    .replace(/\bGoogle Ai\b/g, "Google AI");
}

function pickReadTime(score) {
  if (score >= 160) return "9 min read";
  if (score >= 150) return "8 min read";
  if (score >= 140) return "7 min read";
  return "6 min read";
}

function buildExcerpt(item) {
  const title = item.title;
  const audience = formatLabel(item.audience || "learners");
  const family = formatLabel(item.family || item.keyword || "AI tools");
  const outcome = formatLabel(item.outcome || "growth");
  return `${title} ke liye practical guide jo ${audience} ko ${family} ke saath ${outcome} results samajhne aur apply karne me help kare.`;
}

function buildIntro(item) {
  const title = item.title;
  const family = formatLabel(item.family || item.keyword || "AI");
  const audience = formatLabel(item.audience || "learners");
  const outcome = formatLabel(item.outcome || "growth");
  const intent = formatLabel(item.intent || "guide");
  return `${title} tab useful hota hai jab aap ${family} ko sirf theory nahi, balki real execution, ranking, learning, client work, aur workflow systems se connect karte ho. Ye ${intent.toLowerCase()} ${audience.toLowerCase()} ke liye structured clarity deti hai ki ${outcome.toLowerCase()} ke liye kya choose karein, kaise use karein, aur better results ke liye kya avoid karein.`;
}

function buildSummaryPoints(item) {
  const family = formatLabel(item.family || item.keyword || "AI");
  const audience = formatLabel(item.audience || "learners");
  const outcome = formatLabel(item.outcome || "growth");
  const platform = item.platform ? formatLabel(item.platform) : null;
  return [
    `${audience} ke liye best-fit ${family} options ka practical breakdown`,
    `${outcome} improve karne ke liye clear selection aur use framework`,
    platform ? `${platform} context me is topic ko kaise apply karein` : `${family} ko real work aur learning me kaise apply karein`,
  ];
}

function buildPracticalSteps(item) {
  const family = formatLabel(item.family || item.keyword || "AI");
  const audience = formatLabel(item.audience || "learners");
  const outcome = formatLabel(item.outcome || "growth");
  return [
    `${audience} ke current goal ko define karo, especially ${outcome.toLowerCase()} ke context me`,
    `${family} ke 2-3 strongest options short-list karo aur practical comparison banao`,
    `Ek simple workflow ya prompt system ke saath real test run karo`,
    `Jo tool ya method best perform kare usko repeatable process me convert karo`,
  ];
}

function buildMistakes(item) {
  const family = formatLabel(item.family || item.keyword || "AI");
  const outcome = formatLabel(item.outcome || "growth");
  return [
    `${family} ko sirf trend dekhkar choose karna, use-case dekhkar nahi`,
    `${outcome} goal clear kiye bina tools test karna`,
    `AI output ko bina review ke publish ya deliver kar dena`,
    `Comparison ke bina first tool ko final solution maan lena`,
  ];
}

function buildFaqs(item) {
  const title = item.title;
  const family = formatLabel(item.family || item.keyword || "AI");
  const audience = formatLabel(item.audience || "learners");
  const outcome = formatLabel(item.outcome || "growth");
  return [
    {
      q: `${title} kis audience ke liye sabse useful hai?`,
      a: `Ye topic especially ${audience.toLowerCase()} ke liye useful hai jo ${family} ko ${outcome.toLowerCase()} ya better execution ke liye use karna chahte hain.`,
    },
    {
      q: `Kya is topic ke liye coding zaruri hai?`,
      a: `Har case me nahi. Kaafi ${family} workflows bina coding ke start kiye ja sakte hain, especially jab focus practical execution aur guided tool usage par ho.`,
    },
    {
      q: `Best result ke liye first step kya hona chahiye?`,
      a: `Pehle clear goal define karo, phir 2-3 relevant options compare karo, aur small real test ke saath result validate karo.`,
    },
    {
      q: `Kya ye topic SEO, AEO, ya GEO me bhi useful ho sakta hai?`,
      a: `Haan, agar aap structured content, clear answers, tool comparisons, aur practical implementation examples use karte ho to ye search aur AI discovery dono me useful hota hai.`,
    },
  ];
}

function buildBlogItem(item) {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: buildExcerpt(item),
    category: item.category || formatLabel(item.family || "AI"),
    readTime: pickReadTime(item.score || 0),
    intro: buildIntro(item),
    summaryPoints: buildSummaryPoints(item),
    practicalSteps: buildPracticalSteps(item),
    mistakes: buildMistakes(item),
    faqs: buildFaqs(item),
  };
}

function main() {
  const phaseArg = process.argv[2] || "phase-1-top-2000.json";
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : null;
  const phasePath = path.isAbsolute(phaseArg) ? phaseArg : path.join(ROLLOUT_DIR, phaseArg);

  const blogs = readJson(BLOGS_PATH, []);
  const phase = readJson(phasePath, { items: [] });
  const existingSlugs = new Set(blogs.map((blog) => blog.slug));
  const sourceItems = Array.isArray(phase.items) ? phase.items : [];
  const items = limit ? sourceItems.slice(0, limit) : sourceItems;

  const additions = [];
  let skipped = 0;

  for (const item of items) {
    if (!item?.slug || !item?.title || existingSlugs.has(item.slug)) {
      skipped += 1;
      continue;
    }
    existingSlugs.add(item.slug);
    additions.push(buildBlogItem(item));
  }

  const nextBlogs = [...blogs, ...additions];
  writeJson(BLOGS_PATH, nextBlogs);

  console.log(`Phase source: ${path.basename(phasePath)}`);
  console.log(`Requested items: ${items.length}`);
  console.log(`Added blogs: ${additions.length}`);
  console.log(`Skipped existing: ${skipped}`);
  console.log(`Total blogs now: ${nextBlogs.length}`);
}

main();
