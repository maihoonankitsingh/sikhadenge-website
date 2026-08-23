// Build-time fallback for environments where fonts.googleapis.com is unreachable.
// Next.js reads this mapping when NEXT_FONT_GOOGLE_MOCKED_RESPONSES points here.
// We intentionally use local system fonts so production builds never depend on
// downloading Google Fonts from the network.

module.exports = {
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@200..800&display=swap": `
    @font-face {
      font-family: 'Bricolage Grotesque';
      font-style: normal;
      font-weight: 200 800;
      font-display: swap;
      src: local('Arial');
    }
  `,
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap": `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: local('Arial');
    }
  `,
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap": `
    @font-face {
      font-family: 'Cormorant Garamond';
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: local('Georgia');
    }
  `,
};
