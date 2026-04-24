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
          {/* HERO TITLE */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[40px]">
              About Sikhadenge
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[var(--sd-text-2)] sm:text-base">
              Sikhadenge is an India-focused AI and skill learning platform built for students, freshers, freelancers, creators, working professionals, and career switchers who want to build practical digital capability for the modern work economy.
            </p>
          </div>

          {/* HERO MAIN CARD */}
          <Card className="mt-10 p-4 sm:p-6">
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              {/* left image card */}
              <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--sd-border)] bg-white flex flex-col">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>ABOUT SIKHADENGE</Pill>
                </div>

                <div className="relative aspect-[16/11] w-full shrink-0">
                  <Image
                    src="/images/about/about-hero-desk.webp"
                    alt="About Sikhadenge"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* small overlay feature */}
                <div className="mt-auto p-4">
                  <div className="rounded-2xl border border-[var(--sd-border)] bg-[var(--sd-card)] p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="blue">
                        <Target className="h-5 w-5 text-[#2563EB]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">AI-first digital capability</div>
                        <div className="mt-1 text-xs leading-5 text-[var(--sd-text-2)]">
                          Structured learning designed around modern digital workflows, practical execution, and real output.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right text card */}
              <div className="h-full rounded-2xl border border-[var(--sd-border)] bg-white p-5 sm:p-7 flex flex-col justify-center">
                <div className="inline-flex">
                  <Pill>About us</Pill>
                </div>

                <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                  We help learners build practical, modern digital capability with AI.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  Sikhadenge (ThinkGrow Pvt. Ltd.) builds practical, future-ready learning that develops real, industry-relevant
                  skills in design and creative technologies — with professional tools and real workflows.
                </p>

                <p className="mt-4 text-sm leading-7 text-[var(--sd-text-2)] sm:text-base">
                  Less theory, more capability. We focus on applied projects, structured execution, and continuous improvement so
                  learners stay ready for evolving roles.
                </p>
              </div>
            </div>
          </Card>

          {/* HERO BOTTOM 4 CARDS (SEPARATE CONTAINER) */}
          <Card className="mt-6 p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Structured learning",
                  desc: "Clear progression, guided sessions, and practical implementation built for serious learners.",
                  icon: GraduationCap,
                  tone: "blue" as const,
                },
                {
                  title: "Real output",
                  desc: "Assignments and workflows designed to build visible digital work and practical confidence.",
                  icon: BadgeCheck,
                  tone: "gold" as const,
                },
                {
                  title: "Future-ready relevance",
                  desc: "Capability built around how modern digital work is actually evolving.",
                  icon: Users,
                  tone: "blue" as const,
                },
                {
                  title: "Execution standards",
                  desc: "Guided review and quality checkpoints so progress stays consistent and measurable.",
                  icon: Sparkles,
                  tone: "gold" as const,
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="min-h-[110px] rounded-2xl border border-white/10 bg-[var(--sd-card)] p-4"
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
                      <div className="text-sm font-semibold">{c.title}</div>
                      <div className="mt-1 text-xs leading-5 text-white/72">
                        {c.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

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