/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fd7e14",
        secondary: "#FE9E4F",
      },
      fontFamily: {
        parisienne: ["Parisienne, cursive"],
      },
    },
  },
  plugins: [],
};
