import Head from "next/head";
import type { ReactNode } from "react";
import ClaudeAiVideoProofSection from "../../../components/ClaudeAiVideoProofSection";
import ClaudeBonusSection from "../../../components/ClaudeBonusSection";
import styles from "../../../styles/claude-masterclass-live.module.css";

const registerHref = "/gen-ai-masterclass/register-one-step";

const agenda = [
  ["01", "Claude fundamentals that matter", "Where Claude fits best for deep reading, deliberate work and structured output."],
  ["02", "Research & document workflows", "Turn long sources, PDFs and notes into structured briefs, summaries and action points."],
  ["03", "Writing & communication systems", "Plan, draft and refine professional emails, reports, proposals and long-form content."],
  ["04", "Analysis & decision support", "Compare options, extract insights, surface risks and organize decision-ready outputs."],
  ["05", "Reusable project workflows", "Build repeatable context and working structures instead of restarting every task from zero."],
] as const;

const benefits = [
  ["LIVE", "Practical live masterclass", "A focused live session built around real workflows instead of feature tours."],
  ["01", "Claude workflow playbook", "A clear framework for research, writing, analysis and repeatable work."],
  ["02", "Prompt + context framework", "A reusable way to structure requests so outputs become more useful and reviewable."],
  ["03", "Real workflow demos", "See long-document, research, content and analysis examples built step by step."],
  ["04", "Masterclass workbook", "Use the session as a working reference instead of scattered notes."],
  ["05", "Deep-work checklist", "A practical checklist for deliberate professional use of Claude."],
  ["Q&A", "Live question time", "Bring your use case and understand how to adapt the workflow."],
  ["WA", "WhatsApp joining flow", "Continue through SikhaDenge's existing registration and joining workflow."],
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

const audience = [
  ["Working professionals", "Improve research, writing and everyday digital work."],
  ["Students & job seekers", "Build a practical AI workflow for projects and career preparation."],
  ["Freelancers & creators", "Structure client work, research and content more efficiently."],
  ["Business owners", "Use AI to improve planning, communication and decision support."],
] as const;

function Cta({ children }: { children: ReactNode }) {
  return <a className={styles.primary} href={registerHref}>{children}</a>;
}

function ClaudeVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.orbit} />
      <div className={styles.orbit2} />
      <div className={styles.orbit3} />
      <div className={`${styles.chip} ${styles.chip1}`}>DOC</div>
      <div className={`${styles.chip} ${styles.chip2}`}>DATA</div>
      <div className={`${styles.chip} ${styles.chip3}`}>&lt;/&gt;</div>
      <div className={`${styles.chip} ${styles.chip4}`}>WEB</div>
      <div className={styles.window}>
        <div className={styles.windowTop}><span>Claude workflow</span><span className={styles.dots}><i /><i /><i /></span></div>
        <div className={styles.prompt}>How can I turn this research into a decision-ready brief?</div>
        <div className={styles.answer}>
          <strong>Working output</strong><b /><b /><b />
          <div className={styles.answerGrid}><span>Sources</span><span>Insights</span><span>Actions</span></div>
        </div>
      </div>
    </div>
  );
}

