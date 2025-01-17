const AsignacionTestApi = ({ getStore, getActions, setStore, api }) => ({
    getAllAsignacionTest: async () => {
        const response = await api.get("/asignacion_test/");
        return response.data.data;
    },

    getAllAsignacionTestForAsignature: async (id_asignatura) => {
        const response = await api.get(
            `/asignacion_test/asignatura/${id_asignatura}`
        );
        return response.data.data;
    },

    createAsignacionTest: async (asignacion) => {
        const response = await api.post("/asignacion_test/", asignacion);
        return response.data;
    },

    createAsignacionTestGrupal: async (asignacion) => {
        const response = await api.post("/asignacion_test/grupal", asignacion);
        return response.data;
    },

    updateAsignacionTest: async (id, data) => {
        const response = await api.put(`/asignacion_test/${id}`, data);
        return response.data;
    },

    deleteAsignacionTest: async (id) => {
        const response = await api.delete(`/asignacion_test/${id}`);
        return response.data;
    },

    //! Nota: Esto debo cambiarlo en otro archivo
    getAllActivitiesForAsignature: async (id_asignatura) => {
        const response = await api.get(
            `/actividades/asignatura/${id_asignatura}`
        );
        return response.data.data;
    },

    //! Nota: Esto debo cambiarlo en otro archivo
    getAllGroupsForAsignature: async (id_asignatura) => {
        const response = await api.get(`/grupo/asignatura/${id_asignatura}`);
        return response.data.data;
    },
});

export default AsignacionTestApi;
