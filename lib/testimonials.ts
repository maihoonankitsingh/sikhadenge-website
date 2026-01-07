// lib/testimonials.ts

export type VideoSource = "youtube" | "mp4";

export type TestimonialVideo = {
  id: string;
  studentName: string;
  course?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source: VideoSource;

  // If source = "youtube": put full YouTube video URL (watch or youtu.be)
  youtubeUrl?: string;

  // If source = "mp4": put public mp4 path (e.g. /videos/reviews/a1.mp4)
  mp4Url?: string;

  // Optional: short neutral note (not marketing)
  note?: string;

  // Optional: thumbnail path if you have one (recommended for performance)
  thumbnail?: string; // e.g. /images/reviews/a1.webp
};

export const testimonialVideos: TestimonialVideo[] = [
  {
    id: "rv1",
    studentName: "Student 1",
    course: "Graphic Design",
    rating: 5,
    source: "youtube",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
    note: "Project feedback was clear.",
    thumbnail: "/images/reviews/rv1.webp",
  },
  {
    id: "rv2",
    studentName: "Student 2",
    course: "Video Editing",
    rating: 4,
    source: "mp4",
    mp4Url: "/videos/reviews/rv2.mp4",
    note: "Daily practice helped.",
    thumbnail: "/images/reviews/rv2.webp",
  },
];

