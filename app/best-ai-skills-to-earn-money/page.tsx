import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  Briefcase,
  Brush,
  Clapperboard,
  Cog,
  Layers3,
  Lightbulb,
  LineChart,
  PenTool,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills to Earn Money in India | Sikhadenge",
  description:
    "Explore the best AI skills to earn money in India across content, design, video, marketing, workflows, freelancing, and modern digital work. Learn how Sikhadenge connects practical AI skills with real earning opportunities.",
  alternates: {
    canonical: "https://sikhadenge.in/best-ai-skills-to-earn-money",
  },
  openGraph: {
    title: "Best AI Skills to Earn Money in India | Sikhadenge",
    description:
      "A practical guide to the best AI skills for earning money through freelancing, jobs, creator work, and digital services in India.",
    url: "https://sikhadenge.in/best-ai-skills-to-earn-money",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills to Earn Money in India | Sikhadenge",
    description:
      "Learn which AI skills help people earn money through content, design, video, marketing, workflows, and digital execution.",
  },
};

const heroCards = [
  {
    title: "Content execution",
    desc: "Useful for scripts, captions, briefs, writing support, content systems, and client-facing communication work.",
    icon: PenTool,
  },
  {
    title: "Design support",
    desc: "Useful for thumbnails, posters, visual concepts, ad creatives, social graphics, and practical digital assets.",
    icon: Brush,
  },
  {
    title: "Video workflows",
    desc: "Useful for reels, short-form ideas, edit support, structure planning, and creator-side production systems.",
    icon: Clapperboard,
  },
];

const whyCards = [
  {
    title: "Practical output earns",
    desc: "Income usually comes from useful execution, not random tool knowledge.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Manual work is slower",
    desc: "AI-assisted skills improve speed, consistency, and delivery support.",
    icon: Cog,
  },
  {
    title: "Market demand is shifting",
    desc: "Modern jobs, freelancing, and creator work now reward AI-assisted execution.",
    icon: LineChart,
  },
  {
    title: "Skill depth matters",
    desc: "The strongest earning paths come from combining multiple connected capabilities.",
    icon: Layers3,
  },
];

const mainSkills = [
  {
    title: "AI Content Skills",
    desc: "Writing support, captioning, content planning, briefs, hooks, scripts, and communication tasks.",
    icon: PenTool,
  },
  {
    title: "AI Design Skills",
    desc: "Creative direction, social creatives, thumbnails, ad assets, visual layouts, and digital brand support.",
    icon: Brush,
  },
  {
    title: "AI Video Skills",
    desc: "Reels planning, edit support, short-form workflows, script-to-video direction, and production clarity.",
    icon: Clapperboard,
  },
  {
    title: "AI Marketing Skills",
    desc: "Campaign messaging, offer communication, creative support, growth execution, and audience-facing assets.",
    icon: LineChart,
  },
  {
    title: "AI Workflow Skills",
    desc: "Task systems, repeatable execution, operational support, productivity improvement, and better delivery speed.",
    icon: Cog,
  },
  {
    title: "AI Client Delivery Skills",
    desc: "Practical service capability for freelancers, creators, operators, and project-based digital work.",
    icon: Briefcase,
  },
];

const audienceCards = [
  {
    title: "Students",
    desc: "Students can build AI-assisted practical skills early for internships, projects, freelancing, and stronger career readiness.",
    icon: Lightbulb,
  },
  {
    title: "Freelancers",
    desc: "Freelancers can use these skills to improve delivery quality, broaden service scope, and increase earning potential.",
    icon: Briefcase,
  },
  {
    title: "Creators",
    desc: "Creators can use AI skills for faster content systems, better production support, and stronger digital output.",
    icon: Sparkles,
  },
  {
    title: "Working professionals",
    desc: "Professionals can improve execution speed, output quality, workflow efficiency, and modern digital relevance.",
    icon: Users,
  },
];

