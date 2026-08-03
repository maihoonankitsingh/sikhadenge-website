import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { requireStudent } from "../../../../lms/auth";
import { getAssignmentForStudent, submitAssignment } from "../../../../lms/services/assignments";

// GET  -> assignment + my submission
// POST -> submit (fileUrl / text)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const lessonId = req.query.lessonId;
  const result =
    req.method === "GET"
      ? await getAssignmentForStudent(user.id, lessonId)
      : await submitAssignment(user.id, lessonId, req.body || {});

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
