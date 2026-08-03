import type { NextApiRequest, NextApiResponse } from "next";
import { sendOk, sendFail } from "../../../lms/http";
import { getCertificateBySerial } from "../../../lms/services/certificates";

// Public — no auth. Certificate verify by serial.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = await getCertificateBySerial(req.query.serial);
  if (!result.ok) return sendFail(res, result.status, result.error);
  return sendOk(res, result.data as Record<string, unknown>);
}
