/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "komple-black": {
          100: "#424242",
          200: "#333333",
          300: "#232323",
        },
        "komple-red": {
          100: "#FFE8E5",
          200: "#FFB7A6",
          300: "#FF7950",
          400: "#F34723",
        },
        "komple-green": "#D5EB82",
      },
    },
  },
  plugins: [],
}
