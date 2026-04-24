import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  Briefcase,
  FilePenLine,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Megaphone,
  Search,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Content Creation | Sikhadenge",
  description:
    "Explore the best AI tools for content creation across ideation, writing, scripting, research, repurposing, and workflow support. A practical guide for students, freelancers, creators, and digital teams.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-tools-for-content-creation",
  },
  openGraph: {
    title: "Best AI Tools for Content Creation | Sikhadenge",
    description:
      "A practical guide to the best AI tools for content creation, including writing, ideation, research, repurposing, and workflow support.",
    url: "https://sikhadenge.in/ai-tools-for-content-creation",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Tools for Content Creation | Sikhadenge",
    description:
      "A practical guide to the best AI tools for content creation, including writing, ideation, research, repurposing, and workflow support.",
  },
};

const quickInfo = [
  {
    title: "Content speed",
    desc: "AI tools can reduce time spent on ideation, writing, outlining, and content structuring.",
  },
  {
    title: "Workflow support",
    desc: "The right tool mix helps with planning, scripting, repurposing, editing, and publishing support.",
  },
  {
    title: "Practical value",
    desc: "Useful content tools are the ones that improve output quality and execution clarity, not just generate text.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Content demand is higher than ever",
    desc: "Modern creators and businesses need more posts, scripts, captions, ads, and communication assets across multiple platforms.",
  },
  {
    icon: Workflow,
    title: "Manual content work is slow",
    desc: "Without systems, content creation becomes repetitive, inconsistent, and difficult to scale across channels and formats.",
  },
  {
    icon: Bot,
    title: "AI tools can support execution",
    desc: "The best tools help with idea generation, outlining, rewriting, scripting, and structured content development.",
  },
  {
    icon: Briefcase,
    title: "Content skill is career-relevant",
    desc: "Students, freelancers, creators, marketers, and operators all benefit when they can produce better content faster.",
  },
];

const toolCategories = [
  {
    icon: Brain,
    title: "Idea Generation Tools",
    desc: "Tools that help generate content ideas, content pillars, hooks, post angles, and creative direction for different formats.",
  },
  {
    icon: FileText,
    title: "Writing Support Tools",
    desc: "Tools that assist with writing captions, posts, carousels, descriptions, emails, ad copy, and structured text content.",
  },
  {
    icon: FilePenLine,
    title: "Scripting Tools",
    desc: "Tools that help plan scripts for reels, YouTube videos, explainers, educational content, and short-form content pieces.",
  },
  {
    icon: Search,
    title: "Research Support Tools",
    desc: "Tools that help collect, summarize, compare, and organize information before content gets written or published.",
  },
  {
    icon: MessageSquareText,
    title: "Repurposing Tools",
    desc: "Tools that help turn one core idea into multiple outputs such as posts, captions, hooks, scripts, and summaries.",
  },
  {
    icon: Workflow,
    title: "Workflow Tools",
    desc: "Tools that support planning, organizing, storing, refining, and systemizing content work as part of a repeatable process.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    desc: "Students can use AI tools for notes, study content, project writing, presentations, and digital content practice.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Freelancers can improve client delivery through faster ideation, better copy, stronger scripting, and structured output.",
  },
  {
    icon: Users,
    title: "Creators",
    desc: "Creators can use AI for content calendars, script development, hook creation, repurposing, and publishing support.",
  },
  {
    icon: Megaphone,
    title: "Digital Teams",
    desc: "Small teams can use AI tools to improve campaign content, communication assets, and execution consistency.",
  },
];

const relatedPaths = [
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the broader AI tools ecosystem across design, video, content, automation, and modern digital execution.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill categories that connect tools with practical output and real workflow use.",
  },
  {
    href: "/ai-skills-for-creators",
    title: "AI Skills for Creators",
    desc: "See how creators can use AI for content systems, visual output, video support, and execution speed.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Review the AI skills that matter most for modern digital work, practical projects, and multi-skill execution.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how AI tools fit inside a broader AI Expert capability model across multiple execution areas.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first digital capability is taught.",
  },
];

const faqs = [
  {
    q: "What are AI tools for content creation?",
    a: "AI tools for content creation are tools that support idea generation, writing, research, scripting, repurposing, editing, and workflow management for different types of digital content.",
  },
  {
    q: "Which AI tools are useful for writing content?",
    a: "Useful writing tools are the ones that help with outlines, drafts, rewriting, tone adjustment, caption support, and structured content planning. The best choice depends on the use case and workflow.",
  },
  {
    q: "Can AI tools help with content ideas?",
    a: "Yes. Many AI tools can support idea generation, topic discovery, post angles, hook creation, and content pillar planning for students, creators, freelancers, and teams.",
  },
  {
    q: "Are AI tools enough to create strong content?",
    a: "No. Tools can speed up execution, but strong content still needs clarity, audience understanding, editing judgment, and a structured workflow.",
  },
  {
    q: "Who should learn AI tools for content creation?",
    a: "Students, freelancers, creators, marketers, digital operators, and small business teams can all benefit from learning content-focused AI tools.",
  },
  {
    q: "Can beginners use AI tools for content creation?",
    a: "Yes. Beginners can start with simple use cases such as content ideas, caption writing, script drafting, and content planning before moving into more advanced workflows.",
  },
  {
    q: "What is the difference between content tools and content skills?",
    a: "Content tools are platforms or software. Content skills are the practical abilities to use those tools effectively for planning, writing, editing, and publishing useful content.",
  },
  {
    q: "Where should I start learning content-focused AI tools?",
    a: "A structured learning path is the best starting point. You can begin with practical use cases, understand tool categories, and then build workflow-based execution capability.",
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

export default function AiToolsForContentCreationPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Create Content with AI Tools Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI tools for content creation
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              AI tools for content creation can help with ideation, research, outlining, writing, scripting,
              repurposing, and workflow organization. The best tools are not just text generators. They are
              practical support systems that help learners and teams create better content with more speed,
              clarity, and structure across multiple digital formats.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Tools
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
            pill="Why this matters"
            title="Why AI tools matter for content creation"
            desc="Modern content work requires more speed, consistency, and format flexibility than before. AI tools can support content systems by helping with planning, writing, scripting, repurposing, and execution flow."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whyItMatters.map((item) => {
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
            pill="Tool categories"
            title="Main AI tool categories for content work"
            desc="The strongest content systems usually combine multiple types of tools instead of depending on only one output method."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {toolCategories.map((item) => {
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
            title="Who can use these tools effectively"
            desc="Content-focused AI tools are not limited to one audience. Their value depends on how well they are applied inside a clear workflow."
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
            pill="Related learning paths"
            title="Explore connected AI learning pages"
            desc="These pages connect content-focused AI tools with the broader Sikhadenge topic cluster around AI skills, creators, tools, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPaths.map((item) => (
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
            desc="These are the common questions people ask before choosing AI tools for content creation and building a practical content workflow."
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
