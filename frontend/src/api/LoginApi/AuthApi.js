import { jwtDecode } from "jwt-decode";

const AuthApi = ({ getStore, getActions, setStore, api }) => ({
    iniciar_sesion: async (data) => {
        try {
            const response = await api.post("/login", data);
            const token = response.data.token;
            localStorage.setItem("access_token", token);
            const decodedToken = jwtDecode(token);
            setStore({
                isAuthenticated: true,
                access_role: decodedToken.rol,
                id_user_auth: decodedToken.id_usuario,
            });
            return true; // Devuelve true si la autenticación es exitosa
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data);
            // Devuelve el mensaje de error que viene del backend
            return (
                error.response?.data?.message ||
                "Error inesperado al iniciar sesión"
            );
        }
    },

    // Acción para cerrar sesión
    cerrar_sesion: () => {
        localStorage.removeItem("access_token");
        setStore({ isAuthenticated: false, access_role: null });
    },

    getUserInfo: async (id) => {
        const response = await api.get(`/usuarios/${id}`);
        return response.data.data;
    },
});

export default AuthApi;
