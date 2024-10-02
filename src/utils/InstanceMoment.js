import moment from "moment";
import "moment/locale/es";
moment.locale("es"); // configuracion de la hora local "es"
export const Today = () => moment(); // Función para obtener la fecha de hoy
export default moment; 
