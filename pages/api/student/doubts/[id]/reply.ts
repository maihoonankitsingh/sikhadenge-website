import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../../../lms/http";
import { requireStudent } from "../../../../../lms/auth";
import { replyToDoubt, setDoubtResolved } from "../../../../../lms/services/doubts";

// POST  -> reply to a doubt
// PATCH -> resolve/unresolve own doubt
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["POST", "PATCH"])) return;

  const body = req.body || {};
  const result =
    req.method === "POST"
      ? await replyToDoubt(user.id, user.name, req.query.id, body.body)
      : await setDoubtResolved(user.id, req.query.id, body.resolved);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
