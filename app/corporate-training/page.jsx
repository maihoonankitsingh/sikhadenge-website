export const dynamic = "force-dynamic";
export const revalidate = 0;
import FaqAccordion from "../components/FaqAccordion";

export const metadata = {
  title: "AI Digital Execution & Productivity Program for Teams | Sikhadenge",
  description:
    "A B2B AI capability program that helps marketing, content, creative, website, workflow, and communication teams execute digital work faster using AI.",
};

const proofItems = [
  "Marketing teams",
  "Content teams",
  "Creative teams",
  "Video teams",
  "Website / funnel teams",
  "Automation / workflow teams",
  "Sales / communication teams",
  "Founder / strategy teams",
];

const stats = [
  { value: "35K+", label: "LEARNERS", sub: "AI-first learning journeys", tone: "light" },
  { value: "20+", label: "MENTORS", sub: "execution-focused experts", tone: "light" },
  { value: "6+", label: "TEAM FUNCTIONS", sub: "one capability framework", tone: "light" },
  { value: "Live", label: "DELIVERY FORMAT", sub: "interactive practical sessions", tone: "light" },
  { value: "AI", label: "EXECUTION FOCUS", sub: "business-ready productivity", tone: "accent" },
];

const whyItems = [
  {
    title: "Beyond AI tool demos",
    text: "Most teams do not need more random tool exposure. They need a structured execution system that helps them turn AI into faster and more usable business output.",
  },
  {
    title: "Multi-team productivity gains",
    text: "The program is designed to support marketing, content, creative, video, website, workflow, communication, and strategy functions inside one practical capability framework.",
  },
  {
    title: "Execution over experimentation",
    text: "The focus stays on real work such as campaigns, content, creatives, pages, proposals, internal assets, and repeatable workflows instead of disconnected tutorials.",
  },
  {
    title: "Business-ready AI adoption",
    text: "Teams learn how to use AI with better clarity, stronger output standards, faster coordination, and more practical day-to-day productivity.",
  },
];

const audience = [
  "Marketing Teams",
  "Content Teams",
  "Creative Teams",
  "Video Teams",
  "Website / Funnel Teams",
  "Automation / Workflow Teams",
];

const offerings = [
  {
    title: "Corporate Workshops",
    points: [
      "Fast-track AI capability sessions",
      "Team-level productivity orientation",
      "Function-wise execution examples",
      "Live Q&A around real business workflows",
    ],
  },
  {
    title: "Team Capability Programs",
    points: [
      "Structured multi-session training format",
      "Role-based learning across departments",
      "Execution systems for recurring digital work",
      "Cross-functional alignment with AI workflows",
    ],
  },
];

const industries = [
  { title: "Marketing Campaigns", subtitle: "Ads, offers & campaign messaging" },
  { title: "Content Systems", subtitle: "Posts, scripts & content workflows" },
  { title: "Creative Production", subtitle: "Visual assets & brand execution" },
  { title: "Video Execution", subtitle: "Reels, promos & explainers" },
  { title: "Website & Funnels", subtitle: "Landing pages & conversion flows" },
  { title: "Automate Work with AI", subtitle: "Automation & productivity systems" },
];

const curriculum = [
  {
    title: "AI-assisted marketing campaign execution",
    desc: "Use AI to speed up campaign planning, messaging support, launch assets, and execution workflows across modern marketing teams.",
  },
  {
    title: "Content production systems for teams",
    desc: "Build structured content workflows for posts, scripts, briefs, and repeatable publishing support across teams.",
  },
  {
    title: "Creative asset generation and refinement workflows",
    desc: "Improve how teams create, refine, and scale visuals, brand assets, and design output with practical AI support.",
  },
  {
    title: "Video production support using AI-assisted processes",
    desc: "Support reels, promos, explainers, and short-form production workflows with faster AI-assisted execution.",
  },
  {
    title: "Landing page and website execution support",
    desc: "Help teams move faster on landing pages, web sections, and digital execution tasks linked to offers, campaigns, and funnels.",
  },
  {
    title: "Workflow automation and productivity improvement",
    desc: "Introduce practical AI workflows that reduce manual effort, improve handoffs, and increase day-to-day execution speed.",
  },
  {
    title: "Sales, proposal, and communication support workflows",
    desc: "Use AI to strengthen outreach support, internal communication, proposal drafting, and execution-side messaging systems.",
  },
  {
    title: "Team-wide execution systems for repeatable output",
    desc: "Create clearer internal systems so teams can deliver recurring output faster with better consistency and less friction.",
  },
];

