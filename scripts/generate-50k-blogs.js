const fs = require('fs');
const path = require('path');

// Preserve existing blogs
const existingPath = path.join(__dirname, '../data/blogs.json');
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
} catch (e) {}

const existingSlugs = new Set(existing.map((b) => b.slug));

const categories = [
  "AI Skills", "AI Tools", "AI Career", "AI Freelancing", "AI Content Creation",
  "AI Video Editing", "AI Graphic Design", "AI Marketing", "AI Automation", "AI Business",
  "ChatGPT", "Gemini AI", "Claude AI", "Midjourney", "Canva AI",
  "Prompt Engineering", "Data Analysis", "AI Coding", "AI Writing", "AI Education",
  "AI Social Media", "AI eCommerce", "AI Finance", "Digital Marketing", "AI Productivity"
];

const actions = [
  "How to Learn", "Best Tools for", "Complete Guide to", "Top Tips for",
  "Common Mistakes in", "Benefits of", "Career Options in", "Jobs in",
  "Essential Skills for", "Future of", "Salary Guide for", "Best Courses for",
  "Freelancing with", "Business Ideas Using", "Side Hustle with",
  "Money Making with", "Portfolio Building for", "Interview Questions for",
  "Resume Tips for", "Best Projects in", "Workflow Automation with",
  "Templates for", "Prompts for", "Trends in", "Step by Step Tutorial for",
  "Free Resources for", "Paid vs Free in", "Pros and Cons of",
  "Best Practices in", "Roadmap for", "Certification in", "Case Studies in",
  "Examples of", "Beginner Mistakes in", "Advanced Techniques in",
  "How to Start", "How to Master", "How to Earn with", "How to Get Clients with",
  "How to Grow Using"
];

// Cleaned audience set for better slug consistency
const audiences = [
  { slug: "students", label: "Students" },
  { slug: "beginners", label: "Beginners" },
  { slug: "freelancers", label: "Freelancers" },
  { slug: "business-owners", label: "Business Owners" },
  { slug: "marketers", label: "Marketers" },
  { slug: "designers", label: "Designers" },
  { slug: "developers", label: "Developers" },
  { slug: "content-creators", label: "Content Creators" },
  { slug: "youtubers", label: "YouTubers" },
  { slug: "teachers", label: "Teachers" },
  { slug: "working-professionals", label: "Working Professionals" },
  { slug: "job-seekers", label: "Job Seekers" },
  { slug: "entrepreneurs", label: "Entrepreneurs" },
  { slug: "startups", label: "Startups" },
  { slug: "small-business-owners", label: "Small Business Owners" },
  { slug: "women", label: "Women" },
  { slug: "college-students", label: "College Students" },
  { slug: "remote-workers", label: "Remote Workers" },
  { slug: "agencies", label: "Agencies" },
  { slug: "coaches", label: "Coaches" },
  { slug: "hr-professionals", label: "HR Professionals" },
  { slug: "sales-teams", label: "Sales Teams" },
  { slug: "consultants", label: "Consultants" },
  { slug: "video-editors", label: "Video Editors" },
  { slug: "instagram-creators", label: "Instagram Creators" }
];

// IMPORTANT:
// Keep only ONE canonical version.
// No duplicate year-variant generation.
const modifiers = [
  { slug: "", label: "" }
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const readTimes = ["5 min read", "6 min read", "7 min read", "8 min read", "9 min read", "10 min read"];
const newBlogs = [];
const slugSet = new Set(existingSlugs);

categories.forEach((category) => {
  actions.forEach((action) => {
    audiences.forEach((audience) => {
      modifiers.forEach((modifier) => {
        const title = `${action} ${category} for ${audience.label}${modifier.label}`;
        const slug = slugify(title);

        if (slugSet.has(slug)) return;
        slugSet.add(slug);

        newBlogs.push({
          slug,
          title,
          excerpt: `Practical guide on ${action.toLowerCase()} ${category.toLowerCase()} for ${audience.label.toLowerCase()}${modifier.label}. Step-by-step framework with real use cases.`,
          category,
          readTime: readTimes[Math.floor(Math.random() * readTimes.length)]
        });
      });
    });
  });
});

// Merge: existing first, then new
const merged = [...existing, ...newBlogs];

fs.writeFileSync(existingPath, JSON.stringify(merged, null, 2));

console.log('');
console.log('✅ BLOG GENERATOR UPDATED');
console.log(`Existing blogs preserved: ${existing.length}`);
console.log(`New blogs generated: ${newBlogs.length}`);
console.log(`Total blogs in database: ${merged.length}`);
console.log(`File size: ${(fs.statSync(existingPath).size / 1024 / 1024).toFixed(2)} MB`);
console.log('Canonical mode: ONLY base slug generation enabled');
