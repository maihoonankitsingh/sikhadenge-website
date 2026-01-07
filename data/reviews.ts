export type VideoReview = { title: string; src?: string; poster?: string };
export type TextReview = { name: string; role: string; text: string };

export const videoReviews: VideoReview[] = [
  // TODO: paste the same items used on /reviews page
  { title: "Learner Review 01", poster: "/images/reviews/poster-1.jpg" },
  { title: "Learner Review 02", poster: "/images/reviews/poster-2.jpg" },
  { title: "Learner Review 03", poster: "/images/reviews/poster-3.jpg" },
  { title: "Learner Review 04", poster: "/images/reviews/poster-4.jpg" },
];

export const textReviews: TextReview[] = [
  // TODO: paste the same items used on /reviews page
  { name: "Student (Batch 23)", role: "Graphic Design", text: "Structured classes + daily practice. Portfolio output was clear and measurable." },
  { name: "Student (Batch 21)", role: "Video Editing", text: "Industry tools only. Feedback loop was fast, and projects improved week-by-week." },
  { name: "Student (Batch 19)", role: "Motion Graphics", text: "Good pacing. Concepts were explained with practical tasks, not theory-heavy." },
  { name: "Student (Batch 24)", role: "Beginner", text: "Support was consistent. I could track progress using assignments and reviews." },
];
