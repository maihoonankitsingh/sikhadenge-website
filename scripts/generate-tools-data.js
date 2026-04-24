const fs = require('fs');
const path = require('path');

const tools = [
  { name: 'AI Resume Builder', task: ' ATS-friendly Resumes', icon: 'FileText', desc: 'Generate highly optimized, interview-winning professional resumes instantly.' },
  { name: 'AI Email Writer', task: 'Professional Emails', icon: 'Mail', desc: 'Draft highly converting, context-aware corporate emails with perfect tone.' },
  { name: 'AI Cover Letter Generator', task: 'Cover Letters', icon: 'File', desc: 'Create personalized, job-specific cover letters in less than 3 seconds.' },
  { name: 'AI Logo Prompt Generator', task: 'Midjourney Prompts', icon: 'Image', desc: 'Get perfect prompt structures to generate breathtaking AI logos.' },
  { name: 'AI SEO Article Writer', task: 'SEO Ranking Blogs', icon: 'Globe', desc: 'Write plagiarism-free, highly engaging Google-ranking blog content.' },
  { name: 'AI YouTube Script Writer', task: 'Viral Video Scripts', icon: 'Youtube', desc: 'Generate highly engaging hook, body, and CTA structures for videos.' },
  { name: 'AI Instagram Caption Writer', task: 'Viral Captions', icon: 'Instagram', desc: 'Write aesthetic captions with highly converting hashtag strategies.' },
  { name: 'AI Business Plan Generator', task: 'Startup Roadmaps', icon: 'Briefcase', desc: 'Create a complete 12-month automated business roadmap for your startup.' },
  { name: 'AI Code Reviewer', task: 'Optimized Code', icon: 'Code', desc: 'Find hidden bugs and optimize lines of code securely in seconds.' },
  { name: 'AI Ad Copy Generator', task: 'Sales Ad Copies', icon: 'Megaphone', desc: 'Write Facebook and Google Ads using highly persuasive psychological frameworks.' }
];

let allTools = [];
function sanitize(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

tools.forEach(t => {
  allTools.push({
    slug: `${sanitize(t.name)}`,
    title: `Free ${t.name} Online (2026 Updated) | Sikhadenge`,
    name: t.name,
    task: t.task,
    description: t.desc,
  });
});

const outputPath = path.join(__dirname, '../data/generated-mini-tools.json');
fs.writeFileSync(outputPath, JSON.stringify(allTools, null, 2));
console.log(`🚀 TOOL ENGINE GENERATED ${allTools.length} SAAS TOOLS!`);
