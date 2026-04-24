import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckSquare,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Operations Workflows | Sikhadenge",
  description:
    "Understand AI operations workflows in a practical way. Learn how structured AI-assisted systems help with process clarity, task coordination, SOP support, issue tracking, optimization loops, and repeatable operations execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-operations-workflows",
  },
  openGraph: {
    title: "AI Operations Workflows | Sikhadenge",
    description:
      "A practical guide to AI operations workflows across process clarity, task coordination, SOP support, issue tracking, optimization loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-operations-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Operations Workflows | Sikhadenge",
    description:
      "A practical guide to AI operations workflows across process clarity, task coordination, SOP support, issue tracking, optimization loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI operations workflows are structured systems that use AI support for process mapping, task coordination, SOP development, issue handling, reporting clarity, and repeatable operational execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, operations become scattered, manual, and hard to scale. A structured system improves clarity, speed, consistency, and better team coordination.",
  },
  {
    title: "Who benefits",
    desc: "Operations teams, founders, service businesses, education brands, agencies, freelancers, and growing teams all benefit from stronger AI-assisted operations workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than completing tasks",
    desc: "AI operations workflows are not limited to making checklists. They connect process clarity, ownership, documentation, issue tracking, approvals, and improvement cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many operations stages",
    desc: "A useful workflow uses AI across SOP drafting, process summaries, task planning, reporting, handoff notes, escalation guidance, and process improvement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better execution quality",
    desc: "A strong workflow helps operations become easier to manage, easier to monitor, easier to repeat, and easier to improve across teams and business functions.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business systems",
    desc: "Modern businesses usually grow when execution becomes structured. Random operational handling often creates delays, confusion, repeated mistakes, and weak accountability.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Process, Role & Outcome Clarity",
    desc: "Start by identifying what process matters, who owns it, what outcome is expected, where delays happen, and what standards define successful execution.",
  },
  {
    icon: ClipboardList,
    title: "Task Mapping & Process Structuring",
    desc: "Use AI to break down work into stages, define dependencies, organize priorities, identify handoff points, and structure repeatable process steps more clearly.",
  },
  {
    icon: FileText,
    title: "SOP & Documentation Support",
    desc: "Build clearer SOPs, internal notes, process instructions, checklists, escalation guidance, and execution templates that teams can follow consistently.",
  },
  {
    icon: Settings,
    title: "Coordination & Monitoring Direction",
    desc: "Plan how progress should be tracked, how delays should be flagged, how approvals should move, and how cross-functional coordination should stay clear.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Optimization Loop",
    desc: "Refine weak processes, reduce repeated errors, improve turnaround time, simplify unnecessary steps, and strengthen reliability through repeated review.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Operations System",
    desc: "Organize SOPs, task templates, role notes, issue logs, escalation rules, and review documents into a repeatable operations workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Operations Teams",
    desc: "Operations teams can use AI operations workflows to improve execution discipline, reduce confusion, and handle recurring work with more consistency.",
  },
  {
    icon: Sparkles,
    title: "Founders & Managers",
    desc: "Founders and managers can use these workflows to reduce dependency on memory, improve visibility, and build more stable execution systems.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Service Businesses",
    desc: "Agencies and service businesses can use workflow systems to manage delivery, approvals, task ownership, and client-facing execution more clearly.",
  },
  {
    icon: Users,
    title: "Education & Growing Teams",
    desc: "Education brands and growing teams can use structured workflows to improve admissions operations, student handling, internal coordination, and delivery support.",
  },
];

const relatedPages = [
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "See how operations execution connects with broader business systems, process design, and repeatable organizational performance.",
  },
  {
    href: "/ai-team-workflows",
    title: "AI Team Workflows",
    desc: "Understand how operations workflows connect with collaboration, role clarity, handoffs, and better team coordination systems.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "Explore how operations execution connects with output tracking, task efficiency, and better day-to-day process discipline.",
  },
  {
    href: "/ai-customer-support-workflows",
    title: "AI Customer Support Workflows",
    desc: "See how support execution connects with issue handling, escalation logic, response quality, and structured service operations.",
  },
  {
    href: "/ai-skills-for-operations-teams",
    title: "AI Skills for Operations Teams",
    desc: "See which AI skills help operations teams improve SOP writing, coordination, reporting, documentation, and process execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how operations workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI operations workflow?",
    a: "An AI operations workflow is a structured process that uses AI across process mapping, documentation, task coordination, issue handling, review cycles, and repeatable operational execution.",
  },
  {
    q: "Why are AI operations workflows important?",
    a: "They are important because they help teams move from scattered execution to more structured, reliable, and repeatable operations systems.",
  },
  {
    q: "Can beginners use AI operations workflows?",
    a: "Yes. Beginners can start with simple workflows for SOP drafting, task structuring, reporting summaries, and issue tracking before using more advanced systems.",
  },
  {
    q: "Are AI operations workflows only for large companies?",
    a: "No. Small businesses, agencies, education brands, service teams, founders, and operations managers can all use structured AI operations workflows.",
  },
  {
    q: "What is the difference between operations tools and operations workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical operations execution.",
  },
  {
    q: "Can AI operations workflows help with SOPs?",
    a: "Yes. A strong workflow can support SOP drafting, task clarity, process notes, escalation rules, and better handoff communication across teams.",
  },
  {
    q: "What is the biggest mistake people make with AI in operations?",
    a: "A common mistake is generating documents or task lists without building a proper system for ownership, process standards, issue handling, and repeated execution quality.",
  },
  {
    q: "Where should someone start with AI operations workflows?",
    a: "A good starting point is a simple system: define one recurring process, map the steps, assign ownership, create an SOP, then improve reliability through regular review and updates.",
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

export default function AiOperationsWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI operations workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI operations workflows help people move from disconnected execution tasks to a structured system for
              process clarity, task coordination, SOP support, issue tracking, and repeatable operational execution.
              Instead of relying on random handling, a workflow creates a practical process that improves consistency,
              speed, and long-term execution quality.
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
            title="What AI operations workflows actually mean"
            desc="A workflow-based operations approach makes AI useful because execution decisions sit inside a practical sequence instead of becoming random tasks, random documentation, or random follow-through."
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
            title="Core stages inside an AI operations workflow"
            desc="A practical operations system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI operations workflows are commonly used"
            desc="These workflows are relevant wherever recurring execution, coordination, documentation, and operational discipline need to be built in a structured way."
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
            desc="These pages connect AI operations workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI operations workflows."
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
