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
  GraduationCap,
  Link2,
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
  | "graduate"
  | "link"
  | "shield"
  | "sparkles"
  | "target"
  | "users"
  | "wand";

const MASTERCLASS_URL =
  "https://sikhadenge.in/gen-ai-masterclass/register-one-step";

const MASTERCLASS_BENEFITS = [
  "Practical AI workflows you can apply",
  "A clearer tool and skill selection path",
  "A focused next-step action plan",
];

const ICONS: Record<BlogIconName, typeof Sparkles> = {
  answer: FileCheck2,
  book: BookOpen,
  bot: Sparkles,
  check: CheckCircle2,
  graduate: GraduationCap,
  idea: Sparkles,
  link: Link2,
  search: Sparkles,
  shield: ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  users: Users,
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
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-5 text-[34px] font-black leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[44px]">
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

function MasterclassButton({
  label = "Join Free Gen AI Masterclass",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={MASTERCLASS_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#f5b301] px-6 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-[#ffd04a] ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function LeadBanner({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#0b2b6f] px-6 py-7 text-white sm:px-8 sm:py-8">
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-blue-400/25 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-amber-300/15 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-200">
            {eyebrow}
          </p>
          <h3 className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-[-0.03em] sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-blue-100">
            {description}
          </p>
        </div>
        <MasterclassButton className="w-full lg:w-auto" />
      </div>
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
  const supportingCta = secondaryCta ?? primaryCta;

  return (
    <main
      data-blog-article-design="editorial-v5-lead-first"
      className="min-h-screen overflow-x-hidden bg-[#fbfcff] text-slate-950 selection:bg-blue-200 selection:text-blue-950"
    >
      <header className="relative overflow-hidden border-b border-slate-200 bg-white pt-20 sm:pt-24">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#1748c7,#60a5fa,#f5b301)]" />
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/75 blur-3xl" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1320px] px-4 pb-14 sm:px-6 sm:pb-18 lg:px-8">
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

          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center xl:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>

              <h1 className="mt-7 max-w-[920px] text-[44px] font-black leading-[1.01] tracking-[-0.052em] text-slate-950 sm:text-[58px] lg:text-[68px] xl:text-[74px]">
                {title}
              </h1>

              <p className="mt-7 max-w-[820px] text-lg leading-9 text-slate-600 sm:text-[21px] sm:leading-10">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                <Link
                  href={authorHref}
                  className="inline-flex items-center gap-2 font-bold text-slate-950 hover:text-blue-700"
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
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="relative overflow-hidden rounded-[32px] bg-[#071b43] p-7 text-white shadow-[0_30px_80px_rgba(15,37,86,0.20)] sm:p-8">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-amber-300/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100">
                  <GraduationCap className="h-4 w-4" />
                  Free Gen AI Masterclass
                </div>
                <h2 className="mt-6 text-[30px] font-black leading-[1.08] tracking-[-0.035em] sm:text-[36px]">
                  Turn this guide into a practical AI action plan.
                </h2>
                <p className="mt-4 text-base leading-8 text-blue-100">
                  Learn how to choose useful AI tools, build workflows and move from information to execution.
                </p>
                <div className="mt-6 space-y-3">
                  {MASTERCLASS_BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f5b301]" />
                      <span className="text-sm leading-6 text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>
                <MasterclassButton className="mt-7 w-full" />
                <p className="mt-3 text-center text-xs text-blue-200">
                  Opens the one-step registration form.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-white">
        <nav
          aria-label="Article sections"
          className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-4 sm:flex-wrap sm:px-6 lg:px-8"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:grid-cols-[minmax(0,880px)_300px] xl:items-start">
        <article className="min-w-0">
          <section
            id="quick-answer"
            aria-labelledby="quick-answer-heading"
            className="scroll-mt-28"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-blue-200 bg-white px-6 py-8 sm:px-9 sm:py-10">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-blue-600" />
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
                Quick answer
              </p>
              <h2
                id="quick-answer-heading"
                className="mt-4 text-[31px] font-black leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-[42px]"
              >
                {answerTitle}
              </h2>
              <p className="mt-5 max-w-[820px] text-[18px] leading-9 text-slate-700 sm:text-[20px] sm:leading-10">
                {answer}
              </p>
            </div>
          </section>

          <div className="mt-8">
            <LeadBanner
              eyebrow="Apply what you are reading"
              title="Get a practical framework in the free Gen AI Masterclass"
              description="Use the one-step form to register and continue with a structured, action-oriented learning path."
            />
          </div>

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
                    <p className="text-xs font-extrabold text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-black leading-snug text-slate-950">
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
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <li
                  key={`${index}-${step.title}`}
                  className="grid gap-5 rounded-[26px] border border-slate-200 bg-white p-6 sm:grid-cols-[72px_minmax(0,1fr)] sm:p-8"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-lg font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black leading-tight text-slate-950 sm:text-[29px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[17px] leading-8 text-slate-600 sm:text-lg sm:leading-9">
                      {step.description}
                    </p>
                    {step.meta ? (
                      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">
                        <Clock3 className="h-4 w-4" />
                        {step.meta}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-10">
            <LeadBanner
              eyebrow="Build practical capability"
              title="Do not stop at reading—convert this roadmap into a real workflow"
              description="Register directly for the free Gen AI Masterclass and continue with practical guidance."
            />
          </div>

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
                    className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <IconMark name="wand" tone={index % 2 ? "amber" : "blue"} />
                      {tool.label ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-600">
                          {tool.label}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-5 text-xl font-black text-slate-950">
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
              <div className="grid gap-4 sm:grid-cols-2">
                {mistakes.map((mistake) => (
                  <div
                    key={mistake}
                    className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-5"
                  >
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
            <div
              id="faq-heading"
              className="divide-y divide-slate-200 overflow-hidden rounded-[24px] border border-slate-200 bg-white"
            >
              {faqs.map((faq, index) => (
                <details key={faq.q} className="group bg-white open:bg-blue-50/35">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-6 text-left sm:px-7 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start gap-4">
                      <span className="mt-1 text-xs font-extrabold text-blue-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-bold leading-8 text-slate-900 sm:text-xl">
                        {faq.q}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-blue-700" />
                  </summary>
                  <div className="px-5 pb-7 pl-12 text-[17px] leading-9 text-slate-700 sm:px-7 sm:pl-16 sm:text-lg">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="editorial" className="mt-16 scroll-mt-28 sm:mt-20">
            <div className="rounded-[26px] border border-emerald-200 bg-emerald-50/55 px-6 py-8 sm:px-9 sm:py-10">
              <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
                    <BadgeCheck className="h-4 w-4" /> Editorial trust
                  </p>
                  <h2 className="mt-4 text-[30px] font-black tracking-[-0.03em] text-slate-950 sm:text-[38px]">
                    Clear ownership and review context
                  </h2>
                  <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-700">
                    Published by{" "}
                    <Link
                      href={authorHref}
                      className="font-bold text-blue-700 underline decoration-blue-200 underline-offset-4"
                    >
                      {authorLabel}
                    </Link>
                    . Updated {updatedAt}. Material changes should be reflected in the page, metadata and sitemap date.
                  </p>
                </div>
                <Link
                  href="/editorial-policy"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
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
                    className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(30,64,175,0.10)]"
                  >
                    <div className="flex h-28 items-center justify-between bg-[linear-gradient(135deg,#eaf2ff,#ffffff_58%,#fff7d6)] px-5">
                      <IconMark
                        name={index % 3 === 0 ? "book" : index % 3 === 1 ? "sparkles" : "link"}
                        tone={index % 3 === 2 ? "amber" : "blue"}
                      />
                      <span className="text-4xl font-black text-slate-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-black leading-snug text-slate-950 group-hover:text-blue-700">
                        {item.label}
                      </h3>
                      {item.description ? (
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      ) : null}
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-blue-700">
                        Open guide <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="relative mt-16 overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#071b43,#1748c7_58%,#2563eb)] px-7 py-10 text-white sm:mt-20 sm:px-10 sm:py-12">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-blue-200">
                  Free registration
                </p>
                <h2 className="mt-4 max-w-3xl text-[34px] font-black leading-tight tracking-[-0.04em] sm:text-[48px]">
                  Move from reading to practical AI execution
                </h2>
                <p className="mt-5 max-w-3xl text-[17px] leading-8 text-blue-100 sm:text-lg">
                  Join the free Gen AI Masterclass through the one-step registration form and continue with a practical learning path.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <MasterclassButton label="Register for Free Masterclass" />
                <Link
                  href={supportingCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white hover:bg-white/15"
                >
                  {supportingCta.label}
                </Link>
              </div>
            </div>
          </section>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-blue-200 bg-white">
              <div className="bg-[#071b43] px-6 py-7 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-200">
                  <GraduationCap className="h-4 w-4" /> Free masterclass
                </div>
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.03em]">
                  Ready to apply this topic?
                </h2>
                <p className="mt-3 text-sm leading-7 text-blue-100">
                  Register directly and continue with practical AI guidance.
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {MASTERCLASS_BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                      <span className="text-sm leading-6 text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <MasterclassButton className="mt-6 w-full" />
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500">
                Reviewed content
              </p>
              <Link
                href={authorHref}
                className="mt-4 flex items-center gap-3 font-bold text-slate-950 hover:text-blue-700"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm">{authorLabel}</span>
                  <span className="mt-1 block text-xs font-medium text-slate-500">
                    Updated {updatedAt}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
