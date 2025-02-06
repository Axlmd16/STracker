const ResultadoTestApi = ({ getStore, getActions, setStore, api }) => ({
    getResultadosPorEstudiante: async (estudiante_id) => {
        const response = await api.get(
            `/resultados/estudiante/${estudiante_id}`
        );
        return response.data.data;
    },

    agregarRetroalimentacion: async (resultado_id, retroalimentacion) => {
        const response = await api.put(
            `/resultados/${resultado_id}/retroalimentacion/`,
            { retroalimentacion }
        );
        return response;
    },

    getResultadosResueltosPorEstudiante: async (estudiante_id) => {
        const response = await api.get(
            `/resultados/estudiante/${estudiante_id}/historial/`
        );
        return response.data.data;
    },

    verificarResultado: async (resultado_id) => {
        const response = await api.get(`/resultados/${resultado_id}/validar`);
        return response.data.data;
    },

    obtenerResultado: async (resultado_id) => {
        const response = await api.get(`/resultados/${resultado_id}`);
        return response.data.data;
    },

    getInfoResultadosAsignatura: async (asignatura_id) => {
        const response = await api.get(
            `/resultados/asignatura/${asignatura_id}`
        );
        return response.data;
    },

    guardarIdUnico: async (id_unico) => {
        const response = await api.post(`/redis/guardar-id-unico/`, id_unico);
        return response.data;
    },

    eliminarIdUnico: async () => {
        const response = await api.delete(`/redis/eliminar-id-unico/`);
        return response.data;
    },
});

export default ResultadoTestApi;
