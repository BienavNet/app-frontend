/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        buttonColor:"#390099",
        backgroundColor :"#B692C2",
        textInput:'#DFE3E3',
        textPrincipal:'#3111F3'
      },
      fontSize:{
        subtitle:'16px',
        
       }
    },
  },
  plugins: [],
}

