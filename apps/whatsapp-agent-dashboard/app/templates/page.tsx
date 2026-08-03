import { DashboardRole } from "@prisma/client";

import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import TemplateManager from "../../components/templates/TemplateManager";
import { requireDashboardUser } from "../../lib/auth/session";
import "../dashboard-system.css";
import "./template-studio.css";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const user = await requireDashboardUser([
    DashboardRole.ADMIN,
    DashboardRole.MANAGER,
  ]);

  return (
    <DashboardModuleShell
      activeTitle="Templates"
      eyebrow="Meta-approved outreach content"
      title="WhatsApp Template Studio"
      description="Build image-based WhatsApp templates, preview the final message, upload the approval sample, submit directly to Meta and track approval status from one page."
      userName={user.name}
      userRole={user.role}
    >
      <TemplateManager />
    </DashboardModuleShell>
  );
}
