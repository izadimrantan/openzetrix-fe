import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Card colour
        foreground: "#080202",
        background: "#080202",
        input_background: "#2E2323",

        // Base colour
        primary_red: "#BD3B3F",

        // Button
        button_primary_gradient_1: "#FFFFFF",
        button_primary_gradient_2: "#FFFFFF",

        // Typography
        text_primary: "#E8E7E7",
        text_secondary: "#DBCFCF",
        text_red: "#EC3B3E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
