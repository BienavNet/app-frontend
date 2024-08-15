import {
    DeleteComentarioOne,
    getComentarioAll,
    getComentarioOne,
  } from "../../../../src/services/fetchData/fetchComentario";
  import { ListItemComponent } from "../../Components/customList";
  
  export const ListComentario = () => {
    return (
      <ListItemComponent
        getDataAll={getComentarioAll}
        getDataOne={getComentarioOne}
        deleteData={DeleteComentarioOne}
        modalTitle="Comentarios"
      />
    );
  };
  