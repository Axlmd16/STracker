import React from "react";
import { Heart, Clock, Coffee } from "lucide-react";

const RecomendacionesCard = ({ actions, store }) => {
    const recomendaciones = [
        {
            icon: Heart,
            color: "success",
            title: "Descansos",
            desc: "15 min cada 2 horas",
        },
        {
            icon: Clock,
            color: "primary",
            title: "Rutina de Sueño",
            desc: "8 horas diarias",
        },
        {
            icon: Coffee,
            color: "warning",
            title: "Hidratación",
            desc: "2L de agua al día",
        },
        {
            icon: Heart,
            color: "success",
            title: "Descansos",
            desc: "15 min cada 2 horas",
        },
        {
            icon: Clock,
            color: "primary",
            title: "Rutina de Sueño",
            desc: "8 horas diarias",
        },
        {
            icon: Coffee,
            color: "warning",
            title: "Hidratación",
            desc: "2L de agua al día",
        },
        {
            icon: Heart,
            color: "success",
            title: "Descansos",
            desc: "15 min cada 2 horas",
        },
        {
            icon: Clock,
            color: "primary",
            title: "Rutina de Sueño",
            desc: "8 horas diarias",
        },
        {
            icon: Coffee,
            color: "warning",
            title: "Hidratación",
            desc: "2L de agua al día",
        },
        {
            icon: Coffee,
            color: "warning",
            title: "Hidratación",
            desc: "2L de agua al día",
        },
    ];

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-4">
                <h2 className="card-title text-lg mb-4">Recomendaciones</h2>
                <div className="space-y-4 min-h-[400px] max-h-[400px] overflow-y-auto">
                    {recomendaciones.slice(0, 10).map((rec, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <div
                                className={`bg-${rec.color}/20 p-2 rounded-lg`}
                            >
                                <rec.icon
                                    className={`w-4 h-4 text-${rec.color}`}
                                />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">
                                    {rec.title}
                                </h3>
                                <p className="text-xs text-base-content/70">
                                    {rec.desc}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Espaciador si hay menos de 10 elementos */}
                    {Array.from({
                        length: 10 - Math.min(10, recomendaciones.length),
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
