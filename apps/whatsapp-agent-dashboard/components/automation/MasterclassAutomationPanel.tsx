"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type TemplateSummary = {
  id: string;
  name: string;
  status: string;
  category: string;
  language: string;
} | null;

type MasterclassOverview = {
  config: {
    enabled: boolean;
    classTime: string;
    classDate: string;
    classDay: string;
    communityLink: string;
    delayMinutes: number;
    version: number;
    updatedAt: string;
  };
  templates: {
    instant: TemplateSummary;
    reminder: TemplateSummary;
  };
  metrics: {
    totalEnrollments: number;
    pendingReminders: number;
    completed: number;
    skipped: number;
    failed: number;
    nextDue: string | null;
  };
  previews: {
    instant: string;
    reminder: string;
  };
  runtime: {
    registrationWebhookConfigured: boolean;
    workerIntervalSeconds: number;
    outboundMode: string;
  };
  generatedAt: string;
};

type FormState = {
  enabled: boolean;
  classTime: string;
  classDate: string;
  classDay: string;
  communityLink: string;
  delayMinutes: string;
};

function formFromOverview(overview: MasterclassOverview): FormState {
  return {
    enabled: overview.config.enabled,
    classTime: overview.config.classTime,
    classDate: overview.config.classDate,
    classDay: overview.config.classDay,
    communityLink: overview.config.communityLink,
    delayMinutes: String(overview.config.delayMinutes),
  };
}

function templateClass(status?: string): string {
  const value = status?.trim().toLowerCase() || "missing";
  return `mc-status mc-status-${value}`;
}

