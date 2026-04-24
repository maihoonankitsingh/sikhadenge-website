const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");
const KNOWN_CITIES = new Set(["delhi","mumbai","bangalore","hyderabad","pune","chennai","kolkata","ahmedabad","jaipur","lucknow","noida","indore","surat","nagpur","bhopal","patna","kanpur","gurgaon","gurugram","faridabad","ghaziabad","kochi","coimbatore","vadodara","visakhapatnam","vijayawada","thane","nashik","rajkot","ludhiana","chandigarh"]);
const AUDIENCE_COMPACT = {
  "working-professionals": "Working Pros",
  "small-business-owners": "Small Businesses",
  "business-owners": "Business Owners",
  "hr-professionals": "HR Pros",
  "small-business": "Small Businesses",
  "job-seekers": "Job Seekers",
  "content-creators": "Content Creators",
  "instagram-creators": "Instagram Creators",
  "youtube-creators": "YouTube Creators",
};
const TOPIC_COMPACT = {
  jobs: "Jobs Guide",
  trends: "Trends Guide",
  "common-mistakes": "Common Mistakes",
  "beginner-mistakes": "Beginner Mistakes",
  "advanced-techniques": "Advanced Tips",
  "best-projects": "Best Projects",
  "best-practices": "Best Practices",
  "career-options": "Career Options",
  "portfolio-building": "Portfolio",
};

