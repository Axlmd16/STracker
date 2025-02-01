import React, { useCallback, useState, useEffect } from "react";
import { BookOpen, Clock, Calendar, Users } from "lucide-react";
import { toast } from "react-hot-toast";

function AsignaturaCardEstudiante({ actions, store }) {
    const [asignaturas, setAsignaturas] = useState([]);
    const [pending, setPending] = useState(false);

    const fetchData = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAsignaturasEstudiante(
                store.id_user_auth
            );
            setAsignaturas(data);
        } catch (error) {
            toast.error("Error al cargar las asignaturas");
        } finally {
            setPending(false);
        }
    }, [actions, store]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
        });
    };

    if (pending) {
        return (
            <div className="w-full h-24 flex items-center justify-center">
                <div className="loading loading-spinner loading-md text-primary"></div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Mis Asignaturas</h2>
                </div>
                <span className="text-sm text-base-content/70">
                    {asignaturas.length} asignaturas inscritas
                </span>
            </div>

            {/* Scroll container */}
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
                <div className="flex gap-4 pb-2 min-w-full">
                    {asignaturas.length === 0 && (
                        <span className="text-md text-base-content/70 p-4">
                            No estas inscrito en ninguna asignatura
                        </span>
                    )}
                    {asignaturas.map((asignatura, index) => (
                        <div
                            key={index}
                            className="flex-none w-64 bg-green-100 rounded-lg hover:bg-green-200 shadow-lg cursor-pointer
                            transition-all duration-300 group"
                        >
                            <div className="p-4 space-y-3">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-base mb-1">
                                            {asignatura.nombre}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-base-content/70">
                                            <Users className="w-3 h-3" />
                                            <span>
                                                Paralelo {asignatura.paralelo}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="badge bg-blue-100 badge-sm">
                                        <span className="text-blue-900 font-medium">
                                            {asignatura.nro_horas}h
                                        </span>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="flex items-center justify-between text-xs text-base-content/70">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            {formatDate(
                                                asignatura.fecha_inicio
                                            )}
                                        </span>
                                    </div>
                                    <span>→</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>
                                            {formatDate(asignatura.fecha_fin)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover effect bar */}
                            <div className="h-1 w-full bg-primary/0 group-hover:bg-primary/100 transition-all duration-300 rounded-b-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AsignaturaCardEstudiante;
