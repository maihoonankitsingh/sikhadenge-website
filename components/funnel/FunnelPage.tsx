import Head from "next/head";
import Image from "next/image";
import type { FunnelConfig } from "../../lib/funnel/types";
import FunnelAnalytics from "./FunnelAnalytics";
import FunnelTracker from "./FunnelTracker";
import RegistrationCard from "./RegistrationCard";
import TrackedCta from "./TrackedCta";

function ProductGlyph({ product }: { product: FunnelConfig["product"] }) {
  return (
    <div className="funnel-product-glyph" aria-hidden="true">
      <span>{product === "chatgpt" ? "GPT" : "C"}</span>
    </div>
  );
}

export default function FunnelPage({ config }: { config: FunnelConfig }) {
  return (
    <>
      <Head>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow" />
      </Head>

      <FunnelAnalytics />
      <FunnelTracker config={config} />

      <main className={`funnel-shell funnel-theme-${config.theme}`}>
        <div className="funnel-announcement">
          <span className="funnel-live-dot" />
          <span>Live masterclass • {config.dateLabel} • {config.timeLabel}</span>
        </div>

        <header className="funnel-topbar">
          <a href="https://sikhadenge.in" className="funnel-brand" aria-label="SikhaDenge home">
            <Image src="/funnels/shared/sikhadenge-logo.png" width={170} height={54} priority alt="SikhaDenge" />
          </a>
          <div className="funnel-top-meta">
            <span>Live</span><span>Practical</span><span>Beginner Friendly</span>
          </div>
        </header>

        <section className="funnel-hero funnel-container">
          <div className="funnel-hero-copy">
            <div className="funnel-badge">{config.badge}</div>
            <h1>{config.heroTitle} <span>{config.heroHighlight}</span></h1>
            <p className="funnel-hero-description">{config.heroDescription}</p>
            <div className="funnel-event-grid" aria-label="Masterclass details">
              <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
              <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
              <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
              <div><small>FORMAT</small><strong>{config.durationLabel}</strong></div>
            </div>
            <div className="funnel-hero-actions">
              <TrackedCta config={config} location="hero" />
              <p>{config.offerMode === "free" ? "No payment required for this entry variant." : `One-time entry fee: ₹${config.entryPrice}.`}</p>
            </div>
          </div>

          <div className="funnel-hero-visual">
            <div className="funnel-visual-orbit funnel-orbit-one" /><div className="funnel-visual-orbit funnel-orbit-two" />
            <ProductGlyph product={config.product} />
            <div className="funnel-workflow-card funnel-workflow-one"><small>INPUT</small><strong>Messy task</strong><span>Unclear prompt • scattered context</span></div>
            <div className="funnel-workflow-line" />
            <div className="funnel-workflow-card funnel-workflow-two"><small>WORKFLOW</small><strong>Structured AI process</strong><span>Context • method • output format</span></div>
            <div className="funnel-workflow-card funnel-workflow-three"><small>OUTPUT</small><strong>Usable work</strong><span>Clear • repeatable • reviewable</span></div>
          </div>
        </section>

        <section className="funnel-proof-strip"><div className="funnel-container funnel-proof-grid"><span>Live mentor-led session</span><span>Practical demonstrations</span><span>Easy Hinglish</span><span>Independent education provider</span></div></section>

        <section className="funnel-section funnel-container">
          <div className="funnel-section-heading"><span className="funnel-kicker">WHY THIS MASTERCLASS</span><h2>{config.problemTitle}</h2><p>{config.problemDescription}</p></div>
          <div className="funnel-problem-grid">
            {[["Random prompts", "One-off prompting makes quality inconsistent and difficult to repeat."],["Tool overload", "Knowing more AI names does not automatically create better work."],["No workflow", "Without a process, every task starts from zero again."],["No implementation", "Watching tutorials is different from building a working method."]].map(([title, description], index) => (
              <article className="funnel-card" key={title}><span className="funnel-card-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section className="funnel-section funnel-section-alt"><div className="funnel-container">
          <div className="funnel-section-heading"><span className="funnel-kicker">WHAT YOU WILL LEARN</span><h2>Build practical capability, not a collection of AI tricks</h2><p>The session focuses on workflows you can understand, adapt and use after the masterclass.</p></div>
          <div className="funnel-outcome-grid">{config.outcomes.map((outcome, index) => <article className="funnel-outcome-card" key={outcome.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{outcome.title}</h3><p>{outcome.description}</p></article>)}</div>
        </div></section>

        <section className="funnel-section funnel-container">
          <div className="funnel-section-heading"><span className="funnel-kicker">SEE IT LIVE</span><h2>Three transformations. No 30-tool information dump.</h2><p>The goal is to show how better structure changes the quality of work — without turning the masterclass into a full paid curriculum.</p></div>
          <div className="funnel-demo-grid">{config.demos.map((demo) => <article className="funnel-demo-card" key={demo.title}><span>{demo.eyebrow}</span><h3>{demo.title}</h3><p>{demo.description}</p></article>)}</div>
          <div className="funnel-inline-cta"><TrackedCta config={config} location="demo_section" /></div>
        </section>

        <section className="funnel-section funnel-section-alt"><div className="funnel-container">
          <div className="funnel-section-heading"><span className="funnel-kicker">WHO SHOULD ATTEND</span><h2>Built for people who want practical AI skills</h2></div>
          <div className="funnel-audience-grid">{config.audiences.map((audience) => <article key={audience.title}><h3>{audience.title}</h3><p>{audience.description}</p></article>)}</div>
        </div></section>

        <section className="funnel-section funnel-container"><div className="funnel-mentor-layout">
          <div className="funnel-mentor-image"><Image src="/funnels/shared/mentor.jpg" alt="SikhaDenge mentor" width={720} height={720} /></div>
          <div><span className="funnel-kicker">LEARN WITH SIKHADENGE</span><h2>A structured learning environment, not a random tool demo</h2><p>SikhaDenge is operated by ThinkGrow Private Limited and focuses on practical, mentor-led digital skill development. This masterclass is designed as the first step in a larger learning pathway, not as a promise of guaranteed income or employment.</p><ul className="funnel-check-list"><li>Live practical explanation</li><li>Real workflow demonstrations</li><li>Clear next-step learning path</li><li>WhatsApp-based session communication</li></ul></div>
        </div></section>

        <section className="funnel-section funnel-section-alt"><div className="funnel-container">
          <div className="funnel-section-heading"><span className="funnel-kicker">MASTERCLASS RESOURCES</span><h2>Useful resources that support implementation</h2><p>No inflated bonus values. Only resources connected to the masterclass outcome.</p></div>
          <div className="funnel-bonus-grid">{config.bonuses.map((bonus, index) => <div className="funnel-bonus-card" key={bonus}><span>{String(index + 1).padStart(2, "0")}</span><strong>{bonus}</strong></div>)}</div>
        </div></section>

        <section className="funnel-section funnel-container"><div className="funnel-next-step"><span className="funnel-kicker">WHAT COMES AFTER</span><h2>The masterclass is discovery. The workshop is implementation.</h2><p>After the live masterclass, learners who want structured hands-on implementation may be invited to the <strong>{config.workshopName}</strong>. It is an optional next step for learners who want guided practice, assignments and a more structured implementation path.</p></div></section>

        <section className="funnel-section funnel-section-alt"><div className="funnel-container funnel-register-layout">
          <div className="funnel-register-copy"><span className="funnel-kicker">RESERVE YOUR SEAT</span><h2>One form. One clear next step.</h2><p>Register with the WhatsApp number you actively use. Critical joining instructions are sent directly, so the session does not depend only on a community join.</p><div className="funnel-register-assurance"><span>✓ No password required</span><span>✓ Clear event communication</span><span>✓ Attribution tracked end-to-end</span></div></div>
          <RegistrationCard config={config} />
        </div></section>

        <section className="funnel-section funnel-container"><div className="funnel-section-heading"><span className="funnel-kicker">FAQ</span><h2>Before you register</h2></div><div className="funnel-faq-list">{config.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

        <section className="funnel-final-cta"><div className="funnel-container"><ProductGlyph product={config.product} /><h2>Learn the workflow. Then decide how far you want to take it.</h2><p>{config.productLabel} masterclass • {config.dateLabel} • {config.timeLabel}</p><TrackedCta config={config} location="final_cta" /></div></section>

        <footer className="funnel-footer"><div className="funnel-container"><Image src="/funnels/shared/sikhadenge-logo.png" width={150} height={48} alt="SikhaDenge" /><p>SikhaDenge is an independent education provider operated by ThinkGrow Private Limited. ChatGPT is a product of OpenAI. Claude is a product of Anthropic. No affiliation or endorsement is implied.</p><nav><a href="/privacy-policy">Privacy</a><a href="/terms">Terms</a><a href="/refund-policy">Refund Policy</a></nav></div></footer>

        <div className="funnel-mobile-cta"><div><small>{config.productLabel} LIVE</small><strong>{config.offerMode === "free" ? "FREE" : `₹${config.entryPrice}`}</strong></div><TrackedCta config={config} location="mobile_sticky" label="Reserve Seat" /></div>
      </main>
    </>
  );
}
