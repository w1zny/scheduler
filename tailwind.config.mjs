/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "25em": "25em",
        "152px": "152px",
        "1330px": "1330px"
      },
      colors: {
        customWhite: {
          DEFAULT: "#e6e6e6",
          light: "#eeeeee",
          dark: "#d1d1d1"
        },
        customGray: {
          DEFAULT: "#404040",
          light: "#595959",
          dark: "#262626"
        },
        customOrange: {
          DEFAULT: "#cc2900",
          light: "#ff3300",
          dark: "#b32400"
        }
      },
      fontFamily: {
        logoFont: ["Playfair Display", "Roboto Slab", "Monospace", "sans-serif"],
        regularFont: ["Roboto Slab", "Monospace", "sans-serif"]
      }
    },
  },
  plugins: [],
};
