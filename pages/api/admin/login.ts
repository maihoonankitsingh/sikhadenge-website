import type { NextApiRequest, NextApiResponse } from "next";
import { signSession, setCookie, COOKIE_NAME } from "../../../lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { username, password } = req.body || {};
  const adminUser = (process.env.ADMIN_USERNAME || "").trim();
  const adminPass = (process.env.ADMIN_PASSWORD || "").trim();

  if (!adminUser || !adminPass) {
    return res.status(500).json({ ok: false, error: "Admin not configured" });
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim() !== adminUser ||
    password !== adminPass
  ) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const token = signSession({ sub: adminUser }, 60 * 60 * 24 * 7);
  setCookie(res, COOKIE_NAME, token, 60 * 60 * 24 * 7);

  return res.json({ ok: true });
}
