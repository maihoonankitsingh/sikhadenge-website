import type { NextApiRequest, NextApiResponse } from "next";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { requireStudent } from "../../../../lms/auth";
import { listDoubts, postDoubt } from "../../../../lms/services/doubts";

// GET ?courseId= -> doubts for a course
// POST           -> ask a new doubt
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const result =
    req.method === "GET"
      ? await listDoubts(user.id, req.query.courseId)
      : await postDoubt(user.id, user.name, req.body || {});

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
