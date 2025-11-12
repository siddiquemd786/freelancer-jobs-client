/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ use class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        },
      },
      "dark", // default dark theme
    ],
    darkTheme: "dark", // specify which theme is dark
  },
}
