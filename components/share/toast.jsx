import AntDesign from "@expo/vector-icons/AntDesign";
import { useToast } from "react-native-toast-notifications";
import Feather from "@expo/vector-icons/Feather";

const toast = useToast();

const ToastError = (error) => {
  return toast.show(error, {
    icon: <AntDesign name="warning" size={30} color="red" />,
    style: {
      backgroundColor: "#f87171",
      borderColor: "red",
    },
    type: "Error",
    duration: 3000,
    dangerColor: "red",
    textStyle: {
      fontSize: 16,
      color: "white",
    },
    animationType: "zoom-in",
  });
};

const ToastSuccess = () => {
  return toast.show("Login Successfull", {
    icon: <Feather name="check-circle" size={24} color="green" />,
    style: {
      backgroundColor: "green",
      borderColor: "green",
    },
    type: "Success",
    duration: 3000,
    successColor: "green",
    textStyle: {
      fontSize: 16,
      color: "white",
    },
    animationType: "zoom-in",
  });
};

export const methods = {
  ToastError,
  ToastSuccess,
};
