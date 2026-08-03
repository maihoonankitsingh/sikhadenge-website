import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../../lib/auth";
import { methodGuard, sendOk, sendFail } from "../../../../lms/http";
import { createBatch, listBatchesForCourse } from "../../../../lms/services/live";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;
  if (!methodGuard(req, res, ["GET", "POST"])) return;

  const result =
    req.method === "GET"
      ? await listBatchesForCourse(req.query.courseId)
      : await createBatch(req.body || {});

  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data);
}
