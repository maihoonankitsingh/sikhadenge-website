import fs from "fs";
import path from "path";
import type {
  GeneratedFaq,
  GeneratedHighlight,
  GeneratedStep,
  GeneratedTool,
  GeneratedJourneyStep,
  GeneratedComparisonTable,
  GeneratedLink,
} from "../components/generated/GeneratedPageKit";
import { getCityFact, type CityFact } from "./cityFacts";

export type SeoEntry = {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  familyKey?: string;
  rootSlug?: string;
  templateType?: string;
  topicLabel?: string;
  primaryIntent?: string;
  pageKind?: string;
  ctaMode?: string;
  relatedFamilies?: string[];
  sitemapGroup?: string;
  skill?: string;
  city?: string;
  industry?: string;
  category?: string;
  tool?: string;
  dynamicValues?: {
    topicLabel?: string;
    audience?: string;
    city?: string;
    location?: string;
    usecase?: string;
    modifier?: string;
    tool?: string;
    intent?: string;
    category?: string;
  };
};

type ContentMode = "city" | "combo" | "audience" | "roadmap" | "career" | "question" | "comparison" | "tool" | "root";

const GENERIC_CITY_VALUES = new Set(["", "india", "online", "remote", "national"]);
const GENERIC_USECASE_VALUES = new Set(["", "practical work"]);
const GENERIC_MODIFIER_VALUES = new Set(["", "practical guide"]);

// Dataset gap: for ~23,000 slugs the "-in-{city}" suffix is a real Indian
// city (e.g. "...-in-mumbai") but dynamicValues.city was left as the
// generic "India" default. Fall back to parsing the slug itself so the
// city that is actually in the URL still shows up in title/content.
const KNOWN_CITIES = new Set([
  "agra", "ahmedabad", "ajmer", "aligarh", "allahabad", "ambala", "amritsar", "anand", "asansol",
  "aurangabad", "bangalore", "bareilly", "beawar", "belgaum", "berhampur", "bhagalpur", "bhatinda",
  "bhilai", "bhopal", "bhubaneswar", "bilaspur", "bokaro", "calicut", "chandigarh", "chennai",
  "coimbatore", "cuttack", "darbhanga", "davangere", "dehradun", "delhi", "dhanbad", "durg",
  "durgapur", "erode", "faizabad", "faridabad", "firozabad", "gaya", "ghaziabad", "goa", "gorakhpur",
  "gurgaon", "guwahati", "gwalior", "haldwani", "haridwar", "hisar", "hubli", "hyderabad", "indore",
  "jaipur", "jalandhar", "jalgaon", "jammu", "jamshedpur", "jhansi", "kakinada", "kannur", "kanpur",
  "karnal", "kochi", "kolhapur", "kolkata", "korba", "kota", "kozhikode", "lucknow", "ludhiana",
  "madurai", "malegaon", "mathura", "meerut", "mohali", "moradabad", "mumbai", "muzaffarpur",
  "mysore", "nagpur", "nashik", "nellore", "noida", "panipat", "pathankot", "patna", "prayagraj",
  "pune", "raipur", "rajkot", "ranchi", "rewari", "rohtak", "rudrapur", "satna", "shimla", "siliguri",
  "sirsa", "solan", "sonipat", "surat", "thane", "tirupati", "trichy", "trivandrum", "udaipur",
  "vadodara", "varanasi", "vijayawada", "visakhapatnam", "warangal", "yamunanagar",
]);

function extractCityFromSlug(slug: string): string | null {
  const match = slug.match(/-in-([a-z]+)$/i);
  if (!match) return null;
  const candidate = match[1].toLowerCase();
  return KNOWN_CITIES.has(candidate) ? toTitle(candidate) : null;
}

let _entryCache: SeoEntry[] | null = null;

export function getAllGeneratedEntries(): SeoEntry[] {
  if (_entryCache) return _entryCache;
  for (const rel of ["data/generated-seo-merged.json", "data/generated-seo.json"]) {
    try {
      const raw = fs.readFileSync(path.join(process.cwd(), rel), "utf8");
      const parsed = JSON.parse(raw);
      _entryCache = Array.isArray(parsed) ? parsed : Object.values(parsed);
      return _entryCache!;
    } catch {}
  }
  _entryCache = [];
  return _entryCache;
}

export function findGeneratedEntry(slug: string): SeoEntry | null {
  return getAllGeneratedEntries().find((entry) => entry.slug === slug) ?? null;
}

const KNOWN_ACRONYMS = /\b(Ai|Seo|Ui|Ux|Ml|Api|Crm|Faq)\b/g;
const ACRONYM_MAP: Record<string, string> = {
  Ai: "AI",
  Seo: "SEO",
  Ui: "UI",
  Ux: "UX",
  Ml: "ML",
  Api: "API",
  Crm: "CRM",
  Faq: "FAQ",
};

export function toTitle(value?: string) {
  if (!value) return "";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(KNOWN_ACRONYMS, (match) => ACRONYM_MAP[match] ?? match);
}

// Deterministic 32-bit string hash (djb2 variant) — same slug always
// produces the same content across builds/ISR revalidations.
function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return hash >>> 0;
}

