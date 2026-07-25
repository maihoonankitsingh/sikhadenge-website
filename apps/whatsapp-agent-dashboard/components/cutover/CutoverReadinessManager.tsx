"use client";

import { useEffect, useState } from "react";

type Readiness = {
  readyForSupervisedCutover: boolean;
  readyForAutomaticCutover: boolean;
  cutoverExecuted: boolean;
  checks: Array<{
    id: string;
    group: string;
    label: string;
    status: "PASS" | "PENDING" | "MANUAL" | "BLOCKED";
    detail: string;
  }>;
  summary: { passed: number; pending: number; manual: number; blocked: number };
  inventory: Record<string, number>;
  constraints: Record<string, boolean>;
  generatedAt: string;
};

async function readJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error || "Cutover readiness request failed.");
  return payload;
}

function humanise(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CutoverReadinessManager() {
  const [data, setData] = useState<Readiness | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/cutover/readiness", { cache: "no-store" });
      setData(await readJson<Readiness>(response));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Cutover readiness could not load.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading && !data) return <div className="suite-loading">Running final cutover readiness audit…</div>;
  if (!data) return <div className="suite-alert error">{error || "Cutover readiness unavailable."}</div>;

  const groups = Array.from(new Set(data.checks.map((check) => check.group)));

  return (
    <div className="suite-stack">
      <section className="cutover-banner">
        <div>
          <span>Phase 20 safety boundary</span>
          <h3>{data.readyForSupervisedCutover ? "Technical prerequisites can proceed to supervised review" : "Cutover remains blocked"}</h3>
          <p>No Meta registration, AiSensy disconnection, outbound activation or login consolidation is performed from this page.</p>
        </div>
        <button type="button" className="secondary" onClick={() => void load()}>Run audit again</button>
      </section>

      {error ? <div className="suite-alert error">{error}</div> : null}

      <section className="suite-metrics">
        <article><span>Passed</span><strong>{data.summary.passed}</strong></article>
        <article><span>Pending</span><strong>{data.summary.pending}</strong></article>
        <article><span>Manual checks</span><strong>{data.summary.manual}</strong></article>
        <article><span>Blocked</span><strong>{data.summary.blocked}</strong></article>
      </section>

      <section className="suite-grid two">
        {groups.map((group) => (
          <div className="suite-card" key={group}>
            <header><div><span>Readiness group</span><h3>{group}</h3></div></header>
            <div className="cutover-check-list">
              {data.checks.filter((check) => check.group === group).map((check) => (
                <article key={check.id}>
                  <span className={`cutover-status ${check.status.toLowerCase()}`}>{check.status}</span>
                  <div><strong>{check.label}</strong><p>{check.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="suite-grid two">
        <div className="suite-card">
          <header><div><span>Production inventory</span><h3>Current system state</h3></div></header>
          <div className="suite-list compact">
            {Object.entries(data.inventory).map(([name, value]) => <article key={name}><span>{humanise(name)}</span><strong>{value}</strong></article>)}
          </div>
        </div>
        <div className="suite-card">
          <header><div><span>Non-negotiable controls</span><h3>Final-cutover constraints</h3></div></header>
          <div className="suite-list compact">
            {Object.entries(data.constraints).map(([name, value]) => <article key={name}><span>{humanise(name)}</span><strong>{value ? "Required" : "No"}</strong></article>)}
          </div>
        </div>
      </section>

      <div className="suite-alert warning">
        The active SIM makes verification possible, but OTP and the six-digit two-step PIN must stay private. AiSensy remains the live owner until registration, webhook and rollback checks succeed in the supervised cutover window.
      </div>
    </div>
  );
}
