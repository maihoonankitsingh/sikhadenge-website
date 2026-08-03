import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { createModule, deleteModule } from "../../../../lms/services/admin/courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["POST", "DELETE"])) return;

  const result =
    req.method === "POST"
      ? await createModule(req.body || {})
      : await deleteModule((req.body || {}).moduleId);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
