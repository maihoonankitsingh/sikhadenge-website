import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../lms/http";
import { handleRecordingWebhook } from "../../../lms/services/live";
import { verifyWebhook } from "../../../lms/hms";

// 100ms webhook endpoint. Dashboard me is URL ko webhook set karo:
//   https://<your-domain>/api/webhooks/hms
// Recording ready hone par 100ms yahan POST karta hai -> hum recording ko
// course me LIVE_RECORDING lesson bana dete hain (auto-update).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  // Optional shared-secret check (HMS_WEBHOOK_SECRET set ho to).
  const provided =
    (req.headers["x-webhook-passcode"] as string | undefined) ||
    (req.headers["x-webhook-secret"] as string | undefined) ||
    (typeof req.query.secret === "string" ? req.query.secret : undefined);
  if (!verifyWebhook(provided)) {
    return sendFail(res, 401, "Invalid webhook secret");
  }

  const result = await handleRecordingWebhook(req.body || {});
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
