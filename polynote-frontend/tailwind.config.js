/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        MAIN_DARK: "#130b1b",
        DARK_PURPLE: "#373055",
        LIGHT_PURPLE: "#bd97e9",
        PURPLE: "#6f629e",
        PINK: "#f8c8ed",
        CONNECT_WINDOW: "#1D1029",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
