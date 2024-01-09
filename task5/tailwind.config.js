/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{html,js}"
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

