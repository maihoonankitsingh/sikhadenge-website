import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Analytics Workflows | Sikhadenge",
  description:
    "Understand AI analytics workflows in a practical way. Learn how structured AI-assisted systems help with data interpretation, metric tracking, reporting clarity, insight extraction, optimization loops, and repeatable analytics execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-analytics-workflows",
  },
  openGraph: {
    title: "AI Analytics Workflows | Sikhadenge",
    description:
      "A practical guide to AI analytics workflows across data interpretation, metric tracking, reporting clarity, insight extraction, optimization loops, and repeatable execution.",
    url: "https://sikhadenge.in/ai-analytics-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Analytics Workflows | Sikhadenge",
    description:
      "A practical guide to AI analytics workflows across data interpretation, metric tracking, reporting clarity, insight extraction, optimization loops, and repeatable execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI analytics workflows are structured systems that use AI support for metric tracking, data interpretation, reporting, pattern detection, decision support, and repeatable analytics execution.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, analytics becomes confusing and underused. A structured system improves reporting clarity, insight quality, decision speed, and better optimization discipline.",
  },
  {
    title: "Who benefits",
    desc: "Marketers, founders, analysts, operations teams, freelancers, agencies, educators, and businesses that rely on performance data all benefit from stronger AI-assisted analytics workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is more than reading one report",
    desc: "AI analytics workflows are not limited to looking at one dashboard or one metric. They connect tracking, interpretation, trend detection, insight extraction, reporting, and action planning into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI can support many analytics stages",
    desc: "A useful workflow uses AI across data summaries, anomaly spotting, metric explanations, report structuring, trend comparison, and optimization suggestions instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better decision execution",
    desc: "A strong workflow helps analytics become easier to understand, easier to communicate, easier to improve, and easier to use in real decision-making.",
  },
  {
    icon: Briefcase,
    title: "This matters in real business systems",
    desc: "Modern growth often depends on better data interpretation, not just data collection. Random reporting usually creates confusion, slow decisions, and weak optimization quality.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Business Goal & Metric Clarity",
    desc: "Start by identifying what outcome matters, which metrics actually reflect progress, what teams need to know, and what business questions the analytics system should answer.",
  },
  {
    icon: ClipboardList,
    title: "Tracking & Data Organization",
    desc: "Use AI to structure reporting categories, organize metrics, summarize large data sets, group related signals, and make raw data easier to interpret.",
  },
  {
    icon: FileText,
    title: "Insight & Reporting Support",
    desc: "Build clearer summaries, executive reports, metric explanations, trend notes, weekly updates, and action-focused analytics communication that is easier to understand.",
  },
  {
    icon: Search,
    title: "Pattern & Performance Direction",
    desc: "Plan how to detect changes in behavior, identify weak points, compare period performance, understand drop-offs, and translate numbers into practical next steps.",
  },
  {
    icon: RefreshCcw,
    title: "Optimization & Review Loop",
    desc: "Refine reporting logic, improve dashboard usefulness, update metric priorities, investigate performance shifts, and strengthen action quality through repeated iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Analytics System",
    desc: "Organize reporting templates, key metrics, review rules, dashboard notes, performance questions, and optimization logs into a repeatable analytics workflow system.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Marketing & Growth Teams",
    desc: "Marketing and growth teams can use AI analytics workflows to improve campaign analysis, reporting clarity, and better decision-making based on structured performance review.",
  },
  {
    icon: Sparkles,
    title: "Founders & Businesses",
    desc: "Founders and businesses can use these workflows to understand business performance faster, reduce reporting confusion, and make clearer growth decisions.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Agencies",
    desc: "Freelancers and agencies can use workflow systems to create cleaner client reports, stronger performance summaries, and more structured optimization recommendations.",
  },
  {
    icon: Users,
    title: "Operations & Product Teams",
    desc: "Operations and product teams can use structured workflows to monitor process quality, identify bottlenecks, and improve execution through data-driven reviews.",
  },
];

const relatedPages = [
  {
    href: "/ai-seo-workflows",
    title: "AI SEO Workflows",
    desc: "See how analytics connects with traffic analysis, page improvement, content updates, and long-term organic growth decisions.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "Understand how analytics supports campaign reviews, audience understanding, optimization logic, and structured marketing execution.",
  },
  {
    href: "/ai-lead-generation-workflows",
    title: "AI Lead Generation Workflows",
    desc: "Explore how analytics connects with lead quality, conversion tracking, acquisition performance, and better channel-level optimization.",
  },
  {
    href: "/ai-business-workflows",
    title: "AI Business Workflows",
    desc: "See how analytics fits into broader business systems, performance reviews, reporting discipline, and operational decision-making.",
  },
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "Understand how analytics workflows support process reviews, output measurement, team performance tracking, and repeatable improvement systems.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how analytics workflows fit inside a broader AI-first digital capability model.",
  },
];

const faqs = [
  {
    q: "What is an AI analytics workflow?",
    a: "An AI analytics workflow is a structured process that uses AI across metric tracking, data interpretation, reporting, trend detection, optimization review, and repeatable analytics execution.",
  },
  {
    q: "Why are AI analytics workflows important?",
    a: "They are important because they help individuals and teams move from raw data confusion to more structured, useful, and repeatable performance analysis systems.",
  },
  {
    q: "Can beginners use AI analytics workflows?",
    a: "Yes. Beginners can start with simple workflows for metric summaries, trend notes, report formatting, and basic performance interpretation before using more advanced systems.",
  },
  {
    q: "Are AI analytics workflows only for data analysts?",
    a: "No. Founders, marketers, agencies, freelancers, operations teams, product teams, and businesses can all use structured AI analytics workflows.",
  },
  {
    q: "What is the difference between analytics tools and analytics workflows?",
    a: "Tools are the software or platforms. Workflows are the repeatable systems that define how those tools are used step by step for practical analytics execution.",
  },
  {
    q: "Can AI analytics workflows help with reporting?",
    a: "Yes. A strong workflow can support report summaries, trend explanation, anomaly detection, clearer dashboards, and more action-oriented reporting decisions.",
  },
  {
    q: "What is the biggest mistake people make with AI in analytics?",
    a: "A common mistake is generating high-level summaries without building a proper system for metric relevance, reporting structure, context, and repeated performance review.",
  },
  {
    q: "Where should someone start with AI analytics workflows?",
    a: "A good starting point is a simple system: define key metrics, collect consistent data, create a reporting structure, summarize changes weekly, then improve decisions through repeated review.",
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

export default function AiAnalyticsWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI analytics workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI analytics workflows help people move from disconnected reports and raw numbers to a structured system
              for metric tracking, data interpretation, reporting clarity, insight extraction, and repeatable decision
              support. Instead of relying on random data checks, a workflow creates a practical process that improves
              understanding, speed, and long-term optimization quality.
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
            title="What AI analytics workflows actually mean"
            desc="A workflow-based analytics approach makes AI useful because data decisions sit inside a practical sequence instead of becoming random dashboard checks or random report generation."
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
            title="Core stages inside an AI analytics workflow"
            desc="A practical analytics system usually moves through a small number of repeatable stages that make execution easier to manage and improve."
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
            title="Where AI analytics workflows are commonly used"
            desc="These workflows are relevant wherever business, campaign, process, or performance data needs to be interpreted and turned into structured decisions."
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
            desc="These pages connect AI analytics workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI analytics workflows."
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
