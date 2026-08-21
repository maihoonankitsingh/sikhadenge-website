"use client";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import type { FunnelConfig } from "../../../lib/funnel/types";
import { trackFunnelEvent } from "../../../lib/funnel/client";

const sharedDeliverables = [
  "Personal AI prompt system you can reuse after the workshop",
  "Research and information-synthesis workflow",
  "Professional content / document workflow",
  "Productivity workflow for repeat digital tasks",
  "Guided practice assignments and a final mini-project",
  "Workshop resources, checklists and implementation templates",
];

const curricula = {
  chatgpt: [
    ["Day 1", "Prompting that produces repeatable professional output"],
    ["Day 2", "Research, files and document workflows"],
    ["Day 3", "Writing, communication and content systems"],
    ["Day 4", "Data, structured thinking and productivity workflows"],
    ["Day 5", "Reusable projects and personal AI operating system"],
    ["Day 6", "Real-world implementation and guided project work"],
    ["Day 7", "Capstone review, roadmap and next-level AI skill plan"],
  ],
  claude: [
    ["Day 1", "Claude prompting and deliberate deep-work workflows"],
    ["Day 2", "Long documents, reading and structured extraction"],
    ["Day 3", "Research, synthesis and long-form writing"],
    ["Day 4", "Projects, reusable context and knowledge workflows"],
    ["Day 5", "Artifacts, prototypes and interactive outputs"],
    ["Day 6", "Professional implementation and guided project work"],
    ["Day 7", "Capstone review, roadmap and next-level AI skill plan"],
  ],
} as const;

const faqs = [
  ["Is this the same as the masterclass?", "No. The masterclass demonstrates the opportunity and key workflows. This workshop is structured implementation with guided practice, assignments and deliverables."],
  ["Is coding required?", "No. The workshop is designed for practical AI use. Technical depth can be introduced where useful, but coding is not a prerequisite for the main implementation track."],
  ["Do I need a paid ChatGPT or Claude plan?", "A paid plan is not mandatory for understanding the framework. Some advanced product capabilities can vary by account and plan, so the workshop focuses on transferable workflows rather than promising a specific paid feature."],
  ["Why is the launch price lower?", "The configured workshop offer can use a launch price for the current masterclass cohort. The payable amount is fixed on the server and verified at checkout."],
  ["Does buying this workshop automatically enroll me in the ₹14,999 program?", "No. The implementation workshop is a separate product. The advanced AI Expert Program is offered separately only to learners who want a broader structured program."],
];

