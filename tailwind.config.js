/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'edu-blue': '#2563eb',
        'edu-green': '#16a34a',
        'edu-purple': '#7c3aed',
        'edu-pink': '#db2777',
      },
      fontFamily: {
        'edu-sans': ['Inter', 'sans-serif'],
        'edu-display': ['Calistoga', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}