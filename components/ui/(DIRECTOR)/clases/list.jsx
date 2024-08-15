import {
    DeleteClasesOne,
    getClasesAll,
    getClasesOne,
  } from "../../../../src/services/fetchData/fetchClases";
  import { ListItemComponent } from "../../Components/customList";
  
  export const ListClase = () => {
    return (
      <ListItemComponent
        getDataAll={getClasesAll}
        getDataOne={getClasesOne}
        deleteData={DeleteClasesOne}
        modalTitle="Clase"
      />
    );
  };
  