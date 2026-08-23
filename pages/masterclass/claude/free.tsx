import Head from "next/head";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import styles from "../../../styles/claude-masterclass-live.module.css";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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

      <main className={`${styles.page} ${inter.variable}`}>
<section className={styles.hero}>
          <div className={styles.heroBurst} aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>

          <div className={`${styles.container} ${styles.heroCenter}`}>
            <div className={styles.heroTopBadge}>NO CODING EXPERIENCE NEEDED</div>

            <div className={styles.heroBrand}>
              <img
                src="/brand/sikhadenge-header-safe-320.png?v=headersafe2-20260728"
                alt="SikhaDenge"
                className={styles.heroBrandLogo}
              />
            </div>

            <h1 className={styles.heroHeadline}>
              Master the <mark>Claude workflow</mark> for sharper research,
              better writing &amp; faster decisions.
            </h1>

            <p className={styles.heroSub}>
              Learn a repeatable system to turn long documents, research and ideas into
              clear professional output — live, step by step, in easy Hinglish.
            </p>

            <div className={styles.heroProofRow}>

              <div className={styles.proofCard}>
                <span className={styles.proofIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 11a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 8 11Z" />
                    <path d="M16.2 10a2.6 2.6 0 1 0 0-5.2" />
                    <path d="M2.8 19.4c.4-3.5 2.3-5.5 5.2-5.5s4.8 2 5.2 5.5" />
                    <path d="M14.2 14.2c3.7-.5 6 1.3 6.5 4.8" />
                  </svg>
                </span>

                <div className={styles.proofText}>
                  <small>LEARNER TRUST</small>
                  <strong>150,000+ Students</strong>
                </div>
              </div>

              <div className={styles.proofCard}>
                <span className={styles.proofIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l2.65 5.36 5.92.86-4.28 4.17 1.01 5.89L12 16.49l-5.3 2.79 1.01-5.89-4.28-4.17 5.92-.86L12 3Z" />
                  </svg>
                </span>

                <div className={styles.proofText}>
                  <small>LEARNER RATING</small>
                  <strong>4.9/5 Rating</strong>
                </div>
              </div>

              <div className={styles.proofCard}>
                <span className={styles.proofIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 11.5a7.6 7.6 0 0 1-11.3 6.65L4 19.4l1.35-4.45A7.6 7.6 0 1 1 20 11.5Z" />
                    <path d="M9.2 8.6c.2 2.8 2.2 4.9 5.2 5.6" />
                  </svg>
                </span>

                <div className={styles.proofText}>
                  <small>COMMUNITY</small>
                  <strong>5Lac+ WhatsApp</strong>
                </div>
              </div>

            </div>

            <div className={styles.heroCtas}>
              <a className={styles.heroPrimary} href={registerHref}>
                Reserve My Free Seat <b>→</b>
              </a>
              <a className={styles.heroSecondary} href="#agenda">
                View Live Agenda
              </a>
            </div>

            <div className={styles.heroBatchLine}>
              <span className={styles.heroBatchDot} />
              <strong>Next live batch:</strong>
              <span>8:00 PM IST · Live Online</span>
            </div>

            <p className={styles.mobileUrgency}>
              Limited seats available for the next live workshop
            </p>

            <div className={styles.heroSeatVisual} aria-hidden="true">
              {Array.from({ length: 11 }, (_, index) => (
                <span key={index} className={index < 8 ? styles.seatFilled : styles.seatOpen}>
                  <i />
                </span>
              ))}
            </div>

            <div className={styles.mobileConversion}>

              <div className={styles.mobileOfferValue}>
                <small>CURRENT LIVE BATCH</small>
                <span>Today you can join for</span>
                <strong>FREE</strong>
              </div>

              <div className={styles.mobileSchedule}>

                <div>
                  <span className={styles.mobileScheduleIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
                      <path d="M7 3.5v4M17 3.5v4M3.5 10h17" />
                    </svg>
                  </span>

                  <span>
                    <small>DATE</small>
                    <strong>Next Live Batch</strong>
                  </span>
                </div>

                <div>
                  <span className={styles.mobileScheduleIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                  </span>

                  <span>
                    <small>TIME</small>
                    <strong>8:00 PM IST</strong>
                  </span>
                </div>

              </div>

              <a
                className={styles.mobileRegisterButton}
                href={registerHref}
              >
                Reserve My Free Seat
                <span>→</span>
              </a>

              <div className={styles.mobileTrustLine}>
                Live Online
                <i />
                Easy Hinglish
                <i />
                No Coding Required
              </div>

            </div>

          </div>

          <div className={styles.heroOfferBar}>
            <div className={`${styles.container} ${styles.heroOfferInner}`}>
              <div className={styles.heroOfferCopy}>
                <small>FREE LIVE CLAUDE AI MASTERCLASS</small>
                <div><strong>FREE</strong><span>Next batch · 8:00 PM IST</span></div>
              </div>

              <div className={styles.heroOfferMeta}>
                <span>Easy Hinglish</span>
                <i />
                <span>No coding required</span>
              </div>

              <a className={styles.heroOfferButton} href={registerHref}>
                Reserve My Free Seat <b>→</b>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.community}>
          <div className={`${styles.container} ${styles.realWorkSection}`}>
            <div className={styles.realWorkPanel}>

              <div className={styles.realWorkPicture}>
                <img
                  className={styles.realWorkDesktopArt}
                  src="/funnels/claude/real-work/real-work-desktop-v2.png"
                  alt="Use Claude for work you already do: Research and Long Docs, Professional Writing, Structured Analysis and Reusable Workflows."
                  loading="lazy"
                  decoding="async"
                />

                <img
                  className={styles.realWorkTabletArt}
                  src="/funnels/claude/real-work/real-work-tablet-v2.png"
                  alt="Use Claude for work you already do: Research and Long Docs, Professional Writing, Structured Analysis and Reusable Workflows."
                  loading="lazy"
                  decoding="async"
                />

                <img
                  className={styles.realWorkMobileArt}
                  src="/funnels/claude/real-work/real-work-mobile-v2.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.realWorkOverlay}>
                <span className={styles.realWorkEyebrow}>
                  BUILT FOR REAL WORK
                </span>

                <h2>
                  Use Claude for <em>work you already do.</em>
                </h2>

                <p>
                  Research, writing, analysis and repeatable workflows —
                  shown live with a practical, step-by-step approach.
                </p>

                <div className={styles.realWorkTags} aria-label="Claude workflow examples">
                  <span>Research &amp; Long Docs</span>
                  <span>Professional Writing</span>
                  <span>Structured Analysis</span>
                  <span>Reusable Workflows</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className={styles.batchAdvantage}>
          <div className={`${styles.container} ${styles.batchAdvantageInner}`}>

            <div className={styles.batchAdvantageIntro}>

              <div className={styles.batchAdvantageBadge}>
                <span className={styles.batchSpark} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2.8c.65 4.8 3.45 7.6 8.2 8.2-4.75.65-7.55 3.45-8.2 8.2-.65-4.75-3.45-7.55-8.2-8.2 4.75-.6 7.55-3.4 8.2-8.2Z" />
                  </svg>
                </span>

                <span>CURRENT BATCH ADVANTAGE</span>
              </div>


              <h2>
                Start learning Claude with a simple,
                practical <em>live session.</em>
              </h2>


              <p className={styles.batchAdvantageLead}>
                Live practical learning for research, writing,
                analysis and reusable workflows — explained
                step by step in easy Hinglish and designed
                for beginners.
              </p>



              <div className={styles.batchUrgency}>
                <span className={styles.batchUrgencyIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.4v5.1l3.25 2" />
                  </svg>
                </span>

                <span>Registration open for the current live batch</span>

                <i>•</i>

                <span>
                  Next live batch:
                  <strong>8:00 PM IST</strong>
                </span>
              </div>


              <div className={styles.batchActions}>

                <a
                  href="/gen-ai-masterclass/register-one-step"
                  className={styles.batchPrimaryCta}
                >
                  <span className={styles.batchCtaIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
                      <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
                    </svg>
                  </span>

                  <strong>Reserve My Free Seat</strong>

                  <span className={styles.batchArrow} aria-hidden="true">
                    →
                  </span>
                </a>


                <a
                  href="#agenda"
                  className={styles.batchSecondaryCta}
                >
                  <span className={styles.batchCtaIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M7 3.5h7l4 4V20H7V3.5Z" />
                      <path d="M14 3.5V8h4M10 12h5M10 15h5" />
                    </svg>
                  </span>

                  <strong>See Workshop Agenda</strong>

                  <span className={styles.batchSecondaryArrow} aria-hidden="true">
                    →
                  </span>
                </a>

              </div>
            </div>


            <div className={styles.batchFeatureGrid}>

              <article className={styles.batchFeatureCard}>
                <div className={styles.batchFeatureIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 18.5V9.8l7-4.3 7 4.3v8.7" />
                    <path d="M8.2 18.5v-5.2h7.6v5.2" />
                    <path d="m9.4 9.8 1.7 1.7 3.7-3.7" />
                  </svg>
                </div>

                <strong>PRACTICAL</strong>
                <p>Real workflows</p>

                <span className={styles.batchFeatureAccent} />
              </article>


              <article className={styles.batchFeatureCard}>
                <div className={styles.batchFeatureIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2.6" />
                    <path d="M7.8 7.8a5.95 5.95 0 0 0 0 8.4M16.2 7.8a5.95 5.95 0 0 1 0 8.4" />
                    <path d="M4.8 4.8a10.2 10.2 0 0 0 0 14.4M19.2 4.8a10.2 10.2 0 0 1 0 14.4" />
                  </svg>
                </div>

                <strong>LIVE</strong>
                <p>Practical session</p>

                <span className={styles.batchFeatureAccent} />
              </article>


              <article className={styles.batchFeatureCard}>
                <div className={styles.batchFeatureIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 5.5h14v10H9l-4 3v-13Z" />
                    <circle cx="9" cy="10.5" r=".8" />
                    <circle cx="12" cy="10.5" r=".8" />
                    <circle cx="15" cy="10.5" r=".8" />
                  </svg>
                </div>

                <strong>HINGLISH</strong>
                <p>Easy to follow</p>

                <span className={styles.batchFeatureAccent} />
              </article>


              <article className={styles.batchFeatureCard}>
                <div className={styles.batchFeatureIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
                  </svg>
                </div>

                <strong>NO CODE</strong>
                <p>Beginner friendly</p>

                <span className={styles.batchFeatureAccent} />
              </article>

            </div>
          </div>
        </section>

        <section className={styles.section} id="agenda">
          <div className={styles.container}>

            <div className={styles.roadmapHeader}>
              <span className={styles.eyebrow}>
                LIVE MASTERCLASS ROADMAP
              </span>

              <h2>
                From first prompt to
                <span> professional Claude workflow.</span>
              </h2>

              <p>
                A practical AI journey where you learn research,
                writing, analysis and reusable workflows step by step.
              </p>
            </div>


            <div className={styles.aiRoadmap}>

              {agenda.map(([number, title, text]) => (

                <article 
                  key={number}
                  className={styles.aiRoadmapCard}
                >

                  <div className={styles.aiStep}>
                    <span>{number}</span>
                    <i />
                  </div>

                  <div className={styles.aiCardContent}>
                    <small>
                      MODULE {number}
                    </small>

                    <h3>
                      {title}
                    </h3>

                    <p>
                      {text}
                    </p>
                  </div>

                  <div className={styles.aiGlow} />

                </article>

              ))}

            </div>

          </div>
        </section>

        <section className={`${styles.section} ${styles.soft} ${styles.freeExperience}`}>
          <div className={styles.container}>

            <div className={styles.freeExperiencePanel}>

              <div className={styles.freeExperienceIntro}>

                <span className={styles.eyebrow}>
                  WHY START HERE?
                </span>

                <h2>
                  Your first step into
                  <span> practical AI mastery.</span>
                </h2>

                <p>
                  This free Claude AI Masterclass gives you a clear
                  workflow before you invest deeper into AI learning.
                </p>

                <div className={styles.trustChips}>
                  <span>✓ Live Training</span>
                  <span>✓ No Coding</span>
                  <span>✓ Beginner Friendly</span>
                  <span>✓ Practical Use Cases</span>
                </div>

              </div>


              <div className={styles.freeJourney}>

                <article>
                  <b>01</b>
                  <div>
                    <h3>Discover The Workflow</h3>
                    <p>
                      Understand how professionals use Claude for research,
                      writing and analysis.
                    </p>
                  </div>
                </article>


                <article>
                  <b>02</b>
                  <div>
                    <h3>See Real Examples</h3>
                    <p>
                      Watch practical demonstrations connected with daily work.
                    </p>
                  </div>
                </article>


                <article>
                  <b>03</b>
                  <div>
                    <h3>Build Your Next Step</h3>
                    <p>
                      Decide your AI learning path with clarity.
                    </p>
                  </div>
                </article>

              </div>

            </div>

          </div>
        </section>

        <section className={`${styles.section} ${styles.soft} ${styles.aiShiftSection}`}>
          <div className={styles.container}>

            <div className={styles.aiShiftCleanShell}>

              <div className={styles.aiShiftCleanIntro}>
                <span className={styles.aiShiftCleanEyebrow}>THE AI SHIFT</span>

                <h2>
                  Why AI-skilled professionals are
                  <span> moving ahead faster.</span>
                </h2>

                <p>
                  Real market signals, workforce reports and hiring patterns all point in one direction:
                  professionals who can use AI workflows effectively will have a stronger advantage.
                </p>
              </div>

              <div className={styles.aiShiftCleanGrid}>

                <figure className={styles.aiShiftCleanCard}>
                  <img
                    src="/funnels/claude/ai-shift/the_ai_shift_professionals_at_work.png"
                    alt="AI is changing the way professionals work"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <figure className={styles.aiShiftCleanCard}>
                  <img
                    src="/funnels/claude/ai-shift/the_ai_shift_workforce_transformation.png"
                    alt="AI workforce transformation and industry signals"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <figure className={styles.aiShiftCleanCard}>
                  <img
                    src="/funnels/claude/ai-shift/ai_powered_professional_workflows.png"
                    alt="AI powered professional workflows and opportunity signals"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

              </div>

              <div className={styles.aiShiftCleanFooter}>
                <span>
                  Jobs are moving toward AI-enabled professionals. Become AI-enabled before the shift leaves you behind.
                </span>

                <a href={registerHref}>
                  Reserve My Free Seat
                </a>
              </div>

            </div>

          </div>
        </section>

              {/* CLAUDE V13.3 WORKFLOW PREMIUM START */}
              <div className={styles.workflowPremiumWrap}>
                <div className={styles.workflowPremiumHead}>
                  <span className={styles.workflowPremiumEyebrow}>
                    WHY CLAUDE FOR PROFESSIONAL WORK?
                  </span>

                  <h2>
                    Move from quick answers to
                    <br />
                    structured, reviewable work.
                  </h2>

                  <p>
                    Claude becomes more useful when you give it context, define the output
                    and use it inside a repeatable workflow.
                  </p>
                </div>

                <div className={styles.workflowPremiumStack}>
                  <article className={styles.workflowPremiumCard}>
                    <div className={styles.workflowPremiumCopy}>
                      <span className={styles.workflowPremiumStep}>01</span>
                      <h3>Work through long information without losing the thread</h3>
                      <p>
                        Organize PDFs, notes and source material into summaries, questions,
                        evidence and action points you can carefully review.
                      </p>
                    </div>

                    <div
                      className={`${styles.workflowPremiumVisual} ${styles.workflowPremiumVisualDocs}`}
                      aria-hidden="true"
                    >
                      <div className={styles.workflowPremiumScreen}>
                        <div className={styles.workflowPremiumScreenTop}>
                          <span>Research brief</span>
                          <span>3 sources</span>
                        </div>

                        <div className={styles.workflowPremiumDocGrid}>
                          <div className={styles.workflowPremiumDocCard}>
                            <b>PDF</b>
                            <span>Market research</span>
                            <small>42 pages</small>
                          </div>

                          <div className={styles.workflowPremiumDocCard}>
                            <b>DOC</b>
                            <span>Customer notes</span>
                            <small>12 pages</small>
                          </div>

                          <div className={styles.workflowPremiumDocCard}>
                            <b>WEB</b>
                            <span>Industry signals</span>
                            <small>7 sources</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className={`${styles.workflowPremiumCard} ${styles.workflowPremiumCardReverse}`}>
                    <div
                      className={`${styles.workflowPremiumVisual} ${styles.workflowPremiumVisualChart}`}
                      aria-hidden="true"
                    >
                      <div className={styles.workflowPremiumScreen}>
                        <div className={styles.workflowPremiumScreenTop}>
                          <span>Decision analysis</span>
                          <span>Ready</span>
                        </div>

                        <div className={styles.workflowPremiumBars}>
                          <i /><i /><i /><i /><i /><i />
                        </div>
                      </div>
                    </div>

                    <div className={styles.workflowPremiumCopy}>
                      <span className={styles.workflowPremiumStep}>02</span>
                      <h3>Turn analysis into clearer decisions</h3>
                      <p>
                        Compare options, identify patterns, surface risks and transform
                        unstructured information into a decision-ready working brief.
                      </p>
                    </div>
                  </article>

                  <article className={styles.workflowPremiumCard}>
                    <div className={styles.workflowPremiumCopy}>
                      <span className={styles.workflowPremiumStep}>03</span>
                      <h3>Build reusable systems instead of restarting every chat</h3>
                      <p>
                        Create repeatable project context and working structures so recurring
                        tasks become faster and more consistent over time.
                      </p>
                    </div>

                    <div
                      className={`${styles.workflowPremiumVisual} ${styles.workflowPremiumVisualFlow}`}
                      aria-hidden="true"
                    >
                      <div className={styles.workflowPremiumScreen}>
                        <div className={styles.workflowPremiumFlow}>
                          <div className={styles.workflowPremiumFlowNode}>Upload context</div>
                          <div className={styles.workflowPremiumFlowArrow}>→</div>
                          <div className={styles.workflowPremiumFlowNode}>Synthesize</div>
                          <div className={styles.workflowPremiumFlowArrow}>→</div>
                          <div className={styles.workflowPremiumFlowNode}>Ship output</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              {/* CLAUDE V13.3 WORKFLOW PREMIUM END */}
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
