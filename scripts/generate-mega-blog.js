const fs = require('fs');
const path = require('path');

const categories = ["AI Skills", "ChatGPT", "AI Video Editing", "AI Marketing", "Prompt Engineering"];
const actions = ["How to Learn", "Best Tools for", "Complete Guide to", "Career Options in"];
const audiences = [
  { slug: "students", label: "Students" },
  { slug: "freelancers", label: "Freelancers" },
  { slug: "beginners", label: "Beginners" }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const results = [];
const slugSet = new Set();

categories.forEach(category => {
  actions.forEach(action => {
    audiences.forEach(audience => {
      const title = `${action} ${category} for ${audience.label} in 2026`;
      const slug = slugify(title);
      if (slugSet.has(slug)) return;
      slugSet.add(slug);
      results.push({
        slug, title, category, action, audience: audience.label,
        description: `Learn ${action.toLowerCase()} ${category.toLowerCase()} designed for ${audience.label.toLowerCase()} in 2026. Practical frameworks by Sikhadenge.`
      });
    });
  });
});

fs.writeFileSync(path.join(__dirname, '../data/generated-mega-blog.json'), JSON.stringify(results, null, 2));
console.log(`✅ SAMPLE BLOG ENGINE: ${results.length} pages generated!`);
