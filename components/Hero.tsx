import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-sd-navy bg-sd-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sd-border bg-sd-surface px-3 py-1 text-xs text-sd-textSecondary">
            <span className="h-2 w-2 rounded-full bg-sd-gold" />
            Live online • Premium learning
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-sd-text md:text-5xl">
            Learn creative skills with{" "}
            <span className="text-sd-gold">industry tools</span>.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-sd-textSecondary">
            Graphic Design • Video Editing • AI workflows. Clean structure, assignments, and mentor support.
          </p>

          <div className="mt-6 flex flex-wrap gap-3" id="counselling">
            <Link href="/#counselling" className="sd-btn-primary">
              Open Counselling Form
            </Link>
            <Link href="/contact" className="sd-btn-secondary">
              Talk to Support
            </Link>
          </div>

          <div className="mt-6 sd-divider" />

          <div className="mt-4 text-xs text-sd-muted">
            By submitting, you agree to Terms and Privacy Policy.
          </div>
        </div>

        <div className="sd-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sd-navy border border-sd-blue/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l10 6-10 6L2 9l10-6Z" stroke="#F5B301" strokeWidth="2" />
                <path d="M6 12v6c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-6" stroke="#F5B301" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-sd-text">How counselling works</div>
              <div className="mt-1 text-sm leading-6 text-sd-textSecondary">
                Fill the form → our team reviews → you get a callback/WhatsApp follow-up.
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              { t: "Structured roadmap", d: "Step-by-step track with clear outcomes." },
              { t: "Tool-first learning", d: "Photoshop, Illustrator, Premiere Pro, After Effects." },
              { t: "Practice routine", d: "Assignments + feedback loop." },
              { t: "Portfolio focus", d: "Work samples you can show." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-sd-border bg-sd-navy/40 p-4">
                <div className="font-semibold text-sd-text">{x.t}</div>
                <div className="mt-1 text-sm text-sd-textSecondary">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
