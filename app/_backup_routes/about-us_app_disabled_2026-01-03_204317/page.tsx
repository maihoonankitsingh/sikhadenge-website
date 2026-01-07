import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Wrench,
  Users,
  Trophy,
  GraduationCap,
  Layers,
  Globe,
  ArrowRight,
} from "lucide-react";

const BRAND = {
  bg: "#0B1220",
  surface: "#111827",
  border: "rgba(255,255,255,0.10)",
  primary: "#2563EB",
  blueDark: "#1D4ED8",
  gold: "#F5B301",
  text: "#FFFFFF",
  text2: "#B0B7C3",
  muted: "#9CA3AF",
};

function NeonIcon({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "gold";
}) {
  const glow =
    tone === "gold"
      ? "shadow-[0_0_18px_rgba(245,179,1,0.55)]"
      : "shadow-[0_0_18px_rgba(37,99,235,0.55)]";

  const ring =
    tone === "gold"
      ? "bg-[linear-gradient(135deg,rgba(245,179,1,0.55),rgba(255,255,255,0.10),rgba(245,179,1,0.20))]"
      : "bg-[linear-gradient(135deg,rgba(37,99,235,0.55),rgba(255,255,255,0.10),rgba(37,99,235,0.20))]";

  return (
    <div className={`p-[1px] rounded-2xl ${ring} ${glow}`}>
      <div
        className="rounded-2xl h-11 w-11 grid place-items-center"
        style={{
          background: "rgba(17,24,39,0.70)",
          border: `1px solid ${BRAND.border}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  subtitle,
  center = false,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-wide"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${BRAND.border}`,
            color: BRAND.text2,
          }}
        >
          <span
            className="h-2 w-2 rounded-sm"
            style={{ background: BRAND.gold }}
          />
          <span className="uppercase">{kicker}</span>
        </div>
      ) : null}

      <h2
        className={`mt-4 font-semibold leading-tight ${
          center ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"
        }`}
        style={{ color: BRAND.text }}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-3 text-sm md:text-base ${
            center ? "mx-auto max-w-3xl" : "max-w-2xl"
          }`}
          style={{ color: BRAND.text2 }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
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
      className={`rounded-3xl ${className}`}
      style={{
        background: "rgba(17,24,39,0.55)",
        border: `1px solid ${BRAND.border}`,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

function MediaCard({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.15),rgba(11,18,32,0.72))]" />
      </div>

      <div className="relative p-5 md:p-6">
        <div
          className="inline-flex items-center rounded-full px-3 py-1 text-xs"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: `1px solid ${BRAND.border}`,
            color: BRAND.text2,
          }}
        >
          {label}
        </div>

        <div className="mt-40 md:mt-44">
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(17,24,39,0.55)",
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div className="text-sm font-semibold" style={{ color: BRAND.text }}>
              Vetted for practical upskilling
            </div>
            <div className="mt-1 text-xs leading-relaxed" style={{ color: BRAND.text2 }}>
              Daily practice + mentor review. Learners improve output quality with a repeatable learning system.
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function AboutUsPage() {
  return (
    <main
      style={{ background: BRAND.bg, color: BRAND.text }}
      className="min-h-screen"
    >
      {/* PAGE BACKDROP */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-0 right-0 h-[520px] bg-[radial-gradient(900px_520px_at_20%_10%,rgba(37,99,235,0.28),transparent_60%)]" />
          <div className="absolute -top-24 left-0 right-0 h-[520px] bg-[radial-gradient(900px_520px_at_80%_10%,rgba(245,179,1,0.18),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-24 md:pt-28 pb-14">
          {/* TOP TITLE */}
          <Card className="px-6 py-7 md:px-10 md:py-9">
            <div className="text-xs tracking-[0.30em]" style={{ color: BRAND.muted }}>
              SIKHADENGE
            </div>
            <div className="mt-1 text-4xl md:text-5xl font-semibold">About</div>
            <div
              className="mt-4 h-px"
              style={{ background: "rgba(255,255,255,0.10)" }}
            />
          </Card>

          {/* WHO WE ARE - EXACT STYLE (2 COLUMN) */}
          <div className="mt-10">
            <SectionTitle
              center
              title="Who we are?"
              subtitle="Sikhadenge is a mentor-led upskilling institute. We deliver structured live online training for Graphic Design, Video Editing, Motion Graphics, and AI-powered creative workflows — focused on real projects, strong fundamentals, and portfolio output."
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <MediaCard
                src="/images/about/about-hero-desk.webp"
                label="Mentor-led class session"
                className="min-h-[360px]"
              />

              <Card className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: `1px solid ${BRAND.border}`,
                      color: BRAND.text2,
                    }}
                  >
                    About us
                  </div>

                  <h3 className="mt-4 text-2xl md:text-3xl font-semibold leading-tight">
                    We’re not just a platform — we’re a learning system.
                  </h3>

                  <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: BRAND.text2 }}>
                    Clear roadmap, daily tasks, mentor feedback, and repeatable workflows — so learners build confidence and ship professional work consistently.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3">
                    <NeonIcon tone="blue">
                      <Sparkles size={18} />
                    </NeonIcon>
                    <div>
                      <div className="text-sm font-semibold">Outcome-first learning</div>
                      <div className="text-xs mt-1" style={{ color: BRAND.text2 }}>
                        Real assignments + portfolio builds so work is presentable and industry-aligned.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <NeonIcon tone="gold">
                      <Wrench size={18} />
                    </NeonIcon>
                    <div>
                      <div className="text-sm font-semibold">Industry-standard tools</div>
                      <div className="text-xs mt-1" style={{ color: BRAND.text2 }}>
                        Adobe stack + modern AI support with professional workflows.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <NeonIcon tone="blue">
                      <Users size={18} />
                    </NeonIcon>
                    <div>
                      <div className="text-sm font-semibold">Mentor support + community</div>
                      <div className="text-xs mt-1" style={{ color: BRAND.text2 }}>
                        Corrections, doubt support, and review-based improvement to keep consistency high.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/counselling"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                    style={{ background: BRAND.primary, color: BRAND.text }}
                  >
                    Counselling <ArrowRight className="ml-2" size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${BRAND.border}`,
                      color: BRAND.text,
                    }}
                  >
                    Contact
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${BRAND.border}`,
                      color: BRAND.text,
                    }}
                  >
                    Explore Courses
                  </Link>
                </div>
              </Card>
            </div>
          </div>

          {/* LIGHT SECTION (TROPHY + TEXT) */}
          <div className="mt-12">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))",
                border: `1px solid rgba(0,0,0,0.08)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10 items-center">
                <div className="flex items-center justify-center">
                  <div className="rounded-3xl p-6"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.18)",
                    }}
                  >
                    <Trophy size={56} color={BRAND.blueDark} />
                  </div>
                </div>

                <div>
                  <div
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: "rgba(17,24,39,0.70)" }}
                  >
                    What we are working towards
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-semibold" style={{ color: "#0B1220" }}>
                    To build India&apos;s most practical Design & Editing school
                  </div>
                  <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "rgba(17,24,39,0.75)" }}>
                    Strong fundamentals + modern workflows + daily practice — so every learner completes a clean portfolio and becomes job-ready.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION + GOAL (IMAGE + TEXT) */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-7 md:p-8">
              <h3 className="text-4xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: BRAND.text2 }}>
                To build Skilled India creators through a repeatable, outcome-driven learning system — where learners gain fundamentals, execution speed, and professional presentation standards.
              </p>

              <div className="mt-6 flex items-start gap-3">
                <NeonIcon tone="blue">
                  <Sparkles size={18} />
                </NeonIcon>
                <div>
                  <div className="text-sm font-semibold">Practice + feedback loop</div>
                  <div className="text-xs mt-1" style={{ color: BRAND.text2 }}>
                    Daily tasks, mentor review, and corrections to push output quality consistently.
                  </div>
                </div>
              </div>
            </Card>

            <MediaCard
              src="/images/about/about-mission-class.webp"
              label="Mentor-led class session"
              className="min-h-[320px]"
            />

            <MediaCard
              src="/images/about/about-goal-portfolio.webp"
              label="Goal-driven learning"
              className="min-h-[320px]"
            />

            <Card className="p-7 md:p-8">
              <h3 className="text-4xl font-semibold">Our Goal</h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: BRAND.text2 }}>
                To build India&apos;s most practical design & editing school — where every learner finishes a clean portfolio, becomes confident for jobs/internships/freelancing, and delivers professional-level work.
              </p>

              <div className="mt-6 flex items-start gap-3">
                <NeonIcon tone="gold">
                  <Trophy size={18} />
                </NeonIcon>
                <div>
                  <div className="text-sm font-semibold">Portfolio-ready output</div>
                  <div className="text-xs mt-1" style={{ color: BRAND.text2 }}>
                    Real briefs, clean presentation, and workflows aligned with industry expectations.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* STATS BAR */}
          <div className="mt-12">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.blueDark})`,
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                  { big: "10+", small: "CURATED MODULES" },
                  { big: "1000+", small: "LEARNERS (RECENT)" },
                  { big: "4 MONTH", small: "LIVE PROGRAM" },
                  { big: "DAILY", small: "PRACTICE + REVIEW" },
                ].map((x) => (
                  <div
                    key={x.small}
                    className="p-6 md:p-7 text-center border-r last:border-r-0"
                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                  >
                    <div className="text-3xl md:text-4xl font-semibold">{x.big}</div>
                    <div className="mt-1 text-[11px] tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {x.small}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT MAKES TRAINING SPECIAL */}
          <div className="mt-14">
            <div className="text-xs tracking-[0.30em]" style={{ color: BRAND.muted }}>
              THIS IS WHAT MAKES OUR TRAINING SPECIAL
            </div>
            <div className="mt-3 text-4xl md:text-6xl font-semibold leading-tight">
              Get one-of-a-kind workshops with
            </div>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: <GraduationCap size={18} />, t: "Best-in-class mentors", tone: "blue" as const },
                { icon: <Layers size={18} />, t: "Immersive & cohort learning", tone: "gold" as const },
                { icon: <Users size={18} />, t: "Access to community", tone: "blue" as const },
                { icon: <Globe size={18} />, t: "Learn beyond borders", tone: "gold" as const },
              ].map((x) => (
                <Card key={x.t} className="p-4 flex items-center gap-3">
                  <NeonIcon tone={x.tone}>{x.icon}</NeonIcon>
                  <div className="text-sm font-semibold">{x.t}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* WHAT DO WE DO (LEFT TEXT + RIGHT IMAGE) */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <Card className="p-7 md:p-8">
              <h3 className="text-4xl md:text-5xl font-semibold">What do we do?</h3>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-sm font-semibold">Job-ready mentorship programs</div>
                  <div className="text-sm mt-1" style={{ color: BRAND.text2 }}>
                    Live sessions + assignments + review to build professional output quality.
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold">Project & scenario based learning</div>
                  <div className="text-sm mt-1" style={{ color: BRAND.text2 }}>
                    Real tasks: posters, branding, edits, motion, and portfolio builds.
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold">Together till last mile</div>
                  <div className="text-sm mt-1" style={{ color: BRAND.text2 }}>
                    Structured path so learners stay consistent and complete modules.
                  </div>
                </div>
              </div>

              <div className="mt-7 text-xs" style={{ color: BRAND.muted }}>
                Sikhadenge is operated under ThinkGrow Pvt. Ltd.
              </div>
            </Card>

            <MediaCard
              src="/images/about/about-whatwedo-group.webp"
              label="Learners and mentors"
              className="min-h-[360px]"
            />
          </div>

          {/* CTA */}
          <div className="mt-14">
            <Card className="p-7 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold">
                    Need training / collaboration details?
                  </div>
                  <div className="mt-2 text-sm" style={{ color: BRAND.text2 }}>
                    For training / collaboration queries, use the form category.
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/contact#contact-form"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                      style={{ background: BRAND.primary, color: BRAND.text }}
                    >
                      Go to form <ArrowRight className="ml-2" size={16} />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${BRAND.border}`,
                        color: BRAND.text,
                      }}
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                <div
                  className="rounded-3xl p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.20), rgba(17,24,39,0.55), rgba(245,179,1,0.12))",
                    border: `1px solid ${BRAND.border}`,
                  }}
                >
                  <div className="text-sm font-semibold">Response</div>
                  <div className="mt-1 text-sm" style={{ color: BRAND.text2 }}>
                    We usually reply within 24 hours.
                  </div>
                  <div className="mt-3 text-xs" style={{ color: BRAND.muted }}>
                    Parent company: ThinkGrow Pvt. Ltd.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10 pb-8" />
        </div>
      </div>
    </main>
  );
}

