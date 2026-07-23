import InboxDashboard from "../../components/inbox/InboxDashboard";
import LogoutButton from "../../components/auth/LogoutButton";
import { requireDashboardUser } from "../../lib/auth/session";
import {
  getInboxConversation,
  listInboxConversations,
} from "../../lib/inbox/conversation-repository";

export const dynamic = "force-dynamic";

export default async function InboxPage() {
  const user = await requireDashboardUser();
  const conversations = await listInboxConversations();
  const initialConversation = conversations[0]
    ? await getInboxConversation(conversations[0].id)
    : null;

  return (
    <>
      <div className="session-toolbar" aria-label="Signed-in account">
        <span>
          <strong>{user.name}</strong>
          <small>{user.role.toLowerCase()}</small>
        </span>
        <LogoutButton />
      </div>
      <InboxDashboard
        initialConversations={conversations}
        initialConversation={initialConversation}
      />
    </>
  );
}
