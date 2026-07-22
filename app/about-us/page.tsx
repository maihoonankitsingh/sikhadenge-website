export const dynamic = "force-dynamic";
export const revalidate = 0;
import Image from "next/image";
import AnimatedNumber from "@/components/AnimatedNumber";
import { BadgeCheck, Bot, Briefcase, ChevronRight, GraduationCap, Layers, MessagesSquare, PencilRuler, Sparkles, Target, Users, Video, Wand2 } from "lucide-react";

export const metadata = {
  title: 'About — Sikhadenge',
  description: 'Sikhadenge is an India-focused AI and skill learning platform helping students, freelancers, creators, and working professionals build practical digital capability across design, video, content, marketing, websites, and workflows.',
  alternates: { canonical: 'https://sikhadenge.in/about-us' },
};
function IconBadge({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "gold" | "neutral";
}) {
  const ring =
    tone === "gold"
      ? "shadow-[0_0_18px_rgba(245,179,1,0.55)]"
      : tone === "blue"
      ? "shadow-[0_0_18px_rgba(37,99,235,0.35)]"
      : "shadow-none";

  const bg =
    tone === "gold"
      ? "bg-[#111827] border border-[var(--sd-border)]"
      : tone === "blue"
      ? "bg-[#111827] border border-[var(--sd-border)]"
      : "bg-[#111827] border border-[var(--sd-border)]";

  return (
    <span
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full aspect-square shrink-0 min-w-10 min-h-10",
        bg,
        ring,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--sd-border)] bg-white px-3 py-1 text-xs text-[var(--sd-text-3)]">
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-[var(--sd-border)] bg-[var(--sd-card)] backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[var(--sd-bg)] text-[var(--sd-text)] sd-about-polish">
      <style>{`
        /* About stats micro-animations */
        @keyframes sdFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes sdGlow  { 0%,100%{box-shadow:0 0 18px rgba(255,255,255,.10)} 50%{box-shadow:0 0 24px rgba(255,255,255,.22)} }
        @keyframes sdPop   { 0%{opacity:0;transform:translateY(6px) scale(.98)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes sdFadeUp{ 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }

        .sd-stats > div { --sd-delay: 0s; }
        .sd-stats > div:nth-child(1){ --sd-delay: 0s; }
        .sd-stats > div:nth-child(2){ --sd-delay: .10s; }
        .sd-stats > div:nth-child(3){ --sd-delay: .20s; }
        .sd-stats > div:nth-child(4){ --sd-delay: .30s; }

        .sd-stats > div .sd-icon{
          position: relative;
          animation: sdFloat 3.8s ease-in-out infinite, sdGlow 2.6s ease-in-out infinite;
          animation-delay: var(--sd-delay), var(--sd-delay);
        }
        .sd-stats > div .sd-icon::after{
          content:"";
          position:absolute;
          inset:-6px;
          border-radius:9999px;
          pointer-events:none;
          box-shadow: 0 0 18px rgba(255,255,255,.18);
          opacity:.9;
        }

        /* 1st child = icon, 2nd = number, 3rd = label (inside each stat cell) */
        .sd-stats > div > div:nth-child(2){
          animation: sdPop 650ms ease-out both;
          animation-delay: calc(var(--sd-delay) + .06s);
        }
        .sd-stats > div > div:nth-child(3){
          animation: sdFadeUp 700ms ease-out both;
          animation-delay: calc(var(--sd-delay) + .12s);
        }
      `}</style>

      {/* header is fixed -> give page top padding */}
      <div className="pt-20 pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            {/* ABOUT_HERO_PREMIUM_LIGHT_V2 */}
            <section
              data-about-hero-style="premium-light-v2"
              aria-labelledby="about-hero-heading"
              className="relative overflow-hidden rounded-[36px] border border-blue-100/90 bg-[linear-gradient(120deg,#EEF4FF_0%,#F9FBFF_54%,#EAFBFF_100%)] shadow-[0_30px_90px_rgba(37,99,235,0.13)]"
            >
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
              />

              <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:p-10">
                <div className="py-2 lg:py-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-700 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                      India-focused learning platform
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/85 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                      <Sparkles className="h-4 w-4" />
                      AI-first capability
                    </span>
                  </div>

                  <h1
                    id="about-hero-heading"
                    className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[58px] lg:leading-[1.04]"
                  >
                    About Sikhadenge.
                    <span className="mt-2 block text-blue-600">
                      Practical AI capability for modern digital work.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-lg sm:leading-8">
                    Sikhadenge is an India-focused AI and skill learning platform built for students, freshers, freelancers, creators, working professionals, and career switchers who want structured learning, practical execution, and real digital output.
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                    Sikhadenge, operated by ThinkGrow Pvt. Ltd., connects professional tools, guided workflows, project-based implementation, and review-led improvement so learners build capability that remains useful as modern work evolves.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Students & freshers",
                      "Freelancers & creators",
                      "Working professionals",
                      "Career switchers",
                    ].map((audience) => (
                      <span
                        key={audience}
                        className="rounded-full border border-white/90 bg-white/75 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="/courses"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      Explore learning paths
                      <ChevronRight className="h-4 w-4" />
                    </a>

                    <a
                      href="/contact-us"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                    >
                      Talk to our team
                    </a>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/90 bg-white/70 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                        Learning approach
                      </p>
                      <p className="mt-2 font-bold text-slate-950">
                        Structured, practical and output-focused
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/90 bg-white/70 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                        Capability coverage
                      </p>
                      <p className="mt-2 font-bold text-slate-950">
                        Design, video, content, marketing and workflows
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative overflow-hidden rounded-[30px] border border-white/90 bg-white p-2 shadow-[0_28px_65px_rgba(15,23,42,0.16)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                      <Image
                        src="/images/about/about-hero-desk.webp"
                        alt="Sikhadenge practical AI and digital learning environment"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 48vw"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(2,6,23,0.72)_100%)]"
                      />

                      <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/15 bg-slate-950/75 p-4 text-white shadow-xl backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200 ring-1 ring-blue-300/25">
                            <Target className="h-5 w-5" />
                          </span>

                          <div>
                            <p className="font-bold">
                              AI-first digital capability
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-300">
                              Structured learning built around professional workflows, practical execution, guided review, and visible output.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:-bottom-7 lg:-left-7 lg:mt-0 lg:w-[calc(100%+3.5rem)]">
                    {[
                      ["01", "Learn with structure"],
                      ["02", "Build real output"],
                      ["03", "Improve with review"],
                    ].map(([step, label], index) => (
                      <div
                        key={step}
                        className="rounded-[20px] border border-white/90 bg-white/90 p-3.5 shadow-[0_14px_32px_rgba(15,23,42,0.10)] backdrop-blur"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold text-white",
                              index === 0
                                ? "bg-blue-600"
                                : index === 1
                                ? "bg-emerald-500"
                                : "bg-orange-500",
                            ].join(" ")}
                          >
                            {step}
                          </span>

                          <span className="text-xs font-bold leading-5 text-slate-800 sm:text-sm">
                            {label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT_FOUNDATION_CARDS_PREMIUM_V2 */}
            <section
              data-about-foundation-style="premium-cards-v2"
              aria-label="Sikhadenge learning foundations"
              className="mt-12"
            >
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
                    How we build capability
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-slate-950 sm:text-3xl">
                    Four foundations behind practical learning
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-right">
                  A connected learning system designed to move learners from direction to execution, visible output, and consistent improvement.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    number: "01",
                    title: "Structured learning",
                    desc: "Clear progression, guided sessions, and practical implementation built for serious learners.",
                    icon: GraduationCap,
                    tone: "blue" as const,
                  },
                  {
                    number: "02",
                    title: "Real output",
                    desc: "Assignments and workflows designed to build visible digital work and practical confidence.",
                    icon: BadgeCheck,
                    tone: "gold" as const,
                  },
                  {
                    number: "03",
                    title: "Future-ready relevance",
                    desc: "Capability built around how AI-assisted digital work, roles, and expectations are actually evolving.",
                    icon: Users,
                    tone: "blue" as const,
                  },
                  {
                    number: "04",
                    title: "Execution standards",
                    desc: "Guided review and quality checkpoints so progress stays consistent, useful, and measurable.",
                    icon: Sparkles,
                    tone: "gold" as const,
                  },
                ].map((foundation) => (
                  <article
                    key={foundation.title}
                    className="group relative min-h-[220px] overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_48px_rgba(37,99,235,0.12)]"
                  >
                    <div
                      aria-hidden="true"
                      className={[
                        "absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition group-hover:scale-110",
                        foundation.tone === "gold"
                          ? "bg-amber-200/35"
                          : "bg-blue-200/40",
                      ].join(" ")}
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={[
                            "flex h-12 w-12 items-center justify-center rounded-2xl ring-1",
                            foundation.tone === "gold"
                              ? "bg-amber-50 text-amber-700 ring-amber-100"
                              : "bg-blue-50 text-blue-700 ring-blue-100",
                          ].join(" ")}
                        >
                          <foundation.icon className="h-5 w-5" />
                        </span>

                        <span className="text-sm font-extrabold tracking-[0.12em] text-slate-300">
                          {foundation.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-lg font-extrabold text-slate-950">
                        {foundation.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {foundation.desc}
                      </p>

                      <div className="mt-auto pt-5">
                        <span
                          className={[
                            "inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em]",
                            foundation.tone === "gold"
                              ? "text-amber-700"
                              : "text-blue-700",
                          ].join(" ")}
                        >
                          Practical capability
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          {/* STATS BAR (icons on top + animated numbers) */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#01265B_0%,#001B44_100%)] shadow-[0_0_18px_rgba(37,99,235,0.35)]">
            <div className="grid md:grid-cols-4">
              {[
                { label: "STRUCTURED PROGRAMS", icon: Layers, value: 10, suffix: "+" },
                { label: "TRAINED LEARNERS", icon: BadgeCheck, value: 35, suffix: "K+" },
                { label: "LEARNER SATISFACTION", icon: Sparkles, value: 95, suffix: "%" },
                { label: "MENTORS & TRAINERS", icon: Users, value: 20, suffix: "+" },
              ].map((s, idx) => (
                <div
                  key={s.label}
                  className={[
                    "px-6 py-8 text-center",
                    idx !== 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : "",
                    "border-white/10",
                  ].join(" ")}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#01265B_0%,#001B44_100%)] aspect-square shrink-0 min-w-12 min-h-12 sd-icon">
                    <s.icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="mt-4 text-4xl font-bold tracking-tight text-white">
                    <AnimatedNumber
                      value={s.value}
                      suffix={s.suffix}
                      durationMs={900}
                      decimals={0}
                    />
                  </div>

                  <div className="mt-2 text-xs font-semibold tracking-[0.25em] text-white/90">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MISSION */}
          <Card className="mt-10 p-4 sm:p-6">
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--sd-border)] bg-white flex flex-col">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>MENTOR-LED LEARNING</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full shrink-0">
                  <Image
                    src="/images/about/about-mission-class.webp"
                    alt="Mission"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-auto p-4">
                  <div className="rounded-2xl border border-white/10 bg-[var(--sd-card)] p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="blue">
                        <Sparkles className="h-5 w-5 text-[#2563EB]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">
                          Applied learning + measurable improvement
                        </div>
                        <div className="mt-1 text-xs leading-5 text-[var(--sd-text-2)]">
                          Reviews and checkpoints so output quality improves consistently.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-full rounded-2xl border border-[var(--sd-border)] bg-white p-5 sm:p-7 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <IconBadge tone="blue">
                    <Users className="h-5 w-5 text-[#2563EB]" />
                  </IconBadge>
                  <h3 className="text-3xl font-bold">Our Mission</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  We are building a modern learning platform that helps serious learners move from scattered learning to structured, practical, AI-powered digital capability. Our focus is not just on exposing learners to tools, but on helping them understand how modern digital work actually gets done across design, content, video, marketing, websites, and execution-focused workflows.
                </p>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  Through guided sessions, practical assignments, project-based implementation, and AI-assisted workflows, we help learners build capability that can be applied in real digital work with clarity, confidence, and execution quality. We want learners to develop stronger practical understanding, better decision-making, and the ability to create useful output in fast-changing work environments.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>Practical learning</Pill>
                  <Pill>Industry workflows</Pill>
                  <Pill>Future-ready skills</Pill>
                </div>
              </div>
            </div>
          </Card>

          {/* GOAL */}
          <Card className="mt-10 p-4 sm:p-6">
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              <div className="h-full rounded-2xl border border-[var(--sd-border)] bg-white p-5 sm:p-7 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <IconBadge tone="gold">
                    <Target className="h-5 w-5 text-[#F5B301]" />
                  </IconBadge>
                  <h3 className="text-3xl font-bold">Our Goal</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  Our goal is to build a high-trust AI-first learning ecosystem that prepares learners for the next era of digital work across creative, content, marketing, website, and execution-focused roles. We want Sikhadenge to become a platform where learners do not just consume information, but build real capability that stays relevant as technology, workflows, and industry expectations continue to evolve.
                </p>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  We want learners across India to gain relevant digital capability with stronger structure, better direction, and practical exposure to how modern work is increasingly being done with AI. Our larger aim is to make high-quality, future-ready learning more practical, more execution-focused, and more aligned with the realities of today’s digital economy.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>AI-first ecosystem</Pill>
                    <Pill>Future of work</Pill>
                    <Pill>Practical relevance</Pill>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-[var(--sd-border)] bg-white">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>INDUSTRY-READY OUTPUT</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/about/about-goal-portfolio.webp"
                    alt="Goal"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="p-4">
                  <div className="rounded-2xl border border-[var(--sd-border)] bg-[var(--sd-card)] p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="gold">
                        <Briefcase className="h-5 w-5 text-[#F5B301]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">Modern digital work focus</div>
                        <div className="mt-1 text-xs leading-5 text-[var(--sd-text-2)]">
                          A practical and structured learning approach aligned with how AI is changing design, content, video, marketing, websites, and execution workflows.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Card>

          {/* DIFFERENT */}
          <div className="mt-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What makes Sikhadenge different?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--sd-text-2)] sm:text-base">
              A learning platform built around execution, review, structured progress, and real digital output — not passive content consumption or random tool chasing.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "AI-first learning",
                desc: "Learning built around modern AI-powered workflows, practical execution, and visible outcomes.",
                icon: Target,
                tone: "blue" as const,
              },
              {
                title: "Multi-domain capability",
                desc: "Capability across design, video, content, marketing, websites, and workflows instead of one isolated software skill.",
                icon: Wand2,
                tone: "gold" as const,
              },
              {
                title: "Guided learning + support",
                desc: "Clear guidance, review loops, and structured support so learners improve with consistency.",
                icon: MessagesSquare,
                tone: "blue" as const,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="min-h-[130px] rounded-3xl border border-[var(--sd-border)] bg-[var(--sd-card)] p-5"
              >
                <div className="flex items-start gap-3">
                  <IconBadge tone={c.tone}>
                    <c.icon
                      className={[
                        "h-5 w-5",
                        c.tone === "gold" ? "text-[#F5B301]" : "text-[#2563EB]",
                      ].join(" ")}
                    />
                  </IconBadge>
                  <div>
                    <div className="text-base font-semibold">{c.title}</div>
                    <div className="mt-1 text-sm leading-6 text-[var(--sd-text-2)]">{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          {/* WORKSHOPS */}
          <div className="mt-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Capability areas we focus on
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--sd-text-2)] sm:text-base">
              Practical capability areas designed to help learners build relevant digital skills across creative and execution-focused work.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Design with AI",
                desc: "Posters, social creatives, branding assets, layouts, and AI-assisted design execution for modern digital work.",
                icon: PencilRuler,
                tone: "blue" as const,
              },
              {
                title: "Edit Videos with AI",
                desc: "Short-form video workflows, reels, editing structure, storytelling, and AI-assisted production output.",
                icon: Video,
                tone: "gold" as const,
              },
              {
                title: "Create Content with AI Creation",
                desc: "Content ideation, writing support, scripts, captions, creative assets, and content production systems.",
                icon: Bot,
                tone: "blue" as const,
              },
              {
                title: "Market with AI Assets",
                desc: "Ad creatives, campaign assets, launch materials, communication visuals, and practical marketing execution.",
                icon: Briefcase,
                tone: "gold" as const,
              },
            ].map((w) => (
              <div
                key={w.title}
                className="min-h-[150px] rounded-3xl border border-[var(--sd-border)] bg-[var(--sd-card)] p-5"
              >
                <div className="flex items-start gap-3">
                  <IconBadge tone={w.tone}>
                    <w.icon
                      className={[
                        "h-5 w-5",
                        w.tone === "gold" ? "text-[#F5B301]" : "text-[#2563EB]",
                      ].join(" ")}
                    />
                  </IconBadge>
                  <div>
                    <div className="text-base font-semibold">{w.title}</div>
                    <div className="mt-1 text-sm leading-6 text-[var(--sd-text-2)]">{w.desc}</div>
                    <div className="mt-6 text-xs text-[var(--sd-text-3)]">
                      Practical • Output-focused
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WHAT DO WE DO + TEAM */}
          <Card className="mt-10 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--sd-border)] bg-white p-5 sm:p-7">
                <h3 className="text-2xl font-bold">What do we do?</h3>

                <div className="mt-6 space-y-5">
                  {[
                    "We help learners build practical AI-powered capability across design, video, content, marketing, websites, and workflows so they can produce real digital output with stronger clarity, better execution, and more modern work readiness.",
                    "We run structured learning with guided sessions, assignments, review cycles, implementation checkpoints, and practical feedback — not just lectures.",
                    "We focus on helping learners create real digital output with stronger clarity, confidence, execution quality, and a more practical understanding of how modern AI-assisted work actually gets done.",
                    "We provide structured support so learner progress stays consistent, measurable, and aligned with the standards of the modern digital work environment.",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sd-border)] bg-white shadow-[0_0_18px_rgba(37,99,235,0.25)] aspect-square shrink-0 min-w-10 min-h-10">
                        <ArrowRight className="h-5 w-5 text-[#2563EB]" />
                      </span>
                      <div className="text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>                <div className="relative overflow-hidden rounded-2xl border border-[var(--sd-border)] bg-white">
                  <div className="absolute left-4 top-4 z-10">
                    <Pill>GUIDED LEARNING</Pill>
                  </div>
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src="/images/about/about-whatwedo-group.webp"
                      alt="Guided Learning"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="rounded-2xl border border-[var(--sd-border)] bg-[var(--sd-card)] p-4">
                      <div className="flex items-start gap-3">
                        <IconBadge tone="blue">
                          <Users className="h-5 w-5 text-[#2563EB]" />
                        </IconBadge>
                        <div>
                          <div className="text-sm font-semibold">
                            Structured support + guided progress
                          </div>
                          <div className="mt-1 text-xs leading-5 text-[var(--sd-text-2)]">
                            Learners improve through guided sessions, review cycles, implementation checkpoints, and practical feedback.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </Card>

          {/* Footer spacing end */}
        </div>
      </div>
    </main>
  );
}

function ArrowRight(props: { className?: string }) {
  return <ChevronRight {...props} />;
}