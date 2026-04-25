import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const { readBlogs, writeBlogs } = await import("./lib/blog-data.cjs");

function readBlogs() {
  try {
    return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeBlogs(blogs) {
  writeBlogs(blogs);
}

function toTitleCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeAudienceLabel(value) {
  return toTitleCase(value)
    .replace(/\bSmall Business Owners\b/g, "Business Owners")
    .replace(/\bWorking Professionals\b/g, "Professionals")
    .replace(/\bInstagram Creators\b/g, "Creators")
    .replace(/\bCollege Students\b/g, "Students")
    .replace(/\bSchool Students\b/g, "Students")
    .replace(/\bJob Seekers\b/g, "Job Seekers");
}

function compactFamilyLabel(value) {
  return toTitleCase(value)
    .replace(/\bAi\b/g, "AI")
    .replace(/\bGoogle Ai\b/g, "Google AI")
    .replace(/\bChatgpt\b/g, "ChatGPT");
}

function buildBetterTitleFromSlug(slug) {
  const parts = slug.split("-").filter(Boolean);
  const year = parts.find((part) => /^20\d{2}$/.test(part));

  const captureFamilyAudience = (prefix) => {
    const match = slug.match(new RegExp(`^${prefix}-(.+?)-for-(.+)-in-(20\\d{2})$`));
    if (!match) return null;
    return {
      family: compactFamilyLabel(match[1]),
      audience: normalizeAudienceLabel(match[2]),
      year: match[3],
    };
  };

  const shortHighIntentMap = {
    "chatgpt-se-resume-kaise-banaye": "ChatGPT Se Resume Kaise Banaye: Practical Guide 2026",
    "ai-se-freelancing-kaise-start-kare": "AI Se Freelancing Kaise Start Kare: Beginner Guide",
    "ai-se-paise-kaise-kamaye": "AI Se Paise Kaise Kamaye: Practical Guide 2026",
    "students-ke-liye-best-ai-tools": "Students Ke Liye Best AI Tools in 2026",
    "beginners-ke-liye-ai-prompts": "Beginners Ke Liye Best AI Prompts in 2026",
    "ai-se-padhai-kaise-kare": "AI Se Padhai Kaise Kare: Student Guide 2026",
    "chatgpt-ka-use-kaise-kare": "ChatGPT Ka Use Kaise Kare: Full Beginner Guide",
    "freelancers-ke-liye-ai-workflow": "Freelancers Ke Liye AI Workflow in 2026",
    "business-owners-ke-liye-ai-tools": "Business Owners Ke Liye AI Tools in 2026",
    "ai-tools-for-students": "AI Tools for Students to Study Faster (2026)",
    "best-ai-tools-for-students": "Best AI Tools for Students Guide 2026",
    "chatgpt-for-students": "ChatGPT for Students: Best Study Uses (2026)",
    "google-gemini-for-students": "Google Gemini for Students Guide",
    "claude-for-students": "Claude for Students: Study Guide (2026)",
    "best-chatgpt-prompts-for-students": "Best ChatGPT Prompts for Students Guide",
    "ai-tools-for-freelancers": "AI Tools for Freelancers Guide 2026",
    "chatgpt-for-freelancers": "ChatGPT for Freelancers: Client Work Guide (2026)",
    "ai-tools-for-creators": "AI Tools for Creators: Best Picks (2026)",
    "best-ai-tools-for-creators": "Best AI Tools for Creators Guide 2026",
    "chatgpt-for-content-creation": "ChatGPT for Content Creation Guide 2026",
    "gemini-vs-chatgpt": "Gemini vs ChatGPT: Which Is Better in 2026",
    "claude-vs-chatgpt": "Claude vs ChatGPT: Which Is Better in 2026",
    "perplexity-vs-chatgpt": "Perplexity vs ChatGPT Full Comparison",
    "copilot-vs-chatgpt": "Copilot vs ChatGPT Comparison Guide",
    "google-ai-overviews-guide": "Google AI Overviews Guide for Search",
    "google-ai-mode-guide": "Google AI Mode Guide: Ranking Tips (2026)",
    "ai-agents-for-beginners": "AI Agents for Beginners: Starter Guide (2026)",
    "best-ai-agents-for-business": "Best AI Agents for Business Guide 2026",
    "chatgpt-prompts-for-marketing": "ChatGPT Prompts for Marketing Teams",
    "chatgpt-prompts-for-sales": "ChatGPT Prompts for Sales Teams (2026)",
    "best-ai-tools-for-lead-generation": "Best AI Tools for Lead Generation Guide",
    "best-ai-tools-for-seo": "Best AI Tools for SEO Rankings (2026)",
    "best-ai-tools-for-aeo": "Best AI Tools for AEO Strategy (2026)",
    "best-ai-tools-for-geo": "Best AI Tools for GEO Strategy (2026)",
    "how-to-rank-in-chatgpt": "How to Rank in ChatGPT Results Guide",
    "how-to-rank-in-google-ai-overviews": "How to Rank in Google AI Overviews Guide",
    "how-to-rank-in-google-ai-mode": "How to Rank in Google AI Mode Guide",
    "how-to-get-cited-by-ai-tools": "How to Get Cited by AI Tools in 2026",
  };

  if (shortHighIntentMap[slug]) {
    return shortHighIntentMap[slug];
  }

  const rolloutIntentAudienceOutcome = slug.match(/^(best|top|guide|how-to)-(.+)-for-(.+)-(seo|aeo|geo|productivity|content-creation|lead-generation|client-work|career-growth|portfolio-building|earning|automation)$/);
  if (rolloutIntentAudienceOutcome) {
    const intent = rolloutIntentAudienceOutcome[1];
    const family = compactFamilyLabel(rolloutIntentAudienceOutcome[2]);
    const audience = normalizeAudienceLabel(rolloutIntentAudienceOutcome[3]);
    const outcome = compactFamilyLabel(rolloutIntentAudienceOutcome[4]);

    if (intent === "best") return `Best ${family} for ${audience}: ${outcome} Guide (2026)`;
    if (intent === "top") return `Top ${family} for ${audience}: ${outcome} Guide (2026)`;
    if (intent === "guide") return `${family} for ${audience}: ${outcome} Guide (2026)`;
    return `How to Use ${family} for ${audience} ${outcome} (2026)`;
  }

  const rolloutNestedAudienceStage = slug.match(/^(.*)-for-(students|freelancers|creators)-([a-z-]+)-(for-freshers|without-experience)$/);
  if (rolloutNestedAudienceStage) {
    const family = compactFamilyLabel(rolloutNestedAudienceStage[1]);
    const audience = normalizeAudienceLabel(rolloutNestedAudienceStage[2]);
    const problem = compactFamilyLabel(rolloutNestedAudienceStage[3]);
    const rawStage = rolloutNestedAudienceStage[4];
    const stage = rawStage === "without-experience" ? "No Experience" : "Freshers";
    const duplicateAudience = family.toLowerCase().includes(audience.toLowerCase());
    if (duplicateAudience) return `${family}: ${problem} (${stage})`;
    return `${family}: ${problem} for ${audience} (${stage})`;
  }

  const rolloutProblemCityYear = slug.match(/^(.+)-([a-z-]+)-in-([a-z-]+)-(20\d{2})$/);  if (rolloutProblemCityYear) {
    const family = compactFamilyLabel(rolloutProblemCityYear[1]);
    const problem = compactFamilyLabel(rolloutProblemCityYear[2]);
    const city = normalizeAudienceLabel(rolloutProblemCityYear[3]);
    const matchedYear = rolloutProblemCityYear[4];
    return `${family} ${problem} in ${city}: Guide (${matchedYear})`;
  }

  if (slug.includes("-vs-")) {
    return slug.split("-vs-").map(toTitleCase).join(" vs ");
  }

  const businessIdeas = captureFamilyAudience("business-ideas-using");
  if (businessIdeas) {
    return `${businessIdeas.family} Business Ideas for ${businessIdeas.audience} (${businessIdeas.year})`;
  }

  const essentialSkills = captureFamilyAudience("essential-skills-for");
  if (essentialSkills) {
    return `${essentialSkills.family} Skills for ${essentialSkills.audience} (${essentialSkills.year})`;
  }

  const portfolioGuide = captureFamilyAudience("portfolio-building-for");
  if (portfolioGuide) {
    return `${portfolioGuide.family} Portfolio Guide for ${portfolioGuide.audience} (${portfolioGuide.year})`;
  }

  const interviewQuestions = captureFamilyAudience("interview-questions-for");
  if (interviewQuestions) {
    return `${interviewQuestions.family} Interview Questions for ${interviewQuestions.audience} (${interviewQuestions.year})`;
  }

  const salaryGuide = captureFamilyAudience("salary-guide-for");
  if (salaryGuide) {
    return `${salaryGuide.family} Salary Guide for ${salaryGuide.audience} (${salaryGuide.year})`;
  }

  const workflowAutomation = captureFamilyAudience("workflow-automation-with");
  if (workflowAutomation) {
    return `${workflowAutomation.family} Workflow Automation for ${workflowAutomation.audience} (${workflowAutomation.year})`;
  }

  const stepGuide = captureFamilyAudience("step-by-step-tutorial-for");
  if (stepGuide) {
    return `${stepGuide.family} for ${stepGuide.audience}: Step Guide (${stepGuide.year})`;
  }

  const completeGuide = captureFamilyAudience("complete-guide-to");
  if (completeGuide) {
    return `${completeGuide.family} Guide for ${completeGuide.audience} (${completeGuide.year})`;
  }

  const commonMistakes = captureFamilyAudience("common-mistakes-in");
  if (commonMistakes) {
    return `${commonMistakes.family} Mistakes for ${commonMistakes.audience} (${commonMistakes.year})`;
  }

  const beginnerMistakes = captureFamilyAudience("beginner-mistakes-in");
  if (beginnerMistakes) {
    return `${beginnerMistakes.family} Mistakes (${beginnerMistakes.year})`;
  }

  const advancedTechniques = captureFamilyAudience("advanced-techniques-in");
  if (advancedTechniques) {
    return `Advanced ${advancedTechniques.family} for ${advancedTechniques.audience} (${advancedTechniques.year})`;
  }

  const getClients = captureFamilyAudience("how-to-get-clients-with");
  if (getClients) {
    return `Get Clients with ${getClients.family} for ${getClients.audience} (${getClients.year})`;
  }

  const earnWith = captureFamilyAudience("how-to-earn-with");
  if (earnWith) {
    return `Earn with ${earnWith.family} (${earnWith.year})`;
  }

  const growUsing = captureFamilyAudience("how-to-grow-using");
  if (growUsing) {
    return `Grow with ${growUsing.family} for ${growUsing.audience} (${growUsing.year})`;
  }

  const bestCourses = captureFamilyAudience("best-courses-for");
  if (bestCourses) {
    return `Best ${bestCourses.family} Courses (${bestCourses.year})`;
  }

  const freeResources = captureFamilyAudience("free-resources-for");
  if (freeResources) {
    return `Free ${freeResources.family} Resources Guide (${freeResources.year})`;
  }

  const bestPractices = captureFamilyAudience("best-practices-in");
  if (bestPractices) {
    return `${bestPractices.family} Best Practices (${bestPractices.year})`;
  }

  const caseStudies = captureFamilyAudience("case-studies-in");
  if (caseStudies) {
    return `${caseStudies.family} Case Studies (${caseStudies.year})`;
  }

  const paidVsFree = captureFamilyAudience("paid-vs-free-in");
  if (paidVsFree) {
    return `${paidVsFree.family}: Paid vs Free (${paidVsFree.year})`;
  }

  const prosCons = captureFamilyAudience("pros-and-cons-of");
  if (prosCons) {
    return `${prosCons.family}: Pros and Cons (${prosCons.year})`;
  }

  const certification = captureFamilyAudience("certification-in");
  if (certification) {
    return `${certification.family} Certification Guide (${certification.year})`;
  }

  const bestProjects = captureFamilyAudience("best-projects-in");
  if (bestProjects) {
    return `Best ${bestProjects.family} Projects (${bestProjects.year})`;
  }

  const sideHustle = captureFamilyAudience("side-hustle-with");
  if (sideHustle) {
    return `${sideHustle.family} Side Hustle Ideas (${sideHustle.year})`;
  }

  const moneyMaking = captureFamilyAudience("money-making-with");
  if (moneyMaking) {
    return `Make Money with ${moneyMaking.family} (${moneyMaking.year})`;
  }

  const resumeTips = captureFamilyAudience("resume-tips-for");
  if (resumeTips) {
    return `${resumeTips.family} Resume Tips for ${resumeTips.audience} (${resumeTips.year})`;
  }

  const jobsIn = captureFamilyAudience("jobs-in");
  if (jobsIn) {
    return `${jobsIn.family} Jobs for ${jobsIn.audience} (${jobsIn.year})`;
  }

  const freelancingWith = captureFamilyAudience("freelancing-with");
  if (freelancingWith) {
    return `Freelancing with ${freelancingWith.family} (${freelancingWith.year})`;
  }

  if (slug.startsWith("best-")) {
    const cleaned = slug.replace(/^best-/, "");
    return `Best ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("top-")) {
    const cleaned = slug.replace(/^top-/, "");
    return `Top ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("how-to-")) {
    const cleaned = slug.replace(/^how-to-/, "");
    return `How to ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("guide-")) {
    const cleaned = slug.replace(/^guide-/, "");
    return `${toTitleCase(cleaned)} Guide`;
  }

  if (slug.startsWith("step-by-step-tutorial-for-")) {
    const cleaned = slug.replace(/^step-by-step-tutorial-for-/, "");
    return `${toTitleCase(cleaned)}: Step-by-Step Guide`;
  }

  if (slug.startsWith("essential-skills-for-")) {
    const cleaned = slug.replace(/^essential-skills-for-/, "");
    return `Essential ${toTitleCase(cleaned)} Skills`;
  }

  if (slug.startsWith("business-ideas-using-")) {
    const cleaned = slug.replace(/^business-ideas-using-/, "");
    return `Business Ideas Using ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("portfolio-building-for-")) {
    const cleaned = slug.replace(/^portfolio-building-for-/, "");
    return `${toTitleCase(cleaned)} Portfolio Guide`;
  }

  if (slug.startsWith("interview-questions-for-")) {
    const cleaned = slug.replace(/^interview-questions-for-/, "");
    return `${toTitleCase(cleaned)} Interview Questions`;
  }

  if (slug.startsWith("workflow-automation-with-")) {
    const cleaned = slug.replace(/^workflow-automation-with-/, "");
    return `${toTitleCase(cleaned)} Workflow Automation`;
  }

  if (slug.startsWith("salary-guide-for-")) {
    const cleaned = slug.replace(/^salary-guide-for-/, "");
    return `${toTitleCase(cleaned)} Salary Guide`;
  }

  if (slug.startsWith("freelancing-with-")) {
    const cleaned = slug.replace(/^freelancing-with-/, "");
    return `Freelancing with ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("money-making-with-")) {
    const cleaned = slug.replace(/^money-making-with-/, "");
    return `Make Money with ${toTitleCase(cleaned)}`;
  }

  if (slug.startsWith("career-options-in-")) {
    const cleaned = slug.replace(/^career-options-in-/, "");
    return `${toTitleCase(cleaned)} Career Options`;
  }

  const plain = toTitleCase(slug);
  if (year && !plain.includes(year)) {
    return `${plain} in ${year}`;
  }

  return plain;
}

function normalizeTitle(title) {
  return title
    .replace(/\s+/g, " ")
    .replace(/\bSeo\b/g, "SEO")
    .replace(/\bAeo\b/g, "AEO")
    .replace(/\bGeo\b/g, "GEO")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bChatgpt\b/g, "ChatGPT")
    .replace(/\bGemini\b/g, "Gemini")
    .replace(/\bClaude Ai\b/g, "Claude AI")
    .replace(/\bGoogle Ai\b/g, "Google AI")
    .trim();
}

function shouldOptimize(title) {
  const clean = (title || "").trim();
  if (!clean) return true;
  if (clean.length < 35) return true;
  if (clean.length > 68) return true;
  if (/^step by step tutorial for /i.test(clean)) return true;
  if (/^essential skills for /i.test(clean)) return true;
  if (/^business ideas using /i.test(clean)) return true;
  if (/^portfolio building for /i.test(clean)) return true;
  if (/^interview questions for /i.test(clean)) return true;
  if (/^workflow automation with /i.test(clean)) return true;
  if (/^salary guide for /i.test(clean)) return true;
  if ((clean.match(/\bfor\b/gi) || []).length >= 3) return true;
  return false;
}

function trimTitle(title) {
  if (title.length <= 68) return title;

  return title
    .replace(/\s+for Working Professionals/gi, "")
    .replace(/\s+for Professionals/gi, "")
    .replace(/\s+for Small Business Owners/gi, "")
    .replace(/\s+for Business Owners/gi, "")
    .replace(/\s+for Content Creators/gi, "")
    .replace(/\s+for College Students/gi, "")
    .replace(/\s+for Students/gi, "")
    .replace(/\s+for Instagram Creators/gi, "")
    .replace(/\s+for Creators/gi, "")
    .replace(/\s+\(2026\)$/i, " (2026)")
    .replace(/\s+in 2026$/i, " in 2026")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 68)
    .replace(/[\s:-]+$/, "");
}

function main() {
  const blogs = readBlogs();
  const existingTitles = new Set(blogs.map((blog) => (blog.title || "").trim().toLowerCase()));
  const updated = [];
  let changed = 0;

  for (const blog of blogs) {
    const currentTitle = (blog.title || "").trim();
    if (!shouldOptimize(currentTitle)) {
      updated.push(blog);
      continue;
    }

    existingTitles.delete(currentTitle.toLowerCase());

    let nextTitle = normalizeTitle(buildBetterTitleFromSlug(blog.slug));
    nextTitle = trimTitle(nextTitle);

    if (!nextTitle || existingTitles.has(nextTitle.toLowerCase())) {
      existingTitles.add(currentTitle.toLowerCase());
      updated.push(blog);
      continue;
    }

    existingTitles.add(nextTitle.toLowerCase());
    updated.push({ ...blog, title: nextTitle });
    changed += 1;
  }

  writeBlogs(updated);

  console.log(`Optimized titles: ${changed}`);
  console.log(`Blog count unchanged: ${updated.length}`);
}

main();
