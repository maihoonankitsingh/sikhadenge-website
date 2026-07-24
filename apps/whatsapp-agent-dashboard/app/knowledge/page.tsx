import DashboardModuleShell from "../../components/navigation/DashboardModuleShell";
import { requireDashboardUser } from "../../lib/auth/session";

export const dynamic = "force-dynamic";

export default async function KnowledgePage() {
  const user = await requireDashboardUser();

  return (
    <DashboardModuleShell
      activeTitle="Knowledge"
      eyebrow="Approved answer source"
      title="Knowledge Base"
      description="This is the controlled information library the AI searches before answering a learner. Only reviewed and approved content should become reusable knowledge."
      userName={user.name}
      userRole={user.role}
    >
      <div className="module-status-strip">
        <div className="module-status-item"><span>Content rule</span><strong>Approved only</strong></div>
        <div className="module-status-item"><span>Retrieval</span><strong>Hybrid search</strong></div>
        <div className="module-status-item"><span>Updates</span><strong>Versioned</strong></div>
        <div className="module-status-item"><span>Raw chats</span><strong>Not auto-trained</strong></div>
      </div>

      <div className="module-info-grid">
        <article className="module-info-card">
          <strong>What goes inside</strong>
          <ul>
            <li>Course names, syllabus, duration and class schedule</li>
            <li>Fees, offers, payment process and eligibility</li>
            <li>Admission steps, certificates, policies and FAQs</li>
          </ul>
        </article>
        <article className="module-info-card">
          <strong>How the AI uses it</strong>
          <p>The agent retrieves the most relevant approved passages, checks confidence and uses those references to prepare a safe answer.</p>
        </article>
        <article className="module-info-card">
          <strong>What does not happen</strong>
          <p>Customer chats are not silently added to training. Counselor corrections first enter a review queue and require approval.</p>
        </article>
      </div>

      <div className="module-note">
        Example: when a learner asks “Become AI Expert course ki fees aur timing kya hai?”, the agent should answer from the approved fee and schedule documents stored here—not from guesswork.
      </div>
    </DashboardModuleShell>
  );
}
