export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            About Sikhadenge
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for practical outcomes
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/70">
            Sikhadenge is focused on industry-relevant skill training with live sessions, structured practice,
            and portfolio-oriented projects. The goal is clarity, consistency, and measurable progress.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl font-semibold">1000+</div>
            <div className="mt-1 text-sm text-white/60">Learners trained</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl font-semibold">Live</div>
            <div className="mt-1 text-sm text-white/60">Instructor-led learning</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl font-semibold">Portfolio</div>
            <div className="mt-1 text-sm text-white/60">Project-based outcomes</div>
          </div>
        </div>

        {/* Mission + Approach */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Help learners build real-world skills with a system that is structured, repeatable, and focused
              on output (not just theory).
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">How we teach</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                Live classes with clear topic breakdown
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                Practice tasks + feedback loop
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                Portfolio-first projects and checkpoints
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                Support for doubts and next-step clarity
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold">Principles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Clarity", desc: "Simple structure and clear milestones." },
              { title: "Consistency", desc: "Daily progress over random bursts." },
              { title: "Quality", desc: "Premium output standards." },
              { title: "Support", desc: "Guidance when learners get stuck." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">{v.title}</div>
                <div className="mt-2 text-sm text-white/60">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">Want to talk to the team?</div>
              <div className="mt-1 text-sm text-white/70">
                Use the Contact page for enquiry and details.
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Go to Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
