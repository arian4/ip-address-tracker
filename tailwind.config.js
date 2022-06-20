/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'heaader-pattern': "url('/public/images/pattern-bg.png')",
      }
    },
  },
  plugins: [],
}
