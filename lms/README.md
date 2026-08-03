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
├── components/          # LMS ke React UI components (reusable)
│   └── VideoPlayer.tsx  # hls.js player + resume + speed + watermark (anti-piracy)
└── services/            # asli business logic (DB queries yahin, HTTP nahi)
    ├── users.ts         # signupStudent, loginStudent
    ├── courses.ts       # listCoursesForStudent
    ├── enrollment.ts    # enrollStudent
    ├── content.ts       # getCourseContentForStudent (enrolled tree + progress)
    ├── progress.ts      # saveProgress (resume + mark complete)
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

### Routes map
| Route | Kya |
|---|---|
| `pages/api/student/content/[slug]` | enrolled course ka content + progress |
| `pages/api/student/progress` | progress save |
| `pages/api/admin/lms/courses` | list / create course |
| `pages/api/admin/lms/course/[id]` | course tree / update (publish, price) |
| `pages/api/admin/lms/module` | module create / delete |
| `pages/api/admin/lms/lesson` | lesson create / delete |

## Aage kya aayega (usi structure me plug hoga)

- Phase 3: `services/live.ts` (100ms live class), recording webhook → auto lesson
- Phase 4: `services/quiz.ts`, `services/assignment.ts`, doubt
- Phase 5: `services/payments.ts` (Razorpay) — `enrollment.ts` ka paid-course TODO yahin judega

> Poora roadmap: `docs/LMS-BUILD-PLAN.md`