const deliveryHighlights = [
  {
    title: "Execution-first live learning",
    desc: "Teams do not just watch tool demos. The sessions stay focused on practical execution, workflow clarity, and real business use-cases.",
  },
  {
    title: "Cross-functional capability building",
    desc: "The program can support marketing, content, creative, website, communication, and workflow teams inside one structured framework.",
  },
  {
    title: "Business-aligned AI adoption",
    desc: "Learning is mapped to actual output such as campaigns, pages, assets, communication tasks, and recurring internal workflows.",
  },
  {
    title: "Practical support for modern teams",
    desc: "The delivery is designed to help teams move faster, reduce manual effort, and improve execution quality with clearer systems.",
  },
];


const faqs = [
  {
    q: "What is this program exactly?",
    a: "This is an AI Digital Execution & Productivity Program for teams. It helps organizations improve how they execute marketing, content, creative, video, website, workflow, and communication tasks using AI.",
  },
  {
    q: "Is this only an AI tools training program?",
    a: "No. This is not positioned as random AI tool exposure or a simple demo-based training. The focus is on practical execution systems, team productivity, workflow improvement, and faster digital output.",
  },
  {
    q: "Which teams can benefit from this program?",
    a: "The program is relevant for marketing teams, content teams, creative teams, video teams, website or funnel teams, automation or workflow teams, sales or communication teams, and founder or strategy teams.",
  },
  {
    q: "What business outcomes does this training support?",
    a: "It supports faster campaign execution, stronger content systems, AI-assisted creative production, quicker website and landing page execution, better workflow automation, and improved team productivity.",
  },
  {
    q: "Can the program be customized for our company?",
    a: "Yes. The delivery can be aligned to your team structure, business goals, execution priorities, functions involved, and the kind of digital workflows your organization handles regularly.",
  },
  {
    q: "Is this suitable for cross-functional teams?",
    a: "Yes. This program is especially useful when marketing, content, creative, communication, and execution teams need a more connected and practical AI-enabled workflow system.",
  },
  {
    q: "Do you cover workflows beyond marketing and design?",
    a: "Yes. The program can also support video workflows, landing page execution, website support, AI workflows, productivity systems, proposal support, internal communication tasks, and repeatable execution processes.",
  },
  {
    q: "Is the training live or recorded?",
    a: "The primary format is live and interactive so teams can discuss real workflows, understand use-cases clearly, ask questions, and align the learning with business execution needs.",
  },
  {
    q: "How do we discuss pricing and scope?",
    a: "You can connect directly on WhatsApp or email to discuss your team size, business goals, preferred format, scope, and the functions you want to include in the program.",
  },
  {
    q: "How do we get started?",
    a: "Start by sharing your requirement, teams involved, and expected outcomes. After that, the structure, delivery format, and next steps can be discussed directly.",
  },
  {
    q: "Is this useful for companies that are just starting with AI adoption?",
    a: "Yes. The program can be structured for teams that are early in their AI adoption journey and need clarity, direction, and practical execution use-cases instead of overwhelming tool exposure.",
  },
  {
    q: "Can this program improve day-to-day team productivity?",
    a: "Yes. One of the main goals is to help teams reduce manual effort, move faster on recurring digital work, and improve execution quality through practical AI-assisted workflows.",
  },
];

