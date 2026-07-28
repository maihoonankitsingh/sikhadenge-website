import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  GraduationCap,
  Lightbulb,
  Link2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WandSparkles,
} from "lucide-react";

export type GeneratedFaq = {
  q: string;
  a: string;
};

export type GeneratedLink = {
  href: string;
  label: string;
  description?: string;
};

export type GeneratedHighlight = {
  title: string;
  description: string;
  icon?: GeneratedIconName;
};

export type GeneratedStep = {
  title: string;
  description: string;
  meta?: string;
};

export type GeneratedTool = {
  name: string;
  description: string;
  label?: string;
};

export type GeneratedJourneyStep = {
  label: string;
  icon?: GeneratedIconName;
};

export type GeneratedComparisonTable = {
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
};

type GeneratedIconName =
  | "answer"
  | "book"
  | "bot"
  | "check"
  | "graduate"
  | "idea"
  | "link"
  | "search"
  | "shield"
  | "sparkles"
  | "target"
  | "users"
  | "wand";

type GeneratedPageLayoutProps = {
  breadcrumbs: GeneratedLink[];
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
  answerTitle: string;
  answer: string;
  journey?: GeneratedJourneyStep[];
  highlights: GeneratedHighlight[];
  useCases?: GeneratedHighlight[];
  useCasesTitle?: string;
  steps: GeneratedStep[];
  comparisonTable?: GeneratedComparisonTable;
  tools?: GeneratedTool[];
  mistakes?: string[];
  faqs: GeneratedFaq[];
  relatedLinks?: GeneratedLink[];
  updatedAt: string;
  authorLabel?: string;
  authorHref?: string;
  primaryCta: GeneratedLink;
  secondaryCta?: GeneratedLink;
  theme?: "dark" | "light";
  children?: ReactNode;
};

const THEME_VARS: Record<"dark" | "light", Record<string, string>> = {
  dark: {
    "--gpk-bg": "#0B1220",
    "--gpk-text": "#FFFFFF",
    "--gpk-muted": "#B0B7C3",
    "--gpk-muted-2": "#C5CBD5",
    "--gpk-muted-3": "#D6DAE1",
    "--gpk-faint": "#9CA3AF",
    "--gpk-accent-text": "#76A3FF",
    "--gpk-accent-text-2": "#9BBCFF",
    "--gpk-gold-text": "#F5B301",
    "--gpk-border": "rgba(255,255,255,0.10)",
    "--gpk-border-strong": "rgba(255,255,255,0.15)",
    "--gpk-card-bg": "rgba(17,24,39,0.75)",
    "--gpk-card-bg-strong": "rgba(17,24,39,0.80)",
    "--gpk-card-shadow": "0 20px 70px rgba(0,0,0,0.24)",
    "--gpk-fill": "rgba(255,255,255,0.05)",
    "--gpk-fill-2": "rgba(255,255,255,0.04)",
    "--gpk-fill-3": "rgba(255,255,255,0.03)",
    "--gpk-header-gradient":
      "radial-gradient(900px_520px_at_18%_10%,rgba(37,99,235,0.24),transparent_62%),radial-gradient(640px_420px_at_88%_8%,rgba(245,179,1,0.10),transparent_65%)",
    "--gpk-dot-color": "white",
  },
  light: {
    "--gpk-bg": "#F6F7FB",
    "--gpk-text": "#0F172A",
    "--gpk-muted": "#475569",
    "--gpk-muted-2": "#334155",
    "--gpk-muted-3": "#1E293B",
    "--gpk-faint": "#64748B",
    "--gpk-accent-text": "#1D4ED8",
    "--gpk-accent-text-2": "#2563EB",
    "--gpk-gold-text": "#B45309",
    "--gpk-border": "rgba(15,23,42,0.10)",
    "--gpk-border-strong": "rgba(15,23,42,0.16)",
    "--gpk-card-bg": "rgba(255,255,255,0.92)",
    "--gpk-card-bg-strong": "#FFFFFF",
    "--gpk-card-shadow": "0 12px 34px rgba(15,23,42,0.08)",
    "--gpk-fill": "rgba(15,23,42,0.035)",
    "--gpk-fill-2": "rgba(15,23,42,0.03)",
    "--gpk-fill-3": "rgba(15,23,42,0.025)",
    "--gpk-header-gradient":
      "radial-gradient(900px_520px_at_18%_10%,rgba(37,99,235,0.10),transparent_62%),radial-gradient(640px_420px_at_88%_8%,rgba(245,179,1,0.08),transparent_65%)",
    "--gpk-dot-color": "#0F172A",
  },
};

