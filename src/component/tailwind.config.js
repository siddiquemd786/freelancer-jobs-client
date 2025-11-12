// tailwind.config.js
import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ✅ IMPORTANT
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["light"],
        },
        dark: {
          ...themes["dark"],
        },
      },
    ],
    darkTheme: "dark",
  },
};
