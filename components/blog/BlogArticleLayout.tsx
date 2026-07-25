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
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${toneClasses}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.9} />
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
    <div className="mb-8 max-w-3xl">
      <div className="flex items-center gap-3">
        <IconMark name={icon} />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-[42px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-[17px] leading-8 text-slate-600 sm:text-lg">
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
      data-blog-article-design="editorial-v4"
      className="min-h-screen overflow-x-hidden bg-white text-slate-950 selection:bg-blue-200 selection:text-blue-950"
    >
      <header className="relative overflow-hidden border-b border-slate-200 bg-white pt-20 sm:pt-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2563eb,#60a5fa,#f5b301)]" />
        <div className="absolute left-[-180px] top-[-220px] h-[480px] w-[480px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute right-[-160px] top-[-160px] h-[420px] w-[420px] rounded-full bg-amber-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500"
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
                  className="max-w-[260px] truncate transition hover:text-blue-700 sm:max-w-none"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-9 max-w-[1040px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              <Sparkles className="h-4 w-4" />
              {eyebrow}
            </div>

            <h1 className="mt-7 max-w-[1100px] text-[42px] font-bold leading-[1.02] tracking-[-0.048em] text-slate-950 sm:text-[56px] lg:text-[68px]">
              {title}
            </h1>

            <p className="mt-7 max-w-[900px] text-lg leading-9 text-slate-600 sm:text-[21px] sm:leading-10">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              <Link
                href={authorHref}
                className="inline-flex items-center gap-2 font-semibold text-slate-950 hover:text-blue-700"
              >
                <BadgeCheck className="h-5 w-5 text-blue-700" />
                {authorLabel}
              </Link>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-blue-700" />
                Updated {updatedAt}
              </span>
            </div>

            {badges.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-slate-50/70">
        <nav
          aria-label="Article sections"
          className="mx-auto flex max-w-[1120px] gap-2 overflow-x-auto px-4 py-4 sm:flex-wrap sm:px-6 lg:px-8"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <article className="mx-auto max-w-[980px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section
          id="quick-answer"
          aria-labelledby="quick-answer-heading"
          className="scroll-mt-28"
        >
          <div className="border-l-4 border-blue-600 bg-blue-50/60 px-6 py-7 sm:px-9 sm:py-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Quick answer
            </p>
            <h2
              id="quick-answer-heading"
              className="mt-4 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-[40px]"
            >
              {answerTitle}
            </h2>
            <p className="mt-5 max-w-[860px] text-[18px] leading-9 text-slate-700 sm:text-[20px] sm:leading-10">
              {answer}
            </p>
          </div>
        </section>

        <section id="takeaways" className="mt-16 scroll-mt-28 sm:mt-20">
          <SectionHeading
            eyebrow="At a glance"
            title="Key takeaways"
            description="The essential points to understand before you start applying this topic."
            icon="target"
          />
          <div className="grid gap-x-12 border-y border-slate-200 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex gap-4 border-b border-slate-200 py-7 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <IconMark
                  name={(item.icon || "sparkles") as BlogIconName}
                  tone={index % 3 === 1 ? "amber" : "blue"}
                />
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-8 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap" className="mt-16 scroll-mt-28 sm:mt-20">
          <SectionHeading
            eyebrow="Execution roadmap"
            title="Step-by-step approach"
            description="Follow a clear sequence, create visible work, review the result and improve the process."
            icon="book"
          />
          <ol className="divide-y divide-slate-200 border-y border-slate-200">
            {steps.map((step, index) => (
              <li
                key={`${index}-${step.title}`}
                className="grid gap-5 py-7 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-8"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-base font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-bold leading-tight text-slate-950 sm:text-[28px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-8 text-slate-600 sm:text-lg sm:leading-9">
                    {step.description}
                  </p>
                  {step.meta ? (
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                      <Clock3 className="h-4 w-4 text-blue-700" />
                      {step.meta}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {tools.length > 0 ? (
          <section id="resources" className="mt-16 scroll-mt-28 sm:mt-20">
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
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <IconMark name="wand" tone={index % 2 ? "amber" : "blue"} />
                    {tool.label ? (
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                        {tool.label}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {tool.name}
                  </h3>
                  <p className="mt-3 text-[17px] leading-8 text-slate-600">
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
            className="mt-16 scroll-mt-28 sm:mt-20 [&>section]:mb-0 [&>section]:border-slate-200 [&>section]:bg-white [&>section]:text-slate-950 [&_p]:text-slate-600"
          >
            {children}
          </section>
        ) : null}

        {mistakes.length > 0 ? (
          <section id="mistakes" className="mt-16 scroll-mt-28 sm:mt-20">
            <SectionHeading
              eyebrow="Quality control"
              title="Common mistakes to avoid"
              description="These checks protect usefulness, credibility and long-term search performance."
              icon="shield"
            />
            <div className="grid gap-x-10 border-y border-amber-200 bg-amber-50/40 px-5 sm:grid-cols-2 sm:px-8">
              {mistakes.map((mistake) => (
                <div key={mistake} className="flex gap-4 border-b border-amber-200 py-6 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
                  <p className="text-[17px] leading-8 text-slate-700">{mistake}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section
          id="faq"
          className="mt-16 scroll-mt-28 sm:mt-20"
          aria-labelledby="faq-heading"
        >
          <SectionHeading
            eyebrow="Questions and answers"
            title="Frequently asked questions"
            description="Clear answers written for readers, snippets and AI retrieval systems."
            icon="answer"
          />
          <div id="faq-heading" className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="group bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4">
                    <span className="mt-1 text-xs font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-blue-700" />
                </summary>
                <div className="pb-7 pl-10 pr-8 text-[17px] leading-9 text-slate-700 sm:pl-11 sm:text-lg">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="editorial" className="mt-16 scroll-mt-28 sm:mt-20">
          <div className="border-y border-emerald-200 bg-emerald-50/50 px-6 py-8 sm:px-9 sm:py-10">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-emerald-700">
                  <BadgeCheck className="h-4 w-4" /> Editorial trust
                </p>
                <h2 className="mt-4 text-[30px] font-bold tracking-[-0.03em] text-slate-950 sm:text-[38px]">
                  Clear ownership and review context
                </h2>
                <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-700">
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                Editorial policy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {relatedLinks.length > 0 ? (
          <section id="related" className="mt-16 scroll-mt-28 sm:mt-20">
            <SectionHeading
              eyebrow="Continue learning"
              title="Related guides"
              description="Relevant internal links connect this article with the wider Sikhadenge knowledge system."
              icon="link"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((item, index) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <div className="flex h-24 items-center justify-between bg-[linear-gradient(135deg,#eff6ff,#f8fafc_58%,#fffbeb)] px-5">
                    <IconMark
                      name={index % 3 === 0 ? "book" : index % 3 === 1 ? "sparkles" : "link"}
                      tone={index % 3 === 2 ? "amber" : "blue"}
                    />
                    <span className="text-3xl font-bold text-slate-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug text-slate-950 group-hover:text-blue-700">
                      {item.label}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-700">
                      Open guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16 overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f3ea8,#2563eb_58%,#1d4ed8)] px-7 py-9 text-white sm:mt-20 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-blue-100">
                Next step
              </p>
              <h2 className="mt-4 max-w-3xl text-[32px] font-bold leading-tight tracking-[-0.035em] sm:text-[44px]">
                Move from reading to practical execution
              </h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-blue-100 sm:text-lg">
                Use the relevant Sikhadenge learning path, ask a specific question or explore a connected guide.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                {primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-4 text-sm font-semibold text-white hover:bg-white/15"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
