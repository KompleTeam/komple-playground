/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "komple-black": {
          100: "#B6B6B6",
          200: "#424242",
          300: "#333333",
          400: "#232323",
        },
        "komple-red": {
          100: "#FFE8E5",
          200: "#FFB7A6",
          300: "#FF7950",
          400: "#EB360C",
        },
        "komple-green": "#D5EB82",
      },
    },
  },
  plugins: [],
}
