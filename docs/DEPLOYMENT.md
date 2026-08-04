# Sikhadenge — Deployment Guide (safe, step-by-step)

> **Zaroori baat pehle:** ye LMS koi alag app nahi hai. Ye **isi Next.js project ka
> hissa** hai — LMS ke pages routes hain (`/student`, `/admin/lms`, `/portfolio`,
> `/certificate`). Matlab ek hi codebase deploy hota hai, aur LMS ke pages usi
> deployment ke andar milte hain.
>
> **Domain:** tumne `lms.sikhadenge.in` socha hai. Exact subdomain naam jo bhi ho
> (lms / learn / app), guide same rahegi — bas jahan `lms.sikhadenge.in` likha hai
> waha apna final subdomain daal dena. Webhook URLs bhi usi final domain se banenge.

---

## 0. Do options — pehle ye decide karo

Marketing site + LMS **ek hi codebase** me hain. Do tareeke:

- **Option A (recommended):** Ek hi Vercel project, do domains —
  `sikhadenge.in` (marketing) **aur** `lms.sikhadenge.in` (same app).
  Sabse simple, ek hi deploy. LMS pages dono domain pe milenge
  (e.g. `lms.sikhadenge.in/student`).
- **Option B:** Alag Vercel project sirf LMS subdomain ke liye (same repo).
  Tab do deployments manage karne padte hain. Zyada kaam, faayda kam.

**Recommendation: Option A.** Neeche steps A ke hisaab se hain.

---

## 1. Database (Postgres) — REQUIRED

LMS ko ek Postgres database chahiye. Managed lo (khud host mat karo):

- **Neon** (neon.tech) — free tier, serverless, Vercel ke saath best. **Recommended.**
- ya Supabase / Amazon RDS / Railway.

Steps:
1. Neon pe account → **New Project** → region **Mumbai/Singapore** (India ke paas).
2. Connection string copy karo — aisa dikhega:
   `postgresql://user:pass@ep-xxx.ap-southeast-1.aws.neon.tech/dbname?sslmode=require`
3. Ye string `DATABASE_URL` me jayegi (agla step).

> **Agar marketing site pehle se isi DB pe live hai:** koi tension nahi. LMS ke
> saare changes **additive** hain (naye tables + naye optional columns). Purana
> data (Lead / Admission / Influencer) safe rahega, kuch delete nahi hoga.

---

## 2. Schema ko DB me daalo (safe)

Local machine pe, repo clone karke:

```bash
npm install
# .env banao aur DATABASE_URL set karo (step 3 dekho)
npx prisma generate
npx prisma db push          # schema ko DB me sync karta hai (additive, safe)
```

`db push` **naye tables/columns bana deta hai bina kisi purani cheez ko chhoode**.
Ye is fresh setup ke liye sabse safe + simple hai.

> **Aage jab schema badlega:** proper migration discipline ke liye
> `prisma migrate dev --name <change>` (migration files banata hai, commit karo)
> aur prod me `prisma migrate deploy`. Abhi ke liye `db push` kaafi hai.

**Verify:** `npx prisma studio` chalao → tables (User, Course, Payment, …) dikhne chahiye.

---

## 3. Environment variables (SABSE IMPORTANT)

Poora template `.env.example` me hai. Copy karke values bharo.

### Required (inke bina kaam nahi chalega)
| Var | Kya | Kaise milega |
|---|---|---|
| `DATABASE_URL` | Postgres URL | Neon/Supabase |
| `ADMIN_USERNAME` | admin login user | tum chuno |
| `ADMIN_PASSWORD` | admin login password | strong rakho |
| `ADMIN_COOKIE_SECRET` | session sign secret (24+ chars) | `openssl rand -base64 32` |

### Live classes (Phase 3) — optional
`HMS_ACCESS_KEY`, `HMS_SECRET`, `HMS_TEMPLATE_ID`, `HMS_SUBDOMAIN`, `HMS_WEBHOOK_SECRET`
→ 100ms dashboard se. Template me **recording ON** rakhna.

### Payments (Phase 5) — optional (par revenue ke liye zaroori)
`RAZORPAY_KEY_ID`, `RAZORPAY_SECRET` → Razorpay dashboard (tumhara KYC ho gaya hai).
`REFERRAL_DISCOUNT_PERCENT` → coupon discount % (default 10).

### Notifications (Phase 6) — sab optional
`RESEND_API_KEY`, `EMAIL_FROM`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`.
Na ho to sirf in-app notification chalti hai (email/WhatsApp skip).

> **Safety:** secrets kabhi git me commit mat karo. `.env` already `.gitignore` me hai.
> Vercel me env "Production" scope me daalo. Student/influencer login ke liye koi
> alag secret nahi chahiye (wo DB-token based hai).

---

## 4. Admin login + pehla course

Deploy ke baad (ya local pe):
1. `https://<domain>/admin/login` → `ADMIN_USERNAME` + `ADMIN_PASSWORD` se login.
2. `/admin/lms` → **Create course** → module + lesson add karo → **Publish**.
3. Ab student `/student/login` pe signup karke enroll kar sakta hai.

