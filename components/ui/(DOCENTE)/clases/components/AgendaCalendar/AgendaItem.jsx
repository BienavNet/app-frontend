import isEmpty from "lodash/isEmpty";
import { memo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { truncateText } from "../../../../../../src/utils/functiones/functions";
import { ModalComponente } from "../../../../Components/customModal";
import { MultilineTextInput } from "../../../../../share/inputs/customMultipleTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { _registerComentario } from "../../../../../../src/utils/schemas/comentarioSchema";
import moment from "../../../../../../src/utils/InstanceMoment";
import { registerComentario } from "../../../../../../src/services/fetchData/fetchComentario";
import { ColorItem } from "../../../../../styles/StylesGlobal";
import { registerNotification } from "../../../../../../src/services/fetchData/fetchNotification";
import { userData } from "../../../../../../src/hooks/use/userData";

const AgendaItem = (props) => {
  const { item } = props;
  const data = item.data[0];
  const { ID, DIRECTORID } = userData();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(_registerComentario),
  });

  const onSubmitRegisterComentario = async (event) => {
    const { comentario } = event;
    try {
      const docente = data.docente;
      const salon = data.salon;
      const clase = data.clase;
      const fecha = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
      await registerComentario(comentario, docente, salon, fecha, clase);
      alert("comentario registrado correctamente");
      reset();
      try {
        const COMENTARIO = "comentario";
        await registerNotification(COMENTARIO, ID, DIRECTORID);
        handleOnclosed();
      } catch (error) {
        throw Error("Error al registrar registerNotification", error);
      }
    } catch (error) {
      throw Error("Error al registrar registerComentario", error);
    }
  };

  const buttonPressed = () => {
    setSelected(true);
    setShowModal(true);
  };

  const handleOnclosed = () => {
    setShowModal(false);
    setSelected(false);
  };

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>
          No hay evento planeado para este dia.
        </Text>
      </View>
    );
  }

  return (
    <>
      {selected && showModal && (
        <ModalComponente
          modalStyle={{
            height: "70%",
          }}
          title={`Dejar un comentario sobre la clase:${data.room}`}
          animationType="slide"
          canCloseModal={false}
          handleCloseModal={handleOnclosed}
          modalVisible={showModal}
        >
          <View style={{
            paddingVertical:15,
            paddingHorizontal:10
          }}>
          <MultilineTextInput
            control={control}
            name="comentario"
            variant="outlined"
            errors={errors.comentario}
            placeholder="Escribe tu comentario aqui..."
          />
          </View>

          <View
            style={{
              justifyContent:"center",
              flexDirection: "row",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleOnclosed()}
            >
              <Text style={styles.textStyle}>Cerrar Ventana</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: ColorItem.Luigi,
                },
              ]}
              onPress={handleSubmit(onSubmitRegisterComentario)}
            >
              <Text style={styles.textStyle}>Comentar</Text>
            </Pressable>
          </View>
        </ModalComponente>
      )}
      <View style={styles.item}>
        <View
          style={{
            width: "45%",
          }}
        >
          <Text style={styles.itemHourText}>
            {"Salon: "}
            {data.room}
          </Text>
          <Text style={styles.itemHourText}>{data.hours}</Text>
          <Text style={styles.itemDurationText}>{data.duration}</Text>
        </View>
        <View
          style={{
            width: "55%",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              marginHorizontal: 20,
              padding: 5,
            }}
          >
            <Text style={styles.itemTitleText}>
              {truncateText(data.subject, 7)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={buttonPressed}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Reportar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    height: 150,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 5,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 10,
   marginHorizontal:15
  },
  buttonClose: {
    backgroundColor: "#e0310b",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:18
  },
});
