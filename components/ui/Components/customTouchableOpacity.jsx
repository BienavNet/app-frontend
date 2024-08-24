import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomTouchableOpacity = ({
  navigateToFormScreen,
  screenName = "FormScreen",
  paramKey = "id",
  paramValue,
  children,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigateToFormScreen
      ? navigateToFormScreen(navigation, paramValue)
      : navigation.navigate(screenName, { [paramKey]: paramValue });
  };

  return (
    <TouchableOpacity className="flex-row" onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomTouchableOpacity;
