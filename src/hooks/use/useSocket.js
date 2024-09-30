import { useContext } from "react";
import {NotificationContext} from '../../context/SocketContext'

export const useSocket = () => useContext(NotificationContext);