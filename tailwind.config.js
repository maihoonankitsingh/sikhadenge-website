/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sd: {
          base: "rgb(var(--sd-base) / <alpha-value>)",
          surface: "rgb(var(--sd-surface) / <alpha-value>)",
          blue: "rgb(var(--sd-blue) / <alpha-value>)",
          blueDark: "rgb(var(--sd-blue-dark) / <alpha-value>)",
          gold: "rgb(var(--sd-gold) / <alpha-value>)",
          text: "rgb(var(--sd-text) / <alpha-value>)",
          secondary: "rgb(var(--sd-secondary) / <alpha-value>)",
          muted: "rgb(var(--sd-muted) / <alpha-value>)",
        },
      },
      boxShadow: {
        "glow-blue": "0 0 18px rgba(37,99,235,0.55)",
        "glow-gold": "0 0 18px rgba(245,179,1,0.55)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
