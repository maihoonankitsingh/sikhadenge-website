import Head from "next/head";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  FileText,
  Layers3,
  Mail,
  PenLine,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import styles from "../../../styles/chatgpt-masterclass-live.module.css";

const registerHref = "/gen-ai-masterclass/register-one-step";

const agenda = [
  ["01", "Prompting that actually works", "Turn vague requests into clear instructions using context, constraints, examples and output formats."],
  ["02", "Research without information chaos", "Break broad questions into a repeatable research workflow and produce decision-ready summaries."],
  ["03", "Files, PDFs and long documents", "Extract, compare, organise and rewrite useful information from real work documents."],
  ["04", "Writing and communication systems", "Create better emails, proposals, briefs, content plans and professional drafts with reusable structures."],
  ["05", "Data and productivity workflows", "Reason through tables, repetitive tasks and everyday work with step-by-step AI workflows."],
  ["06", "From one-off chat to reusable system", "Combine prompting, review and refinement into repeatable workflows you can use after the session."],
] as const;

const tools = [
  { n: "01", title: "ChatGPT", desc: "Think, plan, write and analyse", logo: "https://cdn.simpleicons.org/openai/10A37F" },
  { n: "02", title: "Google Docs", desc: "Draft and refine documents", logo: "https://cdn.simpleicons.org/googledocs/4285F4" },
  { n: "03", title: "Google Sheets", desc: "Analyse data and reports", logo: "https://cdn.simpleicons.org/googlesheets/34A853" },
  { n: "04", title: "Canva", desc: "Plan creative content", logo: "https://cdn.simpleicons.org/canva/00C4CC" },
  { n: "05", title: "Notion", desc: "Organise ideas and systems", logo: "https://cdn.simpleicons.org/notion/111827" },
  { n: "06", title: "Gmail", desc: "Write and summarise email", logo: "https://cdn.simpleicons.org/gmail/EA4335" },
  { n: "07", title: "PDFs", desc: "Extract and simplify files", logo: "https://cdn.simpleicons.org/adobeacrobatreader/EC1C24" },
  { n: "08", title: "Slides", desc: "Structure presentations", logo: "https://cdn.simpleicons.org/googleslides/FBBC04" },
  { n: "09", title: "Research", desc: "Find and verify information", icon: "search" },
  { n: "10", title: "Content", desc: "Plan, write and repurpose", icon: "content" },
] as const;

const resources = [
  ["01", "Prompt Starter Pack", "Ready-to-use starting prompts for everyday professional work."],
  ["02", "Professional Prompt Framework", "A reusable structure for context, task, constraints, examples and output."],
  ["03", "AI Research Checklist", "A compact checklist for stronger research quality and review."],
  ["04", "Workflow Map + Workbook", "A guided map to turn the session into repeatable working habits."],
] as const;

const audiences = [
  ["Working professionals", "Save time on research, writing, analysis and communication."],
  ["Students & job seekers", "Improve projects, study, applications and career preparation."],
  ["Freelancers & creators", "Structure client work, content and repeatable delivery."],
  ["Founders & teams", "Use AI for planning, communication and everyday operations."],
] as const;

const outcomes = [
  ["Research → brief", "Turn scattered information into a structured decision-ready brief."],
  ["Notes → draft", "Convert rough context into a clear email, proposal or document."],
  ["Data → insight", "Use ChatGPT to reason through tables and surface useful patterns."],
  ["Repeat task → system", "Turn recurring work into a reusable prompt and review workflow."],
] as const;

function Cta({ children, className = styles.primary }: { children: ReactNode; className?: string }) {
  return (
    <a className={className} href={registerHref}>
      <span>{children}</span>
      <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
    </a>
  );
}

function Brand() {
  return (
    <a className={styles.brand} href="#top" aria-label="SikhaDenge masterclass home">
      <span className={styles.brandIcon}>S</span>
      <strong>SikhaDenge</strong>
    </a>
  );
}

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  if ("logo" in tool) {
    return <img className={styles.toolLogo} src={tool.logo} alt="" loading="lazy" />;
  }
  return tool.icon === "search" ? <Search size={25} /> : <PenLine size={25} />;
}

