const fs = require('fs');
const path = require('path');

const skills = ['Python', 'Data Science', 'Digital Marketing', 'AI', 'Video Editing'];
const industries = ['Healthcare', 'Finance', 'Real Estate'];
const cities = ['Remote', 'Mumbai', 'Bangalore'];

let allPages = [];

skills.forEach(skill => {
  industries.forEach(industry => {
    cities.forEach(city => {
      const slug = `${skill.toLowerCase().replace(/ /g, '-')}-for-${industry.toLowerCase().replace(/ /g, '-')}-in-${city.toLowerCase()}`;

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
