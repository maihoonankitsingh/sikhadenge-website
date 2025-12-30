import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

type LeadPayload = {
  // support both (old + new)
  name?: string | null;
  fullName?: string | null;

  phone?: string | null;
  source?: string | null;
  status?: string | null;
  notes?: string | null;

  // optional: counselling fields (if sent)
  courseInterestedIn?: string | null;
  iam?: string | null;
  specialization?: string | null;
};

type Ok = { ok: true; leads?: unknown; lead?: unknown };
type Fail = { ok: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Ok | Fail>) {
  try {
    if (req.method === 'GET') {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      return res.status(200).json({ ok: true, leads });
    }

    if (req.method === 'POST') {
      const body = (req.body ?? {}) as LeadPayload;

      const name = (body.fullName ?? body.name ?? null)?.toString().trim() || null;
      const phone = body.phone ?? null;
      const source = body.source ?? 'website';
      const status = body.status ?? 'new';

      // if notes not provided, pack counselling fields into notes (non-breaking)
      const notes =
        body.notes ??
        JSON.stringify({
          course: body.courseInterestedIn ?? undefined,
          role: body.iam ?? undefined,
          specialization: body.specialization ?? undefined,
          page: 'counselling-modal',
        });

      const lead = await prisma.lead.create({
        data: { name, phone, source, status, notes },
      });

      return res.status(200).json({ ok: true, lead });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ ok: false, error: `Method ${req.method ?? 'UNKNOWN'} Not Allowed` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return res.status(400).json({ ok: false, error: msg });
  }
}
