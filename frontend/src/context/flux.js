import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthApi from "../api/LoginApi/AuthApi";
import DocenteApi from "../api/AdminApi/DocenteApi";
import AsignaturaApi from "../api/AcademicApi/AsignaturaApi";
import TestEstresApi from "../api/TestEstress/TestEstresApi";
import AsignacionTestApi from "../api/TestEstress/AsignacionTest";
import EstudianteApi from "../api/AcademicApi/EstudianteApi";
import TareasApi from "../api/AcademicApi/TareasApi";

const getState = ({ getStore, getActions, setStore }) => {
    const API_BASE_URL = "http://127.0.0.1:8000";

    const api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const token = localStorage.getItem("access_token");
    let access_role = null;
    let id_user_auth = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        access_role = decodedToken.rol;
        id_user_auth = decodedToken.id_usuario;
    }

    return {
        store: {
            api,
            isAuthenticated: !!token,
            access_role: access_role,
            id_user_auth: id_user_auth,
        },
        actions: {
            ...AuthApi({ getStore, getActions, setStore, api }),
            ...DocenteApi({ getStore, getActions, setStore, api }),
            ...AsignaturaApi({ getStore, getActions, setStore, api }),
            ...TestEstresApi({ getStore, getActions, setStore, api }),
            ...AsignacionTestApi({ getStore, getActions, setStore, api }),
            ...EstudianteApi({ getStore, getActions, setStore, api }),
            ...TareasApi({ getStore, getActions, setStore, api }),
        },
    };
};

export default getState;