export default function WorkshopPage({ config }: { config: FunnelConfig }) {
  const router = useRouter();
  const leadId = typeof router.query.lead_id === "string" ? router.query.lead_id : "";
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const curriculum = curricula[config.product];

  const discount = useMemo(() => {
    if (config.workshopRegularPrice <= config.workshopPrice) return 0;
    return Math.round(((config.workshopRegularPrice - config.workshopPrice) / config.workshopRegularPrice) * 100);
  }, [config.workshopPrice, config.workshopRegularPrice]);

  useEffect(() => {
    if (!router.isReady || !leadId) return;
    void trackFunnelEvent(
      config,
      "workshop_offer_viewed",
      { offer: "implementation_workshop", value: config.workshopPrice, currency: "INR" },
      leadId
    );
  }, [router.isReady, leadId, config.product, config.offerMode, config.workshopPrice, config.batchId]);

  async function startCheckout() {
    if (!leadId) {
      setStatus("error");
      setMessage("Use the personalized workshop link sent to your registered WhatsApp number so your enrollment can be linked correctly.");
      return;
    }
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    void trackFunnelEvent(
      config,
      "workshop_cta_click",
      { value: config.workshopPrice, currency: "INR" },
      leadId
    );

    try {
      const response = await fetch("/api/funnel/workshop/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, funnel: config.product }),
      });
      const body = await response.json();
      if (!response.ok || !body?.ok || !body?.checkoutUrl) {
        throw new Error(body?.error || "Unable to start secure workshop checkout");
      }
      window.location.assign(body.checkoutUrl);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to start workshop checkout");
    }
  }

  return (
    <>
      <Head>
        <title>{config.workshopName} | SikhaDenge</title>
        <meta name="description" content={`Join SikhaDenge's practical ${config.workshopName} with guided implementation, assignments and real workflow deliverables.`} />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className={`workshop-shell workshop-theme-${config.theme}`}>
        <header className="workshop-topbar">
          <Image src="/funnels/shared/sikhadenge-logo.png" width={168} height={54} alt="SikhaDenge" priority />
          <span>Implementation Workshop • Masterclass Cohort Offer</span>
        </header>

        <section className="workshop-hero">
          <div className="workshop-hero-copy">
            <span className="workshop-kicker">5–7 DAY PRACTICAL IMPLEMENTATION</span>
            <h1>Don't stop at understanding {config.productLabel}. <em>Build a working system with it.</em></h1>
            <p>The live masterclass shows what is possible. This guided workshop is where you implement the workflows yourself, complete practical exercises and leave with reusable AI systems.</p>
            <div className="workshop-proof-row"><span>Live guided sessions</span><span>Daily implementation</span><span>Assignments + project</span><span>Easy Hinglish</span></div>
          </div>

          <aside className="workshop-offer-card">
            <span className="workshop-offer-label">CURRENT COHORT OFFER</span>
            {config.workshopRegularPrice > config.workshopPrice ? <div className="workshop-price-anchor">Regular ₹{config.workshopRegularPrice}</div> : null}
            <div className="workshop-price">₹{config.workshopPrice}</div>
            {discount ? <div className="workshop-save">Save {discount}% for this configured cohort</div> : null}
            <button type="button" onClick={startCheckout} disabled={status === "loading"} className="workshop-primary-button">{status === "loading" ? "Opening secure checkout…" : `Join Workshop for ₹${config.workshopPrice}`}</button>
            <p>Secure Razorpay checkout. Your payable amount is fixed and verified server-side.</p>
            {message ? <div className="workshop-message">{message}</div> : null}
          </aside>
        </section>

        <section className="workshop-section workshop-section-light">
          <div className="workshop-section-head"><span className="workshop-kicker">THE GAP THIS WORKSHOP CLOSES</span><h2>Watching AI demos is not the same as building an AI workflow you can use tomorrow.</h2></div>
          <div className="workshop-three-grid"><article><strong>01</strong><h3>From random prompts</h3><p>Move toward reusable instructions and repeatable output structures.</p></article><article><strong>02</strong><h3>From tool curiosity</h3><p>Build practical workflows around real tasks rather than collecting more AI tools.</p></article><article><strong>03</strong><h3>From watching to doing</h3><p>Complete guided exercises and a mini-project so the learning becomes executable.</p></article></div>
        </section>

        <section className="workshop-section">
          <div className="workshop-section-head"><span className="workshop-kicker">IMPLEMENTATION ROADMAP</span><h2>Your {config.productLabel} workshop journey.</h2><p>The exact live schedule can be compressed to 5 days or expanded to 7 without changing the core implementation outcomes.</p></div>
          <div className="workshop-curriculum">{curriculum.map(([day, title]) => <article key={day}><span>{day}</span><strong>{title}</strong></article>)}</div>
        </section>

        <section className="workshop-section workshop-section-light">
          <div className="workshop-section-head"><span className="workshop-kicker">YOU LEAVE WITH OUTPUTS</span><h2>Not just notes. Working assets and repeatable systems.</h2></div>
          <div className="workshop-deliverables">{sharedDeliverables.map((item) => <div key={item}><span>✓</span><p>{item}</p></div>)}</div>
        </section>

        <section className="workshop-section workshop-mentor-grid">
          <div className="workshop-mentor-image"><Image src="/funnels/shared/mentor.jpg" width={680} height={680} alt="SikhaDenge workshop mentor" /></div>
          <div><span className="workshop-kicker">GUIDED BY SIKHADENGE</span><h2>Implementation first. Tool hype second.</h2><p>The workshop is designed around practical digital work, structured exercises and reviewable outputs. Sikhadenge remains the education provider; {config.productLabel} is used as the product being taught, not as an implied brand partnership.</p><ul><li>Practical live walkthroughs</li><li>Guided learner implementation</li><li>Frameworks you can reuse after the batch</li><li>Clear bridge into advanced learning only if you want it</li></ul></div>
        </section>

        <section className="workshop-section workshop-section-light"><div className="workshop-section-head"><span className="workshop-kicker">FAQ</span><h2>Before you enroll.</h2></div><div className="workshop-faqs">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>

        <section className="workshop-final-cta"><span className="workshop-kicker">YOUR NEXT IMPLEMENTATION STEP</span><h2>Turn the masterclass insight into a system you can actually use.</h2><p>{config.workshopName} • current configured cohort price ₹{config.workshopPrice}</p><button type="button" onClick={startCheckout} disabled={status === "loading"} className="workshop-primary-button">{status === "loading" ? "Opening secure checkout…" : `Join for ₹${config.workshopPrice}`}</button>{!leadId ? <small>Open this page from the personalized link sent to your registered WhatsApp number to continue.</small> : null}</section>

        <footer className="workshop-footer"><span>SikhaDenge • ThinkGrow Private Limited</span><p>SikhaDenge is an independent education provider. ChatGPT is a product of OpenAI and Claude is a product of Anthropic. No affiliation or endorsement is implied.</p><nav><a href="/terms">Terms</a><a href="/privacy-policy">Privacy</a><a href="/refund-policy">Refund Policy</a></nav></footer>
      </main>
    </>
  );
}
