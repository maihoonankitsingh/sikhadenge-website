const fs = require('fs');
const path = require('path');

const tools = ['ChatGPT', 'Midjourney', 'Claude', 'Gemini', 'Canva AI', 'Copilot', 'Perplexity', 'Notion AI'];

const professions = [
  'Teachers', 'Students', 'Digital Marketers', 'Lawyers', 'Doctors', 
  'Real Estate Agents', 'Salesmen', 'HR Managers', 'Software Engineers', 
  'Graphic Designers', 'Business Owners', 'Freelancers', 'YouTubers',
  'Data Analysts', 'Product Managers', 'Accountants', 'Architects', 
  'Copywriters', 'SEO Experts', 'Social Media Managers', 'Video Editors', 
  'Photographers', 'Consultants', 'Virtual Assistants', 'UI UX Designers'
];

const tasks = [
  'Resume Writing', 'Email Writing', 'Content Creation', 'SEO', 
  'Instagram Posts', 'Logo Design', 'Data Analysis', 'Coding', 
  'Copywriting', 'Presentation Making', 'Homework', 'Lead Generation', 
  'Video Scripting', 'Story Writing', 'Ad Campaigns', 'Blog Writing', 
  'Landing Page Copy', 'Cold Emailing', 'LinkedIn Outreach', 'Facebook Ads',
  'Youtube Thumbnails', 'Client Pitching', 'Market Research', 'Brand Strategy'
];

let allPrompts = [];
function sanitize(str) { 
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); 
}

tools.forEach(tool => {

  // Logic 1: Tool + Profession (e.g. ChatGPT Prompts for Students)
  professions.forEach(prof => {
    allPrompts.push({
      slug: `${sanitize(tool)}-prompts-for-${sanitize(prof)}`,
      title: `Best ${tool} Prompts for ${prof} (2026 Updated)`,
      description: `Copy and paste these highly effective ${tool} prompts specifically designed for ${prof}. Save hours of work and boost your productivity instantly.`,
      target: prof,
      tool: tool,
      type: 'profession'
    });
  });

  // Logic 2: Tool + Task (e.g. ChatGPT Prompts for Resume Writing)
  tasks.forEach(task => {
    allPrompts.push({
      slug: `${sanitize(tool)}-prompts-for-${sanitize(task)}`,
      title: `${tool} Prompts for ${task} | Copy & Paste Template`,
      description: `Looking for the perfect prompt to handle ${task}? Here are the most advanced ${tool} prompts you can directly copy and paste for free.`,
      target: task,
      tool: tool,
      type: 'task'
    });
  });

  // Logic 3: LONG TAIL GOLD (Tool + Task + Profession) 
  // Limit to only highly relevant combinations to maintain quality (e.g., first 10 tasks × first 10 professions)
  const topTasks = tasks.slice(0, 15);
  const topProfessions = professions.slice(0, 15);

  topTasks.forEach(task => {
    topProfessions.forEach(prof => {
       allPrompts.push({
          slug: `${sanitize(tool)}-prompts-for-${sanitize(task)}-for-${sanitize(prof)}`,
          title: `${tool} Prompts for ${task} for ${prof} | 2026 Guide`,
          description: `Are you a ${prof} struggling with ${task}? Copy and paste these advanced ${tool} workflows to automate your work completely free.`,
          target: `${task} specifically designed for ${prof}`,
          tool: tool,
          type: 'long-tail'
       });
    });
  });

});

const outputPath = path.join(__dirname, '../data/generated-prompts.json');
fs.writeFileSync(outputPath, JSON.stringify(allPrompts, null, 2));

console.log(`🚀 MASSIVE SCALE COMPLETE! Generated ${allPrompts.length} URLs in the Prompt Engine!`);
