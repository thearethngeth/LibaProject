/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "450px",
    },
    extend: {
      backgroundImage: {
        book: "url('../src/Assets/bg.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
