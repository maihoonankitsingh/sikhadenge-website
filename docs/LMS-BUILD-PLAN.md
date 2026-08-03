# Sikhadenge — Advanced LMS Build Plan

> **Goal:** BYJU'S / upGrad / PhysicsWallah jaisa professional LMS.
> Live classes, recordings, student dashboard, auto-recording updates, assessments, certificates.
>
> **Streaming choice:** [100ms](https://www.100ms.live) (recording built-in, India-based, LMS-grade).
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

## 5. Build Phases (sequence)

| Phase | Deliverable | Key work |
|---|---|---|
| **1. Foundation** | Student login + dashboard + enrollment | User/Role models, `studentAuth.ts`, dashboard UI, enroll API |
| **2. Content** | Course player + video + progress | Course builder (admin), HLS player, LessonProgress, resume |
| **3. Live + Recording** | Live class + auto-recording | 100ms integration, schedule, join, webhook auto-update |
| **4. Assessment** | Quiz + assignment + attendance | Quiz engine, submissions, grading, attendance |
| **5. Growth** | Payments + certificates + notifications | Razorpay, coupon↔influencer, cert PDF, reminders |
| **6. Scale** | Analytics, gamification, AI, DRM, PWA | Dashboards, leaderboard, doubt-AI, video protection |

---

## 6. Environment Variables (naye)

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

## 7. New Dependencies

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

## 8. Recommended Start

Phase 1 se shuru — Student auth + DB migration + dashboard + enrollment.
Ye ban gaya to LMS "jinda" ho jaata hai; phir Phase 2 (content) aur Phase 3 (live) layer-by-layer.
