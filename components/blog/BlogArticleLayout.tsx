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
import type {
  GeneratedFaq,
  GeneratedHighlight,
  GeneratedLink,
  GeneratedStep,
  GeneratedTool,
} from "../generated/GeneratedPageKit";

export type {
  GeneratedFaq,
  GeneratedHighlight,
  GeneratedLink,
  GeneratedStep,
  GeneratedTool,
} from "../generated/GeneratedPageKit";

type BlogIconName =
  | NonNullable<GeneratedHighlight["icon"]>
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

type BlogArticleLayoutProps = {
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

const ICONS: Record<BlogIconName, typeof Sparkles> = {
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

function IconTile({
  name = "sparkles",
  tone = "blue",
  size = "md",
}: {
  name?: BlogIconName;
  tone?: "blue" | "gold" | "slate";
  size?: "sm" | "md" | "lg";
}) {
  const Icon = ICONS[name];
  const dimensions =
    size === "lg"
      ? "h-14 w-14 rounded-2xl"
      : size === "sm"
        ? "h-9 w-9 rounded-xl"
        : "h-11 w-11 rounded-[14px]";
  const iconSize = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const toneClasses =
    tone === "gold"
      ? "border-amber-200 bg-amber-50 text-amber-700 shadow-[0_10px_25px_rgba(217,119,6,0.10)]"
      : tone === "slate"
        ? "border-slate-200 bg-slate-100 text-slate-700"
        : "border-blue-200 bg-blue-50 text-blue-700 shadow-[0_10px_25px_rgba(37,99,235,0.10)]";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center border ${dimensions} ${toneClasses}`}
    >
      <Icon className={iconSize} strokeWidth={1.9} />
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
  icon?: BlogIconName;
  tone?: "blue" | "gold" | "slate";
}) {
  return (
    <div className="mb-7 flex items-start gap-4">
      <IconTile name={icon} tone={tone} />
      <div>
        <div
          className={`text-[11px] font-black uppercase tracking-[0.2em] ${
            tone === "gold" ? "text-amber-700" : tone === "slate" ? "text-slate-500" : "text-blue-700"
          }`}
        >
          {eyebrow}
        </div>
        <h2 className="mt-1 text-2xl font-black tracking-[-0.025em] text-slate-950 sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] ${className}`}
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
}: BlogArticleLayoutProps) {
  const navigation = [
    { href: "#quick-answer", label: "Quick answer" },
    { href: "#takeaways", label: "Key takeaways" },
    { href: "#roadmap", label: "Step-by-step" },
    ...(tools.length ? [{ href: "#resources", label: "Resources" }] : []),
    ...(children ? [{ href: "#source-standard", label: "Source standard" }] : []),
    ...(mistakes.length ? [{ href: "#mistakes", label: "Mistakes" }] : []),
    { href: "#faq", label: "FAQs" },
    { href: "#editorial", label: "Editorial trust" },
    ...(relatedLinks.length ? [{ href: "#related", label: "Related guides" }] : []),
  ];

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950 selection:bg-blue-200 selection:text-blue-950">
      <header className="relative overflow-hidden border-b border-slate-800 bg-[#07142f] pt-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_14%_10%,rgba(37,99,235,0.34),transparent_62%),radial-gradient(680px_430px_at_88%_8%,rgba(245,179,1,0.13),transparent_64%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.href}-${item.label}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true" className="text-slate-600">/</span> : null}
                <Link href={item.href} className="max-w-[230px] truncate transition hover:text-white sm:max-w-none">
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-9 grid gap-9 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.75rem]">
                {title}
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300">
                <Link href={authorHref} className="inline-flex items-center gap-2 font-bold text-white hover:text-blue-200">
                  <BadgeCheck className="h-4 w-4 text-amber-300" />
                  {authorLabel}
                </Link>
                <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-blue-300" />
                  Updated {updatedAt}
                </span>
              </div>

              {badges.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-slate-200 backdrop-blur"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="rounded-[1.75rem] border border-white/12 bg-white/[0.075] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <IconTile name="answer" tone="gold" size="lg" />
                <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-200">
                  Answer first
                </span>
              </div>
              <h2 className="mt-6 text-xl font-black leading-snug text-white">{answerTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
              <a
                href="#quick-answer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-200 transition hover:text-white"
              >
                Read the structured answer <ArrowRight className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[240px_minmax(0,860px)] xl:justify-center">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
            <div className="px-2 pb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">On this page</div>
            <nav aria-label="Article sections" className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <Link
                href={authorHref}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#07142f] text-white">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Reviewed by</span>
                  <span className="mt-0.5 block text-xs font-black text-slate-900">Editorial team</span>
                </span>
              </Link>
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          <section id="quick-answer" aria-labelledby="quick-answer-heading" className="scroll-mt-28">
            <Surface className="overflow-hidden border-blue-200">
              <div className="grid md:grid-cols-[190px_1fr]">
                <div className="bg-[linear-gradient(145deg,#1d4ed8,#2563eb)] p-6 text-white sm:p-7">
                  <IconTile name="check" tone="gold" />
                  <div className="mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">Quick answer</div>
                  <p className="mt-2 text-sm leading-6 text-blue-100">A concise response for readers and answer engines.</p>
                </div>
                <div className="p-7 sm:p-9">
                  <h2 id="quick-answer-heading" className="text-2xl font-black tracking-[-0.025em] text-slate-950">
                    {answerTitle}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-700">{answer}</p>
                </div>
              </div>
            </Surface>
          </section>

          <section id="takeaways" className="mt-14 scroll-mt-28">
            <SectionHeading
              eyebrow="At a glance"
              title="Key takeaways"
              description="The most useful ideas, organised for quick scanning and practical execution."
              icon="target"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item, index) => (
                <Surface key={`${item.title}-${index}`} className="p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_60px_rgba(37,99,235,0.10)]">
                  <div className="flex items-start justify-between gap-4">
                    <IconTile
                      name={(item.icon || (index % 2 === 0 ? "sparkles" : "idea")) as BlogIconName}
                      tone={index % 3 === 1 ? "gold" : "blue"}
                    />
                    <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </Surface>
              ))}
            </div>
          </section>

          <section id="roadmap" className="mt-14 scroll-mt-28">
            <SectionHeading
              eyebrow="Execution roadmap"
              title="Step-by-step approach"
              description="Follow the sequence, produce visible work, review the result, and improve the system."
              icon="book"
              tone="gold"
            />
            <div className="relative space-y-4 before:absolute before:bottom-8 before:left-[23px] before:top-8 before:w-px before:bg-slate-200 sm:before:left-[27px]">
              {steps.map((step, index) => (
                <Surface key={`${index}-${step.title}`} className="relative p-6 sm:p-7">
                  <div className="flex gap-5">
                    <div className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#07142f] text-sm font-black text-white shadow-[0_10px_30px_rgba(7,20,47,0.18)] sm:h-14 sm:w-14">
                      {index + 1}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-lg font-black text-slate-950 sm:text-xl">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">{step.description}</p>
                      {step.meta ? (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                          <Clock3 className="h-3.5 w-3.5 text-blue-600" />
                          {step.meta}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Surface>
              ))}
            </div>
          </section>

          {tools.length > 0 ? (
            <section id="resources" className="mt-14 scroll-mt-28">
              <SectionHeading
                eyebrow="Useful resources"
                title="Recommended tool stack"
                description="Start with a focused stack and verify current features, limits, pricing, and policies at the primary source."
                icon="wand"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {tools.map((tool, index) => (
                  <Surface key={tool.name} className="p-6">
                    <div className="flex items-start gap-4">
                      <IconTile name={index % 2 === 0 ? "search" : "bot"} tone={index % 2 === 0 ? "blue" : "gold"} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-lg font-black text-slate-950">{tool.name}</h3>
                          {tool.label ? (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                              {tool.label}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{tool.description}</p>
                      </div>
                    </div>
                  </Surface>
                ))}
              </div>
            </section>
          ) : null}

          {children ? (
            <div id="source-standard" className="mt-14 scroll-mt-28 text-white">
              {children}
            </div>
          ) : null}

          {mistakes.length > 0 ? (
            <section id="mistakes" className="mt-14 scroll-mt-28">
              <SectionHeading
                eyebrow="Quality guardrails"
                title="Common mistakes to avoid"
                description="These checks protect usefulness, credibility, and long-term search performance."
                icon="shield"
                tone="gold"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {mistakes.map((mistake, index) => (
                  <div
                    key={`${mistake}-${index}`}
                    className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-[0_12px_35px_rgba(217,119,6,0.06)]"
                  >
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                    <p className="text-sm leading-7 text-slate-700">{mistake}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section id="faq" className="mt-14 scroll-mt-28" aria-labelledby="faq-heading">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description={`${faqs.length} visible, page-specific answers for users, search snippets, and AI retrieval systems.`}
              icon="answer"
            />
            <div id="faq-heading" className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.05)] open:border-blue-200 open:shadow-[0_16px_42px_rgba(37,99,235,0.09)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-black text-slate-900 marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-180 group-open:bg-blue-100 group-open:text-blue-700">
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <div className="border-t border-slate-200 px-5 py-5 text-sm leading-8 text-slate-600 sm:px-6">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          <section id="editorial" className="mt-14 scroll-mt-28">
            <Surface className="overflow-hidden">
              <div className="grid md:grid-cols-[180px_1fr]">
                <div className="flex flex-col justify-between bg-[#07142f] p-7 text-white">
                  <IconTile name="shield" tone="gold" size="lg" />
                  <div className="mt-8 text-[11px] font-black uppercase tracking-[0.18em] text-blue-200">E-E-A-T context</div>
                </div>
                <div className="p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                    <BadgeCheck className="h-4 w-4" />
                    Trust and editorial context
                  </div>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-slate-950">Published with a clear ownership trail</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Published by{" "}
                    <Link href={authorHref} className="font-black text-slate-950 underline decoration-blue-300 underline-offset-4 hover:text-blue-700">
                      {authorLabel}
                    </Link>
                    . Updated {updatedAt}. Material changes should be reflected in the visible page, metadata, and sitemap date.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={authorHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#07142f] px-5 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                    >
                      About the editorial team <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/editorial-policy"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                    >
                      Editorial policy
                    </Link>
                  </div>
                </div>
              </div>
            </Surface>
          </section>

          {relatedLinks.length > 0 ? (
            <section id="related" className="mt-14 scroll-mt-28">
              <SectionHeading
                eyebrow="Keep exploring"
                title="Related guides"
                description="Descriptive internal links connect this article to the wider Sikhadenge knowledge system."
                icon="link"
                tone="gold"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {relatedLinks.map((item, index) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_38px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.09)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                    </div>
                    <h3 className="mt-4 font-black leading-snug text-slate-950 group-hover:text-blue-800">{item.label}</h3>
                    {item.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p> : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-14 overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(650px_320px_at_0%_0%,rgba(37,99,235,0.34),transparent_62%),linear-gradient(135deg,#07142f_0%,#0d1d42_100%)] p-7 text-white shadow-[0_28px_90px_rgba(7,20,47,0.22)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Next step</div>
                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">Move from reading to practical execution</h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                  Use a relevant Sikhadenge learning path, ask a specific question, or explore a connected guide.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-black text-[#07142f] shadow-[0_12px_30px_rgba(245,179,1,0.22)] transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-black text-white transition hover:border-blue-300/40 hover:bg-blue-400/10"
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
