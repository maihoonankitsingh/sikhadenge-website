import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for Service Business | Sikhadenge",
  description:
    "Explore the best AI skills for service businesses that want stronger delivery, better client communication, faster execution, and more scalable digital operations.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "Service businesses should build AI skills across modern client delivery systems.",
    text:
      "The strongest advantage now comes from using AI across communication, proposals, content, offers, workflows, support, and recurring service execution.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to improve delivery speed without reducing service quality.",
    text:
      "Businesses that understand broader AI-assisted execution can support more client work, improve response quality, and build stronger internal systems.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI improves speed, structure, and delivery confidence for service businesses.",
    text:
      "This is not only about tools. It is about building stronger service systems, clearer execution, and more reliable client-facing operations.",
  },
];

const whyCards = [
  {
    title: "Service businesses need broader execution capability",
    text:
      "Modern service businesses usually depend on offers, sales conversations, onboarding, delivery, updates, support, and internal coordination together. AI-assisted capability improves connected execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and service consistency",
    text:
      "When used properly, AI helps businesses move faster on drafts, proposals, communication, documentation, delivery planning, and recurring service workflows without lowering quality.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Clients value structured and reliable support",
    text:
      "Strong service businesses usually win when they can communicate clearly, deliver consistently, solve problems faster, and manage workflows better. AI skills create broader leverage.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Better systems create stronger growth leverage",
    text:
      "Businesses that understand AI-assisted workflows can reduce repetitive work, improve turnaround time, and create stronger long-term delivery systems.",
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
    title: "Client communication systems",
    text:
      "Service businesses should know how to use AI for inquiry replies, follow-ups, updates, onboarding messages, support templates, and clearer client communication.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16v10H9l-5 3V7Z" strokeLinejoin="round" />
        <path d="M8 11h8M8 14h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Proposal and offer support",
    text:
      "AI can support service businesses with proposal drafts, scope explanation, offer positioning, pricing communication, and objection-handling support.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Content and marketing support",
    text:
      "Service businesses benefit from AI-assisted content such as captions, blogs, social posts, email drafts, lead magnets, and awareness-focused marketing execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h8l6 6-8 8-6-6V6Z" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Delivery and documentation workflows",
    text:
      "AI is useful for SOPs, meeting summaries, task checklists, revision logs, handoff notes, and more organized service delivery systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sales page and conversion support",
    text:
      "Service businesses can use AI to improve sales-page sections, messaging clarity, CTA structure, customer questions, and conversion-focused digital assets.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9h17M8 14h3M13 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Workflow and operations systems",
    text:
      "Service businesses grow better when AI is used for recurring workflows such as approvals, task planning, status updates, revisions, and operational handoffs.",
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
    title: "Stronger service value",
    text:
      "Businesses become more effective when they can support multiple connected client tasks instead of depending on isolated execution systems.",
  },
  {
    title: "Better delivery leverage",
    text:
      "Broader AI-assisted capability improves service range, which can support faster delivery, stronger communication, and better operational efficiency.",
  },
  {
    title: "Higher client trust",
    text:
      "Clients are more likely to stay with businesses that can communicate clearly, deliver consistently, and manage workflows with stronger structure.",
  },
  {
    title: "More market relevance",
    text:
      "Service businesses that adopt AI-assisted workflows stay more relevant as client expectations move toward faster, broader, and more structured execution.",
  },
  {
    title: "Better execution confidence",
    text:
      "A stronger AI skill stack helps business owners and teams approach service delivery with more clarity, structure, and practical support.",
  },
  {
    title: "Scalable service systems",
    text:
      "AI-assisted workflows help create more repeatable systems across offers, delivery, communication, support, and long-term operational execution.",
  },
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-business", label: "AI Skills for Business" },
  { href: "/ai-skills-for-online-business", label: "AI Skills for Online Business" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools", label: "AI Tools Hub" },
];

const faqs = [
  {
    q: "Which AI skills are best for service businesses right now?",
    a:
      "The most useful AI skills for service businesses usually include client communication support, proposal systems, content support, delivery workflows, sales-page support, and operational organization.",
  },
  {
    q: "Why do service businesses need broader AI capability?",
    a:
      "Because strong service growth often depends on multiple connected functions such as sales, onboarding, delivery, support, documentation, and recurring client communication.",
  },
  {
    q: "Can AI skills help service businesses grow faster?",
    a:
      "Yes. Better execution range and stronger AI-assisted systems can improve speed, consistency, proposal quality, delivery efficiency, and client-facing communication.",
  },
  {
    q: "Do service business owners need coding to use AI effectively?",
    a:
      "No. Most service-business AI execution can be done without coding by using the right tools, prompts, workflows, and structured systems.",
  },
  {
    q: "What is the biggest mistake service businesses make while learning AI?",
    a:
      "A common mistake is focusing only on popular tools instead of learning how AI improves real business execution such as offers, communication, delivery, support, and operations.",
  },
  {
    q: "Can these skills help build long-term service systems?",
    a:
      "Yes. AI-assisted systems can reduce repetitive effort, improve execution speed, and help create more scalable service workflows over time.",
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

export default function AiSkillsForServiceBusinessPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            Service business AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for service businesses that want stronger client delivery
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            Service businesses now need more than isolated sales or content efforts. The best AI
            skills are the ones that improve real execution across offers, proposals, client
            communication, delivery, support, and workflow systems. These capabilities help people
            build more efficient, more reliable, and more scalable service operations.
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
              Why service businesses should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Businesses that adopt practical AI capability early can improve service execution,
              response speed, delivery consistency, and long-term operational leverage.
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
              What service businesses should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best service-business AI skill stack is practical, delivery-oriented, and directly
              connected to real client execution across modern operational systems.
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
          <SectionLabel>Business outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help service businesses achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more
              structured, more efficient, and more scalable in service delivery.
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
                These pages help service businesses understand how AI skills connect with business,
                tools, broader learning paths, and the AI Expert model.
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
              skills to build for service business growth.
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
