export const SESSION_COOKIE = "sd_session";
export const SESSION_TTL_DAYS = 14;

export const OTP_TTL_MINUTES = 10;
export const OTP_MAX_ATTEMPTS = 5;

export const ROLE_KEYS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
  TUTOR: "TUTOR",
  STUDENT: "STUDENT",
  AFFILIATE: "AFFILIATE",
} as const;

export type RoleKey = (typeof ROLE_KEYS)[keyof typeof ROLE_KEYS];
