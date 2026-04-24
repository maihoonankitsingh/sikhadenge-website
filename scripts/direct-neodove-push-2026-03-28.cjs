require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const ENDPOINT = 'https://d20b0ff5-e234-4652-8def-6d7f3d5f5e8d.neodove.com/integration/custom/ac31ae63-acf7-4b20-a478-caff323fb3e7/leads';

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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const start = new Date('2026-03-27T18:30:00.000Z');
  const end   = new Date('2026-03-28T18:29:59.999Z');

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
    if (!phone || seen.has(phone)) continue;
    seen.add(phone);

    leads.push({
      name: String(pick(row, ['name', 'fullName', 'studentName']) || 'Masterclass User').trim(),
      mobile: phone,
      email: String(pick(row, ['email', 'emailAddress']) || '').trim(),
      detail1: 'source=backfill_masterclasszoomjoin_2026_03_28',
      detail2: 'page=/masterclass'
    });
  }

  console.log(JSON.stringify({
    totalRows: rows.length,
    uniquePhones: leads.length
  }, null, 2));

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });

      const text = await res.text();

      if (String(text).trim() === 'OK') {
        ok++;
        console.log(`PUSH ${i + 1}/${leads.length} ${lead.mobile} ${lead.name} -> ${text}`);
      } else {
        fail++;
        console.log(`FAIL ${i + 1}/${leads.length} ${lead.mobile} ${lead.name} -> ${res.status} ${text}`);
      }
    } catch (err) {
      fail++;
      console.log(`ERR ${i + 1}/${leads.length} ${lead.mobile} ${lead.name} -> ${err.message}`);
    }

    await sleep(2000);
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
