import {
  getDocenteOne,
  registerDocente,
  updateDocente,
} from "../../../../src/services/fetchData/fetchDocente";
import { RegistrarEntidad } from "../components/registerEntidad";

export const RegistrarDocente = ({ navigation, route }) => {
  return (
    <RegistrarEntidad
      navigation={navigation}
      route={route}
      tipoEntidad="Docente"
      getEntidadOne={getDocenteOne}
      registerEntidad={registerDocente}
      updateEntidad={updateDocente}
    />
  );
};
