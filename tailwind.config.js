/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "jacarta-800": "#10143b",
        "jacarta-700": "#131740",
        "jacarta-500": "#373956",
        "jacarta-300": "#575976",
        "jacarta-200": "#5a5d79",
        "jacarta-100": "#e7e8ec",
        "jacarta-50": "#eaebef",
        accent: "#8358ff",
      },
    },
  },
  plugins: [],
};
