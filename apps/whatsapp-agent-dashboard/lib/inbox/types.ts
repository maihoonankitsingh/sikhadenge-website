export type InboxConversationSummary = {
  id: string;
  contact: {
    id: string;
    name: string;
    phone: string;
  };
  status: string;
  agentMode: string;
  unreadCount: number;
  lastMessageAt: string | null;
  lastMessage: {
    text: string | null;
    type: string;
    direction: string;
    timestamp: string;
  } | null;
  lead: {
    stage: string;
    temperature: string;
    score: number;
    interestedCourse: string | null;
  } | null;
  assignee: {
    id: string;
    name: string;
  } | null;
};

export type InboxMessage = {
  id: string;
  metaMessageId: string | null;
  direction: string;
  actor: string;
  type: string;
  status: string;
  text: string | null;
  mediaUrl: string | null;
  mimeType: string | null;
  filename: string | null;
  aiConfidence: number | null;
  messageTimestamp: string;
};

export type InboxConversationDetail = InboxConversationSummary & {
  source: string | null;
  campaign: string | null;
  currentIntent: string | null;
  detectedLanguage: string | null;
  aiConfidence: number | null;
  aiSummary: string | null;
  serviceWindowExpiresAt: string | null;
  messages: InboxMessage[];
  tags: Array<{ id: string; name: string; color: string | null }>;
};
