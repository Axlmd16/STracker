import React, { useState, useEffect, useCallback } from "react";
import { Bell, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

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
                const notificacionesData =
                    await actions.obtenerNotificacionesUsuario(userId);
                if (Array.isArray(notificacionesData)) {
                    const últimasNotificaciones = notificacionesData
                        .reverse()
                        .slice(0, 10);
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
    const indexOfFirstNotification =
        indexOfLastNotification - notificacionesPorPagina;
    const notificacionesPaginaActual = notificaciones.slice(
        indexOfFirstNotification,
        indexOfLastNotification
    );

    const totalPages = Math.ceil(
        notificaciones.length / notificacionesPorPagina
    );

    return (
        <div className="dropdown dropdown-end">
            <button
                className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors duration-200"
                aria-label="Menú de Notificaciones"
            >
                <div className="relative">
                    {notificaciones.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary text-primary-content text-xs font-medium rounded-full">
                            {notificaciones.length}
                        </span>
                    )}
                    <Bell className="h-6 w-6" />
                </div>
            </button>

            <div className="dropdown-content z-[100] mt-4 w-80 overflow-hidden rounded-xl border bg-base-100 shadow-lg">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold text-base">Notificaciones</h3>
                    {notificaciones.length > 0 && (
                        <span className="text-xs text-base-content/60">
                            {notificaciones.length} nuevas
                        </span>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {pending ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-6 w-6 animate-spin text-base-content/60" />
                        </div>
                    ) : notificaciones.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 text-base-content/60">
                            <Bell className="h-12 w-12 mb-3 stroke-1" />
                            <p className="text-sm">No tienes notificaciones</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {notificacionesPaginaActual.map((notificacion) => (
                                <div
                                    key={notificacion.id}
                                    className="p-4 hover:bg-base-200 transition-colors duration-200"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium text-sm text-primary">
                                                {notificacion.titulo}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-base-content/80 line-clamp-2">
                                            {notificacion.mensaje}
                                        </p>
                                        <time className="block text-xs text-base-content/60">
                                            {new Date(
                                                notificacion.fecha
                                            ).toLocaleString()}
                                        </time>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {notificaciones.length >= 6 && (
                    <div className="border-t p-3 flex items-center justify-between gap-4">
                        <button
                            onClick={() => setPaginaActual((prev) => prev - 1)}
                            disabled={paginaActual === 1}
                            className="btn btn-sm btn-ghost"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <span className="text-sm text-base-content/60">
                            Página {paginaActual} de {totalPages}
                        </span>

                        <button
                            onClick={() => setPaginaActual((prev) => prev + 1)}
                            disabled={paginaActual === totalPages}
                            className="btn btn-sm btn-ghost"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsDropdown;
