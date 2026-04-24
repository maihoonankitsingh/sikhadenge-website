import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  FileSearch,
  FileText,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  Search,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Research Workflows | Sikhadenge",
  description:
    "Understand AI research workflows in a practical way. Learn how structured AI-assisted research systems help with question clarity, source gathering, synthesis, note organization, and repeatable research execution.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-research-workflows",
  },
  openGraph: {
    title: "AI Research Workflows | Sikhadenge",
    description:
      "A practical guide to AI research workflows across question clarity, source gathering, synthesis, note organization, and repeatable research execution.",
    url: "https://sikhadenge.in/ai-research-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research Workflows | Sikhadenge",
    description:
      "A practical guide to AI research workflows across question clarity, source gathering, synthesis, note organization, and repeatable research execution.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI research workflows are structured systems that use AI support for research planning, source handling, note synthesis, and repeatable insight building.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, research becomes scattered and hard to trust. A system improves clarity, speed, synthesis, and better decision support.",
  },
  {
    title: "Who benefits",
    desc: "Students, creators, marketers, founders, freelancers, analysts, and teams all benefit from better AI-assisted research workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than one search prompt",
    desc: "AI research workflows are not limited to asking one question. They connect research intent, source gathering, note extraction, synthesis, and final understanding into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple research stages",
    desc: "Useful workflows use AI across question framing, summary support, comparison, note cleaning, information grouping, and output structuring instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better research quality",
    desc: "A strong workflow helps research become more usable, more organized, easier to review, and easier to convert into decisions or content.",
  },
  {
    icon: Briefcase,
    title: "This matters in real digital work",
    desc: "Modern work often needs faster learning, faster insight gathering, better summaries, and more structured understanding across many topics.",
  },
];

const workflowStages = [
  {
    icon: Lightbulb,
    title: "Research Question Clarity",
    desc: "Start by defining what needs to be understood, why the research matters, what level of detail is needed, and what output should be produced.",
  },
  {
    icon: Search,
    title: "Source Discovery & Collection",
    desc: "Use AI to support finding directions, identifying key themes, grouping information, and reducing wasted search effort.",
  },
  {
    icon: FileSearch,
    title: "Source Reading & Extraction",
    desc: "Pull out key facts, supporting ideas, comparison points, objections, patterns, or repeated themes from the gathered material.",
  },
  {
    icon: FileText,
    title: "Synthesis & Note Structuring",
    desc: "Turn raw information into summaries, organized notes, key takeaways, clean bullet logic, or topic-based understanding structures.",
  },
  {
    icon: RefreshCcw,
    title: "Review & Refinement",
    desc: "Check for weak assumptions, missing information, repetition, confusion, and improve the final research clarity through iteration.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Research System",
    desc: "Organize research notes, source sets, summary patterns, comparison templates, and reusable systems for repeated research work.",
  },
];

const useCases = [
  {
    icon: BookOpen,
    title: "Students",
    desc: "Students can use AI research workflows to understand topics faster, summarize information, and build cleaner study or project notes.",
  },
  {
    icon: Briefcase,
    title: "Freelancers & Professionals",
    desc: "Freelancers and professionals can use these workflows to research industries, clients, competitors, tools, and execution ideas more clearly.",
  },
  {
    icon: Sparkles,
    title: "Creators & Marketers",
    desc: "Creators and marketers can use workflow systems to gather insights, topic angles, audience patterns, and better content direction.",
  },
  {
    icon: Users,
    title: "Teams & Founders",
    desc: "Teams and founders can use AI research workflows for market understanding, planning support, decision inputs, and internal knowledge systems.",
  },
];

const relatedPages = [
  {
    href: "/ai-productivity-workflows",
    title: "AI Productivity Workflows",
    desc: "See how better research connects with planning, note handling, summaries, and structured daily execution.",
  },
  {
    href: "/ai-prompt-workflows",
    title: "AI Prompt Workflows",
    desc: "Understand how structured prompting improves research questions, summaries, comparisons, and output quality.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support research, summaries, note structuring, comparisons, and insight extraction workflows.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with research systems and practical digital execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how research workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how research workflows connect with broader high-value AI skill development.",
  },
];

const faqs = [
  {
    q: "What is an AI research workflow?",
    a: "An AI research workflow is a structured process that uses AI across question framing, source handling, extraction, synthesis, note structuring, and repeatable research execution.",
  },
  {
    q: "Why are AI research workflows important?",
    a: "They are important because they help users move from scattered information gathering to more usable, organized, and repeatable research systems.",
  },
  {
    q: "Can beginners use AI research workflows?",
    a: "Yes. Beginners can start with simple workflows for defining the question, gathering notes, summarizing sources, and organizing the final understanding.",
  },
  {
    q: "Are AI research workflows only for students?",
    a: "No. Students, creators, freelancers, marketers, founders, analysts, and teams can all use structured AI research workflows.",
  },
  {
    q: "What is the difference between searching and a research workflow?",
    a: "Searching is one step. A research workflow is the full repeatable system that includes question clarity, source gathering, synthesis, refinement, and usable final output.",
  },
  {
    q: "Can AI research workflows improve note quality?",
    a: "Yes. A strong workflow can improve note clarity, reduce repetition, organize ideas better, and make research easier to reuse later.",
  },
  {
    q: "What is the biggest mistake people make with AI research?",
    a: "A common mistake is collecting too much information without a clear question, source structure, synthesis process, or final output format.",
  },
  {
    q: "Where should someone start with AI research workflows?",
    a: "A good starting point is a simple system: define the research question, gather sources, extract key points, summarize them clearly, then refine the final notes.",
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

export default function AiResearchWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI research workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI research workflows help people move from random searching to a structured system for question clarity,
              source gathering, note extraction, synthesis, and final understanding. Instead of relying on disconnected
              searches, a workflow creates a repeatable process that improves speed, clarity, and practical research quality.
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
            title="What AI research workflows actually mean"
            desc="A workflow-based research approach makes AI useful because every research task sits inside a practical sequence instead of becoming scattered searching."
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
            title="Core stages inside an AI research workflow"
            desc="A practical research system usually moves through a small number of repeatable stages that make understanding easier to manage and improve."
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
            title="Where AI research workflows are commonly used"
            desc="These workflows are relevant wherever information needs to be gathered, understood, structured, and reused in a practical way."
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
            desc="These pages connect AI research workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI research workflows."
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
