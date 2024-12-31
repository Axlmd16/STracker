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
});

export default CuentasApi;
