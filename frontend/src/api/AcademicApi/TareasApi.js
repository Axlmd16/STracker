import axios from "axios";

const TareasApi = ({ getStore, getActions, setStore, api }) => ({
    getActividades: async () => {
        const response = await api.get("/actividades");
        return response.data.data;
    },

    updateEstadoActividad: async () => {
        try {
            await api.post("/actividades/actualizar-estados");
        } catch (error) {
            console.error("Error en updateEstadoActividad:", error);
            throw error;
        }
    },
    createActividad: async (data) => {
        const response = await api.post("/actividades", data);
        return response.data;
    },
});

export default TareasApi;
