import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk, sendFail } from "../../../lms/http";
import { requireStudent } from "../../../lms/auth";
import { getMyStats, getLeaderboard } from "../../../lms/services/gamification";

// GET -> { stats, leaderboard } for the dashboard
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await requireStudent(req, res);
  if (!user) return;

  const [stats, board] = await Promise.all([getMyStats(user.id), getLeaderboard(user.id)]);
  if (!stats.ok) return sendFail(res, stats.status, stats.error);
  if (!board.ok) return sendFail(res, board.status, board.error);

  return sendOk(res, { stats: stats.data, leaderboard: board.data.leaderboard });
}
