const fs = require('fs');
const path = require('path');

const topics = [
  { intent: "chatgpt-prompts", name: "ChatGPT Prompts" },
  { intent: "ai-video-editing", name: "AI Video Editing" },
  { intent: "ai-resume-maker", name: "AI Resume Maker" },
  { intent: "ai-image-generator", name: "AI Image Generator" },
  { intent: "online-earning-using-ai", name: "AI Se Paise Kaise Kamaye" },
  { intent: "best-ai-tools", name: "Best AI Tools" },
  { intent: "ai-voice-generator", name: "Free AI Voice Generator" },
  { intent: "ai-logo-maker", name: "Free AI Logo Maker" }
];

const audiences = [
  { slug: "for-students", hindi: "Students Ke Liye" },
  { slug: "for-youtube", hindi: "YouTube Creators Ke Liye" },
  { slug: "for-freelancers", hindi: "Freelancers Ke Liye" },
  { slug: "for-instagram-reels", hindi: "Instagram Reels Ke Liye" },
  { slug: "without-investment", hindi: "Bina Investment Ke" },
  { slug: "in-mobile", hindi: "Mobile Se" }
];

const results = [];

topics.forEach(topic => {
  audiences.forEach(audience => {
    const slug = `${topic.intent}-${audience.slug}-in-hindi`;
    
    results.push({
      slug: slug,
      title: `${topic.name} ${audience.hindi} (2026 Secret Tricks)`,
      description: `Janiye kaise ${audience.hindi} ${topic.name} ka practical use karke daily grow kar sakte hain. Join our free Hindi AI Masterclass.`,
      topicKey: topic.name,
      audienceKey: audience.hindi
    });
  });
});

const outputPath = path.join(__dirname, '../data/generated-hindi.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

console.log(`✅ HINDI SEO ENGINE READY: Generated ${results.length} Highly-Searched Desi Keywords!`);
