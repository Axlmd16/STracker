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
            });
            return true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return false;
        }
    },

    // Acción para cerrar sesión
    cerrar_sesion: () => {
        localStorage.removeItem("access_token");
        setStore({ isAuthenticated: false, access_role: null });
    },
});

export default AuthApi;