function formatDate(value: string | null): string {
  if (!value) return "No reminder pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default function MasterclassAutomationPanel() {
  const [overview, setOverview] = useState<MasterclassOverview | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/automation/masterclass", {
        cache: "no-store",
      });
      const body = (await response.json()) as MasterclassOverview & {
        error?: string;
      };
      if (!response.ok) throw new Error(body.error || "Flow could not be loaded.");
      setOverview(body);
      setForm(formFromOverview(body));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Flow could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const previews = useMemo(() => {
    if (!form) return null;
    const instant = `Hi Learner 👋\n\nAapka registration *Free AI Expert Masterclass* ke liye *successfully receive ho gaya hai.* 🚀\n\n🔴 *Live Class | ${form.classTime}*\n🗓 *${form.classDate} | ${form.classDay}*\n\n📌 *Masterclass ki joining link aur complete details* aapko hamari *WhatsApp Community* mein share ki jayengi.\n\n👉 Updates miss na karne aur apni seat confirm karne ke liye abhi *WhatsApp Community join karein:*\n\n🟢 ${form.communityLink}\n\n⚠️ *Seats limited hain — abhi community join karein.* ⏳\n\n*Thank You for Registering!*\n*Team SikhaDenge* 🎓`;
    const reminder = `Hi Learner 👋\n\n⏰ Just a Quick Reminder\n\n*AI Expert Masterclass* ki joining link aur final class instructions hamari *WhatsApp Community* mein hi share ki jayengi.\n\n🔴 *Live Class | ${form.classTime}*\n🗓 *${form.classDate} | ${form.classDay}*\n\n👉 Agar aapne abhi tak WhatsApp Community join nahi ki hai, to neeche diye gaye link se abhi join karein:\n\n🟢 ${form.communityLink}\n\n✅ Community pehle hi join kar chuke hain?\nPerfect! Aapko kuch aur karne ki zarurat nahi hai. Class ki details community mein mil jayengi.\n\n⚠️ Class start hone se pehle WhatsApp Community check karna na bhoolein.\n\n*See You in the 🔴Live Masterclass!*\n*Team SikhaDenge* 🎓`;
    return { instant, reminder };
  }, [form]);

  async function save(): Promise<void> {
    if (!form) return;
    setBusy("save");
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/automation/masterclass", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          delayMinutes: Number(form.delayMinutes),
        }),
      });
      const body = (await response.json()) as MasterclassOverview & {
        error?: string;
      };
      if (!response.ok) throw new Error(body.error || "Configuration save failed.");
      setOverview(body);
      setForm(formFromOverview(body));
      setNotice(
        body.config.enabled
          ? "Masterclass flow saved and enabled for new registrations."
          : "Masterclass flow configuration saved. Sending remains disabled.",
      );
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Configuration save failed.",
      );
    } finally {
      setBusy(null);
    }
  }

  async function runAction(action: string, success: string): Promise<void> {
    setBusy(action);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/automation/masterclass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const body = (await response.json()) as {
        overview?: MasterclassOverview;
        error?: string;
      };
      if (!response.ok || !body.overview) {
        throw new Error(body.error || "Automation action failed.");
      }
      setOverview(body.overview);
      setForm(formFromOverview(body.overview));
      setNotice(success);
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : "Automation action failed.",
      );
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return <section className="mc-panel mc-loading">Loading masterclass flow…</section>;
  }
  if (!overview || !form || !previews) {
    return (
      <section className="mc-panel mc-error-card">
        <strong>Masterclass flow could not be loaded</strong>
        <p>{error || "Unknown error."}</p>
        <button type="button" onClick={() => void load()}>
          Retry
        </button>
      </section>
    );
  }

  const approved =
    overview.templates.instant?.status === "APPROVED" &&
    overview.templates.reminder?.status === "APPROVED";

  return (
    <section className="mc-panel" aria-labelledby="masterclass-flow-heading">
      <header className="mc-panel-head">
        <div>
          <span>LIVE REGISTRATION AUTOMATION</span>
          <h2 id="masterclass-flow-heading">Free AI Expert Masterclass Flow</h2>
          <p>
            Registration par instant confirmation aur exactly {form.delayMinutes || "135"} minutes baad community reminder.
          </p>
        </div>
        <label className="mc-flow-switch">
          <span>{form.enabled ? "Enabled" : "Disabled"}</span>
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(event) =>
              setForm((current) =>
                current ? { ...current, enabled: event.target.checked } : current,
              )
            }
          />
          <i />
        </label>
      </header>

      {error ? <div className="mc-alert error">{error}</div> : null}
      {notice ? <div className="mc-alert success">{notice}</div> : null}

      <div className="mc-metrics">
        <article><span>Total enrolled</span><strong>{overview.metrics.totalEnrollments}</strong></article>
        <article><span>Pending reminder</span><strong>{overview.metrics.pendingReminders}</strong></article>
        <article><span>Completed</span><strong>{overview.metrics.completed}</strong></article>
        <article><span>Skipped / failed</span><strong>{overview.metrics.skipped + overview.metrics.failed}</strong></article>
      </div>

      <div className="mc-runtime-strip">
        <span>Outbound: <strong>{overview.runtime.outboundMode}</strong></span>
        <span>Webhook: <strong>{overview.runtime.registrationWebhookConfigured ? "configured" : "missing secret"}</strong></span>
        <span>Worker: <strong>every {overview.runtime.workerIntervalSeconds}s</strong></span>
        <span>Next due: <strong>{formatDate(overview.metrics.nextDue)}</strong></span>
      </div>

      <div className="mc-grid">
        <div className="mc-editor-card">
          <div className="mc-card-heading">
            <div><span>REUSABLE VARIABLES</span><h3>Next masterclass details</h3></div>
            <small>Version {overview.config.version}</small>
          </div>
          <div className="mc-form-grid">
            <label>
              <span>Live class time</span>
              <input
                value={form.classTime}
                onChange={(event) => setForm({ ...form, classTime: event.target.value })}
                placeholder="08:00 PM"
              />
            </label>
            <label>
              <span>Class date</span>
              <input
                value={form.classDate}
                onChange={(event) => setForm({ ...form, classDate: event.target.value })}
                placeholder="07 August"
              />
            </label>
            <label>
              <span>Class day</span>
              <input
                value={form.classDay}
                onChange={(event) => setForm({ ...form, classDay: event.target.value })}
                placeholder="Friday"
              />
            </label>
            <label>
              <span>Reminder delay (minutes)</span>
              <input
                type="number"
                min={5}
                max={1440}
                value={form.delayMinutes}
                onChange={(event) => setForm({ ...form, delayMinutes: event.target.value })}
              />
            </label>
            <label className="wide">
              <span>WhatsApp Community link</span>
              <input
                value={form.communityLink}
                onChange={(event) => setForm({ ...form, communityLink: event.target.value })}
                placeholder="https://chat.whatsapp.com/..."
              />
            </label>
          </div>
          <div className="mc-save-row">
            <p>Save karne ke baad sirf new registrations updated values use karengi. Existing pending leads ka snapshot change nahi hoga.</p>
            <button type="button" disabled={Boolean(busy)} onClick={() => void save()}>
              {busy === "save" ? "Saving…" : "Save flow"}
            </button>
          </div>
        </div>

        <aside className="mc-template-card">
          <div className="mc-card-heading"><div><span>META APPROVAL</span><h3>WhatsApp templates</h3></div></div>
          <div className="mc-template-list">
            <article>
              <div><strong>Instant confirmation</strong><small>{overview.templates.instant?.name || "Not created"}</small></div>
              <span className={templateClass(overview.templates.instant?.status)}>{overview.templates.instant?.status || "MISSING"}</span>
            </article>
            <article>
              <div><strong>2h 15m reminder</strong><small>{overview.templates.reminder?.name || "Not created"}</small></div>
              <span className={templateClass(overview.templates.reminder?.status)}>{overview.templates.reminder?.status || "MISSING"}</span>
            </article>
          </div>
          <div className="mc-template-actions">
            <button type="button" disabled={Boolean(busy)} onClick={() => void runAction("prepare_templates", "Template drafts are ready.")}>Prepare drafts</button>
            <button type="button" disabled={Boolean(busy)} onClick={() => void runAction("submit_templates", "Templates submitted to Meta.")}>Submit to Meta</button>
            <button type="button" disabled={Boolean(busy)} onClick={() => void runAction("sync_templates", "Template statuses synced from Meta.")}>Sync status</button>
          </div>
          <p className={approved ? "mc-ready" : "mc-not-ready"}>
            {approved ? "Both templates approved. Flow can be enabled." : "Flow enable karne se pehle dono templates APPROVED hone chahiye."}
          </p>
          <button className="mc-run-due" type="button" disabled={Boolean(busy)} onClick={() => void runAction("dispatch_due", "Due reminders and queued outbound messages processed.")}>Run due queue now</button>
        </aside>
      </div>

      <div className="mc-preview-grid">
        <article>
          <header><span>MESSAGE 1</span><strong>Instant after registration</strong></header>
          <pre>{previews.instant}</pre>
        </article>
        <article>
          <header><span>MESSAGE 2</span><strong>{form.delayMinutes || "135"} minutes after registration</strong></header>
          <pre>{previews.reminder}</pre>
        </article>
      </div>

      <footer className="mc-webhook-note">
        <strong>Registration endpoint</strong>
        <code>POST /api/webhooks/masterclass-registration</code>
        <p>Required JSON: registrationId, name, phone, consent=true. Authorization uses the server-side webhook secret.</p>
      </footer>
    </section>
  );
}
