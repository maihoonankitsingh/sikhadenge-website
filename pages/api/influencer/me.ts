import type { NextApiRequest, NextApiResponse } from "next";
import { requireInfluencer } from "../../../lib/influencerAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const influencer = await requireInfluencer(req, res);
  if (!influencer) return;
  return res.json({ ok: true, influencer });
}
