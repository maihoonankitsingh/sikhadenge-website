import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";

const ALLOWED = new Set(["new", "called", "followup", "converted", "not_interested"]);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const id = req.query.id;
  if (typeof id !== "string" || !id.trim()) {
    return res.status(400).json({ ok: false, error: "Invalid id" });
  }

  if (req.method !== "PATCH") return res.status(405).json({ ok: false });

  const { status, adminNote } = req.body || {};

  const data: any = {};
  if (typeof status === "string" && status.trim()) {
    const s = status.trim();
    if (!ALLOWED.has(s)) return res.status(400).json({ ok: false, error: "Invalid status" });
    data.status = s;
  }

  if (typeof adminNote === "string" && adminNote.trim()) {
    // store notes as JSON string already used by modal; append safely
    const noteText = adminNote.trim().slice(0, 500);
    const current = await prisma.lead.findUnique({ where: { id }, select: { notes: true } });
    let nextNotes = current?.notes || null;

    try {
      const parsed = nextNotes ? JSON.parse(nextNotes) : {};
      const arr = Array.isArray(parsed.adminNotes) ? parsed.adminNotes : [];
      arr.unshift({ at: new Date().toISOString(), by: admin.sub, note: noteText });
      parsed.adminNotes = arr.slice(0, 20);
      nextNotes = JSON.stringify(parsed);
    } catch {
      nextNotes = JSON.stringify({ raw: nextNotes, adminNotes: [{ at: new Date().toISOString(), by: admin.sub, note: noteText }] });
    }
    data.notes = nextNotes;
  }

  if (!Object.keys(data).length) return res.status(400).json({ ok: false, error: "Nothing to update" });

  try {
    const updated = await prisma.lead.update({
      where: { id },
      data,
      select: { id: true, status: true, updatedAt: true },
    });
    return res.json({ ok: true, item: updated });
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("Record to update not found")) return res.status(404).json({ ok: false, error: "Not found" });
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
