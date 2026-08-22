import Head from "next/head";
import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";
import FunnelAnalytics from "../FunnelAnalytics";
import FunnelTracker from "../FunnelTracker";
import MobileStickyCta from "../MobileStickyCta";
import RegistrationCard from "../RegistrationCard";
import TrackedCta from "../TrackedCta";

const agenda = [
  ["01", "Claude fundamentals that matter", "Understand where Claude fits best: deep reading, deliberate reasoning, long-form work and reusable context."],
  ["02", "Research & document workflows", "Turn long documents, notes and scattered sources into structured briefs, summaries and action points."],
  ["03", "Writing & communication systems", "Plan, draft and refine professional emails, reports, proposals and content with stronger consistency."],
  ["04", "Analysis & decision support", "Use Claude to organize information, compare options, extract insights and build decision-ready outputs."],
  ["05", "Reusable projects & AI workflows", "Move beyond one-off chats by creating repeatable ways to work with context, projects and practical outputs."],
] as const;

const freeBenefits = [
  ["LIVE", "Practical live masterclass", "A focused live session built around real workflows instead of feature tours."],
  ["01", "Claude workflow playbook", "A clear framework for research, writing, analysis and repeatable work."],
  ["02", "Prompt + context framework", "A reusable way to structure requests so outputs become more useful and reviewable."],
  ["03", "Real workflow demos", "See long-document, research, content and analysis examples built step by step."],
  ["04", "Masterclass workbook", "Use the session as a working reference instead of relying on scattered notes."],
  ["05", "Deep-work checklist", "A practical checklist for using Claude deliberately on professional tasks."],
  ["Q&A", "Live question time", "Bring your use case and understand how the workflow should be adapted."],
  ["WA", "WhatsApp joining updates", "Important joining instructions stay connected to your registration journey."],
] as const;

const useCases = [
  ["Research", "Research & summarize long sources"],
  ["Write", "Draft emails, reports & proposals"],
  ["Analyze", "Extract insights from complex information"],
  ["Plan", "Create project plans & roadmaps"],
  ["Docs", "Review documents & briefs"],
  ["Ideas", "Brainstorm and structure ideas"],
  ["Context", "Build reusable project context"],
  ["Present", "Structure presentations & narratives"],
  ["SOP", "Create SOPs & training documents"],
  ["Decide", "Compare options and make clearer decisions"],
] as const;

const tools = ["Email", "Docs", "Sheets", "Slides", "Notion", "Research", "Automation", "Workspace"] as const;

const proofItems = [
  ["FREE", "Current entry"],
  ["LIVE", "Practical session"],
  ["HINGLISH", "Easy to follow"],
  ["NO CODE", "Beginner friendly"],
] as const;

const audienceExtras = [
  ["Analysts", "Turn dense information into clearer working summaries."],
  ["HR & L&D", "Structure policies, learning material and internal communication."],
  ["Consultants", "Accelerate research, synthesis and client-ready documentation."],
  ["Creators", "Plan, draft and improve long-form content with more structure."],
] as const;

function ClaudeOrbitVisual() {
  return (
    <div className="claude-orbit-visual" aria-hidden="true">
      <div className="claude-orbit-ring ring-one" />
      <div className="claude-orbit-ring ring-two" />
      <div className="claude-orbit-ring ring-three" />
      <div className="claude-orbit-chip chip-doc">DOC</div>
      <div className="claude-orbit-chip chip-data">DATA</div>
      <div className="claude-orbit-chip chip-code">&lt;/&gt;</div>
      <div className="claude-orbit-chip chip-web">WEB</div>
      <div className="claude-ai-window">
        <div className="claude-ai-window-bar"><span>Claude workflow</span><i /><i /><i /></div>
        <div className="claude-ai-prompt">How can I turn this research into a decision-ready brief?</div>
        <div className="claude-ai-response">
          <span className="claude-ai-response-title">Working output</span>
          <b />
          <b />
          <b className="short" />
          <div className="claude-ai-output-grid"><em>Sources</em><em>Insights</em><em>Actions</em></div>
        </div>
      </div>
      <div className="claude-orbit-glow" />
    </div>
  );
}

