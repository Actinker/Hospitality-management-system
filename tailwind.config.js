// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#FFD700', // Gold
          DEFAULT: '#FFD700',
          dark: '#FFB14E', // Dark Gold
        },
        lightBg: '#FAFAFA', // Very Light Grey
        darkShade: '#333333', // Dark Grey
        subtleText: '#4B5563', // Tailwind's Gray-700
        darkBorder: '#D1D5DB', // Tailwind's Gray-300
      },
      backgroundImage: theme => ({
        'gold-gradient': 'linear-gradient(90deg, #FFD700 0%, #FFB14E 100%)',
      }),
      ringColor: {
        'gold-gradient': '#FFD700',
      },
    },
  },
  plugins: [],
}
