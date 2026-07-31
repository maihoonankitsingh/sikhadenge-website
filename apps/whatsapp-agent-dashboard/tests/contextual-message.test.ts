import assert from "node:assert/strict";

import {
  contextualizeAgentConversation,
  normalizeContextualCustomerMessage,
} from "../lib/agent/contextual-message";
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

const repeatedCustomerMessage = message("customer", "link bhej do");
const recovered = contextualizeAgentConversation({
  customerMessage: repeatedCustomerMessage.text,
  history: [
    linkQuestion,
    message("customer", "yes link"),
    message(
      "assistant",
      "Bilkul ji. Main program aur admission ke baare mein guide karunga. Aapka current background kya hai?",
    ),
    message("customer", "yes link"),
    message(
      "assistant",
      "Bilkul ji. Main course details mein guide karunga. Aapka main goal kya hai?",
    ),
    repeatedCustomerMessage,
  ],
});

assert.equal(
  recovered.customerMessage,
  "yes",
  "A pending demo-link confirmation must be recovered after intervening fallback replies.",
);
assert.equal(
  recovered.history.filter((item) => item.role === "assistant").at(-1)?.text,
  linkQuestion.text,
  "The pending demo-link question must become the active assistant context.",
);
assert.equal(
  recovered.history.at(-1),
  repeatedCustomerMessage,
  "The current customer message must remain the final chronological history item.",
);

console.log("Contextual demo link confirmation tests passed: 8 cases.");
