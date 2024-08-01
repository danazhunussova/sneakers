/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./vue-project/index.html",
    "./vue-project/src/**/*.{vue,js,ts,jsx,tsx}",
    //"./vue-project/pages/**/*.{html,vue,js,ts,jsx,tsx}",
    "./vue-project/src/components/**/*.{html,vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

