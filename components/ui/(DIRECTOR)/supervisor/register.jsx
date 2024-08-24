import {
  register,
  update,
} from "../../../../src/utils/schemas/login&registerSchema";
import {
  getSupervisorOne,
  registerSupervisor,
  updateSupervisor,
} from "../../../../src/services/fetchData/fetchSupervisor";
import { RegistrarEntidad } from "../components/registerEntidad";

export const RegistrarSupervisor = ({ navigation, route }) => (
  <RegistrarEntidad
    navigation={navigation}
    route={route}
    tipoEntidad="Supervisor"
    getEntidadOne={getSupervisorOne}
    registerEntidad={registerSupervisor}
    updateEntidad={updateSupervisor}
    schema={{ register, update }}
  />
);
