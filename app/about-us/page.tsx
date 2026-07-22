import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  Gauge,
  Layers3,
  Megaphone,
  PenTool,
  Rocket,
  Sparkles,
  Target,
  Users,
  Video,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sikhadenge — an India-focused AI and digital skill learning platform helping students, freelancers, creators, and working professionals build practical capability with structured learning, guided execution, and real output.',
  alternates: {
    canonical: 'https://sikhadenge.in/about-us',
  },
  openGraph: {
    title: 'About Us | Sikhadenge',
    description:
      'India-focused AI and digital skill learning platform for practical capability, guided execution, and real output.',
    url: 'https://sikhadenge.in/about-us',
    siteName: 'Sikhadenge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Sikhadenge',
    description:
      'India-focused AI and digital skill learning platform for practical capability, guided execution, and real output.',
  },
}

const faqItems = [
  {
    question: 'What is Sikhadenge?',
    answer:
      'Sikhadenge is an India-focused AI and digital skill learning platform that helps learners build practical capability across design, video editing, AI content creation, marketing, websites, and digital workflows.',
  },
  {
    question: 'Who is Sikhadenge for?',
    answer:
      'Our learning paths are designed for students, freshers, freelancers, creators, career switchers, and working professionals who want structured learning with practical output.',
  },
  {
    question: 'What makes Sikhadenge different?',
    answer:
      'We focus on execution, guided practice, review-driven improvement, and work-oriented outcomes instead of passive content consumption.',
  },
  {
    question: 'What kind of skills can I learn?',
    answer:
      'You can build capability in graphic design, video editing, content creation with AI, digital marketing, websites, and productivity workflows.',
  },
  {
    question: 'Do you offer guided learning?',
    answer:
      'Yes. Sikhadenge emphasizes guided learning with structure, assignments, checkpoints, implementation support, and practical feedback.',
  },
  {
    question: 'Is Sikhadenge only for beginners?',
    answer:
      'No. Our programs support both beginners and learners who already have basic exposure but want stronger execution standards and better real-world output.',
  },
  {
    question: 'Does Sikhadenge focus on practical work?',
    answer:
      'Yes. Practical execution is one of the core foundations of Sikhadenge. We aim to help learners produce visible work, not just consume theory.',
  },
  {
    question: 'How can I contact Sikhadenge?',
    answer:
      'You can use the Contact page to submit your enquiry or connect with the team for learner support, admissions, and business-related discussions.',
  },
]

const foundations = [
  {
    index: '01',
    title: 'Structured learning',
    text: 'Clear progression, guided sessions, and a framework that helps learners move from confusion to consistent execution.',
    tone: 'blue',
  },
  {
    index: '02',
    title: 'Real output',
    text: 'Assignments and workflow-based practice help learners create visible digital work with practical confidence.',
    tone: 'amber',
  },
  {
    index: '03',
    title: 'Future-ready relevance',
    text: 'We focus on modern digital capability including AI-assisted workflows and practical tools that matter today.',
    tone: 'green',
  },
  {
    index: '04',
    title: 'Execution standards',
    text: 'Guided review, checkpoints, and iteration help learners improve quality, clarity, and consistency.',
    tone: 'purple',
  },
]

const stats = [
  { value: '10+', label: 'Structured programs' },
  { value: '35K+', label: 'Trained learners' },
  { value: '95%', label: 'Learner satisfaction' },
  { value: '20+', label: 'Mentors & trainers' },
]

const differences = [
  {
    title: 'AI-first learning',
    text: 'Learners build around modern AI-powered workflows, practical execution, and visible outcomes.',
    tone: 'blue',
  },
  {
    title: 'Multi-domain capability',
    text: 'We connect design, video, content, marketing, websites, and workflows instead of teaching isolated tools.',
    tone: 'amber',
  },
  {
    title: 'Guided learning + support',
    text: 'Clear guidance, review loops, and structure help learners improve with stronger consistency.',
    tone: 'green',
  },
]

const capabilityAreas = [
  {
    title: 'Design with AI',
    text: 'Posters, social creatives, branding assets, layouts, and AI-assisted visual execution for modern digital work.',
    tone: 'blue',
  },
  {
    title: 'Edit videos with AI',
    text: 'Short-form video workflows, reels, editing structure, storytelling, and AI-assisted production output.',
    tone: 'purple',
  },
  {
    title: 'Create content with AI',
    text: 'Content ideation, writing support, captions, creatives, and execution systems for faster content production.',
    tone: 'green',
  },
  {
    title: 'Market with AI assets',
    text: 'Ad creatives, campaign assets, launch materials, communication visuals, and practical marketing execution.',
    tone: 'amber',
  },
]

