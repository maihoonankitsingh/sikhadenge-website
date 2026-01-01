import type { NextApiRequest, NextApiResponse } from "next";
import { clearCookie, COOKIE_NAME } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  clearCookie(res, COOKIE_NAME);
  return res.json({ ok: true });
}
