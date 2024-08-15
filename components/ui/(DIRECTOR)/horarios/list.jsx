import { DeleteDetailHorarioOne } from "../../../../src/services/fetchData/fetchDetailHorario";
import {
  DeleteHorarioOne,
  getHorarioAll,
  getHorarioOne,
} from "../../../../src/services/fetchData/fetchHorarios";
import { ListItemComponentHorario } from "../../Components/customListHorario";

export const ListHorario = () => {
  return (
    <ListItemComponentHorario
      deleteDataAsociated={DeleteDetailHorarioOne}
      getDataAll={getHorarioAll}
      getDataOne={getHorarioOne}
      deleteData={DeleteHorarioOne}
      modalTitle="Horario"
    />
  );
};
