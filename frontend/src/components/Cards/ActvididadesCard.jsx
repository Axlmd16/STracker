import React from "react";
import { ChevronRight } from "lucide-react";

const ActividadesPendientesCard = ({ actions, store }) => {
    const actividades = [
        {
            title: "Entrega Proyecto Final",
            subject: "Matemáticas",
            time: "Mañana",
        },
        {
            title: "Presentación Grupal",
            subject: "Física",
            time: "2 días",
        },
        {
            title: "Práctica de Laboratorio",
            subject: "Química",
            time: "Próxima semana",
        },
    ];

    return (
        <div className="card bg-base-100 shadow-lg mt-5">
            <div className="card-body">
                <h2 className="card-title flex justify-between items-center">
                    Actividades Pendientes
                    <span className="badge badge-primary">
                        {actividades.length}
                    </span>
                </h2>
                <div className="divide-y divide-base-200">
                    {actividades.map((activity, index) => (
                        <div
                            key={index}
                            className="py-3 hover:bg-base-200 rounded-lg transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-base-content/70">
                                        {activity.subject}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-base-content/70">
                                        {activity.time}
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActividadesPendientesCard;
