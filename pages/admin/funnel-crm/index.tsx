"use client";

import { useEffect, useMemo, useState } from "react";
import CrmFilters, { type FilterState } from "../../../components/funnel/crm/CrmFilters";
import CrmTable from "../../../components/funnel/crm/CrmTable";
import type { CrmListItem, CrmOptions } from "../../../components/funnel/crm/types";

const initialFilters: FilterState = {
  q: "",
  funnel: "",
  offerMode: "",
  pipelineStage: "",
  priority: "",
  advisorStatus: "",
  followUp: "",
};

const defaultOptions: CrmOptions = {
  pipelineStages: ["new_lead", "engaged", "follow_up", "hot", "advisor_required", "decision_pending", "won", "lost", "do_not_contact"],
  priorities: ["low", "normal", "high", "urgent"],
  advisorStatuses: ["not_started", "requested", "scheduled", "completed", "follow_up", "converted", "not_fit", "no_show"],
};

type ApiData = {
  ok: true;
  total: number;
  take: number;
  skip: number;
  summary: { overdueFollowUps: number; urgentLeads: number; enrolledCore: number };
  items: CrmListItem[];
  filters: CrmOptions;
};

function FunnelCrmPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams({ take: "40", skip: String(skip) });
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    return params.toString();
  }, [filters, skip]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let active = true;
      async function load() {
        setLoading(true);
        setError("");
        try {
          const response = await fetch(`/api/admin/funnel-crm?${query}`);
          if (response.status === 401) { window.location.href = "/admin/login"; return; }
          const body = await response.json();
          if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to load CRM");
          if (active) setData(body);
        } catch (err) {
          if (active) setError(err instanceof Error ? err.message : "Unable to load CRM");
        } finally {
          if (active) setLoading(false);
        }
      }
      void load();
      return () => { active = false; };
    }, filters.q ? 300 : 0);
    return () => window.clearTimeout(timer);
  }, [query, filters.q]);

  const take = data?.take || 40;
  const total = data?.total || 0;
  const page = Math.floor(skip / take) + 1;
  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <main className="crm-shell">
      <div className="crm-container">
        <header className="crm-page-head">
          <div><span className="crm-eyebrow">SIKHADENGE · FUNNEL OPERATIONS</span><h1>Learner CRM</h1><p>One learner record from acquisition to WhatsApp, masterclass, workshop and AI Expert enrollment.</p></div>
          <div className="crm-head-actions"><a href="/admin/funnel-dashboard" className="crm-secondary-button">Funnel dashboard</a><a href="/admin" className="crm-secondary-button">Admin home</a></div>
        </header>

        <section className="crm-summary-grid">
          <article><span>Total matching</span><strong>{total}</strong></article>
          <article><span>Overdue follow-ups</span><strong>{data?.summary.overdueFollowUps ?? 0}</strong></article>
          <article><span>Urgent leads</span><strong>{data?.summary.urgentLeads ?? 0}</strong></article>
          <article><span>AI Expert enrolled</span><strong>{data?.summary.enrolledCore ?? 0}</strong></article>
        </section>

        <CrmFilters value={filters} options={data?.filters || defaultOptions} onChange={(next) => { setFilters(next); setSkip(0); }} onReset={() => { setFilters(initialFilters); setSkip(0); }} />

        {error ? <div className="crm-error">{error}</div> : null}
        <CrmTable items={data?.items || []} loading={loading} />

        <footer className="crm-pagination">
          <span>Page {page} of {pages} · {total} learners</span>
          <div><button type="button" disabled={skip <= 0 || loading} onClick={() => setSkip(Math.max(0, skip - take))}>Previous</button><button type="button" disabled={skip + take >= total || loading} onClick={() => setSkip(skip + take)}>Next</button></div>
        </footer>
      </div>
    </main>
  );
}

(FunnelCrmPage as typeof FunnelCrmPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;
export default FunnelCrmPage;
