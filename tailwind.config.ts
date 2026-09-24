import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0E1B2A",
        brand: "#2563EB",
        brandsoft: "#5B9DF9",
        teal: "#0EA5A4",
        ink: "#16232F",
        paper: "#F6F8FB",
        muted: "#5A6B7B",
        line: "#E2E8F0",
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "system-ui", "sans-serif"],
        display: ["'Zen Kaku Gothic New'", "'Noto Sans JP'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
