/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { colors: {
      ninja_green: {
        light: '#1b2124',
        DEFAULT: '#015f41'
      }
    }},
  },
  plugins: [require("@tailwindcss/line-clamp"), require('@headlessui/tailwindcss')],
}
