import React from "react";
import { BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function SubjectCard({
    id,
    nombre,
    paralelo,
    fecha_inicio,
    fecha_fin,
    nro_horas,
}) {
    return (
        <Link to={`/home/docente/asignatura/${id}`}>
            <div className="card bg-white hover:shadow-xl transition-all duration-300 h-full">
                <div className="card-body p-4">
                    {/* Encabezado con icono y título */}
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="card-title text-lg">{nombre}</h3>
                            <div className="badge badge-ghost">
                                Paralelo {paralelo}
                            </div>
                        </div>
                    </div>

                    <div className="divider my-2"></div>

                    {/* Información detallada */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-base-content/60" />
                            <div className="flex gap-2">
                                <span className="font-medium">Inicio:</span>
                                <span className="text-base-content/80">
                                    {new Date(fecha_inicio).toLocaleDateString(
                                        "es-ES"
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-base-content/60" />
                            <div className="flex gap-2">
                                <span className="font-medium">Fin:</span>
                                <span className="text-base-content/80">
                                    {new Date(fecha_fin).toLocaleDateString(
                                        "es-ES"
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="w-4 h-4 text-base-content/60" />
                            <div className="flex gap-2">
                                <span className="font-medium">
                                    Horas totales:
                                </span>
                                <span className="text-base-content/80">
                                    {nro_horas}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer con flecha */}
                    <div className="card-actions justify-end mt-4">
                        <ChevronRight className="w-5 h-5 text-base-content/40" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SubjectCard;
