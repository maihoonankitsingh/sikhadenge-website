import type { LearnerDetail } from "./types";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function display(value?: string | null) {
  return value || "—";
}

export default function LearnerSummary({ learner }: { learner: LearnerDetail }) {
  return (
    <>
      <section className="crm-detail-hero">
        <div>
          <span className="crm-eyebrow">LEARNER JOURNEY</span>
          <h1>{learner.name}</h1>
          <p>{display(learner.phone)} · {display(learner.email)}</p>
          <div className="crm-hero-pills">
            <span className={`crm-pill crm-${learner.source.funnel}`}>{learner.source.funnel}</span>
            <span className="crm-pill crm-neutral">{learner.source.offerMode}</span>
            <span className="crm-pill crm-neutral">{learner.lifecycle.label}</span>
            <span className={`crm-pill crm-priority-${learner.crm.priority}`}>{learner.crm.priority}</span>
          </div>
        </div>
        <div className="crm-revenue-card">
          <span>Net tracked revenue</span>
          <strong>{money(learner.revenue.netRevenue)}</strong>
          <div><small>Entry {money(learner.revenue.entryRevenue)}</small><small>Workshop {money(learner.revenue.workshopRevenue)}</small><small>Core {money(learner.revenue.coreRevenue)}</small><small>Refund {money(learner.revenue.refundValue)}</small></div>
        </div>
      </section>

      <section className="crm-detail-grid crm-overview-grid">
        <article><span>Pipeline</span><strong>{learner.crm.pipelineStage.replaceAll("_", " ")}</strong></article>
        <article><span>Owner</span><strong>{display(learner.crm.owner)}</strong></article>
        <article><span>Advisor</span><strong>{learner.crm.advisorStatus.replaceAll("_", " ")}</strong></article>
        <article><span>Qualification</span><strong>{display(learner.crm.qualification)}</strong></article>
        <article><span>Campaign</span><strong>{display(learner.attribution.utmCampaign)}</strong><small>{display(learner.attribution.adId)}</small></article>
        <article><span>Registration goal</span><strong>{display(learner.registration.goal)}</strong><small>{display(learner.registration.occupation)}</small></article>
      </section>
    </>
  );
}
