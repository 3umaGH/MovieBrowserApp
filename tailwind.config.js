/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#191b1d",
          secondary: "#4e5058",
          third: "#caccce",
        },
      },
    },
  },
  plugins: [],
};
