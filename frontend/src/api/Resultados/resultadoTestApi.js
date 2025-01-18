const ResultadoTestApi = ({ getStore, getActions, setStore, api }) => ({
    getResultadosPorEstudiante: async (estudiante_id) => {
        const response = await api.get(
            `/resultados/estudiante/${estudiante_id}`
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
});

export default ResultadoTestApi;
