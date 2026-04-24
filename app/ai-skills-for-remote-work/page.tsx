import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for Remote Work | Sikhadenge",
  description:
    "Explore the best AI skills for remote work professionals who want stronger execution, better online delivery, higher productivity, and more valuable digital capability.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "Remote professionals should build AI skills across modern digital execution.",
    text:
      "The strongest remote-work advantage now comes from handling content, visuals, communication, productivity, research, and workflow tasks with better speed and structure.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to become more reliable and more effective in remote execution.",
    text:
      "People who understand broader AI-assisted work can support faster delivery, stronger output quality, and better task handling across digital roles.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI improves speed, clarity, and delivery confidence in remote work.",
    text:
      "This is not only about tools. It is about working better online, handling recurring tasks faster, and improving practical execution quality.",
  },
];

const whyCards = [
  {
    title: "Remote work needs broader execution capability",
    text:
      "People working remotely often handle communication, content, coordination, research, support tasks, documentation, and delivery work together. AI-assisted capability improves overall usefulness.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and online delivery quality",
    text:
      "When used properly, AI helps remote workers move faster on drafts, planning, research, ideas, summaries, and execution support without lowering output quality.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Modern remote roles require multi-skill support",
    text:
      "Many remote opportunities expect support across writing, research, communication, visuals, task handling, and workflow clarity. AI skills help remote workers become more adaptable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Stronger workflows create better remote leverage",
    text:
      "Remote workers who understand AI-assisted workflows can reduce friction, improve response speed, and build stronger delivery systems for long-term online work.",
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
    title: "Writing and communication support",
    text:
      "Remote workers should know how to support emails, updates, summaries, reports, briefs, notes, content drafts, and communication systems with AI-assisted execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16v10H4z" />
        <path d="m4 8 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Research and documentation execution",
    text:
      "Research summaries, structured notes, competitor findings, meeting summaries, SOP drafts, and documentation support are highly useful remote-work AI skills.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Content and visual support",
    text:
      "Many remote roles benefit from supporting social content, presentation visuals, thumbnail ideas, light design workflows, and basic creative execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h8l6 6-8 8-6-6V6Z" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Productivity and task systems",
    text:
      "Remote workers should learn how to use AI for planning, prioritizing, task breakdown, checklist support, and more organized day-to-day execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="6" height="6" rx="1.5" />
        <rect x="14" y="13" width="6" height="6" rx="1.5" />
        <path d="M10 8h4v8" />
      </svg>
    ),
  },
  {
    title: "Remote collaboration and coordination",
    text:
      "AI skills are useful for meeting notes, follow-up drafts, coordination updates, team communication, client response support, and smoother collaboration.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3.5 18c.8-2.7 3-4 5.5-4s4.7 1.3 5.5 4" />
        <path d="M14 18c.5-1.8 2-2.8 4-2.8 1.2 0 2.4.4 3 1.4" />
      </svg>
    ),
  },
  {
    title: "Workflow and execution systems",
    text:
      "Remote work becomes more stable when people build structured workflows for repetitive tasks, approvals, revisions, updates, and delivery handovers.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="5.5" height="5.5" rx="1.4" />
        <rect x="14.5" y="5" width="5.5" height="5.5" rx="1.4" />
        <rect x="9.2" y="13.5" width="5.5" height="5.5" rx="1.4" />
        <path d="M9.5 8h5M12 10.5v3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const resultCards = [
  {
    title: "Stronger remote value",
    text:
      "Remote workers become more useful when they can support multiple connected digital tasks instead of handling only one narrow responsibility.",
  },
  {
    title: "Better earning potential",
    text:
      "Broader AI-assisted capability can improve pricing power and career value because remote workers can contribute more deeply to execution and outcomes.",
  },
  {
    title: "Higher reliability perception",
    text:
      "Teams and clients value remote workers who can communicate clearly, handle recurring tasks, support documentation, and execute work with better consistency.",
  },
  {
    title: "More market relevance",
    text:
      "Remote workers who adapt to AI-assisted workflows stay more relevant as digital work expectations shift toward faster and broader execution.",
  },
  {
    title: "Better service confidence",
    text:
      "A clear AI skill stack helps remote workers approach tasks with stronger structure, better clarity, and more practical delivery support.",
  },
  {
    title: "Scalable online systems",
    text:
      "AI-assisted workflows help remote workers reduce repetitive effort and create more organized systems for ongoing execution over time.",
  },
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-students", label: "AI Skills for Students" },
  { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools", label: "AI Tools Hub" },
];

const faqs = [
  {
    q: "Which AI skills are best for remote work right now?",
    a:
      "The most useful AI skills for remote work usually include communication support, research execution, documentation systems, productivity workflows, content support, and structured task handling.",
  },
  {
    q: "Why do remote workers need broader AI capability?",
    a:
      "Because remote work often involves multiple connected responsibilities such as updates, research, communication, task management, documentation, and execution support.",
  },
  {
    q: "Can AI skills help remote workers get better opportunities?",
    a:
      "Yes. Better execution range and stronger workflow support can improve positioning, reliability, and perceived value for remote roles and freelance opportunities.",
  },
  {
    q: "Do remote workers need technical coding skills for this?",
    a:
      "No. Most remote-work AI execution can be done without coding by using the right tools, workflows, prompts, and structured systems.",
  },
  {
    q: "What is the biggest mistake people make while learning AI for remote work?",
    a:
      "A common mistake is focusing only on tool names instead of learning how AI improves real remote execution such as research, writing, planning, communication, and task systems.",
  },
  {
    q: "Can these skills help remote workers scale their work?",
    a:
      "Yes. AI-assisted systems can reduce repetitive effort, improve response speed, and help remote workers build more scalable online execution systems.",
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

export default function AiSkillsForRemoteWorkPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            Remote work AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for remote workers who want stronger online execution
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            Remote workers now need more than basic task handling. The best AI skills are the ones
            that improve real online execution across communication, research, productivity,
            content support, documentation, and workflow systems. These capabilities help people
            become more reliable, more efficient, and more useful in digital work.
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

      <section className="border-t border-[#E7EDF6] bg-[#F3F6FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Why it matters</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              Why remote workers should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Remote workers who adopt practical AI capability early can improve execution speed,
              reliability, and delivery flexibility across digital work.
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

      <section className="border-t border-[#E7EDF6] bg-[#F3F6FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Skill coverage</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What remote workers should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best remote-work AI skill stack is practical, digital-first, and directly
              connected to real online execution across modern roles.
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

      <section className="border-t border-[#E7EDF6] bg-[#F3F6FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>Remote work outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help remote workers achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more useful,
              more reliable, and more scalable in online work.
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

      <section className="border-t border-[#E7EDF6] bg-[#F3F6FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-[#E3EAF5] bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.06)] sm:p-10">
            <SectionLabel>Related learning paths</SectionLabel>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A]">
                Explore connected AI skill pages
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#677184]">
                These pages help remote workers understand how AI skills connect with students,
                creators, tools, broader learning paths, and the AI Expert model.
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

      <section className="border-t border-[#E7EDF6] bg-[#F3F6FB]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionLabel>FAQ</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Clear answers to common questions remote workers usually have before choosing which
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
