import Image from "next/image";
import Link from "next/link";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  BadgeCheck,
  Bot,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Layers,
  MessagesSquare,
  PencilRuler,
  Sparkles,
  Target,
  Users,
  Video,
  Wand2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sikhadenge is a premium skill-training brand by ThinkGrow Pvt. Ltd., focused on outcomes, portfolios, and industry-ready creative skills.",
  alternates: {
    canonical: "https://sikhadenge.in/about-us",
  },
  openGraph: {
    type: "website",
    url: "https://sikhadenge.in/about-us",
    title: "About Sikhadenge",
    description:
      "Mission, goal, and an outcome-focused training approach built for portfolios and careers.",
    images: [
      {
        url: "/images/about/about-hero-desk.webp",
        width: 1200,
        height: 630,
        alt: "Sikhadenge training workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sikhadenge",
    description:
      "Mission, goal, and an outcome-focused training approach built for portfolios and careers.",
    images: ["/images/about/about-hero-desk.webp"],
  },
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
      ? "shadow-[0_0_18px_rgba(37,99,235,0.55)]"
      : "shadow-none";

  const bg =
    tone === "gold"
      ? "bg-[#111827] border border-white/10"
      : tone === "blue"
      ? "bg-[#111827] border border-white/10"
      : "bg-[#111827] border border-white/10";

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
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#B0B7C3]">
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
        "rounded-3xl border border-white/10 bg-[#111827]/70 backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
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
      <div className="pt-24 pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* HERO TITLE */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Who we are?
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#B0B7C3] sm:text-base">
              A structured learning system designed for consistency, clarity, and professional output — aligned with practical outcomes.
            </p>
          </div>

          {/* HERO MAIN CARD */}
          <Card className="mt-10 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* left image card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>ABOUT SIKHADENGE</Pill>
                </div>

                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/about/about-hero-desk.webp"
                    alt="About Sikhadenge"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* small overlay feature */}
                <div className="p-4">
                  <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="blue">
                        <Target className="h-5 w-5 text-[#2563EB]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">Outcome-first execution</div>
                        <div className="mt-1 text-xs leading-5 text-[#B0B7C3]">
                          Daily practice + mentor review for clean, industry-ready output.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right text card */}
              <div className="rounded-2xl border border-white/10 bg-[#0B1220]/30 p-5 sm:p-7">
                <div className="inline-flex">
                  <Pill>About us</Pill>
                </div>

                <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                  We’re not just a platform — we’re a movement.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
                  Sikhadenge (ThinkGrow Pvt. Ltd.) builds practical, future-ready learning that develops real, industry-relevant
                  skills in design and creative technologies — with professional tools and real workflows.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
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
                  title: "Mentor-led learning",
                  desc: "Clear guidance, feedback, and checkpoints for consistency.",
                  icon: GraduationCap,
                  tone: "blue" as const,
                },
                {
                  title: "Practical outcomes",
                  desc: "Projects that build capability and professional confidence.",
                  icon: BadgeCheck,
                  tone: "gold" as const,
                },
                {
                  title: "Skilled India focus",
                  desc: "A system designed for real skill and long-term growth.",
                  icon: Users,
                  tone: "blue" as const,
                },
                {
                  title: "Quality standards",
                  desc: "Review cycles so output stays professional and measurable.",
                  icon: Sparkles,
                  tone: "gold" as const,
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="min-h-[110px] rounded-2xl border border-white/10 bg-[#111827]/60 p-4"
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
                      <div className="mt-1 text-xs leading-5 text-[#B0B7C3]">
                        {c.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* STATS BAR (icons on top + animated numbers) */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#2563EB] shadow-[0_0_18px_rgba(37,99,235,0.55)]">
            <div className="grid md:grid-cols-4">
              {[
                { label: "CURATED COURSES", icon: Layers, value: 10, suffix: "+" },
                { label: "CERTIFIED STUDENTS", icon: BadgeCheck, value: 12, suffix: "K+" },
                { label: "COMPLETION RATE", icon: Sparkles, value: 95, suffix: "%" },
                { label: "EXPERT INSTRUCTORS", icon: Users, value: 20, suffix: "+" },
              ].map((s, idx) => (
                <div
                  key={s.label}
                  className={[
                    "px-6 py-8 text-center",
                    idx !== 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : "",
                    "border-white/10",
                  ].join(" ")}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 aspect-square shrink-0 min-w-12 min-h-12 sd-icon">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="mt-4 text-4xl font-extrabold tracking-tight">
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
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>MENTOR-LED LEARNING</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/about/about-mission-class.webp"
                    alt="Mission"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="blue">
                        <Sparkles className="h-5 w-5 text-[#2563EB]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">
                          Applied learning + measurable improvement
                        </div>
                        <div className="mt-1 text-xs leading-5 text-[#B0B7C3]">
                          Reviews and checkpoints so output quality improves consistently.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1220]/30 p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <IconBadge tone="blue">
                    <Users className="h-5 w-5 text-[#2563EB]" />
                  </IconBadge>
                  <h3 className="text-3xl font-extrabold">Our Mission</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
                  Build job-ready creative professionals through hands-on training, real workflows, and measurable output standards.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
                  A system built for consistency: learn, practice, get reviewed, improve — and ship portfolio-level work.
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
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0B1220]/30 p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <IconBadge tone="gold">
                    <Target className="h-5 w-5 text-[#F5B301]" />
                  </IconBadge>
                  <h3 className="text-3xl font-extrabold">Our Goal</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
                  Build a multi-domain skill education ecosystem that grows with the future of work — expanding beyond today’s
                  specializations into high-impact fields.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#B0B7C3] sm:text-base">
                  We bridge learning with long-term career growth through modern curricula, continuous innovation, and outcome-focused
                  execution across India.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>Multi-domain ecosystem</Pill>
                  <Pill>Future of work</Pill>
                  <Pill>Career growth</Pill>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>INDUSTRY-READY OUTPUT</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/about/about-goal-portfolio.webp"
                    alt="Goal"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="p-4">
                  <div className="rounded-2xl border border-white/10 bg-[#111827]/70 p-4">
                    <div className="flex items-start gap-3">
                      <IconBadge tone="gold">
                        <Briefcase className="h-5 w-5 text-[#F5B301]" />
                      </IconBadge>
                      <div>
                        <div className="text-sm font-semibold">Future-of-work ecosystem</div>
                        <div className="mt-1 text-xs leading-5 text-[#B0B7C3]">
                          Expanding domains while staying outcome-first, structured, and industry-aligned.
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
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              What makes Sikhadenge different?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#B0B7C3] sm:text-base">
              A brand built around execution, review, and professional output — not just content delivery.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Outcome-first learning",
                desc: "Daily execution + review to build presentable, market-ready output.",
                icon: Target,
                tone: "blue" as const,
              },
              {
                title: "AI-enabled creative skills",
                desc: "Modern workflows aligned with current and future industry needs.",
                icon: Wand2,
                tone: "gold" as const,
              },
              {
                title: "Mentor support + community",
                desc: "Guidance, corrections, and structured improvement cycles.",
                icon: MessagesSquare,
                tone: "blue" as const,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="min-h-[130px] rounded-3xl border border-white/10 bg-[#111827]/70 p-5"
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
                    <div className="mt-1 text-sm leading-6 text-[#B0B7C3]">{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          {/* WORKSHOPS */}
          <div className="mt-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get one-of-a-kind workshops
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#B0B7C3] sm:text-base">
              Practical sessions designed for real skills and real outcomes.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Graphic Design",
                desc: "Systems + workflows that match industry delivery.",
                icon: PencilRuler,
                tone: "blue" as const,
              },
              {
                title: "Video Editing",
                desc: "Editing structure, speed, and output quality.",
                icon: Video,
                tone: "gold" as const,
              },
              {
                title: "AI Creative Workflows",
                desc: "Tooling + execution aligned with modern teams.",
                icon: Bot,
                tone: "blue" as const,
              },
              {
                title: "Career Workshops",
                desc: "Portfolio, presentation, and professional readiness.",
                icon: Briefcase,
                tone: "gold" as const,
              },
            ].map((w) => (
              <div
                key={w.title}
                className="min-h-[150px] rounded-3xl border border-white/10 bg-[#111827]/70 p-5"
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
                    <div className="mt-1 text-sm leading-6 text-[#B0B7C3]">{w.desc}</div>
                    <div className="mt-6 text-xs text-[#9CA3AF]">
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
              <div className="rounded-2xl border border-white/10 bg-[#0B1220]/30 p-5 sm:p-7">
                <h3 className="text-2xl font-extrabold">What do we do?</h3>

                <div className="mt-6 space-y-5">
                  {[
                    "Build AI-enabled creative skills with structured execution and clear standards.",
                    "Run mentor-led learning with assignments, reviews, and quality checkpoints.",
                    "Help learners produce market-ready work with professional presentation.",
                    "Provide structured support so progress stays consistent and measurable.",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(37,99,235,0.25)] aspect-square shrink-0 min-w-10 min-h-10">
                        <ArrowRight className="h-5 w-5 text-[#2563EB]" />
                      </span>
                      <div className="text-sm leading-7 text-[#B0B7C3] sm:text-base">
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="absolute left-4 top-4 z-10">
                  <Pill>Team</Pill>
                </div>
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/images/about/about-whatwedo-group.webp"
                    alt="Team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
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
