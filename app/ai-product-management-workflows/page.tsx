import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  Layers3,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Product Management Workflows | Sikhadenge",
  description:
    "Understand AI product management workflows in a practical way. Learn how structured AI-assisted systems help with user understanding, feature prioritization, roadmap clarity, documentation, feedback loops, and repeatable product execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-product-management-workflows",
  },
  openGraph: {
    title: "AI Product Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI product management workflows across user understanding, feature prioritization, roadmap clarity, documentation, feedback loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-product-management-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI product management workflows across user understanding, feature prioritization, roadmap clarity, documentation, feedback loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI product management workflows are structured systems that use AI support for user understanding, feature prioritization, roadmap planning, documentation, decision support, and repeatable product execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, product work becomes reactive and scattered. A structured system improves prioritization clarity, team alignment, documentation quality, and execution discipline.",
  },
  {
    title: "Who benefits",
    desc: "Founders, product managers, startup teams, operators, agencies, SaaS teams, education platforms, and growing digital businesses all benefit from stronger AI-assisted product workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than making a feature list",
    desc: "AI product management workflows are not limited to writing requirements or collecting ideas. They connect user problems, priorities, roadmap logic, documentation, team coordination, and feedback cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many product stages",
    desc: "A useful workflow uses AI across research summaries, feature framing, requirement drafting, prioritization support, release communication, and feedback synthesis instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better product execution",
    desc: "A strong workflow helps product work become easier to clarify, easier to prioritize, easier to communicate, and easier to improve across multiple iterations.",
  },
  {
    icon: Briefcase,
    title: "This matters in real product systems",
    desc: "Modern product teams improve when decisions are based on clear user needs and structured execution. Random feature building usually creates confusion, wasted effort, and weak product direction.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "User, Problem & Outcome Clarity",
    desc: "Start by identifying who the user is, what problem matters most, what friction exists, what business outcome is needed, and what success should look like after improvement.",
  },
  {
    icon: ClipboardList,
    title: "Feature Prioritization & Planning",
    desc: "Use AI to organize feature ideas, compare priorities, identify dependencies, structure backlog thinking, and map what should happen now versus later.",
  },
  {
    icon: FileText,
    title: "Requirements & Documentation Support",
    desc: "Build clearer product notes, briefs, user stories, release drafts, team updates, and requirement summaries that reduce confusion across execution teams.",
  },
  {
    icon: Layers3,
    title: "Roadmap & Coordination Direction",
    desc: "Plan how releases should be sequenced, how stakeholders should align, how communication should move, and how product priorities should stay visible to the team.",
  },
  {
    icon: RefreshCcw,
    title: "Feedback & Iteration Loop",
    desc: "Refine weak features, improve user flow understanding, adjust priorities, review outcomes, and strengthen product decisions through repeated learning cycles.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Product System",
    desc: "Organize user insights, backlog notes, requirement templates, roadmap views, decision logs, and release learnings into a repeatable product management workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Startup & SaaS Teams",
    desc: "Startup and SaaS teams can use AI product management workflows to improve clarity, reduce decision noise, and manage feature execution with more structure.",
  },
  {
    icon: Sparkles,
    title: "Founders & Builders",
    desc: "Founders and product builders can use these workflows to understand users better, prioritize clearly, and move faster with stronger product discipline.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Service Platforms",
    desc: "Agencies and service-led platforms can use workflow systems to manage client-facing product improvements, internal tools, and delivery-related product decisions.",
  },
  {
    icon: Users,
    title: "Education & Digital Businesses",
    desc: "Education brands and digital businesses can use structured workflows to improve user journeys, internal tools, product communication, and release planning.",
  },
];

const relatedPages = [
  {
    href: "/ai-startup-workflows",
    title: "AI Startup Workflows",
    desc: "See how product management connects with validation, execution planning, founder decision-making, and structured startup growth.",
  },
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "Understand how product execution fits into broader business systems, priorities, and repeatable operations.",
  },
  {
    href: "/ai-analytics-workflows",
    title: "AI Analytics Workflows",
    desc: "Explore how product decisions connect with usage insights, metric reviews, performance analysis, and structured improvement cycles.",
  },
  {
    href: "/ai-operations-workflows",
    title: "AI Operations Workflows",
    desc: "See how product management supports internal coordination, process visibility, execution quality, and team alignment.",
  },
  {
    href: "/ai-skills-for-founders",
    title: "AI Skills for Founders",
    desc: "See which AI skills help founders improve user understanding, prioritization, communication, and better digital product execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how product management workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI product management workflow?",
    a: "An AI product management workflow is a structured process that uses AI across user understanding, prioritization, requirement drafting, roadmap planning, feedback review, and repeatable product execution.",
  },
  {
    q: "Why are AI product management workflows important?",
    a: "They are important because they help teams move from reactive product work to more structured, clear, and repeatable decision-making and execution systems.",
  },
  {
    q: "Can beginners use AI product management workflows?",
    a: "Yes. Beginners can start with simple workflows for user problem summaries, feature lists, basic prioritization, and requirement notes before using more advanced systems.",
  },
  {
    q: "Are AI product management workflows only for software companies?",
    a: "No. Founders, digital businesses, education platforms, internal product teams, service-led businesses, and startups can all use structured AI product management workflows.",
  },
  {
    q: "What is the difference between product tools and product management workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical product execution.",
  },
  {
    q: "Can AI product management workflows help with prioritization?",
    a: "Yes. A strong workflow can support clearer user understanding, better feature grouping, stronger roadmap decisions, and more disciplined execution planning.",
  },
  {
    q: "What is the biggest mistake people make with AI in product management?",
    a: "A common mistake is generating many feature ideas without building a proper system for user needs, priorities, requirement clarity, and structured feedback review.",
  },
  {
    q: "Where should someone start with AI product management workflows?",
    a: "A good starting point is a simple system: define the user problem, list possible improvements, prioritize the most valuable work, document the requirement, then review outcomes and improve through iteration.",
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

export default function AiProductManagementWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI product management workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI product management workflows help people move from disconnected product decisions to a structured
              system for user understanding, feature prioritization, requirement clarity, roadmap planning, and
              repeatable product execution. Instead of relying on random product ideas, a workflow creates a practical
              process that improves clarity, alignment, and long-term decision quality.
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
            title="What AI product management workflows actually mean"
            desc="A workflow-based product management approach makes AI useful because product decisions sit inside a practical sequence instead of becoming random features, random priorities, or random documentation."
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
            title="Core stages inside an AI product management workflow"
            desc="A practical product system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI product management workflows are commonly used"
            desc="These workflows are relevant wherever user needs, priorities, features, and product decisions need to move in a structured way."
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
            desc="These pages connect AI product management workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI product management workflows."
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
