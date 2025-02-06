const NotificaionApi = ({ getStore, getActions, setStore, api }) => ({
    obtenerNotificacionesUsuario: async (usuario_id) => {
        const response = await api.get(
            `/notificaciones/usuario/${usuario_id}`
        );
        return response.data.data;
    },
});

export default NotificaionApi;
