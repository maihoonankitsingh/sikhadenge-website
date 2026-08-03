import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { scheduleLiveClass, getHostJoinInfo, endLiveClass } from "../../../../lms/services/live";

// POST   -> schedule a live class
// PATCH  -> host join (returns 100ms host URL, marks LIVE) or end class
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["POST", "PATCH"])) return;

  const body = req.body || {};

  let result;
  if (req.method === "POST") {
    result = await scheduleLiveClass(body);
  } else if (body.action === "end") {
    result = await endLiveClass(body.liveClassId);
  } else {
    result = await getHostJoinInfo(body.liveClassId);
  }

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
