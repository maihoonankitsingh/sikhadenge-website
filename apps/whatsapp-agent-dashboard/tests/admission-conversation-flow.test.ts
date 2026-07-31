import assert from "node:assert/strict";

import { generateAdmissionConversationReply } from "../lib/agent/admission-conversation-flow";
import type {
  AgentHistoryMessage,
  AgentInput,
  RuleClassification,
} from "../lib/agent/types";

const classification: RuleClassification = {
  language: "hinglish",
  intent: "COURSE_DISCOVERY",
  confidence: 0.95,
  requiresHuman: false,
  handoffReason: null,
};

function history(
  role: AgentHistoryMessage["role"],
  text: string,
): AgentHistoryMessage {
  return {
    role,
    text,
    createdAt: new Date("2026-07-31T06:00:00.000Z").toISOString(),
  };
}

function replyFor(input: Partial<AgentInput> & { customerMessage: string }) {
  return generateAdmissionConversationReply({
    agentInput: {
      customerMessage: input.customerMessage,
      languageHint: input.languageHint ?? "hinglish",
      conversationSummary: input.conversationSummary ?? null,
      history: input.history ?? [],
      contact: input.contact ?? { name: "Rahul Kumar" },
      lead: input.lead ?? { stage: "NEW" },
    },
    classification,
  });
}

function requireReply(
  input: Partial<AgentInput> & { customerMessage: string },
) {
  const result = replyFor(input);
  assert.ok(result, `Expected a flow reply for: ${input.customerMessage}`);
  return result;
}

function assertOneQuestion(text: string) {
  assert.equal(
    (text.match(/\?/g) ?? []).length,
    1,
    `Expected exactly one question, received: ${text}`,
  );
}

{
  const result = requireReply({ customerMessage: "Hi" });
  assert.match(result.reply, /^Hi Rahul ji 😊/u);
  assert.match(result.reply, /Facebook\/Instagram/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({
    customerMessage: "Instagram par dekha tha",
    history: [
      history(
        "assistant",
        "Waise aapne hamara ad Facebook/Instagram par dekha tha ya kisi student ne recommend kiya tha?",
      ),
    ],
  });
  assert.match(result.reply, /AI tool ya software/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({
    customerMessage: "Main bilkul beginner hoon",
    history: [
      history(
        "assistant",
        "Kya aap pehle kabhi kisi AI tool ya software par kaam kar chuke hain, ya bilkul beginner hain?",
      ),
    ],
  });
  assert.equal(result.leadUpdates.experienceLevel, "BEGINNER");
  assert.match(result.reply, /main goal kya hai/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({
    customerMessage: "Mera goal freelancing hai",
    history: [
      history(
        "assistant",
        "Waise aapka main goal kya hai—online earning, freelancing, job ya apne business ke liye AI seekhna?",
      ),
    ],
  });
  assert.equal(result.leadUpdates.goal, "FREELANCING");
  assert.match(result.reply, /kab tak join/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({
    customerMessage: "Pehle sirf details dekhna chahta hoon",
    history: [
      history(
        "assistant",
        "Agar course aapki expectation ke according hua, to aap ise kab tak join karna chahenge, ya pehle sirf details dekhna chahenge?",
      ),
    ],
  });
  assert.equal(result.leadUpdates.joiningTimeline, "DETAILS_ONLY");
  assert.match(result.reply, /requirement clear ho gayi/iu);
  assert.doesNotMatch(result.reply, /\?/u);
}

{
  const result = requireReply({ customerMessage: "Course ki fees kitni hai?" });
  assert.equal(result.intent, "FEES");
  assert.match(result.reply, /Demo Class dekh li hai/iu);
  assert.doesNotMatch(result.reply, /₹\s*\d|\b\d{3,}\b/u);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({ customerMessage: "Bas fee bata do" });
  assert.equal(result.leadUpdates.counselorRequested, true);
  assert.match(result.reply, /Admission Team call/iu);
  assert.match(result.reply, /kaunsa time convenient/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({ customerMessage: "Demo class dekhna hai" });
  assert.equal(result.intent, "DEMO_CLASS");
  assert.match(result.reply, /link share kar doon/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({
    customerMessage: "Haan",
    history: [
      history("assistant", "Kya main Demo Class ka link share kar doon?"),
    ],
  });
  assert.match(result.reply, /https:\/\/www\.sikhadenge\.in/u);
  assert.match(result.reply, /Done/iu);
  assert.doesNotMatch(result.reply, /\?/u);
}

{
  const result = requireReply({
    customerMessage: "Done",
    history: [
      history(
        "assistant",
        "Aap https://www.sikhadenge.in par Demo Class dekh sakte hain. Demo complete hone ke baad Done reply kar dijiye.",
      ),
    ],
  });
  assert.match(result.reply, /Welcome back/iu);
  assert.match(result.reply, /Demo Class aapko kaisi lagi/iu);
  assertOneQuestion(result.reply);
}

{
  const result = requireReply({ customerMessage: "100% job guarantee hai?" });
  assert.match(result.reply, /final selection/iu);
  assert.doesNotMatch(result.reply, /100% job guarantee milegi/iu);
  assert.equal(result.leadUpdates.goal, "JOB");
}

{
  const result = requireReply({ customerMessage: "Mujhe sirf job chahiye" });
  assert.equal(result.leadUpdates.goal, "JOB");
  assert.match(result.reply, /kis field mein job/iu);
  assertOneQuestion(result.reply);
}

console.log("Admission conversation flow tests passed: 12 cases.");
