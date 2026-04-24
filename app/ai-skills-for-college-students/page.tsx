import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for College Students | Sikhadenge",
  description:
    "Explore the best AI skills for college students who want stronger projects, better internships, faster learning, and real career readiness.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "College students should build AI skills linked to real projects and career growth.",
    text:
      "The strongest student advantage comes from learning how AI supports research, assignments, presentations, portfolio work, content execution, and practical digital skills.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to become more capable before placements and internships.",
    text:
      "Students who build practical AI execution early can improve project quality, stand out in interviews, and become more valuable in modern digital roles.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI helps students learn faster and execute better.",
    text:
      "This is not only about using tools. It is about creating stronger output, better clarity, and more useful practical capability for the market.",
  },
];

const whyCards = [
  {
    title: "College students need practical digital capability",
    text:
      "Degrees alone are no longer enough. Students who understand AI-assisted work become more relevant for internships, project work, freelance opportunities, and job interviews.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4 3.5 8.5 12 13l8.5-4.5L12 4Z" />
        <path d="M6.5 10.2V15L12 18l5.5-3v-4.8" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and academic execution",
    text:
      "When used properly, AI helps students with idea generation, note structure, concept explanation, summaries, drafting, and project support without reducing real understanding.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Better AI skills improve projects and portfolio quality",
    text:
      "Students who can combine research, writing, visuals, slides, and workflow execution usually create more polished and higher-value academic or portfolio work.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 10h8M8 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Early AI capability creates long-term career leverage",
    text:
      "Students who build AI-assisted execution early enter internships, freelance work, and placements with more confidence, better proof of work, and stronger practical value.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 19c4-1 7-4 8-8l1-4 5 5-4 1c-4 1-7 4-8 8l-2-2Z" />
        <path d="M14 5h5v5" />
      </svg>
    ),
  },
];

const skillCards = [
  {
    title: "Research and study support",
    text:
      "Students should know how to use AI for concept explanation, topic breakdown, summaries, note structure, revision help, and better academic understanding.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Writing and assignment execution",
    text:
      "Drafting, structuring, simplifying, rewriting, outlining, and improving clarity are practical AI-assisted skills that help in assignments and communication work.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Presentation and visual support",
    text:
      "Students benefit from AI-assisted slide structure, diagram planning, explanation visuals, layout ideas, and cleaner presentation execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5" width="17" height="12" rx="2" />
        <path d="M12 17v3M8 20h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Project and portfolio building",
    text:
      "Students should learn how AI can improve idea quality, project planning, workflow structure, case-study presentation, and proof-of-work creation.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16M7 4v6M17 4v6" />
        <rect x="4" y="7" width="16" height="13" rx="2" />
      </svg>
    ),
  },
  {
    title: "Career and internship readiness",
    text:
      "AI skills help students prepare for resumes, personal branding, interview support, internship tasks, and more modern career positioning.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M9 6V4h6v2M4 11h16" />
      </svg>
    ),
  },
  {
    title: "Workflow and productivity systems",
    text:
      "Students can use AI to organize tasks, manage deadlines, structure work, improve consistency, and reduce repetitive academic effort.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="6" height="6" rx="1.5" />
        <rect x="14" y="13" width="6" height="6" rx="1.5" />
        <path d="M10 8h4v8" />
      </svg>
    ),
  },
];

const resultCards = [
  {
    title: "Stronger project quality",
    text:
      "Students create better assignments, presentations, and case studies when they understand how to use AI with proper structure and direction.",
  },
  {
    title: "Better internship readiness",
    text:
      "Practical AI-assisted capability helps students become more useful in internships where speed, clarity, and execution matter.",
  },
  {
    title: "Higher career relevance",
    text:
      "Students who learn modern AI workflows become more relevant for digital roles, modern teams, and fast-changing work environments.",
  },
  {
    title: "More confident learning",
    text:
      "AI can help students break down difficult concepts, organize learning, and approach academic work with better confidence.",
  },
  {
    title: "Better portfolio potential",
    text:
      "Students can create stronger proof of work when they combine research, writing, visuals, slides, and workflow thinking.",
  },
  {
    title: "Scalable student productivity",
    text:
      "AI-assisted systems help students reduce repetitive effort and improve consistency across study, projects, and output creation.",
  },
];

const relatedLinks = [
  { href: "/ai-skills-for-students", label: "AI Skills for Students" },
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools-for-students", label: "AI Tools for Students" },
  { href: "/ai-skills-roadmap-for-beginners", label: "AI Skills Roadmap" },
];

