import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Lightbulb, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Tools for Students in 2026 | Sikhadenge",
  description:
    "Discover the best AI tools for students in 2026. Learn which AI tools help with study, notes, research, writing, presentations, projects, and digital skill development.",
  alternates: {
    canonical: "https://sikhadenge.in/blog/best-ai-tools-for-students",
  },
};

const tools = [
  "ChatGPT for explanations, idea support, summaries, and study help",
  "Gemini for research, topic understanding, and structured information support",
  "Notion AI for note organization, planning, and productivity workflows",
  "Canva AI for presentations, assignments, visuals, and creative projects",
  "Grammarly for writing improvement, clarity, and grammar support",
  "Claude for long-form study summaries, concept simplification, and cleaner writing flow",
];

const useCases = [
  "Understanding difficult topics faster",
  "Creating assignment drafts and project outlines",
  "Organizing notes and study plans",
  "Building presentations and visual projects",
  "Improving writing and communication clarity",
  "Learning digital skills beyond classroom theory",
];

const mistakes = [
  "Using AI answers without understanding the concept properly",
  "Copy-pasting assignments without editing or thinking",
  "Depending on tools without building real skill",
  "Using too many tools without a simple study workflow",
];

const relatedLinks = [
  { href: "/ai-skills", label: "AI Skills" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/ai-skills-for-students", label: "AI Skills for Students" },
  { href: "/ai-tools-for-students", label: "AI Tools for Students" },
  { href: "/ai-jobs-without-coding", label: "AI Jobs Without Coding" },
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
          <Pill>Student AI Tools</Pill>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[58px]">
              Best AI Tools for Students in 2026
            </h1>

            <p className="mt-6 max-w-3xl text-[18px] leading-[1.8] text-[#47607F] md:text-[20px]">
              AI tools are helping students study faster, understand concepts more clearly, organize work better, and
              build practical digital skills. The most useful AI tools for students are not only the ones that give
              quick answers. They are the ones that improve learning, workflow, communication, and output quality.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-tools-for-students"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore Student AI Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Faster learning",
                desc: "AI tools help students understand concepts, simplify information, and learn more efficiently.",
              },
              {
                icon: Workflow,
                title: "Better study workflow",
                desc: "Students can organize notes, assignments, project steps, and revision systems more clearly.",
              },
              {
                icon: Brain,
                title: "Practical skill growth",
                desc: "The right AI tools also help students build real digital capability beyond classroom theory.",
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
            title="Why AI tools matter for students"
            desc="Students today need more than only textbook learning. They need speed, clarity, digital literacy, and better output quality across assignments, projects, presentations, and career preparation."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            AI tools matter because they help students save time, reduce confusion, improve writing, and learn how
            modern digital work actually happens. When used properly, these tools do not weaken learning. They can make
            learning more structured and more practical.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Best AI tools for students"
            desc="These tools are useful because they support different parts of modern student work."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool}
                className="rounded-[24px] border border-[#D8E5F4] bg-[#FBFDFF] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <p className="text-[16px] leading-[1.8] text-[#071533]">{tool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="How students use AI tools in real situations"
            desc="AI tools become valuable when they support actual student needs."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {useCases.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-[#D8E5F4] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[#2563EB]" />
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
            title="What students should focus on beyond tools"
            desc="Tools are helpful, but long-term value comes from combining them with thinking and real skill."
          />
          <p className="mt-6 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            Students should focus on concept understanding, communication clarity, digital execution, project quality,
            and workflow thinking. The best use of AI is not shortcut-based dependency. It is using AI to support real
            learning, stronger output, and future-ready capability.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Mistakes students should avoid"
            desc="These mistakes reduce the value of AI tools in learning."
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
            The strongest long-term advantage
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-[1.9] text-[#47607F]">
            The strongest students will be the ones who combine AI tools with strong fundamentals, curiosity, execution
            ability, and practical digital skills. That combination creates better opportunities in freelancing, jobs,
            content, and future digital work.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-6 md:py-18 lg:px-8">
          <SectionTitle
            title="Explore connected AI pages"
            desc="Use these pages to understand the larger student learning and AI skills ecosystem."
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
              Learn AI Skills with Sikhadenge
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.85] text-[#47607F]">
              Sikhadenge helps learners build practical AI skills across content, design, video, and workflows so they
              can move from scattered tool usage to real capability and modern digital relevance.
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
    
<section className="border-t border-white/10 bg-[#0B1220]">
  <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8">

    <h2 className="text-2xl md:text-3xl font-bold text-white">
      Practical Understanding and Real Use Cases
    </h2>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      This topic is not only theoretical. It is actively used in real digital workflows including content creation, freelance delivery, marketing execution, and online earning systems. Understanding how it works in real scenarios is important for building practical skills.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Real Use Cases
    </h3>

    <ul className="mt-4 space-y-3 text-[#B0B7C3]">
      <li>• Freelancing services using AI tools</li>
      <li>• Content creation and social media growth</li>
      <li>• Video editing and short-form content production</li>
      <li>• Digital marketing and lead generation</li>
      <li>• Online earning and skill-based income</li>
    </ul>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Tools Commonly Used
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      People working in this area commonly use AI tools for writing, design, automation, and content production. The real advantage comes when these tools are used together inside a structured workflow instead of individually.
    </p>

    <h3 className="mt-8 text-xl font-semibold text-white">
      Why This Skill Matters
    </h3>

    <p className="mt-4 text-[#B0B7C3] leading-7">
      This skill is becoming important because modern work is shifting toward faster execution, higher productivity, and multi-skill capability. AI enables individuals to work smarter and handle multiple types of tasks efficiently.
    </p>

  </div>
</section>

</main>
  );
}
