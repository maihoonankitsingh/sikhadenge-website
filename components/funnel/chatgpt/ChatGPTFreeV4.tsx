import Head from "next/head";
import Image from "next/image";
import type { FunnelConfig } from "../../../lib/funnel/types";
import FunnelAnalytics from "../FunnelAnalytics";
import FunnelTracker from "../FunnelTracker";
import MobileStickyCta from "../MobileStickyCta";
import RegistrationCard from "../RegistrationCard";
import TrackedCta from "../TrackedCta";
import styles from "../../../styles/chatgpt-masterclass-v4.module.css";

type IconName = "prompt" | "research" | "document" | "writing" | "data" | "workflow";

const outcomes: Array<{ icon: IconName; title: string; text: string; tag: string }> = [
  {
    icon: "prompt",
    title: "Instruction design",
    text: "Give ChatGPT enough context, constraints and output direction to produce clearer work.",
    tag: "PROMPTING",
  },
  {
    icon: "research",
    title: "Research systems",
    text: "Break broad questions into a repeatable process and turn findings into decision-ready summaries.",
    tag: "RESEARCH",
  },
  {
    icon: "document",
    title: "Files & long documents",
    text: "Extract, compare, structure and rewrite information from PDFs, notes, briefs and source material.",
    tag: "DOCUMENTS",
  },
  {
    icon: "writing",
    title: "Professional communication",
    text: "Build better emails, proposals, briefs, plans and reusable writing structures for real work.",
    tag: "WRITING",
  },
  {
    icon: "data",
    title: "Data & productivity",
    text: "Reason through tables, repetitive tasks and everyday digital work using step-by-step workflows.",
    tag: "PRODUCTIVITY",
  },
  {
    icon: "workflow",
    title: "Reusable AI workflows",
    text: "Move from one-off chats to a method you can repeat, review, improve and apply after the session.",
    tag: "SYSTEMS",
  },
];

const problems = [
  ["Random prompts", "Different wording gives different quality, so useful results are hard to repeat."],
  ["No review method", "The first answer gets accepted without checking assumptions, structure or missing context."],
  ["Tool hopping", "More AI tools get added, but the underlying way of working stays unclear."],
];

const agenda = [
  ["01", "Prompting that actually works", "Context, constraints, examples and output formats that make instructions more reliable."],
  ["02", "Research without information chaos", "A practical workflow for exploring a topic, checking gaps and producing useful summaries."],
  ["03", "Files, PDFs and long documents", "How to extract, compare, organize and transform source material for real work."],
  ["04", "Writing and communication systems", "Emails, proposals, briefs, content plans and professional drafts with reusable structures."],
  ["05", "Data and productivity workflows", "Use AI to reason through tables, repetitive tasks and common day-to-day work."],
  ["06", "Build your reusable AI system", "Combine instruction, review and refinement into a workflow you can continue after the class."],
];

const audiences = [
  ["Working professionals", "Research, write, analyse and communicate faster with a repeatable method."],
  ["Students & job seekers", "Improve study, projects, applications, research and career preparation."],
  ["Freelancers & creators", "Structure client work, ideas, content and repeatable delivery workflows."],
  ["Founders & business owners", "Use AI for planning, communication, research and everyday operations."],
];

const resources = [
  ["01", "Prompt Starter Pack", "Practical starter prompts for everyday work and learning tasks."],
  ["02", "Professional Prompt Framework", "A reusable structure for context, task, constraints, examples and output."],
  ["03", "AI Research Checklist", "A compact quality-control checklist for better research and review."],
  ["04", "Workflow Map + Workbook", "A guided map to turn the live session into repeatable working habits."],
];

const learningPath = [
  ["WATCH", "See the workflow built live"],
  ["UNDERSTAND", "Learn why each step exists"],
  ["REPEAT", "Apply the same structure to your own task"],
  ["REFINE", "Review quality and improve the output"],
];

const faqs = [
  ["Is this masterclass really free?", "Yes. This route is the free live ChatGPT masterclass registration experience."],
  ["Is the session live or recorded?", "It is designed as a live practical session with demonstrations and Q&A."],
  ["Do I need coding knowledge?", "No. Basic comfort using a browser and online tools is enough."],
  ["Which language will be used?", "The session is delivered in easy Hinglish so the workflows remain practical and clear."],
  ["Do I need ChatGPT Plus?", "No paid ChatGPT plan is required to understand the core workflows. Some advanced capabilities can vary by plan."],
  ["Where will I receive the joining link?", "Joining instructions and important reminders are sent through your registered WhatsApp number via the official SikhaDenge flow."],
  ["Who should attend?", "Working professionals, students, job seekers, freelancers, creators and business owners who want practical AI workflows."],
  ["Is SikhaDenge affiliated with OpenAI?", "No. SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI."],
];

