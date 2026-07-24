import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const user = await requireDashboardUser();

  return (
    <DashboardModuleShell
      activeTitle="Contacts"
      eyebrow="Customer directory"
      title="Contacts"
      description="All WhatsApp contacts, profile details, conversation history and ownership will be managed from this module."
      userName={user.name}
      userRole={user.role}
    >
      <div className="module-status-strip">
        <div className="module-status-item"><span>Directory</span><strong>Connected</strong></div>
        <div className="module-status-item"><span>Profiles</span><strong>Database-backed</strong></div>
        <div className="module-status-item"><span>History</span><strong>Conversation-linked</strong></div>
        <div className="module-status-item"><span>Privacy</span><strong>Role protected</strong></div>
      </div>
      <div className="module-info-grid">
        <article className="module-info-card"><strong>Contact profile</strong><p>Name, phone number, city, source, tags and recent activity stay attached to one learner profile.</p></article>
        <article className="module-info-card"><strong>Conversation history</strong><p>Open the learner’s inbox thread without losing lead qualification or counselor context.</p></article>
        <article className="module-info-card"><strong>Ownership</strong><p>Assign contacts to counselors and keep responsibility visible for follow-up operations.</p></article>
      </div>
    </DashboardModuleShell>
  );
}
