export const formatHourHHMMAMPM= (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(hours, minutes);

  const formattedHours = date.getHours() % 12 || 12;
  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
  const period = date.getHours() < 12 ? 'AM' : 'PM';

  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const generateClassDates = (dia, startDate, endDate) => {
  const daysOfWeek = {
    "Lunes": 1,
    "Martes": 2,
    "Miercoles": 3,
    "Jueves": 4,
    "Viernes": 5,
    "Sabado": 6
  };
  
  const targetDay = daysOfWeek[dia];
  if (targetDay === undefined) {
    throw new Error("Día no válido");
  }

  const classesToRegister = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === targetDay) {
      classesToRegister.push({
        fecha: new Date(d) // Solo la fecha
      });
    }
  }
  return classesToRegister;
};

// devuelve la primera letra de un string en mayuscula
export const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatHourHHMMTime = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, "0") % 12 || 12}:${minutes.toString().padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
};

export const formatHourHHMM = (currentTime) => {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, "0")}`;
};

export const truncateText = (text) => {
  if (text.length > 15) {
    return text.substring(0, 7) + "...";
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
