import { useToast } from "react-native-toast-notifications";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";

const NUMBERSIZE = 30;
const COLORICONS = "#ffffff";

const APP_STATUS = {
  REGISTERING: "registering",
  SUCCESS: "success",
  UPDATING: "updating",
  ERROR: "error",
  REDIRECTING: "redirecting",
  LOADING: "loading",
  LOADED_SUCCESSFULLY: "loaded_successfully",
};

const STATUS_MESSAGES = {
  [APP_STATUS.REGISTERING]: "Registrando...",
  [APP_STATUS.SUCCESS]: "Registrado exitosamente. ✔︎",
  [APP_STATUS.UPDATING]: "Actualizado exitosamente. ✔︎",
  [APP_STATUS.ERROR]: "Hubo un error. ✖︎",
  [APP_STATUS.REDIRECTING]: "Redirigiendo...",
  [APP_STATUS.LOADING]: "Cargando datos.... en espera......",
  [APP_STATUS.LOADED_SUCCESSFULLY]: "Cargado satisfactoriamente. ✔︎",
};

const useToastMessage = () => {
  const toast = useToast();

  const showToast = ({
    message,
    type = "success",
    duration = 800,
    successIcon,
    errorIcon,
    warningIcon,
    dangerIcon,
    id,
    onClose,
  }) => {
    const getToastStyle = () => {
      switch (type) {
        case "success":
          return {
            backgroundColor: "green",
            borderColor: "green",
            icon: successIcon || (
              <FontAwesome6
                name="check-circle"
                size={NUMBERSIZE}
                color={COLORICONS}
              />
            ),
          };
        case "warning":
          return {
            backgroundColor: "blue",
            borderColor: "blue",
            icon: warningIcon || (
              <Ionicons
                name="reload-outline"
                size={NUMBERSIZE}
                color={COLORICONS}
              />
            ),
          };
        case "danger":
          return {
            backgroundColor: "red",
            borderColor: "red",
            icon: dangerIcon || (
              <MaterialIcons
                name="error"
                size={NUMBERSIZE}
                color={COLORICONS}
              />
            ),
          };
        default:
          return {
            backgroundColor: "grey",
            borderColor: "grey",
            icon: errorIcon || (
              <MaterialIcons name="info" size={NUMBERSIZE} color={COLORICONS} />
            ),
          };
      }
    };

    const { backgroundColor, borderColor, icon } = getToastStyle();

    toast.show(message, {
      id,
      icon,
      style: {
        backgroundColor,
        borderColor,
      },
      duration,
      textStyle: {
        fontSize: 16,
        color: "white",
      },
      animationType: "zoom-in",
      onClose: () => {
        if (onClose) onClose();
      },
    });
  };

  return { showToast, APP_STATUS, STATUS_MESSAGES };
};

export default useToastMessage;