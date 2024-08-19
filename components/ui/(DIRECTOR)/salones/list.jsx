import {
 getSalon, getSalonOne
} from "../../../../src/services/fetchData/fetchSalon";
import { ListItemSalones } from "../../Components/customlistSalones";
export const ListSalones = () => {
  return (
    <ListItemSalones
      getDataAll={getSalon}
      getDataOne={getSalonOne}
      modalTitle="Salones"
    />
  );
};
