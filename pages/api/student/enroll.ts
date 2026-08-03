import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";
import { enrollStudent } from "../../../lms/services/enrollment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["POST"])) return;

  const result = await enrollStudent(user.id, (req.body || {}).courseId);
  if (!result.ok) return sendFail(res, result.status, result.error);

  return sendOk(res, result.data); // { enrolled, alreadyEnrolled? }
}
