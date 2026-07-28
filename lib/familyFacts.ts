// Real, genuine facts per topic family — actual tools, an accurate
// description of the practical workflow, a real common mistake, and what a
// finished piece of work looks like. Keyed by familyKey from the generated
// dataset (data/generated-seo-merged.json). Covers the top-volume families
// first (phase 3); more are added in later phases.

export type FamilyFact = {
  displayName: string;
  realTools: string[];
  coreWorkflow: string;
  commonPitfall: string;
  typicalOutput: string;
};

export const FAMILY_FACTS: Record<string, FamilyFact> = {
  "ai-marketing": {
    displayName: "AI Marketing",
    realTools: [
      "ChatGPT or Claude for campaign copy drafts",
      "Meta Ads Manager or Google Ads for execution",
      "Canva or Adobe Express for creative assets",
      "GA4 for measuring real results",
    ],
    coreWorkflow:
      "using AI to draft and iterate campaign copy or creative faster, then validating with real ad spend and analytics rather than assuming AI output performs well untested",
    commonPitfall: "publishing AI-drafted copy without checking it against brand voice, factual accuracy, or platform ad policies",
    typicalOutput: "a tested ad campaign or content calendar with documented before/after performance data",
  },
  "prompt-engineering": {
    displayName: "Prompt Engineering",
    realTools: ["ChatGPT, Claude, or Gemini directly", "A prompt and version log, even a simple spreadsheet", "The model provider's official prompting documentation"],
    coreWorkflow:
      "iterating a prompt against one specific, repeatable task, comparing outputs across versions, and documenting which changes actually improved reliability",
    commonPitfall: "treating one lucky output as proof a prompt works, without testing it across multiple runs or edge cases",
    typicalOutput: "a documented, reusable prompt template with example inputs, outputs, and known failure cases",
  },
  "ai-automation": {
    displayName: "AI Automation",
    realTools: ["Zapier, Make (Integromat), or n8n for the workflow", "The ChatGPT or Claude API for the AI step", "The specific apps being connected, such as Gmail, Sheets, or Slack"],
    coreWorkflow:
      "mapping a manual, repetitive task into a trigger-and-action workflow, inserting an AI step only where judgment or generation is genuinely needed",
    commonPitfall: "automating a process that was already broken, so the automation just fails faster and more often",
    typicalOutput: "a working automation with a documented trigger, each step, and a fallback for when it fails",
  },
  "ai-course": {
    displayName: "AI Course learning",
    realTools: ["The course platform itself", "A personal practice project kept separate from course exercises", "A notes or portfolio system to track completed work"],
    coreWorkflow: "following structured lessons but converting each one into a small applied task instead of only watching",
    commonPitfall: "completing a course end to end without ever producing an independent, undocumented piece of real work",
    typicalOutput: "a completion record plus, more importantly, two or three independent practice projects",
  },
  "ai-expert": {
    displayName: "AI Expert positioning",
    realTools: ["A documented portfolio of real AI-assisted projects", "LinkedIn or a personal site to showcase the work", "Client or employer feedback records"],
    coreWorkflow: "building visible, explainable expertise through a track record of delivered work, not a title claimed without evidence",
    commonPitfall: "calling yourself an AI expert based on course completions alone, with no demonstrated project history",
    typicalOutput: "a portfolio of three to five explained case studies showing process and outcome",
  },
  "ai-skills": {
    displayName: "AI Skills",
    realTools: ["ChatGPT, Claude, or Gemini for the specific sub-skill", "A skill-specific tool, such as Canva for design or Descript for editing", "A personal skills tracker or portfolio"],
    coreWorkflow: "picking one specific applied AI skill, not \"AI\" broadly, and building competence through repeated real tasks",
    commonPitfall: "trying to learn AI as one broad skill instead of picking a specific, applicable sub-skill first",
    typicalOutput: "demonstrated competence in one specific AI-assisted task, with before-and-after examples",
  },
  "ai-learning-path": {
    displayName: "AI Learning Path",
    realTools: ["A written personal roadmap with milestones", "Practice projects attached to each milestone", "A review source such as a mentor, community, or self-review checklist"],
    coreWorkflow: "sequencing skills from fundamentals to applied practice with checkpoints, rather than consuming content in random order",
    commonPitfall: "jumping between unrelated tutorials without a sequence, so nothing compounds into real capability",
    typicalOutput: "a completed milestone-based roadmap with a project attached to each stage",
  },
  "ai-for-design": {
    displayName: "AI for Design",
    realTools: ["Midjourney, DALL-E, or Adobe Firefly for image generation", "Canva or Figma for assembly and refinement", "Adobe Photoshop for final touch-ups"],
    coreWorkflow: "using AI for rapid concept generation, then refining manually to meet brand and quality standards before shipping",
    commonPitfall: "shipping raw AI-generated visuals without refinement, brand-fit checks, or licensing verification",
    typicalOutput: "a finished, brand-consistent design asset with the AI-assisted draft and the final refined version both documented",
  },
  "ai-side-hustle": {
    displayName: "AI Side Hustle",
    realTools: ["ChatGPT or Claude for the core deliverable", "A simple invoicing or payment tool, such as Razorpay or PayPal", "A profile on a freelance platform"],
    coreWorkflow: "packaging one specific AI-assisted deliverable, not a vague \"AI services\" offer, that a real client would actually pay for",
    commonPitfall: "marketing a vague AI side hustle with no specific service, price, or target client defined",
    typicalOutput: "one clearly scoped paid deliverable, delivered at least once, with client feedback",
  },
  "ai-business-ideas": {
    displayName: "AI Business Ideas",
    realTools: ["A one-page business model canvas", "ChatGPT or Claude for market research drafts, verified independently", "A landing page tool such as Carrd or Framer to test demand"],
    coreWorkflow: "validating demand for an AI-enabled business idea with a real, cheap test — a landing page or pre-orders — before building anything",
    commonPitfall: "building a full product around an idea before checking whether anyone will actually pay for it",
    typicalOutput: "a validated or invalidated idea backed by real evidence — signups, pre-orders, or explicit customer interest",
  },
  "ai-for-productivity": {
    displayName: "AI for Productivity",
    realTools: ["ChatGPT or Claude for drafting and summarizing", "Notion or a similar tool for the workflow system", "A calendar or task tool to measure actual time saved"],
    coreWorkflow: "applying AI to one specific recurring task and measuring the real time saved, rather than adopting tools broadly and hoping",
    commonPitfall: "adding AI tools to a workflow without removing the old manual step, so total effort doesn't actually decrease",
    typicalOutput: "one documented workflow with a measured before-and-after time comparison",
  },
  "make-money-with-ai": {
    displayName: "Making Money with AI",
    realTools: ["One specific monetizable AI skill — writing, design, automation, or similar", "A platform to find clients, such as Upwork, LinkedIn, or referrals", "A simple pricing and invoicing setup"],
    coreWorkflow: "picking one AI-assisted skill, packaging it as a specific paid service, and finding the first paying client, not a general search for income methods",
    commonPitfall: "chasing several vague income methods at once instead of committing to one skill long enough to get paid for it",
    typicalOutput: "the first paid engagement completed and documented, however small",
  },
  "ai-career": {
    displayName: "AI Career path",
    realTools: ["A resume or portfolio highlighting AI-assisted project work", "LinkedIn optimized around a specific AI-adjacent role", "Real job listings used as a specification for what to build toward"],
    coreWorkflow: "targeting one specific role or title, then reverse-engineering the skills and portfolio pieces that role actually requires",
    commonPitfall: "preparing generically for AI jobs without picking a specific role, so the portfolio doesn't match any real job listing",
    typicalOutput: "a portfolio and resume tailored to a specific job title, with at least one project matching that role's real tasks",
  },
  "ai-freelancing": {
    displayName: "AI Freelancing",
    realTools: ["A freelance platform profile, such as Upwork or Fiverr, or direct outreach", "ChatGPT or Claude for service delivery", "A contract or scope template to avoid unpaid scope creep"],
    coreWorkflow: "offering one specific AI-assisted service with a clear scope and price, then delivering it reliably for early reviews",
    commonPitfall: "listing AI services too broadly, which reads as unclear to potential clients and gets ignored",
    typicalOutput: "a completed freelance gig with a client review, however small the first one is",
  },
  "ai-for-marketing": {
    displayName: "AI for Marketing",
    realTools: ["ChatGPT or Claude for content drafts", "Canva for creative assets", "A scheduling tool such as Buffer or Later for consistent output"],
    coreWorkflow: "using AI to increase content and campaign output volume without losing consistency in brand voice or quality control",
    commonPitfall: "scaling content volume with AI faster than the review process can keep quality consistent",
    typicalOutput: "a content calendar or campaign produced faster than before, with a documented review step",
  },
  "ai-for-sales": {
    displayName: "AI for Sales",
    realTools: ["ChatGPT or Claude for outreach drafts", "A CRM such as HubSpot or Zoho to track real conversion data", "LinkedIn Sales Navigator or similar for prospecting"],
    coreWorkflow: "using AI to draft and personalize outreach at scale, then tracking real reply and conversion rates to know if it's actually working",
    commonPitfall: "sending AI-drafted outreach that reads as generic because personalization wasn't actually checked before sending",
    typicalOutput: "a tracked outreach sequence with a measured reply or conversion rate, not just volume sent",
  },
  "ai-content-creation": {
    displayName: "AI Content Creation",
    realTools: ["ChatGPT or Claude for drafts", "Canva or CapCut for visual and video assembly", "A publishing calendar to track consistency"],
    coreWorkflow: "using AI to speed up drafting, then applying a human editing pass for accuracy, voice, and originality before publishing",
    commonPitfall: "publishing AI output directly without a fact-check or editing pass, risking factual errors or generic-sounding content",
    typicalOutput: "a published piece of content with a documented before (AI draft) and after (edited) version",
  },
  "ai-video-editing": {
    displayName: "AI Video Editing",
    realTools: ["CapCut, Premiere Pro, or DaVinci Resolve for editing", "AI-assisted caption or transcription tools such as Descript", "A render and export checklist for platform specs"],
    coreWorkflow: "using AI to speed up repetitive editing tasks such as captions and rough cuts, while keeping creative decisions manual",
    commonPitfall: "relying on AI-generated captions or cuts without reviewing them, leading to timing or accuracy errors in the final export",
    typicalOutput: "a finished, published edit with the AI-assisted steps clearly identified in the workflow",
  },
  "ai-jobs": {
    displayName: "AI Jobs",
    realTools: ["Job boards filtered for AI-adjacent roles", "A portfolio matching the specific job's real requirements", "LinkedIn for direct outreach to hiring teams"],
    coreWorkflow: "matching skills to specific real job listings rather than a generic AI jobs search, and tailoring the application to that listing",
    commonPitfall: "applying broadly to AI jobs with one generic resume instead of tailoring to what each listing actually asks for",
    typicalOutput: "a small number of tailored applications with a portfolio piece matching each target role",
  },
  "ai-tools": {
    displayName: "AI Tools",
    realTools: ["The specific tool being evaluated, which varies by task", "A comparison checklist covering cost, output quality, and integration", "A trial account to test before committing"],
    coreWorkflow: "choosing a tool based on a specific task's requirements, tested with a trial, not based on hype or a single review",
    commonPitfall: "subscribing to a new AI tool every time one trends, without finishing a real task with the tools already adopted",
    typicalOutput: "one tool chosen and integrated into a real workflow, with the decision criteria documented",
  },
  chatgpt: {
    displayName: "ChatGPT",
    realTools: ["ChatGPT, via the website or app", "Custom instructions or saved prompts for repeat tasks", "OpenAI's official usage documentation"],
    coreWorkflow: "using ChatGPT for a specific, repeatable task with a refined, saved prompt rather than starting from scratch each time",
    commonPitfall: "trusting ChatGPT's factual claims without verification, especially for current events, statistics, or citations",
    typicalOutput: "a reusable prompt or workflow for one specific task, with known limitations documented",
  },
  claude: {
    displayName: "Claude",
    realTools: ["Claude, via claude.ai or the app", "Projects or custom instructions for repeat tasks", "Anthropic's official usage documentation"],
    coreWorkflow: "using Claude for tasks needing longer context or more careful reasoning, verified against the source material provided",
    commonPitfall: "assuming Claude's output about material outside the given context or documents is already verified, when it may not be",
    typicalOutput: "a reusable Claude workflow for one specific task type, with source materials attached where relevant",
  },
  gemini: {
    displayName: "Gemini",
    realTools: ["Gemini, via gemini.google.com or the app", "Google Workspace integration with Docs or Sheets where relevant", "Google's official usage documentation"],
    coreWorkflow: "using Gemini's integration with Google tools for tasks that benefit from that ecosystem, verified independently for accuracy",
    commonPitfall: "assuming tighter Google integration means higher accuracy — verification is still required regardless of the tool",
    typicalOutput: "a Gemini-assisted workflow integrated with an existing Google Workspace process",
  },
  perplexity: {
    displayName: "Perplexity",
    realTools: ["Perplexity, via perplexity.ai", "The cited sources Perplexity provides with each answer", "A separate fact-check pass on high-stakes claims"],
    coreWorkflow: "using Perplexity for research questions, then checking the cited sources directly rather than trusting the summary alone",
    commonPitfall: "treating Perplexity's summarized answer as verified fact without opening the actual cited sources",
    typicalOutput: "a research summary with source links checked and any discrepancies noted",
  },
  "nano-banana": {
    displayName: "Nano Banana image generation",
    realTools: ["The specific platform hosting the model", "A prompt library for a consistent visual style", "An image editor for final touch-ups"],
    coreWorkflow: "generating image drafts quickly, then refining prompts iteratively to match a specific visual style before final use",
    commonPitfall: "using a single generated image without iterating the prompt, missing a noticeably better result a few tries away",
    typicalOutput: "a finished image asset with the refined prompt saved for reuse",
  },
  copilot: {
    displayName: "Copilot",
    realTools: ["GitHub Copilot or Microsoft Copilot depending on context", "The IDE or app it's integrated into", "Official Microsoft and GitHub documentation"],
    coreWorkflow: "using Copilot's suggestions as a starting point that gets reviewed and adjusted, not accepted automatically",
    commonPitfall: "accepting Copilot's code or content suggestions without reviewing them for correctness or security implications",
    typicalOutput: "reviewed, working output — code or content — with a note of which suggestions were kept versus modified",
  },
};

export function getFamilyFact(familyKey: string): FamilyFact | null {
  return FAMILY_FACTS[familyKey.trim().toLowerCase()] ?? null;
}
