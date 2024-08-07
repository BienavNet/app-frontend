import { ListItemComponent } from "../customList";
import {
  getSupervisor,
  getSupervisorOne,
  deleteSupervisorOne,
} from "../../../src/services/fetchData/fetchSupervisor";

export const ListSupervisor = () => {
  return (
    <ListItemComponent
      getDataAll={getSupervisor}
      getDataOne={getSupervisorOne}
      deleteData={deleteSupervisorOne}
      modalTitle="Supervisor"
    />
  );
};
