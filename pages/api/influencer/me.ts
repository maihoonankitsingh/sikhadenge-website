import type { NextApiRequest, NextApiResponse } from "next";
import { requireInfluencer } from "../../../lib/influencerAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }

  const influencer = await requireInfluencer(req, res);
  if (!influencer) return;
  return res.json({ ok: true, influencer });
}
