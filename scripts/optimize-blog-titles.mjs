import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BLOGS_PATH = path.join(ROOT, "data", "blogs.json");

function readBlogs() {
  try {
    return JSON.parse(fs.readFileSync(BLOGS_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeBlogs(blogs) {
  fs.writeFileSync(BLOGS_PATH, JSON.stringify(blogs, null, 2));
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
    "chatgpt-se-resume-kaise-banaye": "ChatGPT Se Resume Kaise Banaye: Practical Guide",
    "ai-se-freelancing-kaise-start-kare": "AI Se Freelancing Kaise Start Kare in 2026",
    "ai-se-paise-kaise-kamaye": "AI Se Paise Kaise Kamaye in 2026",
    "students-ke-liye-best-ai-tools": "Students Ke Liye Best AI Tools in 2026",
    "beginners-ke-liye-ai-prompts": "Beginners Ke Liye AI Prompts Guide",
    "ai-se-padhai-kaise-kare": "AI Se Padhai Kaise Kare in 2026",
    "chatgpt-ka-use-kaise-kare": "ChatGPT Ka Use Kaise Kare: Beginner Guide",
    "freelancers-ke-liye-ai-workflow": "Freelancers Ke Liye AI Workflow Guide",
    "business-owners-ke-liye-ai-tools": "Business Owners Ke Liye AI Tools in 2026",
    "ai-tools-for-students": "AI Tools for Students in 2026",
    "best-ai-tools-for-students": "Best AI Tools for Students in 2026",
    "chatgpt-for-students": "ChatGPT for Students in 2026",
    "google-gemini-for-students": "Google Gemini for Students in 2026",
    "claude-for-students": "Claude for Students in 2026",
    "best-chatgpt-prompts-for-students": "Best ChatGPT Prompts for Students",
    "ai-tools-for-freelancers": "AI Tools for Freelancers in 2026",
    "chatgpt-for-freelancers": "ChatGPT for Freelancers in 2026",
    "ai-tools-for-creators": "AI Tools for Creators in 2026",
    "best-ai-tools-for-creators": "Best AI Tools for Creators in 2026",
    "chatgpt-for-content-creation": "ChatGPT for Content Creation Guide",
    "gemini-vs-chatgpt": "Gemini vs ChatGPT Comparison",
    "claude-vs-chatgpt": "Claude vs ChatGPT Comparison",
    "perplexity-vs-chatgpt": "Perplexity vs ChatGPT Comparison",
    "copilot-vs-chatgpt": "Copilot vs ChatGPT Comparison",
    "google-ai-overviews-guide": "Google AI Overviews Guide for 2026",
    "google-ai-mode-guide": "Google AI Mode Guide for 2026",
    "ai-agents-for-beginners": "AI Agents for Beginners in 2026",
    "best-ai-agents-for-business": "Best AI Agents for Business in 2026",
    "chatgpt-prompts-for-marketing": "ChatGPT Prompts for Marketing Teams",
    "chatgpt-prompts-for-sales": "ChatGPT Prompts for Sales Teams",
    "best-ai-tools-for-lead-generation": "Best AI Tools for Lead Generation",
    "best-ai-tools-for-seo": "Best AI Tools for SEO in 2026",
    "best-ai-tools-for-aeo": "Best AI Tools for AEO in 2026",
    "best-ai-tools-for-geo": "Best AI Tools for GEO in 2026",
    "how-to-rank-in-chatgpt": "How to Rank in ChatGPT Results",
    "how-to-rank-in-google-ai-overviews": "How to Rank in Google AI Overviews",
    "how-to-rank-in-google-ai-mode": "How to Rank in Google AI Mode",
    "how-to-get-cited-by-ai-tools": "How to Get Cited by AI Tools",
  };

  if (shortHighIntentMap[slug]) {
    return shortHighIntentMap[slug];
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
    return `Beginner ${beginnerMistakes.family} Mistakes (${beginnerMistakes.year})`;
  }

  const advancedTechniques = captureFamilyAudience("advanced-techniques-in");
  if (advancedTechniques) {
    return `Advanced ${advancedTechniques.family} Techniques (${advancedTechniques.year})`;
  }

  const getClients = captureFamilyAudience("how-to-get-clients-with");
  if (getClients) {
    return `Get Clients with ${getClients.family} (${getClients.year})`;
  }

  const earnWith = captureFamilyAudience("how-to-earn-with");
  if (earnWith) {
    return `Earn with ${earnWith.family} (${earnWith.year})`;
  }

  const growUsing = captureFamilyAudience("how-to-grow-using");
  if (growUsing) {
    return `Grow with ${growUsing.family} (${growUsing.year})`;
  }

  const bestCourses = captureFamilyAudience("best-courses-for");
  if (bestCourses) {
    return `Best ${bestCourses.family} Courses (${bestCourses.year})`;
  }

  const freeResources = captureFamilyAudience("free-resources-for");
  if (freeResources) {
    return `Free ${freeResources.family} Resources (${freeResources.year})`;
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
  if (clean.length < 35 && !/kaise|liye/i.test(clean)) return true;
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
