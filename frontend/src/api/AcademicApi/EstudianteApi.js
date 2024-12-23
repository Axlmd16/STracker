import axios from "axios";

const EstudianteApi = ({ getStore, getActions, setStore, api }) => ({
    createEstudiante: async (data, asig) => {
        const response = await api.post("/usuarios", data);
        return response.data;
    },
});

export default EstudianteApi;
