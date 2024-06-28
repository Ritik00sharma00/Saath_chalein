import { Merriweather } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    backgroundImage:
    {
      background:"../../assets/background.png"
    },
   
    colors: {
      muddy: "#FFC107",
      yellow: "#FFDA56",
      lightblue: "#C0DEDB",
      cyan: "#469E96"
    },
    fontFamily: {
      merriweather: Merriweather,
      workSans:Work_Sans,
    }
  },
};
export const plugins = [];
