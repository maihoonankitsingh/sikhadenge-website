import type { CrmTimelineItem } from "./types";

function when(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function title(item: CrmTimelineItem) {
  if (item.type === "payment") return item.title.replaceAll("_", " ").replace(":", " · ");
  if (item.type === "crm_activity") return item.title.replaceAll("_", " ");
  return item.title.replaceAll("_", " ");
}

export default function CrmTimeline({ items }: { items: CrmTimelineItem[] }) {
  return (
    <section className="crm-timeline-card">
      <div className="crm-card-head"><div><span className="crm-eyebrow">AUDIT TRAIL</span><h2>Complete learner timeline</h2></div><span>{items.length} records</span></div>
      <div className="crm-timeline">
        {items.length ? items.map((item) => (
          <article key={item.id} className={`crm-timeline-item crm-timeline-${item.type}`}>
            <div className="crm-timeline-dot" />
            <div className="crm-timeline-body">
              <div className="crm-timeline-title"><strong>{title(item)}</strong><time>{when(item.at)}</time></div>
              {item.value ? <span className="crm-timeline-value">{money(item.value)}</span> : null}
              {item.type === "crm_activity" && item.metadata?.note ? <p>{item.metadata.note}</p> : null}
              {item.type === "crm_activity" && item.metadata?.field ? <p>{item.metadata.field}: {item.metadata.oldValue || "—"} → {item.metadata.newValue || "—"}</p> : null}
              {item.type === "payment" ? <p>{item.metadata?.provider || "payment"} · {item.metadata?.status || ""}{item.metadata?.failureReason ? ` · ${item.metadata.failureReason}` : ""}</p> : null}
            </div>
          </article>
        )) : <div className="crm-empty">No timeline activity yet.</div>}
      </div>
    </section>
  );
}
