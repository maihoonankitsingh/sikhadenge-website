import type { NextApiRequest, NextApiResponse } from "next";
import { clearStudentSession } from "../../../lib/studentAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  await clearStudentSession(req, res);
  return res.json({ ok: true });
}
