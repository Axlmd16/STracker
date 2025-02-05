const RecuperacionApi = ({ getStore, getActions, setStore, api }) => ({

    validar_usuario_cambio_password: async (data) => {
        console.log("Entro a validar usuario cambio de contrasenia");
        const api = getStore().api;
        const response = await api.post(`/validar_usuario_cambio_password`, data)
        return response.data
    },

    recuperar_password: async (data) => {
        const api = getStore().api;
        const response = await api.post(`/send-recovery-email`, data)
        return response.data
    },

    reset_password: async (data) => {
        const api = getStore().api;
        const response = await api.put(`/reset_password`, data)
        return response.data
    },
});

export default RecuperacionApi;
