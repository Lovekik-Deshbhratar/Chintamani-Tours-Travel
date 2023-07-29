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
      animation: {
        "up-down": "up-down 2s ease-in-out infinite alternate-reverse both",
      },
      keyframes: {
        "up-down": {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
