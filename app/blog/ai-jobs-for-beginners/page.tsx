import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Rocket, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Jobs for Beginners in 2026 | Sikhadenge",
  description:
    "Explore the best AI jobs for beginners in 2026. Learn which entry-level AI roles are practical without coding and how to build skills for content, design, video, and digital execution work.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-jobs-for-beginners",
  },
};

const jobRoles = [
  "AI content assistant for captions, scripts, basic copy, and content support",
  "AI design support role for social media creatives, thumbnails, and concept work",
  "AI video support role for reels, shorts, hooks, and editing assistance",
  "AI research and productivity support for creators, founders, and small teams",
  "AI marketing support role for ad assets, messaging drafts, and workflow execution",
  "AI Expert beginner role across content, visuals, video, and digital support tasks",
];

const starterSteps = [
  "Understand one practical AI role instead of chasing every trend",
  "Learn the core tools used in that role",
  "Build small project samples",
  "Create a beginner portfolio",
  "Apply for internships, freelance work, or entry-level projects",
];

const mistakes = [
  "Thinking AI jobs always require advanced coding",
  "Learning tools without linking them to a real job role",
  "Ignoring communication, output quality, and delivery skill",
  "Waiting too long before creating practical sample work",
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
  { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
  { href: "/ai-career-paths", label: "AI Career Paths" },
  { href: "/ai-skills-for-job-seekers", label: "AI Skills for Job Seekers" },
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
          <Pill>Beginner AI Jobs Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              AI Jobs for Beginners in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Many beginners want to enter AI-related work, but they often assume every opportunity requires coding,
              engineering, or advanced technical background. In reality, many beginner-friendly AI jobs are connected
              to content, design, video, communication, research, and digital execution. The entry point is often not
              technical depth first. It is practical capability first.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-jobs-without-coding"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Entry-level potential",
                desc: "Many beginner AI jobs are linked to execution support rather than advanced engineering work.",
              },
              {
                icon: Workflow,
                title: "Workflow-driven roles",
                desc: "The strongest beginner roles usually involve using AI inside clear content, design, video, or research workflows.",
              },
              {
                icon: Rocket,
                title: "Fast learning curve",
                desc: "With focused practice and samples, beginners can become job-ready much faster than in older digital paths.",
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
            title="Why beginner AI jobs are increasing"
            desc="Businesses, creators, and digital teams need faster execution across many tasks. AI makes this possible by reducing manual effort in ideation, drafts, organization, visual support, and content systems."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Because of this shift, companies increasingly value people who can use AI tools inside practical workflows.
            These beginner opportunities may not always carry the title of AI specialist, but the work itself is already
            AI-assisted and skill-linked.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best AI jobs for beginners"
            desc="These are the most practical role directions for people starting from zero or near-zero."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {jobRoles.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
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
            title="Do beginners need coding for these jobs"
            desc="In many cases, no. The important thing is not coding first. It is practical delivery first."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Many beginner AI jobs are based on using tools for content, communication, research, visuals, short-form
            media, and workflow organization. Coding can become useful later for some specialized paths, but it is not
            the first requirement for many real entry-level opportunities.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="How beginners should prepare for AI jobs"
            desc="The best preparation path is simple, practical, and output-based."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {starterSteps.map((step, i) => (
              <div
                key={step}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="text-sm font-semibold text-[#2563EB]">Step {i + 1}</div>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#071533]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="What makes a beginner stand out"
            desc="Beginners get noticed when they show practical output instead of only saying they know tools."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A small portfolio with captions, content samples, visual assets, reel concepts, or workflow examples often
            matters more than tool lists. Employers and clients want proof that you can contribute inside real work, not
            just theoretical awareness.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes slow down most beginners trying to enter AI-related work."
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
            The strongest beginner path
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest path is to build one clear role direction, learn the workflow, create proof of work, and
            improve delivery quality through actual execution. This is what turns beginner curiosity into job-ready
            capability.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the wider beginner AI learning and career ecosystem."
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
              Start Building AI Skills with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they
              can move from confusion to clear digital capability and entry-level readiness.
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
