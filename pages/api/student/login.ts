import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../lms/http";
import { createStudentSession } from "../../../lms/auth";
import { loginStudent } from "../../../lms/services/users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!methodGuard(req, res, ["POST"])) return;

  const result = await loginStudent(req.body || {});
  if (!result.ok) return sendFail(res, result.status, result.error);

  await createStudentSession(res, result.data.id);
  return sendOk(res, { user: result.data });
}
