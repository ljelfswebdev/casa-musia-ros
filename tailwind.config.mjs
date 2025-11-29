/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F7B4C",
        secondary: "#A38357",
        tertiary: "#D1D1D1",
        black: "#1a1a1a",
        grey: "#e9e9e9"
      },
      borderRadius: {
        primary: "10px"
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1312px",
          "xs" : "480px"
        }
      }
    }
  },
  plugins: [],
};
