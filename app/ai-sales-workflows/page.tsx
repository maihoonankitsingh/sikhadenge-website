import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Headphones,
  Lightbulb,
  MessageSquare,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Sales Workflows | Sikhadenge",
  description:
    "Understand AI sales workflows in a practical way. Learn how structured AI-assisted systems help with lead understanding, qualification, pitch support, objection handling, follow-up planning, and repeatable sales execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-sales-workflows",
  },
  openGraph: {
    title: "AI Sales Workflows | Sikhadenge",
    description:
      "A practical guide to AI sales workflows across lead understanding, qualification, pitch support, objection handling, follow-up planning, and repeatable execution.",
    url: "https://sikhadenge.in/ai-sales-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Sales Workflows | Sikhadenge",
    description:
      "A practical guide to AI sales workflows across lead understanding, qualification, pitch support, objection handling, follow-up planning, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI sales workflows are structured systems that use AI support for lead understanding, qualification, pitch clarity, objection handling, follow-up sequencing, and repeatable sales execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, sales teams become inconsistent and reactive. A structured system improves clarity, speed, lead quality handling, and more disciplined follow-up execution.",
  },
  {
    title: "Who benefits",
    desc: "Sales teams, founders, freelancers, consultants, agencies, educators, and service businesses all benefit from stronger AI-assisted sales workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than one sales script",
    desc: "AI sales workflows are not limited to generating a single pitch message. They connect lead understanding, qualification, needs mapping, pitch direction, objection handling, and follow-up into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support multiple sales stages",
    desc: "A useful workflow uses AI across lead summaries, qualification prompts, custom pitch support, response drafting, follow-up planning, and conversation refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better sales execution",
    desc: "A strong workflow helps sales become easier to manage, easier to repeat, easier to improve, and easier to scale across different team members and lead types.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business systems",
    desc: "Modern sales performance often depends on better process quality. Random calling or random messaging usually weakens trust, follow-up discipline, and conversion consistency.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Lead, Need & Intent Clarity",
    desc: "Start by identifying who the lead is, what problem they want solved, how serious the interest is, what budget or readiness signals exist, and what outcome matters most.",
  },
  {
    icon: ClipboardList,
    title: "Qualification & Prioritization",
    desc: "Use AI to structure qualification questions, segment leads by intent level, identify red flags, and create better priorities for sales attention and follow-up order.",
  },
  {
    icon: FileText,
    title: "Pitch & Message Support",
    desc: "Build clearer explanations, short pitch formats, tailored responses, value summaries, comparison points, and decision-oriented communication for the lead.",
  },
  {
    icon: MessageSquare,
    title: "Objection Handling & Response Direction",
    desc: "Plan how to respond to price doubts, trust gaps, timing concerns, confusion, hesitation, and common buying objections with more structure and relevance.",
  },
  {
    icon: RefreshCcw,
    title: "Follow-Up & Conversion Loop",
    desc: "Refine follow-up timing, reminder patterns, message sequences, re-engagement prompts, and conversion improvement steps through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Sales System",
    desc: "Organize qualification logic, pitch templates, objection banks, follow-up structures, response patterns, and training notes into a repeatable sales execution system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Sales Teams",
    desc: "Sales teams can use AI sales workflows to improve consistency, better handle objections, maintain follow-up discipline, and increase execution quality across members.",
  },
  {
    icon: Sparkles,
    title: "Founders & Small Businesses",
    desc: "Founders and small businesses can use these workflows to create more structured sales communication without building a large manual sales process from scratch.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Consultants",
    desc: "Freelancers and consultants can use workflow systems to qualify client leads, pitch clearly, respond faster, and improve conversion conversations.",
  },
  {
    icon: Users,
    title: "Education & Service Businesses",
    desc: "Education brands and service businesses can use structured workflows to improve lead handling, counselling support, follow-up quality, and conversion readiness.",
  },
];

