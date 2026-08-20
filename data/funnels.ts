import type { FunnelConfig, FunnelProduct, OfferMode } from "../lib/funnel/types";

const sharedAudiences = [
  { title: "Students & Job Seekers", description: "Build practical AI workflows you can use in study, projects and career preparation." },
  { title: "Working Professionals", description: "Reduce repetitive digital work and improve research, writing and execution quality." },
  { title: "Freelancers & Creators", description: "Create faster, structure client work and turn repeat tasks into reusable workflows." },
  { title: "Business Owners", description: "Use AI to improve research, communication, planning and everyday operating workflows." },
];

const sharedFaqs = [
  { question: "Is this masterclass live?", answer: "Yes. The session is designed as a live, practical masterclass with demonstrations and Q&A." },
  { question: "Is it beginner friendly?", answer: "Yes. You do not need coding experience. Basic comfort with a browser and online tools is enough." },
  { question: "Which language is used?", answer: "The session is delivered in easy Hinglish so concepts remain practical and clear." },
  { question: "Do I need a paid AI subscription?", answer: "No paid plan is required to understand the core workflows shown in the masterclass. Some advanced capabilities can vary by product plan." },
  { question: "Where will I get the joining link?", answer: "After registration, important updates and joining instructions are sent through the registered WhatsApp number and the official SikhaDenge communication flow." },
  { question: "Is SikhaDenge affiliated with OpenAI or Anthropic?", answer: "No. SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI and Claude is a product of Anthropic." },
];

const EVENT_DATE = process.env.NEXT_PUBLIC_MASTERCLASS_DATE_LABEL || "Next Live Batch";
const EVENT_TIME = process.env.NEXT_PUBLIC_MASTERCLASS_TIME_LABEL || "8:00 PM IST";
const ENTRY_PRICE = Number(process.env.NEXT_PUBLIC_MASTERCLASS_ENTRY_PRICE || "9") || 9;
const WORKSHOP_PRICE = Number(process.env.NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_PRICE || "1499") || 1499;
const WORKSHOP_REGULAR_PRICE = Number(process.env.NEXT_PUBLIC_IMPLEMENTATION_WORKSHOP_REGULAR_PRICE || "1999") || 1999;

const CHATGPT_BATCH_ID =
  process.env.NEXT_PUBLIC_CHATGPT_MASTERCLASS_BATCH_ID ||
  `chatgpt:${EVENT_DATE}:${EVENT_TIME}`;
const CLAUDE_BATCH_ID =
  process.env.NEXT_PUBLIC_CLAUDE_MASTERCLASS_BATCH_ID ||
  `claude:${EVENT_DATE}:${EVENT_TIME}`;

const productBase: Record<
  FunnelProduct,
  Omit<FunnelConfig, "id" | "offerMode" | "entryPrice" | "ctaLabel">
