/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fd7e14",
      },
      fontFamily: {
        parisienne: ["Parisienne, cursive"],
      },
    },
  },
  plugins: [],
};