function ResearchMockup() {
  return (
    <div className="claude-story-ui claude-story-docs" aria-hidden="true">
      <div className="claude-ui-top"><span>Research brief</span><i>3 sources</i></div>
      <div className="claude-doc-grid">
        <div><small>PDF</small><strong>Market research</strong><span>42 pages</span></div>
        <div><small>DOC</small><strong>Customer notes</strong><span>18 pages</span></div>
        <div><small>WEB</small><strong>Industry signals</strong><span>12 sources</span></div>
      </div>
      <div className="claude-summary-lines"><b /><b /><b /><b className="short" /></div>
    </div>
  );
}

function AnalysisMockup() {
  return (
    <div className="claude-story-ui claude-story-analysis" aria-hidden="true">
      <div className="claude-ui-top"><span>Decision analysis</span><i>Ready</i></div>
      <div className="claude-chart-bars"><b /><b /><b /><b /><b /><b /></div>
      <div className="claude-insight-list"><span>Highest impact</span><span>Key risk</span><span>Next action</span></div>
    </div>
  );
}

function WorkflowMockup() {
  return (
    <div className="claude-story-ui claude-story-flow" aria-hidden="true">
      <div><small>01</small><strong>Upload context</strong><span>Docs + notes</span></div>
      <i>→</i>
      <div><small>02</small><strong>Synthesize</strong><span>Claude workflow</span></div>
      <i>→</i>
      <div><small>03</small><strong>Ship output</strong><span>Brief + actions</span></div>
    </div>
  );
}

function ActionGallery() {
  return (
    <div className="claude-action-gallery">
      <article>
        <div className="claude-gallery-screen screen-research">
          <span>Source workspace</span><b /><b /><b /><em>12 linked references</em>
        </div>
        <h3>Research & summarize</h3>
        <p>Turn long information into structured, reviewable insight.</p>
      </article>
      <article className="is-featured">
        <div className="claude-gallery-screen screen-analysis">
          <span>Analysis board</span><div className="mini-bars"><i /><i /><i /><i /></div><em>Priority: high-impact opportunities</em>
        </div>
        <h3>Analyze & decide</h3>
        <p>Compare information, surface patterns and organize next actions.</p>
      </article>
      <article>
        <div className="claude-gallery-screen screen-content">
          <span>Working draft</span><b /><b /><b /><b className="short" /><em>Refine tone · structure · clarity</em>
        </div>
        <h3>Create professional output</h3>
        <p>Build polished reports, briefs, emails and longer-form documents.</p>
      </article>
    </div>
  );
}

