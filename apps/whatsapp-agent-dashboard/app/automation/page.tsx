import { DashboardRole } from "@prisma/client";

import AutomationFlowBuilder from "../../components/automation/AutomationFlowBuilder";
import MasterclassAutomationPanel from "../../components/automation/MasterclassAutomationPanel";
import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";
import "../dashboard-system.css";
import "./masterclass-automation.css";

export const dynamic = "force-dynamic";

export default async function AutomationPage() {
  const user = await requireDashboardUser([
    DashboardRole.ADMIN,
    DashboardRole.MANAGER,
  ]);

  return (
    <DashboardModuleShell
      activeTitle="Automation"
      eyebrow="Visual workflow orchestration"
      title="Automation & Flow Builder"
      description="Build trigger-based student journeys, validate node configuration and simulate every step safely before external actions are enabled."
      userName={user.name}
      userRole={user.role}
    >
      <MasterclassAutomationPanel />
      <AutomationFlowBuilder />
    </DashboardModuleShell>
  );
}
