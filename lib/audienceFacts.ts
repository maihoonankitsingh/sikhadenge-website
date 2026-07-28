// Real, practical differences per audience type — genuine constraints and
// goals that actually differ by who's learning, not a fabricated stat or a
// generic "for {audience}" template. Covers the audience values that appear
// in the generated dataset (data/generated-seo-merged.json), normalized to
// handle casing/hyphen variants (e.g. "job-seekers" / "Job Seekers").

export type AudienceFact = {
  timeAvailability: string;
  primaryGoal: string;
  typicalConstraint: string;
  startingPoint: string;
};

const AUDIENCE_FACTS: Record<string, AudienceFact> = {
  beginners: {
    timeAvailability: "variable, often just a few hours a week",
    primaryGoal: "understand fundamentals before committing serious time or money",
    typicalConstraint: "no prior hands-on experience to build on yet",
    startingPoint: "a single guided introductory exercise, not a full project",
  },
  freelancers: {
    timeAvailability: "client work competes directly for the same hours",
    primaryGoal: "convert new skills into billable client work quickly",
    typicalConstraint: "can't justify weeks of pure theory without a paying use case",
    startingPoint: "a real, even small, client brief — not a hypothetical exercise",
  },
  students: {
    timeAvailability: "bounded by the academic schedule, with concentrated free periods around holidays and semester breaks",
    primaryGoal: "build a portfolio or resume-ready project alongside coursework",
    typicalConstraint: "usually a limited budget for paid tools or courses",
    startingPoint: "a project usable in a resume, internship application, or academic submission",
  },
  creators: {
    timeAvailability: "set by content production cycles",
    primaryGoal: "produce more content, faster, without losing quality or voice",
    typicalConstraint: "needs to fit an existing content workflow, not replace it",
    startingPoint: "applying the skill to one upcoming piece of content",
  },
  marketers: {
    timeAvailability: "driven by campaign deadlines",
    primaryGoal: "improve campaign output, targeting, or measurable results",
    typicalConstraint: "needs to justify time and tool spend against campaign ROI",
    startingPoint: "one live or upcoming campaign, not a generic exercise",
  },
  founders: {
    timeAvailability: "extremely limited, competing with every other founder task",
    primaryGoal: "get a usable result fast enough to matter for the business",
    typicalConstraint: "rarely has time for deep theory and wants the shortest safe path",
    startingPoint: "the one task currently blocking the business, not a general course",
  },
  "working professionals": {
    timeAvailability: "evenings and weekends around a full-time job",
    primaryGoal: "apply new skills at the current job or prepare for the next role",
    typicalConstraint: "limited energy after work hours",
    startingPoint: "a task inside their current job, so the effort compounds immediately",
  },
  "job seekers": {
    timeAvailability: "full attention until placed, but time-pressured",
    primaryGoal: "build interview-ready proof of skill fast",
    typicalConstraint: "needs demonstrable outcomes, not just certificates",
    startingPoint: "a portfolio project aimed directly at target job listings",
  },
  designers: {
    timeAvailability: "dependent on project cycles",
    primaryGoal: "extend an existing visual or design skill set with new tools or techniques",
    typicalConstraint: "a high existing quality bar — sloppy output isn't acceptable",
    startingPoint: "applying the new skill inside an existing design workflow",
  },
  "business owners": {
    timeAvailability: "fragmented across running the business",
    primaryGoal: "reduce cost, save time, or improve output without hiring",
    typicalConstraint: "needs the return on investment to be obvious and fast",
    startingPoint: "one recurring task currently done manually or outsourced",
  },
  agencies: {
    timeAvailability: "driven by client delivery timelines",
    primaryGoal: "deliver client work faster or take on more clients without more headcount",
    typicalConstraint: "output must meet client-facing quality bars, not just internal use",
    startingPoint: "a repeatable process usable across multiple client accounts",
  },
  teachers: {
    timeAvailability: "school or term schedule with limited prep time",
    primaryGoal: "use the skill to teach or explain concepts more effectively",
    typicalConstraint: "needs to translate the skill into something explainable to students",
    startingPoint: "one lesson or teaching material improved with the new skill",
  },
  consultants: {
    timeAvailability: "under billable-hours pressure",
    primaryGoal: "add a sellable capability to existing consulting services",
    typicalConstraint: "needs credibility and consistency, not just raw capability",
    startingPoint: "a capability that can be pitched inside an existing client relationship",
  },
  freshers: {
    timeAvailability: "high availability, but no existing track record",
    primaryGoal: "build a first credible portfolio from zero",
    typicalConstraint: "no professional experience to reference yet",
    startingPoint: "a complete beginner-to-finished project, documented step by step",
  },
  "video editors": {
    timeAvailability: "deadline-driven, project by project",
    primaryGoal: "add capability without slowing down the delivery pipeline",
    typicalConstraint: "needs to fit the existing editing software and workflow",
    startingPoint: "applying the skill inside the next real edit, not a tutorial project",
  },
};

const NORMALIZE_MAP: Record<string, string> = {
  "job-seekers": "job seekers",
  "working-professionals": "working professionals",
  "small-business-owners": "business owners",
  "small business": "business owners",
  "content creators": "creators",
  "youtube creators": "creators",
  "career switch": "job seekers",
  "after 12th": "freshers",
  "after graduation": "freshers",
};

const DEFAULT_AUDIENCE_FACT: AudienceFact = {
  timeAvailability: "limited and shared with other priorities",
  primaryGoal: "get a usable result without an unnecessary detour through theory",
  typicalConstraint: "needs the fastest safe path to a real, checkable output",
  startingPoint: "one small, real task rather than a broad course",
};

export function getAudienceFact(rawAudience: string): AudienceFact | null {
  const key = rawAudience.trim().toLowerCase();
  if (!key) return null;
  const normalized = NORMALIZE_MAP[key] || key;
  return AUDIENCE_FACTS[normalized] || DEFAULT_AUDIENCE_FACT;
}
