import fs from "fs";
import path from "path";
import type { GeneratedFaq, GeneratedHighlight, GeneratedStep, GeneratedTool } from "../components/generated/GeneratedPageKit";

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

export function toTitle(value?: string) {
  if (!value) return "";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
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

function pickOne<T>(pool: T[], seed: number): T {
  return pool[seed % pool.length];
}

export type ResolvedFields = {
  topic: string;
  city: string;
  cityIsSpecific: boolean;
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

  return {
    topic: toTitle(rawTopic) || toTitle(fallbackSlug),
    city: toTitle(rawCity),
    cityIsSpecific,
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
  ["Foundation before tools", "Understand the core concepts of {topic} and the quality bar expected before relying on shortcuts or automation.", "book"],
  ["Guided practical work", "Use real briefs that create a visible, reviewable output rather than passive course completion.", "target"],
  ["Review and correction", "Apply feedback to improve accuracy, execution quality, and professional consistency in {topic} work.", "check"],
  ["Portfolio evidence", "Document the problem, process, decisions, output, and improvement made after review.", "graduate"],
  ["Verify changing facts", "Confirm tool features, pricing, and system requirements against official documentation, not summaries.", "search"],
  ["One clear next action", "Move from reading to a single concrete {topic} practice task this week.", "sparkles"],
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
  const chosen = pickDeterministic(pool, 6, fields.seed + 17);
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
  const pool = [...SHARED_FAQS, ...specific];
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
