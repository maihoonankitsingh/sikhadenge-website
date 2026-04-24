import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for Mentors | Sikhadenge",
  description:
    "Explore the best AI skills for mentors who want stronger learner support, better guidance systems, faster content execution, and more scalable mentorship delivery.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "Mentors should build AI skills across modern guidance and learner support systems.",
    text:
      "The strongest mentoring advantage now comes from using AI across communication, learning support, session prep, content, feedback, and workflow systems with better speed and structure.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to improve learner support without increasing delivery chaos.",
    text:
      "People who understand broader AI-assisted mentoring work can support faster execution, stronger communication, better session preparation, and more scalable systems.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI improves clarity, speed, and delivery confidence for mentors.",
    text:
      "This is not only about tools. It is about building stronger mentoring systems, improving learner support quality, and making guidance more efficient and repeatable.",
  },
];

const whyCards = [
  {
    title: "Mentoring needs broader execution capability",
    text:
      "Strong mentoring systems usually depend on communication, session planning, learning support, content, notes, follow-ups, and recurring learner guidance together. AI-assisted capability improves connected execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and mentoring consistency",
    text:
      "When used properly, AI helps mentors move faster on session notes, learning summaries, feedback drafts, resource recommendations, and recurring workflows without lowering quality.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Learners value clarity and structured support",
    text:
      "Mentors usually create stronger impact when they can guide clearly, support consistently, and provide structured help across sessions, tasks, and follow-ups. AI skills create broader leverage.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Better systems create stronger mentoring leverage",
    text:
      "Mentors who understand AI-assisted workflows can reduce repetitive work, improve response speed, and build stronger long-term learner-support systems.",
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
    title: "Learner communication systems",
    text:
      "Mentors should know how to use AI for follow-ups, reminders, recap messages, doubt-support replies, onboarding notes, and clearer learner communication.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16v10H9l-5 3V7Z" strokeLinejoin="round" />
        <path d="M8 11h8M8 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Session planning and guidance support",
    text:
      "AI can help mentors with session agendas, question prompts, guidance frameworks, explanation flow, recap points, and more organized mentoring preparation.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 10h8M8 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Feedback and evaluation support",
    text:
      "Mentors benefit from AI-assisted feedback drafts, review structures, progress summaries, assignment comments, reflection prompts, and clearer learner improvement guidance.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h8l6 6-8 8-6-6V6Z" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Learning resources and support assets",
    text:
      "AI is useful for worksheets, reading suggestions, learning summaries, practice prompts, example sets, and structured support resources for learners.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Content and authority support",
    text:
      "Mentors can use AI to support posts, educational content, email drafts, insight sharing, summaries, and thought-leadership content for better positioning.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9h17M8 14h3M13 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Workflow and support systems",
    text:
      "Mentoring systems grow better when AI is used for recurring workflows such as learner tracking, follow-ups, notes, reminders, session prep, and support operations.",
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
    title: "Stronger mentoring value",
    text:
      "Mentors become more effective when they can support multiple connected learner tasks instead of depending only on live guidance or isolated content.",
  },
  {
    title: "Better delivery leverage",
    text:
      "Broader AI-assisted capability improves support range, which can strengthen communication, session quality, feedback systems, and learner progress support.",
  },
  {
    title: "Higher learner trust",
    text:
      "Learners are more likely to stay engaged with mentors who communicate clearly, follow up consistently, and manage support workflows with stronger structure.",
  },
  {
    title: "More market relevance",
    text:
      "Mentors who adopt AI-assisted workflows stay more relevant as learner expectations move toward faster, broader, and more structured support.",
  },
  {
    title: "Better execution confidence",
    text:
      "A stronger AI skill stack helps mentors approach learner guidance with more clarity, structure, and practical delivery systems.",
  },
  {
    title: "Scalable mentoring systems",
    text:
      "AI-assisted workflows help create more repeatable systems across onboarding, sessions, feedback, communication, and long-term learner support.",
  },
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-coaches", label: "AI Skills for Coaches" },
  { href: "/ai-skills-for-educators", label: "AI Skills for Educators" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools", label: "AI Tools Hub" },
];

const faqs = [
  {
    q: "Which AI skills are best for mentors right now?",
    a:
      "The most useful AI skills for mentors usually include learner communication support, session planning, feedback systems, learning resources, content support, and workflow organization.",
  },
  {
    q: "Why do mentors need broader AI capability?",
    a:
      "Because strong mentoring usually depends on multiple connected functions such as communication, guidance, feedback, support content, learner tracking, and recurring workflows.",
  },
  {
    q: "Can AI skills help mentors support learners better?",
    a:
      "Yes. Better execution range and stronger AI-assisted systems can improve communication quality, support consistency, preparation speed, and overall learner experience.",
  },
  {
    q: "Do mentors need coding to use AI effectively?",
    a:
      "No. Most mentor-focused AI execution can be done without coding by using the right tools, prompts, workflows, and structured support systems.",
  },
  {
    q: "What is the biggest mistake mentors make while learning AI?",
    a:
      "A common mistake is focusing only on tool names instead of learning how AI improves real mentoring execution such as communication, feedback, resources, learner support, and follow-ups.",
  },
  {
    q: "Can these skills help build long-term mentoring systems?",
    a:
      "Yes. AI-assisted systems can reduce repetitive effort, improve response speed, and help create more scalable mentoring workflows over time.",
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

export default function AiSkillsForMentorsPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            Mentor AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for mentors who want stronger learner support systems
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            Mentors now need more than isolated sessions or generic advice. The best AI skills are
            the ones that improve real mentoring execution across communication, guidance, feedback,
            resources, follow-ups, and workflow systems. These capabilities help people build more
            efficient, more reliable, and more scalable learner-support systems.
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
              Why mentors should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              People who adopt practical AI capability early can improve support quality, delivery
              consistency, learner clarity, and long-term mentoring leverage.
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
              What mentors should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best mentor AI skill stack is practical, learner-oriented, and directly connected
              to real mentoring execution across modern support systems.
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
          <SectionLabel>Mentoring outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help mentors achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more
              structured, more efficient, and more scalable in learner support delivery.
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
                These pages help mentors understand how AI skills connect with coaching,
                education, broader learning paths, and the AI Expert model.
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
              Clear answers to common questions people usually have before choosing which AI
              skills to build for mentoring work.
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
