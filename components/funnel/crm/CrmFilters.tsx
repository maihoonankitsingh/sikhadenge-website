import type { CrmOptions } from "./types";

type FilterState = {
  q: string;
  funnel: string;
  offerMode: string;
  pipelineStage: string;
  priority: string;
  advisorStatus: string;
  followUp: string;
};

export default function CrmFilters({
  value,
  options,
  onChange,
  onReset,
}: {
  value: FilterState;
  options: CrmOptions;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  function set<K extends keyof FilterState>(key: K, next: FilterState[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <section className="crm-filters">
      <label className="crm-search">
        <span>Search learner</span>
        <input
          value={value.q}
          onChange={(event) => set("q", event.target.value)}
          placeholder="Name, phone, email, campaign…"
        />
      </label>

      <label><span>Product</span><select value={value.funnel} onChange={(event) => set("funnel", event.target.value)}><option value="">All</option><option value="chatgpt">ChatGPT</option><option value="claude">Claude</option></select></label>
      <label><span>Entry</span><select value={value.offerMode} onChange={(event) => set("offerMode", event.target.value)}><option value="">All</option><option value="free">Free</option><option value="paid">Paid</option></select></label>
      <label><span>Pipeline</span><select value={value.pipelineStage} onChange={(event) => set("pipelineStage", event.target.value)}><option value="">All</option>{options.pipelineStages.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
      <label><span>Priority</span><select value={value.priority} onChange={(event) => set("priority", event.target.value)}><option value="">All</option>{options.priorities.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <label><span>Advisor</span><select value={value.advisorStatus} onChange={(event) => set("advisorStatus", event.target.value)}><option value="">All</option>{options.advisorStatuses.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select></label>
      <label><span>Follow-up</span><select value={value.followUp} onChange={(event) => set("followUp", event.target.value)}><option value="">All</option><option value="overdue">Overdue</option><option value="next_24h">Next 24h</option><option value="none">No date</option></select></label>
      <button type="button" className="crm-reset" onClick={onReset}>Reset</button>
    </section>
  );
}

export type { FilterState };
