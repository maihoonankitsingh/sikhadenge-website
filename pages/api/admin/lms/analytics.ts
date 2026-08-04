import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { sendOk, sendFail } from "../../../../lms/http";
import { getAnalytics } from "../../../../lms/services/admin/analytics";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const result = await getAnalytics();
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
