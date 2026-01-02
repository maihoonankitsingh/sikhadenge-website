const courses = [
  {
    title: "AI Powered Graphic Design",
    points: ["Design basics", "Branding + layouts", "Social creatives"],
  },
  {
    title: "AI Powered Video Editing",
    points: ["Premiere workflow", "Reels + longform", "Export formats"],
  },
  {
    title: "AI Powered Graphic Design & Video Editing",
    points: ["Combined track", "Better versatility", "Portfolio breadth"],
  },
  {
    title: "AI Mastery in Design and Editing",
    points: ["AI workflows", "Productivity systems", "Creative output speed"],
  },
];

export default function CourseGrid() {
  return (
    <section className="bg-sd-navy">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-sd-text">Courses</h2>
        <div className="mt-2 text-sm text-sd-textSecondary">
          Premium EdTech style. No gaming neon. Only blue + gold accents.
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {courses.map((c) => (
            <div key={c.title} className="sd-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold text-sd-text">{c.title}</div>
                  <ul className="mt-3 grid gap-2 text-sm text-sd-textSecondary">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-sd-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sd-navy border border-sd-blue/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M4 7h16M4 12h10M4 17h16"
                      stroke="#F5B301"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-5 sd-divider" />

              <div className="mt-4 flex gap-3">
                <a href="/#counselling" className="sd-btn-primary">Counselling</a>
                <a href="/contact" className="sd-btn-secondary">Ask a question</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
