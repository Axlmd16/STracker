import React from "react";
import { Activity, BookCheck, Brain, FileSpreadsheet } from "lucide-react";

function StadisticsGrid({ data }) {
    const {
        actividades_pendientes,
        tests_pendientes,
        participacion = "78%",
        nivel_estres = "Medio",
    } = data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat bg-white rounded-box shadow">
                <div className="stat-figure text-primary">
                    <BookCheck className="w-8 h-8" />
                </div>
                <div className="stat-title">Actividades Pendientes</div>
                <div className="stat-value text-primary">
                    {actividades_pendientes}
                </div>
            </div>

            <div className="stat bg-white rounded-box shadow">
                <div className="stat-figure text-secondary">
                    <FileSpreadsheet className="w-8 h-8" />
                </div>
                <div className="stat-title">Tests Pendientes</div>
                <div className="stat-value text-secondary">
                    {tests_pendientes}
                </div>
            </div>

            <div className="stat bg-white rounded-box shadow">
                <div className="stat-figure text-success">
                    <Activity className="w-8 h-8" />
                </div>
                <div className="stat-title">Participación</div>
                <div className="stat-value text-success">{participacion}</div>
            </div>

            <div className="stat bg-white rounded-box shadow">
                <div className="stat-figure text-warning">
                    <Brain className="w-8 h-8" />
                </div>
                <div className="stat-title">Nivel de Estrés</div>
                <div className="stat-value text-warning">{nivel_estres}</div>
            </div>
        </div>
    );
}

export default StadisticsGrid;
