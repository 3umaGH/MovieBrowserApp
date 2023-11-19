/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#191b1d",
        secondary: "#292a2e",
        third: "#caccce",
      },
      fontFamily: {
        'roboto': ['Roboto', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
