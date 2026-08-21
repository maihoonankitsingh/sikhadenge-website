import { useRouter } from "next/router";
import type { CrmListItem } from "./types";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function when(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

export default function CrmTable({ items, loading }: { items: CrmListItem[]; loading: boolean }) {
  const router = useRouter();

  if (loading) return <div className="crm-empty">Loading learners…</div>;
  if (!items.length) return <div className="crm-empty">No learners match these filters.</div>;

  return (
    <div className="crm-table-wrap">
      <table className="crm-table">
        <thead>
          <tr>
            <th>Learner</th><th>Source</th><th>Lifecycle</th><th>Pipeline</th><th>Priority</th><th>Advisor</th><th>Follow-up</th><th>Net revenue</th><th>Last activity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => void router.push(`/admin/funnel-crm/${item.id}`)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") void router.push(`/admin/funnel-crm/${item.id}`); }}>
              <td><strong>{item.name}</strong><span>{item.phone || item.email || item.id}</span></td>
              <td><span className={`crm-pill crm-${item.source.funnel}`}>{item.source.funnel}</span><small>{item.source.offerMode}</small></td>
              <td><strong>{item.lifecycle.label}</strong><span>{item.attribution.campaign || "Direct / unlabelled"}</span></td>
              <td><span className="crm-pill crm-neutral">{item.crm.pipelineStage.replaceAll("_", " ")}</span></td>
              <td><span className={`crm-pill crm-priority-${item.crm.priority}`}>{item.crm.priority}</span></td>
              <td>{item.crm.advisorStatus.replaceAll("_", " ")}</td>
              <td>{when(item.crm.nextFollowUpAt)}</td>
              <td><strong>{money(item.revenue.netRevenue)}</strong>{item.revenue.refundValue ? <span>Refund {money(item.revenue.refundValue)}</span> : null}</td>
              <td>{when(item.latestAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
