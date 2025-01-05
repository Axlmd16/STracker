import axios from "axios";

const EstudianteApi = ({ getStore, getActions, setStore, api }) => ({
    createEstudiante: async (data, asig) => {
        const response = await api.post("/usuarios", data);
        return response.data;
    },

    getEstudiantes: async () => {
        const response = await api.get("/usuarios");
        return response.data.data;
    },

    getEstudiante: async (id) => {
        const response = await api.get(`/usuarios/${id}`);
        return response.data.data;
    },
});

export default EstudianteApi;
