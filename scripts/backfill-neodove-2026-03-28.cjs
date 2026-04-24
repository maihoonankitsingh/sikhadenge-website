require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : '';
}

function pick(obj, keys) {
  for (const k of keys) {
    if (obj && obj[k] != null && String(obj[k]).trim() !== '') return obj[k];
  }
  return '';
}

(async () => {
  const start = new Date('2026-03-27T18:30:00.000Z'); // 2026-03-28 00:00:00 IST
  const end   = new Date('2026-03-28T18:29:59.999Z'); // 2026-03-28 23:59:59 IST

  const rows = await db.masterclassZoomJoin.findMany({
    where: {
      createdAt: {
        gte: start,
        lte: end
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  const seen = new Set();
  const leads = [];

  for (const row of rows) {
    const phone = normalizePhone(
      pick(row, ['phone', 'mobile', 'whatsapp', 'whatsApp', 'whatsappNumber', 'contactNumber'])
    );

    if (!phone) continue;
    if (seen.has(phone)) continue;
    seen.add(phone);

    const name = String(
      pick(row, ['name', 'fullName', 'studentName']) || 'Masterclass User'
    ).trim();

    const email = String(
      pick(row, ['email', 'emailAddress']) || ''
    ).trim();

    leads.push({
      name,
      phone,
      email,
      source: 'backfill_masterclasszoomjoin_2026_03_28',
      page: '/masterclass',
      joinedAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
      rawId: row.id || null
    });
  }

  console.log(JSON.stringify({
    totalRows: rows.length,
    uniquePhones: leads.length,
    dryRun: process.env.DRY_RUN === '1'
  }, null, 2));

  if (process.env.DRY_RUN === '1') {
    console.log(JSON.stringify(leads.slice(0, 20), null, 2));
    return;
  }

  const baseUrl = process.env.BACKFILL_BASE_URL || 'http://127.0.0.1:3000';
  let ok = 0;
  let fail = 0;

  for (const lead of leads) {
    try {
      const res = await fetch(`${baseUrl}/api/masterclass`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          source: lead.source,
          page: lead.page
        })
      });

      const text = await res.text();

      if (res.ok) {
        ok++;
        console.log(`OK  ${lead.phone} ${lead.name}`);
      } else {
        fail++;
        console.error(`FAIL ${lead.phone} ${lead.name} -> ${res.status} ${text}`);
      }
    } catch (err) {
      fail++;
      console.error(`ERR  ${lead.phone} ${lead.name} -> ${err.message}`);
    }
  }

  console.log(JSON.stringify({
    pushed: ok,
    failed: fail,
    totalUnique: leads.length
  }, null, 2));
})()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
