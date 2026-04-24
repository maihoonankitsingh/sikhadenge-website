/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sd: {
          navy: "#0B1220",
          surface: "#111827",
          border: "rgba(255,255,255,0.10)",
          blue: "#2563EB",
          blueDark: "#1D4ED8",
          gold: "#F5B301",
          text: "#FFFFFF",
          textSecondary: "#B0B7C3",
          muted: "#9CA3AF",
        },
      },
      boxShadow: {
        "sd-blue": "0 0 18px rgba(37,99,235,0.55)",
        "sd-gold": "0 0 18px rgba(245,179,1,0.55)",
        "sd-card": "0 14px 40px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "sd-hero":
          "radial-gradient(900px 520px at 20% 10%, rgba(37,99,235,0.18), transparent 60%)",
      },
    },
  },
  plugins: [],
};
