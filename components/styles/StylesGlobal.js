import { StyleSheet } from "react-native";
// VERDER Luigi
//  VERDER Green Symphony
//  VERDER Kelly Green
//  VERDER Medium Green {headers, buttons succefully}
// VERDER Deep Fir {texto, letras}
// GRIS Tarnished Silver {button disabled}
// GRIS Zircon {fondo modal}
// GRIS Chrome Aluminum
// GRIS Ocean Crest {color de fondo de pestañas o screen}
// Amarrillo {diviciones, lineas, puntos, button edit }
// Azul Deep Sky Blue{buttons mas detalles, mas.. }

export const ColorItem = {
  Luigi:"#43B21E",
  GreenSymphony: "#67A623",
  KellyGreen:"#3C9B61",
  MediumGreen:"#388253",
  DeepFir:"#193824" ,
  TarnishedSilver:"#797A7E" ,
  Zircon:"#DFE3E3" ,
  ChromeAluminum:"#AAABAE" ,
  OceanCrest:"#D6DEDE",
  GoldOre:"#EBC115",
  DeepSkyBlue:"#0D6EFD",
}

export const stylesColors = StyleSheet.create({
  ColorLuigi: {color: "#43B21E"},
  ColorGreenSymphony: { color: "#67A623"},
  ColorKellyGreen: { color: "#3C9B61"},
  ColorMediumGreen: { color: "#388253" },
  ColorDeepFir: { color: "#193824" },
  ColorTarnishedSilver: { color: "#797A7E" },
  ColorZircon: { color: "#DFE3E3" },
  ColorChromeAluminum: { color: "#AAABAE" },
  ColorOceanCrest: { color: "#D6DEDE" },
  ColorGoldOre: { color: "#EBC115" },
  ColorDeepSkyBlue: { color: "#0D6EFD" },
  BackgroundGreenSymphony: { backgroundColor: "#67A623" },
  BackgroundKellyGreen: { backgroundColor: "#3C9B61" },
  BackgroundMediumGreen: { backgroundColor: "#388253" },
  BackgroundDeepFir: { backgroundColor: "#193824" },
  BackgroundTarnishedSilver: { backgroundColor: "#797A7E" },
  BackgroundZircon: { backgroundColor: "#DFE3E3" },
  BackgroundChromeAluminum: { backgroundColor: "#AAABAE" },
  BackgroundOceanCrest: { backgroundColor: "#D6DEDE" },
  BackgroundGoldOre: { cobackgroundColorlor: "#EBC115" },
  BackgroundDeepSkyBlue: { backgroundColor: "#0D6EFD" },
});

export const styles = StyleSheet.create({
  Title11: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: ColorItem.KellyGreen,
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
  },

  text1: {
    textAlign: "center",
    padding: 8,
    fontSize: 16,
    fontWeight: "medium",
  },

  Title1: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: ColorItem.KellyGreen,
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 6,
  },
  text: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 5,
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  asignatura: {
    fontSize: 16,
    fontWeight: "medium",
    padding: 5,
    marginBottom: 5,
  }, 
  comentario: {
    fontSize: 18,
    fontWeight: "medium",
    paddingLeft: 10,
  },
  viewmore: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  subtitle: {
    paddingVertical: 12,
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
  }, 
  container: {
    width: "100%",
    height: "100%",
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // paddingHorizontal: 12,
    overflow: "hidden",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  /** Placeholder */
  placeholder: {
    height: "100%",
    marginTop: 0,
    padding: 0,
  },
  placeholderInset: {
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  titleWelcome: {
    width: 200,
    height: 40,
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
  },

  contentIcon: {
    width: "35%",
    margin: 4,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    backgroundColor: "#fff", // Color de fondo de la barra de pestañas
  },
  indicator: {
    elevation: 5,
    backgroundColor: ColorItem.KellyGreen, // Color del indicador de pestaña activa
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
  },

  //checkebox filter
  contenCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemInfo: {
    marginLeft: 20,
  },
  textinfo: {
    fontSize: 18,
    color: "black",
  },
});
