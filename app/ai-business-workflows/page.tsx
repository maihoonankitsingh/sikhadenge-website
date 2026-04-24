import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Building2,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Settings2,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Business Workflows | Sikhadenge",
  description:
    "Understand AI business workflows in a practical way. Learn how structured AI-assisted systems help with planning, process support, execution clarity, team coordination, and repeatable business operations.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-business-workflows",
  },
  openGraph: {
    title: "AI Business Workflows | Sikhadenge",
    description:
      "A practical guide to AI business workflows across planning, process support, execution clarity, team coordination, and repeatable business operations.",
    url: "https://sikhadenge.in/ai-business-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Workflows | Sikhadenge",
    description:
      "A practical guide to AI business workflows across planning, process support, execution clarity, team coordination, and repeatable business operations.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI business workflows are structured systems that use AI support across planning, process handling, internal coordination, and daily execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, business execution becomes fragmented. A system improves clarity, consistency, speed, and better operational control.",
  },
  {
    title: "Who benefits",
    desc: "Founders, operators, managers, freelancers, coordinators, and small teams all benefit from better AI-assisted business workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one business task",
    desc: "AI business workflows are not limited to writing one document or one message. They connect planning, process handling, internal communication, decisions, and repeated execution into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple business stages",
    desc: "Useful workflows use AI across summaries, task clarity, process mapping, note support, reporting support, coordination, and execution systems instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better business execution",
    desc: "A strong workflow helps daily business work become more organized, easier to track, easier to repeat, and easier to improve over time.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business operations",
    desc: "Modern business work often needs faster decision support, cleaner process flow, stronger coordination, and less manual confusion across repeated tasks.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Goal & Process Clarity",
    desc: "Start by identifying what the process is for, what result is needed, who is involved, and where confusion or repetition currently happens.",
  },
  {
    icon: Settings2,
    title: "Workflow Mapping",
    desc: "Use AI to help define steps, dependencies, handoffs, actions, checkpoints, and supporting process logic for the task or system.",
  },
  {
    icon: FileText,
    title: "Documentation & Support",
    desc: "Build cleaner SOP-style notes, summaries, task instructions, updates, templates, and internal communication structures.",
  },
  {
    icon: Users,
    title: "Coordination & Execution Flow",
    desc: "Improve follow-ups, role clarity, update consistency, meeting summaries, and daily coordination across people and teams.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Improvement",
    desc: "Check for repeated delays, weak handoffs, poor clarity, and refine the process through structured iteration and updates.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Business System",
    desc: "Organize recurring workflows, execution boards, internal templates, review checkpoints, and reusable business operating systems.",
  },
];

const useCases = [
  {
    icon: Building2,
    title: "Founders",
    desc: "Founders can use AI business workflows to improve planning, task coordination, internal clarity, and repeatable decision support.",
  },
  {
    icon: Briefcase,
    title: "Operators & Managers",
    desc: "Operators and managers can use these workflows to improve team coordination, task systems, process notes, and better execution flow.",
  },
  {
    icon: Sparkles,
    title: "Freelancers & Solo Builders",
    desc: "Solo operators can use workflow systems to manage repeated business tasks, notes, operations, and execution support more cleanly.",
  },
  {
    icon: Workflow,
    title: "Small Teams",
    desc: "Small teams can use structured workflows to improve consistency, reduce confusion, and create more repeatable business operations.",
  },
];

const relatedPages = [
  {
    href: "/ai-automation-workflows",
    title: "AI Automation Workflows",
    desc: "See how business workflows connect with automation systems, repeated task execution, and structured operational support.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "Understand how better planning, summaries, and repeatable execution routines support stronger business systems.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support business notes, process mapping, summaries, coordination, and workflow execution.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with structured business systems and practical digital execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how business workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how business workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI business workflow?",
    a: "An AI business workflow is a structured process that uses AI across planning, process handling, coordination, summaries, documentation, and repeatable business execution.",
  },
  {
    q: "Why are AI business workflows important?",
    a: "They are important because they help teams and operators move from fragmented business activity to more structured, repeatable, and manageable systems.",
  },
  {
    q: "Can beginners use AI business workflows?",
    a: "Yes. Beginners can start with simple workflows for notes, task systems, process summaries, meeting summaries, and structured follow-ups before moving into advanced systems.",
  },
  {
    q: "Are AI business workflows only for large companies?",
    a: "No. Founders, freelancers, small teams, coordinators, and operators can all use structured AI business workflows.",
  },
  {
    q: "What is the difference between business tools and business workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical business execution.",
  },
  {
    q: "Can AI business workflows help with internal coordination?",
    a: "Yes. A strong workflow can support meeting notes, follow-ups, task clarity, update structure, role visibility, and cleaner internal execution.",
  },
  {
    q: "What is the biggest mistake people make with AI in business operations?",
    a: "A common mistake is using AI for isolated tasks without building a repeatable process for planning, execution, coordination, and review.",
  },
  {
    q: "Where should someone start with AI business workflows?",
    a: "A good starting point is a simple system: identify one repeated business task, map the steps, improve the notes and handoffs, then refine it into a repeatable process.",
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

export default function AiBusinessWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI business workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI business workflows help people move from scattered daily operations to a structured system for planning,
              process clarity, coordination, documentation, and repeatable execution. Instead of relying on disconnected actions,
              a workflow creates a repeatable process that improves operational quality, speed, and clarity across business work.
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
            title="What AI business workflows actually mean"
            desc="A workflow-based business approach makes AI useful because repeated business tasks sit inside a practical sequence instead of becoming isolated activity."
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
            title="Core stages inside an AI business workflow"
            desc="A practical business system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI business workflows are commonly used"
            desc="These workflows are relevant wherever repeated business tasks need to be planned, coordinated, documented, and improved in a structured way."
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
            desc="These pages connect AI business workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI business workflows."
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
