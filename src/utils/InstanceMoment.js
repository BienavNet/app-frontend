import moment from "moment-timezone";
import "moment/locale/es"; // Importar el idioma español
moment.locale('es'); // Establecer el idioma global a español
export const Today = () => moment(); // Función para obtener la fecha de hoy
export default moment; 
