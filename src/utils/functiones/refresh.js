import { RefreshControl } from "react-native";
import { ColorItem } from "../../../components/styles/StylesGlobal";

export const refreshControl = (refreshing, onRefresh) => (
  <RefreshControl
    refreshing={refreshing}
    colors={[ColorItem.DeepFir]}
    onRefresh={onRefresh}
    progressBackgroundColor={ColorItem.Luigi}
  />
);
