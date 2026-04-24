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
  MonitorSmartphone,
  RefreshCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Product Design Workflows | Sikhadenge",
  description:
    "Understand AI product design workflows in a practical way. Learn how structured AI-assisted systems help with user understanding, feature flow planning, interface clarity, design feedback, iteration loops, and repeatable product design execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-product-design-workflows",
  },
  openGraph: {
    title: "AI Product Design Workflows | Sikhadenge",
    description:
      "A practical guide to AI product design workflows across user understanding, feature flow planning, interface clarity, design feedback, iteration loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-product-design-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Design Workflows | Sikhadenge",
    description:
      "A practical guide to AI product design workflows across user understanding, feature flow planning, interface clarity, design feedback, iteration loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI product design workflows are structured systems that use AI support for user understanding, screen planning, interaction clarity, design documentation, feedback reviews, and repeatable product design execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, product design becomes inconsistent and reactive. A structured system improves clarity, user flow quality, design alignment, and stronger iteration discipline.",
  },
  {
    title: "Who benefits",
    desc: "Product designers, founders, SaaS teams, agencies, startups, education platforms, and digital businesses all benefit from stronger AI-assisted product design workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than making screens",
    desc: "AI product design workflows are not limited to generating layouts or UI ideas. They connect user needs, task flows, interface decisions, usability thinking, design feedback, and iteration cycles into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many design stages",
    desc: "A useful workflow uses AI across user flow thinking, screen structure support, design rationale, content guidance, feedback summaries, and improvement planning instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better user experience execution",
    desc: "A strong workflow helps product design become easier to clarify, easier to align, easier to improve, and easier to repeat across multiple features and releases.",
  },
  {
    icon: Briefcase,
    title: "This matters in real digital products",
    desc: "Modern products improve when design decisions are structured around user problems and clear flows. Random interface work usually creates friction, confusion, and weak product adoption.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "User, Goal & Problem Clarity",
    desc: "Start by identifying who the user is, what task they want to complete, where confusion happens, what success looks like, and what product outcome the design should improve.",
  },
  {
    icon: ClipboardList,
    title: "Flow & Screen Planning",
    desc: "Use AI to structure user journeys, map task flows, break features into screens, define required actions, and build clearer information architecture before design execution.",
  },
  {
    icon: FileText,
    title: "Content, States & Documentation Support",
    desc: "Build clearer screen notes, microcopy directions, empty states, error states, onboarding guidance, and design rationale so product decisions stay easier to understand.",
  },
  {
    icon: MonitorSmartphone,
    title: "Interface & Experience Direction",
    desc: "Plan how the feature should behave across screens, what the visual hierarchy should emphasize, where interaction friction exists, and how the experience should feel during use.",
  },
  {
    icon: RefreshCcw,
    title: "Feedback & Iteration Loop",
    desc: "Refine weak flows, simplify complex screens, improve usability decisions, adjust content clarity, and strengthen design quality through repeated review and iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Product Design System",
    desc: "Organize user flows, design notes, component guidance, screen templates, feedback logs, and iteration decisions into a repeatable product design workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Product & SaaS Teams",
    desc: "Product and SaaS teams can use AI product design workflows to improve feature clarity, reduce friction, and build better user experiences with stronger structure.",
  },
  {
    icon: Sparkles,
    title: "Founders & Builders",
    desc: "Founders and product builders can use these workflows to move from rough ideas to clearer user flows, better interfaces, and more disciplined design decisions.",
  },
  {
    icon: Briefcase,
    title: "Agencies & Freelancers",
    desc: "Agencies and freelancers can use workflow systems to improve client product design quality, feedback handling, and repeatable design delivery processes.",
  },
  {
    icon: Users,
    title: "Education & Digital Platforms",
    desc: "Education brands and digital platforms can use structured workflows to improve dashboard experiences, onboarding quality, learner flows, and internal product usability.",
  },
];

const relatedPages = [
  {
    href: "/ai-product-management-workflows",
    title: "AI Product Management Workflows",
    desc: "See how product design connects with prioritization, requirement clarity, roadmap thinking, and repeatable product execution.",
  },
  {
    href: "/ai-project-management-workflows",
    title: "AI Project Management Workflows",
    desc: "Understand how design execution connects with timelines, stakeholder coordination, progress tracking, and structured delivery systems.",
  },
  {
    href: "/ai-analytics-workflows",
    title: "AI Analytics Workflows",
    desc: "Explore how product design decisions connect with user behavior, performance analysis, and feedback-driven improvement cycles.",
  },
  {
    href: "/ai-startup-workflows",
    title: "AI Startup Workflows",
    desc: "See how product design supports early-stage execution, user validation, product positioning, and structured launch thinking.",
  },
  {
    href: "/ai-design-workflows",
    title: "Design with Automate Work with AI",
    desc: "See how broader design systems connect with product interfaces, layout quality, visual hierarchy, and repeatable design execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how product design workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI product design workflow?",
    a: "An AI product design workflow is a structured process that uses AI across user understanding, flow planning, screen design support, feedback review, and repeatable product design execution.",
  },
  {
    q: "Why are AI product design workflows important?",
    a: "They are important because they help teams move from random screen design to more structured, user-focused, and repeatable product experience systems.",
  },
  {
    q: "Can beginners use AI product design workflows?",
    a: "Yes. Beginners can start with simple workflows for user flow mapping, screen planning, content guidance, and feedback organization before using more advanced systems.",
  },
  {
    q: "Are AI product design workflows only for app companies?",
    a: "No. SaaS teams, startups, education platforms, internal tools teams, agencies, freelancers, and digital businesses can all use structured AI product design workflows.",
  },
  {
    q: "What is the difference between design tools and product design workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical product design execution.",
  },
  {
    q: "Can AI product design workflows help improve usability?",
    a: "Yes. A strong workflow can support clearer user flows, better content structure, improved screen decisions, stronger hierarchy, and more disciplined iteration.",
  },
  {
    q: "What is the biggest mistake people make with AI in product design?",
    a: "A common mistake is generating interface ideas without building a proper system for user goals, flow logic, design clarity, feedback review, and product context.",
  },
  {
    q: "Where should someone start with AI product design workflows?",
    a: "A good starting point is a simple system: define the user task, map the flow, plan the screens, clarify the content, then improve the experience through review and iteration.",
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

export default function AiProductDesignWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI product design workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI product design workflows help people move from disconnected interface decisions to a structured system
              for user understanding, flow planning, screen clarity, design documentation, and repeatable product
              design execution. Instead of relying on random screen ideas, a workflow creates a practical process that
              improves usability, alignment, and long-term design quality.
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
            title="What AI product design workflows actually mean"
            desc="A workflow-based product design approach makes AI useful because design decisions sit inside a practical sequence instead of becoming random layouts, random screens, or random UI suggestions."
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
            title="Core stages inside an AI product design workflow"
            desc="A practical product design system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI product design workflows are commonly used"
            desc="These workflows are relevant wherever user tasks, interfaces, screen flows, and design clarity need to improve in a structured way."
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
            desc="These pages connect AI product design workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI product design workflows."
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