function readJson(filePath) { return JSON.parse(fs.readFileSync(filePath, "utf8")); }
function writeJson(filePath, data) { fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); }
function label(value) {
  return String(value || "").split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")
    .replace(/\bAi\b/g, "AI").replace(/\bSeo\b/g, "SEO").replace(/\bAeo\b/g, "AEO").replace(/\bGeo\b/g, "GEO")
    .replace(/\bChatgpt\b/g, "ChatGPT").replace(/\bClaude\b/g, "Claude").replace(/\bGemini\b/g, "Gemini").replace(/\bPerplexity\b/g, "Perplexity")
    .replace(/\bYoutube\b/g, "YouTube").replace(/\bLinkedin\b/g, "LinkedIn").replace(/\bHr\b/g, "HR");
}
function audienceLabel(value) { return AUDIENCE_COMPACT[value] || label(value); }
function topicLabel(value) { return TOPIC_COMPACT[value] || label(value); }
function stageLabel(value) {
  const map = { beginners: "for Beginners", advanced: "Advanced Tips", "without-coding": "Without Coding", "without-experience": "No Experience", "for-freshers": "for Freshers" };
  return map[value] || label(value);
}
function compact(value) { return label(value).replace(/\s+/g, " ").trim(); }
function finalizeTitle(title) {
  let next = title
    .replace(/Portfolio Building/g, "Portfolio")
    .replace(/Without Experience/g, "No Experience")
    .replace(/Working Professionals/g, "Working Pros")
    .replace(/Small Business Owners/g, "Small Businesses")
    .replace(/Advanced Techniques/g, "Advanced Tips")
    .replace(/Mistakes for Beginners/g, "Beginner Mistakes")
    .replace(/: Jobs \(/g, ": Jobs Guide (")
    .replace(/: Trends \(/g, ": Trends Guide (");
  if (next.length < 35 && /: (SEO|AEO|GEO) for /i.test(next) && !/Guide/i.test(next)) next = next.replace(/ for /i, " Guide for ");
  return next.replace(/\s+/g, " ").trim();
}
function improveTitle(slug, currentTitle) {
  const topicFamilyAudienceYear = slug.match(/^([a-z-]+)-in-(.+)-for-([a-z-]+)-in-(20\d{2})$/);
  if (topicFamilyAudienceYear) {
    const topic = topicLabel(topicFamilyAudienceYear[1]);
    const family = compact(topicFamilyAudienceYear[2]);
    const audience = audienceLabel(topicFamilyAudienceYear[3]);
    const year = topicFamilyAudienceYear[4];
    return finalizeTitle(`${family} for ${audience}: ${topic} (${year})`);
  }
  const cityYear = slug.match(/^(.+)-([a-z-]+)-in-([a-z-]+)-(20\d{2})$/);
  if (cityYear && KNOWN_CITIES.has(cityYear[3])) {
    const family = compact(cityYear[1]);
    const problem = topicLabel(cityYear[2]);
    const city = compact(cityYear[3]);
    const year = cityYear[4];
    return finalizeTitle(`${family} ${problem} in ${city}: Guide (${year})`);
  }
  const dualIntent = slug.match(/^(best|top|guide|how-to)-(.+)-for-(students|freelancers|creators)-for-(students|freelancers|creators)-(seo|aeo|geo|productivity|content-creation|lead-generation|client-work|career-growth|portfolio-building|earning|automation)$/);
  if (dualIntent) {
    const intent = dualIntent[1];
    const family = compact(dualIntent[2]);
    const audienceA = audienceLabel(dualIntent[3]);
    const audienceB = audienceLabel(dualIntent[4]);
    const sameAudience = audienceA === audienceB;
    const audience = sameAudience ? audienceA : `${audienceA} and ${audienceB}`;
    const outcome = topicLabel(dualIntent[5]);
    if (intent === "best") return finalizeTitle(sameAudience ? `Best ${family} for ${audience}: ${outcome} Strategy (2026)` : `Best ${family} for ${audience}: ${outcome} Guide (2026)`);
    if (intent === "top") return finalizeTitle(sameAudience ? `Top ${family} for ${audience}: ${outcome} Picks (2026)` : `Top ${family} for ${audience}: ${outcome} Guide (2026)`);
    if (intent === "guide") return finalizeTitle(sameAudience ? `${family} for ${audience}: ${outcome} Strategy Guide (2026)` : `${family} for ${audience}: ${outcome} Guide (2026)`);
    return finalizeTitle(sameAudience ? `How to Use ${family} for ${audience}: ${outcome} Strategy` : `How to Use ${family} for ${audience}: ${outcome} (2026)`);
  }
  const dualAudience = slug.match(/^(.+)-for-(students|freelancers|creators)-for-(students|freelancers|creators)-(.+)-(beginners|advanced|without-coding|without-experience|for-freshers)$/);
  if (dualAudience) {
    const family = compact(dualAudience[1]);
    const audienceA = audienceLabel(dualAudience[2]);
    const audienceB = audienceLabel(dualAudience[3]);
    const problem = topicLabel(dualAudience[4]);
    const stage = stageLabel(dualAudience[5]);
    if (audienceA === audienceB) return finalizeTitle(`${family} for ${audienceA}: ${problem} Playbook ${stage}`);
    return finalizeTitle(`${family}: ${problem} ${stage} for ${audienceA} and ${audienceB}`);
  }
  const singleAudience = slug.match(/^(.+)-for-(students|freelancers|creators)-(.+)-(beginners|advanced|without-coding|without-experience|for-freshers)$/);
  if (singleAudience) {
    const family = compact(singleAudience[1]);
    const audience = audienceLabel(singleAudience[2]);
    const problem = topicLabel(singleAudience[3]);
    const stage = stageLabel(singleAudience[4]);
    return finalizeTitle(`${family} for ${audience}: ${problem} ${stage}`);
  }
  return finalizeTitle(currentTitle);
}
function main() {
  const blogs = readJson(BLOGS_PATH);
  let changed = 0;
  const nextBlogs = blogs.map((blog) => {
    const nextTitle = improveTitle(blog.slug, blog.title);
    if (nextTitle !== blog.title) { changed += 1; return { ...blog, title: nextTitle }; }
    return blog;
  });
  writeJson(BLOGS_PATH, nextBlogs);
  console.log(`Titles hardened: ${changed}`);
  console.log(`Blog count unchanged: ${nextBlogs.length}`);
}
main();


