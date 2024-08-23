import { View } from "react-native";
import {
  deleteReportID,
  getReportAll,
  getReportSupervisorID,getReportClase2,getReportSalon2
} from "../../../../src/services/fetchData/fetchReporte";
import { ListItemReport } from "../../Components/customlistReport";
import { Chip } from "@react-native-material/core";
import { useState } from "react";

export const ListDetailReport = () => {
  const [selectedChip, setSelectedChip] = useState("Todos");
  const [clase, setClase] = useState("");

  // const [salon, setSalon] = useState("");
  // console.log("clase :", clase , "salon: ", salon)
  // const handleChipPress = (chip) => {
  //   setSelectedChip(chip);
  //   if (chip === "Clases") {
  //     setClase("clase"); 
  //   } else if (chip === "Salones") {
  //     setSalon("salon");
  //   }
  // };

  // const getData = () => {
  //   switch (selectedChip) {
  //     case "Clases":
  //       // return getReportClase2(clase);
  //     case "Salones":
  //       // return getReportSalon2(salon);
  //     default:
  //       return getReportAll();
  //   }
  // };

  return (
    <>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 5,
          paddingTop: 15,
          paddingBottom: 10,
          backgroundColor: "#f1f1f1",
          elevation: 10,
          borderRadius: 8,
        }}
      >
        <Chip
          label="Todos"
          onPress={() => handleChipPress("Todos")}
          variant={selectedChip === "Todos" ? "contained" : "outlined"}
        />
        <Chip
          label="Clases"
          onPress={() => handleChipPress("Clases")}
          variant={selectedChip === "Clases" ? "contained" : "outlined"}
        />
        <Chip
          label="Salones"
          onPress={() => handleChipPress("Salones")}
          variant={selectedChip === "Salones" ? "contained" : "outlined"}
        />
      </View> */}
      <ListItemReport
        getDataAll={getReportAll}
        // getDataOne={getReportSupervisorID}
        deleteData={deleteReportID}
        modalTitle="Reportes"
      />
    </>
  );
};
