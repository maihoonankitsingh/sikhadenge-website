const fs = require('fs');
const path = require('path');

const skills = ["Python", "Data Science", "Digital Marketing", "AI Generalist", "Graphic Design", "Video Editing", "Content Writing", "Copywriting", "UI UX Design", "Full Stack Development", "App Development", "SEO", "Machine Learning", "Prompt Engineering", "No Code", "Blockchain", "Cybersecurity", "Cloud Computing", "Product Management", "Sales"];
const industries = ["Healthcare", "Finance", "Real Estate", "Education", "E-commerce", "SaaS", "Retail", "Manufacturing", "Entertainment", "Travel"];
const cities = ["Remote", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna"];

let allPages = [];

skills.forEach(skill => {
  industries.forEach(industry => {
    cities.forEach(city => {
      const slug = `${skill.toLowerCase().replace(/ /g, "-")}-for-${industry.toLowerCase().replace(/ /g, "-")}-in-${city.toLowerCase()}`;
      allPages.push({
        slug: slug,
        title: `${skill} Expert for ${industry} in ${city}`,
        description: `Hire the perfect ${skill} expert specialized in ${industry} available in ${city}.`,
        skill: skill,
        industry: industry,
        city: city
      });
    });
  });
});

const outputPath = path.join(__dirname, '../data/generated-seo.json');
fs.writeFileSync(outputPath, JSON.stringify(allPages, null, 2));
console.log(`Successfully generated ${allPages.length} SEO pages!`);
