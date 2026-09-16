import type { Config } from "tailwindcss";

// Mirrors the inline tailwind.config the Jekyll site declared against the CDN
// build, so ported markup keeps rendering identically.
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/html/**/*.html",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        accent: { DEFAULT: "#0891b2", dark: "#22d3ee" },
      },
    },
  },
  plugins: [],
} satisfies Config;
