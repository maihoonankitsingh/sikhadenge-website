import crypto from "crypto";

function secret() {
  const value =
    process.env.FUNNEL_CHECKOUT_SECRET ||
    process.env.ADMIN_COOKIE_SECRET ||
    process.env.RAZORPAY_KEY_SECRET ||
    "";
  if (!value) throw new Error("Funnel checkout signing secret is not configured");
  return value;
}

function signature(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createCheckoutToken(input: {
  leadId: string;
  funnel: "chatgpt" | "claude";
  ttlSeconds?: number;
}) {
  const expiresAt = Math.floor(Date.now() / 1000) + Math.max(300, input.ttlSeconds || 7200);
  const payload = Buffer.from(
    JSON.stringify({ leadId: input.leadId, funnel: input.funnel, exp: expiresAt }),
    "utf8"
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyCheckoutToken(token: string) {
  const [payload, received] = String(token || "").split(".");
  if (!payload || !received) return null;

  const expected = signature(payload);
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      !parsed ||
      typeof parsed.leadId !== "string" ||
      !["chatgpt", "claude"].includes(parsed.funnel) ||
      typeof parsed.exp !== "number" ||
      parsed.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return parsed as { leadId: string; funnel: "chatgpt" | "claude"; exp: number };
  } catch {
    return null;
  }
}
