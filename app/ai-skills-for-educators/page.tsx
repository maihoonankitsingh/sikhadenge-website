import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
  Presentation,
  Sparkles,
  Users,
  Video,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Skills for Educators | Sikhadenge",
  description:
    "Explore the best AI skills for educators across teaching support, lesson planning, assignments, presentations, communication, and workflow execution. A practical guide for teachers, tutors, mentors, and trainers.",
  alternates: {
    canonical: "https://sikhadenge.in/ai-skills-for-educators",
  },
  openGraph: {
    title: "Best AI Skills for Educators | Sikhadenge",
    description:
      "A practical guide to the best AI skills for educators across lesson planning, teaching support, assignments, presentations, and workflow execution.",
    url: "https://sikhadenge.in/ai-skills-for-educators",
    siteName: "Sikhadenge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Skills for Educators | Sikhadenge",
    description:
      "A practical guide to the best AI skills for educators across lesson planning, teaching support, assignments, presentations, and workflow execution.",
  },
};

const quickInfo = [
  {
    title: "Teaching relevance",
    desc: "Modern educators benefit when they can use AI across planning, explanation, assignments, and communication support.",
  },
  {
    title: "Execution support",
    desc: "The right AI skills help educators prepare faster while keeping teaching structured and learner-focused.",
  },
  {
    title: "Practical value",
    desc: "Useful AI skills improve clarity, preparation quality, and workflow efficiency more than random shortcuts.",
  },
];

const whyItMatters = [
  {
    icon: Sparkles,
    title: "Teaching now needs more support",
    desc: "Educators often handle lesson flow, notes, assignments, presentations, doubt support, and learner communication together.",
  },
  {
    icon: Workflow,
    title: "Manual preparation takes too much time",
    desc: "Without systems, teaching preparation, recap materials, worksheets, and communication tasks become repetitive and slow.",
  },
  {
    icon: Bot,
    title: "AI can support structured teaching work",
    desc: "Practical AI skills help educators improve lesson planning, explanation support, content organization, and learner communication.",
  },
  {
    icon: Briefcase,
    title: "Educators need practical digital capability",
    desc: "Teachers, tutors, coaches, and trainers benefit when they can use AI to improve delivery and preparation quality.",
  },
];

const skillCategories = [
  {
    icon: BookOpen,
    title: "Lesson Planning Skills",
    desc: "Educators should learn how AI supports lesson outlines, topic sequencing, class structure, and explanation planning.",
  },
  {
    icon: FileText,
    title: "Teaching Content Skills",
    desc: "Useful skills include creating notes, summaries, examples, worksheets, activity ideas, and topic explanations more efficiently.",
  },
  {
    icon: Presentation,
    title: "Presentation Skills",
    desc: "A practical AI skill is learning how to support slides, class visuals, training decks, and clear structured topic communication.",
  },
  {
    icon: ClipboardList,
    title: "Assignment & Review Skills",
    desc: "Educators benefit when they can use AI for assignment ideas, task structuring, evaluation support, and feedback organization.",
  },
  {
    icon: MessageSquareText,
    title: "Learner Communication Skills",
    desc: "Strong educator skills include using AI for class reminders, parent communication, learner support, and neutral message clarity.",
  },
  {
    icon: Workflow,
    title: "Workflow & Delivery Skills",
    desc: "Educators should learn how AI fits into repeatable systems like plan, teach, assign, review, and improve workflows.",
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: "Teachers",
    desc: "Teachers can use AI skills to support topic planning, class materials, explanations, and smoother academic execution.",
  },
  {
    icon: Users,
    title: "Tutors",
    desc: "Tutors can use AI skills for notes, examples, revision flow, assignments, and clearer learner communication.",
  },
  {
    icon: Video,
    title: "Trainers",
    desc: "Trainers can use AI skills to improve decks, teaching structure, examples, and practical delivery workflows.",
  },
  {
    icon: Lightbulb,
    title: "Mentors & Coaches",
    desc: "Mentors and coaches can use AI skills to improve clarity, content support, session prep, and communication quality.",
  },
];

const relatedPaths = [
  {
    href: "/ai-skills",
    title: "AI Skills",
    desc: "Explore the broader AI skill categories that connect teaching work with practical digital execution.",
  },
  {
    href: "/ai-skills-for-students",
    title: "AI Skills for Students",
    desc: "See the learner-side AI skills that connect well with educator-focused teaching and training systems.",
  },
  {
    href: "/ai-skills-for-beginners",
    title: "AI Skills for Beginners",
    desc: "Review the beginner-friendly AI skill path that supports practical learning and structured teaching outcomes.",
  },
  {
    href: "/best-ai-skills-to-learn",
    title: "Best AI Skills to Learn",
    desc: "Understand the wider AI skill categories that matter for modern educators and structured digital learning.",
  },
  {
    href: "/ai-generalist",
    title: "What Is an AI Expert",
    desc: "Learn how educator-focused AI skills fit into a broader AI Expert capability model.",
  },
  {
    href: "/gen-ai-masterclass",
    title: "Join Free Masterclass",
    desc: "Start with the Sikhadenge masterclass to understand how practical AI-first learning systems are taught.",
  },
];

