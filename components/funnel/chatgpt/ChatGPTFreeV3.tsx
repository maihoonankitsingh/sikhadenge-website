import Head from "next/head";
import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";
import FunnelAnalytics from "../FunnelAnalytics";
import FunnelTracker from "../FunnelTracker";
import MobileStickyCta from "../MobileStickyCta";
import RegistrationCard from "../RegistrationCard";
import TrackedCta from "../TrackedCta";
import styles from "../../../styles/chatgpt-masterclass-v3.module.css";

const tools = [
  "ChatGPT",
  "Google Docs",
  "Google Sheets",
  "Canva",
  "Notion",
  "Gmail",
  "PDFs",
  "Slides",
  "Research",
  "Content",
];

const agenda = [
  { n: "01", title: "Prompting that actually works", text: "Turn vague requests into structured instructions with context, constraints and output formats." },
  { n: "02", title: "Research without information chaos", text: "Break broad questions into a repeatable research workflow and produce decision-ready summaries." },
  { n: "03", title: "Files, PDFs and long documents", text: "Extract, compare, organize and rewrite information from real work documents more systematically." },
  { n: "04", title: "Writing and communication systems", text: "Build better emails, proposals, briefs, content plans and professional drafts with reusable structures." },
  { n: "05", title: "Data and productivity workflows", text: "Reason through tables, repetitive tasks and everyday work using step-by-step AI workflows." },
  { n: "06", title: "From one-off chat to reusable system", text: "Combine prompting, review and refinement into a repeatable workflow you can apply after the session." },
];

const resources = [
  { n: "1", title: "Prompt Starter Pack", text: "A practical starting library for everyday work and learning tasks." },
  { n: "2", title: "Professional Prompt Framework", text: "A reusable structure for context, task, constraints, examples and output." },
  { n: "3", title: "AI Research Checklist", text: "A compact checklist for better research quality and review." },
  { n: "4", title: "Workflow Map + Workbook", text: "A guided map to turn what you learn into repeatable working habits." },
];

const audiences = [
  ["Working professionals", "Write, research, analyse and communicate faster."],
  ["Students & job seekers", "Improve study, projects, applications and career preparation."],
  ["Freelancers & creators", "Structure client work, ideas, content and repeatable delivery."],
  ["Founders & business owners", "Use AI for planning, communication and everyday operations."],
];

const faqs = [
  ["Is this masterclass really free?", "Yes. This route is the free live masterclass registration experience."],
  ["Is it live or recorded?", "It is designed as a live practical session with demonstrations and Q&A."],
  ["Do I need coding knowledge?", "No. Basic comfort using a browser and online tools is enough."],
  ["Which language will be used?", "The session is delivered in easy Hinglish so the workflows remain practical and clear."],
  ["Do I need ChatGPT Plus?", "No paid ChatGPT plan is required to understand the core workflows. Some advanced capabilities can vary by plan."],
  ["Where will I receive the joining link?", "Joining instructions and important reminders are sent through your registered WhatsApp number via the official SikhaDenge flow."],
  ["Who should attend?", "Working professionals, students, job seekers, freelancers, creators and business owners who want practical AI workflows."],
  ["Is SikhaDenge affiliated with OpenAI?", "No. SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI."],
];

