import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Sparkles, Target, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Start Freelancing with AI in 2026 | Sikhadenge",
  description:
    "Learn how to start freelancing with AI in 2026. Discover practical AI freelance services, tools, workflow steps, portfolio strategy, and how beginners can get clients.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/how-to-start-freelancing-with-ai",
  },
};

const services = [
  "AI content writing for captions, scripts, blogs, product copy, and marketing drafts",
  "AI design support for thumbnails, social media posts, ad creatives, and visual concepts",
  "AI video support for reels, shorts, hook-based editing, and content repurposing",
  "AI research and productivity support for founders, creators, and small business teams",
  "AI workflow setup for content planning, idea generation, and repeatable execution systems",
  "AI Expert support across content, visuals, video, and light business execution tasks",
];

const steps = [
  "Choose one freelance service you can deliver repeatedly",
  "Learn the main AI tools used in that workflow",
  "Create 3 to 5 portfolio-style sample projects",
  "Define a simple offer and target client type",
  "Start outreach and improve delivery through real work",
];

const mistakes = [
  "Trying to offer too many services from day one",
  "Learning tools without building one clear delivery workflow",
  "Starting outreach without samples or proof of work",
  "Relying on raw AI output without editing and refinement",
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
  { href: "/ai-tools-for-freelancers", label: "AI Tools for Freelancers" },
  { href: "/ai-freelance-workflows", label: "AI Freelance Workflows" },
  { href: "/how-to-earn-money-using-ai", label: "How to Earn Money Using AI" },
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
          <Pill>AI Freelancing Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              How to Start Freelancing with AI in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              Freelancing with AI is becoming one of the easiest ways for beginners to enter digital work.
              The reason is simple. Businesses already need content, visuals, short-form videos, marketing
              support, and execution help. AI tools reduce the effort needed to deliver these services, but
              earning still depends on skill, workflow, and consistency.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills-for-freelancers"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore Freelance AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Service-based income",
                desc: "AI freelancing works best when it is attached to a real service clients already pay for.",
              },
              {
                icon: Workflow,
                title: "Workflow advantage",
                desc: "The real power of AI comes from using tools inside a repeatable delivery process.",
              },
              {
                icon: Target,
                title: "Beginner-friendly entry",
                desc: "A focused AI service can help beginners start small and build confidence through execution.",
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
            title="Why freelancing with AI is growing fast"
            desc="Freelancing is growing because businesses need quick digital execution and many do not want full-time hires for every task. They need freelancers who can deliver faster, communicate clearly, and create useful outputs."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            AI makes this easier by helping with ideation, drafts, visual support, video acceleration, and workflow
            organization. But AI does not remove the need for judgment. The freelancer still has to understand the
            client, structure the task, refine the output, and deliver professional work.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best freelance services to start with AI"
            desc="The easiest way to start is not to become an expert in every tool. It is to choose one useful service."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((item) => (
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
            title="Which service is best for beginners"
            desc="Beginners usually do best when they choose a simple service with visible output and clear demand."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Good beginner options include caption writing, short-form content support, basic thumbnail work, simple
            AI-assisted social creatives, and reel editing support. These are easier to practice, easier to show in
            a portfolio, and easier to sell to small clients.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Step-by-step path to start freelancing with AI"
            desc="Use a simple progression focused on one service, one workflow, and visible proof of work."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => (
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
            title="How to get first freelance clients"
            desc="Most beginners overthink client acquisition. Start with simple offers and direct proof."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Your first clients do not come because you know AI terms. They come because you can show what you can
            deliver. A small sample pack, a few mock projects, or before-after examples can be enough to start.
            You can then reach out to small creators, coaches, local businesses, or founders who already need content
            and digital support.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes slow down most beginners who want to freelance with AI."
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
            What makes AI freelancing work long term
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Long-term success comes from quality, communication, and repeatable delivery. AI can improve speed, but
            clients stay when the freelancer understands outcomes, edits carefully, solves business problems, and
            creates a workflow that saves time consistently.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the larger AI freelancing and earning system."
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
              Learn AI Freelancing with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they
              can move from scattered learning to client-ready execution.
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
