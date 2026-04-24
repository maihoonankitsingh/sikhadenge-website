import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CalendarDays,
  FileText,
  FolderKanban,
  Lightbulb,
  ListTodo,
  RefreshCcw,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Create Content with AI Planning Workflows | Sikhadenge",
  description:
    "Understand AI content planning workflows in a practical way. Learn how structured AI-assisted systems help with topic mapping, content calendars, audience alignment, planning clarity, and repeatable content execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-content-planning-workflows",
  },
  openGraph: {
    title: "Create Content with AI Planning Workflows | Sikhadenge",
    description:
      "A practical guide to AI content planning workflows across topic mapping, content calendars, audience alignment, planning clarity, and repeatable content execution.",
    url: "https://sikhadenge.in/ai-content-planning-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Content with AI Planning Workflows | Sikhadenge",
    description:
      "A practical guide to AI content planning workflows across topic mapping, content calendars, audience alignment, planning clarity, and repeatable content execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI content planning workflows are structured systems that use AI support to plan what to publish, why to publish it, and how to organize content flow.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, content planning becomes random and reactive. A system improves clarity, consistency, and publishing direction.",
  },
  {
    title: "Who benefits",
    desc: "Creators, marketers, freelancers, founders, and content teams all benefit from better AI-assisted content planning workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than writing one content idea",
    desc: "AI content planning workflows are not limited to generating one topic. They connect audience intent, topic mapping, calendar planning, format choice, and execution sequencing into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple planning stages",
    desc: "Useful workflows use AI across topic discovery, audience mapping, angle creation, content sequencing, calendar support, and planning refinement instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better planning clarity",
    desc: "A strong workflow helps content become easier to organize, easier to prioritize, and easier to publish consistently across repeated cycles.",
  },
  {
    icon: Briefcase,
    title: "This matters in real content systems",
    desc: "Modern content work often fails because ideas are created without enough planning structure, audience fit, sequencing logic, or publishing discipline.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Audience & Topic Direction",
    desc: "Start by identifying who the content is for, what they care about, what stage they are at, and what themes matter most.",
  },
  {
    icon: ListTodo,
    title: "Topic Mapping & Angle Planning",
    desc: "Use AI to generate topic clusters, supporting angles, subtopics, recurring themes, and clearer content buckets for execution.",
  },
  {
    icon: CalendarDays,
    title: "Calendar & Sequencing",
    desc: "Organize posting rhythm, weekly priorities, content order, publishing slots, and planning flow across formats or platforms.",
  },
  {
    icon: FileText,
    title: "Planning Notes & Execution Readiness",
    desc: "Turn loose ideas into cleaner content notes, publishing plans, briefs, format suggestions, and execution-ready planning documents.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Adjustment",
    desc: "Refine weak topics, remove repetition, improve sequencing, and update content priorities based on performance or new needs.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Content Planning System",
    desc: "Organize content banks, topic boards, calendar templates, planning documents, and repeatable systems for long-term publishing consistency.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI content planning workflows to stay organized with topics, posting rhythm, and repeatable publishing systems.",
  },
  {
    icon: Briefcase,
    title: "Marketers & Freelancers",
    desc: "Marketers and freelancers can use these workflows to build clearer client plans, content calendars, and stronger publishing structure.",
  },
  {
    icon: Sparkles,
    title: "Founders & Personal Brands",
    desc: "Founders and personal brands can use workflow systems to publish more strategically instead of posting randomly.",
  },
  {
    icon: Workflow,
    title: "Content Teams",
    desc: "Teams can use structured workflows to improve content planning clarity, reduce chaos, and coordinate publishing more effectively.",
  },
];

const relatedPages = [
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the broader content workflow layer for ideation, drafting, refinement, and structured content creation.",
  },
  {
    href: "/ai-social-media-workflows",
    title: "AI Social Media Workflows",
    desc: "See how content planning connects with platform adaptation, scheduling, and publishing systems.",
  },
  {
    href: "/ai-content-repurposing-workflows",
    title: "Create Content with AI Repurposing Workflows",
    desc: "Understand how better planning supports reuse, multi-format execution, and efficient content output systems.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support topic discovery, planning notes, content calendars, and structured planning workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how content planning workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how content planning workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI content planning workflow?",
    a: "An AI content planning workflow is a structured process that uses AI across topic discovery, audience alignment, calendar planning, sequencing, and repeatable content execution.",
  },
  {
    q: "Why are AI content planning workflows important?",
    a: "They are important because they help creators and teams move from random posting to clearer, more organized, and more repeatable content systems.",
  },
  {
    q: "Can beginners use AI content planning workflows?",
    a: "Yes. Beginners can start with simple workflows for content pillars, weekly topics, planning notes, and publishing rhythm before using advanced systems.",
  },
  {
    q: "Are AI content planning workflows only for social media teams?",
    a: "No. Creators, freelancers, founders, marketers, personal brands, and content teams can all use structured AI content planning workflows.",
  },
  {
    q: "What is the difference between content ideas and a content planning workflow?",
    a: "Content ideas are individual topics. A content planning workflow is the repeatable system that organizes those ideas into useful, structured publishing plans.",
  },
  {
    q: "Can AI content planning workflows help with consistency?",
    a: "Yes. A strong workflow can support topic mapping, calendar flow, publishing order, planning clarity, and more consistent execution.",
  },
  {
    q: "What is the biggest mistake people make with AI content planning?",
    a: "A common mistake is collecting many topics without building a proper system for audience fit, sequencing, calendar logic, and execution readiness.",
  },
  {
    q: "Where should someone start with AI content planning workflows?",
    a: "A good starting point is a simple system: define the audience, create content pillars, map weekly topics, organize a calendar, then refine based on output and consistency.",
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

export default function AiContentPlanningWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI content planning workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI content planning workflows help people move from random content ideas to a structured system for topic mapping,
              calendar planning, audience alignment, and repeatable execution. Instead of relying on disconnected planning,
              a workflow creates a repeatable process that improves consistency, speed, and practical publishing direction.
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
            title="What AI content planning workflows actually mean"
            desc="A workflow-based content planning approach makes AI useful because content decisions sit inside a practical sequence instead of becoming random topic generation."
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
            title="Core stages inside an AI content planning workflow"
            desc="A practical content planning system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI content planning workflows are commonly used"
            desc="These workflows are relevant wherever content needs to be planned, sequenced, scheduled, and organized in a structured way."
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
            desc="These pages connect AI content planning workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI content planning workflows."
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
