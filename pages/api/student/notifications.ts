import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";
import { listNotifications, markRead } from "../../../lms/services/notifications";

// GET  -> notifications + unread count
// POST -> mark read ({ id } or { id: "all" })
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const result =
    req.method === "GET" ? await listNotifications(user.id) : await markRead(user.id, (req.body || {}).id);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
