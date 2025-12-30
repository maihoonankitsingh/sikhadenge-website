import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
      return res.status(200).json({ ok: true, leads })
    }

    if (req.method === 'POST') {
      const body = (req.body ?? {}) as Record<string, unknown>

      const name = (body.name as string) ?? null
      const phone = (body.phone as string) ?? null
      const source = (body.source as string) ?? 'website'
      const status = (body.status as string) ?? 'new'
      const notes = (body.notes as string) ?? null

      const lead = await prisma.lead.create({
        data: { name, phone, source, status, notes },
      })

      return res.status(200).json({ ok: true, lead })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ ok: false, error: `Method ${req.method} Not Allowed` })
  } catch (e: any) {
    return res.status(400).json({ ok: false, error: e?.message || 'unknown error' })
  }
}
