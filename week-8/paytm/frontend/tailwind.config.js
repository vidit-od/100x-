/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'grey-100': '#A7BEAE',
        'grey-200': '#E7E8D1'
      }
    },
  },
  plugins: [],
}