function SectionTitle({ eyebrow, title, desc, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700 shadow-sm">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function SoftCard({ title, text }) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-[#D8DDE6] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6 shadow-[0_10px_26px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFCCDF] hover:shadow-[0_16px_40px_rgba(37,99,235,0.10)] md:p-7">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#F5B301]/70" />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1220] shadow-[0_10px_20px_rgba(11,18,32,0.12)]">
          <WhyGlyph title={title} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[24px] font-semibold tracking-tight text-[#0B1220] leading-tight">
            {title}
          </h3>
          {text ? (
            <p className="mt-4 text-[15px] leading-8 text-[#425A78]">
              {text}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AudienceGlyph({ title }) {
  const cls = "h-5 w-5 text-[#2563EB]";
  switch (title) {
    case "Marketing teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4.5 14.5V9.8c0-.9.7-1.6 1.6-1.6h2.4l7-2.7v13l-7-2.7H6.1c-.9 0-1.6-.7-1.6-1.6Z" strokeLinejoin="round" />
          <path d="M15.5 9.5a3 3 0 0 1 0 5" strokeLinecap="round" />
        </svg>
      );
    case "Content teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
        </svg>
      );
    case "In-house creative teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 19.5 15.5 9" strokeLinecap="round" />
          <path d="m14.5 8 1.8-1.8a2.1 2.1 0 1 1 3 3L17.5 11" strokeLinecap="round" />
          <path d="M4.5 20l3.7-.8L6 17z" strokeLinejoin="round" />
        </svg>
      );
    case "Brand communication teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M8 8h8v8H8z" />
        </svg>
      );
    case "Institutes & academic teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="m3.5 9 8.5-4 8.5 4-8.5 4-8.5-4Z" strokeLinejoin="round" />
          <path d="M7 11.2V15c0 .6.4 1.2 1 1.5 1.1.6 2.4 1 4 1s2.9-.4 4-1c.6-.3 1-.9 1-1.5v-3.8" strokeLinecap="round" />
        </svg>
      );
    case "Social media teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.2" />
          <path d="M16.8 7.2h.01" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      );
    case "Growing brands & SMEs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 16l4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 9h4v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Execution-focused organizations":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
  }
}

function WhyGlyph({ title }) {
  const cls = "h-5 w-5 text-[#F5B301]";
  switch (title) {
    case "Practical team upskilling":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 16l4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 9h4v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Role-relevant learning":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-1A3.5 3.5 0 0 0 8 17.5V19" strokeLinecap="round" />
          <circle cx="12" cy="9" r="3" />
          <path d="M19 19v-1a2.5 2.5 0 0 0-2.5-2.5M5 19v-1A2.5 2.5 0 0 1 7.5 15.5" strokeLinecap="round" />
        </svg>
      );
    case "AI with process clarity":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="2.8" />
          <path d="M12 4.5v2M12 17.5v2M19.5 12h-2M6.5 12h-2M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4M17.3 17.3l-1.4-1.4M8.1 8.1 6.7 6.7" strokeLinecap="round" />
        </svg>
      );
    case "Business-ready execution":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="5" width="6" height="6" rx="1.5" />
          <rect x="14" y="5" width="6" height="6" rx="1.5" />
          <rect x="9" y="13" width="6" height="6" rx="1.5" />
          <path d="M10 8h4M12 11v2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
  }
}

function StatGlyph({ label }) {
  const cls = "h-5 w-5 text-[#F5B301]";
  switch (label) {
    case "Execution systems":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="5" width="6" height="6" rx="1.5" />
          <rect x="14" y="5" width="6" height="6" rx="1.5" />
          <rect x="9" y="13" width="6" height="6" rx="1.5" />
          <path d="M10 8h4M12 11v2" strokeLinecap="round" />
        </svg>
      );
    case "Workflow standardization":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 7h9M5 12h14M5 17h10" strokeLinecap="round" />
          <circle cx="17" cy="7" r="2" />
          <circle cx="11" cy="17" r="2" />
        </svg>
      );
    case "Assisted production clarity":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="2.8" />
          <path d="M12 4.5v2M12 17.5v2M19.5 12h-2M6.5 12h-2M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4M17.3 17.3l-1.4-1.4M8.1 8.1 6.7 6.7" strokeLinecap="round" />
        </svg>
      );
    case "Team-focused training format":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-1A3.5 3.5 0 0 0 8 17.5V19" strokeLinecap="round" />
          <circle cx="12" cy="9" r="3" />
          <path d="M19 19v-1a2.5 2.5 0 0 0-2.5-2.5M5 19v-1A2.5 2.5 0 0 1 7.5 15.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function CurriculumGlyph({ title }) {
  const cls = "h-7 w-7 text-[#2563EB]";
  switch (title) {
    case "AI-assisted marketing campaign execution":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4.5 14.5V9.8c0-.9.7-1.6 1.6-1.6h2.4l7-2.7v13l-7-2.7H6.1c-.9 0-1.6-.7-1.6-1.6Z" strokeLinejoin="round" />
          <path d="M15.5 9.5a3 3 0 0 1 0 5" strokeLinecap="round" />
        </svg>
      );
    case "Content production systems for teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
        </svg>
      );
    case "Creative asset generation and refinement workflows":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 19.5 15.5 9" strokeLinecap="round" />
          <path d="m14.5 8 1.8-1.8a2.1 2.1 0 1 1 3 3L17.5 11" strokeLinecap="round" />
          <path d="M4.5 20l3.7-.8L6 17z" strokeLinejoin="round" />
          <path d="M8 16l2 2" strokeLinecap="round" />
        </svg>
      );
    case "Video production support using AI-assisted processes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3.5" y="6" width="12" height="12" rx="2.5" />
          <path d="m15.5 10 5-3v10l-5-3" strokeLinejoin="round" />
          <path d="M7 9.5h5M7 12h5M7 14.5h3" strokeLinecap="round" />
        </svg>
      );
    case "Landing page and website execution support":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M3.5 9h17" strokeLinecap="round" />
          <path d="M7 7h.01M10 7h.01" strokeLinecap="round" strokeWidth="2.4" />
          <path d="M7.5 12.5h9M7.5 16h5.5" strokeLinecap="round" />
        </svg>
      );
    case "Workflow automation and productivity improvement":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="2.7" />
          <path d="M12 4.5v2.2M12 17.3v2.2M19.5 12h-2.2M6.7 12H4.5M17.3 6.7l-1.6 1.6M8.3 15.7l-1.6 1.6M17.3 17.3l-1.6-1.6M8.3 8.3 6.7 6.7" strokeLinecap="round" />
        </svg>
      );
    case "Sales, proposal, and communication support workflows":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M7 8h10M7 12h7M7 16h5" strokeLinecap="round" />
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
        </svg>
      );
    case "Team-wide execution systems for repeatable output":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-1A3.5 3.5 0 0 0 8 17.5V19" strokeLinecap="round" />
          <circle cx="12" cy="9" r="3" />
          <path d="M19 19v-1a2.5 2.5 0 0 0-2.5-2.5M5 19v-1A2.5 2.5 0 0 1 7.5 15.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
  }
}