function WorkspaceVisual() {
  return (
    <div className={styles.workspace} aria-label="Example ChatGPT workflow interface">
      <div className={styles.workspaceTop}>
        <div className={styles.workspaceBrand}><Sparkles size={15} /><span>AI WORKSPACE</span></div>
        <span className={styles.online}><i /> LIVE</span>
      </div>
      <div className={styles.workspaceGrid}>
        <aside className={styles.workspaceNav}>
          <span className={styles.workspaceNavActive}><Layers3 size={14} /> Workflow</span>
          <span><Search size={14} /> Research</span>
          <span><FileText size={14} /> Files</span>
          <span><PenLine size={14} /> Writing</span>
        </aside>
        <div className={styles.workspaceMain}>
          <div className={styles.userPrompt}>Create a professional content plan from these research notes.</div>
          <div className={styles.aiReply}>
            <div className={styles.aiTitle}><span className={styles.aiMark}>AI</span><strong>Building your workflow</strong></div>
            <div className={styles.workflowSteps}>
              <span className={styles.complete}><Check size={13} /> Understand goal</span>
              <span className={styles.complete}><Check size={13} /> Organise research</span>
              <span className={styles.activeStep}><Sparkles size={13} /> Create output</span>
              <span><Clock3 size={13} /> Review & refine</span>
            </div>
            <div className={styles.outputCard}>
              <div><small>OUTPUT</small><strong>30-Day Content System</strong></div>
              <span className={styles.ready}><Check size={12} /> Ready</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.workspaceFooter}>
        <span><Zap size={14} /> Practical workflow</span>
        <strong>Research → Plan → Draft → Review</strong>
      </div>
    </div>
  );
}

