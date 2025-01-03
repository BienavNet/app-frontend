import {  Alert } from "react-native";;
import {  useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../share/loading";
import { getDetailHorarioByHorarioID } from "../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteClasesOne,
  getClassesByHorarioID,
} from "../../../src/services/fetchData/fetchClases";
import { ViewHorario } from "../(DIRECTOR)/horarios/component/viewHorario";
import { Today } from "../../../src/utils/InstanceMoment";
import { NotRegistration } from "./unregistered/noRegistration";
import { ScrollMultipleFilterClass } from "../(SUPERVISOR)/clases/components/carouselFilter/CarouselFilter";
import LayoutScroolView from "./Layout/UseScroollView";
import { useHorarioAll } from "../../../src/hooks/customHooks";
import { ListSwipeable } from "./view/components/listItems.Swipeable";
import { IconCalendar } from "../../../assets/icons/IconsGlobal";

export const ListItemComponentHorario = ({
  additionalData,
  filters,
  opciones,
  handleOptionSelect,
  multipleSelectedItem,
  getDataOne,
  deleteData,
  deleteDataAsociated,
  navigateToFormScreen,
  modalTitle = "Info",
}) => {
  const navigation = useNavigation();

  const { horarios, fetchHorarioAll, reload } = useHorarioAll();

  // const [items, setItems] = useState([]);
  const today = Today();
  const [value, setValue] = useState(today);
  // const [refreshing, setRefreshing] = useState(false);
  // const [loading, setLoading] = useState(false);

  // Obtener elementos iniciales
  // const fetchItems = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getDataAll();
  //       setItems(res);
  //     // if (additionalData.length > 0) {
  //     //   setItems(additionalData);
  //     // } else if (
  //     //   (filters.docente > 0 || filters.dia > 0 || filters.horario > 0) &&
  //     //   additionalData.length === 0
  //     // ) {
  //     //   setItems([]);
  //     // } else if (Object.values(filters).every((value) => value === 0)) {
  //     //   const res = await getDataAll();
  //     //   setItems(res);
  //     // }
  //   } catch (e) {
  //     console.error("Error fetching items: ", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
              await Promise.all(
                claseD.map((clase) => DeleteClasesOne(clase.id))
              );
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
    <LayoutScroolView onRefreshExternal={fetchHorarioAll}>
      {reload ? (
        <Loading />
      ) : horarios.length === 0 ? (
        <NotRegistration />
      ) : (
        horarios.map((item, index) => (
          <ListSwipeable
            item={item}
            handleDeletePress={handleDeletePress}
            handleInfoPress={handleInfoPress}
            key={`unique${item.id}-${index}`}
            icono={IconCalendar}
          >
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
          </ListSwipeable>
        ))
      )}
    </LayoutScroolView>
  );
};

{
  /* {Object.keys(multipleSelectedItem).length > 0 && additionalData && (
        <ScrollMultipleFilterClass
          opciones={opciones}
          handleOptionSelect={handleOptionSelect}
        />
      )} */
}