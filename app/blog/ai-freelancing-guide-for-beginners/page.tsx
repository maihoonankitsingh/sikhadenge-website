import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Rocket, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Freelancing Guide for Beginners in 2026 | Sikhadenge",
  description:
    "Complete AI freelancing guide for beginners in 2026. Learn how to choose services, build samples, use AI tools, get clients, and start earning through practical digital work.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-freelancing-guide-for-beginners",
  },
};

const foundations = [
  "AI freelancing works best when linked to a real service, not random tool usage",
  "Beginners should focus on one clear workflow like content, design, or video support",
  "Clients care about deliverables, speed, and clarity more than AI terminology",
  "A few strong sample projects matter more than learning too many tools",
  "Freelancing grows faster when your process is repeatable and easy to explain",
  "AI can increase speed, but quality and judgment still decide long-term growth",
];

const beginnerServices = [
  "AI-assisted content writing for captions, short scripts, blog drafts, and brand content",
  "AI design support for social media creatives, thumbnails, and basic ad assets",
  "AI video support for reels, shorts, content repurposing, and hook-based edits",
  "AI productivity and research support for founders, coaches, and creators",
  "AI marketing support for offers, ad messaging, content planning, and lightweight execution",
  "AI Expert-style freelance support across multiple small digital tasks",
];

const steps = [
  "Choose one freelance direction and define one beginner-friendly service",
  "Learn the main tools used in that service workflow",
  "Create 3 to 5 proof-of-work samples",
  "Package your offer in simple language",
  "Start outreach to small businesses, creators, or founders",
];

const mistakes = [
  "Trying to sell everything instead of one clear service",
  "Learning tools without learning delivery structure",
  "Starting outreach before making portfolio samples",
  "Using AI output directly without editing and refinement",
];

const relatedLinks = [
  { href: "/ai-skills-for-freelancers", label: "AI Skills for Freelancers" },
  { href: "/how-to-start-freelancing-with-ai", label: "How to Start Freelancing with AI" },
  { href: "/how-to-earn-money-using-ai", label: "How to Earn Money Using AI" },
  { href: "/ai-tools-for-freelancers", label: "AI Tools for Freelancers" },
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
          <Pill>AI Freelancing Guide</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              AI Freelancing Guide for Beginners in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              AI freelancing is becoming one of the most practical ways for beginners to enter digital work. You do
              not need to start with advanced coding. What you need is one useful service, a small set of strong AI
              tools, proof of work, and a repeatable workflow that helps clients save time or improve output.
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
                title: "Client-first direction",
                desc: "Freelancing works when AI is attached to a service clients already understand and pay for.",
              },
              {
                icon: Workflow,
                title: "Workflow advantage",
                desc: "The strongest freelancers use AI inside repeatable systems rather than one-off scattered tasks.",
              },
              {
                icon: Rocket,
                title: "Beginner speed",
                desc: "With focused practice and good samples, beginners can become client-ready much faster.",
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
            title="What AI freelancing actually means"
            desc="AI freelancing does not mean selling AI as a buzzword. It means delivering useful client work faster and more efficiently with AI-assisted workflows."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            A freelancer may use AI for captions, scripts, content outlines, design references, short-form video
            planning, visual drafts, or internal workflow support. The tool itself is not the service. The service is
            the result the client gets.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Core foundations of AI freelancing"
            desc="These principles help beginners avoid confusion and build in the right direction."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {foundations.map((item) => (
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
            title="Best AI freelance services for beginners"
            desc="The easiest path is to start with one service that has visible output and clear demand."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {beginnerServices.map((item) => (
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
            title="How beginners should start"
            desc="Do not overcomplicate the process. Keep the first version simple and execution-focused."
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
            title="How to package your first offer"
            desc="Your first offer should be easy to understand and easy to deliver."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Instead of saying you provide AI services, say exactly what result you deliver. For example: 12 Instagram
            captions per month, 10 short-form content ideas, 6 thumbnails, or 8 basic social creatives. Clients buy
            clarity faster than complexity.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes to avoid"
            desc="These mistakes slow down most beginners who want freelance income from AI skills."
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
            What makes beginners grow into serious freelancers
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Serious growth comes from delivery quality, client understanding, workflow clarity, and consistency.
            AI can improve speed and output volume, but the real business advantage comes from structured execution and
            reliable results.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the wider AI freelancing, skills, and earning system."
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
              can move from scattered tool usage to structured freelance-ready execution.
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