const heroHighlights = [
  { title: 'Learn with structure', tone: 'blue' },
  { title: 'Build real output', tone: 'green' },
  { title: 'Improve with review', tone: 'amber' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const iconToneClasses: Record<string, string> = {
  blue: 'from-[#5B8CFF] to-[#2453F6] shadow-[0_18px_30px_rgba(37,99,235,0.28)]',
  green: 'from-[#31D0AA] to-[#109E83] shadow-[0_18px_30px_rgba(16,185,129,0.24)]',
  amber: 'from-[#FFBC57] to-[#F58A07] shadow-[0_18px_30px_rgba(245,158,11,0.24)]',
  purple: 'from-[#9B7BFF] to-[#6D4CFF] shadow-[0_18px_30px_rgba(124,58,237,0.24)]',
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#D9E3FF] bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2453F6] shadow-sm">
      {children}
    </span>
  )
}

function resolveGlowIcon(label: string) {
  const normalized = label.trim().toLowerCase()

  if (normalized === '01') return BookOpenCheck
  if (normalized === '02') return Layers3
  if (normalized === '03') return BadgeCheck
  if (normalized === '04') return Gauge

  if (
    normalized === 'm' ||
    normalized.includes('mission')
  ) {
    return Target
  }

  if (
    normalized === 'g' ||
    normalized.includes('goal')
  ) {
    return Rocket
  }

  if (
    normalized === 'gs' ||
    normalized.includes('guided') ||
    normalized.includes('support')
  ) {
    return Users
  }

  if (
    normalized === 'ai' ||
    normalized.includes('ai-first') ||
    normalized.includes('design')
  ) {
    return Sparkles
  }

  if (
    normalized.includes('multi-domain') ||
    normalized.includes('capability')
  ) {
    return Boxes
  }

  if (normalized.includes('video')) {
    return Video
  }

  if (normalized.includes('content')) {
    return PenTool
  }

  if (
    normalized.includes('market') ||
    normalized.includes('campaign')
  ) {
    return Megaphone
  }

  return Sparkles
}

function GlowIcon({
  label,
  tone = 'blue',
}: {
  label: string
  tone?: 'blue' | 'green' | 'amber' | 'purple'
}) {
  const Icon = resolveGlowIcon(label)

  return (
    <div
      aria-label={label}
      className="relative h-12 w-12 shrink-0"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-1 bottom-0 h-9 rounded-[17px] bg-slate-950/20 blur-[1px]"
      />

      <span
        className={`relative grid h-11 w-11 place-items-center overflow-hidden rounded-[17px] bg-gradient-to-br text-white ring-1 ring-white/70 ${iconToneClasses[tone]}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-1 top-1 h-3 rounded-full bg-white/35 blur-sm"
        />

        <span
          aria-hidden="true"
          className="absolute -bottom-3 -right-3 h-7 w-7 rounded-full bg-slate-950/20 blur-md"
        />

        <Icon
          aria-hidden="true"
          className="relative h-5 w-5 drop-shadow-[0_2px_2px_rgba(15,23,42,0.3)]"
          strokeWidth={2.4}
        />
      </span>
    </div>
  )
}

function InfoCard({
  title,
  text,
  tone,
}: {
  title: string
  text: string
  tone: 'blue' | 'green' | 'amber' | 'purple'
}) {
  return (
    <div className="rounded-[24px] border border-[#E5ECFA] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-4">
        <GlowIcon label={title} tone={tone} />
        <div>
          <h3 className="text-lg font-extrabold tracking-tight text-[#0F172A]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-[#F6F8FC] pt-8 text-[#0F172A] md:pt-10">
        <section className="px-4 pb-8 pt-8 sm:px-6 md:pb-12 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[34px] border border-[#DCE7F8] bg-[linear-gradient(118deg,#F8FBFF_0%,#F5F9FF_50%,#EAF9FF_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10 xl:p-12">
            <div
              data-about-hero-style="phase11n-brand-3d-faq"
              className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <SectionEyebrow>India-focused learning platform</SectionEyebrow>
                  <SectionEyebrow>AI-first capability</SectionEyebrow>
                </div>

                <h1 className="mt-6 max-w-[12ch] text-4xl font-black tracking-[-0.04em] text-[#0F172A] sm:text-5xl lg:text-6xl">
                  About Sikhadenge.
                  <span className="mt-2 block text-[#2F65F5]">
                    Practical AI capability for modern digital work.
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
                  Sikhadenge is an India-focused AI and skill learning platform
                  built for students, freshers, freelancers, creators, working
                  professionals, and career switchers who want structured
                  learning, practical execution, and real digital output.
                </p>

                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
                  We connect professional tools, guided workflows,
                  project-backed implementation, and review-led improvement so
                  learners build capability that remains useful as modern work
                  evolves.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    'Students & freshers',
                    'Freelancers & creators',
                    'Working professionals',
                    'Career switchers',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#DDE6F6] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center rounded-full bg-[#2F65F5] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(47,101,245,0.28)] transition hover:-translate-y-0.5 hover:bg-[#2453F6]"
                  >
                    Explore learning paths
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-full border border-[#D6E3FA] bg-white px-5 py-3 text-sm font-bold text-[#0F172A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#BFD3FA]"
                  >
                    Talk to our team
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-[#DFE8F8] bg-white p-4 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Learning approach
                    </p>
                    <p className="mt-2 text-sm font-bold text-[#0F172A]">
                      Structured, practical and output-focused
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-[#DFE8F8] bg-white p-4 shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Capability coverage
                    </p>
                    <p className="mt-2 text-sm font-bold text-[#0F172A]">
                      Design, video, content, marketing and workflows
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-8 hidden h-24 w-24 rounded-full bg-[#79A2FF]/20 blur-3xl md:block" />
                <div className="absolute -right-4 bottom-4 hidden h-28 w-28 rounded-full bg-[#7AE0D0]/20 blur-3xl md:block" />

                <div className="relative rounded-[30px] border border-white/70 bg-white/70 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur">
                  <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-[#EEF5FF]">
                    <div className="relative aspect-[16/11]">
                      <Image
                        src="/images/about/about-hero-desk.webp"
                        alt="Sikhadenge practical digital learning environment"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-[22px] border border-white/15 bg-[#0B1635]/82 p-4 text-white shadow-[0_24px_40px_rgba(11,22,53,0.28)] backdrop-blur">
                      <div className="flex items-start gap-3">
                        <GlowIcon label="AI" tone="blue" />
                        <div>
                          <p className="text-sm font-extrabold">
                            AI-first digital capability
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-300">
                            Structured learning built around professional
                            workflows, practical execution, guided review, and
                            visible output.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {heroHighlights.map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-[20px] border border-[#DFE8F8] bg-white px-3 py-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <GlowIcon
                            label={`0${index + 1}`}
                            tone={item.tone as 'blue' | 'green' | 'amber'}
                          />
                          <p className="text-xs font-bold leading-5 text-[#0F172A]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  How we build capability
                </p>
                <h2 className="mt-2 max-w-xl text-3xl font-black tracking-[-0.03em] text-[#0F172A]">
                  Four foundations behind practical learning
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-slate-500">
                A connected learning system designed to move learners from
                direction to execution, visible output, and consistent
                improvement.
              </p>
            </div>

            <div
              data-about-foundation-style="phase11n-brand-3d-cards"
              className="mt-8 grid items-end gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {foundations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#E3EAF8] bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center justify-between">
                    <GlowIcon label={item.index} tone={item.tone as 'blue' | 'green' | 'amber' | 'purple'} />
                    <span className="text-xs font-bold text-slate-300">
                      {item.index}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F65F5]">
                    Practical capability
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[28px] overflow-hidden bg-[#082A68] shadow-[0_24px_70px_rgba(8,42,104,0.25)]">
            <div className="grid divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-7 text-center text-white">
                  <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-[28px] border border-[#E6DCC8] bg-[#FBF7EF] shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[280px]">
                    <Image
                      src="/images/about/about-mission-class.webp"
                      alt="Sikhadenge mission learning environment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <GlowIcon label="M" tone="blue" />
                      <h3 className="text-2xl font-black tracking-tight text-[#0F172A]">
                        Our Mission
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      We are building a modern learning platform that helps
                      serious learners move from scattered learning to
                      structured, practical, AI-powered digital capability.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      By focusing on real understanding, project-backed
                      implementation, guided workflows, and visible output, we
                      help learners develop capability that remains useful in
                      fast-changing digital work.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {['Practical learning', 'Industry workflows', 'Future-ready skills'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E4DED0] bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[#E6DCC8] bg-[#FBF7EF] shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <GlowIcon label="G" tone="amber" />
                      <h3 className="text-2xl font-black tracking-tight text-[#0F172A]">
                        Our Goal
                      </h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      Our goal is to build a high-trust AI-first learning
                      ecosystem that prepares learners for the next era of
                      digital work across creation, content, marketing,
                      websites, and execution-focused roles.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      We want Sikhadenge to become a platform where learners do
                      not just consume information, but build real capability
                      that stays relevant as technology, workflows, and industry
                      expectations continue to evolve.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {['AI-first ecosystem', 'Future of work', 'Practical relevance'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E4DED0] bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative min-h-[280px]">
                    <Image
                      src="/images/about/about-goal-portfolio.webp"
                      alt="Sikhadenge goal and execution outcome"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0F172A]">
              What makes Sikhadenge different?
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              A learning platform built around execution, review, structured
              progress, and real digital output — not passive content
              consumption or random tool chasing.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {differences.map((item) => (
                <InfoCard
                  key={item.title}
                  title={item.title}
                  text={item.text}
                  tone={item.tone as 'blue' | 'green' | 'amber' | 'purple'}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0F172A]">
              Capability areas we focus on
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              Practical capability areas designed to help learners build
              relevant digital skills across creative and execution-focused
              work.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {capabilityAreas.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#E3EAF8] bg-[#FBF7EF] p-5 text-left shadow-[0_12px_34px_rgba(15,23,42,0.04)]"
                >
                  <GlowIcon label={item.title} tone={item.tone as 'blue' | 'green' | 'amber' | 'purple'} />
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Practical • Output-focused
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#E5ECFA] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <div className="grid items-start gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0F172A]">
                  What do we do?
                </h2>
                <div className="mt-6 space-y-5">
                  {[
                    'We help learners build practical AI-powered capability across design, video, content, marketing, websites, and workflows so they can produce real digital output with stronger clarity and execution.',
                    'We run structured learning with guided sessions, assignments, review cycles, implementation checkpoints, and practical feedback — not just lectures.',
                    'We focus on helping learners create relevant output with stronger clarity, confidence, execution quality, and a more practical understanding of how modern AI-assisted work actually gets done.',
                    'We provide structured support so learner progress stays consistent, measurable, and aligned with the standards of modern digital work.',
                  ].map((line, idx) => (
                    <div key={line} className="flex gap-4 rounded-[20px] border border-[#EDF2FB] bg-[#FAFCFF] p-4">
                      <GlowIcon
                        label={`0${idx + 1}`}
                        tone={(idx % 2 === 0 ? 'blue' : 'green') as 'blue' | 'green'}
                      />
                      <p className="text-sm leading-7 text-slate-600">{line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#EDF2FB] bg-[#FBF7EF] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="relative overflow-hidden rounded-[24px] border border-[#E6DCC8] bg-white shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/about/about-whatwedo-group.webp"
                      alt="Sikhadenge guided learning support"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="border-t border-[#EDE5D6] bg-[#FFF9EF] p-5">
                    <div className="flex items-start gap-3">
                      <GlowIcon label="GS" tone="purple" />
                      <div>
                        <p className="text-base font-extrabold text-[#0F172A]">
                          Structured support + guided progress
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Learners move through guided sessions, review loops,
                          implementation checkpoints, and practical feedback.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-[#DCE8FF] bg-[linear-gradient(120deg,#F8FBFF_0%,#EEF4FF_100%)] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2F65F5]">
                    Guided learning
                  </p>
                  <p className="mt-2 text-lg font-extrabold tracking-tight text-[#0F172A]">
                    Built for clarity, practice, and visible output
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The goal is not just to teach tools — it is to help
                    learners build modern digital capability with better
                    structure and execution quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
        aria-labelledby="about-faq-heading"
        data-about-faq-style="contact-home-light-v1"
        className="border-y border-slate-200 bg-[#F6F8FC] px-4 py-14 sm:px-6 md:py-16 lg:px-8"
      >
        {/* ABOUT_CONTACT_STYLE_FAQ_V1 */}
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
              FAQs
            </span>

            <h2
              id="about-faq-heading"
              className="mt-6 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl"
            >
              Frequently asked questions
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Clear answers about Sikhadenge, practical learning, guided support, skill development, and learner outcomes.
            </p>
          </div>

          <div className="mt-10 space-y-4 md:mt-12">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_26px_rgba(15,23,42,0.035)] transition duration-300 open:border-blue-200 open:shadow-[0_14px_34px_rgba(37,99,235,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left text-base font-extrabold text-slate-950 outline-none sm:px-8 sm:py-7 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600 transition duration-300 group-open:rotate-180 group-open:border-blue-200 group-open:bg-blue-50 sm:h-12 sm:w-12">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="m7 10 5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-slate-100 px-6 pb-7 pt-5 text-sm leading-7 text-slate-600 sm:px-8 sm:text-base sm:leading-8">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

        <section className="px-4 pb-14 pt-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[30px] border border-[#E6E0D1] bg-[linear-gradient(90deg,#F9FBFF_0%,#FFFBEF_100%)] px-6 py-8 shadow-[0_14px_34px_rgba(15,23,42,0.04)] sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2F65F5]">
                  Learn with clarity
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#0F172A]">
                  Ready to build practical digital capability?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Explore structured learning paths or connect with the
                  Sikhadenge team to choose the right next step.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F172A] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Explore courses
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full bg-[#2F65F5] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(47,101,245,0.25)] transition hover:-translate-y-0.5"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
