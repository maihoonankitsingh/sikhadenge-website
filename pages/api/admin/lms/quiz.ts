import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { getQuizAdmin, addQuestion, deleteQuestion } from "../../../../lms/services/quiz";

// GET ?lessonId= -> quiz with answers
// POST  -> add question
// DELETE -> delete question
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["GET", "POST", "DELETE"])) return;

  let result;
  if (req.method === "GET") result = await getQuizAdmin(req.query.lessonId);
  else if (req.method === "POST") result = await addQuestion(req.body || {});
  else result = await deleteQuestion((req.body || {}).questionId);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
