import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";
import ProductGlyph from "../ProductGlyph";
import TrackedCta from "../TrackedCta";

const productVisuals = {
  chatgpt: {
    lab: "AI WORKFLOW LAB",
    title: "Prompt → Research → Professional Output",
    subtitle: "Turn everyday tasks into a clearer, repeatable working system.",
    steps: [
      ["01", "Context", "Define goal, background and constraints"],
      ["02", "Workflow", "Research, structure and execute the task"],
      ["03", "Output", "Reviewable work you can reuse and improve"],
    ],
    result: "Prompt system • Research • Documents • Productivity",
  },
  claude: {
    lab: "DEEP WORK LAB",
    title: "Source → Synthesis → Working Artifact",
    subtitle: "Organize long-form and complex work before asking for the final answer.",
    steps: [
      ["01", "Deep Context", "Set source material, purpose and constraints"],
      ["02", "Synthesis", "Extract, connect and structure the important ideas"],
      ["03", "Artifact", "Move from analysis to a usable working output"],
    ],
    result: "Long docs • Research • Writing • Projects • Artifacts",
  },
} as const;

export default function HeroSection({ config }: { config: FunnelConfig }) {
  const visual = productVisuals[config.product];
  const entryLabel = config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`;

  return (
    <section className="funnel-hero funnel-container">
      <div className="funnel-hero-copy">
        <div className="funnel-badge">{config.badge}</div>
        <h1>
          {config.heroTitle} <span>{config.heroHighlight}</span>
        </h1>
        <p className="funnel-hero-description">{config.heroDescription}</p>

        <div className="funnel-hero-proof" aria-label="Masterclass highlights">
          <span>Live workflow demos</span>
          <span>Beginner-friendly Hinglish</span>
          <span>Practical takeaways</span>
        </div>

        <div className="funnel-hero-actions">
          <TrackedCta config={config} location="hero" />
          <p>
            {config.offerMode === "free"
              ? "No payment required • joining details on WhatsApp"
              : `One-time ₹${config.entryPrice} entry • secure Razorpay checkout`}
          </p>
        </div>

        <div className="funnel-event-grid" aria-label="Masterclass details">
          <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
          <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
          <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
          <div><small>FORMAT</small><strong>{config.durationLabel}</strong></div>
        </div>

        <div className="funnel-hero-offerbar">
          <div><small>CURRENT ENTRY</small><strong>{entryLabel}</strong></div>
          <div><small>DELIVERY</small><strong>Live + WhatsApp</strong></div>
          <div><small>FOCUS</small><strong>Practical workflows</strong></div>
        </div>
      </div>

      <div className="funnel-hero-visual" aria-label={`${config.productLabel} workflow preview`}>
        <div className="funnel-visual-glow funnel-visual-glow-one" />
        <div className="funnel-visual-glow funnel-visual-glow-two" />

        <div className="funnel-command-window">
          <div className="funnel-command-topbar">
            <div className="funnel-window-dots" aria-hidden="true"><i /><i /><i /></div>
            <span>SIKHADENGE • {visual.lab}</span>
            <b>LIVE</b>
          </div>

          <div className="funnel-command-product">
            <ProductGlyph product={config.product} />
            <div>
              <small>{config.productLabel.toUpperCase()} WORKFLOW</small>
              <strong>{visual.title}</strong>
              <span>{visual.subtitle}</span>
            </div>
          </div>

          <div className="funnel-command-steps">
            {visual.steps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{description}</small></div>
              </article>
            ))}
          </div>

          <div className="funnel-command-result">
            <span>MASTERCLASS WORKFLOW MAP</span>
            <strong>{visual.result}</strong>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="funnel-mentor-chip">
          <Image src="/funnels/shared/mentor.jpg" width={56} height={56} alt="SikhaDenge mentor" />
          <div><small>LIVE MENTOR-LED</small><strong>Learn the method while you watch it being applied.</strong></div>
        </div>

        <div className="funnel-floating-note funnel-floating-note-one">
          <small>MASTERCLASS FOCUS</small>
          <strong>Real work, not prompt collecting</strong>
        </div>
      </div>
    </section>
  );
}
