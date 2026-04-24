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
  title: "How to Earn Money With AI in India | Sikhadenge",
  description:
    "Learn how to earn money with AI in India through practical skills, tools, services, workflows, and career paths. Understand how Sikhadenge connects AI learning with freelancing, jobs, and digital earning opportunities.",
  alternates: {
    canonical: "https://sikhadenge.in/how-to-earn-money-with-ai",
  },
  openGraph: {
    title: "How to Earn Money With AI in India | Sikhadenge",
    description:
      "A practical guide to earning money with AI through content, design, video, marketing, workflows, and digital services in India.",
    url: "https://sikhadenge.in/how-to-earn-money-with-ai",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Earn Money With AI in India | Sikhadenge",
    description:
      "Learn practical ways to earn money with AI through skills, tools, workflows, freelancing, and modern digital work.",
  },
};

const starterWays = [
  {
    title: "Freelancing services",
    desc: "AI can help people offer content, design support, video edits, social media assets, scripts, research support, and client delivery services faster.",
    icon: Briefcase,
  },
  {
    title: "Creator-side work",
    desc: "AI can support personal brand content, YouTube workflows, reels production, content systems, and faster digital execution.",
    icon: Sparkles,
  },
  {
    title: "AI-assisted jobs",
    desc: "Many practical job roles now reward people who can use AI inside communication, content, operations, marketing, and creative workflows.",
    icon: BadgeIndianRupee,
  },
];

const earningModels = [
  {
    title: "Content execution",
    desc: "Scripts, captions, ad copy, hooks, briefs, blogs, and communication tasks can become service offerings.",
    icon: PenTool,
  },
  {
    title: "Design support",
    desc: "Posters, thumbnails, social creatives, ad assets, idea boards, and basic visual execution can support paid work.",
    icon: Brush,
  },
  {
    title: "Video workflows",
    desc: "Reels planning, edit support, shot ideas, talking-head structure, and short-form systems can be monetized.",
    icon: Clapperboard,
  },
  {
    title: "Marketing support",
    desc: "Campaign messaging, offer writing, landing page sections, ad support, and growth execution can become client services.",
    icon: LineChart,
  },
  {
    title: "Workflow systems",
    desc: "AI-assisted organization, productivity, internal systems, and repeatable task support can improve delivery value.",
    icon: Cog,
  },
  {
    title: "Multi-skill delivery",
    desc: "The strongest earning paths often come from combining content, visuals, communication, and workflow execution together.",
    icon: Layers3,
  },
];

const audienceCards = [
  {
    title: "Students",
    desc: "Students can use AI to start practical work early through projects, internships, freelancing support, and digital execution.",
    icon: Lightbulb,
  },
  {
    title: "Freelancers",
    desc: "Freelancers can use AI to deliver faster, offer broader services, and improve quality across client work.",
    icon: Briefcase,
  },
  {
    title: "Creators",
    desc: "Creators can use AI for content systems, faster output, stronger planning, and more consistent production.",
    icon: Sparkles,
  },
  {
    title: "Working professionals",
    desc: "Professionals can use AI to build side capabilities, improve execution speed, and create additional earning paths.",
    icon: Users,
  },
];

const relatedCards = [
  {
    href: "/best-ai-skills-to-earn-money",
    title: "Best AI Skills to Earn Money",
    desc: "See which AI skill categories connect most directly with practical earning opportunities.",
  },
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Understand the broader AI skill stack behind modern digital work and execution.",
  },
  {
    href: "/ai-tools",
    title: "AI Tools",
    desc: "Explore the tools that support content, design, video, workflows, and earning systems.",
  },
  {
    href: "/how-to-start-ai-career",
    title: "How to Start AI Career",
    desc: "Connect earning intent with long-term career direction in AI-assisted work.",
  },
  {
    href: "/ai-jobs-without-coding",
    title: "AI Jobs Without Coding",
    desc: "Explore practical AI job paths that do not depend on advanced coding roles.",
  },
  {
    href: "/gen-ai-masterclass/register-one-step",
    title: "Join Free Masterclass",
    desc: "Start with Sikhadenge’s practical AI learning entry point.",
  },
];

const faqs = [
  {
    q: "Can beginners earn money with AI?",
    a: "Yes. Beginners can start earning with AI if they focus on practical output, structured learning, and real service use cases instead of only learning random tools.",
  },
  {
    q: "What is the best way to earn money with AI?",
    a: "For many people, the most practical starting points are freelancing, creator-side work, digital execution, and AI-assisted service delivery.",
  },
  {
    q: "Do I need coding to earn with AI?",
    a: "No. Many useful AI earning paths are based on content, design support, video workflows, marketing execution, pages, communication, and digital systems rather than coding.",
  },
  {
    q: "Which skills help most with AI earning?",
    a: "The strongest skills are usually content, visuals, video, workflow understanding, tools knowledge, and the ability to turn AI support into useful client or business outcomes.",
  },
  {
    q: "Who should start with AI earning skills first?",
    a: "Students, freelancers, creators, beginners, and working professionals who want practical digital capability can all start with AI earning-focused skills.",
  },
  {
    q: "Why is structured learning important here?",
    a: "Because earning usually comes from useful execution. Structured learning helps people build repeatable skills and not depend on scattered tool usage.",
  },
];

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </div>
  );
}

export default function HowToEarnMoneyWithAIPage() {
  return (
    <main className="bg-[#F8FAFC] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-4xl">
          <SectionPill>AI earning guide</SectionPill>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            How to earn money with AI in India
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:max-w-[52rem]">
            Earning money with AI is no longer only about advanced coding or technical roles. In India,
            many practical earning opportunities now come from AI-assisted content, design, video,
            marketing, client work, workflow execution, and digital service delivery. Sikhadenge helps
            learners understand how practical AI skills connect with freelancing, modern jobs, and
            scalable digital earning paths.
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
          {starterWays.map((item) => {
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
            <SectionPill>Why this matters</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              How AI turns into real earning opportunities
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              AI earning grows when people know how to use AI inside real workflows, services,
              projects, content systems, visuals, communication, and client or business execution.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {earningModels.map((item) => {
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

      <section className="bg-[#EEF3F8]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionPill>Who can use this</SectionPill>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
              Who can start earning with AI
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              These opportunities are useful across multiple audiences. The real advantage comes from
              practical execution, structured learning, and better digital capability.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              These pages connect AI earning intent with the broader Sikhadenge topic cluster around
              skills, tools, careers, workflows, and structured learning direction.
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
              These are the common questions learners usually have before starting their AI earning
              journey through freelancing, jobs, creator work, or practical digital services.
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
