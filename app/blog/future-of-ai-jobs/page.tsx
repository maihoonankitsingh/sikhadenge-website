import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Brain, Lightbulb, Rocket, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Future of AI Jobs in 2026 and Beyond | Sikhadenge",
  description:
    "Understand the future of AI jobs in 2026 and beyond. Learn which roles are growing, what skills matter, and how beginners can prepare for practical AI-driven work.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/future-of-ai-jobs",
  },
};

const shifts = [
  "AI-assisted execution roles are growing across content, design, video, and digital workflows",
  "Businesses increasingly prefer people who can combine tools, judgment, and delivery speed",
  "Cross-functional roles are becoming more valuable than narrow isolated skill roles",
  "AI is changing how work gets done, not only creating new software jobs",
  "Freelance, creator, and small business roles are being reshaped by AI workflows",
  "People who understand both fundamentals and AI-assisted execution will have stronger long-term advantage",
];

const roles = [
  "AI content and communication support roles",
  "AI design and visual execution roles",
  "AI video workflow and short-form media roles",
  "AI marketing operations and asset support roles",
  "AI productivity and workflow support roles",
  "AI Expert-style digital execution roles",
];

const mistakes = [
  "Thinking the future of AI jobs only belongs to coders and engineers",
  "Ignoring fundamentals and relying only on tool familiarity",
  "Not building proof of work through practical samples",
  "Treating AI as a shortcut instead of a workflow multiplier",
];

const relatedLinks = [
  { href: "/future-of-ai-skills", label: "Future of AI Skills" },
  { href: "/ai-career-paths", label: "AI Career Paths" },
  { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
  { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/site-map", label: "HTML Sitemap" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-[17px] leading-[1.8] text-[#47607F]">{desc}</p>
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Future Jobs Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              Future of AI Jobs in 2026 and Beyond
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              The future of AI jobs is not limited to software engineering or deep technical roles. AI is changing
              digital work across content, design, communication, video, marketing, workflows, and productivity.
              That means future AI jobs will include many practical roles where people use AI to improve delivery,
              quality, and speed across real business execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-career-paths"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Career Paths
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "Work is changing",
                desc: "AI is reshaping how digital work gets planned, produced, reviewed, and delivered.",
              },
              {
                icon: Workflow,
                title: "Systems matter more",
                desc: "Future jobs will reward people who can use AI inside repeatable execution workflows.",
              },
              {
                icon: Briefcase,
                title: "Broader job scope",
                desc: "Many roles will combine content, tools, communication, and workflow support together.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-6 w-6 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 text-[20px] font-semibold text-[#071533]">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.8] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Why the future of AI jobs is bigger than people think"
            desc="Many people still assume AI jobs mean only developer roles, model training, or data science positions. That is only one part of the picture."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            In reality, AI is becoming part of practical business execution. That creates demand for people who can
            write better content, create visuals faster, structure workflows, support communication, produce video
            assets, and improve team productivity using AI tools. These changes expand the future of AI jobs far beyond
            purely technical paths.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Main shifts shaping future AI jobs"
            desc="These changes explain why new job patterns are emerging."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {shifts.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Rocket className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="AI job roles likely to grow"
            desc="The strongest future roles are often execution-focused and workflow-driven."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {roles.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="What skills will matter most"
            desc="The future will reward people who combine fundamentals with AI-assisted execution."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Useful future skills include content structuring, design judgment, prompt clarity, short-form video
            execution, workflow thinking, communication quality, and AI tool literacy. The strongest candidates will
            not be those who only know tool names. They will be the ones who can apply tools inside practical work.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="How beginners should prepare for future AI jobs"
            desc="The best preparation path is practical, focused, and output-based."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Beginners should choose one role direction, learn the tools used in that workflow, build small sample
            projects, improve delivery quality, and gradually expand into broader capability. This approach creates
            stronger long-term readiness than random tool exploration.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes create confusion and slow down career growth."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mistakes.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#071533] md:text-[36px]">
            The strongest long-term position
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest long-term position will belong to people who can combine domain understanding, execution
            quality, AI-assisted speed, and workflow clarity. This is why AI Expert-style capability is likely to
            become more valuable in the future job market.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the wider AI job, skill, and future-work ecosystem."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedLinks.map((item) => (
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
        <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#D8E5F4] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-8 text-center shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-10">
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#071533]">
              Build Future-Ready AI Skills with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they
              can prepare for the future of digital work with real execution capability.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free AI Masterclass
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
