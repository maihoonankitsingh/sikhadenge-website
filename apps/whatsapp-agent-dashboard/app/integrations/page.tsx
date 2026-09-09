import { DashboardRole } from "@prisma/client";

import InstagramCommentCapabilityHealth from "../../components/integrations/InstagramCommentCapabilityHealth";
import IntegrationsManager from "../../components/integrations/IntegrationsManager";
import VerifiedConnectionHealth from "../../components/integrations/VerifiedConnectionHealth";
import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";
import "../dashboard-system.css";

export const dynamic = "force-dynamic";

export default async function IntegrationsPage() {
  const user = await requireDashboardUser([
    DashboardRole.ADMIN,
    DashboardRole.MANAGER,
  ]);

  return (
    <DashboardModuleShell
      activeTitle="Integrations"
      eyebrow="Connected systems"
      title="Integrations & Developer API"
      description="Register provider metadata, verify real read-only API connectivity and keep all external writes behind explicit production controls."
      userName={user.name}
      userRole={user.role}
    >
      <VerifiedConnectionHealth />
      <InstagramCommentCapabilityHealth />
      <IntegrationsManager />
    </DashboardModuleShell>
  );
}
