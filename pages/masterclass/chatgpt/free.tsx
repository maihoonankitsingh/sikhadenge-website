import Head from "next/head";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import styles from "../../../styles/chatgpt-masterclass-live.module.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const registerHref = "/gen-ai-masterclass/register-one-step";

const agenda = [
  ["01", "Prompting that actually works", "Turn vague requests into structured instructions with context, constraints and clear output formats."],
  ["02", "Research without information chaos", "Break broad questions into a repeatable research workflow and produce decision-ready summaries."],
  ["03", "Files, PDFs and long documents", "Extract, compare, organize and rewrite information from real work documents more systematically."],
  ["04", "Writing and communication systems", "Build better emails, proposals, briefs, content plans and professional drafts with reusable structures."],
  ["05", "Data and productivity workflows", "Reason through tables, repetitive tasks and everyday work using step-by-step AI workflows."],
  ["06", "From one-off chat to reusable system", "Combine prompting, review and refinement into a repeatable workflow you can apply after the session."],
] as const;

const tools = ["ChatGPT", "Google Docs", "Google Sheets", "Canva", "Notion", "Gmail", "PDFs", "Slides", "Research", "Content"] as const;
const resources = [
  ["1", "Prompt Starter Pack", "A practical starting library for everyday work and learning tasks."],
  ["2", "Professional Prompt Framework", "A reusable structure for context, task, constraints, examples and output."],
  ["3", "AI Research Checklist", "A compact checklist for better research quality and review."],
  ["4", "Workflow Map + Workbook", "A guided map to turn what you learn into repeatable working habits."],
] as const;
const audiences = [
  ["Working professionals", "Write, research, analyse and communicate faster."],
  ["Students & job seekers", "Improve study, projects, applications and career preparation."],
  ["Freelancers & creators", "Structure client work, ideas, content and repeatable delivery."],
  ["Founders & business owners", "Use AI for planning, communication and everyday operations."],
] as const;

function Cta({ children, className = styles.primary }: { children: ReactNode; className?: string }) {
  return <a className={className} href={registerHref}>{children}</a>;
}

function WorkflowVisual() {
  return (
    <div className={styles.workflow} aria-hidden="true">
      <div className={styles.browserBar}><i /><i /><i /><strong>ChatGPT workflow</strong></div>
      <div className={styles.workflowBody}>
        <div className={styles.sidebar}><span>Research brief</span><span>Client proposal</span><span>Content plan</span></div>
        <div className={styles.chat}>
          <div className={styles.prompt}>Turn these scattered notes into a decision-ready brief.</div>
          <div className={styles.answer}><strong>Working brief</strong><b /><b /><b /><div className={styles.pills}><span>Summary</span><span>Risks</span><span>Next actions</span></div></div>
        </div>
      </div>
    </div>
  );
}

