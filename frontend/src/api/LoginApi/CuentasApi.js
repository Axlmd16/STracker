const CuentasApi = ({ getStore, getActions, setStore, api }) => ({
    getCuentas: async () => {
        const response = await api.get("/cuentas");
        return response.data.data;
    },

    updateEstadoCuenta: async (id, activar) => {
        const response = await api.put(`/cuentas/${id}/cambiar_estado`, {
            activar,
        });
        return response.data.data;
    },

    getUltimosUsuarios: async () => {
        const response = await api.get("/usuarios_ultimos");
        return response.data;
    },

    getInfoGeneral: async () => {
        const response = await api.get("/informacion_general");
        return response.data;
    },

    getUltimosTests: async () => {
        const response = await api.get("/test_estres_ultimos");
        return response.data.data;
    },

    recuperar_password: async (data) => {
        const api = getStore().api;
        const response = await api.post(`/send-recovery-email`, data)
        return response.data
    },

    reset_password: async (data) => {
        const api = getStore().api;
        const response = await api.put(`/send-reset_password-email`, data)
        return response.data
    },
});

export default CuentasApi;
