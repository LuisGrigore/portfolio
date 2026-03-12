/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      spacing: {
        'safe-left': 'var(--safe-area-inset-left, 0)',
        'safe-right': 'var(--safe-area-inset-right, 0)',
        'safe-top': 'var(--safe-area-inset-top, 0)',
        'safe-bottom': 'var(--safe-area-inset-bottom, 0)',
      },
    },
  },
  plugins: [],
}