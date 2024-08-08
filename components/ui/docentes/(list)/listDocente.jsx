import {
  DeleteDocenteOne,
  getDocenteAll,
  getDocenteOne,
} from "../../../../src/services/fetchData/fetchDocente";
import { ListItemComponent } from "../../customList";

export const ListDocente = () => {
  return (
    <ListItemComponent
      getDataAll={getDocenteAll}
      getDataOne={getDocenteOne}
      deleteData={DeleteDocenteOne}
      modalTitle="Docente"
    />
  );
};
