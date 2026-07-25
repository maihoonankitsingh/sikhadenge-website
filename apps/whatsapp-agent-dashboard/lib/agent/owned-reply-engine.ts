import type {
  AgentInput,
  AgentIntent,
  AgentKnowledgeReference,
  AgentLanguage,
  AgentLeadUpdates,
  HandoffReason,
  RuleClassification,
} from "./types";

export type OwnedReplyResult = {
  reply: string;
  confidence: number;
  decisionSummary: string;
  requiresHuman: boolean;
  handoffReason: HandoffReason | null;
  nextQuestion: string | null;
  leadUpdates: AgentLeadUpdates;
};

const COMMERCIAL_SENTENCE =
  /(?:₹|\b(?:fee|fees|price|pricing|cost|discount|offer|emi|installment|inr|rs\.?|rupees?)\b)/i;

const CALL_CONFIRMATION =
  /\b(?:yes\s*call|haan\s*call|ha\s*call|call\s*(?:karo|karwao|chahiye)|mujhe\s*call|phone\s*(?:karo|karna)|connect\s*me|counsell?or\s*se\s*baat)\b/i;

const STRONG_INTEREST = [
  /\b(?:join|joining|admission|enrol|enroll|register|registration)\b/i,
  /\b(?:join\s*karna|admission\s*lena|register\s*karna|start\s*karna)\b/i,
  /\b(?:serious|bahut\s*interested|ready\s*to\s*join|start\s*now|aaj\s*se)\b/i,
];

const MEDIUM_INTEREST = [
  /\b(?:demo|masterclass|trial|orientation|link\s*bhejo|registration\s*link)\b/i,
  /\b(?:course\s*details|syllabus|batch|timing|certificate|eligibility)\b/i,
  /\b(?:interested|seekhna|sikhna|career|job|freelancing|business\s*growth)\b/i,
];

function validHttpUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? parsed.toString()
      : null;
  } catch {
    return null;
  }
}

function masterclassUrl(): string | null {
  return validHttpUrl(process.env.SIKHADENGE_MASTERCLASS_URL);
}

