export interface BasicKeywordSeed {
  slug: string;
  keyword: string;
  title: string;
  category: string;
  searchIntent: "what_is" | "how_to" | "best" | "top" | "free" | "guide";
  audience?: string;
  year?: string;
}

const topics = [
  { base: "ai course", category: "AI Course" },
  { base: "ai classes", category: "AI Classes" },
  { base: "ai learning", category: "AI Learning" },
  { base: "ai training", category: "AI Training" },
  { base: "ai masterclass", category: "AI Masterclass" },
  { base: "ai expert", category: "AI Expert" },
  { base: "ai tools", category: "AI Tools" },
  { base: "ai jobs", category: "AI Jobs" },
  { base: "ai skills", category: "AI Skills" },
  { base: "ai automation", category: "AI Automation" },
  { base: "ai career", category: "AI Career" },
  { base: "ai freelancing", category: "AI Freelancing" },
  { base: "ai work from home", category: "AI Work" },
  { base: "ai without coding", category: "AI Without Coding" },
  { base: "best ai tools", category: "Best AI Tools" },
  { base: "free ai tools", category: "Free AI Tools" },
  { base: "best ai skills", category: "Best AI Skills" },
  { base: "ai jobs without coding", category: "AI Jobs" },
  { base: "ai tools for students", category: "AI Tools" },
  { base: "ai tools for freelancers", category: "AI Tools" },
  { base: "ai tools for business", category: "AI Tools" },
  { base: "ai tools for marketing", category: "AI Tools" },
  { base: "ai tools for creators", category: "AI Tools" },
  { base: "ai tools for video editing", category: "AI Tools" },
  { base: "ai skills for jobs", category: "AI Skills" },
];

const audiences = [
  "beginners",
  "students",
  "freelancers",
  "job-seekers",
  "working-professionals",
];

const howToTopics = [
  "learn-ai",
  "use-ai",
  "start-ai-career",
  "start-ai-freelancing",
  "use-ai-tools",
  "learn-ai-without-coding",
  "use-ai-for-work",
  "build-ai-skills",
];

