export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              Live Online • Projects • Portfolio • Mentorship
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Learn Skills That
              <br />
              Actually Convert
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Industry-standard tools, live classes, real projects, and a structured mentorship system to
              build a premium portfolio.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                Get Started
              </a>
              <a
                href="/blog"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                View Blog
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">1000+</div>
                <div className="mt-1 text-xs text-white/60">Learners trained</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">Live</div>
                <div className="mt-1 text-xs text-white/60">Mentor-led classes</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold text-white">Projects</div>
                <div className="mt-1 text-xs text-white/60">Portfolio outcomes</div>
              </div>
            </div>
          </div>

          {/* Right (no course names) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
            <div className="text-xs text-white/60">What you get</div>
            <div className="mt-2 text-lg font-semibold text-white">
              A structured learning system
            </div>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm font-semibold text-white">Daily practice</div>
                <div className="mt-1 text-xs text-white/60">
                  Assignments + feedback loop to improve fast.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm font-semibold text-white">Portfolio building</div>
                <div className="mt-1 text-xs text-white/60">
                  Real project-style work that looks premium.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-sm font-semibold text-white">Mentorship & support</div>
                <div className="mt-1 text-xs text-white/60">
                  Doubt support + guidance for next steps.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="text-xs text-white/60">Outcome</div>
              <div className="mt-1 text-sm font-semibold text-white">
                Job / freelance-ready portfolio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
