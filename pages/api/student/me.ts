import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return; // requireStudent already sent 401
  return sendOk(res, { user });
}
