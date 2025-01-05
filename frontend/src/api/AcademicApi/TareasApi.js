import axios from "axios";

const API_BASE_URL2 = "http://127.0.0.1:8000";

const api2 = axios.create({
    baseURL: API_BASE_URL2,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
    },
});

const TareasApi = ({ getStore, getActions, setStore, api }) => ({
    createActividad: async (data) => {
        const formData = new FormData();

        if (data.archivo && data.archivo[0]) {
            formData.append("archivo", data.archivo[0]);
        }

        // Agregar el resto de datos
        formData.append("titulo", data.titulo);
        formData.append("descripcion", data.descripcion);
        formData.append("fecha_inicio", data.fecha_inicio);
        formData.append("fecha_fin", data.fecha_fin);
        formData.append("asignatura_id", data.asignatura_id);
        formData.append("tipo_actividad", data.tipo_actividad);

        const response = await api2.post("/actividades", formData);
        return response.data;
    },

    getActividades: async () => {
        const response = await api.get("/actividades");
        return response.data.data;
    },

    getActividad: async (id) => {
        const response = await api.get(`/actividades/${id}`);
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
});

export default TareasApi;