const relatedCards = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill categories that support modern digital work.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "See which AI tools connect with these earning-focused skills and workflows.",
  },
  {
    href: "/how-to-start-ai-career",
    title: "How to Start AI Career",
    desc: "Explore how AI skills connect with long-term career direction in India.",
  },
  {
    href: "/ai-jobs-without-coding",
    title: "AI Jobs Without Coding",
    desc: "Understand practical AI job paths that do not depend on traditional coding roles.",
  },
  {
    href: "/gen-ai-masterclass/register-one-step",
    title: "Join Free Masterclass",
    desc: "Start with Sikhadenge’s practical AI learning entry point.",
  },
  {
    href: "/courses/ai-mastery",
    title: "Explore AI Learning Path",
    desc: "See the structured learning direction behind practical AI capability building.",
  },
];

const faqs = [
  {
    q: "Which AI skills are best for earning money?",
    a: "The strongest earning-focused AI skills are usually the ones linked with practical output such as content, visuals, video, marketing support, workflows, and client delivery execution.",
  },
  {
    q: "Can beginners learn these skills?",
    a: "Yes. Beginners can start with structured skill-building and practical use cases instead of trying to learn everything at once.",
  },
  {
    q: "Do AI skills help in freelancing?",
    a: "Yes. AI skills can improve service scope, client delivery speed, communication support, and broader execution capability in freelancing.",
  },
  {
    q: "Do these skills require coding?",
    a: "Not always. Many earning-focused AI skills are tied to no-code or low-code execution in content, design, video, marketing, and workflow systems.",
  },
  {
    q: "Why are these skills better than learning random AI tools?",
    a: "Because earning usually comes from useful execution. Skills help you use AI inside real workflows, while random tools alone rarely create consistent value.",
  },
  {
    q: "Who should start with these skills first?",
    a: "Students, freelancers, creators, beginners, and working professionals who want practical digital capability can all start with these skills.",
  },
];

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </div>
  );
}

export default function BestAISkillsToEarnMoneyPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-4xl">
          <SectionPill>AI skills for earning</SectionPill>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Best AI skills to earn money in India
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:max-w-[52rem]">
            The best AI skills to earn money are not random tool tricks. They are
            practical skills that help people create useful output, support real
            work, and contribute to freelancing, jobs, creator systems, business
            execution, and digital services. Sikhadenge helps learners connect AI
            skills with modern earning opportunities through structured, practical
            learning.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/gen-ai-masterclass/register-one-step"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Join Free Masterclass
            </Link>
            <Link
              href="/courses/ai-mastery"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore AI Path
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {heroCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>Why it matters</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Why AI skills matter for earning
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              AI earning does not grow from knowing tool names only. It grows when
              people know how to use AI in workflows, services, projects, content
              systems, visuals, communication, and practical client or business
              execution.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whyCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.03)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#EEF3F8]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>Skill categories</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Main AI skill categories for earning
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The strongest earning systems usually combine multiple AI skill areas
              instead of depending on only one narrow capability.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mainSkills.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] bg-[#0B2F73] p-7 text-white shadow-[0_24px_70px_rgba(11,47,115,0.24)]"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-blue-100">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>Use cases</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Who can use these skills effectively
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              These skills are useful across multiple audiences. Their value depends
              on how well they are applied inside real digital work and structured
              execution systems.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {audienceCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-slate-200 bg-slate-50 p-7"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>Related learning paths</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Explore connected AI learning pages
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              These pages connect earning-focused AI skills with the broader
              Sikhadenge topic cluster around tools, careers, workflows, and
              structured learning direction.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[30px] border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <ArrowRight className="h-5 w-5 text-blue-600 transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>FAQs</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              These are the common questions learners usually have before choosing
              which AI skills are most useful for earning, freelancing, jobs, and
              practical digital growth.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[26px] border border-slate-200 bg-slate-50 px-6 py-5 shadow-[0_4px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900">
                  <span>{item.q}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-4 pr-8 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
