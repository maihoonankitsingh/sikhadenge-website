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
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation Strategy Workflows | Sikhadenge",
  description:
    "Understand AI automation strategy workflows in a practical way. Learn how structured AI-assisted systems help with process selection, automation mapping, priority planning, handoff logic, optimization loops, and repeatable execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-automation-strategy-workflows",
  },
  openGraph: {
    title: "AI Automation Strategy Workflows | Sikhadenge",
    description:
      "A practical guide to AI automation strategy workflows across process selection, automation mapping, priority planning, handoff logic, optimization loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-automation-strategy-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Strategy Workflows | Sikhadenge",
    description:
      "A practical guide to AI automation strategy workflows across process selection, automation mapping, priority planning, handoff logic, optimization loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI automation strategy workflows are structured systems that use AI support for identifying repetitive work, designing process logic, setting priorities, improving handoffs, and building repeatable automation execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a strategy, automation often becomes scattered and low-impact. A structured system improves process clarity, better prioritization, stronger execution quality, and more reliable operational results.",
  },
  {
    title: "Who benefits",
    desc: "Founders, operations teams, agencies, marketers, service businesses, educators, freelancers, and growing teams all benefit from stronger AI-assisted automation strategy workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than connecting tools",
    desc: "AI automation strategy workflows are not limited to building one integration. They connect process understanding, automation priorities, decision logic, human handoffs, monitoring, and improvement cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many automation stages",
    desc: "A useful workflow uses AI across process analysis, step mapping, SOP extraction, condition planning, exception handling, and optimization guidance instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better process leverage",
    desc: "A strong workflow helps automation become easier to plan, easier to scale, easier to monitor, and easier to improve across recurring business tasks.",
  },
  {
    icon: Briefcase,
    title: "This matters in real operating systems",
    desc: "Modern businesses improve when repetitive work is handled with structure. Random automation usually creates brittle systems, broken handoffs, weak visibility, and poor business impact.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Process, Pain Point & Opportunity Clarity",
    desc: "Start by identifying which recurring work takes time, where delays happen, what manual errors occur, what outcome matters most, and where automation can create real value.",
  },
  {
    icon: ClipboardList,
    title: "Priority & Workflow Mapping",
    desc: "Use AI to break work into steps, identify dependencies, map triggers, define conditions, highlight approval points, and prioritize the most useful automation opportunities first.",
  },
  {
    icon: FileText,
    title: "Logic, Rules & Documentation Support",
    desc: "Build clearer flow descriptions, condition logic, process notes, SOP summaries, exception cases, and handoff instructions so automation systems remain understandable and maintainable.",
  },
  {
    icon: Settings2,
    title: "Execution & Handoff Direction",
    desc: "Plan how data should move, where human approval should remain, how notifications should work, how failures should surface, and how the workflow should behave in real operations.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Optimization Loop",
    desc: "Refine weak flows, reduce unnecessary steps, improve exception handling, strengthen reliability, and increase business impact through repeated review and adjustment.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Automation System",
    desc: "Organize automation maps, process notes, logic rules, trigger lists, handoff plans, and monitoring documents into a repeatable automation strategy workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Operations Teams",
    desc: "Operations teams can use AI automation strategy workflows to reduce repetitive work, improve process consistency, and build more reliable execution systems.",
  },
  {
    icon: Sparkles,
    title: "Founders & Managers",
    desc: "Founders and managers can use these workflows to identify high-impact automation opportunities, reduce team dependency, and improve execution visibility.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Service Businesses",
    desc: "Agencies and service businesses can use workflow systems to automate recurring delivery steps, approvals, reporting tasks, and client-facing coordination flows.",
  },
  {
    icon: Users,
    title: "Education & Growth Teams",
    desc: "Education brands and growth teams can use structured workflows to automate admissions steps, lead handling support, communication sequences, and recurring internal tasks.",
  },
];

const relatedPages = [
  {
    href: "/ai-automation-workflows",
    title: "AI Automation Workflows",
    desc: "See how automation strategy connects with practical execution systems, recurring task reduction, and AI-assisted business process workflows.",
  },
  {
    href: "/ai-operations-workflows",
    title: "AI Operations Workflows",
    desc: "Understand how automation strategy supports SOP quality, process structure, coordination, and long-term operational consistency.",
  },
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "Explore how automation fits into broader business systems, process quality, and repeatable execution across functions.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "See how automation strategy connects with time savings, task efficiency, process simplification, and better execution discipline.",
  },
  {
    href: "/ai-skills-for-operations-teams",
    title: "AI Skills for Operations Teams",
    desc: "See which AI skills help operations teams improve process analysis, automation thinking, documentation, and workflow planning.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how automation strategy workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI automation strategy workflow?",
    a: "An AI automation strategy workflow is a structured process that uses AI across process analysis, automation mapping, logic planning, handoff design, review cycles, and repeatable automation execution.",
  },
  {
    q: "Why are AI automation strategy workflows important?",
    a: "They are important because they help teams move from random automation experiments to more structured, useful, and repeatable automation systems.",
  },
  {
    q: "Can beginners use AI automation strategy workflows?",
    a: "Yes. Beginners can start with simple workflows for identifying repetitive work, mapping steps, documenting logic, and prioritizing simple automation opportunities before using more advanced systems.",
  },
  {
    q: "Are AI automation strategy workflows only for technical teams?",
    a: "No. Founders, operations teams, agencies, service businesses, education brands, marketers, and managers can all use structured AI automation strategy workflows.",
  },
  {
    q: "What is the difference between automation tools and automation strategy workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools should be applied step by step for practical automation impact.",
  },
  {
    q: "Can AI automation strategy workflows help improve process quality?",
    a: "Yes. A strong workflow can support better prioritization, clearer logic, stronger handoffs, better exception handling, and more reliable business execution.",
  },
  {
    q: "What is the biggest mistake people make with AI in automation?",
    a: "A common mistake is automating tasks too quickly without building a proper system for process clarity, ownership, exception cases, monitoring, and business priorities.",
  },
  {
    q: "Where should someone start with AI automation strategy workflows?",
    a: "A good starting point is a simple system: pick one repetitive process, map the steps, identify delays, define the ideal outcome, then improve the flow through structured automation planning and review.",
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

export default function AiAutomationStrategyWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI automation strategy workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI automation strategy workflows help people move from disconnected automation ideas to a structured
              system for process selection, automation mapping, decision logic, handoff planning, and repeatable
              execution quality. Instead of relying on random tool connections, a workflow creates a practical process
              that improves clarity, leverage, and long-term operational value.
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
            title="What AI automation strategy workflows actually mean"
            desc="A workflow-based automation strategy approach makes AI useful because process decisions sit inside a practical sequence instead of becoming random automations, random tool setups, or random process experiments."
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
            title="Core stages inside an AI automation strategy workflow"
            desc="A practical automation strategy system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI automation strategy workflows are commonly used"
            desc="These workflows are relevant wherever repetitive work, manual coordination, and process inefficiency need to be converted into structured automation value."
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
            desc="These pages connect AI automation strategy workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI automation strategy workflows."
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
