const fs = require('fs');
const path = require('path');

const tools = ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Canva AI', 'Copilot', 'Notion AI'];
const tasks = [
  'Coding', 'Resume Writing', 'Data Analysis', 'SEO Content', 
  'Email Writing', 'Logo Design', 'Video Scripting', 'Story Writing',
  'Copywriting', 'Ad Campaigns', 'Landing Pages', 'Business Plans',
  'Financial Modeling', 'Legal Documents', 'Academic Research', 
  'Presentation Making', 'Instagram Growth', 'Client Pitching'
];

let allCompares = [];
function sanitize(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

for (let i = 0; i < tools.length; i++) {
  for (let j = i + 1; j < tools.length; j++) {
    tasks.forEach(task => {
      allCompares.push({
        slug: `${sanitize(tools[i])}-vs-${sanitize(tools[j])}-for-${sanitize(task)}`,
        title: `${tools[i]} vs ${tools[j]} for ${task} (2026 Full Review)`,
        toolA: tools[i],
        toolB: tools[j],
        task: task,
        description: `Detailed, unbiased comparison between ${tools[i]} and ${tools[j]} to find the best AI specifically for ${task}.`
      });
    });
  }
}

const outputPath = path.join(__dirname, '../data/generated-vs.json');
fs.writeFileSync(outputPath, JSON.stringify(allCompares, null, 2));
console.log(`🚀 VS ENGINE READY: Generated ${allCompares.length} High-Intent Traps!`);
