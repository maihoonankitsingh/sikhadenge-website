import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Layers3,
  Lightbulb,
  RefreshCcw,
  Repeat,
  ScissorsLineDashed,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Create Content with AI Repurposing Workflows | Sikhadenge",
  description:
    "Understand AI content repurposing workflows in a practical way. Learn how structured AI-assisted systems help turn one content idea into multiple usable formats across posts, captions, scripts, carousels, and short-form assets.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-content-repurposing-workflows",
  },
  openGraph: {
    title: "Create Content with AI Repurposing Workflows | Sikhadenge",
    description:
      "A practical guide to AI content repurposing workflows across source content, extraction, adaptation, format creation, and repeatable publishing systems.",
    url: "https://sikhadenge.in/ai-content-repurposing-workflows",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Content with AI Repurposing Workflows | Sikhadenge",
    description:
      "A practical guide to AI content repurposing workflows across source content, extraction, adaptation, format creation, and repeatable publishing systems.",
  },
};

const quickInfo = [
  {
    title: "What it means",
    desc: "AI content repurposing workflows are structured systems that turn one content source into multiple usable output formats.",
  },
  {
    title: "Why it matters",
    desc: "Without a workflow, repurposing becomes messy or repetitive. A system improves speed, clarity, and content reuse quality.",
  },
  {
    title: "Who benefits",
    desc: "Creators, marketers, freelancers, founders, educators, and content teams all benefit from better repurposing workflows.",
  },
];

const meaningBlocks = [
  {
    icon: Workflow,
    title: "A workflow is bigger than rewriting one post",
    desc: "AI content repurposing workflows are not just about rewriting text once. They connect source content, extraction, restructuring, adaptation, and multi-format output into one repeatable system.",
  },
  {
    icon: Bot,
    title: "AI supports multiple repurposing stages",
    desc: "Useful workflows use AI across summarization, angle extraction, hook creation, format transformation, caption support, and platform adaptation instead of one isolated task.",
  },
  {
    icon: Target,
    title: "The goal is better content reuse",
    desc: "A strong workflow helps one idea create more value by turning it into multiple useful content outputs without losing clarity.",
  },
  {
    icon: Briefcase,
    title: "This matters in real content systems",
    desc: "Modern content teams and creators often need more output from fewer ideas, faster publishing cycles, and stronger cross-platform consistency.",
  },
];

const workflowStages = [
  {
    icon: FileText,
    title: "Source Content Selection",
    desc: "Start with one strong source such as a video, long post, webinar note, article, class recording, or master draft.",
  },
  {
    icon: ScissorsLineDashed,
    title: "Core Point Extraction",
    desc: "Use AI to identify hooks, key takeaways, useful angles, supporting points, and audience-relevant highlights from the source.",
  },
  {
    icon: Repeat,
    title: "Format Transformation",
    desc: "Turn one source into multiple formats such as captions, short posts, script points, carousel structure, talking points, or summary notes.",
  },
  {
    icon: Layers3,
    title: "Platform Adaptation",
    desc: "Adjust the repurposed output for different channels, tone styles, post types, audience intent, and content length requirements.",
  },
  {
    icon: RefreshCcw,
    title: "Refinement & Cleanup",
    desc: "Improve repetition, remove weak lines, tighten hooks, and refine the final structure so each format feels usable and clear.",
  },
  {
    icon: FolderKanban,
    title: "Repeatable Publishing System",
    desc: "Organize batches, content status, source library, output mapping, and repeatable reuse systems for continuous publishing.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can repurpose one video, one post, or one idea into many smaller content pieces across multiple platforms.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can use these workflows to produce more content deliverables from a smaller number of client inputs.",
  },
  {
    icon: Sparkles,
    title: "Founders & Educators",
    desc: "Founders and educators can turn live sessions, webinars, and knowledge assets into regular publishing outputs.",
  },
  {
    icon: Workflow,
    title: "Content Teams",
    desc: "Teams can use workflow systems to improve output scale, reduce repetition, and create better cross-format publishing pipelines.",
  },
];

const relatedPages = [
  {
    href: "/ai-content-workflows",
    title: "Create Content with Automate Work with AI",
    desc: "Explore the broader content workflow layer for ideation, drafting, refinement, and structured content systems.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the wider AI skill categories that connect with content systems and practical digital execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools support summarization, rewriting, adaptation, and structured repurposing workflows.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Understand how repurposing workflows fit inside a broader AI-first digital capability model.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "See how content repurposing connects with broader high-value AI skill development.",
  },
  {
    href: "/ai-marketing-workflows",
    title: "Market with Automate Work with AI",
    desc: "See how repurposing connects with campaign systems, message reuse, and broader marketing execution.",
  },
];

const faqs = [
  {
    q: "What is an AI content repurposing workflow?",
    a: "An AI content repurposing workflow is a structured process that uses AI to turn one source content asset into multiple usable formats such as posts, captions, scripts, summaries, and content pieces.",
  },
  {
    q: "Why are AI content repurposing workflows important?",
    a: "They are important because they help creators and teams produce more useful output from existing ideas while saving time and improving consistency.",
  },
  {
    q: "Can beginners use AI content repurposing workflows?",
    a: "Yes. Beginners can start with simple workflows like turning one long post into short posts, captions, and summary points before moving into advanced systems.",
  },
  {
    q: "Are AI content repurposing workflows only for creators?",
    a: "No. Creators, freelancers, marketers, educators, founders, and content teams can all use structured repurposing workflows.",
  },
  {
    q: "What is the difference between rewriting and repurposing?",
    a: "Rewriting changes the same content. Repurposing transforms one content source into multiple different output formats for different uses or platforms.",
  },
  {
    q: "Can AI content repurposing workflows help with cross-platform publishing?",
    a: "Yes. A strong workflow can help adapt one source into platform-specific formats for posts, captions, carousels, scripts, and short-form assets.",
  },
  {
    q: "What is the biggest mistake people make with content repurposing?",
    a: "A common mistake is repeating the same content in slightly different words without extracting real angles, format changes, or audience-specific structure.",
  },
  {
    q: "Where should someone start with AI content repurposing workflows?",
    a: "A good starting point is a simple system: choose one source, extract key points, convert into 2 to 4 smaller formats, refine, and batch them for publishing.",
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

export default function AiContentRepurposingWorkflowsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Workflow Page</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              AI content repurposing workflows
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI content repurposing workflows help people move from one-time content publishing to a structured
              system for reusing ideas across multiple formats. Instead of creating everything from scratch,
              a workflow creates a repeatable process that turns one strong content source into multiple useful
              outputs with better speed, clarity, and consistency.
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
            title="What AI content repurposing workflows actually mean"
            desc="A workflow-based repurposing approach makes AI useful because every content reuse task sits inside a practical sequence instead of becoming random rewriting."
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
            title="Core stages inside an AI content repurposing workflow"
            desc="A practical repurposing system usually moves through a small number of repeatable stages that make content reuse easier to manage and improve."
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
            title="Where AI content repurposing workflows are commonly used"
            desc="These workflows are relevant wherever one strong source content asset needs to be reused across multiple formats and platforms."
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
            desc="These pages connect AI content repurposing workflows with the broader Sikhadenge topic cluster around skills, tools, systems, and AI-first digital capability."
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
            desc="These are the common questions people ask before building structured AI content repurposing workflows."
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
