import {
    DeleteComentarioOne,
    getComentarioAll,
    getComentarioOne,
  } from "../../../../src/services/fetchData/fetchComentario";
  import {ListItemComentario  } from "../../Components/customListComentario";
  
  export const ListComentario = () => {
    return (
      <ListItemComentario
        getDataAll={getComentarioAll}
        getDataOne={getComentarioOne}
        deleteData={DeleteComentarioOne}
        modalTitle="Comentarios"
      />
    );
  };
  