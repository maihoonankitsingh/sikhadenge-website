# Sikhadenge — Advanced LMS Build Plan

> **Goal:** BYJU'S / upGrad / PhysicsWallah jaisa professional LMS.
> Live classes, recordings, student dashboard, auto-recording updates, assessments, certificates.
>
> **Streaming choice:** [100ms](https://www.100ms.live) (recording built-in, India-based, LMS-grade).
> **Content security:** DRM + dynamic watermark + signed URLs — Telegram/piracy leak roke (section 9).
> **Status:** Planning doc. Code build phase-wise hoga.

---

## 1. Current State (kya pehle se hai)

Repo abhi ek **marketing + lead-gen site** hai, LMS nahi.

**Already built:**
- Next.js 14 + Prisma + PostgreSQL + Tailwind
- Marketing pages (courses catalog, experts, blog, reviews, companies)
- Lead capture (`Lead` model) + Admin panel (leads, admissions, influencers)
- Influencer portal (promo codes, referral tracking)
- Admin & influencer auth (cookie + HMAC session, bcrypt)
- SEO auto-generation, sitemap, robots

**Reusable for LMS:** Auth patterns (`lib/auth.ts`), Prisma setup (`lib/prisma.ts`), influencer promo → payment coupons, admin shell.

**Missing (poora LMS core):** Student accounts, dashboard, enrollment, content delivery, video player, live classes, recordings, progress, quizzes, assignments, certificates, notifications, instructor dashboard.

---

## 2. Target Architecture

```
Next.js (App Router)  ── UI + API routes
        │
        ├── Prisma ORM ──► PostgreSQL        (users, courses, enrollments, progress...)
        ├── 100ms SDK  ──► Live classes + auto-recording
        ├── S3 / Cloudflare R2 ─► Video & recording storage (HLS)
        ├── Razorpay   ──► Payments / EMI / coupons
        └── Notification: Email (Resend) + WhatsApp/SMS (MSG91) + Web Push
```

**Key decisions:**
| Concern | Choice | Why |
|---|---|---|
| Live class + recording | **100ms** | Recording built-in, webhook → auto-update dashboard, Indian latency |
| Video storage/streaming | Cloudflare R2 + HLS (or Mux) | Cheap egress, secure signed URLs |
| Payments | Razorpay | India standard, EMI, UPI, coupons |
| Auth | Extend existing session pattern → add roles | Reuse `lib/auth.ts` style, add `STUDENT/INSTRUCTOR/ADMIN` |
| Notifications | Resend + MSG91 + web-push | Class reminders, "new recording" alerts |
| File uploads | Presigned URLs to R2 | No server bottleneck |

---

## 3. Database Schema (Prisma models to add)

```prisma
// ---------- Users & Roles ----------
enum Role { STUDENT INSTRUCTOR ADMIN }

model User {
  id           String   @id @default(cuid())
  name         String
  email        String?  @unique
  phone        String?  @unique
  passwordHash String?
  role         Role     @default(STUDENT)
  avatarUrl    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  enrollments  Enrollment[]
  progress     LessonProgress[]
  submissions  Submission[]
  attendance   Attendance[]
  notes        Note[]
  sessions     UserSession[]
  taughtBatches Batch[]  @relation("InstructorBatches")
}

model UserSession {
  id        String   @id @default(cuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  @@index([userId])
}

// ---------- Course structure ----------
model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  thumbnail   String?
  priceInr    Int      @default(0)
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  modules     Module[]
  batches     Batch[]
  enrollments Enrollment[]
}

model Module {
  id       String  @id @default(cuid())
  courseId String
  title    String
  order    Int     @default(0)
  course   Course  @relation(fields: [courseId], references: [id])
  lessons  Lesson[]
}

enum LessonType { VIDEO LIVE_RECORDING PDF TEXT QUIZ ASSIGNMENT }

model Lesson {
  id         String     @id @default(cuid())
  moduleId   String
  title      String
  type       LessonType @default(VIDEO)
  order      Int        @default(0)
  videoUrl   String?    // HLS manifest / R2 key
  durationSec Int?
  contentMd  String?    // for TEXT lessons
  liveClassId String?   // if this lesson came from a live class recording
  module     Module     @relation(fields: [moduleId], references: [id])
  progress   LessonProgress[]
  quiz       Quiz?
  assignment Assignment?
}

// ---------- Batches & Enrollment ----------
model Batch {
  id           String   @id @default(cuid())
  courseId     String
  name         String   // "Graphic Design - Aug 2026"
  instructorId String?
  startDate    DateTime?
  course       Course   @relation(fields: [courseId], references: [id])
  instructor   User?    @relation("InstructorBatches", fields: [instructorId], references: [id])
  liveClasses  LiveClass[]
  enrollments  Enrollment[]
}

enum EnrollmentStatus { ACTIVE COMPLETED CANCELLED }

model Enrollment {
  id         String   @id @default(cuid())
  userId     String
  courseId   String
  batchId    String?
  status     EnrollmentStatus @default(ACTIVE)
  enrolledAt DateTime @default(now())
  user       User     @relation(fields: [userId], references: [id])
  course     Course   @relation(fields: [courseId], references: [id])
  batch      Batch?   @relation(fields: [batchId], references: [id])
  payment    Payment?
  @@unique([userId, courseId])
}

// ---------- Live classes (100ms) ----------
enum LiveStatus { SCHEDULED LIVE ENDED }

model LiveClass {
  id            String     @id @default(cuid())
  batchId       String
  title         String
  scheduledAt   DateTime
  status        LiveStatus @default(SCHEDULED)
  hmsRoomId     String?    // 100ms room id
  recordingUrl  String?    // filled by 100ms webhook when recording ready → AUTO dashboard update
  recordingReady Boolean   @default(false)
  batch         Batch      @relation(fields: [batchId], references: [id])
  attendance    Attendance[]
}

model Attendance {
  id          String   @id @default(cuid())
  liveClassId String
  userId      String
  joinedAt    DateTime @default(now())
  liveClass   LiveClass @relation(fields: [liveClassId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
  @@unique([liveClassId, userId])
}

// ---------- Progress ----------
model LessonProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  completed   Boolean  @default(false)
  lastPosSec  Int      @default(0)  // resume where left
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
  lesson      Lesson   @relation(fields: [lessonId], references: [id])
  @@unique([userId, lessonId])
}

// ---------- Assessments ----------
model Quiz {
  id       String @id @default(cuid())
  lessonId String @unique
  lesson   Lesson @relation(fields: [lessonId], references: [id])
  questions Question[]
}

model Question {
  id       String @id @default(cuid())
  quizId   String
  text     String
  options  Json    // ["A","B","C","D"]
  correct  Int     // index
  quiz     Quiz    @relation(fields: [quizId], references: [id])
}

model Assignment {
  id       String @id @default(cuid())
  lessonId String @unique
  title    String
  dueAt    DateTime?
  lesson   Lesson @relation(fields: [lessonId], references: [id])
  submissions Submission[]
}

model Submission {
  id           String @id @default(cuid())
  assignmentId String
  userId       String
  fileUrl      String?
  grade        Int?
  feedback     String?
  submittedAt  DateTime @default(now())
  assignment   Assignment @relation(fields: [assignmentId], references: [id])
  user         User       @relation(fields: [userId], references: [id])
}

// ---------- Misc ----------
model Note {
  id        String @id @default(cuid())
  userId    String
  lessonId  String
  body      String
  createdAt DateTime @default(now())
  user      User   @relation(fields: [userId], references: [id])
}

model Payment {
  id           String @id @default(cuid())
  enrollmentId String @unique
  razorpayId   String?
  amountInr    Int
  status       String  // created / paid / failed
  couponCode   String? // ties into influencer promoCode
  createdAt    DateTime @default(now())
  enrollment   Enrollment @relation(fields: [enrollmentId], references: [id])
}

model Certificate {
  id         String @id @default(cuid())
  userId     String
  courseId   String
  serial     String @unique
  issuedAt   DateTime @default(now())
}
```

---

## 4. File / Route Structure (Next.js App Router)

```
app/
  (student)/
    login/                 # student auth
    dashboard/             # My Courses, upcoming live, progress
    learn/[courseSlug]/    # course player: sidebar modules + video/live/quiz
    live/[liveClassId]/    # 100ms live room join
    certificates/
  (instructor)/
    dashboard/             # my batches, schedule live, grade assignments
    live/[liveClassId]/    # host room
  (admin)/lms/             # course builder, batches, students, analytics
  api/
    auth/         (signup, login, otp, logout, me)
    courses/      (list, detail, enroll)
    lessons/[id]/progress
    live/         (schedule, token, start, end)
    webhooks/hms/          # 100ms recording-ready → set recordingUrl + create LIVE_RECORDING lesson
    payments/     (create-order, verify, razorpay-webhook)
    uploads/presign
    quiz/[id]/attempt
    assignments/[id]/submit
lib/
  studentAuth.ts   # extend existing auth pattern with roles
  hms.ts           # 100ms room/token/recording helpers
  storage.ts       # R2 presigned URLs
  razorpay.ts
```

**"Auto recording update" ka flow (tumhari core demand):**
1. Instructor live class start → `POST /api/live/start` → 100ms room banta hai, recording ON.
2. Class end → 100ms recording process karta hai.
3. 100ms `POST /api/webhooks/hms` hit karta hai → hum `LiveClass.recordingUrl` set karte + ek `Lesson (type=LIVE_RECORDING)` auto-create karte us batch ke course me.
4. Student dashboard poll/refresh pe recording **automatically** dikh jaati — bina manual upload ke. ✅

---

## 5. COMPLETE Feature Set (full LMS — nothing missing)

> Platform type: **Skill courses** (Graphic Design, Video Editing, Motion Graphics, AI).
> Isliye priority: recordings, projects/portfolio, live doubt, certificates > exam-style test series.

### 5.1 Four user roles — har role ke features

| Role | Features |
|---|---|
| **Student** | Dashboard, my courses, live class join, recordings (auto-updated), video player (resume/speed/quality), notes & bookmarks, assignments/projects submit, doubt post, quizzes, progress %, certificate, downloads (PDF/assets), community, notifications, streak/badges |
| **Instructor/Mentor** | Host live class, schedule, upload lessons/content, review & grade project submissions, answer doubts, view batch analytics, announcements |
| **Admin** | Course builder, batch mgmt, students CRUD, payments+refunds, coupons (influencer link), staff/instructor mgmt, reports/revenue, bulk upload (CSV), content protection settings |
| **Parent** (optional/later) | Child progress report, attendance, performance emails |

### 5.2 Cross-cutting systems (har feature ko touch karte hain)

- **Payments & EMI** — Razorpay (UPI/card/EMI), invoices, coupons ↔ influencer promoCode, refunds (refund-policy page already hai)
- **Notifications** — Email (Resend) + WhatsApp/SMS (MSG91) + Web Push. Events: class reminder, "class live now", "recording ready", assignment due, project graded, test result
- **Content protection (DRM)** — student phone-number watermark overlay on video, signed expiring URLs, download-block, screen-record deterrent. **Phase 2-3 me hi zaroori** (piracy roke)
- **Analytics** — student progress, batch completion, instructor performance, revenue dashboards
- **Gamification** — streaks, badges/XP, leaderboard, rewards (retention ke liye)
- **Multi-language & a11y** — Hindi/English toggle, video captions/subtitles, quality selector (low-data mode)
- **Search & discovery** — course search, filters, categories

### 5.3 Skill-course specific (important for design/video/AI)

- **Project-based assignments** — student apna design/video submit kare (file upload to R2)
- **Portfolio builder** — completed projects se student ka public portfolio page
- **Peer review / feedback** on projects
- **Resource library** — brushes, presets, templates, sample files download
- **Software/tool guides** — Ps/Ai/Pr setup lessons

---

## 6. Build Phases (skill-course prioritized)

| Phase | Deliverable | Key work |
|---|---|---|
| **1. Foundation** | Student login + dashboard + enrollment | User/Role models, `studentAuth.ts` (OTP), dashboard UI, enroll API |
| **2. Content + Protection** | Course player + video + progress + basic DRM | Course builder (admin), HLS player (resume/speed/quality), LessonProgress, phone-number watermark, signed URLs |
| **3. Live + Auto-Recording** | Live class + recording auto-update | 100ms integration, schedule, join, webhook → auto lesson create |
| **4. Skill work** | Projects + submissions + doubt + notes | Project assignments, file upload, grading, doubt forum, notes/bookmarks |
| **5. Growth** | Payments + certificates + notifications | Razorpay + coupon↔influencer + refunds, cert PDF, reminders (WhatsApp/email) |
| **6. Engagement** | Portfolio + community + gamification + analytics | Portfolio pages, announcements, streaks/badges, dashboards |
| **7. Scale** | Multi-language, PWA/app, AI doubt-solver, advanced DRM | i18n, mobile, `ai-expert` real, quality/captions |

---

## 7. Environment Variables (naye)

```
DATABASE_URL=...                 # already
STUDENT_COOKIE_SECRET=...        # 32+ chars
HMS_ACCESS_KEY=...               # 100ms
HMS_SECRET=...
HMS_TEMPLATE_ID=...
HMS_WEBHOOK_SECRET=...
R2_ACCOUNT_ID=...  R2_ACCESS_KEY=...  R2_SECRET=...  R2_BUCKET=...
RAZORPAY_KEY_ID=...  RAZORPAY_SECRET=...  RAZORPAY_WEBHOOK_SECRET=...
RESEND_API_KEY=...   MSG91_AUTH_KEY=...
```

---

## 8. New Dependencies

```
@100mslive/server-sdk   @100mslive/react-sdk   # live classes
hls.js                                          # video player
razorpay                                        # payments
@aws-sdk/client-s3  @aws-sdk/s3-request-presigner # R2 uploads
resend                                          # email
jsonwebtoken                                    # 100ms auth tokens
zod                                             # API validation
```

---

## 9. Content Security / Anti-Piracy (Telegram leak roko) 🔒

> **India ki #1 ed-tech problem:** premium course Telegram pe ₹100-200 me bikte hain.
> **Honest truth:** 100% piracy koi nahi rok sakta — jo screen pe dikhe use camera/screen-record se copy kiya ja sakta hai.
> **Strategy:** "Layered defense" — chori itni **mushkil** aur itni **traceable** bana do ki (1) casual leak ruk jaye,
> (2) jo leak kare uska **exact phone number** pakda jaye. Traceability = sabse bada deterrent.

### 9.1 Encrypted, expiring video delivery (base layer)
- Video kabhi bhi ek simple downloadable `.mp4` URL na ho. **HLS streaming** — video chhote encrypted chunks (`.ts`/`fMP4`) me toota rehta hai.
- **Signed, short-expiry URLs** — har chunk ka URL 5-10 min me expire. URL copy karke share karo to kaam nahi karega.
- URL **user + IP + session bound** — dusre device pe wahi URL na chale.
- **AES-128 / DRM encryption** — chunks encrypted, key alag endpoint se milti hai (login + enrollment check ke baad). Advanced: **Widevine/FairPlay DRM** (Mux/Cloudflare Stream support karte hain) — isse browser khud download block karta hai.

### 9.2 Dynamic watermarking (sabse strong deterrent) ⭐
- Har video pe **student ka phone number + email** overlay — **halka, semi-transparent, screen pe move karta hua** (position har 10 sec me badle).
- Isse ye faayda: agar koi screen-record karke Telegram pe daale, to **recording me uska hi number chhpa hoga** → turant pata chal jayega kaun leak kar raha hai → account ban + legal action.
- Do tareeke: (a) **server-side burn-in** (permanent, sabse pukka) ya (b) **client-side moving overlay** (sasta, live class ke liye). Dono use karenge.
- Live class me bhi same watermark (100ms overlay support karta hai).

### 9.3 Device & session limits
- **1-2 device limit per account** — 3rd device login pe purana logout ya OTP verify. (Log/pass share karke gang chalana rok deta hai.)
- **Concurrent stream limit** — ek account se ek hi video ek time pe. 2 jagah chale to block.
- Naya device = **OTP verification** phone pe.
- Suspicious pattern detect (bahut zyada IP/city change) → auto-flag admin ko.

### 9.4 Download & screen-record deterrents
- **No download button** — sab streaming-only.
- **`oncontextmenu` disable, DevTools deterrent**, `Save-As` block (bypass ho sakta hai, par casual users rukte hain).
- Mobile app me **FLAG_SECURE** (Android) — screenshot/screen-record OS level pe block ho jaata hai. **Ye app me sabse powerful hai** (web me possible nahi).
- Web pe **Encrypted Media Extensions (EME) + DRM** — DRM content ko OS-level screen capture bhi black kar deta hai (Widevine L1).

### 9.5 Traceability & forensics (leak ke baad pakadna)
- Har video-play event log: `userId, IP, device, timestamp` → `VideoAccessLog` table.
- **Invisible forensic watermark** (advanced) — har user ki copy me imperceptible unique signature; leaked video milne pe usse trace kar sakte ho even agar visible watermark crop ho.
- **Telegram/web monitoring** — periodic search apne course naam ka; leak mile to visible watermark se number nikaalo → ban + FIR.

### 9.6 Legal + account layer
- Signup pe **T&C**: piracy = account ban + legal action (IT Act, Copyright Act).
- Leak detect → account permanent ban + blacklist device/phone.
- Ek "report piracy" button, aur DMCA-style takedown process Telegram ke liye.

### 9.7 New DB models (anti-piracy)
```prisma
model Device {
  id         String   @id @default(cuid())
  userId     String
  fingerprint String  // device hash
  lastIp     String?
  lastSeenAt DateTime @default(now())
  isBlocked  Boolean  @default(false)
  user       User     @relation(fields: [userId], references: [id])
  @@index([userId])
}

model VideoAccessLog {
  id        String   @id @default(cuid())
  userId    String
  lessonId  String
  ip        String?
  deviceId  String?
  createdAt DateTime @default(now())
  @@index([userId, lessonId])
}
```

### 9.8 Recommended stack for security
| Layer | Tool |
|---|---|
| Encrypted HLS + DRM | **Mux** ya **Cloudflare Stream** (Widevine/FairPlay built-in, signed URLs) |
| Watermark burn-in | FFmpeg (server) + 100ms overlay (live) |
| Device fingerprint | `@fingerprintjs/fingerprintjs` |
| Signed URLs | Short-lived JWT per chunk |
| Mobile screenshot block | React Native / Flutter `FLAG_SECURE` |

> **Realistic goal:** Mux/Cloudflare DRM + moving phone-number watermark + 2-device limit + access logs.
> Isse 95% casual piracy ruk jaati hai, aur jo bacha wo **traceable** ho jaata hai. Yahi PW/Unacademy bhi karte hain.

---

## 10. Additional Modules (business + production readiness)

> Ye "learning features" nahi hain, par ek real ed-tech **business** chalane ke liye utne hi zaroori hain.
> Log inhe bhool jaate hain aur baad me pachhtate hain.

### 10.1 Conversion funnel (lead → paid student) — connects existing lead/admission system
- **Free demo / trial class** — log free dekhein → paid me convert (biggest conversion lever)
- **Onboarding funnel** — lead → demo → counselor call → payment → active student
- **Abandoned cart recovery** — enroll kiya par pay nahi kiya → WhatsApp/email reminder
- **Sales counselor CRM** — existing `Lead`/`Admission` ko pipeline + follow-up + call-log de do (leads already DB me hain, sirf workflow add karna hai)

### 10.2 Career / Outcomes (skill-course ka main USP) ⭐
- **Placement assistance** — job board, apply, company referrals (`companies` page already marketing me hai — product me laao)
- **Freelance / gig board** — design/video/AI students ko real paying clients se connect
- **Resume builder + interview prep + mock interviews**
- **Portfolio → recruiter share** (portfolio builder section 5.3 se link)

### 10.3 Growth loops
- **Student referral program** — student apne dost ko laaye, dono ko reward (influencer system se alag)
- **In-product ratings & reviews** — real students course rate karein → marketing `reviews` page ko feed
- **Email drip / webinar / free masterclass** — lead-gen loops

### 10.4 Support
- **Help center / FAQ / chatbot**
- **Ticket system** — student issue raise + track + resolve

### 10.5 Offline (India low-data)
- **Encrypted offline download** — PW app jaisa: download hota hai par encrypted, sirf app ke andar chalta hai, bahar nahi. Piracy-safe.

### 10.6 Production-readiness & compliance (India)
- **GST invoicing** — legal requirement (invoices with GST)
- **DPDP Act 2023 compliance** — India data-privacy law (consent, data deletion, privacy policy — page already hai)
- **Monitoring & logging** — Sentry (error tracking), uptime alerts
- **Backups & disaster recovery** — DB + video backups, restore plan
- **Rate limiting & security** — OTP abuse block, DDoS, OWASP basics, brute-force protection
- **Admin audit logs** — kis staff ne kya badla (accountability)
- **CI/CD + automated tests** — safe deploys, regression na aaye

---

## 11. LMS ke ALAWA kya build karna hai (full product ecosystem)

> LMS = padhai ka engine. Par ek chalti company ke liye engine ke bahar bhi bahut kuch chahiye.
> Ye alag "systems" hain jo LMS ke around banenge.

### 11.1 Payment & checkout system 💳
- Razorpay full integration — UPI/card/**EMI/no-cost EMI**, order → verify → enroll
- Coupons/scholarships (influencer promoCode se link), part-payment, invoices+GST
- Refund workflow (refund-policy page already hai)
- **Note:** ye LMS ka hissa lagta hai par apne aap me ek bada independent system hai

### 11.2 Video infrastructure (sabse heavy, alag cheez) 🎬
- **Storage + CDN** — Cloudflare R2/Stream ya Mux (Vercel pe video host NAHI hota)
- **Encoding pipeline** — uploaded video → multiple qualities (240p-1080p) → HLS
- **DRM + watermark pipeline** (section 9)
- Ye LMS ki UI se alag, backend infra hai — sabse costly bhi

### 11.3 Notification infrastructure 🔔 (India me time lagta hai — jaldi shuru karo)
- **WhatsApp Business API** — approval me **hafte** lagte hain (Meta verification). Abhi apply karo.
- **SMS — DLT registration** (TRAI) — India me mandatory, **2-3 hafte** approval. Jaldi shuru karo.
- Email (Resend), Web Push — ye jaldi setup ho jaate hain

### 11.4 Mobile app / PWA 📱
- **PWA pehle** (sasta, web se ban jaata hai) — installable, push notifications
- **Native app baad me** (React Native/Flutter) — `FLAG_SECURE` screenshot-block ke liye zaroori (web me possible nahi)

### 11.5 Admin & operations tooling 🛠️
- Counselor CRM (leads → calls → conversion), support ticket desk
- Content team dashboard (video upload, course publish)
- Finance dashboard (revenue, refunds, payouts)

### 11.6 DevOps / hosting / scaling ⚙️
- Hosting: Vercel (app) + separate video infra + managed PostgreSQL (Neon/RDS)
- Backups, monitoring (Sentry), CI/CD, staging environment

### 11.7 Business / legal setup 📋 (code nahi, par blocker ban sakte hain)
- Payment gateway **KYC** (Razorpay business verification)
- **GST registration + invoicing**
- **DPDP Act 2023** — privacy compliance
- Company/T&C/refund legal docs (pages already hain)

### 11.8 Content creation (non-code, par product ki jaan) 🎥
- Actual course videos record karna, syllabus banana, notes/assets banana
- Bina real content ke platform khaali dabba hai — team/pipeline chahiye

---

## 12. SABSE IMPORTANT kya hai (priority order — ruthless ranking)

> Sab ek saath nahi banega. Ye exact order hai — upar se neeche.

| Rank | Kya | Kyun sabse pehle |
|------|-----|------------------|
| 🥇 **1** | **Student auth + dashboard + enrollment** (Phase 1) | Iske bina koi product hi nahi. Base. |
| 🥇 **2** | **Payment / checkout** (Razorpay) | Iske bina **revenue = 0**. Paisa yahin aata hai. |
| 🥇 **3** | **Video delivery + security** (Phase 2 + section 9) | Ye **asli value** hai + Telegram-leak protection. Core product. |
| 🥈 **4** | **Live class + auto-recording** (Phase 3) | Tumhari main demand + biggest differentiator. |
| 🥈 **5** | **Notification infra** (WhatsApp/SMS approval) | Approval me hafte lagte hain — **abhi apply karo** (code baad me). |
| 🥈 **6** | **Demo class + conversion funnel** | Leads ko paying students banata hai (existing lead system + isse jodo). |
| 🥉 **7** | Projects + doubt + certificates (Phase 4) | Engagement + completion. |
| 🥉 **8** | Career/placement/freelance | Skill-course ka USP, retention aur naam. |
| 🥉 **9** | Portfolio, community, gamification, analytics | Polish + retention. |
| 🥉 **10** | PWA/app, i18n, AI features | Scale stage. |

### Parallel-track (code se pehle shuru karo, warna baad me atkoge):
- ⏳ WhatsApp Business API + SMS DLT registration (hafte lagte)
- ⏳ Razorpay business KYC
- ⏳ GST + DPDP compliance
- ⏳ Course content recording (team)

---

## 13. Recommended Start

Phase 1 se shuru — Student auth + DB migration + dashboard + enrollment.
Ye ban gaya to LMS "jinda" ho jaata hai; phir Payment → Phase 2 (content+DRM) → Phase 3 (live+recording).

**Skill-course note:** exam-style test series / All-India-rank ki zaroorat nahi (wo exam-prep platforms ke liye hai).
Yahan focus **projects, portfolio, recordings, live doubt, certificates** pe hai.

**Security note:** anti-piracy (section 9) ko Phase 2 (content delivery) ke saath hi build karenge — video system banate waqt hi
DRM + watermark + signed URLs daal denge, baad me retrofit karna mushkil hota hai.
