import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const user = await requireDashboardUser();

  return (
    <DashboardModuleShell
      activeTitle="Analytics"
      eyebrow="Performance visibility"
      title="Analytics"
      description="Conversation volume, AI handling, handoff rate, response latency and lead outcomes are reviewed here."
      userName={user.name}
      userRole={user.role}
    >
      <div className="module-status-strip">
        <div className="module-status-item"><span>Conversations</span><strong>Tracked</strong></div>
        <div className="module-status-item"><span>Latency</span><strong>Measured</strong></div>
        <div className="module-status-item"><span>AI decisions</span><strong>Auditable</strong></div>
        <div className="module-status-item"><span>Outbound</span><strong>Disabled</strong></div>
      </div>
      <div className="module-info-grid">
        <article className="module-info-card"><strong>Operations</strong><p>Review open conversations, unread load, assignment queues and pending counselor actions.</p></article>
        <article className="module-info-card"><strong>AI quality</strong><p>Inspect decision source, latency, fallback usage and evaluation signals without exposing private reasoning.</p></article>
        <article className="module-info-card"><strong>Lead outcomes</strong><p>Compare qualification stages and counselor follow-up activity over time.</p></article>
      </div>
    </DashboardModuleShell>
  );
}
