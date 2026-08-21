import crypto from "crypto";

export type CheckoutPurpose =
  | "masterclass_entry"
  | "implementation_workshop"
  | "core_program";

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
  purpose?: CheckoutPurpose;
  ttlSeconds?: number;
}) {
  const expiresAt = Math.floor(Date.now() / 1000) + Math.max(300, input.ttlSeconds || 7200);
  const payload = Buffer.from(
    JSON.stringify({
      leadId: input.leadId,
      funnel: input.funnel,
      purpose: input.purpose || "masterclass_entry",
      exp: expiresAt,
    }),
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
    const purpose = parsed?.purpose || "masterclass_entry";
    if (
      !parsed ||
      typeof parsed.leadId !== "string" ||
      !["chatgpt", "claude"].includes(parsed.funnel) ||
      !["masterclass_entry", "implementation_workshop", "core_program"].includes(purpose) ||
      typeof parsed.exp !== "number" ||
      parsed.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return {
      leadId: parsed.leadId as string,
      funnel: parsed.funnel as "chatgpt" | "claude",
      purpose: purpose as CheckoutPurpose,
      exp: parsed.exp as number,
    };
  } catch {
    return null;
  }
}
