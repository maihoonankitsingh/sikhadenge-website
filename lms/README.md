# LMS Module (`/lms`)

> Sikhadenge ka **poora LMS ka dimaag (business logic) yahin** rehta hai — marketing
> site se bilkul **alag**. Kuch bhi add/edit karna ho to yahin dekho.

## Folder ka matlab (kya kahan hai)

```
lms/
├── README.md            # ye file — poora map
├── types.ts             # shared TypeScript types + ServiceResult helpers
├── http.ts              # API route helpers (methodGuard, sendOk, sendFail, normPhone)
├── auth.ts              # student session (login cookie banana/clear/verify)
├── hms.ts               # 100ms helper (room, room-codes, prebuilt URL, webhook verify)
├── razorpay.ts          # Razorpay helper (order create REST + signature verify)
├── notify.ts            # notification helper: in-app + optional email(Resend)/WhatsApp
├── components/          # LMS ke React UI components (reusable)
│   ├── VideoPlayer.tsx  # hls.js player + resume + speed + watermark (anti-piracy)
│   ├── CheckoutModal.tsx# Razorpay checkout (coupon + pay + verify)
│   ├── QuizPanel.tsx    # student: quiz lena + auto-grade result
│   ├── AssignmentPanel.tsx # student: project/assignment submit + grade dekhna
│   ├── QuizEditor.tsx   # admin: quiz questions add/delete
│   ├── AssignmentEditor.tsx # admin: assignment instructions + due date
│   └── DoubtsPanel.tsx  # student: course doubts (ask / reply / resolve)
└── services/            # asli business logic (DB queries yahin, HTTP nahi)
    ├── users.ts         # signupStudent, loginStudent
    ├── courses.ts       # listCoursesForStudent
    ├── enrollment.ts    # enrollStudent (free courses)
    ├── content.ts       # getCourseContentForStudent (enrolled tree + progress)
    ├── progress.ts      # saveProgress (resume + mark complete)
    ├── live.ts          # live class: batch, schedule, join, webhook auto-recording
    ├── payments.ts      # createCourseOrder (coupon) + verifyAndEnroll (paid courses)
    ├── quiz.ts          # quiz: get (no answers), auto-grade attempt, admin questions
    ├── assignments.ts   # assignment: get, submit, admin update + grade submissions
    ├── doubts.ts        # doubts: list/post/reply/resolve; admin staff-reply
    ├── certificates.ts  # course 100% -> auto-issue; list mine; public verify
    ├── notifications.ts # in-app notifications list + mark read
    ├── portfolio.ts     # public portfolio: profile, showcase projects, certs
    └── admin/
        └── courses.ts   # course-builder: create/update/publish course, module, lesson
```

Routes aur UI Next.js ke rule ki wajah se `pages/` me rehte hain (waha se move nahi
kar sakte), par wo **patle (thin)** hain — sirf `lms/` ko call karte hain:

```
pages/api/student/*.ts   # API endpoints — har ek 8-12 lines, service ko call karta hai
pages/student/*.tsx      # UI — login/signup screen + dashboard
```

## Layers (data ek hi direction me behta hai)

```
UI (pages/student)  ──fetch──▶  API route (pages/api/student)  ──▶  service (lms/services)  ──▶  Prisma ──▶  DB
                                        │
                                        └── auth.ts (session check) + http.ts (response banana)
```

**Golden rule:**
- **DB queries + business rules** → sirf `lms/services/` me.
- **HTTP cheezein** (status code, cookie, method check) → `lms/http.ts` + `lms/auth.ts`.
- **Route file** → sirf glue: `guard → service call → send response`. Isme logic mat likho.
- Ye separation isliye — logic ek jagah, test/reuse aasan, future edit clear.

## Naya feature kaise add karein (recipe)

Maan lo "student progress save karna" add karna hai:

1. **Service banao** → `lms/services/progress.ts` me `saveProgress(userId, lessonId, pos)` (DB logic).
2. **Type chahiye to** `lms/types.ts` me add karo.
3. **Route banao** → `pages/api/student/progress.ts` (thin wrapper, service ko call).
4. **UI se call** → `pages/student/...` me `fetch("/api/student/progress")`.

Bas — har layer alag, kahin bhi confusion nahi.

## Response format (poore LMS me same)

- Success: `{ ok: true, ...data }`
- Error:   `{ ok: false, error: "message" }` + sahi HTTP status

Har service `ServiceResult<T>` return karta hai (`{ ok, data }` ya `{ ok, status, error }`),
route usko `sendOk` / `sendFail` se HTTP me badal deta hai.

## Import alias

`tsconfig.json` me `@lms/*` alias hai → `import { requireStudent } from "@lms/auth"`.
(Abhi routes relative path use karte hain kyunki wo `lms/` ke bahar hain; naye code me
alias use kar sakte ho.)

## Abhi kya bana hai (Phase 1 + Phase 2)

**Phase 1 — auth & enrollment**
- ✅ Student signup / login (email ya phone) / logout / me
- ✅ Course listing (enrolled vs available)
- ✅ Free enrollment (paid course payment tak blocked)
- ✅ Student dashboard UI

**Phase 2 — content delivery**
- ✅ Admin course-builder: course → module → lesson banana + publish (`/admin/lms`)
- ✅ Student learn page: video player + module sidebar + progress (`/student/learn/[slug]`)
- ✅ Video player: HLS/mp4, resume, playback speed, **moving phone-number watermark** (anti-piracy)
- ✅ Progress tracking: resume from last position + mark complete + course %

