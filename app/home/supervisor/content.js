import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Chip } from "@react-native-material/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { ModalComponente } from "../../../components/ui/Components/customModal";
import { CustomInput } from "../../../components/share/inputs/customInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterReportSchema } from "../../../src/utils/schemas/reportSchema";
import { CustomPiker } from "../../../components/share/inputs/customPicker";
import status from "../../../components/ui/(DIRECTOR)/horarios/detalleHorario/json/status.json"
import { SearchBar } from "@rneui/themed";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import {
  getSalon,
  getSalonOne,
} from "../../../src/services/fetchData/fetchSalon";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ScrollViewScreen } from "./MomoHeader";
import { MultilineTextInput } from "../../../components/share/inputs/customMultipleTextInput";
export const ContentIndex = () => {
  const insert = useSafeAreaInsets();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(RegisterReportSchema),
  });
  const fetchClases = useCallback(async () => {
    try {
      // await getclases
    } catch (error) {}
  }, []);
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  //   const useSalones =  () =>{
  //     const {salones, setSalones} = useState([])
  //     useEffect(async () =>{
  //      const res = await getSalonOne();
  //      setSalones(res);
  //     })
  //     return salones;
  //   }
  //  const useSalon = useSalones()
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };
  const handleClosePress = () => {
    setModalVisible(false);
  };
  // const [selectedChip, setSelectedChip] = useState("Todos");
  // const [clase, setClase] = useState("");
  // const [salon, setSalon] = useState("");
  // console.log("clase :", clase, "salon: ", salon);
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
  //     case "Horarios":
  //     // return getReportClase2(clase);
  //     case "Salones":
  //     // return getReportSalon2(salon);
  //     default:
  //       return getReportAll();
  //   }
  // };

  return (
    <>
      <ScrollViewScreen>
        <View
          style={styles.card}
          // className="flex-row bg-red-400"
          // style={{
          //   paddingVertical: 20,
          //   paddingHorizontal: 20,
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              width: "100%",
              // backgroundColor:"blue"
            }}
            onPress={handlePress}
          >
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <MaterialCommunityIcons
                name="google-classroom"
                size={24}
                color="black"
              />
            </View>

            <View>
              <View className="flex-row">
                <Text>Docente</Text>
                <Text>nombredocente</Text>
              </View>
              <View className="flex">
                <Text>Docente</Text>
              </View>
              <View className="flex-row">
                <Text>Salon </Text>
                <Text>Aulario</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollViewScreen>
      <View>
      <ModalComponente
      
        transparent={true}
        modalStyle={{ height: "90%" }}
        animationType={"slider"}
        canCloseModal={true}
        modalVisible={modalVisible}
        handleCloseModal={handleClosePress}
      >
      <View className="justify-center items-center">
          <View className="flex-row justify-center items-center">
            {/* <Text>Salon</Text> */}
            <View className="w-[83%]">
            <CustomInput
            enable={false}
            label="Salon"
            name="Salon"
              variant="outlined"
              control={control}
              placeholder="Seleccione"
            />
            </View>
          </View> 
          <View className="flex-row justify-center items-center mt-3">
            {/* <Text>Estado</Text> */}
            <View className="w-[80%]">
              <CustomPiker
              name="estado"
                variant="outlined"
                control={control}
                data={status.map((i,v)=>({
                  id:i.id,
                  label:i.estado,
                  value:i.estado
                  
                }))}
                placeholder="Seleccione"
              />
            </View>
          </View>
          <View className="flex-row justify-center items-center mt-3">
            <View className="w-[80%]">
              <MultilineTextInput
              maxLength={10}
              numberOfLines={12}
              name="comentario"
                variant="outlined"
                control={control}
                placeholder="Seleccione"
              />
            </View>
          </View>
          <View className="flex-row justify-center mt-3 p-2">
            <View className="w-[40%] pt-3 self-center">
              <TouchableOpacity
                className={"w-11/12 self-center p-3 rounded-lg bg-red-600"}
              >
                <Text className="text-white text-center font-bold text-xl">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-[40%] pt-3 self-center">
              <TouchableOpacity
                className={
                  "w-11/12 self-center p-3 rounded-lg bg-textPrincipal"
                }
              >
                <Text className="text-white text-center font-bold text-xl">
                  Reportar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComponente>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    height: 80,
    backgroundColor: "gray",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  subtitle: {
    color: "#181D31",
    fontWeight: "bold",
  },
});
