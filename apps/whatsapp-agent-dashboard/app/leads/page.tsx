import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const user = await requireDashboardUser();

  return (
    <DashboardModuleShell
      activeTitle="Leads"
      eyebrow="Admission pipeline"
      title="Leads"
      description="Course interest, joining timeline, lead stage and counselor follow-up are organized here."
      userName={user.name}
      userRole={user.role}
    >
      <div className="module-status-strip">
        <div className="module-status-item"><span>Scoring</span><strong>0–100</strong></div>
        <div className="module-status-item"><span>Priority</span><strong>Hot / Warm / Cold</strong></div>
        <div className="module-status-item"><span>Review</span><strong>Counselor queue</strong></div>
        <div className="module-status-item"><span>Follow-up</span><strong>SLA tracked</strong></div>
      </div>
      <div className="module-info-grid">
        <article className="module-info-card"><strong>Qualification</strong><p>Capture the learner goal, occupation, preferred course and joining timeline.</p></article>
        <article className="module-info-card"><strong>Counselor queue</strong><p>Important conversations can be reviewed and assigned to a counselor.</p></article>
        <article className="module-info-card"><strong>Pipeline visibility</strong><p>Track new, qualified, follow-up and closed stages in one place.</p></article>
      </div>
    </DashboardModuleShell>
  );
}
