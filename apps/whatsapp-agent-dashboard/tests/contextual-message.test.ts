import assert from "node:assert/strict";

import { normalizeContextualCustomerMessage } from "../lib/agent/contextual-message";
import type { AgentHistoryMessage } from "../lib/agent/types";

function message(
  role: AgentHistoryMessage["role"],
  text: string,
): AgentHistoryMessage {
  return {
    role,
    text,
    createdAt: "2026-07-31T09:00:00.000Z",
  };
}

const linkQuestion = message(
  "assistant",
  "Admission se pehle ek baar Free Demo Class dekhna best rahega—main link share kar doon?",
);

for (const customerMessage of [
  "yes link",
  "Haan link",
  "link bhej do",
  "send link",
]) {
  assert.equal(
    normalizeContextualCustomerMessage({
      customerMessage,
      history: [linkQuestion, message("customer", customerMessage)],
    }),
    "yes",
    `Expected contextual demo-link confirmation for: ${customerMessage}`,
  );
}

assert.equal(
  normalizeContextualCustomerMessage({
    customerMessage: "yes link",
    history: [message("assistant", "Aapka main goal kya hai?")],
  }),
  "yes link",
  "The phrase must not be rewritten outside a demo-link question context.",
);

console.log("Contextual demo link confirmation tests passed: 5 cases.");
