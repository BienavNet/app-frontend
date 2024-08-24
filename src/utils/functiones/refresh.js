import { RefreshControl } from "react-native";

export const refreshControl = (refreshing, onRefresh) => (
  <RefreshControl
    refreshing={refreshing}
    colors={["#78e08f"]}
    onRefresh={onRefresh}
    progressBackgroundColor="#1371C3"
  />
);
