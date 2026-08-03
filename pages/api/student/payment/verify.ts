import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { requireStudent } from "../../../../lms/auth";
import { verifyAndEnroll } from "../../../../lms/services/payments";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["POST"])) return;

  const result = await verifyAndEnroll(user.id, req.body || {});
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
