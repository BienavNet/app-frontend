import {
    DeleteDetailHorarioOne,
    getDetailHorarioAll,
    getDetailHorarioOne,
  } from "../../../../src/services/fetchData/fetchDetailHorario";
  import { ListItemComponent } from "../../Components/customList";
  
  export const ListDetailHorario = () => {
    return (
      <ListItemComponent
        getDataAll={getDetailHorarioAll}
        getDataOne={getDetailHorarioOne}
        deleteData={DeleteDetailHorarioOne}
        modalTitle="Detalle Horario"
      />
    );
  };
  