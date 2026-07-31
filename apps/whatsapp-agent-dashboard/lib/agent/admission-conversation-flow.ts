import type {
  AgentInput,
  AgentIntent,
  AgentLeadUpdates,
  AgentLanguage,
  HandoffReason,
  RuleClassification,
} from "./types";

export type AdmissionFlowReply = {
  reply: string;
  confidence: number;
  decisionSummary: string;
  requiresHuman: boolean;
  handoffReason: HandoffReason | null;
  nextQuestion: string | null;
  leadUpdates: AgentLeadUpdates;
  intent?: AgentIntent;
};

const PROGRAM_NAME = "AI Expert Program";
const DEMO_URL = "https://www.sikhadenge.in";

const FEE_QUERY =
  /(?:\bfee(?:s)?\b|\bprice\b|\bcost\b|\bcharge\b|\bpayment\s+kitna\b|\bkitna\s+(?:charge|paisa|amount)\b|₹|\brupees?\b)/iu;
const FEE_INSISTENCE =
  /(?:fee\s+(?:pehle|hi|bata)|sirf\s+(?:fee|price)|bas\s+(?:fee|price)|price\s+hi|itna\s+kyu\s+chhupa|direct\s+(?:fee|price))/iu;
const DEMO_QUERY = /(?:\bdemo\b|masterclass|free\s+class)/iu;
const DEMO_DONE = /^\s*(?:done|complete|completed|dekh\s+li|dekh\s+liya|ho\s+gaya)\s*[.!😊💙🌸]*\s*$/iu;
const DEMO_NOT_NOW =
  /(?:abhi\s+(?:time\s+)?nahi|baad\s+me|later|busy|free\s+nahi|kal\s+dekh)/iu;
const DEMO_WHAT = /(?:demo\s+me\s+kya|demo\s+mein\s+kya|what\s+is\s+in\s+(?:the\s+)?demo)/iu;
const YES_REPLY = /^\s*(?:haan|ha|yes|ji|bilkul|sure|ok|okay)\s*[.!😊]*\s*$/iu;
const NO_REPLY = /^\s*(?:nahi|no|nahin|nhi)\s*[.!😊]*\s*$/iu;
const JOB_GUARANTEE = /(?:100\s*%\s*job|job\s+guarantee|guaranteed\s+job)/iu;
const JOB_ONLY = /(?:mujhe\s+sirf\s+job|only\s+job|bas\s+job)/iu;
const JOB_QUERY = /(?:job\s+milegi|placement|job\s+opportunit|job\s+support)/iu;

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function assistantMessages(input: AgentInput): string[] {
  return (input.history ?? [])
    .filter((item) => item.role === "assistant")
    .map((item) => item.text);
}

function customerMessages(input: AgentInput): string[] {
  return (input.history ?? [])
    .filter((item) => item.role === "customer")
    .map((item) => item.text);
}

function lastAssistantMessage(input: AgentInput): string {
  return assistantMessages(input).at(-1) ?? "";
}

function firstName(input: AgentInput): string | null {
  const name = normalize(input.contact?.name ?? "");
  if (!name) return null;
  return name.split(" ")[0]?.slice(0, 40) || null;
}

function femaleAcknowledgement(message: string): string {
  if (/beginner|bilkul\s+nahi|never|pehli\s+baar/iu.test(message)) {
    return "Bilkul, koi problem nahi 😊";
  }
  if (/freelanc|business|job|earning|career/iu.test(message)) {
    return "Perfect, samajh gayi. 😊";
  }
  return "Achha, samajh gayi. 😊";
}

function inferExperience(message: string): string | undefined {
  if (/beginner|bilkul\s+nahi|never|pehli\s+baar|nahi\s+kiya/iu.test(message)) {
    return "BEGINNER";
  }
  if (/chatgpt|gemini|claude|ai\s+tool|software|thoda|basic|kabhi\s+kabhi/iu.test(message)) {
    return "SOME_EXPERIENCE";
  }
  if (/advanced|expert|regularly|professional|automation|client\s+work/iu.test(message)) {
    return "EXPERIENCED";
  }
  return undefined;
}

