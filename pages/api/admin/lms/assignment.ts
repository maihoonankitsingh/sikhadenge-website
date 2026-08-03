import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { updateAssignment } from "../../../../lms/services/assignments";

// POST ?  -> create/update assignment (instructions, dueAt) for a lesson
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["POST"])) return;

  const result = await updateAssignment(req.body || {});
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
