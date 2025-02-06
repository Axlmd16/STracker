const AsignacionTestApi = ({ getStore, getActions, setStore, api }) => ({
    getAllAsignacionTest: async () => {
        const response = await api.get("/asignacion_test/");
        return response.data.data;
    },

    createAsignacionTest: async (asignacion) => {
        const response = await api.post("/asignacion_test/", asignacion);
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
});

export default AsignacionTestApi;
