import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCheck,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Project Management Workflows | Sikhadenge",
  description:
    "Understand AI project management workflows in a practical way. Learn how structured AI-assisted systems help with planning, task clarity, stakeholder coordination, progress tracking, review loops, and repeatable project execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-project-management-workflows",
  },
  openGraph: {
    title: "AI Project Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI project management workflows across planning, task clarity, stakeholder coordination, progress tracking, review loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-project-management-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Project Management Workflows | Sikhadenge",
    description:
      "A practical guide to AI project management workflows across planning, task clarity, stakeholder coordination, progress tracking, review loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI project management workflows are structured systems that use AI support for planning, task breakdown, coordination, progress reporting, risk handling, and repeatable project execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, projects become delayed, unclear, and harder to manage. A structured system improves planning quality, team coordination, visibility, and stronger execution discipline.",
  },
  {
    title: "Who benefits",
    desc: "Founders, managers, agencies, operations teams, service businesses, education brands, freelancers, and growing teams all benefit from stronger AI-assisted project management workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than tracking tasks",
    desc: "AI project management workflows are not limited to making a task list. They connect planning, scope clarity, ownership, timelines, communication, reviews, and improvement cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many project stages",
    desc: "A useful workflow uses AI across planning notes, work breakdowns, meeting summaries, risk tracking, status reporting, stakeholder updates, and next-step clarity instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better project execution",
    desc: "A strong workflow helps project work become easier to organize, easier to monitor, easier to communicate, and easier to improve across teams and deadlines.",
  },
  {
    icon: Briefcase,
    title: "This matters in real delivery systems",
    desc: "Modern project work improves when execution is structured. Random coordination usually creates delays, unclear priorities, repeated follow-ups, and weak accountability.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Scope, Goal & Stakeholder Clarity",
    desc: "Start by identifying what the project should achieve, what success looks like, who is involved, what constraints exist, and which outcomes matter most.",
  },
  {
    icon: ClipboardList,
    title: "Planning & Task Breakdown",
    desc: "Use AI to break the project into phases, define milestones, organize dependencies, assign priorities, and create a clearer execution structure.",
  },
  {
    icon: FileText,
    title: "Documentation & Communication Support",
    desc: "Build clearer briefs, meeting notes, action summaries, stakeholder updates, task descriptions, and delivery notes so the team can move with less confusion.",
  },
  {
    icon: CheckCheck,
    title: "Execution & Progress Direction",
    desc: "Plan how tasks should move, how blockers should surface, how timelines should be reviewed, and how progress should stay visible across the project cycle.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Adjustment Loop",
    desc: "Refine weak plans, update priorities, solve repeated blockers, improve communication quality, and strengthen delivery reliability through repeated review.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Project System",
    desc: "Organize project templates, planning notes, check-in formats, status update structures, risk logs, and review documents into a repeatable project management workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Managers & Team Leads",
    desc: "Managers and team leads can use AI project management workflows to improve planning quality, reduce follow-up chaos, and maintain stronger execution visibility.",
  },
  {
    icon: Sparkles,
    title: "Founders & Operators",
    desc: "Founders and operators can use these workflows to manage launches, internal initiatives, and multi-team projects with better structure and coordination.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Service Teams",
    desc: "Agencies and service teams can use workflow systems to manage client projects, handoffs, timelines, and updates with more clarity and consistency.",
  },
  {
    icon: Users,
    title: "Education & Growing Businesses",
    desc: "Education brands and growing businesses can use structured workflows to coordinate campaigns, batches, internal improvements, and cross-functional project delivery.",
  },
];

const relatedPages = [
  {
    href: "/ai-operations-workflows",
    title: "AI Operations Workflows",
    desc: "See how project execution connects with recurring processes, SOP quality, coordination discipline, and stronger operational systems.",
  },
  {
    href: "/ai-team-workflows",
    title: "AI Team Workflows",
    desc: "Understand how project workflows connect with collaboration, ownership clarity, handoffs, and better team coordination.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "Explore how project management connects with task efficiency, work organization, focus quality, and better day-to-day execution.",
  },
  {
    href: "/ai-product-management-workflows",
    title: "AI Product Management Workflows",
    desc: "See how project coordination supports product decisions, roadmap execution, requirement clarity, and delivery planning.",
  },
  {
    href: "/ai-skills-for-operations-teams",
    title: "AI Skills for Operations Teams",
    desc: "See which AI skills help teams improve planning, reporting, coordination, documentation, and structured project execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how project management workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI project management workflow?",
    a: "An AI project management workflow is a structured process that uses AI across planning, task breakdown, communication, progress tracking, review cycles, and repeatable project execution.",
  },
  {
    q: "Why are AI project management workflows important?",
    a: "They are important because they help teams move from scattered project coordination to more structured, visible, and repeatable execution systems.",
  },
  {
    q: "Can beginners use AI project management workflows?",
    a: "Yes. Beginners can start with simple workflows for task planning, meeting summaries, milestone tracking, and project updates before using more advanced systems.",
  },
  {
    q: "Are AI project management workflows only for large teams?",
    a: "No. Founders, agencies, freelancers, service teams, managers, education brands, and growing businesses can all use structured AI project management workflows.",
  },
  {
    q: "What is the difference between project tools and project management workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical project execution.",
  },
  {
    q: "Can AI project management workflows help with delays and blockers?",
    a: "Yes. A strong workflow can support better planning, blocker visibility, status clarity, stakeholder communication, and faster adjustment when projects go off track.",
  },
  {
    q: "What is the biggest mistake people make with AI in project management?",
    a: "A common mistake is generating plans or summaries without building a proper system for scope clarity, ownership, check-ins, risk handling, and execution review.",
  },
  {
    q: "Where should someone start with AI project management workflows?",
    a: "A good starting point is a simple system: define the goal, break the project into milestones, assign ownership, create review points, then improve execution through regular status tracking and updates.",
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

export default function AiProjectManagementWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI project management workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI project management workflows help people move from disconnected planning and follow-up tasks to a
              structured system for scope clarity, task breakdown, stakeholder coordination, progress tracking, and
              repeatable project execution. Instead of relying on random updates and scattered decisions, a workflow
              creates a practical process that improves visibility, speed, and long-term delivery quality.
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
            title="What AI project management workflows actually mean"
            desc="A workflow-based project management approach makes AI useful because execution decisions sit inside a practical sequence instead of becoming random follow-ups, random timelines, or random project updates."
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
            title="Core stages inside an AI project management workflow"
            desc="A practical project system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI project management workflows are commonly used"
            desc="These workflows are relevant wherever launches, campaigns, internal initiatives, and cross-functional execution need to move in a structured way."
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
            desc="These pages connect AI project management workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI project management workflows."
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
