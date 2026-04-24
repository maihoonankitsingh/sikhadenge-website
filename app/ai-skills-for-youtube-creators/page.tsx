import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for YouTube Creators | Sikhadenge",
  description:
    "Explore the best AI skills for YouTube creators who want stronger video execution, better content systems, faster production, and more scalable channel growth.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "YouTube creators should build AI skills across modern video and content execution.",
    text:
      "The strongest creator advantage now comes from improving ideation, scripting, visuals, editing support, thumbnail thinking, and repeatable content systems.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to create better videos faster without losing quality.",
    text:
      "Creators who understand broader AI-assisted execution can handle planning, production, repurposing, and workflow tasks with better consistency.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI improves speed, quality, and output consistency for YouTube creators.",
    text:
      "This is not only about tools. It is about building stronger content systems, better storytelling support, and more reliable channel execution.",
  },
];

const whyCards = [
  {
    title: "YouTube growth needs broader execution capability",
    text:
      "Creators often need to manage ideas, research, scripts, thumbnails, edits, captions, descriptions, and publishing systems together. AI-assisted capability improves connected execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and production quality",
    text:
      "When used properly, AI helps creators move faster on concepts, drafting, edit prep, title ideas, hook testing, and recurring execution without lowering output quality.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Modern creators need multi-skill content support",
    text:
      "Strong channels usually require support across strategy, scripting, visuals, packaging, editing, and workflow systems. AI skills help creators become more complete operators.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Better systems create better content leverage",
    text:
      "Creators who understand AI-assisted workflows can improve turnaround time, repurpose content faster, and build stronger long-term channel systems.",
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
    title: "Content ideation and research support",
    text:
      "YouTube creators should know how to use AI for topic research, content angles, audience questions, trend mapping, and structured idea generation.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Scripting and messaging execution",
    text:
      "Creators benefit from AI-assisted script drafts, hooks, section flow, storytelling support, CTA phrasing, descriptions, and communication clarity.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Thumbnail and visual packaging support",
    text:
      "Thumbnail concepts, layout directions, visual hierarchy, title-visual alignment, and channel packaging support are highly useful AI-assisted creator skills.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h8l6 6-8 8-6-6V6Z" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Editing and repurposing workflows",
    text:
      "Creators should understand how AI supports edit prep, clip selection, short-form repurposing, captioning, highlight extraction, and faster production flow.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="6" width="12.5" height="12" rx="2" />
        <path d="M16 10l4.5-2.5v9L16 14" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Publishing and channel workflow systems",
    text:
      "AI can support creators with upload planning, metadata drafts, descriptions, scheduling notes, publishing checklists, and more organized channel operations.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="6" height="6" rx="1.5" />
        <rect x="14" y="13" width="6" height="6" rx="1.5" />
        <path d="M10 8h4v8" />
      </svg>
    ),
  },
  {
    title: "Content systems and consistency",
    text:
      "YouTube creators grow better when they build structured systems for recurring formats, weekly output, content batching, and long-term execution consistency.",
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
    title: "Stronger channel value",
    text:
      "Creators become more effective when they can support multiple connected channel tasks instead of depending only on one isolated production skill.",
  },
  {
    title: "Better earning potential",
    text:
      "Broader AI-assisted execution can improve monetization potential because creators can produce more consistently and support more content formats.",
  },
  {
    title: "Higher content consistency",
    text:
      "Creators are more likely to sustain channel growth when they can manage scripts, visuals, thumbnails, edits, and workflows with stronger systems.",
  },
  {
    title: "More market relevance",
    text:
      "Creators who adopt AI-assisted workflows stay more relevant as content expectations move toward faster, broader, and more structured execution.",
  },
  {
    title: "Better creative confidence",
    text:
      "A stronger AI skill stack helps creators approach content with better ideas, clearer structure, and more practical execution support.",
  },
  {
    title: "Scalable content systems",
    text:
      "AI-assisted workflows help YouTube creators reduce repetitive effort and build more repeatable systems for long-term channel growth.",
  },
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-creators", label: "AI Skills for Creators" },
  { href: "/ai-tools-for-creators", label: "AI Tools for Creators" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools", label: "AI Tools Hub" },
];

const faqs = [
  {
    q: "Which AI skills are best for YouTube creators right now?",
    a:
      "The most useful AI skills for YouTube creators usually include content ideation, scripting support, thumbnail thinking, editing workflows, repurposing systems, and publishing structure.",
  },
  {
    q: "Why do YouTube creators need broader AI capability?",
    a:
      "Because channel growth usually depends on multiple connected tasks such as research, scripts, visuals, thumbnails, edits, captions, and publishing systems.",
  },
  {
    q: "Can AI skills help creators grow faster on YouTube?",
    a:
      "Yes. Better execution range and stronger content systems can improve consistency, packaging quality, turnaround speed, and overall channel performance.",
  },
  {
    q: "Do YouTube creators need coding skills for this?",
    a:
      "No. Most creator-focused AI execution can be done without coding by using the right tools, prompts, workflows, and structured content systems.",
  },
  {
    q: "What is the biggest mistake creators make while learning AI?",
    a:
      "A common mistake is focusing only on tool names instead of learning how AI improves real channel execution such as ideas, scripts, thumbnails, edits, publishing, and workflow consistency.",
  },
  {
    q: "Can these skills help creators scale their channel systems?",
    a:
      "Yes. AI-assisted systems can reduce repetitive work, improve output speed, and help creators build more scalable content operations over time.",
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

export default function AiSkillsForYouTubeCreatorsPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            YouTube creator AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for YouTube creators who want stronger channel execution
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            YouTube creators now need more than just basic editing or idea generation. The best AI
            skills are the ones that improve real channel execution across research, scripting,
            visuals, thumbnails, editing support, repurposing, and workflow systems. These
            capabilities help creators become more consistent, more efficient, and more scalable.
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
              Why YouTube creators should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              Creators who adopt practical AI capability early can improve production speed,
              packaging quality, channel consistency, and long-term growth leverage.
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
              What YouTube creators should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best YouTube creator AI skill stack is practical, channel-oriented, and directly
              connected to real video execution across modern content systems.
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
          <SectionLabel>Creator outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help creators achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more
              consistent, more efficient, and more scalable in channel growth.
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
                These pages help creators understand how AI skills connect with tools, broader
                learning paths, creator workflows, and the AI Expert model.
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
              Clear answers to common questions YouTube creators usually have before choosing which
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