function ClaudeFreeMasterclassPage() {
  return (
    <>
      <Head>
        <title>Live Claude AI Masterclass | SikhaDenge</title>
        <meta name="description" content="Join SikhaDenge's live Claude AI masterclass for practical research, long-document, writing, analysis and productivity workflows." />
        <meta property="og:title" content="Live Claude AI Masterclass | SikhaDenge" />
        <meta property="og:description" content="Learn practical Claude AI workflows for professional work in a live beginner-friendly session." />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <span className={styles.livePill}><i /> Live Claude AI Masterclass</span>
              <h1>Build deeper work with <em>Claude AI.</em></h1>
              <p className={styles.lead}>Learn practical Claude workflows for research, long documents, professional writing, analysis and reusable project context — live, structured and beginner friendly.</p>
              <div className={styles.eventGrid}>
                <div><span>DATE</span><strong>Next Live Batch</strong></div>
                <div><span>TIME</span><strong>8:00 PM IST</strong></div>
                <div><span>FORMAT</span><strong>Live Online</strong></div>
              </div>
              <p className={styles.note}>Easy Hinglish · No coding required · Practical live demonstrations</p>
              <div className={styles.heroActions}>
                <Cta>Reserve My Free Seat</Cta>
                <a className={styles.secondary} href="#agenda">See Workshop Agenda</a>
              </div>
              <div className={styles.price}><span>Participation</span><strong>FREE</strong><small>Current free-entry cohort</small></div>
            </div>
            <ClaudeVisual />
          </div>
        </section>

        <section className={styles.community}>
          <div className={styles.container}>
            <p>Join SikhaDenge learners building practical AI skills for real work.</p>
            <div className={styles.avatars} aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i}>{String.fromCharCode(65 + (i % 10))}{(i % 7) + 1}</span>)}</div>
          </div>
        </section>

        <section className={styles.proof}>
          <div className={`${styles.container} ${styles.proofGrid}`}>
            <div className={styles.quote}><i>“</i><p>The goal is not to collect more prompts. It is to learn a deliberate workflow you can reuse on real tasks.</p><small>SikhaDenge learning philosophy</small></div>
            <div className={styles.metrics}>
              <div className={styles.metric}><strong>FREE</strong><span>Current entry</span></div>
              <div className={styles.metric}><strong>LIVE</strong><span>Practical session</span></div>
              <div className={styles.metric}><strong>HINGLISH</strong><span>Easy to follow</span></div>
              <div className={styles.metric}><strong>NO CODE</strong><span>Beginner friendly</span></div>
            </div>
          </div>
        </section>

        <ClaudeAiVideoProofSection registerHref={registerHref} />

        <section className={styles.section} id="agenda">
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>LIVE MASTERCLASS AGENDA</span><h2>One practical workflow from source to finished output.</h2><p>Each module connects to the next so you see a usable working method instead of isolated feature demos.</p></div>
            <div className={styles.agendaGrid}>{agenda.map(([number, title, text]) => <article key={number}><b>{number}</b><strong>{title}</strong><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>WHY IS THIS ENTRY FREE?</span><h2>Make the first practical AI learning step easy to access.</h2><p>This free masterclass introduces SikhaDenge's workflow-first learning approach. Deeper implementation programs remain separate and optional.</p></div>
            <div className={styles.reasonGrid}>
              <article><b>01</b><strong>Learn the workflow</strong><p>Understand the method before deciding whether deeper training is useful for you.</p></article>
              <article><b>02</b><strong>Apply it live</strong><p>Watch real examples that connect Claude to common professional tasks.</p></article>
              <article><b>03</b><strong>Choose your next step</strong><p>Continue only if the teaching style and learning path fit your goals.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>WHAT YOU GET</span><h2>A complete practical starting kit for Claude AI.</h2></div>
            <div className={styles.benefitGrid}>{benefits.map(([tag, title, text]) => <article key={title}><b>{tag}</b><strong>{title}</strong><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>USE CLAUDE TO</span><h2>Connect Claude to the work you already do.</h2></div>
            <div className={styles.useGrid}>{useCases.map(([tag, text]) => <article key={tag}><b>{tag}</b><span>{text}</span></article>)}</div>
            <div className={styles.tools}><span>Email</span><span>Docs</span><span>Sheets</span><span>Slides</span><span>Notion</span><span>Research</span><span>Automation</span><span>Workspace</span></div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>SEE CLAUDE IN ACTION</span><h2>From source material to useful professional output.</h2></div>
            <div className={styles.gallery}>
              {[["Research & summarize", "Turn long information into structured, reviewable insight."], ["Analyze & decide", "Compare information, surface patterns and organize next actions."], ["Create professional output", "Build polished reports, briefs, emails and longer-form documents."]].map(([title, text]) => <article key={title}><div className={styles.galleryScreen}><small>{title}</small><b /><b /><b /></div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>BUILT FOR PRACTICAL LEARNERS</span><h2>Use Claude where deeper thinking and structured output matter.</h2></div>
            <div className={styles.audienceGrid}>{audience.map(([title, text]) => <article key={title}><strong>{title}</strong><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.host}>
              <div className={styles.hostImage} role="img" aria-label="SikhaDenge live learning environment" />
              <div className={styles.hostCopy}><span className={styles.eyebrow}>SIKHADENGE LIVE LEARNING</span><h2>Practical teaching. Clear workflows. Real digital work.</h2><p>The session is designed around guided demonstrations, structured explanations and practical examples so learners can understand how Claude fits into everyday professional work.</p><div className={styles.hostList}><span>Live guided learning</span><span>Beginner-friendly Hinglish</span><span>Practical workflow demos</span><span>Focused Q&A</span></div></div>
            </div>
          </div>
        </section>

        <ClaudeBonusSection registerHref={registerHref} />

        <section className={styles.ctaBand}>
          <div className={`${styles.container} ${styles.ctaGrid}`}><div><h2>Learn. Apply. Work smarter.</h2><p>Reserve your free seat and continue through SikhaDenge's existing live registration flow.</p></div><Cta>Register Now for Free</Cta></div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>FAQ</span><h2>Frequently asked questions.</h2></div>
            <div className={styles.faq}>
              <details><summary>Is this Claude masterclass really free?</summary><p>Yes. The current entry is free. Register through the SikhaDenge registration page to receive the joining flow.</p></details>
              <details><summary>Do I need coding experience?</summary><p>No. The session is designed for beginners and working professionals. Basic comfort with a browser and online tools is enough.</p></details>
              <details><summary>Which language is used?</summary><p>The session is delivered in easy Hinglish so practical concepts stay clear and accessible.</p></details>
              <details><summary>Do I need a paid Claude subscription?</summary><p>No paid plan is required to understand the core workflows. Some advanced capabilities may vary by product plan.</p></details>
              <details><summary>Where will I get the joining details?</summary><p>Complete the existing SikhaDenge registration flow with the WhatsApp number you actively use. Joining updates are shared through the official flow.</p></details>
              <details><summary>Is SikhaDenge affiliated with Anthropic?</summary><p>No. SikhaDenge is an independent education provider. Claude is a product of Anthropic.</p></details>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <div className={`${styles.container} ${styles.finalBox}`}><div><span className={styles.eyebrow}>NEXT LIVE BATCH</span><h2>Your first Claude workflow starts with one live session.</h2><p>Reserve your free seat and continue to the existing SikhaDenge registration page.</p></div><Cta>Yes, Reserve My Free Seat</Cta></div>
        </section>
      </main>
    </>
  );
}

(ClaudeFreeMasterclassPage as typeof ClaudeFreeMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ClaudeFreeMasterclassPage;
