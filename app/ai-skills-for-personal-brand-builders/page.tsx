import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Skills for Personal Brand Builders | Sikhadenge",
  description:
    "Explore the best AI skills for personal brand builders who want stronger content systems, better positioning, faster execution, and more scalable audience growth.",
};

const heroCards = [
  {
    eyebrow: "Best Focus",
    title: "Personal brand builders should build AI skills across modern content and positioning systems.",
    text:
      "The strongest personal-brand advantage now comes from using AI across ideas, messaging, content, visuals, reels, offers, and workflow systems with better speed and structure.",
  },
  {
    eyebrow: "Main Goal",
    title: "The goal is to grow visibility without losing clarity or consistency.",
    text:
      "People who understand broader AI-assisted brand work can support faster execution, stronger positioning, better content systems, and more scalable audience growth.",
  },
  {
    eyebrow: "Big Advantage",
    title: "AI improves clarity, speed, and execution confidence for personal brands.",
    text:
      "This is not only about tools. It is about building stronger content systems, improving communication quality, and making brand growth more efficient and repeatable.",
  },
];

const whyCards = [
  {
    title: "Personal brands need broader execution capability",
    text:
      "Strong personal brands usually depend on content ideas, hooks, posts, reels, storytelling, authority building, offers, and recurring publishing workflows together. AI-assisted capability improves connected execution.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
        <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      </svg>
    ),
  },
  {
    title: "AI improves speed and brand-content consistency",
    text:
      "When used properly, AI helps people move faster on post drafts, reel ideas, content outlines, hooks, repurposing, and recurring brand workflows without lowering quality.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Audience growth requires multi-skill support",
    text:
      "Strong brand growth rarely comes from captions alone. It usually needs support across ideas, visuals, messaging, reels, offers, storytelling, and workflow consistency. AI skills create broader leverage.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="4.5" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Better systems create stronger brand leverage",
    text:
      "People who understand AI-assisted workflows can reduce repetitive work, improve consistency, and build stronger long-term personal brand systems.",
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
    title: "Content ideation and positioning support",
    text:
      "Personal brand builders should know how to use AI for content angles, audience pain points, positioning ideas, topic clusters, and stronger brand differentiation.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Hooks, captions, and messaging execution",
    text:
      "AI-assisted hooks, captions, CTA support, bio drafts, short-form messaging, storytelling lines, and communication clarity are highly useful brand-growth skills.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Reels and short-form scripting",
    text:
      "People should understand how AI supports reel scripts, talking-point flow, voiceover drafts, scene ideas, and short-form structure for better content packaging.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="6" width="12.5" height="12" rx="2" />
        <path d="M16 10l4.5-2.5v9L16 14" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Visual and creative packaging support",
    text:
      "Brand growth improves with stronger visual direction such as carousel structure, reel covers, graphic support, layout ideas, and AI-assisted creative packaging.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h8l6 6-8 8-6-6V6Z" />
        <circle cx="9" cy="10" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Offer and authority-building support",
    text:
      "AI can help personal brand builders support lead magnets, offer drafts, profile clarity, newsletter ideas, educational content, and authority-focused communication systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M3.5 9h17M8 14h3M13 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Workflow and publishing consistency",
    text:
      "Personal brands grow better when people build systems for content calendars, drafts, publishing flow, repurposing, review steps, and recurring brand execution.",
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
    title: "Stronger brand consistency",
    text:
      "People grow better when they can support multiple connected brand tasks instead of depending on random posting or isolated content ideas.",
  },
  {
    title: "Better growth potential",
    text:
      "Broader AI-assisted execution can improve content speed, positioning strength, offer clarity, and audience-building systems for stronger long-term growth.",
  },
  {
    title: "Higher efficiency",
    text:
      "Personal brand builders can reduce repetitive content work when AI supports drafts, scripts, repurposing, messaging, and workflow organization.",
  },
  {
    title: "More market relevance",
    text:
      "People who adopt AI-assisted brand workflows stay more relevant as visibility expectations move toward faster, broader, and more structured execution.",
  },
  {
    title: "Better execution confidence",
    text:
      "A stronger AI skill stack helps people approach personal branding with more clarity, better ideas, and more practical growth systems.",
  },
  {
    title: "Scalable audience systems",
    text:
      "AI-assisted workflows help create more repeatable systems for posts, reels, captions, repurposing, and long-term audience building.",
  },
];

const relatedLinks = [
  { href: "/ai-generalist", label: "AI Expert" },
  { href: "/ai-skills-for-personal-brand", label: "AI Skills for Personal Brand" },
  { href: "/ai-skills-for-instagram-growth", label: "AI Skills for Instagram Growth" },
  { href: "/best-ai-skills-to-learn", label: "Best AI Skills to Learn" },
  { href: "/ai-tools", label: "AI Tools Hub" },
];

const faqs = [
  {
    q: "Which AI skills are best for personal brand builders right now?",
    a:
      "The most useful AI skills for personal brand builders usually include content ideation, positioning support, hooks and captions, reel scripting, visual packaging, offer clarity, and workflow consistency.",
  },
  {
    q: "Why does personal brand growth need broader AI capability?",
    a:
      "Because strong brand growth usually depends on multiple connected functions such as ideas, messaging, visuals, reels, offers, repurposing, and recurring publishing systems.",
  },
  {
    q: "Can AI skills help people grow their personal brand faster?",
    a:
      "Yes. Better execution range and stronger AI-assisted systems can improve content speed, consistency, positioning quality, and overall audience growth potential.",
  },
  {
    q: "Do I need coding to use AI for personal brand growth?",
    a:
      "No. Most personal-brand AI execution can be done without coding by using the right tools, prompts, workflows, and structured content systems.",
  },
  {
    q: "What is the biggest mistake people make while learning AI for personal branding?",
    a:
      "A common mistake is focusing only on tool names instead of learning how AI improves real brand execution such as positioning, messaging, content systems, offers, repurposing, and consistency.",
  },
  {
    q: "Can these skills help build long-term brand systems?",
    a:
      "Yes. AI-assisted systems can reduce repetitive effort, improve output speed, and help create more scalable personal-brand workflows over time.",
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

export default function AiSkillsForPersonalBrandBuildersPage() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] text-[#0F172A]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-[#D7E3FF] bg-[#EEF4FF] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2563EB]">
            Personal brand AI skill guide
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
            Best AI skills for personal brand builders who want stronger content systems
          </h1>

          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-[#5B6475] sm:text-[16px]">
            Personal brand builders now need more than isolated posts or random growth hacks. The
            best AI skills are the ones that improve real brand execution across positioning,
            messaging, content, reels, visuals, offers, and workflow systems. These capabilities
            help people build more efficient, more consistent, and more scalable audience-growth systems.
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
              Why personal brand builders should build AI skills now
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              People who adopt practical AI capability early can improve content quality,
              posting consistency, brand clarity, and long-term audience leverage.
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
              What personal brand builders should actually learn
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The best personal-brand AI skill stack is practical, audience-oriented, and directly
              connected to real content execution across modern visibility systems.
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
          <SectionLabel>Brand outcome</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-[#0F172A] sm:text-4xl">
              What these skills can help people achieve
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#677184]">
              The real value is not only using AI tools. The bigger value is becoming more
              structured, more efficient, and more scalable in personal brand growth.
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
                These pages help personal brand builders understand how AI skills connect with
                branding, audience growth, broader learning paths, and the AI Expert model.
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
              skills to build for personal-brand growth.
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
