import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Expert Program Syllabus | Sikhadenge",
  description: "AI Expert Program syllabus by Sikhadenge.",
};

export default function SyllabusPage() {
  return (
    <main className="min-h-screen bg-[#EEF2F7] px-3 py-3 md:px-6 md:py-6">
      <section className="mx-auto w-full max-w-[1660px] rounded-[30px] border border-[#D5DEE8] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),rgba(238,242,247,0.98)_58%,rgba(232,238,245,1)_100%)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8 xl:p-10">
        <div className="grid items-center gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="h-full min-h-[110px] w-[3px] rounded-full bg-[#5E87C7] md:min-h-[160px]" />
              <div>
                <div className="text-[22px] font-semibold tracking-[-0.02em] text-[#3C6FC0] md:text-[34px]">
                  Sikhadenge Presents
                </div>

                <h1 className="mt-5 text-[56px] font-extrabold leading-[0.92] tracking-[-0.06em] text-[#08152E] md:text-[100px] xl:text-[132px]">
                  AI Expert
                  <span className="block">Program</span>
                </h1>

                <p className="mt-6 max-w-[760px] text-[24px] leading-[1.12] tracking-[-0.035em] text-[#111827] md:text-[46px] xl:text-[58px]">
                  Master AI-Powered Digital Skills
                  <br />
                  for the Modern Future
                </p>

                <p className="mt-6 max-w-[760px] text-[18px] leading-8 text-[#1F2937] md:text-[28px] md:leading-[1.45]">
                  Design • Video • Content • Marketing • Websites • Automation • Freelancing
                </p>

                <div className="mt-8 max-w-[760px] space-y-4">
                  <div className="border-y border-[#D8C88F] py-3 text-[18px] font-semibold tracking-[-0.02em] text-[#111827] md:text-[30px]">
                    50 Total Classes&nbsp;&nbsp;|&nbsp;&nbsp;25 Live Classes + 25 Assignment Classes
                  </div>
                  <div className="border-b border-[#D8C88F] pb-3 text-[18px] font-semibold tracking-[-0.02em] text-[#111827] md:text-[30px]">
                    3 Hours Per Day&nbsp;&nbsp;|&nbsp;&nbsp;Guided Practical Learning
                  </div>
                </div>

                <p className="mt-8 max-w-[720px] text-[18px] leading-8 text-[#5B6472] md:text-[30px] md:leading-[1.35]">
                  A structured AI-first program for students, freelancers,
                  creators and career switchers
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] md:min-h-[620px] xl:min-h-[760px]">
            <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_52%)]" />

            <div className="absolute right-[1%] top-[4%] h-[92%] w-[96%]">
              <div className="absolute right-[2%] top-[2%] h-[96%] w-[96%] rounded-[28px] border border-[#DCE3ED] bg-[linear-gradient(180deg,rgba(255,255,255,0.70),rgba(244,247,251,0.52))] shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-[2px]" />

              <div className="absolute left-[10%] top-[18%] h-[34%] w-[22%] rounded-[18px] border border-white/70 bg-white/60 shadow-[0_14px_28px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="h-full w-full overflow-hidden rounded-[18px]">
                  <Image
                    src="/syllabus/hero-visual.png"
                    alt="AI Expert Program hero visual"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="absolute left-[38%] top-[8%] h-[21%] w-[33%] rounded-[16px] border border-white/70 bg-white/55 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur" />
              <div className="absolute left-[55%] top-[35%] h-[22%] w-[24%] rounded-[16px] border border-white/70 bg-white/52 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur" />
              <div className="absolute right-[3%] top-[16%] h-[28%] w-[22%] rounded-[16px] border border-white/70 bg-white/58 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur" />
              <div className="absolute left-[6%] bottom-[12%] h-[22%] w-[34%] rounded-[16px] border border-white/70 bg-white/54 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur" />
              <div className="absolute right-[2%] bottom-[10%] h-[18%] w-[21%] rounded-[16px] border border-white/70 bg-white/54 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur" />

              <div className="absolute left-[18%] top-[16%] h-[64%] w-[64%] rounded-full border border-[#AFC5E7] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.60),rgba(234,240,247,0.25)_58%,transparent_72%)]" />
              <div className="absolute left-[25%] top-[22%] h-[50%] w-[48%] rounded-full border border-[#9CB7E0]/60" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 900 760"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <g opacity="0.8">
                  <path d="M24 648H188" stroke="#A8BEE1" strokeWidth="2" />
                  <path d="M188 648C230 648 246 612 278 612H364" stroke="#A8BEE1" strokeWidth="2" />
                  <path d="M24 606H156" stroke="#D8C282" strokeWidth="2" />
                  <path d="M156 606C206 606 220 560 268 560H340" stroke="#D8C282" strokeWidth="2" />

                  <path d="M616 62H726" stroke="#D8C282" strokeWidth="2" />
                  <path d="M726 62C770 62 782 84 824 84H886" stroke="#D8C282" strokeWidth="2" />
                  <path d="M650 84H748" stroke="#A8BEE1" strokeWidth="2" />
                  <path d="M748 84C790 84 804 54 846 54H892" stroke="#A8BEE1" strokeWidth="2" />

                  <path d="M842 704H886" stroke="#A8BEE1" strokeWidth="2" />
                  <path d="M754 704H842" stroke="#A8BEE1" strokeWidth="2" />
                  <path d="M694 704H754" stroke="#A8BEE1" strokeWidth="2" />
                </g>

                <g fill="#A8BEE1">
                  <circle cx="706" cy="704" r="5" />
                  <circle cx="754" cy="704" r="5" />
                  <circle cx="842" cy="704" r="5" />
                </g>

                <g fill="#D8C282">
                  <circle cx="824" cy="84" r="4" />
                  <circle cx="278" cy="560" r="4" />
                </g>
              </svg>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_right_center,rgba(59,130,246,0.08),transparent_28%)]" />
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-[#D4DBE5]" />

        <div className="mt-5 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div />

          <div className="text-center">
            <div className="text-[26px] font-bold tracking-[-0.03em] text-[#111827] md:text-[40px]">
              www.sikhadenge.in
            </div>
            <div className="mt-1 text-[16px] text-[#5B6472] md:text-[22px]">
              AI-First Digital Capability Program
            </div>
          </div>

          <div className="justify-self-end text-left text-[14px] leading-7 text-[#4B5563] md:text-[18px] md:leading-9">
            <div>Email: support@sikhadenge.in</div>
            <div>Phone / WhatsApp: +91-8808505575</div>
            <div>Instagram / LinkedIn: Sikhadenge.ai</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admission"
            className="rounded-full border border-[#2F6DBA] bg-[#2F6DBA] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245EA5]"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[#CBD5E1] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC]"
          >
            Contact Team
          </Link>
        </div>
      </section>
    </main>
  );
}