function DeliveryHighlightGlyph({ title }) {
  const cls = "h-7 w-7 text-[#2563EB]";
  switch (title) {
    case "Execution-first live learning":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="5" width="16" height="12" rx="2.5" />
          <path d="M8 9h8M8 12h5" strokeLinecap="round" />
          <path d="M10 19h4" strokeLinecap="round" />
        </svg>
      );
    case "Cross-functional capability building":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-1A3.5 3.5 0 0 0 8 17.5V19" strokeLinecap="round" />
          <circle cx="12" cy="9" r="3" />
          <path d="M19 19v-1a2.5 2.5 0 0 0-2.5-2.5M5 19v-1A2.5 2.5 0 0 1 7.5 15.5" strokeLinecap="round" />
        </svg>
      );
    case "Business-aligned AI adoption":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="2.7" />
          <path d="M12 4.5v2.2M12 17.3v2.2M19.5 12h-2.2M6.7 12H4.5M17.3 6.7l-1.6 1.6M8.3 15.7l-1.6 1.6M17.3 17.3l-1.6-1.6M8.3 8.3 6.7 6.7" strokeLinecap="round" />
        </svg>
      );
    case "Practical support for modern teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 16l4-4 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 9h4v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
  }
}

function IndustryGlyph({ title }) {
  const cls = "h-8 w-8 text-white";

  switch (title) {
    case "Marketing Campaigns":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M4.5 14.5V9.8c0-.9.7-1.6 1.6-1.6h2.4l7-2.7v13l-7-2.7H6.1c-.9 0-1.6-.7-1.6-1.6Z" strokeLinejoin="round" />
          <path d="M15.5 9.5a3 3 0 0 1 0 5" strokeLinecap="round" />
        </svg>
      );

    case "Content Systems":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
        </svg>
      );

    case "Creative Production":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <path d="M5 19.5 15.5 9" strokeLinecap="round" />
          <path d="m14.5 8 1.8-1.8a2.1 2.1 0 1 1 3 3L17.5 11" strokeLinecap="round" />
          <path d="M4.5 20l3.7-.8L6 17z" strokeLinejoin="round" />
          <path d="M8 16l2 2" strokeLinecap="round" />
        </svg>
      );

    case "Video Execution":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3.5" y="6" width="12" height="12" rx="2.5" />
          <path d="m15.5 10 5-3v10l-5-3" strokeLinejoin="round" />
          <path d="M7 9.5h5M7 12h5M7 14.5h3" strokeLinecap="round" />
        </svg>
      );

    case "Website & Funnels":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
          <path d="M3.5 9h17" strokeLinecap="round" />
          <path d="M7 7h.01M10 7h.01" strokeLinecap="round" strokeWidth="2.4" />
          <path d="M7.5 12.5h9M7.5 16h5.5" strokeLinecap="round" />
        </svg>
      );

    case "Automate Work with AI":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <circle cx="12" cy="12" r="2.7" />
          <path d="M12 4.5v2.2M12 17.3v2.2M19.5 12h-2.2M6.7 12H4.5M17.3 6.7l-1.6 1.6M8.3 15.7l-1.6 1.6M17.3 17.3l-1.6-1.6M8.3 8.3 6.7 6.7" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      );
  }
}

