import React from "react";
import {
    AlertTriangle,
    Brain,
    BookOpen,
    Clock,
    Users,
    TrendingUp,
    AlertCircle,
    Calendar,
} from "lucide-react";

const StressIndicators = ({ className }) => {
    // Datos de ejemplo
    const stressData = {
        alertStudents: 3,
        totalStudents: 35,
        workload: "Media-Alta",
        difficulty: "Media",
        weeklyReports: 28,
        lastUpdate: "2024-04-18",
        stressLevels: {
            high: 3,
            medium: 12,
            low: 20,
        },
    };

    return (
        <div className={`card bg-white shadow-lg ${className}`}>
            <div className="card-body">
                {/* Encabezado con badge de estado */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="card-title text-xl flex items-center gap-2">
                        <Brain className="w-6 h-6 text-warning" />
                        <span>Indicadores de Estrés del Curso</span>
                    </h2>
                    <div className="badge badge-warning gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Atención Requerida
                    </div>
                </div>

                {/* Alerta principal */}
                <div className="alert alert-warning shadow-sm">
                    <AlertTriangle className="w-6 h-6" />
                    <div>
                        <h3 className="font-bold">Alerta de Estrés</h3>
                        <div className="text-sm">
                            {stressData.alertStudents} de{" "}
                            {stressData.totalStudents} estudiantes han reportado
                            niveles altos de estrés esta semana
                        </div>
                    </div>
                </div>

                {/* Indicadores principales */}
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className="bg-base-200 p-4 rounded-lg border border-base-300">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <div className="text-sm font-medium">
                                Carga de Trabajo
                            </div>
                        </div>
                        <div className="text-xl font-bold text-primary">
                            {stressData.workload}
                        </div>
                        <div className="text-xs text-base-content/70 mt-1">
                            Basado en {stressData.weeklyReports} reportes
                            semanales
                        </div>
                    </div>

                    <div className="bg-base-200 p-4 rounded-lg border border-base-300">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                            <div className="text-sm font-medium">
                                Dificultad Percibida
                            </div>
                        </div>
                        <div className="text-xl font-bold text-secondary">
                            {stressData.difficulty}
                        </div>
                        <div className="text-xs text-base-content/70 mt-1">
                            Evaluación promedio del curso
                        </div>
                    </div>
                </div>

                {/* Distribución de niveles de estrés */}
                <div className="bg-base-200 p-4 rounded-lg border border-base-300">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Distribución de Niveles de Estrés
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center bg-success/10 p-2 rounded">
                            <span className="text-lg font-bold text-success">
                                {stressData.stressLevels.low}
                            </span>
                            <span className="text-xs">Bajo</span>
                        </div>
                        <div className="flex flex-col items-center bg-warning/10 p-2 rounded">
                            <span className="text-lg font-bold text-warning">
                                {stressData.stressLevels.medium}
                            </span>
                            <span className="text-xs">Medio</span>
                        </div>
                        <div className="flex flex-col items-center bg-error/10 p-2 rounded">
                            <span className="text-lg font-bold text-error">
                                {stressData.stressLevels.high}
                            </span>
                            <span className="text-xs">Alto</span>
                        </div>
                    </div>
                </div>

                {/* Pie de componente con última actualización */}
                <div className="flex items-center justify-end gap-2 mt-4 text-sm text-base-content/70">
                    <Clock className="w-4 h-4" />
                    <span>
                        Última actualización:{" "}
                        {new Date(stressData.lastUpdate).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StressIndicators;
