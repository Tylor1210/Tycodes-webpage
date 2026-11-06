const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CONSTRAINT: one accent color for the whole site. Change it here only.
        // Text and buttons use brand-700 (5.5:1 on white); lighter shades are for tints and borders.
        brand: colors.teal,
      },
      fontFamily: {
        sans: ['"Inter"', '"Inter Fallback"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