function ChatGPTFreeMasterclassPage() {
  return (
    <>
      <Head>
        <title>Free Live ChatGPT Masterclass | SikhaDenge</title>
        <meta name="description" content="Join SikhaDenge's free live ChatGPT masterclass and learn practical prompting, research, files, writing, data and productivity workflows." />
        <meta property="og:title" content="Free Live ChatGPT Masterclass | SikhaDenge" />
        <meta property="og:description" content="Build practical ChatGPT workflows for real work in a live beginner-friendly SikhaDenge masterclass." />
        <meta name="robots" content="index,follow" />
      </Head>

      <main id="top" className={styles.page}>
        <div className={styles.ticker}>
          <span><i /> FREE LIVE MASTERCLASS</span>
          <span>2 HOURS · PRACTICAL</span>
          <span>8:00 PM IST</span>
          <span>LIMITED LIVE SEATS</span>
        </div>

        <section className={styles.hero}>
          <nav className={`${styles.container} ${styles.nav}`}>
            <Brand />
            <div className={styles.navLinks}>
              <a href="#learn">What You’ll Learn</a>
              <a href="#tools">Workflows</a>
              <a href="#agenda">Agenda</a>
              <a href="#faq">FAQs</a>
            </div>
            <Cta className={styles.navCta}>Reserve Free Seat</Cta>
          </nav>

          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.badge}><Sparkles size={13} /> FREE LIVE CHATGPT MASTERCLASS</span>
              <h1>Stop collecting prompts.<br /><em>Build real work with ChatGPT.</em></h1>
              <p className={styles.lead}>Learn practical AI workflows for research, documents, communication, content and productivity — live, step by step, in easy Hinglish.</p>

              <div className={styles.heroChecks}>
                <span><Check size={15} /> No coding required</span>
                <span><Check size={15} /> Beginner friendly</span>
                <span><Check size={15} /> Live demonstrations</span>
              </div>

              <div className={styles.eventGrid}>
                <div><Clock3 size={17} /><span><small>DURATION</small><strong>2 Hours Live</strong></span></div>
                <div><Zap size={17} /><span><small>FORMAT</small><strong>Practical</strong></span></div>
                <div><Users size={17} /><span><small>LANGUAGE</small><strong>Easy Hinglish</strong></span></div>
                <div><ShieldCheck size={17} /><span><small>ENTRY</small><strong className={styles.free}>FREE</strong></span></div>
              </div>

              <div className={styles.heroActions}>
                <Cta>Reserve My Free Seat</Cta>
                <a className={styles.secondary} href="#agenda">See 2-Hour Agenda</a>
              </div>
              <div className={styles.microProof}>
                <div className={styles.avatarStack}><span>A</span><span>S</span><span>R</span><span>P</span></div>
                <span><b>1.5 Lakh+</b> learners</span>
                <i />
                <span><b>4.9/5</b> learner rating</span>
              </div>
            </div>
            <WorkspaceVisual />
          </div>

          <div className={`${styles.container} ${styles.heroTrust}`}>
            <div><strong>1.5 Lakh+</strong><span>Learners</span></div>
            <div><strong>4.9/5</strong><span>Average rating</span></div>
            <div><strong>100%</strong><span>Live practical</span></div>
            <div><strong>No Coding</strong><span>Beginner friendly</span></div>
          </div>
        </section>

        <section id="learn" className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>WHY THIS MASTERCLASS</span>
              <h2>Learn skills you can use <em>the same day.</em></h2>
              <p>No generic AI theory. The session is designed around repeatable workflows for the work already in front of you.</p>
            </div>
            <div className={styles.statGrid}>
              <article><span className={styles.iconBubble}><Zap size={22} /></span><strong>Work smarter</strong><p>Reduce repetitive effort and spend more time on high-value work.</p></article>
              <article><span className={styles.iconBubble}><ShieldCheck size={22} /></span><strong>Improve quality</strong><p>Create clearer briefs, documents, research and communication.</p></article>
              <article><span className={styles.iconBubble}><Layers3 size={22} /></span><strong>Build workflows</strong><p>Move from one-off prompts to processes you can repeat.</p></article>
              <article><span className={styles.iconBubble}><Sparkles size={22} /></span><strong>Get practical</strong><p>Watch real examples built live instead of only seeing slides.</p></article>
            </div>
          </div>
        </section>

        <section id="tools" className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>WORK WITH WHAT YOU ALREADY USE</span>
              <h2>Connect ChatGPT thinking to <em>everyday digital work.</em></h2>
              <p>Use AI as a workflow layer across documents, research, communication, content and productivity.</p>
            </div>

            <div className={styles.toolsStage}>
              <div className={styles.toolHub}>
                <img src="https://cdn.simpleicons.org/openai/10A37F" alt="" />
                <span>ChatGPT</span>
              </div>
              <div className={styles.connectorGlow} aria-hidden="true" />
              <div className={styles.toolGrid}>
                {tools.map((tool) => (
                  <article key={tool.title} className={styles.toolCard}>
                    <span className={styles.toolNumber}>{tool.n}</span>
                    <span className={styles.toolIcon}><ToolIcon tool={tool} /></span>
                    <div><strong>{tool.title}</strong><small>{tool.desc}</small></div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.centerActions}>
              <a href="#outcomes" className={styles.ghostCta}>Explore Practical Workflows <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="outcomes" className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>FROM PROMPTING TO WORKFLOWS</span>
              <h2>See what changes when your process becomes <em>structured.</em></h2>
            </div>
            <div className={styles.transformFlow}>
              <article className={styles.beforeCard}>
                <small>BEFORE</small><h3>Random prompting</h3>
                <ul><li>Vague instructions</li><li>Inconsistent answers</li><li>Too much rewriting</li><li>No repeatable process</li></ul>
              </article>
              <div className={styles.flowArrow}><ArrowRight size={26} /></div>
              <article className={styles.afterCard}>
                <small>AFTER</small><h3>Professional workflow</h3>
                <ul><li>Clear context and goal</li><li>Structured output</li><li>Built-in review step</li><li>Reusable system</li></ul>
              </article>
            </div>

            <div className={styles.outputGrid}>
              {outcomes.map(([title, text], index) => (
                <article key={title}>
                  <div className={styles.outputPreview}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {index === 0 && <Search size={23} />}
                    {index === 1 && <FileText size={23} />}
                    {index === 2 && <BarChart3 size={23} />}
                    {index === 3 && <Layers3 size={23} />}
                    <i /><i /><i />
                  </div>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agenda" className={`${styles.section} ${styles.dark}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>2-HOUR LIVE LEARNING MAP</span>
              <h2>Exactly what you’ll learn <em>in the masterclass.</em></h2>
              <p>One focused path from better instructions to repeatable AI workflows.</p>
            </div>
            <div className={styles.agendaGrid}>
              {agenda.map(([n, title, text]) => (
                <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>
              ))}
            </div>
            <div className={styles.centerWrap}><Cta className={styles.centerCta}>Reserve My Free Seat</Cta></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>TAKE IT WITH YOU</span>
              <h2>Leave with a starter system, <em>not just notes.</em></h2>
            </div>
            <div className={styles.resourceGrid}>
              {resources.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>WHO SHOULD ATTEND</span>
              <h2>Practical AI skills for <em>the work in front of you.</em></h2>
            </div>
            <div className={styles.audienceGrid}>
              {audiences.map(([title, text]) => <article key={title}><span><Check size={15} /></span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.mentorSection}`}>
          <div className={styles.container}>
            <div className={styles.mentor}>
              <div className={styles.mentorImage} role="img" aria-label="SikhaDenge live practical class" />
              <div className={styles.mentorCopy}>
                <span className={styles.eyebrow}>LEARN WITH SIKHADENGE</span>
                <h2>Clear teaching.<br />Practical workflows.<br /><em>Real digital work.</em></h2>
                <p>Learn through practical demonstrations, simple explanations and real workflows you can adapt to your work immediately.</p>
                <div className={styles.mentorChecks}>
                  <span><Check size={14} /> Live walkthroughs</span>
                  <span><Check size={14} /> Work-focused examples</span>
                  <span><Check size={14} /> Beginner-friendly</span>
                  <span><Check size={14} /> Session resources</span>
                </div>
                <Cta className={styles.mentorCta}>Join the Free Masterclass</Cta>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaBand}>
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div><span>FREE · LIVE · PRACTICAL</span><h2>Learn. Apply. Work smarter.</h2><p>Reserve your seat and start building practical AI workflows you can actually reuse.</p></div>
            <Cta className={styles.lightCta}>Reserve My Free Seat</Cta>
          </div>
        </section>

        <section id="faq" className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}><span className={styles.eyebrow}>FAQ</span><h2>Frequently asked <em>questions.</em></h2></div>
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

        <section className={styles.final}>
          <div className={styles.container}>
            <div className={styles.finalBox}>
              <div><span className={styles.eyebrow}>START HERE</span><h2>Your first better ChatGPT workflow starts with <em>one live session.</em></h2><p>Reserve your free seat and get the session confirmation through SikhaDenge’s existing registration flow.</p></div>
              <Cta>Reserve My Free Seat</Cta>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerGrid}`}>
            <Brand />
            <p>Practical AI learning for everyday digital work.</p>
            <div><a href="#learn">Masterclass</a><a href="#agenda">Agenda</a><a href="#faq">FAQs</a></div>
          </div>
        </footer>

        <div className={styles.mobileBar}>
          <div><small>FREE LIVE MASTERCLASS</small><strong>2 Hours · 8 PM IST</strong></div>
          <Cta>Reserve Seat</Cta>
        </div>
      </main>
    </>
  );
}

(ChatGPTFreeMasterclassPage as typeof ChatGPTFreeMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ChatGPTFreeMasterclassPage;
