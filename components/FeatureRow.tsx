const features = [
  {
    title: "Live + Practical",
    desc: "Daily live sessions with assignments and review.",
  },
  {
    title: "Premium tools",
    desc: "Industry-standard software + clean workflows.",
  },
  {
    title: "Portfolio-ready",
    desc: "Build work you can present confidently.",
  },
];

export default function FeatureRow() {
  return (
    <section className="bg-sd-navy">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-sd-text">Highlights</h2>
            <div className="mt-2 text-sm text-sd-textSecondary">
              Clean layout, generous spacing, premium feel.
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((x) => (
            <div key={x.title} className="sd-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sd-navy border border-sd-blue/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#F5B301"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-sd-text">{x.title}</div>
                  <div className="mt-1 text-sm leading-6 text-sd-textSecondary">{x.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sd-divider" />
      </div>
    </section>
  );
}
