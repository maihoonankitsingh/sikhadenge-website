const FEATURES = [
  {
    title: "Industry-standard tools",
    desc: "No alternative software. Only tools used in real jobs and freelancing.",
  },
  {
    title: "Daily live classes",
    desc: "Structured learning flow with consistent practice and revisions.",
  },
  {
    title: "Real projects",
    desc: "Every week deliverables that become portfolio assets.",
  },
  {
    title: "Mentorship system",
    desc: "Clear feedback loops so output improves week-by-week.",
  },
  {
    title: "Portfolio-first",
    desc: "Your work is presented professionally — not random practice files.",
  },
  {
    title: "Outcome tracking",
    desc: "Assignments + checkpoints to avoid drop-offs.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs text-white/60">Why Sikhadenge</div>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Premium learning system. Practical output.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
            A structured training + project pipeline to build skills that show
            on portfolio and perform in real work.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <span className="h-2 w-2 rounded-full bg-white/80" />
              </span>
              <div>
                <div className="text-base font-semibold">{f.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">
                  {f.desc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
