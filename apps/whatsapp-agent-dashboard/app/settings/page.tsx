import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireDashboardUser();

  return (
    <DashboardModuleShell
      activeTitle="Settings"
      eyebrow="System controls"
      title="Settings"
      description="Agent mode, safety controls, integrations, user access and deployment configuration are managed here."
      userName={user.name}
      userRole={user.role}
    >
      <div className="module-status-strip">
        <div className="module-status-item"><span>Agent</span><strong>Guarded</strong></div>
        <div className="module-status-item"><span>Outbound</span><strong>Disabled</strong></div>
        <div className="module-status-item"><span>Meta</span><strong>Pending cutover</strong></div>
        <div className="module-status-item"><span>Access</span><strong>Role protected</strong></div>
      </div>
      <div className="module-info-grid">
        <article className="module-info-card"><strong>Agent controls</strong><p>Manage AI, human, review-required and paused conversation modes with audit visibility.</p></article>
        <article className="module-info-card"><strong>Safety controls</strong><p>Keep outbound delivery, model execution and emergency kill switches under explicit control.</p></article>
        <article className="module-info-card"><strong>Integrations</strong><p>Meta Cloud API activation remains separate from the current dashboard and requires final cutover approval.</p></article>
      </div>
    </DashboardModuleShell>
  );
}
