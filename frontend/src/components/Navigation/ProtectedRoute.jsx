import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/context";

function ProtectedRoute({ children, to, isPublic = false }) {
    const { store } = useContext(Context);

    // Redirige a la ruta de destino en función de si es pública o protegida
    if (isPublic && store.isAuthenticated) {
        return <Navigate to={to} replace />; // Redirige a /home si intenta acceder a login o registro autenticado
    }
    if (!isPublic && !store.isAuthenticated) {
        return <Navigate to="/login" replace />; // Redirige a /login si intenta acceder a rutas protegidas sin autenticación
    }

    return children;
}

export default ProtectedRoute;
