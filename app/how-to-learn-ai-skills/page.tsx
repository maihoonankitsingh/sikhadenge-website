import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Briefcase, Lightbulb, Search, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Learn AI Skills | Sikhadenge",
  description:
    "Learn how to start learning AI skills in a structured way. Understand the right path for beginners, which AI skill areas matter most, which tools to explore, and how to build practical AI-first digital capability.",
  alternates: {
    canonical: "https://sikhadenge.in/how-to-learn-ai-skills",
  },
  openGraph: {
    title: "How to Learn AI Skills | Sikhadenge",
    description:
      "Learn how to start learning AI skills in a structured way. Understand the right path for beginners, which AI skill areas matter most, which tools to explore, and how to build practical AI-first digital capability.",
    url: "https://sikhadenge.in/how-to-learn-ai-skills",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Learn AI Skills | Sikhadenge",
    description:
      "Learn how to start learning AI skills in a structured way. Understand the right path for beginners, which AI skill areas matter most, which tools to explore, and how to build practical AI-first digital capability.",
  },
};

const faqs = [
  {
    q: "What is the best way to start learning AI skills?",
    a: "The best way is to follow a structured path. First understand the main AI skill categories, then learn the tools, then practice workflows, and finally build real outputs instead of consuming random tutorials.",
  },
  {
    q: "Should beginners start with AI tools or AI workflows?",
    a: "Beginners should understand both, but tools alone are not enough. The stronger approach is to learn tools inside a practical workflow so the learning connects with real execution.",
  },
  {
    q: "Which AI skills matter most at the beginning?",
    a: "The most useful starting areas are AI content, AI design support, AI video support, prompt clarity, tool selection, and workflow thinking.",
  },
  {
    q: "Can students and freelancers learn AI skills without coding?",
    a: "Yes. Many practical AI skills can be learned without coding, especially in content, design, video, productivity, page structure, and marketing support.",
  },
  {
    q: "How long does it take to learn practical AI skills?",
    a: "The timeline depends on learning consistency, but a structured path helps learners build useful capability faster than random exploration.",
  },
  {
    q: "What is the biggest mistake people make when learning AI?",
    a: "A common mistake is learning random tools without understanding skills, outputs, and workflows. This usually creates confusion instead of capability.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
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
      <h2 className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[48px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 max-w-4xl text-[17px] leading-[1.8] text-[#47607F] md:text-[18px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function HowToLearnAiSkillsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>AI Learning Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              How to learn AI skills in a practical way
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Learning AI skills properly is not about collecting random tools or copying scattered prompts. The better
              approach is to understand which AI skill areas matter, how those areas connect with real digital work, and
              how to practice them through structured workflows. That is how learners move from confusion to useful
              execution capability.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Start correctly"
            title="Why most people learn AI the wrong way"
            desc="Many learners stay confused because they start with random tools and disconnected tutorials instead of following a skill-based learning path."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Search,
                title: "Too much random information",
                desc: "People often jump between tools, videos, prompts, and social media posts without knowing what skill they are actually trying to build.",
              },
              {
                icon: Bot,
                title: "Tools are confused with skills",
                desc: "A tool is not the same as a capability. The stronger approach is to understand the skill first and then use the tool inside a useful workflow.",
              },
              {
                icon: Workflow,
                title: "No workflow thinking",
                desc: "Without workflow clarity, learners can generate outputs but cannot build repeatable, useful execution systems for work, projects, or clients.",
              },
              {
                icon: Briefcase,
                title: "No real-world direction",
                desc: "Learning becomes much more effective when it is connected to practical outcomes such as digital work, freelancing, content creation, marketing, or modern execution roles.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-6 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Core learning areas"
            title="The main AI skill categories to focus on"
            desc="A practical AI learning path works best when core capability areas are understood together instead of in isolation."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "AI content creation and writing support",
              "AI design and visual direction support",
              "AI video support and short-form execution",
              "AI tools understanding and selection",
              "Prompt clarity and task structure",
              "Workflow thinking and practical digital execution",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.75] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Tools"
            title="Which tools should beginners explore"
            desc="Beginners do not need to learn every tool. They need a useful set of tools that supports practical skill-building."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "AI writing tools",
                desc: "Useful for scripting, captions, ideation, outlines, summaries, and communication support.",
              },
              {
                title: "AI design tools",
                desc: "Useful for visuals, thumbnails, creative references, design direction, and asset exploration.",
              },
              {
                title: "AI video tools",
                desc: "Useful for video planning, short-form execution, edits, shot thinking, and workflow acceleration.",
              },
              {
                title: "Workflow tools",
                desc: "Useful for planning, documentation, process clarity, task structure, and productivity improvement.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <h3 className="text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.85] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Step-by-step path"
            title="A practical roadmap for learning AI skills"
            desc="The most useful learning path is simple, structured, and connected to real output."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              "Understand the main AI skill categories",
              "Choose a small set of useful tools",
              "Practice one workflow at a time",
              "Create real output-based projects",
              "Improve speed, quality, and workflow clarity",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {index + 1}</div>
                <p className="mt-3 text-[16px] font-semibold leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Who should learn"
            title="Who benefits most from learning AI skills"
            desc="AI skills are useful wherever digital work needs faster execution, broader capability, and more structured output."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students building future-ready digital capability",
              "Freelancers expanding client delivery potential",
              "Creators improving content and media workflows",
              "Digital workers improving productivity and execution",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-0.5 h-5 w-5 text-[#2563EB]" />
                  <p className="text-[16px] font-semibold leading-[1.75] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Related pages"
            title="Explore connected AI pages"
            desc="These pages connect this learning guide with the wider Sikhadenge AI skills and workflow cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/ai-content-workflows", label: "Create Content with Automate Work with AI" },
              { href: "/ai-design-workflows", label: "Design with Automate Work with AI" },
              { href: "/ai-video-production-workflows", label: "Edit Videos with Automate Work with AI" },
              { href: "/ai-marketing-workflows", label: "Market with Automate Work with AI" },
              { href: "/site-map", label: "HTML Sitemap" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-[22px] border border-[#D8E5F4] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] transition hover:border-[#BFD4F3] hover:bg-[#FBFDFF]"
              >
                <span className="text-[15px] font-semibold text-[#071533]">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-[#2563EB] transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before starting their AI skills learning path."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-white text-[#2563EB] transition group-open:rotate-180">
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
