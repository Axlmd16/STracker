import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthApi from "../api/LoginApi/AuthApi";
import DocenteApi from "../api/AdminApi/DocenteApi";

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
    if (token) {
        const decodedToken = jwtDecode(token);
        access_role = decodedToken.rol;
    }

    return {
        store: {
            api,
            isAuthenticated: !!token,
            access_role: access_role,
        },
        actions: {
            ...AuthApi({ getStore, getActions, setStore, api }),
            ...DocenteApi({ getStore, getActions, setStore, api }),
        },
    };
};

export default getState;
