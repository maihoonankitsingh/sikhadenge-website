import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk } from "../../../lms/http";
import { clearStudentSession } from "../../../lms/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!methodGuard(req, res, ["POST"])) return;
  await clearStudentSession(req, res);
  return sendOk(res);
}