const faqs = [
  {
    q: "Which AI skills are useful for educators?",
    a: "Useful AI skills for educators include lesson planning, content support, assignment support, presentation preparation, learner communication, and repeatable teaching workflow skills.",
  },
  {
    q: "Can AI skills help educators prepare faster?",
    a: "Yes. AI skills can reduce repetitive effort in notes, summaries, slides, assignment ideas, and class communication while keeping the process structured.",
  },
  {
    q: "Do educators need coding to learn AI skills?",
    a: "No. Many practical AI skills for educators do not require coding. A strong starting point is lesson planning, notes, communication, and teaching support workflows.",
  },
  {
    q: "Are AI tools and AI skills the same for educators?",
    a: "No. AI tools are the platforms or software. AI skills are the practical abilities to use those tools effectively for real teaching, training, and communication work.",
  },
  {
    q: "Can tutors and trainers use AI skills in daily teaching work?",
    a: "Yes. Tutors and trainers can use AI skills for topic explanation, class prep, summaries, assignments, and learner communication support.",
  },
  {
    q: "What is the biggest mistake educators make with AI?",
    a: "A common mistake is using AI outputs directly without adapting them to learner level, teaching context, subject goals, or class structure.",
  },
  {
    q: "Can AI skills help with notes, assignments, slides, and class communication?",
    a: "Yes. AI can support teaching materials, recap notes, structured assignments, slide preparation, and message clarity for learners or parents.",
  },
  {
    q: "Where should educators start learning AI properly?",
    a: "A structured learning path is the best starting point. Begin with lesson planning, notes, assignments, and repeatable teaching workflows instead of random tool exploration.",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-full border border-[#A7C7F5] bg-[#EEF5FF] px-5 py-3 text-[15px] font-semibold leading-none text-[#245EEA] shadow-[0_4px_16px_rgba(37,99,235,0.08)]">
      {children}
    </div>
  );
}

function SectionTitle({
  pill,
  title,
  desc,
}: {
  pill: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-4xl">
      <Pill>{pill}</Pill>
      <h2 className="mt-7 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#071533] md:text-[56px]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-5 max-w-4xl text-[18px] leading-[1.7] text-[#47607F] md:text-[19px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export default function AiSkillsForEducatorsPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#071533]">
      <section className="border-b border-[#E4ECF7] bg-[linear-gradient(180deg,#F8FBFF_0%,#F8FAFC_100%)]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Pill>Educator AI Skills Guide</Pill>

          <div className="mt-8 max-w-5xl">
            <h1 className="text-[42px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071533] md:text-[66px]">
              Best AI skills for educators
            </h1>
            <p className="mt-6 max-w-4xl text-[18px] leading-[1.75] text-[#47607F] md:text-[20px]">
              Educators do not need random AI usage to improve teaching. They need practical AI skills that
              support lesson planning, notes, assignments, class communication, presentations, and repeatable
              teaching workflows. A strong educator path starts with useful skills that make delivery clearer
              and preparation more efficient.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gen-ai-masterclass"
                className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)] transition hover:bg-[#1D4ED8]"
              >
                Join Free Masterclass
              </Link>
              <Link
                href="/ai-skills"
                className="inline-flex items-center justify-center rounded-full border border-[#CFE0F6] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0A2245] transition hover:border-[#A9C6EF] hover:bg-[#F7FAFF]"
              >
                Explore AI Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {quickInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D8E5F4] bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
              >
                <h3 className="text-[22px] font-semibold leading-[1.25] text-[#071533]">{item.title}</h3>
                <p className="mt-4 text-[17px] leading-[1.75] text-[#47607F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Why this matters"
            title="Why AI skills matter for educators"
            desc="Teaching and training work often requires more preparation and more communication than people realize. Practical AI skills help educators stay more structured and more efficient without losing quality."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            {whyItMatters.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[92px_1fr] gap-5 rounded-[30px]">
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE] shadow-[0_10px_24px_rgba(37,99,235,0.06)]">
                    <Icon className="h-8 w-8 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-[20px] font-semibold leading-[1.3] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 max-w-[620px] text-[17px] leading-[1.85] text-[#47607F]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Core skill categories"
            title="Main AI skill categories for educators"
            desc="A strong educator AI path should focus on practical skill areas that improve preparation, delivery, and teaching workflow quality."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[34px] border border-[#0E3A83] bg-[linear-gradient(180deg,#022A67_0%,#011B46_100%)] p-7 shadow-[0_18px_38px_rgba(1,27,70,0.22)]"
                >
                  <div className="flex h-[98px] w-[98px] items-center justify-center rounded-[28px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-10 text-[20px] font-semibold leading-[1.35] text-white">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.8] text-[#C9D7F0]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Use cases"
            title="Who can benefit from educator-focused AI skills"
            desc="Educator-focused AI skills are useful across multiple teaching roles when the learning path stays practical and delivery-oriented."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-[#D8E5F4] bg-white p-7 shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-[82px] w-[82px] items-center justify-center rounded-[24px] border border-[#CFE0F6] bg-[#EAF2FE]">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-7 text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.82] text-[#47607F]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E3EBF7] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="Related learning paths"
            title="Explore connected AI learning pages"
            desc="These pages connect educator-focused AI learning with the broader Sikhadenge topic cluster around skills, learners, and AI-first digital capability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPaths.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[30px] border border-[#D8E5F4] bg-[#FBFDFF] p-7 shadow-[0_10px_28px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-[#BFD4F3] hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[20px] font-semibold leading-[1.35] text-[#071533]">{item.title}</h3>
                    <p className="mt-4 text-[16px] leading-[1.78] text-[#47607F]">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#2563EB] transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <SectionTitle
            pill="FAQs"
            title="Frequently asked questions"
            desc="These are the common questions people ask before starting AI skills for teaching and training work."
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-[28px] border border-[#D8E5F4] bg-white px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.03)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-semibold leading-[1.5] text-[#071533] marker:content-none">
                  <span>{item.q}</span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#D8E5F4] bg-[#F9FBFF] text-[#2563EB] transition group-open:rotate-180">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </span>
                </summary>
                <p className="pt-4 pr-2 text-[16px] leading-[1.85] text-[#47607F]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