export default function ClaudeFreeLandingPage({ config }: { config: FunnelConfig }) {
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

      <main className="claude-future-page">
        <div className="claude-announcement">
          <span>✦ Free Live Claude AI Masterclass</span>
          <b>Practical workflows • Live session • Limited cohort</b>
          <TrackedCta config={config} location="claude_announcement" label="Register Free" className="claude-announcement-link" />
        </div>

        <header className="claude-nav">
          <a href="#top" className="claude-brand" aria-label="SikhaDenge home">
            <Image src="/funnels/shared/sikhadenge-logo.png" width={168} height={54} alt="SikhaDenge" priority />
          </a>
          <nav aria-label="Claude masterclass sections">
            <a href="#why">Why Claude</a>
            <a href="#agenda">Agenda</a>
            <a href="#benefits">Benefits</a>
            <a href="#mentor">Mentor</a>
            <a href="#faq">FAQ</a>
          </nav>
          <TrackedCta config={config} location="claude_nav" label="Register Free" className="claude-nav-cta" />
        </header>

        <section id="top" className="claude-future-hero funnel-hero">
          <div className="claude-future-container claude-hero-grid">
            <div className="claude-hero-copy">
              <span className="claude-live-pill"><i /> LIVE CLAUDE AI MASTERCLASS</span>
              <h1>Build deeper work with <em>Claude AI.</em></h1>
              <p className="claude-hero-lead">Learn practical Claude workflows for research, long documents, professional writing, analysis and reusable project context — live, structured and beginner friendly.</p>

              <div className="claude-event-row">
                <div><span>DATE</span><strong>{config.dateLabel}</strong></div>
                <div><span>TIME</span><strong>{config.timeLabel}</strong></div>
                <div><span>FORMAT</span><strong>Live online</strong></div>
              </div>

              <div className="claude-hero-note"><span>●</span> Easy Hinglish · No coding required · Practical live demonstrations</div>

              <div className="claude-hero-actions">
                <TrackedCta config={config} location="claude_hero" label="Reserve My Free Seat" className="claude-primary-cta" />
                <a href="#agenda" className="claude-secondary-cta">See Workshop Agenda</a>
              </div>

              <div className="claude-price-chip"><span>Participation</span><strong>FREE</strong><small>Current free-entry cohort</small></div>
            </div>

            <ClaudeOrbitVisual />
          </div>
        </section>

        <section className="claude-community-strip" aria-label="SikhaDenge learning community">
          <div className="claude-future-container">
            <p>Join SikhaDenge learners building practical AI skills for real work.</p>
            <div className="claude-avatar-row" aria-hidden="true">
              {Array.from({ length: 15 }, (_, index) => <span key={index}>{String.fromCharCode(65 + (index % 10))}{(index % 7) + 1}</span>)}
              <strong>AI</strong>
            </div>
          </div>
        </section>

        <section className="claude-proof-panel">
          <div className="claude-future-container claude-proof-grid">
            <blockquote>
              <span>“</span>
              <p>The goal is not to collect more prompts. It is to learn a deliberate workflow you can reuse on real tasks.</p>
              <footer>SikhaDenge learning philosophy</footer>
            </blockquote>
            <div className="claude-proof-metrics">
              {proofItems.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section id="why" className="claude-section claude-section-soft">
          <div className="claude-future-container">
            <div className="claude-section-head centered">
              <span className="claude-eyebrow">WHY CLAUDE FOR PROFESSIONAL WORK?</span>
              <h2>Move from quick answers to structured, reviewable work.</h2>
              <p>Claude becomes more useful when you give it context, define the output and use it inside a repeatable workflow.</p>
            </div>

            <div className="claude-story-stack">
              <article>
                <div className="claude-story-copy"><span>01</span><h3>Work through long information without losing the thread</h3><p>Organize PDFs, notes and source material into summaries, questions, evidence and action points you can actually review.</p></div>
                <ResearchMockup />
              </article>
              <article>
                <div className="claude-story-copy"><span>02</span><h3>Turn analysis into clearer decisions</h3><p>Compare options, identify patterns, surface risks and transform unstructured information into a decision-ready working brief.</p></div>
                <AnalysisMockup />
              </article>
              <article>
                <div className="claude-story-copy"><span>03</span><h3>Build reusable systems instead of restarting every chat</h3><p>Create repeatable project context and working structures so recurring tasks become faster and more consistent over time.</p></div>
                <WorkflowMockup />
              </article>
            </div>
          </div>
        </section>

        <section id="agenda" className="claude-section claude-agenda-section">
          <div className="claude-future-container">
            <div className="claude-section-head split-head">
              <div><span className="claude-eyebrow">LIVE MASTERCLASS AGENDA</span><h2>A practical Claude workflow from source to finished output.</h2></div>
              <p>Each module connects to the next so you see a complete working method rather than isolated features.</p>
            </div>
            <div className="claude-agenda-grid">
              {agenda.map(([number, title, description]) => (
                <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="claude-section claude-free-reason">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">WHY IS THIS ENTRY FREE?</span><h2>Make the first practical AI learning step easy to access.</h2><p>This free masterclass is an introduction to SikhaDenge&apos;s workflow-first learning approach. Advanced implementation programs remain separate and optional.</p></div>
            <div className="claude-reason-grid">
              <div><span>01</span><strong>Learn the workflow</strong><p>Understand a practical method before deciding whether deeper training is useful for you.</p></div>
              <div><span>02</span><strong>Apply it live</strong><p>Watch real examples that connect Claude to common professional tasks.</p></div>
              <div><span>03</span><strong>Choose your next step</strong><p>Continue only if the teaching style and learning path fit your goals.</p></div>
            </div>
          </div>
        </section>

        <section id="benefits" className="claude-section claude-section-soft">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">WHAT YOU GET</span><h2>Everything needed to follow the masterclass with clarity.</h2></div>
            <div className="claude-benefit-grid">
              {freeBenefits.map(([icon, title, description]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="claude-section claude-usecase-section">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">USE CLAUDE TO</span><h2>Bring structure to the work already on your desk.</h2></div>
            <div className="claude-usecase-grid">
              {useCases.map(([icon, label]) => <div key={label}><span>{icon}</span><strong>{label}</strong></div>)}
            </div>
            <div className="claude-tools-label">Works around the tools and files you already use</div>
            <div className="claude-tools-row">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </section>

        <section className="claude-section claude-action-section">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">SEE THE WORKFLOW IN ACTION</span><h2>From source material to a usable professional output.</h2></div>
            <ActionGallery />
          </div>
        </section>

        <section className="claude-section claude-audience-section">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">BUILT FOR REAL-WORLD LEARNERS</span><h2>Useful across roles, industries and stages of your career.</h2></div>
            <div className="claude-audience-grid">
              {config.audiences.map((item) => <article key={item.title}><span>{item.title.slice(0, 2).toUpperCase()}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
              {audienceExtras.map(([title, description]) => <article key={title}><span>{title.slice(0, 2).toUpperCase()}</span><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
        </section>

        <section id="mentor" className="claude-mentor-section">
          <div className="claude-future-container claude-mentor-grid">
            <div className="claude-mentor-photo"><Image src="/funnels/shared/mentor.jpg" width={720} height={760} alt="SikhaDenge masterclass mentor" /></div>
            <div className="claude-mentor-copy">
              <span className="claude-eyebrow">GUIDED BY SIKHADENGE</span>
              <h2>Practical teaching. Clear workflows. No tool hype.</h2>
              <p>The session is designed around real professional tasks, guided demonstrations and frameworks you can continue using after the masterclass.</p>
              <div className="claude-mentor-points">
                <div><span>✓</span><strong>Live walkthroughs</strong></div>
                <div><span>✓</span><strong>Real work examples</strong></div>
                <div><span>✓</span><strong>Easy Hinglish delivery</strong></div>
                <div><span>✓</span><strong>Beginner-friendly approach</strong></div>
              </div>
              <small>SikhaDenge is an independent education provider. Claude is a product of Anthropic; no affiliation or endorsement is implied.</small>
            </div>
          </div>
        </section>

        <section className="claude-cta-band">
          <div className="claude-future-container claude-cta-band-inner">
            <div><span>READY TO WORK WITH CLAUDE MORE DELIBERATELY?</span><h2>Learn. Apply. Build a repeatable workflow.</h2><p>{config.dateLabel} • {config.timeLabel} • {config.languageLabel}</p></div>
            <TrackedCta config={config} location="claude_mid_cta" label="Reserve My Free Seat" className="claude-band-cta" />
          </div>
        </section>

        <section className="claude-section claude-register-section">
          <div className="claude-future-container claude-register-grid">
            <div className="claude-register-copy">
              <span className="claude-eyebrow">RESERVE YOUR FREE SEAT</span>
              <h2>One registration. Joining details stay connected to your learner journey.</h2>
              <p>Use the WhatsApp number you actively check. We use it for registration confirmation, joining instructions and masterclass reminders.</p>
              <div className="claude-register-facts"><div><span>ENTRY</span><strong>FREE</strong></div><div><span>LANGUAGE</span><strong>{config.languageLabel}</strong></div><div><span>SESSION</span><strong>{config.durationLabel}</strong></div></div>
            </div>
            <RegistrationCard config={config} />
          </div>
        </section>

        <section id="faq" className="claude-section claude-faq-section">
          <div className="claude-future-container">
            <div className="claude-section-head centered"><span className="claude-eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2>Everything to know before you register.</h2></div>
            <div className="claude-faq-grid">
              {config.faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="claude-final-optin">
          <div className="claude-future-container claude-final-optin-inner">
            <div><span>DON&apos;T MISS THE NEXT LIVE BATCH</span><h2>Your first Claude workflow starts with one live session.</h2><p>Reserve the free seat now and use the confirmation flow to receive the joining instructions.</p></div>
            <TrackedCta config={config} location="claude_final_cta" label="Yes, Reserve My Free Seat" className="claude-primary-cta" />
          </div>
        </section>

        <footer className="claude-footer">
          <div className="claude-future-container claude-footer-grid">
            <div><Image src="/funnels/shared/sikhadenge-logo.png" width={158} height={50} alt="SikhaDenge" /><p>Practical AI learning for real digital work.</p></div>
            <nav><a href="#why">Workshop</a><a href="#agenda">Agenda</a><a href="#benefits">Benefits</a><a href="#mentor">Mentor</a></nav>
            <nav><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/refund-policy">Refund Policy</a></nav>
            <div className="claude-footer-note"><strong>SikhaDenge • ThinkGrow Private Limited</strong><span>Independent education provider.</span></div>
          </div>
        </footer>

        <MobileStickyCta config={config} />
      </main>
    </>
  );
}
