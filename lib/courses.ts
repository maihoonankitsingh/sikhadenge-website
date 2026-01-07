// lib/courses.ts

export type Course = {
  slug: string;
  category: string;
  title: string;
  durationText: string;
  hoursText: string;
  startText: string;
  coverImage: string; // public path
};

export const courses: Course[] = [
  {
    slug: "ai-powered-graphic-design",
    category: "Graphic Design",
    title: "AI Powered Graphic Design",
    durationText: "4 Months",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/ai-powered-graphic-design.webp",
  },
  {
    slug: "ai-powered-video-editing",
    category: "Video Editing",
    title: "AI Powered Video Editing",
    durationText: "4 Months",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/ai-powered-video-editing.webp",
  },
  {
    slug: "ai-powered-graphic-design-video-editing",
    category: "Combined",
    title: "AI Powered Graphic Design + Video Editing",
    durationText: "4 Months",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/ai-powered-graphic-design-video-editing.webp",
  },
  {
    slug: "motion-graphics",
    category: "Motion Graphics",
    title: "Motion Graphics",
    durationText: "6 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/motion-graphics.webp",
  },
  {
    slug: "ui-ux-design",
    category: "UI/UX",
    title: "UI/UX Design",
    durationText: "4 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/ui-ux-design-cover.webp",
  },
  {
    slug: "branding",
    category: "Foundations",
    title: "Branding",
    durationText: "3 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/branding.webp",
  },
  {
    slug: "color-theory",
    category: "Foundations",
    title: "Color Theory",
    durationText: "2 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/color-theory.webp",
  },
  {
    slug: "typography",
    category: "Foundations",
    title: "Typography",
    durationText: "2 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/typography.webp",
  },
  {
    slug: "ai-mastery-design-editing",
    category: "AI",
    title: "AI Mastery in Design & Editing",
    durationText: "4 Weeks",
    hoursText: "2 hrs/day",
    startText: "Next batch soon",
    coverImage: "/images/courses/ai-mastery-design-editing-cover.webp",
  },
];

// Canonical helpers
export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | null {
  return courses.find((c) => c.slug === slug) ?? null;
}

export function getCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}

// Backward-compatible alias (in case any file still imports COURSES)
export const COURSES = courses;