> = {
  chatgpt: {
    batchId: CHATGPT_BATCH_ID,
    product: "chatgpt",
    productLabel: "ChatGPT",
    badge: "LIVE • CHATGPT MASTERCLASS",
    theme: "blue",
    heroTitle: "Stop Chatting With AI.",
    heroHighlight: "Start Working With It.",
    heroDescription:
      "Learn practical ChatGPT workflows for better prompting, research, documents, data, communication and everyday productivity — live and beginner friendly.",
    metaTitle: "Live ChatGPT Masterclass | SikhaDenge",
    metaDescription:
      "Join SikhaDenge's live practical ChatGPT masterclass and learn prompting, research, document, data and productivity workflows.",
    dateLabel: EVENT_DATE,
    timeLabel: EVENT_TIME,
    languageLabel: "Easy Hinglish",
    durationLabel: "Focused Live Session",
    problemTitle: "You may be using only a fraction of what ChatGPT can do",
    problemDescription:
      "Random prompts can produce random results. The masterclass focuses on repeatable workflows instead of collecting more prompts and tools.",
    outcomes: [
      { title: "Better Prompting", description: "Structure instructions so outputs become clearer, more useful and easier to repeat." },
      { title: "Research Workflows", description: "Turn broad questions into structured research and decision-ready summaries." },
      { title: "Files & Documents", description: "Work more effectively with briefs, PDFs, notes and long-form information." },
      { title: "Data & Productivity", description: "Use AI to reason through tables, repetitive tasks and everyday digital workflows." },
      { title: "Professional Communication", description: "Improve drafts, summaries, proposals and structured business communication." },
      { title: "Reusable AI Systems", description: "Move from one-off chats to repeatable ways of working with AI." },
    ],
    demos: [
      { eyebrow: "DEMO 01", title: "Basic prompt → structured professional output", description: "See how instruction design changes clarity, format and usefulness." },
      { eyebrow: "DEMO 02", title: "Scattered information → research workflow", description: "Turn a messy research task into a structured process with clear outputs." },
      { eyebrow: "DEMO 03", title: "Manual task → repeatable AI workflow", description: "See how a recurring digital task can be converted into a faster working system." },
    ],
    audiences: sharedAudiences,
    bonuses: [
      "ChatGPT Prompt Starter Pack",
      "Professional Prompt Framework",
      "AI Research Checklist",
      "ChatGPT Workflow Map",
      "Masterclass Workbook",
    ],
    faqs: sharedFaqs,
    workshopName: "ChatGPT Implementation Workshop",
    workshopPrice: WORKSHOP_PRICE,
    workshopRegularPrice: WORKSHOP_REGULAR_PRICE,
  },
  claude: {
    batchId: CLAUDE_BATCH_ID,
    product: "claude",
    productLabel: "Claude",
    badge: "LIVE • CLAUDE MASTERCLASS",
    theme: "amber",
    heroTitle: "Don't Just Ask Claude Questions.",
    heroHighlight: "Build Real Work With It.",
    heroDescription:
      "Learn practical Claude workflows for deep research, long documents, structured writing, projects and interactive work — live and beginner friendly.",
    metaTitle: "Live Claude Masterclass | SikhaDenge",
    metaDescription:
      "Join SikhaDenge's live practical Claude masterclass and learn deep research, long-document, writing, project and workflow use cases.",
    dateLabel: EVENT_DATE,
    timeLabel: EVENT_TIME,
    languageLabel: "Easy Hinglish",
    durationLabel: "Focused Live Session",
    problemTitle: "Claude becomes valuable when it is part of a real workflow",
    problemDescription:
      "The goal is not to compare AI brands blindly. It is to understand where deep reading, structured thinking, long-form work and reusable context can improve your output.",
    outcomes: [
      { title: "Deep Document Work", description: "Break down long information into structured insights, questions and action points." },
      { title: "Research & Synthesis", description: "Organize complex research tasks into a more deliberate, reviewable workflow." },
      { title: "Structured Writing", description: "Plan, draft and refine longer professional documents with better consistency." },
      { title: "Reusable Project Context", description: "Learn how persistent project context can reduce repeated setup work." },
      { title: "Artifacts & Prototypes", description: "Understand how interactive outputs can move ideas closer to something usable." },
      { title: "Professional Deep Work", description: "Use Claude as a deliberate work partner rather than a generic question-answer box." },
    ],
    demos: [
      { eyebrow: "DEMO 01", title: "Long document → structured insight map", description: "See how a dense source can become a clearer working brief." },
      { eyebrow: "DEMO 02", title: "Research question → synthesis workflow", description: "Turn multiple considerations into a structured analysis path." },
      { eyebrow: "DEMO 03", title: "Idea → interactive working artifact", description: "See how a concept can be shaped into a more usable interactive output." },
    ],
    audiences: sharedAudiences,
    bonuses: [
      "Claude Workflow Cheatsheet",
      "Deep Work Prompt Framework",
      "Long-Document Review Checklist",
      "AI Research Planning Sheet",
      "Masterclass Workbook",
    ],
    faqs: sharedFaqs,
    workshopName: "Claude Deep Work & Implementation Workshop",
    workshopPrice: WORKSHOP_PRICE,
    workshopRegularPrice: WORKSHOP_REGULAR_PRICE,
  },
};

export function getFunnelConfig(product: FunnelProduct, offerMode: OfferMode): FunnelConfig {
  const base = productBase[product];
  const entryPrice = offerMode === "free" ? 0 : ENTRY_PRICE;

  return {
    ...base,
    id: `${product}-${offerMode}`,
    offerMode,
    entryPrice,
    ctaLabel:
      offerMode === "free"
        ? "Reserve My Free Seat"
        : `Reserve My Seat for ₹${entryPrice}`,
  };
}
