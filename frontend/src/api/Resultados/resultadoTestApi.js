const ResultadoTestApi = ({ getStore, getActions, setStore, api }) => ({
    getResultadosPorEstudiante: async (estudiante_id) => {
        const response = await api.get(
            `/resultados/estudiante/${estudiante_id}`
        );
        return response.data.data;
    },
});

export default ResultadoTestApi;
