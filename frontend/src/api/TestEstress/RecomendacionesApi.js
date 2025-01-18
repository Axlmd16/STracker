const RecomendacionesApi = ({ getStore, getActions, setStore, api }) => ({
    obtenerRecomendacionesPorTest: async (id_test) => {
        const response = await api.get("/recomendaciones/test/" + id_test);
        return response.data.data;
    },

    obtenerTodasRecomendaciones: async () => {
        const response = await api.get("/recomendaciones");
        return response.data.data;
    },

    crearRecomendacion: async (recomendacion) => {
        const response = await api.post("/recomendaciones", recomendacion);
        return response.data;
    },

    actualizarRecomendacion: async (id, data) => {
        const response = await api.put(`/recomendaciones/${id}`, data);
        return response.data;
    },

    eliminarRecomendacion: async (id) => {
        const response = await api.delete(`/recomendaciones/${id}`);
        return response.data;
    },

    agregarRecomendacionTest: async (id_test, id_recomendacion) => {
        const response = await api.post(
            `/recomendaciones/test/${id_recomendacion}/${id_test}`
        );
        return response.data;
    },

    eliminarRecomendacionTest: async (id_test, id_recomendacion) => {
        const response = await api.delete(
            `/recomendaciones/test/${id_recomendacion}/${id_test}`
        );
        return response.data;
    },
    obtener_recomendaciones_por_test: async (id_test) => {
        const response = await api.get(`/recomendaciones/test/${id_test}`);
        return response.data;
    },
});

export default RecomendacionesApi;
