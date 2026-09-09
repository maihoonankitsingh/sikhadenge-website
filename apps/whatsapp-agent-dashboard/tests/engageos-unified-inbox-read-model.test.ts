import assert from "node:assert/strict";

import { assertUnifiedInboxFilter } from "../modules/inbox/application/read-model";
import {
  legacyWhatsAppConnectionId,
  mapLegacyWhatsAppSummary,
} from "../modules/inbox/infrastructure/legacy-whatsapp-read-model";

function main() {
  const mapped = mapLegacyWhatsAppSummary({
    id: "conv-1",
    status: "WAITING",
    agentMode: "REVIEW_REQUIRED",
    unreadCount: 2,
    source: "masterclass",
    lastMessageAt: new Date("2026-09-09T15:00:00Z"),
    contact: {
      id: "contact-1",
      displayName: "Learner",
      profileName: null,
      phone: "919999999999",
      email: "learner@example.com",
      city: "Varanasi",
    },
    assignedTo: { id: "user-1", name: "Counselor" },
    lead: {
      stage: "QUALIFIED",
      temperature: "HOT",
      score: 90,
      interestedCourse: "AI Expert",
      nextFollowUpAt: new Date("2026-09-10T05:00:00Z"),
    },
    messages: [{
      text: "Hello",
      type: "TEXT",
      direction: "INBOUND",
      messageTimestamp: new Date("2026-09-09T15:00:00Z"),
    }],
  }, "12345");

  assert.equal(mapped.channel, "WHATSAPP");
  assert.equal(mapped.connectionId, "whatsapp:12345");
  assert.equal(mapped.status, "PENDING");
  assert.equal(mapped.agentMode, "REVIEW_REQUIRED");
  assert.equal(mapped.contact.displayName, "Learner");
  assert.equal(mapped.lastMessage?.direction, "INBOUND");
  assert.equal(mapped.lead?.stage, "QUALIFIED");
  assert.equal(legacyWhatsAppConnectionId(), "whatsapp:legacy");
  assert.doesNotThrow(() => assertUnifiedInboxFilter({ limit: 100 }));
  assert.throws(() => assertUnifiedInboxFilter({ limit: 0 }), /between 1 and 100/);
  assert.throws(() => assertUnifiedInboxFilter({ limit: 101 }), /between 1 and 100/);

  console.log("EngageOS Unified Inbox read-model tests passed.");
}

main();
