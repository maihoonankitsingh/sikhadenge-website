import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk, sendFail } from "../../../lms/http";
import { getPublicPortfolio } from "../../../lms/services/portfolio";

// Public — no auth. Portfolio by handle.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await getPublicPortfolio(req.query.handle);
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
