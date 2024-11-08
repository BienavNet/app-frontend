import { ListItemComponent } from "../../Components/customList";
import {
  getSupervisor,
  getSupervisorOne,
  deleteSupervisorOne,
} from "../../../../src/services/fetchData/fetchSupervisor";

export const ListSupervisor = () => {
  return (
    <ListItemComponent
    isSupervisor={true}
      getDataAll={getSupervisor}
      getDataOne={getSupervisorOne}
      deleteData={deleteSupervisorOne}
      modalTitle="Supervisor"
    />
  );
};
