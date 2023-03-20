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

        buttonDangerBg: "#CA4F4F",
        buttonDangerBgHover: "#802323",
        buttonDangerColor: "#FFEEEE",
        buttonDarngetColorHover: "#F3F0FF",

        buttonSuccessBg: "#9DDD97",
        buttonSuccessBgHover: "#558351",
        buttonSuccessColor: "#225A0E",
        buttonSuccessColorHover: "#FFFFFF",

        buttonSecondaryBg: "#f8c8ed",
        buttonSecondaryBgHover: "#E9A2D8",
        buttonSecondaryColor: "#4B0A3C",
        buttonSecondaryColorHover: "#4B0A3C",

        buttonPrimaryBg: "#361151",
        buttonPrimaryBgHover: "#6B628E",
        buttonPrimaryColor: "#F3F0FF",
        buttonPrimaryColorHover: "#F3F0FF",

        sidebarLight: "#FFFEFF",
        sidebarDark: "#0E0616",

        emptyNoteBg: "#FFF0FC",
        sidebarNoteLight: "#FFE7F9",
        sidebarNoteDark: "#1E1427",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
