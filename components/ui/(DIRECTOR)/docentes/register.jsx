import {
  register,
  update,
} from "../../../../src/utils/schemas/login&registerSchema";
import {
  getDocenteOne,
  registerDocente,
  updateDocente,
} from "../../../../src/services/fetchData/fetchDocente";
import { RegistrarEntidad } from "../components/registerEntidad";

export const RegistrarDocente = ({ navigation, route }) => (
  <RegistrarEntidad
    navigation={navigation}
    route={route}
    tipoEntidad="Docente"
    getEntidadOne={getDocenteOne}
    registerEntidad={registerDocente}
    updateEntidad={updateDocente}
    schema={{ register, update }}
  />
);