function ChatGPTFreeMasterclassPage() {
  return (
    <>
      <Head>
        <title>Live ChatGPT Masterclass | SikhaDenge</title>
        <meta name="description" content="Join SikhaDenge's free live ChatGPT masterclass and learn practical prompting, research, document, writing, data and productivity workflows." />
        <meta property="og:title" content="Live ChatGPT Masterclass | SikhaDenge" />
        <meta property="og:description" content="Learn practical ChatGPT workflows for real work in a live beginner-friendly SikhaDenge masterclass." />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className={`${styles.page} ${inter.variable}`}>
        <div className={styles.ticker}><span>● LIVE MASTERCLASS</span><span>NEXT LIVE BATCH</span><span>8:00 PM IST</span><span>FREE REGISTRATION</span></div>

        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <span className={styles.badge}>LIVE · CHATGPT MASTERCLASS · SIKHADENGE</span>
              <h1>Stop collecting prompts. <em>Build real work with ChatGPT.</em></h1>
              <p className={styles.lead}>Learn practical ChatGPT workflows for prompting, research, files, writing, data and everyday productivity — in one beginner-friendly live session.</p>
              <div className={styles.eventGrid}>
                <div><small>LIVE BATCH</small><strong>Next Live Batch</strong></div>
                <div><small>TIME</small><strong>8:00 PM IST</strong></div>
                <div><small>LANGUAGE</small><strong>Easy Hinglish</strong></div>
                <div><small>ENTRY</small><strong className={styles.free}>FREE</strong></div>
              </div>
              <div className={styles.heroActions}><Cta>Reserve My Free Seat</Cta><a className={styles.secondary} href="#agenda">See 2-Hour Agenda</a></div>
              <div className={styles.microProof}><span><b>1.5 Lakh+</b> learners</span><span><b>4.9/5</b> learner rating</span><span><b>No coding</b> required</span></div>
            </div>
            <div><WorkflowVisual /></div>
          </div>
        </section>

        <section className={styles.trust}><div className={styles.container}><p>Built for people who want to use AI at work — not just watch another tool demo.</p><div className={styles.roleStrip}><span>Professionals</span><span>Students</span><span>Freelancers</span><span>Creators</span><span>Founders</span><span>Teams</span></div></div></section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.statGrid}>
              <article><span>LIVE</span><strong>Practical walkthrough</strong><p>See workflows built step by step, not only slides.</p></article>
              <article><span>EASY</span><strong>Beginner friendly</strong><p>No technical background or coding required.</p></article>
              <article><span>HINGLISH</span><strong>Clear explanations</strong><p>Simple language with work-focused examples.</p></article>
              <article><span>USEFUL</span><strong>Reusable systems</strong><p>Take away structures you can apply after the session.</p></article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>WORK WITH WHAT YOU ALREADY USE</span><h2>Connect ChatGPT thinking to everyday digital work.</h2><p>Use AI as a workflow layer across documents, research, communication, content and productivity.</p></div>
            <div className={styles.toolGrid}>{tools.map((tool, index) => <div key={tool}><span>{String(index + 1).padStart(2, "0")}</span><strong>{tool}</strong></div>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>SEE THE DIFFERENCE</span><h2>From random chat to a repeatable professional workflow.</h2></div>
            <div className={styles.demoGrid}>
              <article><div className={styles.miniUi}><span>Scattered input</span><b /><b /><b /></div><small>BEFORE</small><h3>Unclear request</h3><p>Broad prompts create inconsistent outputs that are hard to reuse.</p></article>
              <article><div className={styles.miniUi}><span>Structured workflow</span><b /><b /><b /></div><small>WORKFLOW</small><h3>Deliberate process</h3><p>Use context, task, format and review instead of guessing prompts.</p></article>
              <article><div className={styles.miniUi}><span>Professional output</span><b /><b /><b /></div><small>AFTER</small><h3>Ready-to-use result</h3><p>Move toward clearer briefs, summaries, drafts, plans and next actions.</p></article>
            </div>
          </div>
        </section>

        <section id="agenda" className={`${styles.section} ${styles.dark}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>2-HOUR LIVE LEARNING MAP</span><h2>Exactly what you’ll learn in the masterclass.</h2><p>One focused path from better instructions to reusable AI workflows.</p></div>
            <div className={styles.agendaGrid}>{agenda.map(([n,title,text]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
            <div className={styles.centerWrap}><Cta className={styles.centerCta}>Reserve My Free Seat</Cta></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>PRACTICAL RESOURCES</span><h2>Leave with a starter system, not just session notes.</h2></div>
            <div className={styles.resourceGrid}>{resources.map(([n,title,text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>PRACTICAL OUTPUTS</span><h2>Use ChatGPT to move from raw information to useful work.</h2></div>
            <div className={styles.outputGrid}>
              <article><div className={styles.outputMock}><strong>Research Brief</strong><b /><b /><b /></div><h3>Research → decision brief</h3><p>Organize findings, trade-offs and next actions.</p></article>
              <article><div className={styles.outputMock}><strong>Proposal Draft</strong><b /><b /><b /></div><h3>Notes → professional draft</h3><p>Convert scattered context into structured communication.</p></article>
              <article><div className={styles.outputMock}><strong>Workflow Plan</strong><b /><b /><b /></div><h3>Repeat task → workflow</h3><p>Create a reusable process for work you do often.</p></article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>WHO THIS IS FOR</span><h2>Practical AI skills for the work in front of you.</h2></div>
            <div className={styles.audienceGrid}>{audiences.map(([title,text]) => <article key={title}><span>✓</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.mentor}>
              <div className={styles.mentorImage} role="img" aria-label="SikhaDenge live learning environment" />
              <div className={styles.mentorCopy}><span className={styles.eyebrow}>LEARN WITH SIKHADENGE</span><h2>Practical teaching. Clear workflows. Real digital work.</h2><p>SikhaDenge is operated by ThinkGrow Private Limited and focuses on mentor-led digital skill development with practical demonstrations and a clear learning path.</p><div className={styles.mentorChecks}><span>Live walkthroughs</span><span>Work-focused examples</span><span>Beginner-friendly delivery</span><span>WhatsApp session updates</span></div></div>
            </div>
          </div>
        </section>

        <section className={styles.ctaBand}><div className={`${styles.container} ${styles.ctaGrid}`}><div><h2>Learn. Apply. Work smarter.</h2><p>Reserve your free seat and continue through SikhaDenge’s existing live registration flow.</p></div><Cta className={styles.lightCta}>Register Now for Free</Cta></div></section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>FAQ</span><h2>Frequently asked questions.</h2></div>
            <div className={styles.faq}>
              <details><summary>Is this ChatGPT masterclass really free?</summary><p>Yes. The current entry route is free. Register once to continue through the SikhaDenge joining flow.</p></details>
              <details><summary>Is it live or recorded?</summary><p>It is designed as a live practical session with demonstrations and Q&A.</p></details>
              <details><summary>Do I need coding knowledge?</summary><p>No. Basic comfort using a browser and online tools is enough.</p></details>
              <details><summary>Which language will be used?</summary><p>The session is delivered in easy Hinglish so the workflows remain practical and clear.</p></details>
              <details><summary>Do I need ChatGPT Plus?</summary><p>No paid ChatGPT plan is required to understand the core workflows. Some advanced capabilities can vary by plan.</p></details>
              <details><summary>Where will I receive the joining link?</summary><p>Joining instructions and important reminders are sent through your registered WhatsApp number via the official SikhaDenge flow.</p></details>
              <details><summary>Who should attend?</summary><p>Working professionals, students, job seekers, freelancers, creators and business owners who want practical AI workflows.</p></details>
              <details><summary>Is SikhaDenge affiliated with OpenAI?</summary><p>No. SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI.</p></details>
            </div>
          </div>
        </section>

        <section className={styles.final}><div className={styles.container}><div className={styles.finalBox}><div><span className={styles.eyebrow}>START HERE</span><h2>Your first better ChatGPT workflow starts with one live session.</h2><p>Reserve once. Get the live-session confirmation and joining instructions through SikhaDenge’s existing registration flow.</p></div><Cta>Reserve My Free Seat</Cta></div></div></section>

        <div className={styles.mobileBar}><div><small>CHATGPT LIVE</small><strong>FREE</strong></div><Cta>Reserve Seat</Cta></div>
      </main>
    </>
  );
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;
