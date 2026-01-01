import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminSession } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = getAdminSession(req);
  if (!session) return res.status(401).json({ ok: false });
  return res.json({ ok: true, user: { username: session.sub } });
}