function inferGoal(message: string): string | undefined {
  if (/freelanc/iu.test(message)) return "FREELANCING";
  if (/business/iu.test(message)) return "BUSINESS";
  if (/job|placement|career/iu.test(message)) return "JOB";
  if (/online\s+earning|earn|income/iu.test(message)) return "ONLINE_EARNING";
  return undefined;
}

function inferJoiningTimeline(message: string): string | undefined {
  if (/sirf\s+details|details\s+(?:dekh|chahiye)|pehle\s+details/iu.test(message)) {
    return "DETAILS_ONLY";
  }
  if (/aaj|abhi|immediate|jaldi|asap|turant/iu.test(message)) return "IMMEDIATELY";
  if (/is\s+month|this\s+month|mahine\s+me|month\s+ke\s+andar/iu.test(message)) {
    return "THIS_MONTH";
  }
  if (/next\s+month|agle\s+mahine/iu.test(message)) return "NEXT_MONTH";
  if (/baad\s+me|later|future|sochkar/iu.test(message)) return "LATER";
  return undefined;
}

function feeRequestCount(input: AgentInput): number {
  return [...customerMessages(input), input.customerMessage].filter((text) =>
    FEE_QUERY.test(text),
  ).length;
}

function hasAskedDemoWatched(input: AgentInput): boolean {
  return assistantMessages(input).some((text) =>
    /(?:demo\s+class\s+dekh\s+li|free\s+demo\s+class\s+dekh)/iu.test(text),
  );
}

function hasSharedDemo(input: AgentInput): boolean {
  return assistantMessages(input).some((text) =>
    text.includes(DEMO_URL) || /demo\s+complete\s+hone\s+ke\s+baad/iu.test(text),
  );
}

function flowReply(input: {
  reply: string;
  summary: string;
  nextQuestion?: string | null;
  leadUpdates?: AgentLeadUpdates;
  confidence?: number;
  intent?: AgentIntent;
  requiresHuman?: boolean;
  handoffReason?: HandoffReason | null;
}): AdmissionFlowReply {
  return {
    reply: input.reply,
    confidence: input.confidence ?? 0.99,
    decisionSummary: input.summary,
    requiresHuman: input.requiresHuman ?? false,
    handoffReason: input.handoffReason ?? null,
    nextQuestion: input.nextQuestion ?? null,
    leadUpdates: input.leadUpdates ?? {},
    intent: input.intent,
  };
}

