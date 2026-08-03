import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { listSubmissions, gradeSubmission } from "../../../../lms/services/assignments";

// GET ?status= -> submissions (submitted/graded/all)
// POST         -> grade a submission
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const result =
    req.method === "GET" ? await listSubmissions(req.query.status) : await gradeSubmission(req.body || {});

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
