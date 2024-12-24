const TestEstresApi = ({ getStore, getActions, setStore, api }) => ({
    getAllTestEstres: async () => {
        const response = await api.get("/test_estres");
        return response.data.data;
    },

    createTestEstres: async (docente) => {
        const response = await api.post("/test_estres", docente);
        return response.data;
    },

    updateTestEstres: async (id, data) => {
        const response = await api.put(`/test_estres/${id}`, data);
        return response.data;
    },

    deleteTestEstres: async (id) => {
        const response = await api.delete(`/test_estres/${id}`);
        return response.data;
    },
});

export default TestEstresApi;
