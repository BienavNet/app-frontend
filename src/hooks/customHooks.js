// ************ status the all that custom hooks functionality ********

import { useEffect, useState, useCallback } from "react";
import {
  getSupervisor,
  getSupervisorCedula,
} from "../services/fetchData/fetchSupervisor";
import { getCategorySalon, getSalon } from "../services/fetchData/fetchSalon";
import {
  getHorarioAll,
  getHorarioDocente,
} from "../services/fetchData/fetchHorarios";
import { getDocenteAll } from "../services/fetchData/fetchDocente";
import { getNotificationCedulaEstado } from "../services/fetchData/fetchNotification";
import { getReportAll } from "../services/fetchData/fetchReporte";
import { getClasesAll } from "../services/fetchData/fetchClases";

//fetch Docente
export const useDocenteAll = () => {
  const [docenteAll, setDocenteAll] = useState([]);
  const fetchDocenteAll = useCallback(async () => {
    try {
      const res = await getDocenteAll();
      setDocenteAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  useEffect(() => {
    fetchDocenteAll();
  }, [fetchDocenteAll]);

  return docenteAll;
}; //obtener todos los docente

// fetch supervisor
export const useSupervisorAll = () => {
  const [supervisors, setSupervisors] = useState([]);

  const fetchSupervisorAll = useCallback(async () => {
    try {
      const res = await getSupervisor();
      setSupervisors(res);
    } catch (error) {
      throw Error("Failted to get Supervisorall", error);
    }
  }, []);

  useEffect(() => {
    fetchSupervisorAll();
  }, [fetchSupervisorAll]);

  return supervisors;
}; //obtener todos los supervisores

export const useSupervisorCedula = (CEDULA) => {
  const [supervisorCedula, setSupervisorCedula] = useState([]);

  const fetchSupervisorCedula = useCallback(async () => {
    try {
      const res = await getSupervisorCedula(CEDULA);
      setSupervisorCedula(res);
    } catch (error) {
      throw Error("Failed to fetch :", error);
    }
  }, []);

  useEffect(() => {
    fetchSupervisorCedula();
  }, [fetchSupervisorCedula]);

  return supervisorCedula;
}; //obtener todos los supervisores x cedula

// fetch Salones
export const useSalonAll = () => {
  const [salones, setSalonAll] = useState([]);
  const fetchSalonAll = useCallback( async () => {
    try {
      const res = await getSalon();
      setSalonAll(res);
    } catch (error) {
      throw Error("Failted to get salonall", error);
    }
  }, []);

  useEffect(() => {
    fetchSalonAll();
  }, [fetchSalonAll]);

  return salones;
}; // obtiene todos los Salones

// fetch Horarios
export const useHorarioAll = () => {
  const [horarios, setHorarioAll] = useState([]);
  const fetchHorarioAll = useCallback(async () => {
    try {
      const res = await getHorarioAll();
      setHorarioAll(res);
    } catch (error) {
      throw Error("Failted to get horariosId", error);
    }
  }, []);

  useEffect(() => {
    fetchHorarioAll();
  }, [fetchHorarioAll]);

  return horarios;
}; // obtiene todos los Horarios

//fetch Categorias
//categorias x salon
export const useCategoriaxSalon = () => {
  const [categoriaxSalon, setCategorySalon] = useState([]);

  const fetchCategoryxSalon = useCallback(async () => {
    try {
      const res = await getCategorySalon();
      setCategorySalon(res);
    } catch (error) {
      throw Error("Failted to get horariosId", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoryxSalon();
  }, [fetchCategoryxSalon]);
  return categoriaxSalon;
}; // obtiene todas las categoria x salon

//fetch notifications
export const useNotificationCedulaEstado = (cedula, estado) => {
  console.log(estado);
  const [notificationCedulaEstado, setNotificationCedulaEstado] = useState([]);

  const fetchNotificationsAll = useCallback(async () => {
    try {
      const res = await getNotificationCedulaEstado(cedula, estado);
      setNotificationCedulaEstado(res);
    } catch (error) {
      throw Error("Error fetching notifications:", error);
    }
  }, [estado]);

  useEffect(() => {
    fetchNotificationsAll();
  }, [fetchNotificationsAll]);

  return notificationCedulaEstado;
}; // obtiene todas las notificaciones x cedula y estado

//fetch Comentarios
export const useComentarioDocente = (CEDULA) => {
  const [comentarioDocente, setComentarioDocente] = useState([]);

  const fetchComentarioDocente = useCallback(async () => {
    try {
      const res = await getHorarioDocente(CEDULA);
      setComentarioDocente(res);
    } catch (error) {
      throw Error("Error a fetching comentario", error);
    }
  }, [CEDULA]);

  useEffect(() => {
    fetchComentarioDocente();
  }, [fetchComentarioDocente]);
  return comentarioDocente;
}; // obtiene todas los comentarios x docente

//fetch Clases
export const useClasesAll = () => {
  const [clasesAll, setClassAll] = useState([]);
  const fetchClassAll = useCallback(async () => {
    try {
      const res = await getClasesAll();
      setClassAll(res);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  useEffect(() => {
    fetchClassAll();
  }, [fetchClassAll]);

  return clasesAll;
}; // obtiene todos las Clases

//fetch Reporte
export const useReporteAll = () => {
  const [reporteALL, setReporteoAll] = useState([]);
  const fetchReporteAll = useCallback(async () => {
    try {
      const res = await getReportAll();
      setReporteoAll(res);
    } catch (error) {
      throw Error("Failted to get horariosId", error);
    }
  }, []);

  useEffect(() => {
    fetchReporteAll();
  }, [fetchReporteAll]);

  return reporteALL;
}; // obtiene todos los Reportes

// ************ status the los hooks what no`Dont, but they are used globally ********

//fetch Dias de la semanas
//fetch Reporte
export const useDays = () => {
  const Days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const [days, setDiaAll] = useState([]);
  const fetchDia = useCallback(async () => {
    try {
      const res = Days.map((item, i) => ({ Dia: item, id: i + 1 }));
      console.log("response del all fetchDia", res);
      setDiaAll(res);
    } catch (error) {
      throw Error("Failted to get days", error);
    }
  }, []);

  useEffect(() => {
    fetchDia();
  }, [fetchDia]);

  return days;
}; // obtiene todos dias de la semana