(Student/influencer khud signup/login karte hain — DB me manually banana zaroori nahi.)

---

## 5. Vercel pe deploy

1. **vercel.com** → **Add New → Project** → GitHub repo `maihoonankitsingh/sikhadenge-website` import karo.
2. Framework: **Next.js** (auto-detect). Build command default (`next build`).
3. **Environment Variables** → step 3 waale saare add karo (Production scope).
4. **Deploy** dabao. Build green hona chahiye (humne local pe bhi verify kiya hai).

> **Prisma note:** Vercel pe `prisma generate` build ke waqt apne aap chalta hai
> (postinstall). Agar kabhi "Prisma Client outdated" error aaye, `package.json`
> ke build script ko `prisma generate && next build` kar dena.

---

## 6. Domain — `lms.sikhadenge.in` (ya jo bhi tum choose karo)

Vercel project → **Settings → Domains**:
1. `sikhadenge.in` add karo (marketing).
2. `lms.sikhadenge.in` add karo (LMS bhi isi app se).
3. Vercel jo **DNS record** batayega wo apne domain provider (GoDaddy/Cloudflare) me daalo:
   - subdomain ke liye usually: **CNAME** `lms` → `cname.vercel-dns.com`
4. SSL Vercel khud laga dega (kuch minute).

Ab `lms.sikhadenge.in/student`, `/admin/lms`, `/portfolio/<handle>` sab live.

> Exact subdomain confirm kar lena — jo bhi final ho (`lms`/`learn`/`app`), webhook
> URLs (step 7) usi domain se banao.

---

## 7. Webhooks (final domain ke baad set karo)

### 100ms (recording auto-update ke liye)
100ms dashboard → **Webhooks** → URL:
```
https://lms.sikhadenge.in/api/webhooks/hms
```
`HMS_WEBHOOK_SECRET` set kiya ho to wahi passcode 100ms me bhi daalo. Template me
**recording enabled** confirm karo.

### Razorpay (optional, reliability ke liye)
Abhi payment client-side verify hota hai (kaafi hai). Aage double-safety chahiye to
Razorpay webhook add kar sakte ho (ye Phase-5+ hardening hai, abhi zaroori nahi).

---

## 8. Deploy ke baad smoke test (safe checklist)

Ek-ek karke check karo:
- [ ] `/admin/login` → login ho raha hai
- [ ] `/admin/lms` → course create + publish
- [ ] `/student/login` → signup ho raha hai
- [ ] Dashboard pe published course dikh raha hai → **enroll**
- [ ] `/student/learn/<slug>` → lesson/video khul raha hai, progress save
- [ ] (100ms set ho to) live class schedule → host join → end → recording aata hai
- [ ] (Razorpay set ho to) paid course → checkout → **test mode** me payment
- [ ] Course 100% → certificate `/certificate/<serial>` khul raha hai
- [ ] `/admin/lms/analytics` → numbers dikh rahe hain

> **Razorpay test:** pehle **Test Mode** keys se try karo. Sab sahi chale tabhi
> Live keys daalo.

---

## 9. Safety & rollback

- **DB backup:** Neon/Supabase me automatic backups on karo. Bade change se pehle
  manual snapshot lo.
- **Env secrets:** rotate karne ho to Vercel me update → redeploy. `ADMIN_PASSWORD`
  aur `ADMIN_COOKIE_SECRET` strong rakho.
- **Rollback:** Vercel har deploy ka history rakhta hai — **Deployments → Promote**
  se purane green deploy pe wapas ja sakte ho (code). DB rollback ke liye backup.
- **Destructive change:** kabhi bhi `prisma migrate reset` prod pe mat chalao
  (poora data udd jata hai). Prod pe sirf `db push` (additive) ya `migrate deploy`.

---

## 10. Aage (production hardening — abhi optional)

- Recording ka 100ms presigned URL kuch ghante me expire hota hai → apne storage
  (Cloudflare R2 / S3) me copy karo (`lms/services/live.ts` me note hai).
- Razorpay webhook (idempotent) — payment reliability.
- Live-class reminder cron — class se pehle notify.
- Rate limiting (login/OTP abuse), admin audit logs.

---

### TL;DR
1. Neon Postgres banao → `DATABASE_URL`
2. `npm i && npx prisma db push` (safe, additive)
3. Vercel import → saare env (`.env.example` dekho) → deploy
4. `lms.sikhadenge.in` domain add → DNS CNAME
5. 100ms webhook URL set → smoke test → live 🎉