const ICONS: Record<GeneratedIconName, typeof Sparkles> = {
  answer: FileCheck2,
  book: BookOpen,
  bot: Bot,
  check: CheckCircle2,
  graduate: GraduationCap,
  idea: Lightbulb,
  link: Link2,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  wand: WandSparkles,
};

function IconOrb({
  name = "sparkles",
  tone = "blue",
  size = "md",
}: {
  name?: GeneratedIconName;
  tone?: "blue" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  const Icon = ICONS[name];
  const boxSize =
    size === "lg" ? "h-16 w-16 rounded-[22px]" : size === "sm" ? "h-10 w-10 rounded-xl" : "h-12 w-12 rounded-2xl";
  const iconSize = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const toneClasses =
    tone === "gold"
      ? "border-[#F5B301]/35 bg-[linear-gradient(145deg,rgba(245,179,1,0.30),rgba(245,179,1,0.06))] text-[#F5B301] shadow-[0_14px_34px_rgba(245,179,1,0.22)]"
      : "border-[#2563EB]/40 bg-[linear-gradient(145deg,rgba(37,99,235,0.34),rgba(37,99,235,0.07))] text-[#76A3FF] shadow-[0_14px_34px_rgba(37,99,235,0.25)]";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden border ${boxSize} ${toneClasses}`}
      aria-hidden="true"
    >
      <span className="absolute inset-x-2 top-1 h-px bg-white/45" />
      <span className="absolute -bottom-4 -right-4 h-10 w-10 rounded-full bg-white/10 blur-xl" />
      <Icon className={`relative ${iconSize}`} strokeWidth={1.8} />
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon = "sparkles",
  tone = "blue",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: GeneratedIconName;
  tone?: "blue" | "gold";
}) {
  return (
    <div className="mb-7 flex items-start gap-4">
      <IconOrb name={icon} tone={tone} />
      <div>
        <div
          className={`text-[11px] font-bold uppercase tracking-[0.22em] ${tone === "gold" ? "text-[var(--gpk-gold-text)]" : "text-[var(--gpk-accent-text)]"}`}
        >
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--gpk-text)] sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--gpk-muted)] sm:text-base">{description}</p> : null}
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-[var(--gpk-border)] bg-[var(--gpk-card-bg)] shadow-[var(--gpk-card-shadow)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function GeneratedPageLayout({
  breadcrumbs,
  eyebrow,
  title,
  description,
  badges = [],
  answerTitle,
  answer,
  journey = [],
  highlights,
  useCases = [],
  useCasesTitle = "Where this applies in real work",
  steps,
  comparisonTable,
  tools = [],
  mistakes = [],
  faqs,
  relatedLinks = [],
  updatedAt,
  authorLabel = "Sikhadenge Editorial Team",
  authorHref = "/authors/sikhadenge-editorial-team",
  primaryCta,
  secondaryCta,
  theme = "dark",
  children,
}: GeneratedPageLayoutProps) {
  const vars = THEME_VARS[theme];
  return (
    <main
      className="min-h-screen bg-[var(--gpk-bg)] text-[var(--gpk-text)] selection:bg-[#2563EB]/40"
      style={vars as CSSProperties}
    >
      <header className="relative overflow-hidden border-b border-[var(--gpk-border)] pt-24">
        <div className="absolute inset-0 bg-[image:var(--gpk-header-gradient)]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,_var(--gpk-dot-color)_1px,_transparent_1px)] [background-size:20px_20px]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[var(--gpk-faint)]">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.href}-${item.label}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <Link href={item.href} className="transition hover:text-[var(--gpk-text)]">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_310px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/35 bg-[#2563EB]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gpk-accent-text-2)]">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--gpk-muted-2)] sm:text-lg">{description}</p>
              {badges.length > 0 ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  {badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-[var(--gpk-border)] bg-[var(--gpk-fill)] px-4 py-2 text-xs font-semibold text-[var(--gpk-muted-3)]">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <GlassCard className="relative p-6">
              <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-[#2563EB]/20 blur-3xl" />
              <IconOrb name="answer" tone="gold" size="lg" />
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gpk-gold-text)]">Answer first</div>
              <div className="mt-2 text-lg font-bold">{answerTitle}</div>
              <p className="mt-3 text-sm leading-7 text-[var(--gpk-muted)]">{answer}</p>
            </GlassCard>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="quick-answer" className="mb-12">
          <GlassCard className="overflow-hidden">
            <div className="grid lg:grid-cols-[220px_1fr]">
              <div className="border-b border-white/10 bg-[#2563EB] p-7 text-white lg:border-b-0 lg:border-r">
                <IconOrb name="check" tone="gold" />
                <h2 id="quick-answer" className="mt-5 text-xl font-extrabold text-white">Quick answer</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">A concise response for readers and answer engines.</p>
              </div>
              <div className="p-7 sm:p-9">
                <h3 className="text-2xl font-extrabold tracking-tight">{answerTitle}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--gpk-muted-2)]">{answer}</p>
              </div>
            </div>
          </GlassCard>
        </section>

        {journey.length > 0 ? (
          <section className="mb-14" aria-label="Visual roadmap">
            <SectionHeading eyebrow="At a glance" title="The path in one picture" icon="wand" />
            <GlassCard className="overflow-x-auto p-6 sm:p-8">
              <div className="flex min-w-[560px] items-start justify-between gap-2 sm:min-w-0">
                {journey.map((node, index) => (
                  <div key={`${index}-${node.label}`} className="flex flex-1 items-start">
                    <div className="flex flex-col items-center text-center">
                      <IconOrb name={node.icon || "sparkles"} tone={index % 2 === 0 ? "blue" : "gold"} size="sm" />
                      <div className="mt-3 w-24 text-xs font-bold leading-tight text-[var(--gpk-muted-3)] sm:w-28">{node.label}</div>
                    </div>
                    {index < journey.length - 1 ? (
                      <svg
                        className="mt-5 h-4 w-full min-w-[24px] shrink text-[var(--gpk-border-strong)]"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <line x1="0" y1="5" x2="92" y2="5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M88 1 L96 5 L88 9" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ) : null}
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>
        ) : null}

        <section className="mb-14">
          <SectionHeading
            eyebrow="What you will get"
            title="Practical takeaways"
            description="Clear outcomes, structured guidance, and useful next actions without keyword padding."
            icon="target"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <GlassCard key={item.title} className="p-6">
                <IconOrb name={item.icon || (index % 2 === 0 ? "sparkles" : "idea")} tone={index % 3 === 1 ? "gold" : "blue"} />
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--gpk-muted)]">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {useCases.length > 0 ? (
          <section className="mb-14">
            <SectionHeading
              eyebrow="Real-world context"
              title={useCasesTitle}
              description="Concrete situations where this shows up, not a generic feature list."
              icon="search"
              tone="gold"
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-[var(--gpk-border)] bg-[var(--gpk-fill-3)] p-5">
                  <IconOrb name={item.icon || "target"} tone={index % 2 === 0 ? "gold" : "blue"} size="sm" />
                  <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--gpk-faint)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-14">
          <SectionHeading
            eyebrow="Execution roadmap"
            title="Step-by-step approach"
            description="Follow the sequence, produce visible work, review the result, and improve the system."
            icon="book"
            tone="gold"
          />
          <div className="space-y-4">
            {steps.map((step, index) => (
              <GlassCard key={`${index}-${step.title}`} className="p-6 sm:p-7">
                <div className="flex gap-5">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#2563EB]/40 bg-[#2563EB]/15 text-lg font-black text-[var(--gpk-accent-text-2)] shadow-[0_12px_28px_rgba(37,99,235,0.18)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--gpk-muted)] sm:text-base">{step.description}</p>
                    {step.meta ? (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--gpk-border)] bg-[var(--gpk-fill-2)] px-3 py-1.5 text-xs font-semibold text-[var(--gpk-muted-2)]">
                        <Clock3 className="h-3.5 w-3.5" />
                        {step.meta}
                      </div>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {comparisonTable ? (
          <section className="mb-14">
            <SectionHeading
              eyebrow="Compare before you commit"
              title={comparisonTable.title}
              description={comparisonTable.description}
              icon="shield"
            />
            <GlassCard className="overflow-x-auto p-2 sm:p-3">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr>
                    {comparisonTable.columns.map((col) => (
                      <th
                        key={col}
                        className="border-b border-[var(--gpk-border)] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--gpk-accent-text)]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-[var(--gpk-fill-3)]" : ""}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-3 align-top leading-6 text-[var(--gpk-muted-2)] ${cellIndex === 0 ? "font-bold text-[var(--gpk-text)]" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </section>
        ) : null}

        {tools.length > 0 ? (
          <section className="mb-14">
            <SectionHeading
              eyebrow="Tool stack"
              title="Recommended resources"
              description="Start with a focused stack. Verify current features and pricing on each provider's official website."
              icon="wand"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool, index) => (
                <GlassCard key={tool.name} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{tool.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--gpk-muted)]">{tool.description}</p>
                    </div>
                    {tool.label ? (
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${index % 2 === 0 ? "bg-[#2563EB]/15 text-[var(--gpk-accent-text-2)]" : "bg-[#F5B301]/10 text-[var(--gpk-gold-text)]"}`}>
                        {tool.label}
                      </span>
                    ) : null}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        ) : null}

        {children}

        {mistakes.length > 0 ? (
          <section className="mb-14">
            <SectionHeading
              eyebrow="Quality guardrails"
              title="Common mistakes to avoid"
              description="These checks protect usefulness, credibility, and long-term search performance."
              icon="shield"
              tone="gold"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {mistakes.map((mistake) => (
                <div key={mistake} className="flex gap-3 rounded-2xl border border-[#F5B301]/20 bg-[#F5B301]/[0.055] p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#F5B301]" />
                  <p className="text-sm leading-7 text-[var(--gpk-muted-3)]">{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mb-14" aria-labelledby="faq-heading">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description={`${faqs.length} visible, page-specific answers for users, search snippets, and AI retrieval systems.`}
            icon="answer"
          />
          <div id="faq-heading" className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group overflow-hidden rounded-2xl border border-[var(--gpk-border)] bg-[var(--gpk-card-bg-strong)] open:border-[#2563EB]/45 open:shadow-[0_16px_42px_rgba(37,99,235,0.12)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[var(--gpk-faint)] transition group-open:rotate-180 group-open:text-[var(--gpk-accent-text)]" />
                </summary>
                <div className="border-t border-[var(--gpk-border)] px-5 py-5 text-sm leading-8 text-[var(--gpk-muted)] sm:px-6">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <GlassCard className="p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gpk-accent-text)]">
                  <BadgeCheck className="h-4 w-4" />
                  Trust and editorial context
                </div>
                <h2 className="mt-3 text-2xl font-extrabold">Published with a clear ownership trail</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--gpk-muted)]">
                  Published by <Link href={authorHref} className="font-semibold text-[var(--gpk-text)] underline decoration-[var(--gpk-border-strong)] underline-offset-4 hover:decoration-[var(--gpk-text)]">{authorLabel}</Link>. Updated {updatedAt}. Material changes should be reflected in the page, metadata, and sitemap date.
                </p>
              </div>
              <Link href="/editorial-policy" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--gpk-border-strong)] bg-[var(--gpk-fill-2)] px-5 py-3 text-sm font-bold transition hover:border-[#2563EB]/50 hover:bg-[#2563EB]/10">
                Editorial policy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </section>

        {relatedLinks.length > 0 ? (
          <section className="mb-14">
            <SectionHeading
              eyebrow="Internal links"
              title="Continue learning"
              description="Crawlable, descriptive links connect the page to the wider Sikhadenge knowledge system."
              icon="link"
              tone="gold"
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={`${item.href}-${item.label}`} href={item.href} className="group rounded-2xl border border-[var(--gpk-border)] bg-[var(--gpk-card-bg)] p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/45 hover:bg-[var(--gpk-card-bg-strong)]">
                  <div className="font-bold group-hover:text-[var(--gpk-accent-text-2)]">{item.label}</div>
                  {item.description ? <p className="mt-2 text-sm leading-6 text-[var(--gpk-faint)]">{item.description}</p> : null}
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[var(--gpk-accent-text)]">
                    Open page <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(640px_320px_at_0%_0%,rgba(37,99,235,0.25),transparent_62%),linear-gradient(135deg,#111827_0%,#0D1730_100%)] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Next step</div>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">Move from reading to practical execution</h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[#B0B7C3] sm:text-base">Use the relevant Sikhadenge learning path, ask a specific question, or explore a connected guide.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={primaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5B301] px-6 py-4 text-sm font-black text-[#0B1220] shadow-[0_12px_30px_rgba(245,179,1,0.20)] transition hover:-translate-y-0.5 hover:bg-[#FFD04A]">
                {primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-bold transition hover:border-[#2563EB]/50 hover:bg-[#2563EB]/10">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
