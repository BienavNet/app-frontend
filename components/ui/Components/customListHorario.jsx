import { ScrollView, Alert } from "react-native";
import { ListItem, Button } from "@rneui/themed";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "../../share/loading";
import { getDetailHorarioByHorarioID } from "../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteClasesOne,
  getClassesByHorarioID,
} from "../../../src/services/fetchData/fetchClases";
import { refreshControl } from "../../../src/utils/functiones/refresh";
import { ViewHorario } from "../(DIRECTOR)/horarios/component/viewHorario";
import { Today } from "../../../src/utils/InstanceMoment";
import { NotRegistration } from "./unregistered/noRegistration";
import { ColorItem } from "../../styles/StylesGlobal";
import { ScrollMultipleFilterClass } from "../(SUPERVISOR)/clases/components/carouselFilter/CarouselFilter";
import LayoutScroolView from "./Layout/UseScroollView";


export const ListItemComponentHorario = ({
  additionalData,
  filters,
  opciones,
  handleOptionSelect,
  multipleSelectedItem,
  getDataAll,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();
  
  const [items, setItems] = useState([]);
  const today = Today();
  const [value, setValue] = useState(today);
  // const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Obtener elementos iniciales
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await getDataAll();
        setItems(res);
      // if (additionalData.length > 0) {
      //   setItems(additionalData);
      // } else if (
      //   (filters.docente > 0 || filters.dia > 0 || filters.horario > 0) &&
      //   additionalData.length === 0
      // ) {
      //   setItems([]);
      // } else if (Object.values(filters).every((value) => value === 0)) {
      //   const res = await getDataAll();
      //   setItems(res);
      // }
    } catch (e) {
      console.error("Error fetching items: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [getDataAll,
    //  additionalData,
    //   filters
    ]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     onValue: (newValue) => setValue(newValue),
  //   });
  // }, [navigation]);

  const handleInfoPress = async (id) => {
    try {
      const res = await getDataOne(id);
      const itemSelected = res.find((value) => value.id === id);
      if (itemSelected) {
        navigation.navigate("InfoHours", {
          selectedItem: itemSelected,
          value: value,
        });
      } else {
        throw new Error("Horario no encontrado");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const handleDeletePress = (itemId) => {
    Alert.alert(
      `Eliminar ${modalTitle}`,
      `¿Estás seguro de que deseas eliminar este ${modalTitle.toLowerCase()}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const detailHorarioD = await getDetailHorarioByHorarioID(itemId);
              await Promise.all(
                detailHorarioD.map(async (detailHorario) =>
                  deleteDataAsociated(detailHorario.id)
                )
              );
              const claseD = await getClassesByHorarioID(itemId);
              await Promise.all(claseD.map((clase) => DeleteClasesOne(clase.id)));
              await deleteData(itemId);
              setItems(items.filter((item) => item.id !== itemId));
              Alert.alert(`${modalTitle} eliminado con éxito`);
            } catch (error) {
              Alert.alert(`Error al eliminar el ${modalTitle.toLowerCase()}`);
            }
          },
        },
      ]
    );
  };

  return (
    <LayoutScroolView
    onRefreshExternal={fetchItems}
    >
       {
         items.map((item, index) => (
          <ListItem.Swipeable
            // containerStyle={{
            //   backgroundColor:
            //     additionalData.length > 0 ? ColorItem.OceanCrest : "white",
            // }}
            key={`${item.id}-${index}`}
            leftContent={(reset) => (
              <Button
                title="Info"
                onPress={async () => {
                  reset();
                  await handleInfoPress(item.id);
                }}
                icon={{ name: "info", color: "white" }}
                buttonStyle={{ minHeight: "100%" }}
              />
            )}
            rightContent={(reset) => (
              <Button
                title="Delete"
                onPress={() => {
                  reset();
                  handleDeletePress(item.id);
                }}
                icon={{ name: "delete", color: "white" }}
                buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
              />
            )}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <ListItem.Content>
              <ListItem.Title>
                <TouchableOpacity
                  className="flex-row"
                  onPress={() =>
                    navigateToFormScreen
                      ? navigateToFormScreen(navigation, item.id)
                      : navigation.navigate("FormScreen", { id: item.id })
                  }
                >
                  <ViewHorario item={item} />
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))
      }
    </LayoutScroolView>









    // <ScrollView
    //   contentContainerStyle={{ paddingBottom: 85 }}
    //   refreshControl={refreshControl(refreshing, onRefresh)}
    // >
     

     
    // </ScrollView>
  );};



   {/* {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
        />
      )} */}

      {/* {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <NotRegistration />
      ) : (
       
      )} */}