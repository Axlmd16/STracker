const DocenteApi = ({ getStore, getActions, setStore, api }) => ({
    getDocentes: async () => {
        const response = await api.get("/docentes");
        return response.data.data;
    },

    createDocente: async (docente) => {
        const response = await api.post("/usuarios", docente);
        return response.data;
    },

    updateDocente: async (id, docente) => {
        const response = await api.put(`/docentes/${id}`, docente);
        return response.data;
    },

    deleteDocente: async (id) => {
        const response = await api.delete(`/docentes/${id}`);
        return response.data;
    },
});

export default DocenteApi;
