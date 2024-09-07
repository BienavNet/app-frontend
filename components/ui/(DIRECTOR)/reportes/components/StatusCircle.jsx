import { Badge } from "@rneui/themed";
import { getFirstLetter } from "../../../../../src/utils/functiones/functions";

const P = "pendiente";
const C = "completada";

export const StatusCircle = ({ item }) => {
  const getStatus = (status) => {
    switch (status) {
      case P:
        return "warning";
      case C:
        return "success";
      default:
        return "danger";
    }
  };

  return (
    <Badge
      badgeStyle={{
        width: 30,
        height: 30,
        borderRadius: 30,
      }}
      value={getFirstLetter(item)}
      status={getStatus(item)}
    />
  );
};
