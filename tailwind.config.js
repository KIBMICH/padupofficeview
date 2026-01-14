/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemonGreen: '#A6E22E',
        brandOrange: '#F97316',
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      }
    },
  },
  plugins: [],
}
