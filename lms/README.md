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
└── services/            # asli business logic (DB queries yahin, HTTP nahi)
    ├── users.ts         # signupStudent, loginStudent
    ├── courses.ts       # listCoursesForStudent
    └── enrollment.ts    # enrollStudent
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

## Abhi kya bana hai (Phase 1)

- ✅ Student signup / login (email ya phone) / logout / me
- ✅ Course listing (enrolled vs available)
- ✅ Free enrollment (paid course payment tak blocked)
- ✅ Student dashboard UI

## Aage kya aayega (usi structure me plug hoga)

- Phase 2: `services/lessons.ts`, `services/progress.ts`, video player, admin course-builder
- Phase 3: `services/live.ts` (100ms), recording webhook → auto lesson
- Phase 5: `services/payments.ts` (Razorpay) — `enrollment.ts` ka paid-course TODO yahin judega

> Poora roadmap: `docs/LMS-BUILD-PLAN.md`
