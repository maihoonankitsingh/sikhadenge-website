export interface SkillData {
  slug: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
}

export const skillsData: SkillData[] = [
  {
    slug: "python-expert",
    title: "Python Expert",
    category: "Programming",
    description: "Master Python for automation, data science, and web development.",
    skills: ["Scripting", "Data Analysis", "Django", "Automation"]
  },
  {
    slug: "data-science-expert",
    title: "Data Science Expert",
    category: "Data Science",
    description: "Learn to analyze complex data and build predictive models.",
    skills: ["Statistics", "Machine Learning", "Pandas", "Visualization"]
  },
  {
    slug: "digital-marketing-expert",
    title: "Digital Marketing Expert",
    category: "Marketing",
    description: "Become a master of SEO, SEM, and social media marketing.",
    skills: ["SEO", "Content Marketing", "Social Media", "Analytics"]
  }
];
