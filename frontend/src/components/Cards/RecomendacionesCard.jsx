import React, { useEffect, useState } from "react";
import { Heart, Clock, Coffee } from "lucide-react";

const RecomendacionesCard = ({ actions, store, test_id, nivel_actual }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await actions.obtener_recomendaciones_por_test(
                    test_id
                );
                console.log("Data:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [actions, test_id]);

    if (loading) {
        return (
            <div className="card bg-white shadow-lg">
                <div className="card-body p-4 ">
                    <h2 className="card-title text-lg mb-4">Recomendaciones</h2>
                    <div className="flex justify-center items-center h-32">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                </div>
            </div>
        );
    }

    const getIcon = (titulo) => {
        switch (titulo.toLowerCase()) {
            case "descansos":
                return Heart;
            case "rutina de sueño":
                return Clock;
            case "hidratación":
                return Coffee;
            default:
                return Heart; // Icono por defecto
        }
    };

    const getColor = (prioridad) => {
        switch (prioridad) {
            case 1:
                return "text-red-500"; // Alta prioridad
            case 2:
                return "text-yellow-500"; // Media prioridad
            case 3:
                return "text-green-500"; // Baja prioridad
            default:
                return "text-gray-500"; // Color por defecto
        }
    };

    // Filtrar recomendaciones según el nivel actual
    const filteredData = data.filter((recomendacion) => {
        switch (nivel_actual.toLowerCase()) {
            case "alto":
                return recomendacion.prioridad === 1;
            case "medio":
                return recomendacion.prioridad === 2;
            case "bajo":
                return recomendacion.prioridad === 3;
            default:
                return true; // Mostrar todas si el nivel no coincide
        }
    });

    return (
        <div className="card bg-white shadow-lg">
            <div className="card-body p-4 ">
                <h2 className="card-title text-lg mb-4">Recomendaciones</h2>
                <div className="space-y-4 min-h-[100px] max-h-[160px] overflow-y-auto ">
                    {filteredData?.length > 0 ? (
                        filteredData.map((recomendacion, i) => {
                            const IconComponent = getIcon(recomendacion.titulo);
                            const colorClass = getColor(
                                recomendacion.prioridad
                            );
                            return (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="flex items-center justify-center bg-primary/10 rounded-full h-12 w-12">
                                        <IconComponent
                                            className={`h-6 w-6 ${colorClass}`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            {recomendacion.titulo}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {recomendacion.descripcion}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-base-content/70 font-semibold">
                                            {recomendacion.prioridad === 1
                                                ? "Alta Prioridad"
                                                : recomendacion.prioridad === 2
                                                ? "Media Prioridad"
                                                : "Baja Prioridad"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-gray-500">
                            No hay recomendaciones
                        </p>
                    )}

                    {/* Espaciador si hay menos de 10 elementos */}
                    {Array.from({
                        length: 10 - Math.min(10, filteredData.length),
                    }).map((_, i) => (
                        <div
                            key={i}
                            className="flex gap-3 items-start invisible"
                        >
                            {/* Esto asegura que el contenedor tenga el tamaño correcto */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecomendacionesCard;
