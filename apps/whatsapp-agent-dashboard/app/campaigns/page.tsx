import { DashboardRole } from "@prisma/client";

import TargetingManager from "../../components/campaigns/TargetingManager";
import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const user = await requireDashboardUser([
    DashboardRole.ADMIN,
    DashboardRole.MANAGER,
  ]);

  return (
    <DashboardModuleShell
      activeTitle="Campaigns"
      eyebrow="Targeted student outreach"
      title="Campaigns & Targeting"
      description="Build consent-safe student segments, preview exact recipients and queue approved WhatsApp templates from the same SikhaDenge dashboard."
      userName={user.name}
      userRole={user.role}
    >
      <TargetingManager />
    </DashboardModuleShell>
  );
}
