import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Briefcase, CalendarRange, Lightbulb, Search, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Skills Roadmap for Beginners | Sikhadenge",
  description:
    "Follow a practical AI skills roadmap for beginners. Learn the right order to build AI content, design, video, tools, workflows, and execution capability without getting lost in random tools.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-roadmap-for-beginners",
  },
  openGraph: {
    title: "AI Skills Roadmap for Beginners | Sikhadenge",
    description:
      "Follow a practical AI skills roadmap for beginners. Learn the right order to build AI content, design, video, tools, workflows, and execution capability without getting lost in random tools.",
    url: "https://sikhadenge.in/ai-skills-roadmap-for-beginners",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Skills Roadmap for Beginners | Sikhadenge",
    description:
      "Follow a practical AI skills roadmap for beginners. Learn the right order to build AI content, design, video, tools, workflows, and execution capability without getting lost in random tools.",
  },
};

const faqs = [
  {
    q: "What is the best AI skills roadmap for beginners?",
    a: "A strong AI skills roadmap starts with understanding core skill buckets such as content, design, video, tools, and workflows. After that, learners should practice one workflow at a time and build real outputs.",
  },
  {
    q: "Should beginners learn many AI tools at once?",
    a: "No. Beginners usually progress faster when they learn a small set of useful tools inside practical workflows instead of trying to learn everything together.",
  },
  {
    q: "How long does a beginner roadmap usually take?",
    a: "It depends on consistency and learning depth, but a structured roadmap always helps reduce confusion and makes progress faster than random exploration.",
  },
  {
    q: "Which AI skills should be learned first?",
    a: "A useful starting sequence is AI content support, AI design support, AI tools understanding, workflow thinking, and then broader execution systems.",
  },
  {
    q: "Can beginners build practical projects while learning AI?",
    a: "Yes. In fact, building simple real projects is one of the best ways to convert AI knowledge into practical capability.",
  },
  {
    q: "Who is this roadmap useful for?",
    a: "This roadmap is useful for students, freelancers, creators, freshers, career switchers, and anyone trying to build practical AI-first digital capability.",
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

export default function AiSkillsRoadmapForBeginnersPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Beginner Roadmap</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[62px]">
              AI skills roadmap for beginners
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Beginners often struggle with AI because they try to learn too many tools without a structured path.
              A better approach is to follow a roadmap that moves from core AI skill understanding to tools, then to
              workflows, and finally to output-based execution. This makes learning practical, measurable, and useful
              for real digital work.
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
            pill="Why roadmaps matter"
            title="Why beginners need a roadmap instead of random learning"
            desc="A structured roadmap reduces confusion and helps beginners build capability in the right order."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Search,
                title: "Too many tools create confusion",
                desc: "Without a roadmap, beginners keep jumping between tools and tutorials without understanding what skill they are actually building.",
              },
              {
                icon: Workflow,
                title: "Skills need a sequence",
                desc: "AI learning works best when one capability supports the next. That sequence matters more than random tool collection.",
              },
              {
                icon: Bot,
                title: "Tools must fit the workflow",
                desc: "A roadmap helps beginners understand where a tool fits and why it matters instead of treating every tool like a separate subject.",
              },
              {
                icon: Briefcase,
                title: "Output matters more than theory",
                desc: "A practical roadmap keeps learning connected to real use cases, digital work, and useful outputs instead of abstract information.",
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
            pill="Roadmap structure"
            title="The main phases in a beginner AI skills roadmap"
            desc="Beginners usually make the fastest progress when learning moves through a clear multi-step structure."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Phase 1",
                desc: "Understand what AI skills actually are and how they connect with practical digital work.",
              },
              {
                title: "Phase 2",
                desc: "Learn the main AI skill buckets such as content, design, video, tools, and workflows.",
              },
              {
                title: "Phase 3",
                desc: "Choose a small number of useful tools and understand where each one fits.",
              },
              {
                title: "Phase 4",
                desc: "Practice real workflows using connected tools and structured task execution.",
              },
              {
                title: "Phase 5",
                desc: "Build output-based projects that turn knowledge into actual practical capability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                  <CalendarRange className="h-4 w-4" />
                  {item.title}
                </div>
                <p className="mt-3 text-[16px] font-semibold leading-[1.75] text-[#071533]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="First skills"
            title="Which AI skills beginners should learn first"
            desc="Not every skill needs to be learned at the same time. A better roadmap starts with core practical skill areas."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "AI content support and writing clarity",
              "AI design support and visual direction",
              "AI tools understanding and selection",
              "Prompt clarity and task structure",
              "Workflow thinking and execution logic",
              "Real output practice with simple projects",
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

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Tools strategy"
            title="How beginners should choose AI tools"
            desc="Beginners do not need the biggest stack. They need a small, useful stack that supports learning and output."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Content tools",
                desc: "Useful for ideation, outlines, scripts, captions, summaries, and communication tasks.",
              },
              {
                title: "Design tools",
                desc: "Useful for thumbnails, creative references, asset thinking, and visual direction support.",
              },
              {
                title: "Video tools",
                desc: "Useful for editing support, short-form workflows, shot thinking, and production acceleration.",
              },
              {
                title: "Workflow tools",
                desc: "Useful for planning, organization, task structuring, and repeatable digital execution systems.",
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

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            pill="Who should follow this"
            title="Who benefits most from a beginner AI roadmap"
            desc="A structured roadmap helps any learner who wants faster clarity and more practical progress."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              "Students starting from zero",
              "Freelancers expanding skill range",
              "Creators improving workflow quality",
              "Career switchers entering digital work",
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
            desc="These pages connect this roadmap with the wider Sikhadenge AI skills and workflow cluster."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { href: "/ai-generalist", label: "AI Expert" },
              { href: "/ai-skills", label: "AI Skills" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
              { href: "/how-to-learn-ai-skills", label: "How to Learn AI Skills" },
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
            desc="These are the common questions beginners ask before following an AI skills roadmap."
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
