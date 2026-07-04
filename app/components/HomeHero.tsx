export const dynamic = "force-dynamic";
export const revalidate = 0;
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="w-full bg-[#0B1220]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-[0_0_18px_rgba(37,99,235,0.12)]">
          {/* soft hero glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#F5B301]/10 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-10 lg:p-12">
            {/* HERO GRID */}
            <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-center">
              {/* LEFT */}
              <div>
                <h1 className="text-white font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  Become an <span className="text-[#F5B301]">AI Expert</span>
                  <span className="block text-white/90">
                    Build real digital work across design, video, content, websites and automation
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[#B0B7C3] max-w-2xl">
                  An 8-week live guided program for students, freshers, freelancers and serious beginners who want practical AI-powered digital capability for modern digital work.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {/* Primary */}
                  <Link
                    href="#demo"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm sm:text-base font-medium text-white
                               bg-[#2563EB] shadow-[0_0_18px_rgba(37,99,235,0.55)]"
                  >
                    Watch Free Demo
                  </Link>

                  {/* Secondary */}
                  <Link
                    href="/counselling"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm sm:text-base font-medium
                               text-white border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    Open counselling form
                  </Link>

                  {/* Tertiary */}
                  <div className="flex items-center gap-5 text-sm sm:text-base">
                    <Link href="/courses" className="text-white/90 hover:text-white">
                      View courses
                    </Link>
</div>
                </div>

                {/* 1:1 Counselling (yellow) */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-[#F5B301] p-5 text-[#0B1220] shadow-[0_0_18px_rgba(245,179,1,0.55)]">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold">1:1 Counselling</div>
                      <div className="mt-1 text-sm opacity-90">
                        Course selection, laptop check, schedule, and learning plan.
                      </div>
                    </div>

                    <a
                      href="/counselling"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-[#0B1220] text-white hover:opacity-95"
                    >
                      Open form
                    </a>
                  </div>

                  <div className="mt-3 text-xs opacity-80">
                    Your details are used only for counselling and scheduling.
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#9CA3AF]">
                  Professional guidance only. Your details are used for counselling and scheduling.
                </p>
              </div>

              {/* RIGHT (DEMO) */}
              <div id="demo" className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between px-1 pb-2">
                  <span className="text-xs text-white/70">Real class preview</span>
                  <span className="text-[11px] text-white/50">click to play</span>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
                  {/* 600MB: no autoplay, no preload */}
                  <video
                    className="h-full w-full"
                    controls
                    muted
                    playsInline
                    preload="none"
                    poster="/demo/thumbs/hero-demo_v2.jpg"
                  >
                    <source src="/demo/hero-demo.mp4?v=20260405152741" type="video/mp4" />
                  </video>

                  <div className="pointer-events-none absolute inset-0 shadow-[0_0_18px_rgba(37,99,235,0.35)] rounded-xl" />
                </div>

                <p className="mt-3 text-xs text-[#B0B7C3]">
                  Screen recording from live class (tools + steps + output).
                </p>
              </div>
            </div>

            {/* FEATURE CARDS */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.18)] hover:shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-shadow">
                <div className="text-white font-semibold">Structured learning</div>
                <div className="mt-1 text-sm text-[#B0B7C3]">Daily tasks, weekly milestones, clear outcomes.</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.18)] hover:shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-shadow">
                <div className="text-white font-semibold">Portfolio output</div>
                <div className="mt-1 text-sm text-[#B0B7C3]">Project-based builds you can show.</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_18px_rgba(37,99,235,0.18)] hover:shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-shadow">
                <div className="text-white font-semibold">Support + review</div>
                <div className="mt-1 text-sm text-[#B0B7C3]">Feedback loops to improve faster.</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
