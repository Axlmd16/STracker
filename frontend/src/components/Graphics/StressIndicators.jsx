import {
    AlertCircle,
    AlertTriangle,
    BookOpen,
    Brain,
    Clock,
    TrendingUp,
    Users2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PieChart, Pie, Cell } from "recharts";

const StressIndicators = ({ actions, store, asignatura_id }) => {
    const [data, setData] = useState({
        asignatura_id: null,
        periodo: "",
        niveles_estres: [
            { nivel_estres: "alto", cantidad: 0 },
            { nivel_estres: "medio", cantidad: 0 },
            { nivel_estres: "bajo", cantidad: 0 },
        ],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await actions.getInfoResultadosAsignatura(
                    asignatura_id
                );
                setData(data.data);
            } catch {
                console.error("Error al cargar la asignatura:", error);
                toast.error("Error al cargar la asignatura");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions, asignatura_id]);

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

    const stressLevels = data.niveles_estres.reduce(
        (acc, { nivel_estres, cantidad }) => {
            acc[nivel_estres] = cantidad;
            return acc;
        },
        { bajo: 0, medio: 0, alto: 0 }
    );

    // Crear datos para cada gráfico individual
    const getPieData = (level) => [
        { name: level, value: stressLevels[level] },
        {
            name: "Otros",
            value:
                Object.values(stressLevels).reduce((acc, val) => acc + val, 0) -
                stressLevels[level],
        },
    ];

    const COLORS = {
        bajo: "#34d399",
        medio: "#fbbf24",
        alto: "#f87171",
    };

    return (
        <div className={`card bg-white shadow-lg h-full w-full`}>
            <div className="card-body h-full flex flex-col">
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
                <div className="alert alert-warning shadow-sm mb-4">
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
                <div className="grid grid-cols-2 gap-4 mb-4 flex-grow">
                    <div className="bg-base-200 p-4 rounded-lg border border-base-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                <div className="text-sm font-medium">
                                    Carga de Trabajo
                                </div>
                            </div>
                            <div className="text-xl font-bold text-primary">
                                {stressData.workload}
                            </div>
                        </div>
                        <div className="text-xs text-base-content/70 mt-1">
                            Basado en {stressData.weeklyReports} reportes
                            semanales
                        </div>
                    </div>

                    <div className="bg-base-200 p-4 rounded-lg border border-base-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-secondary" />
                                <div className="text-sm font-medium">
                                    Dificultad Percibida
                                </div>
                            </div>
                            <div className="text-xl font-bold text-secondary">
                                {stressData.difficulty}
                            </div>
                        </div>
                        <div className="text-xs text-base-content/70 mt-1">
                            Evaluación promedio del curso
                        </div>
                    </div>
                </div>

                {/* Distribución de niveles de estrés */}
                <div className="bg-base-200 p-4 rounded-lg border border-base-300 mb-4 flex-grow">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                        <Users2 className="w-4 h-4" />
                        Distribución de Niveles de Estrés de la Semana
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {/* Bajo */}
                        <div className="flex flex-col items-center bg-success/10 p-2 rounded">
                            <span className="text-lg font-bold text-success">
                                {stressLevels.bajo}
                            </span>
                            <span className="text-xs">Bajo</span>
                            <PieChart width={80} height={80}>
                                <Pie
                                    data={getPieData("bajo")}
                                    dataKey="value"
                                    innerRadius={20}
                                    outerRadius={35}
                                    paddingAngle={5}
                                    isAnimationActive={false}
                                >
                                    {getPieData("bajo").map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                index === 0
                                                    ? COLORS.bajo
                                                    : "#e5e7eb"
                                            }
                                        /> // Default gray for others
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        {/* Medio */}
                        <div className="flex flex-col items-center bg-warning/10 p-2 rounded">
                            <span className="text-lg font-bold text-warning">
                                {stressLevels.medio}
                            </span>
                            <span className="text-xs">Medio</span>
                            <PieChart width={80} height={80}>
                                <Pie
                                    data={getPieData("medio")}
                                    dataKey="value"
                                    innerRadius={20}
                                    outerRadius={35}
                                    paddingAngle={5}
                                    isAnimationActive={false}
                                >
                                    {getPieData("medio").map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                index === 0
                                                    ? COLORS.medio
                                                    : "#e5e7eb"
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                        {/* Alto */}
                        <div className="flex flex-col items-center bg-error/10 p-2 rounded">
                            <span className="text-lg font-bold text-error">
                                {stressLevels.alto}
                            </span>
                            <span className="text-xs">Alto</span>
                            <PieChart width={80} height={80}>
                                <Pie
                                    data={getPieData("alto")}
                                    dataKey="value"
                                    innerRadius={20}
                                    outerRadius={35}
                                    paddingAngle={5}
                                    isAnimationActive={false}
                                >
                                    {getPieData("alto").map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                index === 0
                                                    ? COLORS.alto
                                                    : "#e5e7eb"
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                </div>
                {/* Pie de componente con última actualización */}
                <div className="flex items-center justify-end gap-2 mt-4 text-sm text-base-content/70 font-medium">
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
