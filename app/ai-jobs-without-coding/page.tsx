import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  ChevronDown,
  PenTool,
  Video,
  Megaphone,
  Layers3,
  Wand2,
  Bot,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Jobs Without Coding in India | Sikhadenge",
  description:
    "Discover AI jobs in India that do not require coding. Learn practical AI career options in content, design, video, marketing, and digital workflows for beginners, students, freelancers, and working professionals.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-jobs-without-coding",
  },
  openGraph: {
    title: "AI Jobs Without Coding in India | Sikhadenge",
    description:
      "Discover AI jobs in India that do not require coding. Learn practical AI career options in content, design, video, marketing, and digital workflows for beginners, students, freelancers, and working professionals.",
    url: "https://sikhadenge.in/ai-jobs-without-coding",
    images: [
      {
        url: "https://sikhadenge.in/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sikhadenge Masterclass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Jobs Without Coding in India | Sikhadenge",
    description:
      "Discover AI jobs in India that do not require coding. Learn practical AI career options in content, design, video, marketing, and digital workflows for beginners, students, freelancers, and working professionals.",
    images: ["https://sikhadenge.in/twitter-image"],
  },
};

const jobCards = [
  {
    icon: PenTool,
    title: "AI Content Creator",
    desc: "Create social posts, scripts, blogs, captions, and digital assets with AI-assisted workflows.",
  },
  {
    icon: Sparkles,
    title: "AI Copywriter",
    desc: "Write landing page copy, ad copy, email sequences, hooks, and content drafts faster.",
  },
  {
    icon: Layers3,
    title: "AI Graphic Designer",
    desc: "Use AI tools for concept generation, layouts, banners, creatives, and design support work.",
  },
  {
    icon: Video,
    title: "AI Video Editor",
    desc: "Edit shorts, reels, talking videos, motion assets, and AI-enhanced video content.",
  },
  {
    icon: Megaphone,
    title: "AI Marketing Specialist",
    desc: "Use AI for campaign research, content planning, creative production, and workflow speed.",
  },
  {
    icon: Briefcase,
    title: "AI Freelancer",
    desc: "Package practical AI services into client work across content, design, marketing, and digital execution.",
  },
];

const skillCards = [
  "AI tools understanding",
  "Prompt writing",
  "Content and design basics",
  "Workflow thinking",
  "Execution quality",
  "Project presentation",
];

const startSteps = [
  "Understand practical AI basics and where no-code roles actually exist.",
  "Pick tools based on content, design, video, marketing, or workflow direction.",
  "Practice repeatable workflows instead of random prompts only.",
  "Build small portfolio-style outputs and showcase them properly.",
  "Use your work for freelancing, job applications, internships, or service offers.",
];

const faqs = [
  {
    q: "Can I get AI jobs without coding in India?",
    a: "Yes. Many practical AI roles are based on content, design, video, marketing, operations, and workflow execution instead of software development.",
  },
  {
    q: "Which AI jobs are best for beginners without coding?",
    a: "Beginners usually start with AI content, AI design support, AI video editing, AI marketing support, and AI-assisted freelance work.",
  },
  {
    q: "Do I need a technical background to start?",
    a: "No. Basic digital comfort, practical learning, good execution, and tool understanding are often more important for these roles than coding knowledge.",
  },
  {
    q: "How should I prepare for AI jobs without coding?",
    a: "Learn the right tools, practice real workflows, build sample projects, and show your work in a structured portfolio or proof-of-skill format.",
  },
  {
    q: "Can freelancers use these AI skills to earn?",
    a: "Yes. Freelancers can use no-code AI workflows to offer faster content, design, video, and marketing execution to clients.",
  },
  {
    q: "Does Sikhadenge teach practical AI workflows for non-coders?",
    a: "Yes. Sikhadenge focuses on practical learning, tool usage, workflow clarity, and real-world execution so learners can build job-ready and freelance-ready capability.",
  },
];

const connectedPages = [
  { href: "/ai-expert", label: "AI Expert" },
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/how-to-start-ai-career", label: "How to Start AI Career" },
  { href: "/ai-career-paths", label: "AI Career Paths" },
  { href: "/future-of-ai-skills", label: "Future of AI Skills" },
  { href: "/ai-skills-for-job-seekers", label: "AI Skills for Job Seekers" },
  { href: "/ai-course-roadmap", label: "AI Course Roadmap" },
];

export default function AIJobsWithoutCodingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden border-b border-slate-100 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />
        <div className="mx-auto max-w-7xl">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-sm">
              Premium Career Guide
            </div>

            <h1 className="mb-6 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.5rem]">
              AI jobs without coding
            </h1>

            <p className="mb-8 max-w-4xl text-base font-medium leading-8 text-slate-600 sm:text-xl">
              Many people think AI careers require coding, but most practical AI jobs today are based on execution,
              tools, workflows, and digital output. You can start an AI career without coding by learning the right
              skills, systems, and project-based workflows.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                No-code AI path
              </div>
              <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Beginner-friendly roles
              </div>
              <div className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Jobs and freelance ready
              </div>
            </div>

            <div className="mb-16 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_14px_40px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-1 hover:bg-blue-700 sm:text-lg"
              >
                Join Free Masterclass
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-slate-50 sm:text-lg"
              >
                Explore AI Skills
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Bot,
                  title: "No-code opportunity",
                  desc: "Many practical AI roles now depend more on tools, workflow thinking, and execution than software development.",
                },
                {
                  icon: TrendingUp,
                  title: "Growing market demand",
                  desc: "Businesses want faster content, design, video, and workflow support using modern AI systems.",
                },
                {
                  icon: Target,
                  title: "Practical earning path",
                  desc: "Learners can use these skills for jobs, freelancing, internships, service delivery, and digital work.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_16px_40px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-[0_10px_24px_rgba(37,99,235,0.10)]">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF4FF_100%)] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 max-w-4xl text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Can you really get AI jobs without coding?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Most AI tools today are no-code or low-code",
              "Businesses need execution, not just development",
              "Content, design, video, and marketing roles are growing fast",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5"
              >
                <p className="text-lg font-semibold leading-8 text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Best AI jobs without coding
            </h2>
            <p className="mb-12 text-base leading-8 text-slate-600 sm:text-lg">
              These are practical role directions where learners can work with AI systems without depending on deep coding skills.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobCards.map((job, i) => (
              <div
                key={i}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <job.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{job.title}</h3>
                <p className="text-slate-600">{job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Skills required for AI jobs
            </h2>
            <p className="mb-12 text-base leading-8 text-slate-600 sm:text-lg">
              Strong no-code AI roles usually come from practical execution, tool familiarity, and better workflow quality.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
            {skillCards.map((skill, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="mb-5 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              How to start
            </h2>
            <p className="mb-12 text-base leading-8 text-slate-600 sm:text-lg">
              Use a simple roadmap so your learning moves toward real projects, visible skills, and better career outcomes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-5">
            {startSteps.map((step, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  {i + 1}
                </div>
                <p className="text-sm font-medium leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Explore connected AI pages
          </h2>
          <p className="mb-10 text-slate-600">
            Build stronger depth by moving into connected AI skill, career, course, and workflow pages.
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {connectedPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:border-blue-300 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">
                      Related Path
                    </div>
                    <h3 className="text-lg font-bold leading-7 text-slate-900 transition group-hover:text-blue-700">
                      {item.label}
                    </h3>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-blue-600 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-14 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Frequently asked questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] transition-all duration-200 open:bg-white open:ring-2 open:ring-blue-100 shadow-[0_10px_26px_rgba(15,23,42,0.04)]"
              >
                <summary className="flex list-none cursor-pointer items-center justify-between px-6 py-6 text-base font-bold text-slate-900 sm:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180 group-open:text-blue-600" />
                </summary>
                <div className="px-6 pb-6 pt-2 text-sm leading-7 text-slate-600 sm:text-base">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[#07152E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.18),rgba(15,23,42,0.9))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-sm">
              Final Next Step
            </div>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Start your AI career in India without coding
            </h2>
            <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
              Build real skill depth through structured learning, practical tools, guided workflows, and output-based execution.
              Start with the free masterclass, then move toward stronger projects, freelance-ready capability, and job-focused growth.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gen-ai-masterclass/register-one-step"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:text-base"
              >
                Join Free AI Masterclass
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
              >
                Explore AI Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