function sentenceParts(value: string): string[] {
  return value
    .replace(/\r/g, "\n")
    .split(/(?<=[.!?।])\s+|\n+/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function approvedKnowledgeExcerpt(
  references: AgentKnowledgeReference[],
): string | null {
  for (const reference of references) {
    const safeParts = sentenceParts(reference.content).filter(
      (part) => !COMMERCIAL_SENTENCE.test(part),
    );
    if (safeParts.length === 0) continue;

    const combined = safeParts.join(" ").replace(/\s+/g, " ").trim();
    if (!combined) continue;
    return combined.length > 620
      ? `${combined.slice(0, 617).trimEnd()}...`
      : combined;
  }
  return null;
}

function demoReply(language: AgentLanguage): string {
  const url = masterclassUrl();
  if (language === "en") {
    return url
      ? `For complete details, please register for the free demo/masterclass here: ${url}\nAfter registering, reply DONE.`
      : "The free demo/masterclass registration link is being configured. Please reply DEMO and the team will share the verified link.";
  }

  return url
    ? `Complete details ke liye free demo/masterclass register kijiye: ${url}\nRegistration complete hone ke baad DONE reply kariye.`
    : "Free demo/masterclass ka verified registration link abhi configure ho raha hai. DEMO reply kariye, team link share karegi.";
}

function callOffer(language: AgentLanguage): string {
  return language === "en"
    ? "You seem genuinely interested. Would you like a SikhaDenge counsellor to call you and explain the next step? Reply YES CALL."
    : "Aap kaafi interested lag rahe hain. Kya SikhaDenge counsellor aapko call karke next step samjha de? YES CALL reply kariye.";
}

function interestScore(
  input: AgentInput,
  classification: RuleClassification,
): number {
  const current = input.customerMessage;
  const historyText = (input.history ?? [])
    .filter((item) => item.role === "customer")
    .slice(-8)
    .map((item) => item.text)
    .join(" ");
  const combined = `${historyText} ${current}`;

  let score = 0;
  for (const pattern of STRONG_INTEREST) {
    if (pattern.test(combined)) score += 3;
  }
  for (const pattern of MEDIUM_INTEREST) {
    if (pattern.test(combined)) score += 1;
  }

  if (classification.intent === "ENROLLMENT") score += 3;
  if (classification.intent === "DEMO_CLASS") score += 2;
  if (classification.intent === "COURSE_DETAILS") score += 1;

  const leadScore = input.lead?.score ?? 0;
  if (leadScore >= 70) score += 3;
  else if (leadScore >= 40) score += 1;

  const temperature = input.lead?.temperature?.toUpperCase();
  if (temperature === "HOT") score += 3;
  else if (temperature === "WARM") score += 1;

  if ((input.history ?? []).filter((item) => item.role === "customer").length >= 4) {
    score += 1;
  }

  return score;
}

function inferLeadUpdates(input: AgentInput): AgentLeadUpdates {
  const message = input.customerMessage.toLowerCase();
  const updates: AgentLeadUpdates = {};

  if (/business\s*growth|growth\s*architect/.test(message)) {
    updates.interestedCourse = "AI Business Growth Architect Program";
  } else if (/become\s*ai\s*expert|ai\s*expert/.test(message)) {
    updates.interestedCourse = "Become AI Expert";
  }

  if (/\b(?:today|aaj|abhi|immediately|jaldi|start now)\b/i.test(message)) {
    updates.joiningTimeline = "immediate";
  } else if (/\b(?:this week|is hafte|within a week)\b/i.test(message)) {
    updates.joiningTimeline = "within one week";
  }

  if (/\b(?:evening|shaam|8\s*(?:pm|baje)|raat)\b/i.test(message)) {
    updates.classAvailability = "evening";
  } else if (/\b(?:morning|subah)\b/i.test(message)) {
    updates.classAvailability = "morning";
  } else if (/\b(?:weekend|saturday|sunday)\b/i.test(message)) {
    updates.classAvailability = "weekend";
  }

  return updates;
}

function baseReply(
  language: AgentLanguage,
  intent: AgentIntent,
  knowledge: AgentKnowledgeReference[],
): { reply: string; nextQuestion: string | null; confidence: number } {
  const excerpt = approvedKnowledgeExcerpt(knowledge);
  const hinglish = language !== "en";

  switch (intent) {
    case "GREETING":
      return {
        reply: hinglish
          ? "Hello! SikhaDenge mein aapka welcome hai. Aap AI learning, career growth, freelancing ya business growth mein kis cheez ke liye guidance chahte hain?"
          : "Hello! Welcome to SikhaDenge. Are you looking for help with AI learning, career growth, freelancing, or business growth?",
        nextQuestion: hinglish
          ? "Aapka main goal kya hai?"
          : "What is your main goal?",
        confidence: 0.92,
      };
    case "COURSE_DISCOVERY":
      return {
        reply: hinglish
          ? "Main aapke goal ke basis par sahi program suggest karunga. Aap student hain, working professional hain, freelancer hain ya business owner?"
          : "I will suggest the right program based on your goal. Are you a student, working professional, freelancer, or business owner?",
        nextQuestion: hinglish
          ? "Aapka current background aur goal kya hai?"
          : "What is your current background and goal?",
        confidence: 0.9,
      };
    case "FEES":
      return {
        reply: demoReply(language),
        nextQuestion: hinglish
          ? "Registration ke baad DONE reply kariye."
          : "Reply DONE after registration.",
        confidence: 0.99,
      };
    case "DEMO_CLASS":
      return {
        reply: demoReply(language),
        nextQuestion: hinglish
          ? "Registration ke baad DONE reply kariye."
          : "Reply DONE after registration.",
        confidence: 0.99,
      };
    case "ENROLLMENT":
      return {
        reply: demoReply(language),
        nextQuestion: hinglish
          ? "Kya aap counsellor call chahenge?"
          : "Would you like a counsellor call?",
        confidence: 0.96,
      };
    case "COURSE_DETAILS":
    case "BATCH_SCHEDULE":
    case "ELIGIBILITY":
    case "CERTIFICATE":
      if (excerpt) {
        return {
          reply: excerpt,
          nextQuestion: hinglish
            ? "Complete guidance ke liye demo/masterclass join karna chahenge?"
            : "Would you like to join the demo/masterclass for complete guidance?",
          confidence: Math.max(0.82, knowledge[0]?.score ?? 0.82),
        };
      }
      return {
        reply: demoReply(language),
        nextQuestion: hinglish
          ? "Aap kis course ke baare mein pooch rahe hain?"
          : "Which course are you asking about?",
        confidence: 0.78,
      };
    case "OPT_OUT":
      return {
        reply: hinglish
          ? "Samajh gaya. Aapki opt-out request note ho gayi hai."
          : "Understood. Your opt-out request has been recorded.",
        nextQuestion: null,
        confidence: 1,
      };
    case "OUT_OF_SCOPE":
      return {
        reply: hinglish
          ? "Main SikhaDenge courses, demo/masterclass, admission, batch, certificate aur learning guidance mein help kar sakta hoon."
          : "I can help with SikhaDenge courses, demo/masterclass, admission, batches, certificates, and learning guidance.",
        nextQuestion: hinglish
          ? "Aap kis learning goal ke liye help chahte hain?"
          : "Which learning goal do you need help with?",
        confidence: 0.88,
      };
    case "UNKNOWN":
      if (excerpt) {
        return {
          reply: excerpt,
          nextQuestion: hinglish
            ? "Iske baare mein aur kya jaanna chahenge?"
            : "What else would you like to know about this?",
          confidence: Math.max(0.72, knowledge[0]?.score ?? 0.72),
        };
      }
      return {
        reply: hinglish
          ? "Main aapki help karunga. Apna question thoda detail mein likhiye—course, demo, batch, certificate, admission ya career goal ke baare mein."
          : "I will help you. Please share a little more detail—course, demo, batch, certificate, admission, or your career goal.",
        nextQuestion: hinglish
          ? "Aap exactly kya jaanna chahte hain?"
          : "What exactly would you like to know?",
        confidence: 0.64,
      };
    default:
      return {
        reply: hinglish
          ? "Is request ko SikhaDenge counsellor safely handle karega."
          : "A SikhaDenge counsellor will handle this request safely.",
        nextQuestion: null,
        confidence: 0.75,
      };
  }
}

export function generateOwnedReply(input: {
  agentInput: AgentInput;
  classification: RuleClassification;
  knowledge: AgentKnowledgeReference[];
}): OwnedReplyResult {
  const { agentInput, classification, knowledge } = input;
  const score = interestScore(agentInput, classification);
  const updates = inferLeadUpdates(agentInput);
  const response = baseReply(
    classification.language,
    classification.intent,
    knowledge,
  );

  const confirmedCall = CALL_CONFIRMATION.test(agentInput.customerMessage);
  if (confirmedCall) {
    return {
      reply:
        classification.language === "en"
          ? "Thank you. Your call request has been recorded. A SikhaDenge counsellor will contact you."
          : "Thank you. Aapki call request note ho gayi hai. SikhaDenge counsellor aapse contact karega.",
      confidence: 0.99,
      decisionSummary: "Customer explicitly confirmed a counsellor call request.",
      requiresHuman: true,
      handoffReason: "CUSTOMER_REQUESTED_HUMAN",
      nextQuestion: null,
      leadUpdates: { ...updates, counselorRequested: true },
    };
  }

  const shouldOfferCall =
    score >= 5 &&
    !agentInput.lead?.counselorRequested &&
    !["GREETING", "OPT_OUT", "OUT_OF_SCOPE"].includes(classification.intent);

  return {
    reply: shouldOfferCall
      ? `${response.reply}\n\n${callOffer(classification.language)}`
      : response.reply,
    confidence: response.confidence,
    decisionSummary: `Owned SikhaDenge reply engine handled ${classification.intent}; interest score ${score}${shouldOfferCall ? "; counsellor call offered" : ""}.`,
    requiresHuman: false,
    handoffReason: null,
    nextQuestion: shouldOfferCall ? callOffer(classification.language) : response.nextQuestion,
    leadUpdates: updates,
  };
}
