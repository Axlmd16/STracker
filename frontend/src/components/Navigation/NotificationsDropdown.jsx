import React, { useState, useEffect, useCallback } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";

const NotificationsDropdown = ({ actions, store }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [pending, setPending] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const [notificacionesPorPagina] = useState(5);

    const fetchNotificaciones = useCallback(async () => {
        setPending(true);
        try {
            const userId = store.id_user_auth;
            if (userId) {
                const notificacionesData = await actions.obtenerNotificacionesUsuario(userId);

                if (Array.isArray(notificacionesData)) {
                    const últimasNotificaciones = notificacionesData.reverse().slice(0, 10);
                    setNotificaciones(últimasNotificaciones);
                } else {
                    setNotificaciones([]);
                }
            }
        } catch (error) {
            console.error("Error al obtener las notificaciones:", error);
            setNotificaciones([]);
        } finally {
            setPending(false);
        }
    }, [actions, store.id_user_auth]);

    useEffect(() => {
        fetchNotificaciones();
    }, [fetchNotificaciones]);

    const indexOfLastNotification = paginaActual * notificacionesPorPagina;
    const indexOfFirstNotification = indexOfLastNotification - notificacionesPorPagina;
    const notificacionesPaginaActual = notificaciones.slice(indexOfFirstNotification, indexOfLastNotification);

    const handlePageChange = (pagina) => {
        setPaginaActual(pagina);
    };

    const totalPages = Math.ceil(notificaciones.length / notificacionesPorPagina);

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-2"
                aria-label="Menú de Notificaciones"
            >
                <div className="indicator">
                    <Bell size="24" />
                    {notificaciones.length > 0 && (
                        <span className="badge badge-xs badge-primary"></span>
                    )}
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-3 shadow-lg"
            >
                {pending && (
                    <li className="text-sm text-gray-500 text-center select-none">
                        Cargando notificaciones...
                    </li>
                )}
                {notificaciones.length === 0 && !pending && (
                    <li className="text-sm text-gray-500 text-center select-none">
                        No tienes notificaciones
                    </li>
                )}
                {!pending &&
                    notificacionesPaginaActual.map((notificacion) => (
                        <li
                            key={notificacion.id}
                            className="py-1 border-b border-gray-300 last:border-b-0 select-none flex"
                            style={{ cursor: "default" }}
                        >
                            <div className="flex flex-col items-start gap-0 w-full">
                                <div className="font-semibold text-cyan-600" style={{ fontSize: '11px' }}>
                                    {notificacion.titulo}
                                </div>
                                <div className="text-gray-600 break-words" style={{ fontSize: '10px', display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2, textOverflow: 'ellipsis' }}>
                                    {notificacion.mensaje}
                                </div>
                                <div className="text-gray-400" style={{ fontSize: '10px' }}>
                                    {new Date(notificacion.fecha).toLocaleString()}
                                </div>
                            </div>
                        </li>
                    ))}

                {notificaciones.length >= 6 && (
                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={() => handlePageChange(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            className="btn btn-sm btn-outline"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-sm text-gray-500 mx-4">
                            Página {paginaActual} de {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(paginaActual + 1)}
                            disabled={paginaActual === totalPages}
                            className="btn btn-sm btn-outline"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default NotificationsDropdown;
