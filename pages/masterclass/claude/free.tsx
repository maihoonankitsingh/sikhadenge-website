import Head from "next/head";
import type { ReactNode } from "react";
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
  ["Q&A", "Live question time", "Bring your use case and understand how to adapt the workflow."],
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

function ClaudeFreeMasterclassPage() {
  return (
    <>
      <Head>
        <title>Live Claude AI Masterclass | SikhaDenge</title>
        <meta
          name="description"
          content="Join SikhaDenge's live Claude AI masterclass for practical research, long-document, writing, analysis and productivity workflows."
        />
        <meta property="og:title" content="Live Claude AI Masterclass | SikhaDenge" />
        <meta
          property="og:description"
          content="Learn practical Claude AI workflows for professional work in a live beginner-friendly session."
        />
        <meta name="robots" content="index,follow" />
      </Head>

      <main className={styles.page}>
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
                <span className={styles.proofIcon} aria-hidden="true">◎</span>
                <div className={styles.proofText}>
                  <small>LEARNER TRUST</small>
                  <strong>150,000+ Students</strong>
                </div>
              </div>

              <div className={styles.proofCard}>
                <span className={styles.proofIcon} aria-hidden="true">★</span>
                <div className={styles.proofText}>
                  <small>LEARNER RATING</small>
                  <strong>4.9/5 Rating</strong>
                </div>
              </div>

              <div className={styles.proofCard}>
                <span className={styles.proofIcon} aria-hidden="true">◌</span>
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
                  <span className={styles.mobileScheduleIcon} aria-hidden="true">◷</span>
                  <span>
                    <small>DATE</small>
                    <strong>Next Live Batch</strong>
                  </span>
                </div>
                <div>
                  <span className={styles.mobileScheduleIcon} aria-hidden="true">◴</span>
                  <span>
                    <small>TIME</small>
                    <strong>8:00 PM IST</strong>
                  </span>
                </div>
              </div>

              <a className={styles.mobileRegisterButton} href={registerHref}>
                Reserve My Free Seat <span>→</span>
              </a>

              <div className={styles.mobileTrustLine}>
                Live Online <i /> Easy Hinglish <i /> No Coding Required
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
                <span>Easy Hinglish</span><i /><span>No coding required</span>
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
                  alt="Use Claude for real professional work"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className={styles.realWorkTabletArt}
                  src="/funnels/claude/real-work/real-work-tablet-v2.png"
                  alt="Use Claude for real professional work"
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
                <span className={styles.realWorkEyebrow}>BUILT FOR REAL WORK</span>
                <h2>Use Claude for <em>work you already do.</em></h2>
                <p>
                  Research, writing, analysis and repeatable workflows — shown live with a
                  practical, step-by-step approach.
                </p>
                <div className={styles.realWorkTags}>
                  <span>Research &amp; Long Docs</span>
                  <span>Professional Writing</span>
                  <span>Structured Analysis</span>
                  <span>Reusable Workflows</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="agenda" className={`${styles.section} ${styles.white}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>LIVE MASTERCLASS ROADMAP</span>
              <h2>Exactly what you’ll learn in the live session.</h2>
              <p>A focused path from Claude fundamentals to practical professional workflows.</p>
            </div>
            <div className={styles.agendaGrid}>
              {agenda.map(([n, title, text]) => (
                <article key={n}>
                  <b>{n}</b>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft} ${styles.aiShiftSection}`}>
          <div className={styles.container}>
            <div className={styles.aiShiftCleanShell}>
              <div className={styles.aiShiftCleanIntro}>
                <span className={styles.aiShiftCleanEyebrow}>THE AI SHIFT</span>
                <h2>
                  Why AI-skilled professionals are <span>moving ahead faster.</span>
                </h2>
                <p>
                  Professionals who can use AI workflows effectively are building a stronger
                  advantage across research, communication, analysis and execution.
                </p>
              </div>

              <div className={styles.aiShiftCleanGrid}>
                <figure className={styles.aiShiftCleanCard}>
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/funnels/claude/ai-shift/the_ai_shift_workforce_transformation.png"
                    />
                    <source
                      media="(max-width: 1024px)"
                      srcSet="/funnels/claude/ai-shift/ai_powered_professional_workflows.png"
                    />
                    <img
                      src="/funnels/claude/ai-shift/the_ai_shift_professionals_at_work.png"
                      alt="AI powered professional workflow transformation"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </figure>
              </div>

              <div className={styles.aiShiftCleanFooter}>
                <span>
                  Jobs are moving toward AI-enabled professionals. Become AI-enabled before the shift leaves you behind.
                </span>
                <a href={registerHref}>Reserve My Free Seat</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>WHAT YOU GET</span>
              <h2>A practical starting kit for Claude AI.</h2>
            </div>
            <div className={styles.benefitGrid}>
              {benefits.map(([tag, title, text]) => (
                <article key={title}>
                  <b>{tag}</b><strong>{title}</strong><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>BUILT FOR PRACTICAL LEARNERS</span>
              <h2>Use Claude where deeper thinking and structured output matter.</h2>
            </div>
            <div className={styles.audienceGrid}>
              {audience.map(([title, text]) => (
                <article key={title}><strong>{title}</strong><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaBand}>
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div>
              <h2>Learn. Apply. Work smarter.</h2>
              <p>Reserve your free seat and continue through SikhaDenge's live registration flow.</p>
            </div>
            <Cta>Register Now for Free</Cta>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.container}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2>Frequently asked questions.</h2>
            </div>
            <div className={styles.faq}>
              <details><summary>Is this Claude masterclass really free?</summary><p>Yes. The current entry is free. Register through the SikhaDenge registration page to receive the joining flow.</p></details>
              <details><summary>Do I need coding experience?</summary><p>No. The session is designed for beginners and working professionals.</p></details>
              <details><summary>Which language is used?</summary><p>The session is delivered in easy Hinglish.</p></details>
              <details><summary>Do I need a paid Claude subscription?</summary><p>No paid plan is required to understand the core workflows.</p></details>
              <details><summary>Where will I get the joining details?</summary><p>Complete the SikhaDenge registration flow with the WhatsApp number you actively use.</p></details>
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <div className={`${styles.container} ${styles.finalBox}`}>
            <div>
              <span className={styles.eyebrow}>NEXT LIVE BATCH</span>
              <h2>Your first Claude workflow starts with one live session.</h2>
              <p>Reserve your free seat and continue to the SikhaDenge registration page.</p>
            </div>
            <Cta>Yes, Reserve My Free Seat</Cta>
          </div>
        </section>
      </main>
    </>
  );
}

(ClaudeFreeMasterclassPage as typeof ClaudeFreeMasterclassPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;

export default ClaudeFreeMasterclassPage;
