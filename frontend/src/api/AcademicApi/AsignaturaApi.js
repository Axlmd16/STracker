import axios from "axios";

const AsignaturaApi = ({ getStore, getActions, setStore, api }) => ({
    getAsignaturas: async () => {
        const response = await api.get("/asignaturas");
        return response.data.data;
    },

    //* Api provisional para pruebas
    getProvAsignaturas: async () => {
        const api_prov = axios.create({
            baseURL: "https://retoolapi.dev/orfUoR",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await api_prov.get("/asignaturas");
        return response.data;
    },

    getProvAsignatura: async (id) => {
        const api_prov = axios.create({
            baseURL: "https://retoolapi.dev/orfUoR",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await api_prov.get(`/asignaturas/${id}`);
        return response.data;
    },
});

export default AsignaturaApi;
