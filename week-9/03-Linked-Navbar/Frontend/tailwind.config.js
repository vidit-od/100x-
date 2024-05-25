/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-500': "#0a66c2"
      },
      boxShadow:{
        '3xl': "0px 4px 12px rgba(0,0,0,0.3)"
      },
      fontSize:{
        '2xs': "10px"
      },
      keyframes:{
        loading:{
          '0% , 100%' : {width: '20%',left : '0'},
          '25%': {width:'50%'},
          '50%': {width:'30%', left: '70%'},
          '75%': {width:'50%'},
        }
      },
      animation:{
        'loader': 'loading 2s linear infinite'
      }
    },
  },
  plugins: [],
}