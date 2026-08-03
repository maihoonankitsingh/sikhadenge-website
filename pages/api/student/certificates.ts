import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk, sendFail } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";
import { listMyCertificates } from "../../../lms/services/certificates";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;

  const result = await listMyCertificates(user.id);
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
