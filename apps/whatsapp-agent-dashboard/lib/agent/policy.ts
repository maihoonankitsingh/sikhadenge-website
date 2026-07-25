import type { AgentLanguage, AgentSafetyResult } from "./types";

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all|any|the)?\s*(previous|prior|system)\s+instructions?/i,
  /reveal\s+(the\s+)?(system|developer)\s+(prompt|message|instructions?)/i,
  /show\s+(me\s+)?(your\s+)?hidden\s+(prompt|instructions?|rules?)/i,
  /act\s+as\s+(an?\s+)?unrestricted/i,
  /jailbreak/i,
  /developer\s+mode/i,
  /system\s+prompt/i,
  /पिछले\s+निर्देश.*भूल/i,
  /सिस्टम\s+प्रॉम्प्ट/i,
];

const SENSITIVE_DATA_PATTERNS = [
  /\b\d{12}\b/g,
  /\b(?:\d[ -]*?){13,19}\b/g,
  /\b(?:otp|one[ -]?time password|cvv|upi pin|atm pin)\b/i,
  /\b(?:ओटीपी|सीवीवी|यूपीआई पिन|एटीएम पिन)\b/i,
];

const LEADING_EMOJI = /^\p{Extended_Pictographic}/u;

function numberFromEnv(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function polishGenericReply(reply: string): string {
  const lower = reply.toLocaleLowerCase("en-IN");

  if (
    lower.includes("ji, bataiye aap course, class timing") ||
    lower.includes("bilkul. aapka question kis baare mein hai") ||
    lower.includes("zaroor help karenge. thoda sa clear kar dijiye")
  ) {
    return "💬 Main SikhaDenge ka learning assistant hoon 😊 Aap AI course, class timing, demo/masterclass ya admission ke baare mein kya jaanna chahenge?";
  }

  if (
    lower.includes("certainly. is your question about a course") ||
    lower.includes("please tell me whether you need course details")
  ) {
    return "💬 I’m the SikhaDenge learning assistant 😊 What would you like to know about the AI course, class timing, demo/masterclass, or admission?";
  }

  return reply;
}

function replyIcon(reply: string): string {
  const lower = reply.toLocaleLowerCase("en-IN");

  if (/\b(hello|welcome|namaste|namaskar|happy to guide)\b/i.test(lower)) return "👋";
  if (/\b(payment|transaction|refund|complaint|account issue|safe review)\b/i.test(lower)) return "🛡️";
  if (/\b(call|counsellor|counselor|handover|forwarding|contact karega)\b/i.test(lower)) return "📞";
  if (/\b(demo|masterclass|webinar|workshop)\b/i.test(lower)) return "🎓";
  if (/\b(certificate|certification)\b/i.test(lower)) return "🏅";
  if (/\b(class|batch|timing|online|offline|schedule)\b/i.test(lower)) return "💻";
  if (/\b(course|program|learning|career|freelancing|business growth|ai skills)\b/i.test(lower)) return "🚀";
  if (/\b(opt-out|unsubscribe|promotional follow-up|message nahi)\b/i.test(lower)) return "✅";
  return "💬";
}

function professionalizeReply(reply: string): string {
  const polished = polishGenericReply(reply.trim());
  if (!polished || LEADING_EMOJI.test(polished)) return polished;
  return `${replyIcon(polished)} ${polished}`;
}

export function getAgentPolicy() {
  return {
    autoReplyConfidence: Math.min(
      0.99,
      Math.max(0.5, numberFromEnv("AGENT_AUTO_REPLY_CONFIDENCE", 0.78)),
    ),
    knowledgeMinimumScore: Math.min(
      1,
      Math.max(0, numberFromEnv("AGENT_KNOWLEDGE_MIN_SCORE", 0.18)),
    ),
    maximumReplyCharacters: Math.max(
      300,
      Math.min(4_000, numberFromEnv("AGENT_MAX_REPLY_CHARACTERS", 700)),
    ),
    maximumHistoryMessages: Math.max(
      4,
      Math.min(40, numberFromEnv("AGENT_MAX_HISTORY_MESSAGES", 16)),
    ),
    maximumKnowledgeChunks: Math.max(
      1,
      Math.min(8, numberFromEnv("AGENT_MAX_KNOWLEDGE_CHUNKS", 5)),
    ),
  } as const;
}

export function inspectAgentSafety(message: string): AgentSafetyResult {
  const promptInjectionDetected = PROMPT_INJECTION_PATTERNS.some((pattern) =>
    pattern.test(message),
  );
  const sensitiveDataDetected = SENSITIVE_DATA_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(message);
  });

  return {
    safe: !promptInjectionDetected,
    promptInjectionDetected,
    sensitiveDataDetected,
    blockedReason: promptInjectionDetected
      ? "The message attempts to override or expose protected agent instructions."
      : null,
  };
}

export function trimAgentReply(reply: string): string {
  const maximum = getAgentPolicy().maximumReplyCharacters;
  const compact = professionalizeReply(reply).replace(/\n{3,}/g, "\n\n");
  if (compact.length <= maximum) return compact;
  return `${compact.slice(0, Math.max(0, maximum - 1)).trimEnd()}…`;
}

export function safeHandoffReply(
  language: AgentLanguage,
  reason: "security" | "payment" | "complaint" | "knowledge" | "general",
): string {
  if (language === "en") {
    const replies = {
      security:
        "I can help with SikhaDenge course and admission questions, but I cannot follow requests that try to change or expose protected system instructions. I’m handing this to our team for a safe review.",
      payment:
        "I don’t want to guess on a payment or account issue. I’m forwarding this to a SikhaDenge counselor so the transaction can be checked safely.",
      complaint:
        "I understand this needs careful handling. I’m forwarding your complaint or refund request to the SikhaDenge team for a human review.",
      knowledge:
        "I don’t have enough approved information to answer this accurately. I’m forwarding it to a SikhaDenge counselor instead of guessing.",
      general:
        "I’m forwarding this conversation to a SikhaDenge counselor for the right assistance.",
    } as const;
    return replies[reason];
  }

  const replies = {
    security:
      "Main SikhaDenge ke course aur admission se jude sawalon mein help kar sakta hoon, lekin protected system instructions ko badalne ya dikhane wali request follow nahi karunga. Safe review ke liye isse team ko handover kar raha hoon.",
    payment:
      "Payment ya account issue par guess karna safe nahi hoga. Transaction verify karne ke liye main isse SikhaDenge counselor ko handover kar raha hoon.",
    complaint:
      "Samajh gaya, is matter ko carefully handle karna zaroori hai. Complaint ya refund request ko human review ke liye SikhaDenge team ko forward kar raha hoon.",
    knowledge:
      "Is sawal ka accurate jawab dene ke liye mere paas enough approved information nahi hai. Guess karne ke bajay main isse SikhaDenge counselor ko handover kar raha hoon.",
    general:
      "Sahi assistance ke liye main ye conversation SikhaDenge counselor ko handover kar raha hoon.",
  } as const;
  return replies[reason];
}