**Phase 3 — live classes + auto-recording (100ms)**
- ✅ Admin: batch banao → live class schedule karo → host se Start/Join → End
- ✅ Student dashboard: "Live & Upcoming Classes" + Join button + attendance
- ✅ **Auto-recording:** class end → 100ms webhook → recording apne aap "Class Recordings"
  module me `LIVE_RECORDING` lesson ban jaati hai (bina manual upload)

**Phase 5 — payments (Razorpay)**
- ✅ Paid course → CheckoutModal → Razorpay → signature verify → auto-enroll
- ✅ Free course direct enroll; paid course sirf verified payment ke baad
- ✅ Coupon = influencer promo code → discount (REFERRAL_DISCOUNT_PERCENT, default 10%)
- ✅ Har payment DB me record (created/paid/failed) + attribution (couponCode)

**Phase 4 — assessment (quiz + assignment)**
- ✅ Quiz: QUIZ lesson me MCQ, learn-page pe attempt, **auto-grade** + pass/fail,
  correct answers submit ke baad reveal (pehle nahi — cheating roke)
- ✅ Assignment: ASSIGNMENT lesson me student file-link/text submit kare
- ✅ Admin: course-builder me quiz questions + assignment details; `/admin/lms/submissions`
  pe grade + feedback do

**Phase 4b — doubts / discussion**
- ✅ Student learn page pe "Doubts & Discussion": doubt pucho, reply karo, apna resolve karo
- ✅ Peer replies + **Team (staff) replies highlighted**; staff reply se doubt resolved
- ✅ Admin `/admin/lms/doubts` pe answer + resolve (filter: open/resolved/all)

**Phase 6 — certificates + notifications**
- ✅ Course 100% complete → certificate **auto-issue** (unique serial)
- ✅ Public verify + printable page: `/certificate/[serial]`
- ✅ In-app notifications (bell + list, mark read) — enroll, payment, recording ready,
  grade, doubt answered, certificate
- ✅ notify() se optional **email (Resend)** + **WhatsApp (Meta Cloud API)** (keys ho to)

**Phase 7 — portfolio (skill-course USP)**
- ✅ Student apna **public portfolio** banaye: `/portfolio/<handle>` (handle, headline, bio)
- ✅ Graded projects me se choose karke showcase; certificates auto-shown
- ✅ Public/private toggle; recruiter/client ko link bhej sake
- ✅ Editor: `/student/portfolio` (dashboard header se link)

### Routes map
| Route | Kya |
|---|---|
| `pages/api/student/content/[slug]` | enrolled course ka content + progress |
| `pages/api/student/progress` | progress save |
| `pages/api/student/live` | student ki live/upcoming classes |
| `pages/api/student/live/[id]/join` | join URL + attendance |
| `pages/api/admin/lms/courses` | list / create course |
| `pages/api/admin/lms/course/[id]` | course tree / update (publish, price) |
| `pages/api/admin/lms/module` | module create / delete |
| `pages/api/admin/lms/lesson` | lesson create / delete |
| `pages/api/admin/lms/batch` | batch list / create |
| `pages/api/admin/lms/live` | schedule / host-join / end |
| `pages/api/webhooks/hms` | 100ms recording-ready → auto lesson |
| `pages/api/student/payment/create-order` | Razorpay order (coupon apply) |
| `pages/api/student/payment/verify` | signature verify → enroll |
| `pages/api/student/quiz/[lessonId]` | quiz get (no answers) / submit attempt |
| `pages/api/student/assignment/[lessonId]` | assignment get / submit |
| `pages/api/admin/lms/quiz` | admin quiz question add / delete |
| `pages/api/admin/lms/assignment` | admin assignment create / update |
| `pages/api/admin/lms/submissions` | admin submissions list / grade |
| `pages/api/student/doubts` | doubts list / post |
| `pages/api/student/doubts/[id]/reply` | reply / resolve own doubt |
| `pages/api/admin/lms/doubts` | admin list / staff-reply / resolve |
| `pages/api/student/notifications` | in-app notifications list / mark read |
| `pages/api/student/certificates` | my certificates |
| `pages/api/certificate/[serial]` | **public** certificate verify |
| `pages/api/student/portfolio` | portfolio get / update / toggle showcase |
| `pages/api/portfolio/[handle]` | **public** portfolio by handle |

### Phase 3 env (100ms) — ye set karo warna live provision nahi hoga
```
HMS_ACCESS_KEY=...      HMS_SECRET=...      HMS_TEMPLATE_ID=...
HMS_SUBDOMAIN=yourname.app.100ms.live      HMS_WEBHOOK_SECRET=...(optional)
```
> 100ms template me **recording enabled** hona chahiye. Webhook URL:
> `https://<domain>/api/webhooks/hms`. Keys na ho to bhi scheduling chalti hai
> (room provision skip ho jaata hai).

### Phase 5 env (Razorpay)
```
RAZORPAY_KEY_ID=...    RAZORPAY_SECRET=...
REFERRAL_DISCOUNT_PERCENT=10   # optional, coupon discount %
```
> Keys na ho to paid course checkout "Payments not configured" dega
> (free course tab bhi enroll hota hai).

### Phase 6 env (notifications — sab optional; in-app hamesha chalta hai)
```
RESEND_API_KEY=...   EMAIL_FROM="Sikhadenge <noreply@sikhadenge.com>"
WHATSAPP_TOKEN=...   WHATSAPP_PHONE_ID=...
```
> Keys na ho to sirf in-app notification banti hai (email/WhatsApp skip).

## Aage kya aayega (usi structure me plug hoga)

- Portfolio (completed projects → public page), analytics dashboard, gamification
- Prod: recording presigned URL ko apne storage (R2/S3) me copy (live.ts me note);
  Razorpay webhook (idempotent); live-class reminder cron (notify before class)

> Poora roadmap: `docs/LMS-BUILD-PLAN.md`
