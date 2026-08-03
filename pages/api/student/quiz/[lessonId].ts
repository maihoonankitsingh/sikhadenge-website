import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { requireStudent } from "../../../../lms/auth";
import { getQuizForStudent, submitQuizAttempt } from "../../../../lms/services/quiz";

// GET  -> quiz questions (no answers)
// POST -> submit answers, auto-grade
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const lessonId = req.query.lessonId;
  const result =
    req.method === "GET"
      ? await getQuizForStudent(user.id, lessonId)
      : await submitQuizAttempt(user.id, lessonId, (req.body || {}).answers);

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
