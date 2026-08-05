import Link from "next/link";
import type { ReactNode } from "react";
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
  highlights: GeneratedHighlight[];
  steps: GeneratedStep[];
  tools?: GeneratedTool[];
  mistakes?: string[];
  faqs: GeneratedFaq[];
  relatedLinks?: GeneratedLink[];
  updatedAt: string;
  authorLabel?: string;
  authorHref?: string;
  primaryCta: GeneratedLink;
  secondaryCta?: GeneratedLink;
  children?: ReactNode;
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
        <div className={`text-[11px] font-bold uppercase tracking-[0.22em] ${tone === "gold" ? "text-[#F5B301]" : "text-[#76A3FF]"}`}>
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-7 text-[#B0B7C3] sm:text-base">{description}</p> : null}
      </div>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-[#111827]/75 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur ${className}`}>
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
  highlights,
  steps,
  tools = [],
  mistakes = [],
  faqs,
  relatedLinks = [],
  updatedAt,
  authorLabel = "Sikhadenge Editorial Team",
  authorHref = "/authors/sikhadenge-editorial-team",
  primaryCta,
  secondaryCta,
  children,
}: GeneratedPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white selection:bg-[#2563EB]/40">
      <header className="relative overflow-hidden border-b border-white/10 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(37,99,235,0.24),transparent_62%),radial-gradient(640px_420px_at_88%_8%,rgba(245,179,1,0.10),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.href}-${item.label}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_310px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/35 bg-[#2563EB]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9BBCFF]">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#C5CBD5] sm:text-lg">{description}</p>
              {badges.length > 0 ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  {badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-[#D6DAE1]">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <GlassCard className="relative p-6">
              <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-[#2563EB]/20 blur-3xl" />
              <IconOrb name="answer" tone="gold" size="lg" />
              <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#F5B301]">Answer first</div>
              <div className="mt-2 text-lg font-bold">{answerTitle}</div>
              <p className="mt-3 text-sm leading-7 text-[#B0B7C3]">{answer}</p>
            </GlassCard>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section aria-labelledby="quick-answer" className="mb-12">
          <GlassCard className="overflow-hidden">
            <div className="grid lg:grid-cols-[220px_1fr]">
              <div className="border-b border-white/10 bg-[#2563EB] p-7 lg:border-b-0 lg:border-r">
                <IconOrb name="check" tone="gold" />
                <h2 id="quick-answer" className="mt-5 text-xl font-extrabold">Quick answer</h2>
                <p className="mt-2 text-sm leading-6 text-white/75">A concise response for readers and answer engines.</p>
              </div>
              <div className="p-7 sm:p-9">
                <h3 className="text-2xl font-extrabold tracking-tight">{answerTitle}</h3>
                <p className="mt-4 text-base leading-8 text-[#C5CBD5]">{answer}</p>
              </div>
            </div>
          </GlassCard>
        </section>

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
                <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

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
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#2563EB]/40 bg-[#2563EB]/15 text-lg font-black text-[#9BBCFF] shadow-[0_12px_28px_rgba(37,99,235,0.18)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#B0B7C3] sm:text-base">{step.description}</p>
                    {step.meta ? (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#C5CBD5]">
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
                      <p className="mt-2 text-sm leading-7 text-[#B0B7C3]">{tool.description}</p>
                    </div>
                    {tool.label ? (
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${index % 2 === 0 ? "bg-[#2563EB]/15 text-[#9BBCFF]" : "bg-[#F5B301]/10 text-[#F5B301]"}`}>
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
                  <p className="text-sm leading-7 text-[#D6DAE1]">{mistake}</p>
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
              <details key={faq.q} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111827]/80 open:border-[#2563EB]/45 open:shadow-[0_16px_42px_rgba(37,99,235,0.12)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#9CA3AF] transition group-open:rotate-180 group-open:text-[#76A3FF]" />
                </summary>
                <div className="border-t border-white/10 px-5 py-5 text-sm leading-8 text-[#B0B7C3] sm:px-6">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <GlassCard className="p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#76A3FF]">
                  <BadgeCheck className="h-4 w-4" />
                  Trust and editorial context
                </div>
                <h2 className="mt-3 text-2xl font-extrabold">Published with a clear ownership trail</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#B0B7C3]">
                  Published by <Link href={authorHref} className="font-semibold text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">{authorLabel}</Link>. Updated {updatedAt}. Material changes should be reflected in the page, metadata, and sitemap date.
                </p>
              </div>
              <Link href="/editorial-policy" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold transition hover:border-[#2563EB]/50 hover:bg-[#2563EB]/10">
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
                <Link key={`${item.href}-${item.label}`} href={item.href} className="group rounded-2xl border border-white/10 bg-[#111827]/70 p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]/45 hover:bg-[#111827]">
                  <div className="font-bold group-hover:text-[#9BBCFF]">{item.label}</div>
                  {item.description ? <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">{item.description}</p> : null}
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#76A3FF]">
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
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Move from reading to practical execution</h2>
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