function demoFlow(input: AgentInput): AdmissionFlowReply | null {
  const message = normalize(input.customerMessage);
  const lastAssistant = lastAssistantMessage(input);

  if (DEMO_DONE.test(message)) {
    return flowReply({
      reply:
        "Welcome back! 😊\n\nMujhe umeed hai Demo Class dekhkar aapko program ka idea mil gaya hoga.\n\nWaise Demo Class aapko kaisi lagi?",
      summary: "Demo completion acknowledged and one feedback question asked.",
      nextQuestion: "Waise Demo Class aapko kaisi lagi?",
      intent: "DEMO_CLASS",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (DEMO_WHAT.test(message)) {
    return flowReply({
      reply:
        "Bilkul 😊\n\nDemo Class mein aap dekh payenge ki classes kaise conduct hoti hain, concepts kaise explain kiye jaate hain aur AI Expert Program ka teaching style kaisa hai.\n\nIsse aap bina confusion decide kar sakte hain ki program aapke liye suitable hai ya nahi.",
      summary: "Explained demo contents without adding multiple questions.",
      intent: "DEMO_CLASS",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (DEMO_NOT_NOW.test(message) && /demo/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        "Koi baat nahi 😊\n\nJab bhi aapko 20–30 minutes ka free time mile, ek baar Demo Class zarur dekh lijiye. Isse aapko course ke baare mein kaafi clarity mil jayegi.\n\nJab dekh lein, bas “Done” reply kar dijiye. Main yahin available hoon. 💙",
      summary: "Customer will watch the demo later.",
      intent: "DEMO_CLASS",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (YES_REPLY.test(message) && /(?:link\s+share|demo\s+class)/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        `Great! 😊\n\nAap hamari website ${DEMO_URL} par visit karke Free Demo Class dekh sakte hain.\n\nDemo complete hone ke baad bas “Done” reply kar dijiye. Phir main aapka feedback loongi aur doubts clear kar dungi. 🌸`,
      summary: "Shared the verified demo website and requested DONE after completion.",
      intent: "DEMO_CLASS",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (DEMO_QUERY.test(message) && !hasSharedDemo(input)) {
    return flowReply({
      reply:
        "Perfect! 😊\n\nAdmission se pehle main sabhi students ko ek baar hamari Free Demo Class dekhne ki recommendation deti hoon. Isse teaching style, course quality aur program mein kya sikhaya jayega, sab clear ho jayega.\n\nKya main Demo Class ka link share kar doon?",
      summary: "Recommended the demo and asked one link-sharing question.",
      nextQuestion: "Kya main Demo Class ka link share kar doon?",
      intent: "DEMO_CLASS",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  return null;
}

function feeFlow(input: AgentInput): AdmissionFlowReply | null {
  const message = normalize(input.customerMessage);
  if (!FEE_QUERY.test(message)) return null;

  const count = feeRequestCount(input);
  if (count >= 3 || FEE_INSISTENCE.test(message)) {
    return flowReply({
      reply:
        "Samajh sakti hoon. 😊\n\nMain galat ya outdated information share nahi karna chahti. Fee aur current offer clear karne ke liye ek short Admission Team call best rahegi.\n\nAaj call ke liye kaunsa time convenient rahega?",
      summary: "Repeated fee request moved transparently to an admission call.",
      nextQuestion: "Aaj call ke liye kaunsa time convenient rahega?",
      intent: "FEES",
      leadUpdates: {
        interestedCourse: PROGRAM_NAME,
        counselorRequested: true,
      },
    });
  }

  if (hasAskedDemoWatched(input) && NO_REPLY.test(message)) {
    return flowReply({
      reply:
        "Koi baat nahi 😊\n\nMain recommend karungi ki pehle ek baar Demo Class dekh lijiye. Isse course quality aur teaching style ka clear idea mil jayega.\n\nUske baad Admission Team fee, current offer aur payment options ki complete information clear kar degi.",
      summary: "Recommended demo before admission-team fee discussion.",
      intent: "FEES",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  return flowReply({
    reply:
      "Bilkul bata dungi. 😊\n\nLekin usse pehle ek chhoti si baat confirm karni thi.\n\nKya aapne hamari Free Demo Class dekh li hai?",
    summary: "Fee amount was not invented; one demo-status question was asked.",
    nextQuestion: "Kya aapne hamari Free Demo Class dekh li hai?",
    intent: "FEES",
    leadUpdates: { interestedCourse: PROGRAM_NAME },
  });
}

function jobFlow(input: AgentInput): AdmissionFlowReply | null {
  const message = normalize(input.customerMessage);

  if (JOB_GUARANTEE.test(message)) {
    return flowReply({
      reply:
        "Samajh gayi. 😊\n\nHumara focus aapko industry-ready banana hai. Companies ki requirement aane par eligible students ko recommend kiya jaata hai, lekin final selection company ke interview aur aapki skills par depend karta hai.",
      summary: "Clarified placement assistance without a job-guarantee claim.",
      intent: "COURSE_DETAILS",
      leadUpdates: { goal: "JOB", interestedCourse: PROGRAM_NAME },
    });
  }

  if (JOB_ONLY.test(message)) {
    return flowReply({
      reply:
        "Bilkul 😊\n\nAgar aapka main goal job hai, to AI Expert Program ko usi perspective se samajhna useful rahega.\n\nWaise aap kis field mein job dekh rahe hain?",
      summary: "Captured job goal and asked one job-field question.",
      nextQuestion: "Waise aap kis field mein job dekh rahe hain?",
      intent: "COURSE_DISCOVERY",
      leadUpdates: { goal: "JOB", interestedCourse: PROGRAM_NAME },
    });
  }

  if (JOB_QUERY.test(message)) {
    return flowReply({
      reply:
        "Bilkul 😊\n\nCourse complete karne ke baad hum eligible students ko job opportunities ke liye recommend bhi karte hain. Companies aur agencies ki hiring requirement aane par suitable students ko refer kiya ja sakta hai. 💼",
      summary: "Shared accurate placement-assistance wording.",
      intent: "COURSE_DETAILS",
      leadUpdates: { goal: "JOB", interestedCourse: PROGRAM_NAME },
    });
  }

  return null;
}

function qualificationFlow(input: AgentInput): AdmissionFlowReply | null {
  const message = normalize(input.customerMessage);
  const assistantHistory = assistantMessages(input);
  const lastAssistant = lastAssistantMessage(input);
  const name = firstName(input);

  if (assistantHistory.length === 0 && (input.lead?.stage ?? "NEW") === "NEW") {
    const greeting = name ? `Hi ${name} ji 😊` : "Hi 😊";
    return flowReply({
      reply:
        `${greeting}\n\nThank you! Aapka form mujhe receive ho gaya hai. Bas 1–2 cheezein confirm karni thi, uske baad main aapko AI Expert Program ki complete details share kar dungi.\n\nWaise aapne hamara ad Facebook/Instagram par dekha tha ya kisi student ne recommend kiya tha?`,
      summary: "Started the approved form-received qualification flow.",
      nextQuestion:
        "Waise aapne hamara ad Facebook/Instagram par dekha tha ya kisi student ne recommend kiya tha?",
      intent: "COURSE_DISCOVERY",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (/Facebook\/Instagram|student\s+ne\s+recommend/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        `${femaleAcknowledgement(message)}\n\nKya aap pehle kabhi kisi AI tool ya software par kaam kar chuke hain, ya bilkul beginner hain?`,
      summary: "Acknowledged lead source and asked one experience question.",
      nextQuestion:
        "Kya aap pehle kabhi kisi AI tool ya software par kaam kar chuke hain, ya bilkul beginner hain?",
      intent: "ELIGIBILITY",
      leadUpdates: { interestedCourse: PROGRAM_NAME },
    });
  }

  if (/AI\s+tool|bilkul\s+beginner/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        `${femaleAcknowledgement(message)}\n\nWaise aapka main goal kya hai—online earning, freelancing, job ya apne business ke liye AI seekhna?`,
      summary: "Captured experience and asked one goal question.",
      nextQuestion:
        "Waise aapka main goal kya hai—online earning, freelancing, job ya apne business ke liye AI seekhna?",
      intent: "COURSE_DISCOVERY",
      leadUpdates: {
        interestedCourse: PROGRAM_NAME,
        ...(inferExperience(message)
          ? { experienceLevel: inferExperience(message) }
          : {}),
      },
    });
  }

  if (/main\s+goal\s+kya|online\s+earning.*freelancing.*job/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        `That's great! 😊\n\nEk last question…\n\nAgar course aapki expectation ke according hua, to aap ise kab tak join karna chahenge, ya pehle sirf details dekhna chahenge?`,
      summary: "Captured goal and asked one joining-timeline question.",
      nextQuestion:
        "Agar course aapki expectation ke according hua, to aap ise kab tak join karna chahenge, ya pehle sirf details dekhna chahenge?",
      intent: "ENROLLMENT",
      leadUpdates: {
        interestedCourse: PROGRAM_NAME,
        ...(inferGoal(message) ? { goal: inferGoal(message) } : {}),
      },
    });
  }

  if (/kab\s+tak\s+join|sirf\s+details\s+dekh/iu.test(lastAssistant)) {
    return flowReply({
      reply:
        "Thank you 😊\n\nMujhe aapki requirement clear ho gayi hai.\n\nMain ab aapko AI Expert Program ki complete details share karti hoon. Koi bhi doubt ho, to aap bina hesitation pooch sakte hain. 💙",
      summary: "Completed qualification and prepared to share program details.",
      intent: "COURSE_DETAILS",
      leadUpdates: {
        interestedCourse: PROGRAM_NAME,
        ...(inferJoiningTimeline(message)
          ? { joiningTimeline: inferJoiningTimeline(message) }
          : {}),
      },
    });
  }

  return null;
}

export function generateAdmissionConversationReply(input: {
  agentInput: AgentInput;
  classification: RuleClassification;
}): AdmissionFlowReply | null {
  const { agentInput } = input;

  return (
    feeFlow(agentInput) ??
    demoFlow(agentInput) ??
    jobFlow(agentInput) ??
    qualificationFlow(agentInput)
  );
}

export function approvedProgramName(): string {
  return PROGRAM_NAME;
}
