import type { NextApiRequest, NextApiResponse } from "next";
import { clearCookie, COOKIE_NAME } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  clearCookie(res, COOKIE_NAME);
  return res.json({ ok: true });
}
