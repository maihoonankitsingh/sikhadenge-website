import type { NextApiRequest, NextApiResponse } from "next";
import { getAdminSession } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }

  const session = getAdminSession(req);
  if (!session) return res.status(401).json({ ok: false });
  return res.json({ ok: true, user: { username: session.sub } });
}
