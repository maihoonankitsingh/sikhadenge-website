import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  Link2,
  ShieldCheck,
  Sparkles,
  Target,
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

type BlogIconName =
  | NonNullable<GeneratedHighlight["icon"]>
  | "answer"
  | "book"
  | "check"
  | "link"
  | "shield"
  | "sparkles"
  | "target"
  | "wand";

const ICONS: Record<BlogIconName, typeof Sparkles> = {
  answer: FileCheck2,
  book: BookOpen,
  bot: Sparkles,
  check: CheckCircle2,
  graduate: BookOpen,
  idea: Sparkles,
  link: Link2,
  search: Sparkles,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  users: BadgeCheck,
  wand: WandSparkles,
};

function IconMark({
  name = "sparkles",
  tone = "blue",
}: {
  name?: BlogIconName;
  tone?: "blue" | "amber" | "green" | "slate";
}) {
  const Icon = ICONS[name];
  const toneClasses = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${toneClasses}`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: BlogIconName;
}) {
  return (
    <div className="mb-7 max-w-3xl">
      <div className="flex items-center gap-3">
        <IconMark name={icon} />
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-4 text-[30px] font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-[38px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          {description}
        </p>
      ) : null}
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
    <main
      data-blog-article-design="editorial-v3"
      className="min-h-screen overflow-x-hidden bg-white text-slate-950 selection:bg-blue-200 selection:text-blue-950"
    >
      <header className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] pt-20 sm:pt-24">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.12)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute left-[-140px] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute right-[-160px] top-[-140px] h-[380px] w-[380px] rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-18 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500"
          >
            {breadcrumbs.map((item, index) => (
              <span
                key={`${item.href}-${item.label}`}
                className="inline-flex min-w-0 items-center gap-2"
              >
                {index > 0 ? (
                  <span aria-hidden="true" className="text-slate-300">
                    /
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="max-w-[230px] truncate transition hover:text-blue-700 sm:max-w-none"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-8 max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </div>

            <h1 className="mt-6 max-w-5xl text-[40px] font-bold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-[54px] lg:text-[68px]">
              {title}
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-9 text-slate-600 sm:text-xl">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              <Link
                href={authorHref}
                className="inline-flex items-center gap-2 font-semibold text-slate-950 hover:text-blue-700"
              >
                <BadgeCheck className="h-4 w-4 text-blue-700" />
                {authorLabel}
              </Link>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-700" />
                Updated {updatedAt}
              </span>
            </div>

            {badges.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-10 max-w-5xl border-l-4 border-blue-600 bg-white/90 px-5 py-5 shadow-[0_10px_32px_rgba(15,23,42,0.05)] sm:px-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Answer first
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">
              {answerTitle}
            </h2>
            <p className="mt-3 max-w-4xl text-base leading-8 text-slate-700">
              {answer}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[190px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[210px_minmax(0,850px)] xl:justify-center xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24 border-l border-slate-200 pl-5">
            <p className="pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              On this page
            </p>
            <nav aria-label="Article sections" className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-slate-600 transition hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Link
              href={authorHref}
              className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-900 hover:text-blue-700"
            >
              <BadgeCheck className="h-5 w-5 text-blue-700" />
              Editorial team
            </Link>
          </div>
        </aside>

        <article className="min-w-0">
          <details className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
              On this page
              <ChevronDown className="h-5 w-5 text-slate-500" />
            </summary>
            <nav aria-label="Mobile article sections" className="mt-4 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

          <section
            id="quick-answer"
            aria-labelledby="quick-answer-heading"
            className="scroll-mt-28"
          >
            <div className="rounded-2xl border border-blue-200 bg-blue-50/55 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <IconMark name="check" tone="blue" />
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                  Quick answer
                </p>
              </div>
              <h2
                id="quick-answer-heading"
                className="mt-5 text-[28px] font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-[34px]"
              >
                {answerTitle}
              </h2>
              <p className="mt-4 text-lg leading-9 text-slate-700">{answer}</p>
            </div>
          </section>

          <section id="takeaways" className="mt-16 scroll-mt-28">
            <SectionHeading
              eyebrow="At a glance"
              title="Key takeaways"
              description="Important points organised for quick scanning and practical execution."
              icon="target"
            />
            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="border-t border-slate-200 py-6"
                >
                  <div className="flex items-start gap-4">
                    <IconMark
                      name={(item.icon || "sparkles") as BlogIconName}
                      tone={index % 3 === 1 ? "amber" : "blue"}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-lg font-bold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-8 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="roadmap" className="mt-16 scroll-mt-28">
            <SectionHeading
              eyebrow="Execution roadmap"
              title="Step-by-step approach"
              description="Follow the sequence, create visible work, review the result and improve the process."
              icon="book"
            />
            <ol className="relative space-y-0 border-l border-blue-200 pl-7 sm:pl-9">
              {steps.map((step, index) => (
                <li key={`${index}-${step.title}`} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[43px] top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-xs font-bold text-white sm:-left-[51px]">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {step.description}
                  </p>
                  {step.meta ? (
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Clock3 className="h-3.5 w-3.5 text-blue-700" />
                      {step.meta}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          {tools.length > 0 ? (
            <section id="resources" className="mt-16 scroll-mt-28">
              <SectionHeading
                eyebrow="Useful resources"
                title="Recommended tools and references"
                description="Use a focused stack and verify changing facts on official sources."
                icon="wand"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {tools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <IconMark name="wand" tone={index % 2 ? "amber" : "blue"} />
                      {tool.label ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                          {tool.label}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-base leading-8 text-slate-600">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {children ? (
            <section
              id="source-standard"
              className="mt-16 scroll-mt-28 [&>section]:mb-0 [&>section]:border-slate-200 [&>section]:bg-white [&>section]:text-slate-950 [&_p]:text-slate-600"
            >
              {children}
            </section>
          ) : null}

          {mistakes.length > 0 ? (
            <section id="mistakes" className="mt-16 scroll-mt-28">
              <SectionHeading
                eyebrow="Quality control"
                title="Common mistakes to avoid"
                description="These checks protect usefulness, credibility and long-term search performance."
                icon="shield"
              />
              <div className="divide-y divide-amber-200 rounded-2xl border border-amber-200 bg-amber-50/55 px-5 sm:px-7">
                {mistakes.map((mistake) => (
                  <div key={mistake} className="flex gap-4 py-5">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
                    <p className="text-base leading-8 text-slate-700">{mistake}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section
            id="faq"
            className="mt-16 scroll-mt-28"
            aria-labelledby="faq-heading"
          >
            <SectionHeading
              eyebrow="Questions and answers"
              title="Frequently asked questions"
              description="Clear, visible answers written for readers, snippets and AI retrieval systems."
              icon="answer"
            />
            <div id="faq-heading" className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <details key={faq.q} className="group bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-bold text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-semibold leading-7 text-slate-900 sm:text-lg">
                        {faq.q}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-blue-700" />
                  </summary>
                  <div className="pb-6 pl-10 pr-8 text-base leading-8 text-slate-700 sm:pl-11">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="editorial" className="mt-16 scroll-mt-28">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/45 p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.17em] text-emerald-700">
                    <BadgeCheck className="h-4 w-4" /> Editorial trust
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-slate-950 sm:text-3xl">
                    Clear ownership and review context
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
                    Published by{" "}
                    <Link
                      href={authorHref}
                      className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4"
                    >
                      {authorLabel}
                    </Link>
                    . Updated {updatedAt}. Material changes should be reflected in the page, metadata and sitemap date.
                  </p>
                </div>
                <Link
                  href="/editorial-policy"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Editorial policy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {relatedLinks.length > 0 ? (
            <section id="related" className="mt-16 scroll-mt-28">
              <SectionHeading
                eyebrow="Continue learning"
                title="Related guides"
                description="Relevant internal links connect this article with the wider Sikhadenge knowledge system."
                icon="link"
              />
              <div className="grid border-t border-slate-200 sm:grid-cols-2">
                {relatedLinks.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className="group border-b border-slate-200 py-5 sm:odd:pr-6 sm:even:pl-6 sm:odd:border-r"
                  >
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-700">
                      {item.label}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    ) : null}
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-blue-700">
                      Open guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-16 rounded-2xl border border-blue-200 bg-[linear-gradient(135deg,#eff6ff,#ffffff_58%,#fffbeb)] p-7 sm:p-9">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-blue-700">
                  Next step
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  Move from reading to practical execution
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Use the relevant Sikhadenge learning path, ask a specific question or explore a connected guide.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
                {secondaryCta ? (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
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
