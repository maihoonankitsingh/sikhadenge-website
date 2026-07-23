import DashboardShell from "../../components/DashboardShell";
import LogoutButton from "../../components/auth/LogoutButton";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const user = await requireDashboardUser();

  return (
    <>
      <div className="session-toolbar" aria-label="Signed-in account">
        <span>
          <strong>{user.name}</strong>
          <small>{user.role.toLowerCase()}</small>
        </span>
        <LogoutButton />
      </div>
      <DashboardShell />
    </>
  );
}
