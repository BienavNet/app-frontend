/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // buttonColor:"#390099",
        // backgroundColor :"#B692C2",
        // textInput:'#DFE3E3',
        // textPrincipal:'#3379E2',

        UPCLuigi: "#43B21E", // VERDER Luigi
        UPCGreenSymphony: "#67A623", //  VERDER Green Symphony
        UPCKellyGreen: "#3C9B61", //  VERDER Kelly Green
        UPCMediumGreen: "#388253", //  VERDER Medium Green {headers, buttons succefully}
        UPCDeepFir: "#193824", // VERDER Deep Fir {texto, letras}

        UPCTarnishedSilver: "#797A7E", // GRIS Tarnished Silver {button disabled}
        UPCZircon: "#DFE3E3", // GRIS Zircon {fondo modal}
        UPCChromeAluminum: "#AAABAE", // GRIS Chrome Aluminum
        UPCOceanCrest: "#D6DEDE", // GRIS Ocean Crest {color de fondo de pestañas o screen}

        UPCGoldOre: "#EBC115", // Amarrillo {diviciones, lineas, puntos, button edit }
        UPCDeepSkyBlue: "#0D6EFD", // Azul Deep Sky Blue{buttons mas detalles, mas.. }
      },
      fontSize: {
        subtitle: "16px",
      },
    },
  },
  plugins: [],
};