function WorkflowPreview() {
  return (
    <div className={styles.workflowPreview} aria-label="ChatGPT workflow preview">
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <strong>ChatGPT workflow</strong>
      </div>
      <div className={styles.workflowBody}>
        <div className={styles.workflowSidebar}>
          <span>Research brief</span>
          <span>Client proposal</span>
          <span>Content plan</span>
        </div>
        <div className={styles.workflowChat}>
          <div className={styles.userPrompt}>Turn these scattered notes into a decision-ready brief.</div>
          <div className={styles.aiAnswer}>
            <b>Working brief</b>
            <i />
            <i />
            <i className={styles.shortLine} />
            <div className={styles.outputPills}>
              <span>Summary</span>
              <span>Risks</span>
              <span>Next actions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatGPTFreeV3({ config }: { config: FunnelConfig }) {
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

      <main className={styles.page}>
        <div className={styles.ticker}>
          <span>● LIVE MASTERCLASS</span>
          <span>{config.dateLabel}</span>
          <span>{config.timeLabel}</span>
          <span>FREE REGISTRATION</span>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.badge}>LIVE · CHATGPT MASTERCLASS · SIKHADENGE</span>
                <h1>
                  Stop collecting prompts.
                  <span> Build real work with ChatGPT.</span>
                </h1>
                <p className={styles.heroLead}>
                  Learn practical ChatGPT workflows for prompting, research, files, writing,
                  data and everyday productivity — in one beginner-friendly live session.
                </p>

                <div className={styles.eventGrid}>
                  <div><small>LIVE BATCH</small><strong>{config.dateLabel}</strong></div>
                  <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
                  <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
                  <div><small>ENTRY</small><strong className={styles.free}>FREE</strong></div>
                </div>

                <div className={styles.heroActions}>
                  <TrackedCta config={config} location="chatgpt_v3_hero" className={styles.primaryCta} />
                  <a href="#agenda" className={styles.secondaryCta}>See 2-Hour Agenda</a>
                </div>

                <div className={styles.microProof}>
                  <span><b>1.5 Lakh+</b> learners</span>
                  <span><b>4.9/5</b> learner rating</span>
                  <span><b>No coding</b> required</span>
                </div>
              </div>

              <div className={styles.heroVisual}>
                <WorkflowPreview />
                <div className={`${styles.floatCard} ${styles.floatTop}`}><b>Prompt</b><span>Clear context</span></div>
                <div className={`${styles.floatCard} ${styles.floatBottom}`}><b>Output</b><span>Ready to use</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.trustBand}>
          <div className={styles.container}>
            <p>Built for people who want to use AI at work — not just watch another tool demo.</p>
            <div className={styles.roleStrip}>
              <span>Professionals</span><span>Students</span><span>Freelancers</span><span>Creators</span><span>Founders</span><span>Teams</span>
            </div>
          </div>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.container}>
            <div className={styles.statGrid}>
              <article><span>LIVE</span><strong>Practical walkthrough</strong><p>See workflows built step by step, not only slides.</p></article>
              <article><span>EASY</span><strong>Beginner friendly</strong><p>No technical background or coding required.</p></article>
              <article><span>HINGLISH</span><strong>Clear explanations</strong><p>Simple language with work-focused examples.</p></article>
              <article><span>USEFUL</span><strong>Reusable systems</strong><p>Take away structures you can apply after the session.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.toolsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>WORK WITH WHAT YOU ALREADY USE</span>
              <h2>Connect ChatGPT thinking to everyday digital work.</h2>
              <p>Use AI as a workflow layer across documents, research, communication, content and productivity.</p>
            </div>
            <div className={styles.toolGrid}>
              {tools.map((tool, index) => <div key={tool}><span>{String(index + 1).padStart(2, "0")}</span><strong>{tool}</strong></div>)}
            </div>
          </div>
        </section>

        <section className={styles.demoSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>SEE THE DIFFERENCE</span>
              <h2>From random chat to a repeatable professional workflow.</h2>
            </div>
            <div className={styles.demoGrid}>
              <article>
                <div className={styles.miniUi}><span>Scattered input</span><i/><i/><i/></div>
                <small>BEFORE</small><h3>Unclear request</h3><p>Broad prompts create inconsistent outputs that are hard to reuse.</p>
              </article>
              <article className={styles.demoFeatured}>
                <div className={styles.miniUi}><span>Structured workflow</span><i/><i/><i/><b>Context → Task → Format → Review</b></div>
                <small>WORKFLOW</small><h3>Deliberate process</h3><p>Use a repeatable instruction and review loop instead of guessing prompts.</p>
              </article>
              <article>
                <div className={styles.miniUi}><span>Professional output</span><i/><i/><i/></div>
                <small>AFTER</small><h3>Ready-to-use result</h3><p>Move toward clearer briefs, summaries, drafts, plans and next actions.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="agenda" className={styles.agendaSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>2-HOUR LIVE LEARNING MAP</span>
              <h2>Exactly what you’ll learn in the masterclass.</h2>
              <p>One focused path from better instructions to reusable AI workflows.</p>
            </div>
            <div className={styles.agendaGrid}>
              {agenda.map((item) => (
                <article key={item.n}>
                  <span>{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
            <TrackedCta config={config} location="chatgpt_v3_agenda" label="Reserve My Free Seat" className={styles.centerCta} />
          </div>
        </section>

        <section className={styles.resourcesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>PRACTICAL RESOURCES</span>
              <h2>Leave with a starter system, not just session notes.</h2>
            </div>
            <div className={styles.resourceGrid}>
              {resources.map((item) => (
                <article key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.outputSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>PRACTICAL OUTPUTS</span>
              <h2>Use ChatGPT to move from raw information to useful work.</h2>
            </div>
            <div className={styles.outputGrid}>
              <article><div className={styles.outputMock}><b>Research Brief</b><i/><i/><i/></div><h3>Research → decision brief</h3><p>Organize findings, trade-offs and next actions.</p></article>
              <article><div className={styles.outputMock}><b>Proposal Draft</b><i/><i/><i/></div><h3>Notes → professional draft</h3><p>Convert scattered context into structured communication.</p></article>
              <article><div className={styles.outputMock}><b>Workflow Plan</b><i/><i/><i/></div><h3>Repeat task → workflow</h3><p>Create a reusable process for work you do often.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>WHO THIS IS FOR</span>
              <h2>Practical AI skills for the work in front of you.</h2>
            </div>
            <div className={styles.audienceGrid}>
              {audiences.map(([title, text]) => <article key={title}><span>✓</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className={styles.mentorSection}>
          <div className={`${styles.container} ${styles.mentorGrid}`}>
            <div className={styles.mentorImage}>
              <Image src="/funnels/shared/mentor.jpg" alt="SikhaDenge mentor" width={760} height={760} sizes="(max-width: 800px) 100vw, 42vw" />
            </div>
            <div className={styles.mentorCopy}>
              <span className={styles.eyebrow}>LEARN WITH SIKHADENGE</span>
              <h2>Practical teaching. Clear workflows. Real digital work.</h2>
              <p>SikhaDenge is operated by ThinkGrow Private Limited and focuses on mentor-led digital skill development with practical demonstrations and a clear learning path.</p>
              <div className={styles.mentorChecks}>
                <span>Live walkthroughs</span><span>Work-focused examples</span><span>Beginner-friendly delivery</span><span>WhatsApp session updates</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.registrationSection}>
          <div className={styles.container}>
            <div className={styles.registrationIntro}>
              <span className={styles.eyebrow}>FREE LIVE MASTERCLASS</span>
              <h2>Your first better ChatGPT workflow starts here.</h2>
              <p>Reserve once. Get the live-session confirmation and joining instructions on WhatsApp.</p>
              <div className={styles.registrationFacts}><span>{config.dateLabel}</span><span>{config.timeLabel}</span><span>{config.languageLabel}</span><span>FREE</span></div>
            </div>
            <RegistrationCard config={config} />
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2>Questions before you reserve your seat?</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={styles.container}>
            <div className={styles.finalCard}>
              <div><span className={styles.eyebrow}>START PRACTICALLY</span><h2>Learn ChatGPT as a workflow, not a collection of tricks.</h2></div>
              <TrackedCta config={config} location="chatgpt_v3_final" label="Reserve My Free Seat" className={styles.lightCta} />
            </div>
          </div>
        </section>

        <div className={styles.legalNote}>SikhaDenge · A brand of ThinkGrow Private Limited · Independent education provider</div>
        <MobileStickyCta config={config} />
      </main>
    </>
  );
}
