// =============================================================
// LMS shared types — ek hi jagah, poore LMS me reuse hote hain.
// Naya feature banao to iske types yahin add karo.
// =============================================================

export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";

/** Client ko safe bhejne wala user shape (passwordHash kabhi expose na karo). */
export type PublicUser = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: Role;
  avatarUrl?: string | null;
};

export type CourseCard = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  priceInr: number;
  enrollmentStatus?: string;
  _count?: { modules: number };
};

/**
 * Har service function isi shape me result deta hai — route bas isko
 * HTTP me convert karta hai. Isse business logic aur HTTP alag rehte hain.
 */
export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string };

export function serviceOk<T>(data: T): ServiceResult<T> {
  return { ok: true, data };
}

export function serviceFail<T = never>(status: number, error: string): ServiceResult<T> {
  return { ok: false, status, error };
}
