import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Jobs for Students | Sikhadenge",
  description:
    "Explore practical AI jobs for students, understand beginner-friendly roles, useful skills, tools, and how students can start building real opportunities with AI.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/ai-jobs-for-students",
  },
  openGraph: {
    title: "AI Jobs for Students | Sikhadenge",
    description:
      "A practical guide to AI jobs for students, including beginner-friendly work types, skills, tools, and starting points.",
    url: "https://sikhadenge.in/blog/ai-jobs-for-students",
    siteName: "Sikhadenge",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Jobs for Students | Sikhadenge",
    description:
      "A practical guide to AI jobs for students, including beginner-friendly work types, skills, tools, and starting points.",
  },
};

const jobTypes = [
  {
    title: "Create Content with AI Support",
    desc: "Students can help with captions, post ideas, blog support, basic scripts, summaries, and content research using AI-assisted workflows.",
  },
  {
    title: "Design with AI Support",
    desc: "Students interested in creative work can support thumbnail ideas, social media design drafts, presentation visuals, and ad concept direction.",
  },
  {
    title: "Edit Videos with AI Support",
    desc: "Short-form video ideas, captioning, clip repurposing, rough planning, and editing assistance are practical entry points for students.",
  },
  {
    title: "AI Research and Productivity Support",
    desc: "Research support, note simplification, document summarization, and structured workflow assistance can become useful student-level services.",
  },
];

const skillAreas = [
  "Prompt clarity and task structuring",
  "Basic content writing and editing",
  "Visual ideation and creative judgment",
  "Short-form content workflow understanding",
  "Research, summarization, and information clarity",
  "Professional communication and delivery discipline",
];

const tools = [
  "ChatGPT",
  "Gemini",
  "Canva",
  "Notion AI",
  "AI presentation and writing tools",
  "Basic video and content workflow tools",
];

const faqs = [
  {
    q: "Can students really get AI jobs without deep technical knowledge?",
    a: "Yes. Many early opportunities are not advanced engineering roles. Students can begin with AI-assisted content, design support, video workflows, research support, and digital productivity tasks.",
  },
  {
    q: "Do students need coding to start AI-related work?",
    a: "Not always. Many beginner-friendly AI opportunities are workflow-based and execution-based rather than coding-based. Strong communication, structured thinking, and practical tool usage matter a lot.",
  },
  {
    q: "Which students can benefit from AI job opportunities?",
    a: "College students, school students exploring digital skills, creators, freelancers, and beginners interested in modern work can all benefit from learning practical AI-supported execution skills.",
  },
  {
    q: "What is the best first step for students?",
    a: "The best first step is to pick one use case such as content, design, video, or research support and then build repeatable skill through small projects and structured learning.",
  },
];

export default function AIJobsForStudentsPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#93C5FD]">
            Student AI Career Guide
          </p>

          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
            AI Jobs for Students
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#B0B7C3] md:text-lg">
            AI is creating practical opportunities for students who want to work on
            modern digital tasks without waiting years to become experts. The most
            useful student-level AI jobs are usually not about advanced machine learning.
            They are about helping with content, design, video, research, workflow
            support, and structured execution using AI tools properly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#B0B7C3]">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Beginner-friendly
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Non-coding possible
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Student-focused
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            What AI jobs can students actually do?
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#B0B7C3]">
            Students usually start with practical execution roles. These roles become
            valuable when the student can use AI to save time, organize work better,
            improve output quality, and support real tasks consistently.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {jobTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#B0B7C3]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Skills students should build first
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#B0B7C3]">
            Students do not need to learn everything at once. It is better to build a
            small, practical stack that improves execution quality in one or two useful
            areas first.
          </p>

          <ul className="mt-6 grid gap-3 text-[#B0B7C3] md:grid-cols-2">
            {skillAreas.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Useful AI tools for students
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#B0B7C3]">
            Tools matter, but only when connected to practical work. Students should
            focus on tools that support writing, ideation, design assistance, research,
            and productivity.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-2 text-sm text-[#BFDBFE]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Why AI jobs are relevant for students
          </h2>
          <p className="mt-4 leading-7 text-[#B0B7C3]">
            Students are entering a job market where execution speed, adaptability,
            digital clarity, and multi-skill capability matter more than before. AI can
            help students become more useful in real projects much earlier if they
            learn structured workflows instead of only consuming random tool tips.
          </p>
          <p className="mt-4 leading-7 text-[#B0B7C3]">
            A student who can help with content, visuals, simple workflows, short-form
            video support, and AI-assisted task execution can become relevant for
            freelancers, creators, startups, education businesses, and small teams.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5"
              >
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-[#B0B7C3]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Related pages
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/ai-skills-for-students",
                title: "AI Skills for Students",
                desc: "Student-focused AI skills that improve practical relevance.",
              },
              {
                href: "/ai-jobs-without-coding",
                title: "AI Jobs Without Coding",
                desc: "Useful for students looking for non-technical entry points.",
              },
              {
                href: "/ai-tools-for-students",
                title: "AI Tools for Students",
                desc: "Tool stack ideas for study, productivity, and practical work.",
              },
              {
                href: "/blog/how-to-use-ai-for-studies",
                title: "How to Use AI for Studies",
                desc: "Ways students can apply AI in learning and study workflows.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-[#2563EB]/50"
              >
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
          <section className="border-t border-white/10 bg-[#08101d]">
        <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            More student AI career pages
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#B0B7C3]">
            These related pages help students understand different entry points, beginner-friendly AI job paths, and practical ways to build useful digital skills with AI.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/blog/ai-jobs-for-students",
                title: "AI Jobs for Students",
                desc: "Main guide to practical AI jobs students can explore.",
              },
              {
                href: "/blog/ai-jobs-for-school-students",
                title: "AI Jobs for School Students",
                desc: "Early-stage AI job ideas and student-friendly digital work paths.",
              },
              {
                href: "/blog/ai-jobs-for-students-without-experience",
                title: "AI Jobs for Students Without Experience",
                desc: "Entry-level AI-related work options for beginners.",
              },
              {
                href: "/blog/best-ai-jobs-for-students",
                title: "Best AI Jobs for Students",
                desc: "High-potential student AI job categories and directions.",
              },
              {
                href: "/blog/how-students-can-start-ai-jobs",
                title: "How Students Can Start AI Jobs",
                desc: "Step-by-step path to start practical AI-supported work.",
              },
              {
                href: "/ai-skills-for-students",
                title: "AI Skills for Students",
                desc: "Core AI skills students should build first.",
              },
              {
                href: "/ai-tools-for-students",
                title: "AI Tools for Students",
                desc: "Useful AI tools for learning, productivity, and execution.",
              },
              {
                href: "/ai-jobs-without-coding",
                title: "AI Jobs Without Coding",
                desc: "Non-coding AI job paths relevant for many beginners.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-[#2563EB]/50"
              >
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
