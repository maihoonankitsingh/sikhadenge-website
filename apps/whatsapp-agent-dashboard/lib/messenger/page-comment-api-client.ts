type MetaApiError = {
  error?: { message?: string; code?: number; error_subcode?: number };
};

type CommentReplyResponse = MetaApiError & { id?: string };

export type FacebookPageCommentActionMode = "disabled" | "dry_run" | "live";

type Environment = Readonly<Record<string, string | undefined>>;

function clean(value: string | undefined): string | null {
  const normalized = value?.trim();
  return normalized || null;
}

function required(env: Environment, name: string): string {
  const value = clean(env[name]);
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function graphVersion(env: Environment): string {
  return clean(env.MESSENGER_GRAPH_VERSION) ?? "v23.0";
}

export function facebookPageCommentActionMode(
  env: Environment = process.env,
): FacebookPageCommentActionMode {
  const killed = clean(env.FACEBOOK_PAGE_COMMENT_ACTION_KILL_SWITCH)?.toLowerCase() !== "off";
  if (killed) return "disabled";
  const requested = clean(env.FACEBOOK_PAGE_COMMENT_ACTION_MODE)?.toLowerCase();
  if (requested === "dry_run") return "dry_run";
  if (requested === "live") return "live";
  return "disabled";
}

function assertExternalWriteGates(env: Environment): void {
  if (env.INTEGRATION_EXTERNAL_WRITES_ENABLED?.trim().toLowerCase() !== "true") {
    throw new Error("INTEGRATION_EXTERNAL_WRITES_ENABLED=true is required for Facebook Page comment writes.");
  }
  if (env.AUTOMATION_ACTIONS_ENABLED?.trim().toLowerCase() !== "true") {
    throw new Error("AUTOMATION_ACTIONS_ENABLED=true is required for Facebook Page comment writes.");
  }
}

function apiError(body: MetaApiError, status: number): Error {
  const code = body.error?.code ? ` (${body.error.code})` : "";
  return new Error(`${body.error?.message || `Facebook Page comment reply failed with HTTP ${status}`}${code}`);
}

export async function sendFacebookPagePublicCommentReply(input: {
  commentId: string;
  message: string;
  env?: Environment;
}): Promise<{ replyCommentId: string | null; mode: FacebookPageCommentActionMode }> {
  const env = input.env ?? process.env;
  const mode = facebookPageCommentActionMode(env);
  if (mode === "disabled") throw new Error("Facebook Page comment actions are disabled.");
  if (mode === "dry_run") return { replyCommentId: null, mode };
  assertExternalWriteGates(env);

  const commentId = input.commentId.trim();
  const message = input.message.trim();
  if (!commentId || !message) throw new Error("Facebook Page comment ID and reply text are required.");

  const url = new URL(
    `https://graph.facebook.com/${encodeURIComponent(graphVersion(env))}/${encodeURIComponent(commentId)}/comments`,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${required(env, "MESSENGER_PAGE_ACCESS_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message.slice(0, 8_000) }),
    cache: "no-store",
  });

  let body: CommentReplyResponse = {};
  try {
    body = (await response.json()) as CommentReplyResponse;
  } catch {
    body = {};
  }
  if (!response.ok) throw apiError(body, response.status);
  return { replyCommentId: clean(body.id), mode };
}

export function isRetriableFacebookPageCommentError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return ["timeout", "aborted", "http 429", "http 500", "http 502", "http 503", "http 504"].some((token) =>
    message.includes(token),
  );
}