export default function CorporateTrainingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <section className="border-b border-slate-200 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1100px] rounded-[24px] border border-[#E6DDCB] bg-[#F5EFE3] px-5 py-6 text-center shadow-sm md:px-7 md:py-8">
            <div className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[12px] font-medium text-blue-700 shadow-sm">
              Sikhadenge • Corporate Training
            </div>

            <h1 className="mx-auto mt-4 max-w-[780px] text-[28px] font-bold tracking-tight text-slate-950 md:text-[44px] leading-[1.02]">
              AI Digital Execution & Productivity
              <br />
              Program for Teams
            </h1>

            <div className="mx-auto mt-4 h-[2px] w-12 rounded bg-[#2563EB]" />

            <p className="mx-auto mt-4 max-w-[680px] text-[13px] leading-6 text-slate-600 md:text-[15px]">
              Helping modern teams execute marketing, content, creative, websites, workflows,
              and communication faster using AI.
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/918808505575"
                className="inline-flex items-center justify-center rounded-xl bg-[#22C55E] px-4 py-2.5 text-[14px] font-semibold text-white shadow-md transition hover:opacity-95"
              >
                Talk on WhatsApp
              </a>
              <a
                href="mailto:support@sikhadenge.in"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Request Details
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEE8DC]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
          <SectionTitle
            eyebrow="Proof of fit"
            title="Built for modern execution-focused teams"
            desc="Suitable for organizations that want faster digital execution across marketing, content, creative, websites, workflows, communication, and cross-functional productivity."
            center
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proofItems.map((item) => (
              <div
                key={item}
                className="group rounded-[24px] border border-[#D8DDE6] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFCCDF] hover:shadow-[0_16px_34px_rgba(37,99,235,0.10)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] shadow-sm">
                    <AudienceGlyph title={item} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[16px] font-semibold leading-6 tracking-tight text-[#0B1220]">
                      {item}
                    </div>
                    <div className="mt-1 text-[13px] leading-6 text-[#51627A]">
                      Structured capability building for recurring internal execution needs.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 md:px-8 md:py-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_0.95fr_1.15fr_1fr_1.1fr]">
            {stats.map((item) => (
              <div
                key={item.label}
                className={
                  item.tone === "accent"
                    ? "relative overflow-hidden rounded-[22px] border border-[#1D4ED8]/20 bg-[linear-gradient(135deg,#0B1220_0%,#111827_65%,#0B1220_100%)] px-6 py-4 shadow-[0_8px_18px_rgba(37,99,235,0.12)]"
                    : "rounded-[20px] border border-[#D8DDE6] bg-white px-6 py-4 shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
                }
              >
                {item.tone === "accent" ? (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(37,99,235,0.16),transparent_30%)]" />
                    <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                      <div className="flex items-end gap-2 opacity-95">
                        <span className="h-9 w-3 rounded-[2px] bg-[#2563EB]/75 shadow-[0_0_14px_rgba(37,99,235,0.35)]" />
                        <span className="h-[58px] w-3 rounded-[2px] bg-[#F5B301] shadow-[0_0_14px_rgba(245,179,1,0.28)]" />
                      </div>
                    </div>
                  </>
                ) : null}

                <div
                  className={
                    item.tone === "accent"
                      ? "relative z-[1] text-[26px] font-bold leading-none tracking-tight text-[#F5B301] md:text-[32px]"
                      : "text-[24px] font-bold leading-none tracking-tight text-[#0B1220] md:text-[30px]"
                  }
                >
                  {item.value}
                </div>

                <div
                  className={
                    item.tone === "accent"
                      ? "relative z-[1] mt-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-white"
                      : "mt-3 text-[10px] font-medium uppercase tracking-[0.07em] text-[#37557A]"
                  }
                >
                  {item.label}
                </div>

                <div
                  className={
                    item.tone === "accent"
                      ? "relative z-[1] mt-2 max-w-[170px] text-[12px] leading-6 text-[#B0B7C3]"
                      : "mt-2 text-[12px] leading-5 text-[#6B7A90]"
                  }
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-5 pb-8 md:px-8 md:pt-6 md:pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-medium tracking-normal text-blue-700 shadow-sm">
              Why learn with Sikhadenge
            </div>
            <h2 className="mt-2 max-w-[760px] text-[24px] font-bold tracking-tight text-[#0B1220] md:text-[34px] leading-[1.08]">
              How teams benefit from the delivery model
            </h2>
          </div>

          <div className="mt-7 grid gap-x-10 gap-y-7 lg:grid-cols-2">
            {deliveryHighlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[16px] border border-[#DBEAFE] bg-[#EFF6FF] shadow-sm">
                  <DeliveryHighlightGlyph title={item.title} />
                </div>

                <div className="min-w-0 pt-1">
                  <h3 className="text-[16px] font-semibold leading-7 tracking-tight text-[#0B1220]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-7 text-[#425A78]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
          <SectionTitle
            eyebrow="Why learn with Sikhadenge"
            title="Why teams need structured AI capability building"
            desc="Modern teams are expected to execute more digital work with higher speed and better consistency. The real gap is not effort. It is system clarity, workflow design, and practical AI adoption."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyItems.map((item) => (
              <SoftCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-medium tracking-normal text-blue-700 shadow-sm">
              Program formats
            </div>
            <h2 className="mt-3 max-w-2xl text-[28px] font-bold tracking-tight text-[#0B1220] md:text-[38px]">
              Flexible options for team capability building
            </h2>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[24px] border border-[#143B8F]/16 bg-[linear-gradient(135deg,#00133C_0%,#001B56_55%,#00153F_100%)] px-8 py-7 text-white shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2563EB]/80 via-[#1D4ED8]/60 to-transparent opacity-70" />

                <div className="relative z-[1] flex items-start justify-between gap-4">
                  <h3 className="text-[24px] font-semibold tracking-tight text-white md:text-[25px] leading-tight">
                    {item.title}
                  </h3>

                  <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_14px_rgba(37,99,235,0.10)] md:flex">
                    <span className="text-lg text-[#F5B301]">✦</span>
                  </div>
                </div>

                <div className="relative z-[1] mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-4">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#60A5FA]/28 bg-[#2563EB] text-white shadow-[0_0_0_3px_rgba(37,99,235,0.10)]">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.26a1 1 0 0 1-1.42 0l-3-3.025a1 1 0 1 1 1.42-1.408l2.29 2.31 6.49-6.545a1 1 0 0 1 1.414-.006Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>

                      <span className="text-[13px] leading-6 text-white/95 md:text-[14px]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#F5F1E8_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-medium tracking-normal text-blue-700 shadow-sm">
              Capability coverage
            </div>
            <h2 className="mt-3 max-w-2xl text-[28px] font-bold tracking-tight text-[#0B1220] md:text-[38px]">
              What the program can support
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[32px] border border-[#2563EB]/10 bg-[linear-gradient(180deg,#001635_0%,#00112A_100%)] px-5 py-10 text-center text-white shadow-[0_10px_30px_rgba(0,11,34,0.10)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(37,99,235,0.16)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#F5B301]/55 opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(37,99,235,0.15),transparent_42%)]" />

                <div className="relative z-[1] mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                  <IndustryGlyph title={item.title} />
                </div>

                <div className="relative z-[1] mt-8 text-[17px] font-semibold tracking-tight text-white leading-tight">
                  {item.title}
                </div>

                <div className="relative z-[1] mt-3 text-[12px] leading-5 text-[#C7D0E0]">
                  {item.subtitle}
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16">
          <SectionTitle
            eyebrow="Curriculum"
            title="What the program covers"
            desc="A structured capability framework covering marketing execution, content systems, creative production, website support, workflow automation, and AI-assisted productivity."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {curriculum.map((item) => (
              <div
                key={item.title}
                className="group rounded-[24px] border border-[#D8DDE6] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#BFCCDF] hover:shadow-[0_16px_34px_rgba(37,99,235,0.10)]"
              >
                <div className="mb-5 flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#DBEAFE] bg-[#EFF6FF] shadow-sm">
                  <CurriculumGlyph title={item.title} />
                </div>

                <h3 className="text-[19px] font-semibold leading-7 tracking-tight text-[#0B1220]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-[#425A78]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      <section className="bg-[linear-gradient(180deg,#F5F1E8_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-8">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="pt-2">
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-medium tracking-normal text-blue-700 shadow-sm">
                Business inquiry
              </div>

              <h2 className="mt-4 max-w-[620px] text-[30px] font-bold tracking-tight text-[#0B1220] md:text-[42px] leading-[1.06]">
                Ready to discuss your team capability requirement?
              </h2>

              <p className="mt-5 max-w-[560px] text-[15px] leading-8 text-[#425A78] md:text-[17px]">
                Share your team structure, functions involved, and business goals.
                We will align the discussion around execution needs, workflows, and capability priorities.
              </p>

              <div className="mt-8 h-px w-full max-w-[420px] bg-[#D9D3C7]" />

              <div className="mt-7 space-y-6">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#37557A]">
                    Email
                  </div>
                  <div className="mt-2 text-[20px] font-semibold tracking-tight text-[#0B1220]">
                    support@sikhadenge.in
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.14em] text-[#37557A]">
                    Phone / WhatsApp
                  </div>
                  <div className="mt-2 text-[20px] font-semibold tracking-tight text-[#0B1220]">
                    +91-8808505575
                  </div>
                </div>

                <div className="pt-3 text-[14px] text-[#425A78]">
                  Typical response time: within business hours
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#D8DDE6] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
              <div className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#37557A]">
                Team capability inquiry
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Work Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your work email"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Team Size
                  </label>
                  <select
                    defaultValue=""
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE]"
                  >
                    <option value="" disabled>
                      Select team size
                    </option>
                    <option>1-10</option>
                    <option>11-25</option>
                    <option>26-50</option>
                    <option>50+</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Preferred Training Mode
                  </label>
                  <input
                    type="text"
                    placeholder="Online / Offline / Hybrid"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-[#0B1220]">
                    Training Requirement
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us about your team, workflow, and training requirement"
                    className="w-full rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-[#DBEAFE] placeholder:text-slate-400"
                  />
                </div>

                <a
                  href="https://wa.me/918808505575"
                  className="mt-3 inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-6 py-4 text-[16px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:bg-[#1D4ED8] sm:col-span-2"
                >
                  Discuss on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <SectionTitle
            eyebrow="FAQs"
            title="Frequently asked questions"
            desc="Everything organizations usually want to know before planning an AI Digital Execution & Productivity Program for teams."
          />

          <FaqAccordion items={faqs.map((item) => [item.q, item.a])} />
        </div>
      </section>

      <section className="bg-[#000B22] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),radial-gradient(circle_at_center,rgba(37,99,235,0.16),transparent_24%)] bg-[size:72px_72px,72px_72px,100%_100%] bg-center">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-8">
          <div className="mx-auto max-w-3xl rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,18,46,0.92)_0%,rgba(10,23,53,0.90)_45%,rgba(8,17,38,0.92)_100%)] px-5 py-6 text-center shadow-[0_0_14px_rgba(37,99,235,0.12)] md:px-7 md:py-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-semibold tracking-[0.15em] text-[#D6C3AF] uppercase shadow-[0_0_12px_rgba(37,99,235,0.10)]">
              <span className="text-[#F5B301]">✦</span>
              Sikhadenge Corporate Training
            </div>

            <h2 className="mx-auto mt-4 max-w-[700px] text-[24px] font-bold tracking-tight text-white md:text-[34px] leading-[1.06]">
              Discuss your team capability requirement
            </h2>

            <p className="mx-auto mt-3 max-w-[620px] text-[13px] leading-6 text-[#C7D0E0] md:text-[15px]">
              Connect with Sikhadenge to plan an AI Digital Execution & Productivity Program
              for teams across marketing, content, creative, websites, workflows, and communication.
            </p>

            <div className="mt-5 flex items-center justify-center">
              <a
                href="https://wa.me/918808505575"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2 text-[14px] font-semibold text-[#0B1220] shadow-[0_8px_18px_rgba(255,255,255,0.08)] transition hover:translate-y-[-1px]"
              >
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
