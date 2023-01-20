/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { colors: {
      amazon_blue: {
        light: '#232F3E',
        DEFAULT: '#131921'
      }
    }},
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