function seededRandom(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const rng = seededRandom(seed);
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickDeterministic<T>(pool: T[], count: number, seed: number): T[] {
  if (pool.length <= count) return pool;
  return seededShuffle(pool, seed).slice(0, count);
}

// Same selection as pickDeterministic, but the chosen items keep their
// original relative order — for content where sequence matters (e.g. a
// numbered roadmap), picking a varied subset must not scramble the steps.
function pickDeterministicOrdered<T>(pool: T[], count: number, seed: number): T[] {
  if (pool.length <= count) return pool;
  const indexed = pool.map((item, index) => ({ item, index }));
  const chosenIndexes = new Set(
    seededShuffle(indexed, seed)
      .slice(0, count)
      .map((entry) => entry.index),
  );
  return pool.filter((_, index) => chosenIndexes.has(index));
}

function pickOne<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

export type ResolvedFields = {
  topic: string;
  city: string;
  citySlug: string;
  cityIsSpecific: boolean;
  cityFact: CityFact | null;
  audience: string;
  audienceIsSpecific: boolean;
  usecase: string;
  usecaseIsSpecific: boolean;
  modifier: string;
  modifierIsSpecific: boolean;
  family: string;
  mode: ContentMode;
  seed: number;
};

function normalizeKind(pageKind?: string) {
  return (pageKind || "").toLowerCase().replace(/_(batch\d+|final)$/i, "");
}

export function resolveFields(entry: SeoEntry, fallbackSlug: string): ResolvedFields {
  const rawTopic =
    entry.dynamicValues?.topicLabel ??
    entry.dynamicValues?.tool ??
    entry.tool ??
    entry.topicLabel ??
    entry.skill ??
    entry.title?.replace(/\s+\|\s+Sikhadenge$/i, "").replace(/\s+Guide( in \d{4})?$/i, "") ??
    toTitle(fallbackSlug);

  const rawCityFromData = entry.dynamicValues?.city ?? entry.dynamicValues?.location ?? entry.city ?? "";
  const cityFromDataIsSpecific = !GENERIC_CITY_VALUES.has(rawCityFromData.trim().toLowerCase());
  const cityFromSlug = extractCityFromSlug(fallbackSlug);
  const rawCity = cityFromDataIsSpecific ? rawCityFromData : cityFromSlug ?? rawCityFromData;

  const rawAudience = entry.dynamicValues?.audience ?? "";
  const rawUsecase = entry.dynamicValues?.usecase ?? "";
  const rawModifier = entry.dynamicValues?.modifier ?? "";
  const family = toTitle(entry.familyKey || entry.rootSlug || rawTopic);

  const cityIsSpecific = cityFromDataIsSpecific || Boolean(cityFromSlug);
  const audienceIsSpecific = rawAudience.trim().length > 0;
  const usecaseIsSpecific = !GENERIC_USECASE_VALUES.has(rawUsecase.trim().toLowerCase());
  const modifierIsSpecific = !GENERIC_MODIFIER_VALUES.has(rawModifier.trim().toLowerCase());

  const kind = normalizeKind(entry.pageKind);
  const intent = (entry.primaryIntent || "").toLowerCase();

  let mode: ContentMode = "root";
  if (kind.includes("roadmap")) mode = "roadmap";
  else if (kind.includes("career") || kind.includes("salary") || intent === "career") mode = "career";
  else if (kind.includes("question") || kind.includes("commercial_intent")) mode = "question";
  else if (kind.includes("comparison")) mode = "comparison";
  else if (cityIsSpecific && audienceIsSpecific) mode = "combo";
  else if (cityIsSpecific) mode = "city";
  else if (audienceIsSpecific) mode = "audience";
  else if (kind.includes("tool") || usecaseIsSpecific || modifierIsSpecific) mode = "tool";
  else mode = "root";

  const citySlug = cityIsSpecific ? rawCity.trim().toLowerCase().replace(/\s+/g, "") : "";
  const cityFact = citySlug ? getCityFact(citySlug) : null;

  return {
    topic: toTitle(rawTopic) || toTitle(fallbackSlug),
    city: toTitle(rawCity),
    citySlug,
    cityIsSpecific,
    cityFact,
    audience: audienceIsSpecific ? toTitle(rawAudience) : "students, freelancers, and working professionals",
    audienceIsSpecific,
    usecase: usecaseIsSpecific ? toTitle(rawUsecase) : "",
    usecaseIsSpecific,
    modifier: modifierIsSpecific ? toTitle(rawModifier) : "",
    modifierIsSpecific,
    family,
    mode,
    seed: hashString(fallbackSlug),
  };
}

function locationClause(fields: ResolvedFields, preposition = "in") {
  return fields.cityIsSpecific ? ` ${preposition} ${fields.city}` : "";
}

function audienceClause(fields: ResolvedFields) {
  return fields.audienceIsSpecific ? ` for ${fields.audience}` : "";
}

// ---------- Meta title / description ----------

export function uniqueTitle(entry: SeoEntry, fields: ResolvedFields): string {
  if (entry.metaTitle) return entry.metaTitle.replace(/\s+\|\s+Sikhadenge$/i, "");

  // When the URL is city-specific, every variant keeps the city so the
  // title still matches "{topic} {city}" search intent — only the
  // phrasing/word order varies for uniqueness.
  const variants = fields.cityIsSpecific
    ? [
        `${fields.topic} in ${fields.city}${audienceClause(fields)}`,
        `${fields.topic} Classes in ${fields.city}`,
        `Best ${fields.topic} Guide for ${fields.city}`,
        fields.audienceIsSpecific ? `${fields.topic} for ${fields.audience} in ${fields.city}` : `${fields.topic}: ${fields.city} Roadmap`,
      ]
    : [
        `${fields.topic}${audienceClause(fields)}`,
        `${fields.topic} Guide`,
        fields.audienceIsSpecific ? `${fields.topic} for ${fields.audience}` : `Learn ${fields.topic} Practically`,
        fields.usecaseIsSpecific ? `${fields.topic} for ${fields.usecase}` : `${fields.topic}: Practical Roadmap`,
      ];

  const unique = variants.filter((value, index, all) => value.trim().length > 0 && all.indexOf(value) === index);
  return pickOne(unique, fields.seed);
}

export function uniqueDescription(entry: SeoEntry, fields: ResolvedFields): string {
  if (entry.metaDescription) return entry.metaDescription;

  const variants = [
    `Practical ${fields.topic} guide${locationClause(fields)}${audienceClause(fields)} — workflow, tools, FAQs, and a clear next step from Sikhadenge.`,
    `Understand ${fields.topic}${locationClause(fields)}: what it means, who it is for, the learning path, common mistakes, and answers to real questions.`,
    fields.cityIsSpecific
      ? `A structured ${fields.topic} guide for readers in ${fields.city} — skills, workflow, realistic expectations, and FAQs. No unverifiable local claims.`
      : `A structured ${fields.topic} guide covering skills, workflow, realistic expectations, and FAQs from the Sikhadenge editorial team.`,
  ];

  return pickOne(variants, fields.seed + 7);
}

// ---------- Quick answer ----------

const ANSWER_TEMPLATES: Record<ContentMode, string[]> = {
  city: [
    "{topic}{cityClause} is best approached as a skill, not a location-bound service — learn the core workflow first, then apply it to local client or job opportunities. Confirm current Sikhadenge session availability{cityClause} before assuming a physical batch exists.",
    "There is no shortcut for {topic}{cityClause}: start with fundamentals, complete a small real project, get it reviewed, and repeat. Use {city} as a learning context, not a claim of guaranteed local placement.",
  ],
  combo: [
    "For {audience}{cityClause}, {topic} pays off fastest when you pick one real task, finish it end to end, and treat {city} as market context rather than a guaranteed local batch.",
  ],
  audience: [
    "For {audience}, {topic} becomes useful once it is tied to a real task with a visible output — not passive video-watching. Start with one workflow, finish one project, and build from there.",
    "{audience} typically get the most value from {topic} by learning one focused workflow, producing a reviewable output, and only then expanding into advanced tools.",
  ],
  roadmap: [
    "The realistic {topic} roadmap is: fundamentals, one guided project, a quality review, then a documented case study — repeated until the work is consistently reliable.",
  ],
  career: [
    "{topic} can support a career or freelance income only when paired with visible proof of work, consistent delivery, and the ability to explain decisions — no page or course can guarantee a job, salary figure, or placement.",
  ],
  question: [
    "Short answer: {topic} is worth learning when it solves a specific task you already have — start narrow, produce one usable result, and expand from evidence rather than assumptions.",
  ],
  comparison: [
    "The right choice for {topic} depends on the exact task, budget, and available time — compare options against a real project brief rather than marketing claims, and verify current features on each provider's own site.",
  ],
  tool: [
    "{topic} is most useful when chosen for a specific task rather than because it is trending — verify current features and pricing directly with the provider before committing time to it.",
  ],
  root: [
    "{topic} is a practical skill area: understand the core workflow, practice with a real brief, get feedback, and build a small portfolio before calling yourself competent.",
  ],
};

export function buildAnswer(fields: ResolvedFields): string {
  const pool = ANSWER_TEMPLATES[fields.mode]?.length ? ANSWER_TEMPLATES[fields.mode] : ANSWER_TEMPLATES.root;
  const template = pickOne(pool, fields.seed + 3);
  return fill(template, fields);
}

function fill(template: string, fields: ResolvedFields): string {
  return template
    .replace(/\{topic\}/g, fields.topic)
    .replace(/\{city\}/g, fields.city)
    .replace(/\{cityClause\}/g, locationClause(fields))
    .replace(/\{audience\}/g, fields.audience)
    .replace(/\{audienceClause\}/g, audienceClause(fields))
    .replace(/\{usecase\}/g, fields.usecase || fields.topic)
    .replace(/\{family\}/g, fields.family);
}

// ---------- Highlights ----------

const SHARED_HIGHLIGHTS: Array<[string, string, GeneratedHighlight["icon"]]> = [
  ["Foundation before tools", "Understand the core concepts of {topic} and the quality bar expected before relying on shortcuts or automation. Skipping this step is the most common reason early work looks inconsistent.", "book"],
  ["Guided practical work", "Use real briefs that create a visible, reviewable output rather than passive course completion. A finished small task beats a half-finished big one.", "target"],
  ["Review and correction", "Apply feedback to improve accuracy, execution quality, and professional consistency in {topic} work. Treat correction as part of the process, not a failure signal.", "check"],
  ["Portfolio evidence", "Document the problem, process, decisions, output, and improvement made after review. This is what someone actually checks before trusting your work.", "graduate"],
  ["Verify changing facts", "Confirm tool features, pricing, and system requirements against official documentation, not summaries. Secondhand information about {topic} tools goes stale quickly.", "search"],
  ["One clear next action", "Move from reading to a single concrete {topic} practice task this week. Momentum matters more than a perfect plan at this stage.", "sparkles"],
];

const MODE_HIGHLIGHTS: Record<ContentMode, Array<[string, string, GeneratedHighlight["icon"]]>> = {
  city: [
    ["Local context, not a local promise", "{city} is used here as learning context — confirm any physical batch or center directly with Sikhadenge support.", "shield"],
    ["Client and job signals nearby", "Look for {topic} demand{cityClause} through local business needs, freelance briefs, and remote-first employers.", "users"],
  ],
  combo: [
    ["Built for {audience}", "The sequence below is adjusted for {audience}{cityClause}, not a generic one-size template.", "users"],
  ],
  audience: [
    ["Built for {audience}", "Recommendations below assume the constraints and goals typical for {audience}.", "users"],
    ["Time-realistic pacing", "Practice steps are sized so {audience} can complete them alongside existing commitments.", "wand"],
  ],
  roadmap: [
    ["Sequenced, not simultaneous", "Each stage below should be finished before starting the next — parallel half-progress is the most common failure mode.", "target"],
    ["Checkpoints, not just steps", "Every stage has a visible output you can check against a written standard.", "check"],
  ],
  career: [
    ["Evidence over claims", "Employers and clients respond to a demonstrated project trail, not a certificate alone.", "graduate"],
    ["No guaranteed outcomes", "Income and job outcomes depend on market conditions, effort, and portfolio quality — not a page promise.", "shield"],
  ],
  question: [
    ["Direct answer first", "The core question is answered plainly before the supporting detail, for readers and answer engines alike.", "answer"],
  ],
  comparison: [
    ["Decide against a brief", "Compare options against a specific task and budget, not a generic feature checklist.", "target"],
  ],
  tool: [
    ["Tool-agnostic foundation", "Learn the underlying workflow first so you are not dependent on one tool's interface staying the same.", "wand"],
  ],
  root: [
    ["Start narrow", "A single well-finished use case teaches more than switching between many shallow ones.", "target"],
  ],
};

export function buildHighlights(fields: ResolvedFields): GeneratedHighlight[] {
  const specific = MODE_HIGHLIGHTS[fields.mode] || [];
  const pool = [...SHARED_HIGHLIGHTS, ...specific];
  const chosen = pickDeterministic(pool, 6, fields.seed + 11);
  return chosen.map(([title, description, icon]) => ({
    title: fill(title, fields),
    description: fill(description, fields),
    icon,
  }));
}

// ---------- Steps ----------

const SHARED_STEPS: Array<[string, string, string]> = [
  ["Define your {topic} goal", "Choose whether you want fundamentals, a portfolio, better current work, job readiness, or a client project.", "Goal and baseline"],
  ["Learn the core workflow", "Understand the sequence, terminology, common files, and quality checks involved in practical {topic} work.", "Foundation"],
  ["Complete guided exercises", "Practice one capability at a time and save versions so improvement is visible, not assumed.", "Focused practice"],
  ["Build a realistic project", "Work from a clear brief and produce a complete output another person can inspect.", "Proof of work"],
  ["Review and revise", "Check the result against the brief, correct weak areas, and verify important facts.", "Quality review"],
  ["Publish a case study", "Turn the finished work into a concise portfolio entry with problem, process, and outcome.", "Portfolio"],
];

const MODE_STEPS: Record<ContentMode, Array<[string, string, string]>> = {
  city: [
    ["Confirm what is actually available{cityClause}", "Ask Sikhadenge directly for current session format and eligibility{cityClause} instead of assuming from the page alone.", "Verify first"],
  ],
  combo: [
    ["Adapt the plan for {audience}", "Adjust pacing and project choice to match the real time and resource constraints of {audience}.", "Personalize"],
  ],
  audience: [
    ["Adapt the plan for {audience}", "Adjust pacing and project choice to match the time and resource constraints typical for {audience}.", "Personalize"],
  ],
  roadmap: [
    ["Set a checkpoint date", "Give each roadmap stage a real date so drift is visible early, not after months.", "Accountability"],
  ],
  career: [
    ["Translate work into outcomes", "Write what changed because of your {topic} work — time saved, quality improved, revenue supported.", "Positioning"],
  ],
  question: [
    ["Test the answer on a real case", "Apply the direct answer to your actual situation before treating it as settled.", "Validation"],
  ],
  comparison: [
    ["Shortlist against your brief", "Score each option only on criteria that matter for your specific task and budget.", "Decision"],
  ],
  tool: [
    ["Confirm current tool behavior", "Re-check the tool's official docs — AI tool features and pricing change frequently.", "Currency check"],
  ],
  root: [
    ["Pick one narrow use case", "Resist covering every angle of {topic} at once; depth on one case beats breadth on none.", "Focus"],
  ],
};

export function buildSteps(fields: ResolvedFields): GeneratedStep[] {
  const specific = MODE_STEPS[fields.mode] || [];
  const pool = [...SHARED_STEPS, ...specific];
  const chosen = pickDeterministicOrdered(pool, 6, fields.seed + 17);
  return chosen.map(([title, description, meta]) => ({
    title: fill(title, fields),
    description: fill(description, fields),
    meta: fill(meta, fields),
  }));
}

// ---------- Mistakes ----------

const SHARED_MISTAKES: string[] = [
  "Learning {topic} only through passive videos without producing reviewable work.",
  "Installing many tools before understanding the first workflow and quality standard.",
  "Publishing copied or automated work without original decisions or verification.",
  "Treating a certificate as stronger evidence than a demonstrated portfolio.",
  "Skipping review and correction, so the same mistakes repeat across projects.",
  "Ignoring official documentation in favor of outdated secondhand summaries.",
];

const MODE_MISTAKES: Record<ContentMode, string[]> = {
  city: [
    "Assuming a page mentioning {city} implies a physical training center exists there.",
    "Ignoring national or remote {topic} opportunities while waiting for a local-only option.",
  ],
  combo: ["Using a generic plan instead of adjusting {topic} practice for {audience}."],
  audience: ["Using a generic plan instead of adjusting {topic} practice for {audience}."],
  roadmap: ["Starting multiple roadmap stages in parallel instead of finishing one at a time."],
  career: ["Expecting a specific salary, placement, or income figure without demonstrated project evidence.", "Treating urgency or scarcity claims as a reason to skip due diligence."],
  question: ["Accepting a single short answer without checking it against your specific constraints."],
  comparison: ["Choosing based on brand recognition instead of fit for the actual task and budget."],
  tool: ["Assuming a tool's free-tier features stay the same over time without checking."],
  root: ["Trying to learn every related topic before finishing one practical project."],
};

export function buildMistakes(fields: ResolvedFields): string[] {
  const specific = MODE_MISTAKES[fields.mode] || [];
  const pool = [...SHARED_MISTAKES, ...specific];
  const chosen = pickDeterministic(pool, 6, fields.seed + 23);
  return chosen.map((item) => fill(item, fields));
}

// ---------- FAQ ----------

const SHARED_FAQS: Array<[string, string]> = [
  ["What is the practical meaning of {topic}?", "{topic} is practical when it helps complete a defined task to a clear quality standard. The tool name matters less than the repeatable process, evidence, and result."],
  ["Who should read this {topic} page?", "{audience} who want a structured starting point, a review checklist, and a next action rather than a keyword-only overview."],
  ["Can a complete beginner start {topic}?", "Yes. Beginners should start with terminology and one simple workflow, then complete a small project before adding advanced tools."],
  ["How long does it take to become useful with {topic}?", "A basic workflow can often be learned through a few focused practice sessions. Reliable professional capability takes repeated projects, review, and real constraints."],
  ["Do I need paid tools to start {topic}?", "Not always. Many tools offer free access or trials, but features and limits change — verify current terms on the provider's official site."],
  ["How should I evaluate the quality of my {topic} output?", "Check accuracy, relevance, completeness, clarity, originality, and whether the intended user can act on the result without extra clarification."],
  ["Can {topic} help with jobs or freelancing?", "It can support jobs or freelancing when you can show real work, explain your process, and connect the skill to a business outcome. No page can guarantee employment or income."],
  ["What should my {topic} portfolio include?", "The problem, constraints, your process, tools used, key decisions, the final output, and what changed after review."],
  ["Is the Sikhadenge introductory session free?", "Sikhadenge may offer free introductory sessions or resources. Confirm the current format, date, and eligibility on the registration page or with support before assuming details."],
  ["Are Sikhadenge sessions live or recorded?", "Delivery format can vary by program. Check the current registration page for live timing, recordings, and support access."],
  ["Will I get a certificate for {topic}?", "Certificate availability depends on the specific program and its completion requirements — confirm the current policy before enrolling."],
  ["What should I do right after reading this page?", "Choose one {topic} outcome, complete the first practice step, save the result, and ask Sikhadenge for current program details if you want guided support."],
  ["Can I learn {topic} on mobile only?", "A mobile device supports videos and notes, but most production workflows are more reliable on a laptop or desktop."],
  ["How is this page useful for AI answer engines, not just Google?", "It uses a direct answer, descriptive headings, and structured FAQ data, which helps both search engines and AI assistants summarize the topic accurately without claiming a guaranteed citation."],
];

const MODE_FAQS: Record<ContentMode, Array<[string, string]>> = {
  city: [
    ["Does Sikhadenge have a physical center in {city}?", "This page uses {city} as a learning and search context. It does not claim a physical training center or guaranteed local batch unless Sikhadenge's official contact page confirms one."],
    ["Is {topic} learning available online for people in {city}?", "Yes, online delivery is generally the default. Confirm current schedules and eligibility with Sikhadenge support before assuming availability."],
    ["Are there real {topic} opportunities in {city}?", "Opportunities depend on the local market and remote work options together, not the page itself. Use this guide for skill-building and verify current openings independently."],
  ],
  combo: [
    ["Is this {topic} guidance specific to {audience} in {city}?", "The guidance is adapted for {audience} and uses {city} as location context, not a promise of local placement or a physical center."],
  ],
  audience: [
    ["Is this {topic} guide different for {audience} specifically?", "Yes — the pacing, project suggestions, and mistakes to avoid are chosen with the typical constraints of {audience} in mind."],
  ],
  roadmap: [
    ["What happens if I skip a stage in this roadmap?", "Skipping a stage usually shows up later as inconsistent output quality. Revisit the skipped stage rather than pushing ahead."],
    ["How long should the full {topic} roadmap take?", "It depends on available time and starting skill level. Judge progress by completed, reviewed stages rather than a fixed calendar."],
  ],
  career: [
    ["Can this page guarantee {topic} job placement or a salary figure?", "No. No page, course, or guide can guarantee employment, placement, or a specific income figure. Outcomes depend on market conditions, effort, and portfolio quality."],
    ["What helps a career in {topic} progress fastest?", "A small number of well-explained, real projects usually matters more than the number of courses completed."],
    ["Does Sikhadenge place {topic} learners directly into jobs?", "No. Sikhadenge provides learning guidance and a WhatsApp community; job outcomes depend on the learner's own applications, portfolio, and interviews."],
  ],
  question: [
    ["Is the answer above always correct for every situation?", "It is a general, practical starting point. Apply it to your specific constraints before treating it as final."],
  ],
  comparison: [
    ["Which option is best for {topic}?", "There is no single universal answer — the right choice depends on your task, budget, and timeline. Compare current features on each provider's own site."],
  ],
  tool: [
    ["Which {topic} tool should I install first?", "Install only the primary tool required for your first project. Verify current system requirements and pricing on the official website."],
  ],
  root: [
    ["Where should I start with {topic} today?", "Pick the smallest real task you have, apply one relevant workflow, and review the result honestly before expanding scope."],
  ],
};

export function buildFaqs(fields: ResolvedFields): GeneratedFaq[] {
  const specific = MODE_FAQS[fields.mode] || [];
  const pool: Array<[string, string]> = [...SHARED_FAQS, ...specific];

  // Real, verifiable geography (state/region/tier), not a generic filler
  // sentence — only added when we actually have the fact for this city.
  if (fields.cityFact) {
    pool.push([
      "What kind of city is {city} for this topic?",
      `${fields.city} is a ${fields.cityFact.tier} city in ${fields.cityFact.state}, part of ${fields.cityFact.region} India. That affects the local job market and client base for {topic}, but not the fundamentals you need to learn — those stay the same regardless of city tier.`,
    ]);
  }

  const count = Math.min(14, pool.length);
  const chosen = pickDeterministic(pool, count, fields.seed + 29);
  return chosen.map(([q, a]) => ({ q: fill(q, fields), a: fill(a, fields) }));
}

// ---------- Tools ----------

export function buildTools(fields: ResolvedFields): GeneratedTool[] {
  return [
    {
      name: `${fields.topic} primary tool`,
      description: "Choose the professional tool most relevant to your first project. Confirm current requirements and licensing before installing.",
      label: "Core",
    },
    {
      name: "Official documentation",
      description: "Use first-party documentation for current features, limitations, formats, and pricing.",
      label: "Primary source",
    },
    {
      name: "Project brief template",
      description: "Record the user, goal, constraints, deliverables, and acceptance criteria before starting.",
      label: "Workflow",
    },
  ];
}

// ---------- Journey diagram (visual roadmap) ----------

const JOURNEY_TEMPLATES: Record<ContentMode, Array<[string, GeneratedHighlight["icon"]]>> = {
  city: [
    ["Fundamentals", "book"], ["Guided practice", "target"], ["Real project", "check"], ["Review", "shield"], ["Local/remote work", "users"],
  ],
  combo: [
    ["Fundamentals", "book"], ["{audience}-fit practice", "target"], ["Real project", "check"], ["Review", "shield"], ["Portfolio", "graduate"],
  ],
  audience: [
    ["Fundamentals", "book"], ["{audience}-paced practice", "target"], ["Real project", "check"], ["Feedback", "shield"], ["Portfolio", "graduate"],
  ],
  roadmap: [
    ["Baseline", "search"], ["Stage 1", "book"], ["Stage 2", "target"], ["Checkpoint review", "shield"], ["Case study", "graduate"],
  ],
  career: [
    ["Skill build", "book"], ["Project proof", "target"], ["Portfolio", "graduate"], ["Outreach", "users"], ["Iterate", "sparkles"],
  ],
  question: [
    ["Direct answer", "answer"], ["Apply to your case", "target"], ["Test it", "check"], ["Adjust", "wand"],
  ],
  comparison: [
    ["Define the brief", "search"], ["Shortlist options", "book"], ["Score against brief", "check"], ["Decide", "shield"],
  ],
  tool: [
    ["Pick one tool", "wand"], ["Learn core workflow", "book"], ["Small project", "target"], ["Review output", "check"],
  ],
  root: [
    ["Fundamentals", "book"], ["Practice", "target"], ["Real project", "check"], ["Review", "shield"], ["Portfolio", "graduate"],
  ],
};

export function buildJourney(fields: ResolvedFields): GeneratedJourneyStep[] {
  const template = JOURNEY_TEMPLATES[fields.mode] || JOURNEY_TEMPLATES.root;
  return template.map(([label, icon]) => ({ label: fill(label, fields), icon }));
}

// ---------- Use cases (where it's actually applied) ----------

const SHARED_USE_CASES: Array<[string, string, GeneratedHighlight["icon"]]> = [
  ["Personal projects", "Practicing {topic} on a project you actually care about finishing, not a throwaway exercise. Motivation tends to hold up better when the outcome matters to you.", "sparkles"],
  ["Freelance or client work", "Delivering a small, well-scoped {topic} task for a real client and handling their feedback. This is where you learn what 'good enough to ship' actually means.", "users"],
  ["Internal work tasks", "Applying {topic} to speed up or improve a task you already do at your job or business, so the value is measurable against something you already track.", "target"],
  ["Portfolio building", "Turning {topic} practice into a documented case study for job or client applications, with the problem, process, and result written out clearly.", "graduate"],
  ["Content or teaching", "Explaining {topic} to someone else, which is a reliable way to find gaps in your own understanding before they show up in real work.", "book"],
  ["Side projects and experiments", "Testing {topic} on a low-stakes side project before committing it to important work, so mistakes cost time rather than reputation.", "wand"],
];

const MODE_USE_CASES: Record<ContentMode, Array<[string, string, GeneratedHighlight["icon"]]>> = {
  city: [
    ["Local small businesses", "Small businesses{cityClause} that need {topic} help but cannot justify a full-time hire.", "target"],
    ["Remote clients from {city}", "Clients based{cityClause} who are open to remote delivery once trust is established.", "users"],
  ],
  combo: [
    ["Work fitting {audience}", "Tasks that fit the time and resource constraints typical for {audience}{cityClause}.", "users"],
  ],
  audience: [
    ["Work fitting {audience}", "Tasks that fit the time and resource constraints typical for {audience}.", "users"],
  ],
  roadmap: [
    ["Milestone-based projects", "Work broken into checkpoints so progress in {topic} is visible, not assumed.", "shield"],
  ],
  career: [
    ["Job applications", "Using {topic} project evidence directly in resumes, portfolios, and interviews.", "graduate"],
    ["Freelance proposals", "Referencing specific {topic} outcomes when pitching freelance work.", "users"],
  ],
  question: [
    ["Quick decision-making", "Using the direct answer above to make a fast, reasonable {topic} decision today.", "answer"],
  ],
  comparison: [
    ["Vendor or tool selection", "Choosing between {topic} options for a specific team or project need.", "shield"],
  ],
  tool: [
    ["Daily workflow support", "Using {topic} as one step inside a larger existing workflow, not a replacement for it.", "wand"],
  ],
  root: [
    ["Skill-building projects", "Structured practice projects designed specifically to build {topic} capability.", "target"],
  ],
};

export function buildUseCases(fields: ResolvedFields): GeneratedHighlight[] {
  const specific = MODE_USE_CASES[fields.mode] || [];
  const pool = [...SHARED_USE_CASES, ...specific];
  const chosen = pickDeterministic(pool, 6, fields.seed + 37);
  return chosen.map(([title, description, icon]) => ({
    title: fill(title, fields),
    description: fill(description, fields),
    icon,
  }));
}

export function useCasesTitle(fields: ResolvedFields): string {
  return `Where ${fields.topic} is actually used`;
}

// ---------- Comparison table ----------

const COMPARISON_TABLES: Record<ContentMode, { title: string; description: string; columns: string[]; rows: string[][] }> = {
  city: {
    title: "Three ways to approach {topic}{cityClause}",
    description: "A structural comparison, not a ranking of specific providers.",
    columns: ["Approach", "Speed to first result", "Consistency needed", "Typical risk"],
    rows: [
      ["Unstructured videos, no plan", "Slow and inconsistent", "Low, but progress stalls easily", "Learners often quit before finishing anything usable"],
      ["Self-directed structured study", "Moderate", "High — depends entirely on self-discipline", "Works well only with strong follow-through"],
      ["Guided practice with review{cityClause}", "Faster feedback loop", "Moderate — structure reduces the discipline burden", "Requires real practice time, not just attendance"],
    ],
  },
  combo: {
    title: "Comparing learning routes for {audience}",
    description: "What actually changes based on your starting constraints.",
    columns: ["Route", "Best when", "Main trade-off"],
    rows: [
      ["Fast, narrow focus", "You have one urgent task to solve", "Shallow understanding outside that task"],
      ["Broad foundation first", "You want long-term flexibility", "Slower to your first usable output"],
      ["Guided practice matched to {audience}", "You want structure without starting from zero", "Still requires your own practice time"],
    ],
  },
  audience: {
    title: "Comparing learning routes for {audience}",
    description: "What actually changes based on your starting constraints.",
    columns: ["Route", "Best when", "Main trade-off"],
    rows: [
      ["Fast, narrow focus", "You have one urgent task to solve", "Shallow understanding outside that task"],
      ["Broad foundation first", "You want long-term flexibility", "Slower to your first usable output"],
      ["Guided practice matched to {audience}", "You want structure without starting from zero", "Still requires your own practice time"],
    ],
  },
  roadmap: {
    title: "Following the roadmap vs skipping ahead",
    description: "Why sequence matters more than speed here.",
    columns: ["Behavior", "Short-term feel", "Longer-term result"],
    rows: [
      ["Skip stages, jump to advanced work", "Feels faster at first", "Gaps show up under real constraints later"],
      ["Follow every stage in order", "Feels slower at first", "Fewer repeated mistakes, steadier output quality"],
      ["Follow stages but skip review checkpoints", "Feels productive", "Errors compound silently across stages"],
    ],
  },
  career: {
    title: "What actually signals {topic} readiness",
    description: "Comparing common signals people rely on.",
    columns: ["Signal", "How reliable it is", "Why"],
    rows: [
      ["Certificate alone", "Weak on its own", "Shows exposure, not demonstrated capability"],
      ["Number of courses completed", "Weak on its own", "Volume does not equal applied skill"],
      ["A small number of explained, real projects", "Strong", "Shows process, decisions, and a verifiable result"],
    ],
  },
  question: {
    title: "How to weigh advice on this question",
    description: "Not every source deserves equal trust.",
    columns: ["Source type", "Trust level", "Use it for"],
    rows: [
      ["Official documentation", "High", "Current features, limits, and exact behavior"],
      ["Structured guides like this one", "Moderate", "General direction and a practical starting sequence"],
      ["Anecdotal social media claims", "Low without verification", "Ideas to test, not facts to rely on"],
    ],
  },
  comparison: {
    title: "How to score {topic} options fairly",
    description: "A simple framework instead of a fixed winner.",
    columns: ["Criterion", "Why it matters", "How to check it"],
    rows: [
      ["Fit for your exact task", "Generic feature lists hide task-specific gaps", "Test with your real use case, not a demo"],
      ["Total cost at your scale", "Entry pricing often changes at real usage volume", "Check pricing pages directly, not summaries"],
      ["Support and documentation quality", "You will need it when something breaks", "Search their docs for your exact error before choosing"],
    ],
  },
  tool: {
    title: "Free vs paid vs enterprise tooling for {topic}",
    description: "A general pattern — exact tiers vary by provider.",
    columns: ["Tier", "Typical limitation", "Best for"],
    rows: [
      ["Free / trial", "Usage caps, watermarks, or limited features", "Learning the core workflow first"],
      ["Paid individual", "Cost scales with usage or seats", "Consistent personal or small client work"],
      ["Enterprise / team", "Requires procurement and onboarding", "Teams needing admin controls and support SLAs"],
    ],
  },
  root: {
    title: "Three ways to approach {topic}",
    description: "A structural comparison, not a ranking of specific providers.",
    columns: ["Approach", "Speed to first result", "Consistency needed", "Typical risk"],
    rows: [
      ["Unstructured videos, no plan", "Slow and inconsistent", "Low, but progress stalls easily", "Learners often quit before finishing anything usable"],
      ["Self-directed structured study", "Moderate", "High — depends entirely on self-discipline", "Works well only with strong follow-through"],
      ["Guided practice with review", "Faster feedback loop", "Moderate — structure reduces the discipline burden", "Requires real practice time, not just attendance"],
    ],
  },
};

export function buildComparisonTable(fields: ResolvedFields): GeneratedComparisonTable {
  const template = COMPARISON_TABLES[fields.mode] || COMPARISON_TABLES.root;
  return {
    title: fill(template.title, fields),
    description: fill(template.description, fields),
    columns: template.columns,
    rows: template.rows.map((row) => row.map((cell) => fill(cell, fields))),
  };
}

// ---------- Long-form prose (intro + closing paragraphs) ----------

const INTRO_PARAGRAPHS: Record<ContentMode, string[]> = {
  city: [
    "{topic}{cityClause} is easy to search for and hard to evaluate — most pages either promise more than they can verify or say almost nothing specific. This guide takes a narrower, more useful angle: what {topic} actually involves, what a realistic starting point looks like{cityClause}, and what to check before you commit time or money to it. It treats {city} as a search and learning context, not a claim about a physical center, a guaranteed batch, or local placement — those details should always be confirmed directly with Sikhadenge rather than assumed from a page like this one.",
  ],
  combo: [
    "If you found this page while researching {topic}{cityClause} as {audience}, the honest starting point is that generic advice rarely fits your actual constraints. This guide breaks the topic down by what a realistic path looks like for {audience} specifically — how much time it reasonably takes, what a first project should look like, and where people in a similar position tend to get stuck. {city} is used as context for search and relevance, not as a promise of a physical center or guaranteed local opportunities.",
  ],
  audience: [
    "Most {topic} content is written for a generic reader, which makes it either too basic or too advanced depending on where you actually are. This page is written with {audience} specifically in mind — the time constraints, the starting knowledge, and the kind of first project that tends to work. The goal is a realistic sequence you can actually follow, not a long feature list of everything {topic} could theoretically involve.",
  ],
  roadmap: [
    "A roadmap is only useful if the stages are sequenced correctly and each one has a clear way to check whether you actually finished it. This page lays out a practical {topic} roadmap: what to do first, what depends on what, and where a review checkpoint should sit before you move forward. It is deliberately narrower than a full course outline — the aim is a sequence you can follow end to end, not an exhaustive list of everything related to {topic}.",
  ],
  career: [
    "Career advice about {topic} tends to swing between vague encouragement and unrealistic promises. Neither is useful when you're trying to decide whether to invest real time in it. This page focuses on what actually tends to correlate with better outcomes — demonstrated project work, a clear explanation of your process, and consistency — while being direct about what it cannot promise: a specific salary, a guaranteed placement, or a fixed timeline. Read it as a realistic framework, not a guarantee.",
  ],
  question: [
    "This page exists to answer one specific question about {topic} directly, then give you enough surrounding context to apply the answer to your actual situation rather than a generic one. Short answers are useful for a quick decision; they are not a substitute for checking the details that matter for your specific case, which is what the rest of this page is for.",
  ],
  comparison: [
    "Comparing options for {topic} usually turns into a list of features that all sound similar until you actually try to use them for a real task. This page uses a different approach: a small set of criteria that tend to matter in practice, applied consistently, so you can score your own shortlist instead of relying on a single ranked recommendation that may not fit your situation.",
  ],
  tool: [
    "{topic} gets easier to evaluate once you separate the underlying workflow from whichever specific tool is currently popular for it. Tools change — pricing, features, and even which product leads the category shift regularly — but the underlying skill of knowing what a good {topic} workflow looks like does not. This page focuses on that workflow first, with tool recommendations treated as a starting point to verify, not a final answer.",
  ],
  root: [
    "{topic} shows up in a lot of different contexts, which makes generic overviews either too shallow to be useful or too broad to actually follow. This page takes a narrower, more practical approach: a clear explanation of what {topic} actually involves, a realistic sequence for building capability in it, and honest answers to the questions people actually ask before committing time to it.",
  ],
};

const CLOSING_PARAGRAPHS: Record<ContentMode, string[]> = {
  city: [
    "None of this replaces checking current details directly with Sikhadenge — session format, eligibility, and availability{cityClause} can change, and this page is a starting roadmap, not a live schedule. If you take one thing from it, make it this: treat {topic} as a skill you build through real practice, and treat {city} as where you're searching from, not a guarantee of what's available.",
  ],
  combo: [
    "The fastest way to know whether {topic} is worth your time as {audience} is to try the first practical step above on something real, not hypothetical. If it produces a result you're proud to show someone, that's a better signal than any amount of reading. If it doesn't, that's useful information too — it tells you what to adjust before going further.",
  ],
  audience: [
    "The fastest way to know whether {topic} is worth your time is to try the first practical step above on something real, not hypothetical. If it produces a result you're proud to show someone, that's a better signal than any amount of reading. If it doesn't, that's useful information too — it tells you what to adjust before going further.",
  ],
  roadmap: [
    "Roadmaps fail more often from skipped review checkpoints than from being too ambitious. If you take one thing from this page, make it that: finish each stage of the {topic} roadmap with a visible, checkable result before starting the next one, even if that means moving slower than you'd like.",
  ],
  career: [
    "If you're using {topic} as part of a career or freelance plan, the most useful next step is usually the smallest one: finish one project you'd be comfortable showing a real client or employer, and be ready to explain the decisions behind it. That single piece of evidence tends to matter more than any additional course or certificate.",
  ],
  question: [
    "If the short answer above doesn't fully resolve your situation, that's expected — most real cases have a detail a general answer can't account for. Use the surrounding sections to check the parts that are specific to you before treating this as final.",
  ],
  comparison: [
    "Whichever option you choose for {topic}, treat the decision as reversible rather than permanent. Start with the option that best fits your current task, use it on something real, and revisit the comparison later if your constraints change — that's usually more reliable than trying to pick a permanent winner up front.",
  ],
  tool: [
    "Tools for {topic} will keep changing after this page is published, which is exactly why the workflow above is written to outlast any specific product. When you do pick a tool, verify its current features and pricing directly with the provider rather than relying on this or any other secondhand summary.",
  ],
  root: [
    "If you take one thing from this page, make it this: {topic} becomes real through a finished project you can show someone, not through consuming more content about it. Use the roadmap above to get to that first finished piece of work, then build from there.",
  ],
};

export function buildIntroParagraph(fields: ResolvedFields): string {
  const pool = INTRO_PARAGRAPHS[fields.mode] || INTRO_PARAGRAPHS.root;
  return fill(pickOne(pool, fields.seed + 41), fields);
}

export function buildClosingParagraph(fields: ResolvedFields): string {
  const pool = CLOSING_PARAGRAPHS[fields.mode] || CLOSING_PARAGRAPHS.root;
  return fill(pickOne(pool, fields.seed + 43), fields);
}

// ---------- Related-skills table (real per-entry data, not a template) ----------

const CONNECTION_REASONS: string[] = [
  "Shares core tools and workflow patterns with {topic}, so early practice transfers directly.",
  "Often needed alongside {topic} in real briefs — clients and employers rarely ask for just one skill in isolation.",
  "Uses a similar review and quality-check process to {topic}, which makes the second skill faster to pick up.",
  "Frequently the next step once {topic} fundamentals are solid, based on how these topics are typically sequenced.",
  "Overlaps with {topic} in the audience it serves, even though the execution details differ.",
  "Complements {topic} well in a portfolio — pairing them signals broader practical range.",
];

const WHEN_TO_EXPLORE: string[] = [
  "After your first {topic} project is complete and reviewed",
  "Once the core {topic} workflow feels routine, not effortful",
  "When a real brief specifically calls for it alongside {topic}",
  "Alongside {topic}, if your time and bandwidth allow it",
  "After you can explain your {topic} decisions clearly to someone else",
  "When you're ready to widen your portfolio beyond {topic} alone",
];

export function buildRelatedSkillsTable(entry: SeoEntry, fields: ResolvedFields): GeneratedComparisonTable | null {
  const families = (entry.relatedFamilies || [])
    .map((slug) => toTitle(slug))
    .filter((name) => name && name.toLowerCase() !== fields.family.toLowerCase())
    .slice(0, 6);

  if (families.length < 2) return null;

  return {
    title: fill("How {topic} connects to related skills", fields),
    description: "Based on this page's related-topic mapping, not a generic list.",
    columns: ["Related skill", "Why it's connected", "When to explore it"],
    rows: families.map((name, index) => [
      name,
      fill(CONNECTION_REASONS[index % CONNECTION_REASONS.length], fields),
      fill(WHEN_TO_EXPLORE[index % WHEN_TO_EXPLORE.length], fields),
    ]),
  };
}

// ---------- Section-transition paragraphs (connective prose, not more cards) ----------

const TRANSITION_TO_TAKEAWAYS: string[] = [
  "Before the roadmap, it helps to be specific about what you're actually working toward. The points below are the outcomes that tend to separate people who can use {topic} practically from people who have only read about it.",
  "The list below isn't a feature summary — it's what tends to make the difference between {topic} practice that produces something usable and practice that just feels productive.",
];

const TRANSITION_TO_STEPS: string[] = [
  "With that context in place, here is a realistic sequence for building {topic} capability. Each stage assumes you finish the one before it — jumping ahead usually shows up as inconsistent output later, not immediate failure.",
  "The stages below are intentionally sequential. Treat each one as a checkpoint: if a stage doesn't produce something you can point to, it's worth finishing before moving on rather than pushing forward on a shaky foundation.",
];

export function buildTransitionToTakeaways(fields: ResolvedFields): string {
  return fill(pickOne(TRANSITION_TO_TAKEAWAYS, fields.seed + 47), fields);
}

export function buildTransitionToSteps(fields: ResolvedFields): string {
  return fill(pickOne(TRANSITION_TO_STEPS, fields.seed + 53), fields);
}

// ---------- Sibling links (internal-linking fix) ----------
//
// The site's sitemap already lists all ~99,608 generated pages, but almost
// none of them were reachable via an actual internal link — family "root"
// pages (e.g. /ai-automation) linked to zero of their own city/audience
// variants. Sitemap-only discovery is a weak signal; Google tends to crawl
// but not index pages with little internal link equity pointing at them.
// This builds real sibling links: root/"hub" pages link out to a good
// sample of their own family's children, and every other page links to a
// handful of thematically-similar siblings (e.g. the same topic in other
// cities), so the tail pages sit inside a real link graph, not just a
// sitemap entry.

let _familyIndex: Map<string, SeoEntry[]> | null = null;

function getFamilyIndex(): Map<string, SeoEntry[]> {
  if (_familyIndex) return _familyIndex;
  const index = new Map<string, SeoEntry[]>();
  for (const item of getAllGeneratedEntries()) {
    const key = item.familyKey || item.rootSlug || "";
    if (!key) continue;
    const bucket = index.get(key);
    if (bucket) bucket.push(item);
    else index.set(key, [item]);
  }
  _familyIndex = index;
  return index;
}

function siblingDescription(sibFields: ResolvedFields, topic: string): string {
  if (sibFields.cityIsSpecific) return `${topic} guide for ${sibFields.city}`;
  if (sibFields.audienceIsSpecific) return `${topic} guide for ${sibFields.audience}`;
  return `${topic} guide`;
}

export function buildSiblingLinks(
  entry: SeoEntry,
  fields: ResolvedFields,
): { links: GeneratedLink[]; title: string } {
  const familyKey = entry.familyKey || entry.rootSlug || "";
  const allSiblings = (getFamilyIndex().get(familyKey) || []).filter((item) => item.slug !== entry.slug);
  if (allSiblings.length === 0) return { links: [], title: "" };

  const currentKind = normalizeKind(entry.pageKind);
  const isHub = currentKind === "root";

  // Keep cross-links thematically coherent for non-hub pages (a city page
  // mostly links to other city pages of the same topic, not to an
  // unrelated salary or roadmap page) — falls back to the full family pool
  // if that bucket is too small to be useful.
  let pool = allSiblings;
  if (!isHub) {
    const sameKind = allSiblings.filter((item) => normalizeKind(item.pageKind) === currentKind);
    if (sameKind.length >= 6) pool = sameKind;
  }

  const count = isHub ? Math.min(30, pool.length) : Math.min(6, pool.length);
  const chosen = pickDeterministic(pool, count, fields.seed + (isHub ? 61 : 59));

  const links: GeneratedLink[] = chosen.map((sib) => {
    const sibFields = resolveFields(sib, sib.slug);
    const label = sib.metaTitle ? sib.metaTitle.replace(/\s+\|\s+Sikhadenge$/i, "") : uniqueTitle(sib, sibFields);
    return {
      href: `/${sib.slug}`,
      label,
      description: siblingDescription(sibFields, fields.topic),
    };
  });

  const title = isHub ? `Explore ${fields.topic} across cities and audiences` : `More ${fields.topic} guides`;
  return { links, title };
}
