"use client";

import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import LearnerSummary from "../../../components/funnel/crm/LearnerSummary";
import CrmEditor from "../../../components/funnel/crm/CrmEditor";
import CrmTimeline from "../../../components/funnel/crm/CrmTimeline";
import type { CrmOptions, CrmTimelineItem, LearnerDetail } from "../../../components/funnel/crm/types";

type DetailData = {
  ok: true;
  learner: LearnerDetail;
  timeline: CrmTimelineItem[];
  options: Required<Pick<CrmOptions, "pipelineStages" | "priorities" | "advisorStatuses">> & {
    qualifications: readonly string[];
    lostReasons: readonly string[];
  };
};

function FunnelCrmLearnerPage() {
  const router = useRouter();
  const leadId = typeof router.query.leadId === "string" ? router.query.leadId : "";
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!leadId) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/funnel-crm/${encodeURIComponent(leadId)}`);
      if (response.status === 401) { window.location.href = "/admin/login"; return; }
      const body = await response.json();
      if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to load learner");
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load learner");
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => { void load(); }, [load]);

  return (
    <main className="crm-shell">
      <div className="crm-container crm-detail-container">
        <header className="crm-detail-topbar">
          <button type="button" className="crm-secondary-button" onClick={() => void router.push("/admin/funnel-crm")}>← Learner CRM</button>
          <div><a href="/admin/funnel-dashboard" className="crm-secondary-button">Dashboard</a><a href="/admin" className="crm-secondary-button">Admin</a></div>
        </header>

        {loading ? <div className="crm-empty">Loading learner journey…</div> : null}
        {error ? <div className="crm-error">{error}</div> : null}

        {data ? (
          <>
            <LearnerSummary learner={data.learner} />
            <div className="crm-detail-columns">
              <CrmEditor learner={data.learner} options={data.options} onSaved={load} />
              <CrmTimeline items={data.timeline} />
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}

(FunnelCrmLearnerPage as typeof FunnelCrmLearnerPage & { hideGlobalHeader?: boolean }).hideGlobalHeader = true;
export default FunnelCrmLearnerPage;
