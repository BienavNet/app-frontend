import { StyleSheet } from "react-native";
import { ColorItem } from "../../../../styles/StylesGlobal";

export const stylesHorariosDirector = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorItem.DeepFir,
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemInfo: {
    marginLeft: 20,
  },
  // item: {
  //     marginHorizontal: 8,
  //     marginVertical: 8,
  //     flex: 1,
  //   },
  itemP1: {
    fontSize: 20,
    color: ColorItem.TarnishedSilver,
    marginBottom: 5,
    fontWeight: "bold",
  },
  itemAsig: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#999999",
    textAlign: "left",
  },
  itemP2: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#999999",
    textAlign: "center",
  },
  itemP3: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
  itemLeft: {
    fontSize: 16,
    color: ColorItem.TarnishedSilver,
    fontWeight: "bold",
  },
});
