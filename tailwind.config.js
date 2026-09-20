import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      brand: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        DEFAULT: "#0d9488",
      },
      accent: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        DEFAULT: "#f59e0b",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      serif: ["var(--font-serif)", "Georgia", "serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    boxShadow: {
      card: "0 1px 3px rgba(16, 24, 40, 0.08), 0 8px 24px rgba(16, 24, 40, 0.06)",
      lift: "0 12px 40px rgba(16, 24, 40, 0.14)",
      glow: "0 0 0 1px rgba(13, 148, 136, 0.08), 0 8px 32px rgba(13, 148, 136, 0.18)",
    },
    borderRadius: {
      "4xl": "2rem",
    },
    keyframes: {
      "float": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-12px)" },
      },
    },
    animation: {
      float: "float 6s ease-in-out infinite",
    },
  },
};
export const plugins = [];