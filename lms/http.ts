// =============================================================
// LMS HTTP helpers — API routes ko patla (thin) rakhne ke liye.
// Route sirf: method check -> service call -> ye helpers se response.
// =============================================================

import type { NextApiRequest, NextApiResponse } from "next";
import type { ServiceResult } from "./types";

/** Sirf allowed methods ko aage jaane do, warna 405. */
export function methodGuard(req: NextApiRequest, res: NextApiResponse, methods: string[]): boolean {
  if (!methods.includes(req.method || "")) {
    res.setHeader("Allow", methods.join(", "));
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return false;
  }
  return true;
}

/** Success response: { ok: true, ...data }. */
export function sendOk(res: NextApiResponse, data: Record<string, unknown> = {}) {
  res.status(200).json({ ok: true, ...data });
}

/** Error response: { ok: false, error }. */
export function sendFail(res: NextApiResponse, status: number, error: string) {
  res.status(status).json({ ok: false, error });
}

/** ServiceResult ko seedha HTTP response me convert kar deta hai. */
export function sendResult<T>(res: NextApiResponse, result: ServiceResult<T>) {
  if (result.ok) sendOk(res, { data: result.data });
  else sendFail(res, result.status, result.error);
}

/** Phone ko normalize: sirf digits, last 10. */
export function normPhone(v: string): string {
  return v.replace(/[^0-9]/g, "").slice(-10);
}
