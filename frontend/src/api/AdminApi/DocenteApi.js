const DocenteApi = ({ getStore, getActions, setStore, api }) => ({
    getDocentes: async () => {
        const response = await api.get("/docentes");
        return response.data.data;
    },

    createDocente: async (docente) => {
        const response = await api.post("/usuarios", docente);
        return response.data;
    },

    importarDocentes: async (data) => {
        const requestData = {
            data: data,
        };
        console.log("Datos a enviar:", requestData);

        const response = await api.post("/usuarios/importar", requestData);
        console.log(response);
        return response;
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
