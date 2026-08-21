import { useMemo, useState } from "react";
import type { CrmOptions, LearnerDetail } from "./types";

type Props = {
  learner: LearnerDetail;
  options: Required<Pick<CrmOptions, "pipelineStages" | "priorities" | "advisorStatuses">> & {
    qualifications: readonly string[];
    lostReasons: readonly string[];
  };
  onSaved: () => Promise<void> | void;
};

function toLocalInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function CrmEditor({ learner, options, onSaved }: Props) {
  const initial = useMemo(() => ({
    pipelineStage: learner.crm.pipelineStage,
    owner: learner.crm.owner || "",
    priority: learner.crm.priority,
    advisorStatus: learner.crm.advisorStatus,
    qualification: learner.crm.qualification || "",
    lostReason: learner.crm.lostReason || "",
    nextFollowUpAt: toLocalInput(learner.crm.nextFollowUpAt),
  }), [learner]);

  const [form, setForm] = useState(initial);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function set(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(extra: Record<string, unknown> = {}) {
    if (saving) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/funnel-crm/${learner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pipelineStage: form.pipelineStage,
          owner: form.owner || null,
          priority: form.priority,
          advisorStatus: form.advisorStatus,
          qualification: form.qualification || null,
          lostReason: form.lostReason || null,
          nextFollowUpAt: form.nextFollowUpAt ? new Date(form.nextFollowUpAt).toISOString() : null,
          note: note || undefined,
          ...extra,
        }),
      });
      const body = await response.json();
      if (!response.ok || !body?.ok) throw new Error(body?.error || "Unable to save CRM changes");
      setNote("");
      setMessage("Saved");
      await onSaved();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save CRM changes");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="crm-editor-card">
      <div className="crm-card-head"><div><span className="crm-eyebrow">OPERATIONS</span><h2>CRM controls</h2></div><button type="button" className="crm-secondary-button" disabled={saving} onClick={() => void save({ markContacted: true })}>Mark contacted now</button></div>

      <div className="crm-editor-grid">
        <label><span>Pipeline stage</span><select value={form.pipelineStage} onChange={(event) => set("pipelineStage", event.target.value)}>{options.pipelineStages.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
        <label><span>Owner</span><input value={form.owner} onChange={(event) => set("owner", event.target.value)} placeholder="Counsellor / owner name" /></label>
        <label><span>Priority</span><select value={form.priority} onChange={(event) => set("priority", event.target.value)}>{options.priorities.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>Advisor status</span><select value={form.advisorStatus} onChange={(event) => set("advisorStatus", event.target.value)}>{options.advisorStatuses.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
        <label><span>Qualification</span><select value={form.qualification} onChange={(event) => set("qualification", event.target.value)}><option value="">Not set</option>{options.qualifications.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
        <label><span>Lost reason</span><select value={form.lostReason} onChange={(event) => set("lostReason", event.target.value)}><option value="">Not lost / not set</option>{options.lostReasons.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
        <label className="crm-wide"><span>Next follow-up</span><input type="datetime-local" value={form.nextFollowUpAt} onChange={(event) => set("nextFollowUpAt", event.target.value)} /></label>
        <label className="crm-wide"><span>Internal note</span><textarea value={note} onChange={(event) => setNote(event.target.value.slice(0, 2000))} placeholder="Call outcome, objection, next action, context…" rows={5} /></label>
      </div>

      <div className="crm-editor-actions">
        <button type="button" className="crm-primary-button" disabled={saving} onClick={() => void save()}>{saving ? "Saving…" : "Save CRM update"}</button>
        {message ? <span className="crm-save-message">{message}</span> : null}
      </div>
    </section>
  );
}
