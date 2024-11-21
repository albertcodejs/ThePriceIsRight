/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{js,vue,ts}", "./pages/**/*.vue", "./app.vue"],
  theme: {
    extend: {
      colors: {
        "super-dark": "#070708",
        "dark-violet": "#561594",
      },
    },
  },
  plugins: [],
};
