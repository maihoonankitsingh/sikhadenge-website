import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { listDoubtsAdmin, staffReply, adminSetResolved } from "../../../../lms/services/doubts";

// GET ?status= -> doubts (open/resolved/all)
// POST         -> staff reply (marks resolved)
// PATCH        -> set resolved flag
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["GET", "POST", "PATCH"])) return;

  const body = req.body || {};
  let result;
  if (req.method === "GET") result = await listDoubtsAdmin(req.query.status);
  else if (req.method === "POST") result = await staffReply(body.doubtId, body.body);
  else result = await adminSetResolved(body.doubtId, body.resolved);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
