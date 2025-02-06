const GroupApi = ({ getStore, getActions, setStore, api }) => ({
    getAllGroups: async () => {
        const response = await api.get("/grupos");
        return response.data.data;
    },

    getAllGroupsForAsignature: async (id_asignatura) => {
        const response = await api.get(`/grupo/asignatura/${id_asignatura}`);
        return response.data.data;
    },

    getStudentsForGroup: async (id_group) => {
        const response = await api.get(`/grupos/estudiantes/${id_group}`);
        return response.data.data;
    },

    getGroup: async (id_group) => {
        const response = await api.get("/grupos/" + id_group);
        return response.data.data;
    },

    createGroup: async (data) => {
        const response = await api.post("/grupos", data);
        return response.data;
    },

    updateGroup: async (id_group, data) => {
        const response = await api.put(`/grupos/${id_group}`, data);
        return response.data;
    },

    deleteGroup: async (id_group) => {
        const response = await api.delete(`/grupos/${id_group}`);
        return response.data;
    },

    getGroupsByAsignatura: async (id_asignatura) => {
        const response = await api.get(`/grupo/asignatura/${id_asignatura}`);
        return response.data.data;
    },

    addStudentToGroup: async (estudiante_id, grupo_id) => {
        const response = await api.post(`/estudiante_grupo/${estudiante_id}/${grupo_id}`);
        return response.data;
    },

    removeStudentFromGroup: async (estudiante_id, grupo_id) => {
        const response = await api.delete(`/estudiante_grupo/${estudiante_id}/${grupo_id}`);
        return response.data;
    },
});

export default GroupApi;
