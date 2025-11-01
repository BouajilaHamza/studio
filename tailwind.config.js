/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/templates/**/*.html",
    "./app/routers/**/*.py",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        foreground: '#FFFFFF',
        primary: '#3B82F6',
        secondary: '#6B7280',
        accent: '#F59E0B',
      },
    },
  },
  plugins: [],
}