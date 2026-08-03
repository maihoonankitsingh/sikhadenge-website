import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk, sendFail } from "../../../../lms/http";
import { requireStudent } from "../../../../lms/auth";
import { getCourseContentForStudent } from "../../../../lms/services/content";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;

  const result = await getCourseContentForStudent(user.id, req.query.slug);
  if (!result.ok) return sendFail(res, result.status, result.error);

  return sendOk(res, { course: result.data });
}
