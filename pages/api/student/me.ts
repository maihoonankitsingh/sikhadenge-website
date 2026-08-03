import type { NextApiRequest, NextApiResponse } from "next";
import { requireStudent } from "../../../lib/studentAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;
  return res.json({ ok: true, user });
}
