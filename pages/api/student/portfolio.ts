import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";
import { getEditablePortfolio, updatePortfolioProfile, toggleShowcase } from "../../../lms/services/portfolio";

// GET   -> editable portfolio (profile + projects + certs)
// PATCH -> update profile (handle, headline, bio, public)
// POST  -> toggle a project's showcase flag
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["GET", "PATCH", "POST"])) return;

  const body = req.body || {};
  let result;
  if (req.method === "GET") result = await getEditablePortfolio(user.id);
  else if (req.method === "PATCH") result = await updatePortfolioProfile({ ...body, userId: user.id });
  else result = await toggleShowcase(user.id, body.submissionId, body.showcased);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