const hindiIntentTopics = [
  "ai-kaise-seekhe",
  "ai-ka-use-kaise-kare",
  "ai-tools-kaise-use-kare",
  "ai-se-kaam-kaise-kare",
  "ai-se-paise-kaise-kamaye",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const seeds: BasicKeywordSeed[] = [];

// Layer 1: base keywords
for (const topic of topics) {
  const baseSlug = slugify(topic.base);

  seeds.push({
    slug: baseSlug,
    keyword: topic.base,
    title: toTitleCase(baseSlug),
    category: topic.category,
    searchIntent: "guide",
  });

  seeds.push({
    slug: `what-is-${baseSlug}`,
    keyword: `what is ${topic.base}`,
    title: `What Is ${toTitleCase(baseSlug)}`,
    category: topic.category,
    searchIntent: "what_is",
  });

  seeds.push({
    slug: `best-${baseSlug}`,
    keyword: `best ${topic.base}`,
    title: `Best ${toTitleCase(baseSlug)}`,
    category: topic.category,
    searchIntent: "best",
  });

  seeds.push({
    slug: `top-${baseSlug}-in-2026`,
    keyword: `top ${topic.base} in 2026`,
    title: `Top ${toTitleCase(baseSlug)} in 2026`,
    category: topic.category,
    searchIntent: "top",
    year: "2026",
  });
}

// Layer 2: audience variants
for (const topic of topics) {
  const baseSlug = slugify(topic.base);

  for (const audience of audiences) {
    seeds.push({
      slug: `${baseSlug}-for-${audience}`,
      keyword: `${topic.base} for ${audience.replace(/-/g, " ")}`,
      title: `${toTitleCase(baseSlug)} for ${toTitleCase(audience)}`,
      category: topic.category,
      searchIntent: "guide",
      audience,
    });

    seeds.push({
      slug: `best-${baseSlug}-for-${audience}`,
      keyword: `best ${topic.base} for ${audience.replace(/-/g, " ")}`,
      title: `Best ${toTitleCase(baseSlug)} for ${toTitleCase(audience)}`,
      category: topic.category,
      searchIntent: "best",
      audience,
    });

    seeds.push({
      slug: `${baseSlug}-for-${audience}-in-2026`,
      keyword: `${topic.base} for ${audience.replace(/-/g, " ")} in 2026`,
      title: `${toTitleCase(baseSlug)} for ${toTitleCase(audience)} in 2026`,
      category: topic.category,
      searchIntent: "top",
      audience,
      year: "2026",
    });
  }
}

// Layer 3: how-to keywords
for (const item of howToTopics) {
  const slug = `how-to-${item}`;
  seeds.push({
    slug,
    keyword: slug.replace(/-/g, " "),
    title: toTitleCase(slug),
    category: "How To AI",
    searchIntent: "how_to",
  });
}

// Layer 4: Hindi/Hinglish public-intent keywords
for (const item of hindiIntentTopics) {
  seeds.push({
    slug: item,
    keyword: item.replace(/-/g, " "),
    title: toTitleCase(item),
    category: "AI Hinglish Search",
    searchIntent: "guide",
  });
}

// Layer 5: extra high-intent basic pages
const directExtras: BasicKeywordSeed[] = [
  {
    slug: "ai-for-beginners",
    keyword: "ai for beginners",
    title: "AI for Beginners",
    category: "Beginners",
    searchIntent: "guide",
    audience: "beginners",
  },
  {
    slug: "ai-for-students",
    keyword: "ai for students",
    title: "AI for Students",
    category: "Students",
    searchIntent: "guide",
    audience: "students",
  },
  {
    slug: "ai-for-freelancers",
    keyword: "ai for freelancers",
    title: "AI for Freelancers",
    category: "Freelancers",
    searchIntent: "guide",
    audience: "freelancers",
  },
  {
    slug: "ai-for-job-seekers",
    keyword: "ai for job seekers",
    title: "AI for Job Seekers",
    category: "Careers",
    searchIntent: "guide",
    audience: "job-seekers",
  },
  {
    slug: "ai-for-business",
    keyword: "ai for business",
    title: "AI for Business",
    category: "Business",
    searchIntent: "guide",
  },
  {
    slug: "ai-for-creators",
    keyword: "ai for creators",
    title: "AI for Creators",
    category: "Creators",
    searchIntent: "guide",
  },
  {
    slug: "ai-for-marketers",
    keyword: "ai for marketers",
    title: "AI for Marketers",
    category: "Marketing",
    searchIntent: "guide",
  },
  {
    slug: "ai-for-working-professionals",
    keyword: "ai for working professionals",
    title: "AI for Working Professionals",
    category: "Professionals",
    searchIntent: "guide",
    audience: "working-professionals",
  },
  {
    slug: "best-ai-tools-in-2026",
    keyword: "best ai tools in 2026",
    title: "Best AI Tools in 2026",
    category: "AI Tools 2026",
    searchIntent: "best",
    year: "2026",
  },
  {
    slug: "best-ai-skills-in-2026",
    keyword: "best ai skills in 2026",
    title: "Best AI Skills in 2026",
    category: "AI Skills 2026",
    searchIntent: "best",
    year: "2026",
  },
  {
    slug: "ai-jobs-in-2026",
    keyword: "ai jobs in 2026",
    title: "AI Jobs in 2026",
    category: "AI Jobs 2026",
    searchIntent: "top",
    year: "2026",
  },
  {
    slug: "ai-tools-for-beginners-in-2026",
    keyword: "ai tools for beginners in 2026",
    title: "AI Tools for Beginners in 2026",
    category: "Beginners",
    searchIntent: "top",
    audience: "beginners",
    year: "2026",
  },
  {
    slug: "free-ai-tools-in-2026",
    keyword: "free ai tools in 2026",
    title: "Free AI Tools in 2026",
    category: "Free AI Tools",
    searchIntent: "free",
    year: "2026",
  },
  {
    slug: "ai-side-hustle",
    keyword: "ai side hustle",
    title: "AI Side Hustle",
    category: "AI Income",
    searchIntent: "guide",
  },
  {
    slug: "ai-career-for-beginners",
    keyword: "ai career for beginners",
    title: "AI Career for Beginners",
    category: "AI Career",
    searchIntent: "guide",
    audience: "beginners",
  },
];

const merged = [...seeds, ...directExtras];

const uniqueMap = new Map<string, BasicKeywordSeed>();
for (const item of merged) {
  if (!uniqueMap.has(item.slug)) {
    uniqueMap.set(item.slug, item);
  }
}

export const basicKeywordSeeds: BasicKeywordSeed[] = Array.from(uniqueMap.values()).sort((a, b) =>
  a.slug.localeCompare(b.slug)
);