const faqs = [
  {
    q: "Which AI skills are best for college students right now?",
    a:
      "The most useful AI skills for college students usually include research support, assignment structure, writing clarity, presentation support, project building, productivity systems, and internship-ready execution.",
  },
  {
    q: "Why should college students learn AI before placements?",
    a:
      "Because AI-assisted capability improves speed, output quality, and practical relevance. It helps students show stronger execution in projects, internships, and interviews.",
  },
  {
    q: "Can AI skills help college students get internships?",
    a:
      "Yes. Students with practical AI execution skills often become more useful in content, research, operations, digital support, presentation, and communication tasks.",
  },
  {
    q: "Do college students need coding to use AI effectively?",
    a:
      "No. Most student-focused AI work can be done without coding by learning the right tools, prompts, workflows, and structured execution methods.",
  },
  {
    q: "What is the biggest mistake students make while learning AI?",
    a:
      "A common mistake is focusing only on tool names instead of learning how AI improves real work such as projects, research, presentations, writing, and career preparation.",
  },
  {
    q: "Can these skills help students build better portfolios?",
    a:
      "Yes. AI-assisted workflows can improve project structure, clarity, visuals, writing quality, and overall portfolio presentation.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB] uppercase">
      {children}
    </div>
  );
}

function SoftIconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DCE7FF] bg-[#F4F8FF] text-[#2563EB] shadow-[0_10px_30px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

export default function AiSkillsForCollegeStudentsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            College student AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for college students who want stronger projects and career readiness
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            College students now need more than academic knowledge alone. The best AI skills are
            the ones that improve research, assignments, presentations, project work, portfolio
            quality, and career readiness. These capabilities help students become more practical,
            more confident, and more valuable in the digital economy.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gen-ai-masterclass"
              className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(37,99,235,0.28)] transition hover:bg-[#1D4ED8]"
            >
              Join free masterclass
            </Link>
            <Link
              href="/ai-generalist"
              className="inline-flex items-center justify-center rounded-full border border-[#D9E3F5] bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#C8D8F5] hover:bg-[#FAFCFF]"
            >
              Explore AI Expert
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {heroCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-[#E3EAF5] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
                {item.eyebrow}
              </div>
              <h2 className="mt-3 text-[15px] font-semibold leading-6 text-[#0F172A]">
                {item.title}
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-[#647084]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#E7EDF6] bg-[#F5F7FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Why it matters</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              Why college students should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Students who adopt practical AI capability early can improve project quality,
              execution speed, portfolio depth, and long-term career relevance.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[#E3EAF5] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]"
              >
                <SoftIconWrap>{item.icon}</SoftIconWrap>
                <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[#667085]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E7EDF6] bg-[#F5F7FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Skill coverage</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What college students should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best college-student AI skill stack is practical, career-oriented, and directly
              connected to real learning and digital execution.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[#E3EAF5] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]"
              >
                <SoftIconWrap>{item.icon}</SoftIconWrap>
                <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-[#667085]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E7EDF6] bg-[#F5F7FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Student outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help students achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more capable,
              more confident, and more career-ready.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resultCards.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[#0F2A5A] p-6 text-white shadow-[0_22px_55px_rgba(15,42,90,0.28)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] text-white/90">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 12h16M12 4v16" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="mt-5 text-[20px] font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[#D5E1F7]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E7EDF6] bg-[#F5F7FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#E3EAF5] bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.06)] sm:p-10">
            <SectionLabel>Related learning paths</SectionLabel>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A]">
                Explore connected AI skill pages
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#677184]">
                These pages help college students understand how AI skills connect with tools,
                learning paths, career growth, and the AI Expert model.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-full border border-[#DDE6F3] bg-[#F8FAFD] px-4 py-2.5 text-sm font-medium text-[#0F172A] transition hover:border-[#C8D8F5] hover:bg-[#EEF4FF] hover:text-[#2563EB]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E7EDF6] bg-[#F5F7FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Clear answers to common questions college students usually have before choosing which
              AI skills to build.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className="group rounded-[20px] border border-[#E3EAF5] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)]"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-[16px] font-semibold text-[#0F172A]">{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DDE6F3] bg-[#F7FAFF] text-[#2563EB] transition group-open:rotate-180">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-4xl pr-10 text-[14px] leading-7 text-[#667085]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