const relatedPages = [
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "See how sales execution connects with audience targeting, campaign systems, offer communication, and structured marketing support.",
  },
  {
    href: "/ai-client-workflows",
    title: "AI Client Workflows",
    desc: "Understand how sales workflows connect with client onboarding, expectation setting, delivery communication, and service structure.",
  },
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "Explore how AI sales systems fit into broader business operations, process quality, and repeatable execution models.",
  },
  {
    href: "/ai-skills-for-sales-teams",
    title: "AI Skills for Sales Teams",
    desc: "See which AI skills help sales teams improve response speed, qualification quality, pitch support, and follow-up systems.",
  },
  {
    href: "/ai-tools-for-marketing",
    title: "AI Tools for Marketing",
    desc: "See which AI tools can support messaging, lead context, communication drafting, and structured workflow execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how sales workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI sales workflow?",
    a: "An AI sales workflow is a structured process that uses AI across lead understanding, qualification, pitch support, objection handling, follow-up planning, and repeatable sales execution.",
  },
  {
    q: "Why are AI sales workflows important?",
    a: "They are important because they help teams and individuals move from random sales conversations to more structured, disciplined, and repeatable sales systems.",
  },
  {
    q: "Can beginners use AI sales workflows?",
    a: "Yes. Beginners can start with simple workflows for lead qualification, short pitch structure, common objection handling, and follow-up planning before using more advanced systems.",
  },
  {
    q: "Are AI sales workflows only for large sales teams?",
    a: "No. Founders, freelancers, consultants, small businesses, educational brands, and service teams can all use structured AI sales workflows.",
  },
  {
    q: "What is the difference between sales tools and sales workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical sales execution.",
  },
  {
    q: "Can AI sales workflows help with follow-up?",
    a: "Yes. A strong workflow can support reminder logic, follow-up sequencing, re-engagement messaging, response drafting, and better timing decisions.",
  },
  {
    q: "What is the biggest mistake people make with AI in sales?",
    a: "A common mistake is generating generic scripts without building a proper system for lead intent, qualification logic, objection patterns, and structured follow-up.",
  },
  {
    q: "Where should someone start with AI sales workflows?",
    a: "A good starting point is a simple system: define lead stages, create qualification questions, build short pitch formats, prepare objection responses, then track and improve follow-up quality.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-5 py-3 text-[15px] font-semibold leading-none text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({
  pill,
  title,
  desc,
}: {
  pill: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-4xl">
      <Pill>{pill}</Pill>
      <h2 className="mt-7 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[56px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-5 max-w-4xl text-[18px] leading-[1.7] text-[#47607F] md:text-[19px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function AiSalesWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI sales workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI sales workflows help people move from inconsistent selling to a structured system for lead handling,
              qualification, pitch clarity, objection responses, follow-up planning, and repeatable conversion execution.
              Instead of relying on disconnected sales actions, a workflow creates a more practical process that improves
              clarity, speed, and long-term sales discipline.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {quickInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[22px] font-semibold leading-[1.25] text-[#071533]">{item.title}</h3>
                <p className="mt-4 text-[17px] leading-[1.75] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="What this means"
            title="What AI sales workflows actually mean"
            desc="A workflow-based sales approach makes AI useful because sales decisions sit inside a practical sequence instead of becoming random calling, random pitching, or random follow-up."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {meaningBlocks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[92px_1fr] gap-5 rounded-[30px]">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE] shadow-[0_10px_24px_rgba(37,99,235,0.06)]">
                    <Icon className="h-8 w-8 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-[20px] font-semibold leading-[1.3] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 max-w-[620px] text-[17px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Workflow stages"
            title="Core stages inside an AI sales workflow"
            desc="A practical sales system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {workflowStages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[34px] border border-[#0E3A83] bg-[linear-gradient(180deg,#022A67_0%,#011B46_100%)] p-7 shadow-[0_18px_38px_rgba(1,27,70,0.22)]"
                >
                  <div className="flex h-[98px] w-[98px] items-center justify-center rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-10 text-[20px] font-semibold leading-[1.35] text-white">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.8] text-[#C9D7F0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Use cases"
            title="Where AI sales workflows are commonly used"
            desc="These workflows are relevant wherever leads need to be understood, qualified, converted, and followed up in a structured way."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-7 text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.82] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI learning pages"
            desc="These pages connect AI sales workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[30px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_10px_28px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-[#BFD4F3] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 text-[16px] leading-[1.78] text-[#47607F]">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before building structured AI sales workflows."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[28px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-[#F9FBFF] text-[#2563EB] transition group-open:rotate-180">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <p className="pt-4 pr-2 text-[16px] leading-[1.85] text-[#47607F]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
