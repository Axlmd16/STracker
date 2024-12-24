import axios from "axios";

const TareasApi = ({ getStore, getActions, setStore, api }) => ({
    getActividades: async () => {
        const response = await api.get("/actividades");
        return response.data.data;
    },

    createActividad: async (data) => {
        const response = await api.post("/actividades", data);
        return response.data;
    },
});

export default TareasApi;
