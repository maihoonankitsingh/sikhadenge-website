import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Lightbulb, Sparkles, Workflow, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Skills for Freelancers in 2026 | Sikhadenge",
  description:
    "Learn the most important AI skills for freelancers in 2026. Discover which skills help beginners get clients, improve delivery, and grow freelance income using AI tools.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-skills-for-freelancers",
  },
};

const coreSkills = [
  "AI-assisted content writing (captions, scripts, blog drafts, content ideas)",
  "AI design support (thumbnails, creatives, simple brand visuals)",
  "AI video workflows (reels, short-form edits, hook-based content)",
  "Prompt structuring and content clarity skills",
  "Workflow building and repeatable delivery systems",
  "Client communication and output presentation",
];

const skillAreas = [
  "Content creation and communication skills",
  "Visual understanding and basic design thinking",
  "Short-form video execution and editing support",
  "AI tools usage and prompt quality",
  "Workflow and productivity systems",
  "Basic marketing understanding and content positioning",
];

const mistakes = [
  "Learning tools without learning service delivery",
  "Trying to offer too many services at once",
  "Ignoring client needs and focusing only on tools",
  "Not building portfolio before outreach",
];

const growthPath = [
  "Start with one skill and one service",
  "Build 3–5 strong portfolio samples",
  "Get first small clients or practice projects",
  "Improve workflow speed and quality",
  "Expand into multi-skill AI Expert direction",
];

const relatedLinks = [
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-tools-for-freelancers", label: "AI Tools for Freelancers" },
  { href: "/ai-freelancing-guide-for-beginners", label: "AI Freelancing Guide" },
  { href: "/how-to-earn-money-using-ai", label: "How to Earn Money Using AI" },
  { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
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
          <Pill>Freelancer Skills</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] md:text-[58px] font-semibold tracking-[-0.04em] leading-[1.04]">
              AI Skills for Freelancers in 2026
            </h1>

            <p className="mt-6 text-[18px] md:text-[20px] text-[#47607F] max-w-3xl leading-[1.8]">
              AI is changing freelancing by making work faster and more scalable. The freelancers who succeed are not
              the ones who just know tools, but the ones who can deliver clear results using AI-assisted workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/gen-ai-masterclass" className="bg-[#2563EB] text-white px-6 py-3 rounded-full text-sm font-semibold">
                Join Free Masterclass
              </Link>
              <Link href="/ai-freelancing-guide-for-beginners" className="border px-6 py-3 rounded-full text-sm font-semibold">
                Freelancing Guide
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { icon: Rocket, title: "Faster growth", desc: "AI helps freelancers deliver faster and handle more work." },
              { icon: Workflow, title: "Workflow advantage", desc: "Structured workflows create consistent output." },
              { icon: Briefcase, title: "Client demand", desc: "Businesses need freelancers who can use AI effectively." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border p-6 rounded-2xl">
                  <Icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-4 py-14">
        <SectionTitle title="Core AI skills for freelancers" />

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {coreSkills.map((item) => (
            <div key={item} className="border p-6 rounded-xl bg-white">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <p className="mt-2">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="max-w-[1080px] mx-auto px-4 py-14">
          <SectionTitle title="Important skill areas" />

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {skillAreas.map((item) => (
              <div key={item} className="border p-6 rounded-xl">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <p className="mt-2">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-4 py-14">
        <SectionTitle title="Growth path for freelancers" />

        <div className="mt-10 grid md:grid-cols-5 gap-6">
          {growthPath.map((item, i) => (
            <div key={item} className="border p-6 rounded-xl">
              <div className="text-blue-600 text-sm font-semibold">Step {i + 1}</div>
              <p className="mt-2">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y">
        <div className="max-w-[1080px] mx-auto px-4 py-14">
          <SectionTitle title="Mistakes to avoid" />

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {mistakes.map((item) => (
              <div key={item} className="border p-6 rounded-xl">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1080px] mx-auto px-4 py-14">
        <SectionTitle title="Explore connected AI pages" />

        <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {relatedLinks.map((item) => (
            <Link key={item.href} href={item.href} className="border p-4 rounded-xl flex justify-between">
              {item.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center py-16 border-t bg-white">
        <h2 className="text-2xl font-semibold">Learn Freelancing with AI</h2>
        <p className="mt-4 text-[#47607F]">
          Build real skills, portfolio, and freelance-ready workflows with Sikhadenge.
        </p>
        <Link href="/gen-ai-masterclass" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full">
          Join Free Masterclass
        </Link>
      </section>

    </main>
  );
}
