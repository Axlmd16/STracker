import React, { useCallback, useState, useEffect } from "react";
import {
    Brain,
    Calendar,
    CircleCheckBig,
    Clock,
    ClockAlert,
    Share2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TestDeEstresCard({ actions, store }) {
    const [resultados, setResultados] = useState([]);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const fetchResultadosEstudiante = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getResultadosPorEstudiante(
                store.id_user_auth
            );
            setResultados(data);
        } catch (error) {
            toast.error("Error al cargar las actividades académicas");
        } finally {
            setPending(false);
        }
    }, [actions, store]);

    useEffect(() => {
        fetchResultadosEstudiante();
    }, [fetchResultadosEstudiante]);

    const formatDate = (dateString) => {
        if (!dateString) return "No realizado";
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleRealizarTest = (resultado) => {
        navigate(`/home/estudiante/resultado_test/${resultado.id}`, {
            state: { resultado },
        });
    };

    if (pending) {
        return (
            <div className="w-full h-32 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-transparent h-3/5 overflow-y-scroll scrollbar-hide">
            <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <h2 className="text-lg font-bold">
                    Tests de Estrés Pendientes
                </h2>
            </div>

            {resultados.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-base-content/70">
                        No hay tests de estrés pendientes.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {resultados.map((resultado, index) => (
                        <button
                            key={index}
                            className="w-full"
                            onClick={() => handleRealizarTest(resultado)}
                        >
                            <div className="card bg-white shadow hover:shadow-lg transition-shadow duration-300">
                                <div className="card-body p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-sm text-base-content/80">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    Asignado:{" "}
                                                    {formatDate(
                                                        resultado.asignacion
                                                            ?.fecha_asignacion
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-base-content/80 mt-1">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    Límite:{" "}
                                                    {formatDate(
                                                        resultado.asignacion
                                                            ?.fecha_limite
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div
                                                className={`${
                                                    resultado.fecha_realizacion
                                                        ? "text-green-900"
                                                        : "text-yellow-900"
                                                }`}
                                            >
                                                {resultado.fecha_realizacion ? (
                                                    <CircleCheckBig size={27} />
                                                ) : (
                                                    <ClockAlert size={27} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-base-content/70">
                                        <Share2 className="w-3 h-3" />
                                        <span>
                                            {resultado.compartido ? (
                                                <span className="text-success">
                                                    Compartido
                                                </span>
                                            ) : (
                                                <span className="text-warning">
                                                    No compartido
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TestDeEstresCard;
