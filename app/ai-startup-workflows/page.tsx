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
  RefreshCcw,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Startup Workflows | Sikhadenge",
  description:
    "Understand AI startup workflows in a practical way. Learn how structured AI-assisted systems help with validation, positioning, execution speed, team coordination, growth support, and repeatable startup execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-startup-workflows",
  },
  openGraph: {
    title: "AI Startup Workflows | Sikhadenge",
    description:
      "A practical guide to AI startup workflows across validation, positioning, execution speed, team coordination, growth support, and repeatable startup execution.",
    url: "https://sikhadenge.in/ai-startup-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Startup Workflows | Sikhadenge",
    description:
      "A practical guide to AI startup workflows across validation, positioning, execution speed, team coordination, growth support, and repeatable startup execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI startup workflows are structured systems that use AI support for idea validation, market understanding, positioning, execution planning, team coordination, and repeatable startup operations.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, startups often move with speed but without structure. A practical system improves clarity, decision quality, execution speed, and consistent operational progress.",
  },
  {
    title: "Who benefits",
    desc: "Founders, startup teams, operators, marketers, creators, freelancers, and small business builders all benefit from stronger AI-assisted startup workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than using AI for one task",
    desc: "AI startup workflows are not limited to generating ideas or writing content. They connect market thinking, positioning, planning, execution, feedback, and iteration into one repeatable operating system.",
  },
  {
    icon: Bot,
    title: "AI can support many startup stages",
    desc: "A useful workflow uses AI across market research, offer framing, messaging support, process documentation, growth execution, customer understanding, and internal coordination instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better startup execution",
    desc: "A strong workflow helps startup work become easier to prioritize, easier to document, easier to repeat, and easier to improve as the business grows.",
  },
  {
    icon: Briefcase,
    title: "This matters in real early-stage systems",
    desc: "Early-stage businesses usually fail from scattered execution, weak priorities, and slow learning loops. Better workflows improve operating clarity and faster decision-making.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Problem, Audience & Offer Clarity",
    desc: "Start by identifying what problem matters, who the startup serves, why the offer matters, and what outcome should be communicated clearly to the market.",
  },
  {
    icon: ClipboardList,
    title: "Validation & Priority Planning",
    desc: "Use AI to structure validation questions, organize research insights, map assumptions, compare opportunities, and create clearer execution priorities.",
  },
  {
    icon: FileText,
    title: "Messaging, Docs & Execution Support",
    desc: "Build clearer pitch lines, internal notes, team documents, customer explanations, launch plans, and operating instructions that help execution move faster.",
  },
  {
    icon: Rocket,
    title: "Launch & Growth Direction",
    desc: "Plan whether progress should focus first on distribution, product communication, lead generation, community building, service delivery, or process stabilization.",
  },
  {
    icon: RefreshCcw,
    title: "Learning & Iteration Loop",
    desc: "Refine weak assumptions, improve messaging, adapt the offer, reorganize execution priorities, and strengthen decision quality through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Startup System",
    desc: "Organize priorities, documents, operating notes, execution templates, team workflows, and learning logs into a repeatable startup workflow system.",
  },
];

const useCases = [
  {
    icon: Sparkles,
    title: "Founders",
    desc: "Founders can use AI startup workflows to move faster with better clarity across idea validation, positioning, planning, and day-to-day execution.",
  },
  {
    icon: TrendingUp,
    title: "Early-Stage Teams",
    desc: "Startup teams can use these workflows to improve alignment, reduce confusion, and keep growth, delivery, and operations moving with more structure.",
  },
  {
    icon: Briefcase,
    title: "Solo Builders",
    desc: "Solo builders can use workflow systems to manage research, messaging, operations, and launch tasks without building everything from scratch each time.",
  },
  {
    icon: Users,
    title: "Growing Businesses",
    desc: "Growing businesses can use structured workflows to turn scattered founder-led work into repeatable systems across multiple functions and team members.",
  },
];

const relatedPages = [
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "See how startup execution connects with broader business systems, process structure, and repeatable operations.",
  },
  {
    href: "/ai-brand-strategy-workflows",
    title: "AI Brand Strategy Workflows",
    desc: "Understand how startup workflows connect with positioning, communication clarity, and stronger brand direction.",
  },
  {
    href: "/ai-lead-generation-workflows",
    title: "AI Lead Generation Workflows",
    desc: "Explore how startup growth connects with lead capture systems, offer communication, and acquisition workflows.",
  },
  {
    href: "/ai-sales-workflows",
    title: "AI Sales Workflows",
    desc: "See how early-stage execution connects with qualification, pitch structure, follow-up discipline, and conversion systems.",
  },
  {
    href: "/ai-skills-for-founders",
    title: "AI Skills for Founders",
    desc: "See which AI skills help founders improve planning, communication, research, delegation, and structured execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how startup workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI startup workflow?",
    a: "An AI startup workflow is a structured process that uses AI across validation, market understanding, positioning, execution planning, team coordination, and repeatable startup execution.",
  },
  {
    q: "Why are AI startup workflows important?",
    a: "They are important because they help founders and teams move from scattered startup activity to more structured, clear, and repeatable execution systems.",
  },
  {
    q: "Can beginners use AI startup workflows?",
    a: "Yes. Beginners can start with simple workflows for problem clarity, audience understanding, basic planning, messaging support, and execution priorities before using more advanced systems.",
  },
  {
    q: "Are AI startup workflows only for tech startups?",
    a: "No. Service startups, education brands, creator-led businesses, agencies, solo builders, small teams, and digital-first businesses can all use structured AI startup workflows.",
  },
  {
    q: "What is the difference between startup tools and startup workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical startup execution.",
  },
  {
    q: "Can AI startup workflows help with faster execution?",
    a: "Yes. A strong workflow can support better prioritization, clearer communication, stronger documentation, faster feedback loops, and more disciplined execution across teams.",
  },
  {
    q: "What is the biggest mistake people make with AI in startups?",
    a: "A common mistake is using AI for random tasks without building a proper system for validation, priorities, execution discipline, and learning loops.",
  },
  {
    q: "Where should someone start with AI startup workflows?",
    a: "A good starting point is a simple system: define the problem, identify the audience, clarify the offer, list execution priorities, then improve decisions through repeated review and iteration.",
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

export default function AiStartupWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI startup workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI startup workflows help people move from disconnected founder tasks to a structured system for
              validation, positioning, planning, execution support, team coordination, and repeatable startup progress.
              Instead of relying on random actions, a workflow creates a practical process that improves clarity, speed,
              and long-term operating discipline.
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
            title="What AI startup workflows actually mean"
            desc="A workflow-based startup approach makes AI useful because business decisions sit inside a practical sequence instead of becoming random ideas, random tasks, or random experiments."
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
            title="Core stages inside an AI startup workflow"
            desc="A practical startup system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI startup workflows are commonly used"
            desc="These workflows are relevant wherever early-stage execution, founder decisions, growth tasks, and team operations need to be managed in a structured way."
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
            desc="These pages connect AI startup workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI startup workflows."
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
