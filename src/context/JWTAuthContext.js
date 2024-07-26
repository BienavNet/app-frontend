import { createContext, useEffect, useReducer, useRef } from "react";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";
import axiosInstance from "../services/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;

    const initialize = async () => {
      try {
        const accessToken = AsyncStorage.getItem("access_token");
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);
          const rol = AsyncStorage.getItem("rol");
          const response = await axiosInstance.get(`/login/sesion`);

          const { data: user } = response;
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const getTokens = async (correo, contrasena, rol) => {
    try {
      const response = await axiosInstance.post(`/login/`, {
        correo,
        contrasena,
        rol,
      });
      console.log("response ---->", response);
      const { token } = response.data;
      console.log("token ---->", token);
      if (token) {
        setSession(token);
        await AsyncStorage.setItem("access_token", token);
        await AsyncStorage.setItem("rol", rol);
      } else {
        throw new Error(response.data.message || "No access token received");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
  };

  const login = async (correo, contrasena, rol) => {
    try {
      await getTokens(correo, contrasena, rol);
      const response = await axiosInstance.get(`/login/sesion`);
      const { data: user } = response;
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    resetSession();
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
