import type { AgentHistoryMessage } from "./types";

const DEMO_LINK_QUESTION =
  /(?:main\s+(?:free\s+)?demo\s+(?:class\s+)?ka\s+link\s+share\s+kar\s+doon|main\s+link\s+share\s+kar\s+doon|demo\s+(?:class\s+)?ka\s+link\s+(?:share|bhej)|link\s+(?:share|bhej)\s+kar\s+doon)/iu;

const DEMO_LINK_CONFIRMATION =
  /^\s*(?:(?:yes|haan|ha|ji|bilkul|sure|ok|okay)(?:\s+(?:please|link|demo\s+link|link\s+(?:bhej|share)(?:\s+do)?))?|(?:link|demo\s+link)\s+(?:bhej|share)(?:\s+do)?|send\s+(?:the\s+)?link)\s*[.!😊🙏]*\s*$/iu;

export function normalizeContextualCustomerMessage(input: {
  customerMessage: string;
  history?: AgentHistoryMessage[] | null;
}): string {
  const message = input.customerMessage.trim();
  if (!message) return input.customerMessage;

  const lastAssistant = (input.history ?? [])
    .slice()
    .reverse()
    .find((item) => item.role === "assistant")?.text;

  if (
    lastAssistant &&
    DEMO_LINK_QUESTION.test(lastAssistant) &&
    DEMO_LINK_CONFIRMATION.test(message)
  ) {
    return "yes";
  }

  return input.customerMessage;
}
