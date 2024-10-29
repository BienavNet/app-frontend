import { Audio } from "expo-av";
import moment from "moment";

// Función para reproducir el sonido de notificación
export default async function playNotificationSound(setSound) {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../../../assets/mp3/Sweet.mp3'));
    setSound(sound);
    await sound.playAsync();
  } catch (error) {
    console.error("Error loading or playing sound: VERIFICA SI LA RUTA DEL SONIDO EXISTE", error);
    return;
  }
};

export const formatHourHHMMAMPM = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);
  const formattedHours = date.getHours() % 12 || 12;
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const generateClassDates = (dia, startDate, endDate) => {
  const daysOfWeek = {
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
  };

  const targetDay = daysOfWeek[dia];
  if (targetDay === undefined) {
    throw new Error("Día no válido");
  }

  const classesToRegister = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === targetDay) {
      classesToRegister.push({
        fecha: new Date(d), // Solo la fecha
      });
    }
  }
  return classesToRegister;
};

// devuelve el string pero con la primera letra de un string en mayuscula {"docente" ---> "Docente"}
export const capitalizeFirstLetter = (name) => {
  if (name !=undefined ){
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
};

// devuelve la primera letra de un string en mayuscula {"Pendiente" ---> "P"}
export function getFirstLetter(word) {
  if (word && word.length > 0) {
    return word.charAt(0).toUpperCase();
  }
  return "";
}

// pasamos un objeto Date si deseas obtener la hora en formato de 12 horas con AM/PM
export const formatHourHHMMTime = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, "0") % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
};

export const formatHourHHMM = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const truncateText = (text, maxLegth = 7) => {
  if (text.length > 15) {
    return text.substring(0, maxLegth) + "...";
  }
  return text;
};

// esta función toma una hora en formato HH:MM:SS (24 horas) y la convierte a HH:MM AM/PM (12 horas).
export const formatTimeTo12Hour = (time24) => {
  const [hour, minute] = time24.split(":");
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  const hour12 = hourInt % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
};

// Función para obtener las fechas futuras y deshabilitarlas
export const getFutureDatesDisabled = (minDate) => {
  const marked = {};
  const currentDate = moment().format("YYYY-MM-DD"); // Obtener la fecha actual
  let date = moment(minDate); // Comenzar desde la fecha mínima

  // Iterar desde la fecha mínima hasta la fecha actual
  while (date.isSameOrBefore(currentDate)) {
    const dateString = date.format("YYYY-MM-DD"); // Formatear la fecha como string
    marked[dateString] = { disabled: false }; // Habilitar las fechas hasta hoy
    date = date.add(1, "days"); // Avanzar un día
  }

  // Deshabilitar todos los días futuros excepto el día actual
  const tomorrow = moment().add(1, "days");
  while (tomorrow.isBefore(moment("2025-01-01"))) {
    const futureDateString = tomorrow.format("YYYY-MM-DD");
    marked[futureDateString] = { disabled: true }; // Deshabilitar días futuros
    tomorrow.add(1, "days"); // Avanzar un día
  }

  return marked;
};

// devuelve el numero del dia, {lunes:1, martes:2 , etc}
export const obtenerDiaNumero = (dia) => {
  console.log(dia, "dia de la funcion obtener dia Numero")
  const diasSemana = {
    domingo: 7,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };
  const diaLowerCase = dia.toLowerCase();
  return diasSemana[diaLowerCase] || 0;
};
