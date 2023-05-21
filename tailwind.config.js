/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#b7ead9",
          100: "#88dcc0",
          200: "#58cea7",
          300: "#40c79a",
          400: "#28c08e",
          500: "#10b981",
          600: "#0d9467",
          700: "#0a6f4d",
          800: "#064a34",
          900: "#03251a",
        },
        rockyGreen: "#10B981",
      },
      fontFamily: {
        display: ["Red Hat Display", "sans-serif"],
        sans: ["Red Hat Text", "sans-serif"],
        mono: ["Red Hat Mono", "mono"],
      },
    },
  },
};
