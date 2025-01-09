import React, { useCallback, useState, useEffect } from "react";
import { Brain, Calendar, Clock, ClockAlert, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="grid gap-4 bg-base-200 rounded-xl">
            {resultados.map((resultado, index) => (
                <div
                    key={index}
                    className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="card-body p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Brain className="w-8 h-8 text-primary" />
                                <h2 className="card-title text-xl font-bold">
                                    Test de Estrés
                                </h2>
                            </div>
                            <div
                                className={`badge badge-md ${
                                    resultado.resultado
                                        ? "badge-success font-semibold text-green-900"
                                        : "badge-warning font-semibold text-yellow-900"
                                }`}
                            >
                                {resultado.resultado ? (
                                    `Resultado: ${resultado.resultado}`
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <ClockAlert size={15} /> Pendiente
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-base-content/80">
                                <Calendar className="w-5 h-5" />
                                <span className="text-sm">
                                    Asignado:{" "}
                                    {formatDate(
                                        resultado.asignacion?.fecha_asignacion
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-base-content/80">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm">
                                    Fecha límite:{" "}
                                    {formatDate(
                                        resultado.asignacion?.fecha_limite
                                    )}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-base-content/80">
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm">
                                    Estado:{" "}
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

                        {/* Status Indicator */}
                        <div className="mt-4 flex justify-end">
                            {!resultado.fecha_realizacion && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleRealizarTest(resultado)
                                    }
                                >
                                    Realizar Test
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TestDeEstresCard;