function MiniIcon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "prompt") {
    return <svg {...common}><path d="M4 5.5h16v10H9l-5 4v-14Z"/><path d="M8 9h8M8 12.5h5"/></svg>;
  }
  if (name === "research") {
    return <svg {...common}><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M8.5 10.5h4M10.5 8.5v4"/></svg>;
  }
  if (name === "document") {
    return <svg {...common}><path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6"/></svg>;
  }
  if (name === "writing") {
    return <svg {...common}><path d="m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.8 7.4 2.8 2.8"/></svg>;
  }
  if (name === "data") {
    return <svg {...common}><path d="M5 19V10M12 19V5M19 19v-7"/><path d="M3 19.5h18"/></svg>;
  }
  return <svg {...common}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="m6.5 10.5 4-4M13.5 6.5l4 4M17.5 13.5l-4 4M10.5 17.5l-4-4"/></svg>;
}

function WorkflowLab() {
  return (
    <div className={styles.workflowLab} aria-label="ChatGPT professional workflow example">
      <div className={styles.labTopbar}>
        <div className={styles.windowDots} aria-hidden="true"><i/><i/><i/></div>
        <span>SIKHADENGE · AI WORKFLOW LAB</span>
        <b>LIVE</b>
      </div>

      <div className={styles.labShell}>
        <aside className={styles.labRail} aria-label="Workflow stages">
          <span className={styles.activeRail}>01</span>
          <span>02</span>
          <span>03</span>
          <i aria-hidden="true"/>
        </aside>

        <div className={styles.labMain}>
          <div className={styles.labLabel}>CHATGPT WORKFLOW</div>
          <h2>Context → Method → Output</h2>
          <p>Turn an everyday task into a reviewable working system.</p>

          <div className={styles.promptBubble}>
            <small>YOUR TASK</small>
            <strong>Turn these scattered notes into a decision-ready launch brief.</strong>
          </div>

          <div className={styles.labSteps}>
            <article><span>01</span><div><b>Context</b><small>Goal, audience, source material and constraints</small></div></article>
            <article><span>02</span><div><b>Method</b><small>Research, structure, transform and review</small></div></article>
            <article><span>03</span><div><b>Output</b><small>Clear brief, risks, decisions and next actions</small></div></article>
          </div>

          <div className={styles.outputPanel}>
            <div><small>PROFESSIONAL OUTPUT</small><strong>Launch decision brief</strong></div>
            <span>Ready to review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatGPTFreeV4({ config }: { config: FunnelConfig }) {
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
        <a className={styles.skipLink} href="#main-content">Skip to content</a>

        <div className={styles.announcement}>
          <div className={styles.announcementInner}>
            <span className={styles.liveLabel}><i aria-hidden="true"/> Live ChatGPT Masterclass</span>
            <span>{config.dateLabel}</span>
            <span>{config.timeLabel}</span>
            <span>Free Registration</span>
          </div>
        </div>

        <header className={styles.header}>
          <div className={`${styles.container} ${styles.headerInner}`}>
            <a href="https://sikhadenge.in" className={styles.brand} aria-label="SikhaDenge home">
              <Image src="/funnels/shared/sikhadenge-logo.png" width={170} height={54} priority alt="SikhaDenge" />
            </a>
            <nav className={styles.nav} aria-label="Masterclass navigation">
              <a href="#outcomes">What you’ll learn</a>
              <a href="#agenda">Agenda</a>
              <a href="#mentor">Mentor</a>
            </nav>
            <TrackedCta config={config} location="chatgpt_v4_header" label="Reserve Free Seat" className={styles.headerCta} />
          </div>
        </header>

        <div id="main-content" />
        <section className={styles.hero}>
          <div className={styles.heroGridPattern} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <div className={styles.heroEyebrow}><span>LIVE</span> CHATGPT MASTERCLASS · SIKHADENGE</div>
              <h1>Stop Chatting With AI. <em>Start Working With It.</em></h1>
              <p className={styles.heroLead}>
                Learn practical ChatGPT workflows for prompting, research, files, writing, data and everyday productivity — in one beginner-friendly live session.
              </p>

              <div className={styles.heroMeta} aria-label="Masterclass details">
                <div><small>DATE</small><strong>{config.dateLabel}</strong></div>
                <div><small>TIME</small><strong>{config.timeLabel}</strong></div>
                <div><small>LANGUAGE</small><strong>{config.languageLabel}</strong></div>
                <div className={styles.freeMeta}><small>ENTRY</small><strong>FREE</strong></div>
              </div>

              <div className={styles.heroActions}>
                <TrackedCta config={config} location="chatgpt_v4_hero" label="Reserve My Free Seat" className={styles.primaryCta} />
                <a href="#agenda" className={styles.secondaryCta}>View Live Agenda <span aria-hidden="true">→</span></a>
              </div>

              <div className={styles.heroProof} aria-label="SikhaDenge learner proof">
                <div><strong>1.5 Lakh+</strong><span>Learners</span></div>
                <i aria-hidden="true" />
                <div><strong>4.9/5</strong><span>Learner rating</span></div>
                <i aria-hidden="true" />
                <div><strong>No coding</strong><span>Required</span></div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <WorkflowLab />
              <div className={styles.visualNote}><span>MASTERCLASS FOCUS</span><strong>Real work, not prompt collecting</strong></div>
            </div>
          </div>
        </section>

        <section className={styles.proofBand} aria-label="Masterclass experience">
          <div className={`${styles.container} ${styles.proofGrid}`}>
            <article><small>01</small><strong>Live mentor-led</strong><span>Watch the workflow being built, not only explained.</span></article>
            <article><small>02</small><strong>Practical workflows</strong><span>Use work-focused examples instead of generic AI tricks.</span></article>
            <article><small>03</small><strong>Easy Hinglish</strong><span>Clear explanations designed for practical understanding.</span></article>
            <article><small>04</small><strong>WhatsApp updates</strong><span>Receive joining instructions through the official flow.</span></article>
          </div>
        </section>

        <section className={styles.problemSection}>
          <div className={`${styles.container} ${styles.problemLayout}`}>
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>THE REAL PROBLEM</span>
              <h2>Most people use ChatGPT like a search box.</h2>
              <p>That works for quick answers. It is not enough for consistent professional output.</p>
            </div>
            <div className={styles.problemStack}>
              {problems.map(([title, text], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
            <aside className={styles.shiftCard}>
              <small>THE SHIFT</small>
              <strong>Chat-first usage</strong>
              <span aria-hidden="true">↓</span>
              <strong>Workflow-first usage</strong>
              <p>Context → Method → Review → Reusable output</p>
            </aside>
          </div>
        </section>

        <section id="outcomes" className={styles.outcomesSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>WHAT YOU’LL LEARN</span>
              <h2>Six practical capabilities. One connected working system.</h2>
              <p>The goal is not more prompts. The goal is to understand a repeatable method you can apply to real work.</p>
            </div>
            <div className={styles.outcomeGrid}>
              {outcomes.map((item) => (
                <article key={item.title}>
                  <div className={styles.iconBox}><MiniIcon name={item.icon} /></div>
                  <small>{item.tag}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.demoSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>LIVE WORKFLOW DEMO</span>
              <h2>See how the same task changes when the method changes.</h2>
            </div>
            <div className={styles.demoBoard}>
              <article className={styles.demoCardMuted}>
                <div className={styles.demoTop}><span>BEFORE</span><b>Random chat</b></div>
                <div className={styles.fakePrompt}>“Make this better.”</div>
                <div className={styles.fakeLines}><i/><i/><i/></div>
                <p>Unclear input → generic answer → hard to reuse.</p>
              </article>
              <div className={styles.demoArrow} aria-hidden="true"><span>WORKFLOW</span><b>→</b></div>
              <article className={styles.demoCardActive}>
                <div className={styles.demoTop}><span>AFTER</span><b>Structured work</b></div>
                <div className={styles.methodRow}><span>Context</span><span>Task</span><span>Format</span><span>Review</span></div>
                <div className={styles.outputSummary}><small>OUTPUT</small><strong>Brief + risks + next actions</strong></div>
                <p>Clear method → reviewable output → reusable process.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>WHO THIS IS FOR</span>
              <h2>Practical AI skills for the work already in front of you.</h2>
            </div>
            <div className={styles.audienceGrid}>
              {audiences.map(([title, text], index) => (
                <article key={title}>
                  <span className={styles.audienceNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <i aria-hidden="true">→</i>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agenda" className={styles.agendaSection}>
          <div className={styles.container}>
            <div className={styles.agendaHeader}>
              <div>
                <span className={styles.darkKicker}>INSIDE THE LIVE MASTERCLASS</span>
                <h2>A focused 2-hour learning map.</h2>
              </div>
              <p>Six connected modules that move from better instructions to repeatable professional workflows.</p>
            </div>
            <div className={styles.agendaList}>
              {agenda.map(([n, title, text]) => (
                <article key={n}>
                  <span>{n}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <i aria-hidden="true">↗</i>
                </article>
              ))}
            </div>
            <TrackedCta config={config} location="chatgpt_v4_agenda" label="Reserve My Free Seat" className={styles.agendaCta} />
          </div>
        </section>

        <section className={styles.transformationSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>BEFORE → AFTER</span>
              <h2>The transformation is not “more AI”. It is better execution.</h2>
            </div>
            <div className={styles.transformationGrid}>
              <div className={styles.beforePanel}>
                <small>BEFORE THE METHOD</small>
                <ul>
                  <li>Prompt-by-prompt trial and error</li>
                  <li>Unclear context and output expectations</li>
                  <li>First answer accepted without review</li>
                  <li>Useful work difficult to reproduce</li>
                </ul>
              </div>
              <div className={styles.transformCenter} aria-hidden="true"><span>SHIFT</span><b>→</b></div>
              <div className={styles.afterPanel}>
                <small>AFTER THE METHOD</small>
                <ul>
                  <li>Structured context before execution</li>
                  <li>Clear task, format and constraints</li>
                  <li>Review loop for quality and missing gaps</li>
                  <li>Reusable workflow for similar work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="mentor" className={styles.mentorSection}>
          <div className={`${styles.container} ${styles.mentorGrid}`}>
            <div className={styles.mentorVisual}>
              <Image src="/funnels/shared/mentor.jpg" alt="SikhaDenge mentor" width={760} height={760} sizes="(max-width: 860px) 100vw, 42vw" />
              <div className={styles.mentorBadge}><small>LIVE MENTOR-LED</small><strong>Learn the method while you watch it being applied.</strong></div>
            </div>
            <div className={styles.mentorCopy}>
              <span className={styles.kicker}>LEARN WITH SIKHADENGE</span>
              <h2>Practical teaching. Clear workflows. Real digital work.</h2>
              <p>SikhaDenge is operated by ThinkGrow Private Limited and focuses on mentor-led digital skill development with practical demonstrations and a clear learning path.</p>
              <div className={styles.mentorChecks}>
                <span>Live walkthroughs</span>
                <span>Work-focused examples</span>
                <span>Beginner-friendly delivery</span>
                <span>WhatsApp session updates</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.resourcesSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>PRACTICAL RESOURCES</span>
              <h2>Leave with a starter system, not just session notes.</h2>
            </div>
            <div className={styles.resourceGrid}>
              {resources.map(([n, title, text]) => (
                <article key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pathSection}>
          <div className={`${styles.container} ${styles.pathCard}`}>
            <div className={styles.pathIntro}>
              <span className={styles.kicker}>THE LEARNING PATH</span>
              <h2>Watch it. Understand it. Repeat it. Improve it.</h2>
              <p>The masterclass is structured to move you from passive AI use toward repeatable execution.</p>
            </div>
            <div className={styles.pathSteps}>
              {learningPath.map(([label, text], index) => (
                <article key={label}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{label}</strong><p>{text}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.registrationSection}>
          <div className={styles.container}>
            <div className={styles.registrationIntro}>
              <span className={styles.registrationKicker}>FREE LIVE MASTERCLASS</span>
              <h2>Your first better ChatGPT workflow starts here.</h2>
              <p>Reserve once. Get the live-session confirmation and joining instructions on WhatsApp.</p>
              <div className={styles.registrationFacts}>
                <span>{config.dateLabel}</span><span>{config.timeLabel}</span><span>{config.languageLabel}</span><span>FREE</span>
              </div>
            </div>
            <RegistrationCard config={config} />
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.centerHead}>
              <span className={styles.kicker}>FAQ</span>
              <h2>Questions before you reserve your seat?</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className={`${styles.container} ${styles.finalCard}`}>
            <div>
              <span>START PRACTICALLY</span>
              <h2>Learn ChatGPT as a workflow, not a collection of tricks.</h2>
            </div>
            <TrackedCta config={config} location="chatgpt_v4_final" label="Reserve My Free Seat" className={styles.finalCta} />
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <span>SikhaDenge · A brand of ThinkGrow Private Limited</span>
            <span>Independent education provider</span>
          </div>
        </footer>

        <MobileStickyCta config={config} />
      </main>
    </>
  );
}
