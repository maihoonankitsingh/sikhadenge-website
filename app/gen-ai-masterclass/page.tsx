export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = {
  description: "Join Sikhadenge Gen AI Masterclass to learn practical AI skills with live mentor-led sessions, tools, projects, and career guidance.",
  alternates: {
    canonical: "/gen-ai-masterclass",
  },
};


import PageOverrides from "./_pageOverrides";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import React from 'react';
import { SectionVideoTestimonials } from "../../components/sections";

import StudentReviewsSlider from "../components/StudentReviewsSlider";

import StudentReviewsCarousel from "../../components/StudentReviewsCarousel";
import TrackedLink from "@/components/analytics/TrackedLink";

export default function GenAiMasterclassPage() {
  noStore();
  headers();
headers();
return (
    <main className="min-h-screen bg-white text-gray-900">
{/* __GENAI_MARKER__ 2026-02-17_182849__ */}
<p className="hidden">__GENAI_MARKER__ 2026-02-17_182849__</p>
        <PageOverrides />
          

      {/* =======================================================================
          SECTION 01: HERO / TOP LAYOUT (SAMPLE STYLE)
          - Edit heading, subheading, chips, video, form blocks below
      ======================================================================= */}
      

      {/* =========================
                SECTION: WHO THIS IS FOR
            ========================== */}
            <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-10">
          {/* ---------- TOP BADGES ROW (CENTER) ---------- */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#BFD7FF] bg-[#F8FBFF] px-5 py-3 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center text-sm font-semibold">
                S
              </div>
              <div className="text-sm font-semibold text-[#0F172A]">Sikhadenge</div>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#BFD7FF] bg-[#F8FBFF] px-5 py-3 shadow-sm">
              <div className="h-8 w-8 rounded-full border border-[#BFD7FF] bg-white grid place-items-center text-sm">
                🚀
              </div>
              <div className="text-sm font-semibold text-[#0F172A]">Top Startup India</div>
            </div>
          </div>

          {/* ---------- HEADLINE ---------- */}
          <h1 className="mt-8 text-center text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
            Become an AI Expert with Practical Skills
            <br className="hidden md:block" />
            for Modern Digital Work
          </h1>

          {/* ---------- SUBHEADLINE ---------- */}
          <p className="mt-4 text-center text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Learn practical AI workflows for design, content, video, marketing, productivity, and execution in one structured master program.
          </p>

          
            {/* ---------- TRUST PILLS ---------- */}
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-[#FFF7E6] px-5 py-3 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white border border-gray-200 text-base">
                👥
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold text-[#0F172A]">150,000+</div>
                <div className="text-[12px] text-slate-600">Learners Trained</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-[#FFF7E6] px-5 py-3 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white border border-gray-200 text-base">
                🔴
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold text-[#0F172A]">Live</div>
                <div className="text-[12px] text-slate-600">Interactive Training</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-[#FFF7E6] px-5 py-3 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white border border-gray-200 text-base">
                ⚙️
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold text-[#0F172A]">Practical</div>
                <div className="text-[12px] text-slate-600">Real Workflows</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-[#FFF7E6] px-5 py-3 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white border border-gray-200 text-base">
                🗣️
              </div>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold text-[#0F172A]">Hindi</div>
                <div className="text-[12px] text-slate-600">Beginner Friendly</div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SECTION 02: MAIN GRID (VIDEO LEFT + FORM RIGHT)
              - Replace iframe src + replace form fields/submit endpoint
          =================================================================== */}
          <div className="mt-10">
  <div className="mx-auto max-w-4xl">
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      <div className="aspect-video w-full">
        <video
                    className="h-full w-full"
                    src="/demo/ai-expert-program-genai-v2.mp4?v=20260405-final-gm1"
                    poster="/demo/thumbs/hero-demo.jpg?v=20260326225939"
                    controls
                    playsInline
                    preload="metadata"
                  />
      </div>

    </div>
  </div>
</div>
        </div>
      </section>

{/* PROBLEM SECTION */}
<section className="w-full bg-[#F8FAFC] border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-5 py-10 md:py-12">
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-700">
        Why this masterclass matters
      </div>
      <h2 className="mt-4 max-w-[620px] text-[24px] md:text-[34px] font-medium leading-[1.18] tracking-tight text-gray-900">
        Most people want to learn AI, but they still feel confused about where to start
      </h2>
      <p className="mt-4 max-w-[640px] text-[15px] md:text-[16px] leading-8 text-gray-600">
        They watch random content, try too many tools, and still do not build a practical workflow they can actually use for real work.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
        <div className="text-2xl">❌</div>
        <h3 className="mt-3 text-[15px] font-semibold text-gray-900">
          Too many tools
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          People see many AI tools every day but do not know which ones actually matter.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
        <div className="text-2xl">❌</div>
        <h3 className="mt-3 text-[15px] font-semibold text-gray-900">
          No clear workflow
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          They learn prompts and tools separately, but not a complete execution system.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
        <div className="text-2xl">❌</div>
        <h3 className="mt-3 text-[15px] font-semibold text-gray-900">
          Random learning
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          YouTube and short videos create interest, but they do not create structured skill-building.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
        <div className="text-2xl">❌</div>
        <h3 className="mt-3 text-[15px] font-semibold text-gray-900">
          No real practice
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Most learners never see how AI is used in practical design, content, video, and execution work.
        </p>
      </div>
    </div>
  </div>
</section>

{/* OUTCOME SECTION */}
{/* LIVE MASTERCLASS FLOW SECTION */}
<section className="w-full bg-white border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-5 py-10 md:py-12">
    <div className="max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[12px] font-medium text-violet-700">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] shadow-sm">✨</span>
        What you will see in the live masterclass
      </div>
      <h2 className="mt-4 text-[28px] md:text-[38px] font-semibold tracking-tight text-gray-900 leading-[1.15]">
        What you will see in the live masterclass
      </h2>
      <p className="mt-3 text-sm md:text-base leading-7 text-gray-600">
        The session is designed to show how modern AI workflows are being used in real digital work today.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {[
        {
          title: "AI workflow breakdown",
          desc: "Understand how multiple AI tools connect into a practical workflow.",
          icon: "🧩",
        },
        {
          title: "Real digital work examples",
          desc: "See how AI is used in real design, content and execution tasks.",
          icon: "💼",
        },
        {
          title: "Modern AI tools",
          desc: "Understand which tools are actually useful in practical workflows.",
          icon: "🛠️",
        },
        {
          title: "Future skill direction",
          desc: "Understand which AI skills will matter most in the next few years.",
          icon: "📈",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-[28px] border border-gray-200 bg-[#F8FAFC] p-6 md:p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-[rgba(15,23,42,0.04)]">
              <span className="text-[22px] leading-none">{item.icon}</span>
            </div>

            <div className="min-w-0">
              <h3 className="text-[18px] md:text-[19px] font-semibold text-gray-900 leading-7">
                {item.title}
              </h3>
              <p className="mt-3 text-sm md:text-[15px] leading-7 text-gray-600">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* MASTERCLASS PREVIEW SECTION */}
<section className="w-full bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[13px] md:text-[14px] font-semibold text-violet-700 shadow-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] shadow-sm">
          ✨
        </span>
        <span>What you will see in the live masterclass</span>
      </div>

      <h2 className="mt-6 text-[34px] md:text-[58px] font-semibold tracking-[-0.03em] text-gray-900 leading-[1.05]">
        What you will see in the live masterclass
      </h2>

      <p className="mt-5 text-[18px] md:text-[20px] leading-8 text-slate-600">
        The session is designed to show how modern AI workflows are being used in real digital work today.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-[32px] border border-gray-200 bg-[#F8FAFC] px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-gray-200 bg-white text-[28px] shadow-sm">
            🧩
          </div>
          <div>
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              AI workflow breakdown
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              Understand how multiple AI tools connect into a practical workflow.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-gray-200 bg-[#F8FAFC] px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-gray-200 bg-white text-[28px] shadow-sm">
            💼
          </div>
          <div>
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              Real digital work examples
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              See how AI is used in real design, content and execution tasks.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-gray-200 bg-[#F8FAFC] px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-gray-200 bg-white text-[28px] shadow-sm">
            🛠️
          </div>
          <div>
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              Modern AI tools
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              Understand which tools are actually useful in practical workflows.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-gray-200 bg-[#F8FAFC] px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-gray-200 bg-white text-[28px] shadow-sm">
            📈
          </div>
          <div>
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              Future skill direction
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              Understand which AI skills will matter most in the next few years.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* AI OPPORTUNITY SECTION */}
<section className="w-full bg-[#F8FAFC] border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[13px] md:text-[14px] font-semibold text-amber-700 shadow-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] shadow-sm">
          ⚡
        </span>
        <span>Why this shift matters now</span>
      </div>

      <h2 className="mt-6 text-[34px] md:text-[58px] font-semibold tracking-[-0.03em] text-gray-900 leading-[1.05]">
        AI is changing digital work faster than most people realize
      </h2>

      <p className="mt-5 text-[18px] md:text-[20px] leading-8 text-slate-600">
        The gap is growing between people who understand modern AI workflows and people who still rely only on old execution methods.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-[32px] border border-red-100 bg-white px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-red-100 bg-red-50 text-[28px] shadow-sm">
            ❌
          </div>
          <div className="w-full">
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              Without workflow clarity
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              Most people keep jumping between random tools, trending content, and scattered tutorials without building real execution capability.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                Random tool usage without direction
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                No structured AI workflow understanding
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                Confusion about what to learn next
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-emerald-100 bg-white px-8 py-8 shadow-sm">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-emerald-100 bg-emerald-50 text-[28px] shadow-sm">
            ✅
          </div>
          <div className="w-full">
            <h3 className="text-[24px] md:text-[22px] font-semibold text-gray-900 leading-tight">
              With practical AI understanding
            </h3>
            <p className="mt-5 text-[16px] md:text-[17px] leading-9 md:leading-8 text-slate-600">
              People can think more clearly about digital work, understand faster execution systems, and identify more relevant skill directions.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                Better clarity on real AI use cases
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                Stronger workflow-first thinking
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-3 text-[15px] text-slate-700">
                Better direction for future skill-building
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 rounded-[32px] border border-gray-200 bg-white px-8 py-7 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-[28px] md:text-[32px] font-semibold text-gray-900">01</div>
          <p className="mt-2 text-[15px] md:text-[16px] leading-7 text-slate-600">
            AI is becoming a workflow layer, not just a tool category.
          </p>
        </div>
        <div>
          <div className="text-[28px] md:text-[32px] font-semibold text-gray-900">02</div>
          <p className="mt-2 text-[15px] md:text-[16px] leading-7 text-slate-600">
            Digital execution is shifting toward faster, AI-assisted systems.
          </p>
        </div>
        <div>
          <div className="text-[28px] md:text-[32px] font-semibold text-gray-900">03</div>
          <p className="mt-2 text-[15px] md:text-[16px] leading-7 text-slate-600">
            People who understand the shift earlier usually adapt more effectively.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* TRUST SECTION */}
<section className="w-full bg-[#F8FAFC] border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-5 py-10 md:py-12">
    <div className="grid grid-cols-1 lg:grid-cols-[0.96fr_1.04fr] gap-8 lg:gap-10 items-start">
      <div>
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-700">
          Why learn from Sikhadenge
        </div>
        <h2 className="mt-4 max-w-[620px] text-[24px] md:text-[34px] font-medium leading-[1.18] tracking-tight text-gray-900">
          A practical learning brand focused on real digital execution, not just surface-level AI content
        </h2>
        <p className="mt-4 max-w-[640px] text-[15px] md:text-[16px] leading-8 text-gray-600">
          This session is designed to simplify the AI landscape and connect it to actual work. Instead of creating more confusion, the goal is to help learners understand how modern AI workflows can be applied in practical digital execution.
        </p>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-[#FFF7E6] text-xl">🎓</div>
            <div className="mt-4 text-[22px] font-semibold leading-none text-gray-900">150,000+</div>
            <p className="mt-1 text-sm text-gray-600">
              Learners have already engaged with Sikhadenge learning experiences.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm min-h-[190px]">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-[#FFF7E6] text-xl">🔴</div>
            <div className="mt-4 text-[22px] font-semibold leading-none text-gray-900">Live learning</div>
            <p className="mt-1 text-sm text-gray-600">
              The session is designed for real understanding through structured live explanation.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm">
        <h3 className="text-[16px] font-semibold text-gray-900">
          What makes this session useful
        </h3>

        <div className="mt-4 space-y-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-50 text-[15px] text-emerald-600">✓</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Clear explanation over hype</div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                The session focuses on clarity, not exaggerated tool promotion or random trending noise.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-50 text-[15px] text-emerald-600">✓</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Workflow-first perspective</div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Instead of isolated tools, the session explains how AI fits into practical digital work and execution systems.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-50 text-[15px] text-emerald-600">✓</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Useful for modern learners</div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Whether someone is a student, professional, freelancer, or beginner, the session is designed to make the shift easier to understand.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-50 text-[15px] text-emerald-600">✓</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Practical direction</div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Attendees leave with a more practical view of where AI can help and what kind of skill-building matters next.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-50 text-[15px] text-emerald-600">✓</div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Career relevance</div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Modern learners need clarity on how AI connects to future jobs, freelance opportunities, and digital capability building.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

        {/* =========================
            SECTION 09: VIDEO TESTIMONIALS (REELS)
        ========================== */}

<section className="mt-10 mx-auto max-w-6xl px-4">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white">🎯</span>
                    Audience Fit
                  </div>

                  <h2 className="mt-5 text-[28px] md:text-[38px] font-bold tracking-tight text-gray-900">
                    This masterclass is designed for people who want practical AI clarity, not just tool hype
                  </h2>
                  
<p className="mt-3 text-[14px] md:text-[16px] font-normal leading-7 text-gray-600 max-w-2xl mx-auto">
                    Whether you want to improve your work, explore income opportunities, or understand where AI fits in modern digital execution, this session gives you a clearer starting point.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { title: "Students", desc: "For learners who want to understand how AI skills connect to practical digital work and future career relevance.", icon: "🎓" },
                    { title: "Working professionals", desc: "For people who want to improve execution speed, content quality, and workflow efficiency using AI tools.", icon: "💼" },
                    { title: "Creators and freelancers", desc: "For creators who want to produce faster, explore modern AI workflows, and expand their service capability.", icon: "🎥" },
                    { title: "Beginners exploring AI", desc: "For people who are interested in AI but still need a simple, structured view of what to learn and why it matters.", icon: "🚀" },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-[#FFF7E6] p-6 shadow-sm transition
                                 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2563EB]/8 to-transparent" />
                      <div className="relative flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-[rgba(15,23,42,0.06)]">
                            <span className="text-xl">{c.icon}</span>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-gray-900">{c.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.desc}</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#2563EB]/0 via-[#2563EB]/35 to-[#2563EB]/0 opacity-0 transition group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

{/* =======================================================================
          SECTION 03: BOTTOM CTA BAR (OPTIONAL)
          - If you already have a bottom fixed bar in this page, remove this block
      ======================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-200 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold text-gray-900">
              Free <span className="text-xs font-semibold text-gray-500 line-through ml-2">₹1,999</span>
            </div>
            <div className="text-xs text-gray-600">Limited seats • Join now</div>
          </div>

          <TrackedLink
            href="/masterclass/register"
            action="join_free_masterclass_click"
            label="gen-ai-masterclass_bottom_bar"
            pagePath="/gen-ai-masterclass"
            className="h-12 px-6 rounded-full bg-gray-900 text-white font-semibold grid place-items-center hover:bg-gray-800 transition"
          >
            Join Free Masterclass
          </TrackedLink>
        </div>
      </div>

      {/* spacer for fixed bar */}
      <div className="h-20" />        {/* =========================
        {/* =========================
            SECTION 04: WHAT YOU'LL LEARN
        ========================== */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold">What you’ll learn</h2>
                <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">Results-focused feedback: clarity, practical workflow, and confidence after attending.</p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "AI for design workflows",
                    desc: "Understand how AI can support ideation, layout thinking, visual exploration, and faster creative execution.",
                    tag: "Design + Visual Work",
                    icon: "🎨",
                  },
                  {
                    title: "AI for content systems",
                    desc: "See how AI helps with writing support, content planning, structuring ideas, and faster content production.",
                    tag: "Content + Writing",
                    icon: "✍️",
                  },
                  {
                    title: "AI for video workflows",
                    desc: "Learn how AI fits into scripting, editing assistance, idea generation, and modern video production workflows.",
                    tag: "Video + Editing",
                    icon: "🎬",
                  },
                  {
                    title: "AI for marketing execution",
                    desc: "Explore how AI can support campaign ideas, creative testing, content adaptation, and digital marketing execution.",
                    tag: "Marketing + Campaigns",
                    icon: "📈",
                  },
                  {
                    title: "AI for productivity and execution",
                    desc: "Get practical clarity on how AI improves speed, decision support, workflow efficiency, and execution capacity.",
                    tag: "Productivity + Workflow",
                    icon: "⚙️",
                  },
                  {
                    title: "AI Expert thinking",
                    desc: "Understand how to connect multiple AI use cases into one practical skill set for modern digital work.",
                    tag: "Career + Skill Direction",
                    icon: "🧠",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sd-audience-card"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#2563EB]/8 to-transparent" />
                    <div className="relative flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-[#FFF7E6] shadow-sm">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                          {item.tag}
                        </div>
                        <h3 className="mt-3 text-base md:text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#2563EB]/0 via-[#2563EB]/35 to-[#2563EB]/0 opacity-0 transition group-hover:opacity-100" />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs md:text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Outcome:</span>
                  You’ll leave with clearer AI direction, practical use cases, and next-step skill clarity.
                </div>
              </div>
            </div>
          </div>
        </section>
{/* =========================
          SECTION 05: WHAT YOU GET
      ========================== */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center">What you get</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Live masterclass access", "Join live and learn the full workflow."],
              ["Resources pack", "Checklists + templates + prompts."],
              ["Step-by-step roadmap", "What to do after the masterclass."]
            ].map(([a,b]) => (
              <div key={a} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sd-audience-card">
                <div className="text-base font-semibold text-gray-900">{a}</div>
                <div className="mt-2 text-sm text-gray-600">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 07: AGENDA
      ========================== */}
      

      {/* =========================
          SECTION 08: INSTRUCTOR / PROOF
      ========================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center">Why Sikhadenge</h2>
          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Job-ready training with real projects, reviews, and industry workflows.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["👥 15,000+ learners trained","Trusted by 15,000+ learners across India. Outcomes-focused learning with reviews + projects."],
              ["🗓️ Live classes + practice","Daily sessions + tasks so progress stays consistent." ],
              ["🧰 Industry tools only","Adobe tools + Gen-AI workflow the same way pros work." ]
            ].map(([a,b]) => (
              <div key={a} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sd-audience-card">
                <div className="text-base font-semibold text-gray-900">{a}</div>
                <div className="mt-2 text-sm text-gray-600">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
           SECTION 09: STUDENT REVIEWS
       ========================== */}
        <section className="bg-[#FFF7E6]">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center">Learner feedback (proof)</h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto">Verified learner feedback: clear workflow, faster output, and more confidence after attending.</p>
            </div>

            <div className="mt-10">
              <StudentReviewsCarousel />
            </div>
          </div>
        </section>

        <SectionVideoTestimonials
            title="Success Stories From Real Learners"
            subtitle="Watch 10 short reels from students who attended. Tap any card to play inside the same card."
            arrows={false}
          />

{/* FINAL CTA SECTION */}
<section className="w-full bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B]">
  <div className="max-w-5xl mx-auto px-6 py-14 md:py-16">
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 md:p-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.28)]">
      <div className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[12px] font-medium text-blue-200">
        ✨ Reserve your free seat
      </div>

      <h2 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-white">
        Join the live AI masterclass and understand how AI fits into real digital work
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7 text-slate-300">
        This session helps you see how AI can support design, content, video, marketing, and execution workflows in a more practical and career-relevant way.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <TrackedLink
          href="/gen-ai-masterclass/register-one-step"
          action="register_free_click"
          label="gen-ai-masterclass_hero"
          pagePath="/gen-ai-masterclass"
          className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition hover:bg-[#1D4ED8]"
        >
          ⚡ Register for Free
        </TrackedLink>

        <a
          href="#top"
          className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          ↑ Back to Top
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">🔴 Live session</div>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Clear explanation designed to make modern AI workflows easier to understand.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">🎯 Beginner friendly</div>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Useful for students, professionals, creators, and anyone exploring AI seriously.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold text-white">🧠 Practical clarity</div>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Focused on real use cases, workflow thinking, and what to learn next.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FAQ SECTION */}
<section className="w-full bg-[#F8FAFC] border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-5 py-10 md:py-12">
    <div className="max-w-4xl">
      <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
        FAQs
      </div>

      <h2 className="mt-5 text-[30px] md:text-[40px] font-semibold tracking-tight text-gray-900 leading-[1.1]">
        Frequently asked questions
      </h2>

      <p className="mt-4 max-w-3xl text-[16px] md:text-[16px] leading-8 text-slate-600">
        Everything learners usually want to know before registering for the live AI masterclass.
      </p>
    </div>

    <div className="mt-8 space-y-3">
      {[
        {
          q: "What is this live masterclass exactly?",
          a: "This is a live session designed to help people understand how AI is changing modern digital work across design, content, video, marketing, and execution workflows."
        },
        {
          q: "Is this masterclass beginner friendly?",
          a: "Yes. The session is structured in a simple way so that even beginners can understand the direction, use cases, and workflow logic behind AI-powered work."
        },
        {
          q: "Do I need prior AI experience to attend?",
          a: "No. Prior AI experience is not required. The session is meant to create practical clarity for both beginners and people who are already exploring AI tools."
        },
        {
          q: "Is this only about AI tools?",
          a: "No. The focus is not only on tools. The session explains how tools fit into real workflows, practical execution, and skill-building direction."
        },
        {
          q: "Who should attend this masterclass?",
          a: "Students, working professionals, creators, freelancers, and beginners who want to understand how AI fits into real digital work should attend."
        },
        {
          q: "Will this session help me understand career relevance?",
          a: "Yes. The session is designed to show why AI literacy and workflow understanding are becoming increasingly important for modern career growth and digital execution."
        },
        {
          q: "Will design and content workflows be discussed?",
          a: "Yes. The session covers how AI can support practical workflows in design, content production, video thinking, marketing execution, and digital output."
        },
        {
          q: "Is this session useful for freelancers and creators?",
          a: "Yes. Freelancers and creators can use the session to understand how AI can improve speed, output quality, ideation, and service capability."
        },
        {
          q: "Is this useful for working professionals?",
          a: "Yes. Professionals can use the session to understand how AI may improve workflow efficiency, execution quality, and output capacity in digital work."
        },
        {
          q: "Will I get practical clarity or only theory?",
          a: "The session is structured around practical clarity. The goal is to connect AI concepts to real workflow thinking rather than only discussing theory."
        },
        {
          q: "Do I need a laptop to attend?",
          a: "A laptop is recommended for a better learning experience, especially if you want to explore tools and workflows more seriously after the session."
        },
        {
          q: "Is this session live or recorded?",
          a: "This is positioned as a live masterclass, which helps make the explanation more structured, engaging, and easier to follow."
        },
        {
          q: "How long will the masterclass be?",
          a: "The exact duration may vary, but the session is designed to give a focused and structured overview rather than random fragmented information."
        },
        {
          q: "What happens after registration?",
          a: "After registration, the next communication step in the funnel shares the joining details and session-related instructions."
        },
        {
          q: "What will I leave with after attending?",
          a: "You should leave with a clearer understanding of how AI fits into modern digital work, which workflows matter, and what direction to explore next."
        }
      ].map((item, index) => (
        <details
          key={index}
          className="group rounded-[20px] border border-gray-200 bg-white shadow-sm open:shadow-md transition"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
            <span className="text-[18px] md:text-[16px] font-semibold text-gray-900 leading-6 md:leading-6">
              {item.q}
            </span>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-[#F8FAFC] text-blue-600 transition group-open:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <div className="px-6 pb-6 md:px-7 md:pb-7">
            <div className="border-t border-gray-100 pt-4">
              <p className="text-[15px] md:text-[16px] leading-7 text-slate-600">
                {item.a}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>



{/* STICKY CTA BAR */}
<div className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-[#0B1220]/95 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0B1220]/80">
  <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
    <div className="min-w-0">
      <p className="truncate text-[13px] font-semibold text-white md:text-[14px]">
        Free AI Masterclass
      </p>
      <p className="truncate text-[11px] text-slate-300 md:text-[12px]">
        Practical AI workflows • Beginner friendly • Live session
      </p>
    </div>

    <a
      href="/gen-ai-masterclass/register-one-step"
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition hover:bg-[#1D4ED8] md:px-5 md:text-[14px]"
    >
      Register Free
    </a>
  </div>
</div>

<div className="h-[76px] md:h-[82px]" />



</main>
  );
}