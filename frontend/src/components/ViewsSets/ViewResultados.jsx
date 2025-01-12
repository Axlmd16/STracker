import {
    Activity,
    Brain,
    Calendar,
    Check,
    Clock,
    Download,
    Heart,
    HomeIcon,
    Info,
    MessageSquare,
    Phone,
    Share2,
    Shield,
    Target,
    TrendingUp,
} from "lucide-react";
import React from "react";
import { toast } from "react-hot-toast";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import Swal from "sweetalert2";
import BreadCrumbs from "../Navigation/breadCrumbs";

const ViewResultados = ({ actions, resultado }) => {
    //* Funcion para compartir el resultado
    const shareResult = () => {
        Swal.fire({
            title: "Compartir Resultado",
            text: "Estas seguro de querer compartir este resultado con tu docente?",
            icon: "question",
            cancelButtonColor: "#ccb078",
            confirmButtonColor: "#8da579",
            confirmButtonText: "Sí, compartir",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("Resultado compartido con éxito");
            }
        });
    };

    // Mock data mejorado para el historial
    const historialData = [
        { fecha: "Ene 2024", puntaje: 75, promedio: 70 },
        { fecha: "Feb 2024", puntaje: 65, promedio: 68 },
        { fecha: "Mar 2024", puntaje: 80, promedio: 72 },
        { fecha: "Abr 2024", puntaje: 72, promedio: 71 },
        { fecha: "May 2024", puntaje: 68, promedio: 69 },
        { fecha: "Jun 2024", puntaje: 77, promedio: 73 },
    ];

    const factoresEstres = [
        { factor: "Académico", value: 80, fullMark: 100 },
        { factor: "Social", value: 65, fullMark: 100 },
        { factor: "Emocional", value: 70, fullMark: 100 },
        { factor: "Familiar", value: 55, fullMark: 100 },
        { factor: "Salud", value: 60, fullMark: 100 },
        { factor: "Laboral", value: 45, fullMark: 100 },
    ];

    const estrategiasManejoData = [
        { name: "Ejercicio", score: 85 },
        { name: "Meditación", score: 60 },
        { name: "Descanso", score: 70 },
        { name: "Organización", score: 75 },
        { name: "Apoyo Social", score: 65 },
    ];

    const getNivelEstres = (puntaje) => {
        if (puntaje >= 80)
            return {
                nivel: "Alto",
                color: "error",
                bgColor: "bg-red-50",
                textColor: "text-red-700",
                borderColor: "border-red-200",
                descripcion:
                    "Necesitas tomar acciones inmediatas para reducir tu nivel de estrés.",
            };
        if (puntaje >= 50)
            return {
                nivel: "Moderado",
                color: "warning",
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-700",
                borderColor: "border-yellow-200",
                descripcion:
                    "Mantén un seguimiento de tus niveles de estrés y aplica técnicas de manejo.",
            };
        return {
            nivel: "Bajo",
            color: "success",
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            borderColor: "border-green-200",
            descripcion:
                "Continúa con tus buenas prácticas de manejo del estrés.",
        };
    };

    const nivelActual = getNivelEstres(resultado?.resultado);

    const recomendaciones = [
        {
            titulo: "Gestión Académica",
            items: [
                "Establece un horario de estudio estructurado",
                "Implementa la técnica Pomodoro (25 min estudio, 5 min descanso)",
                "Prioriza tareas según importancia y urgencia",
            ],
        },
        {
            titulo: "Bienestar Físico",
            items: [
                "Mantén una rutina de ejercicio de 30 minutos diarios",
                "Asegura 7-8 horas de sueño reparador",
                "Mantén una alimentación balanceada",
            ],
        },
        {
            titulo: "Salud Mental",
            items: [
                "Practica mindfulness o meditación por 10 minutos",
                "Realiza ejercicios de respiración profunda",
                "Mantén un diario de gratitud",
            ],
        },
    ];

    const breadcrumbItems = [
        {
            to: "/home/estudiante",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: `/home/estudiante/resultado_test/${resultado?.id}`,
            title: "Resultado del Test",
            icon: Activity,
            active: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-200">
            {/* Header mejorado */}

            <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b bg-white">
                <BreadCrumbs items={breadcrumbItems} />
            </div>

            {/* Contenido principal */}
            <div className=" mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Panel principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Resumen del resultado */}
                        <div className="bg-white rounded-md shadow-md p-6 border border-gray-200">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Resumen de Resultado
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                {/* Información del Nivel de Estrés */}
                                <div className="flex items-center gap-8">
                                    <div
                                        className={`flex items-center gap-4 px-4 py-3 rounded-lg ${nivelActual.bgColor} ${nivelActual.textColor} w-full`}
                                    >
                                        <Activity className="h-6 w-6" />
                                        <div>
                                            <h3 className="font-semibold text-md">
                                                Nivel de Estrés:{" "}
                                                {nivelActual.nivel}
                                            </h3>
                                            <p className="text-sm opacity-80">
                                                Puntuación:{" "}
                                                {resultado?.resultado}/100
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 w-full">
                                        <Calendar className="h-5 w-5" />
                                        <span className="text-sm">
                                            Realizado el{""}
                                            <br />
                                            {new Date(
                                                resultado?.fecha_realizacion
                                            ).toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex flex-wrap gap-3 justify-end">
                                    <button className="btn btn-outline btn-sm gap-2 hover:bg-gray-100">
                                        <Download className="h-5 w-5" />
                                        Exportar PDF
                                    </button>
                                    <button className="btn btn-primary btn-sm gap-2">
                                        <Share2 className="h-5 w-5" />
                                        Compartir Resultado
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Gráfica de radar para factores de estrés */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Análisis de Factores
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart
                                        outerRadius={90}
                                        data={factoresEstres}
                                    >
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="factor" />
                                        <PolarRadiusAxis
                                            angle={30}
                                            domain={[0, 100]}
                                        />
                                        <Radar
                                            name="Nivel de Estrés"
                                            dataKey="value"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            fillOpacity={0.6}
                                        />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Retroalimentación del docente mejorada */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <MessageSquare className="h-5 w-5 text-indigo-600" />
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Retroalimentación del Docente
                                </h2>
                            </div>
                            {resultado?.retroalimentacion ? (
                                <div className="space-y-3">
                                    <div class="chat chat-start">
                                        <div className="chat-bubble chat-bubble-accent">
                                            <span className="text-sm text-gray-700 leading-relaxed">
                                                {resultado?.retroalimentacion}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 flex items-end gap-2 justify-end">
                                        <Clock className="h-3 w-3" />
                                        Última actualización:{" "}
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-lg">
                                    <Info className="h-4 w-4" />
                                    <p className="text-sm">
                                        No hay retroalimentación disponible aún.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panel lateral mejorado */}
                    <div className="space-y-6">
                        {/* Estrategias de manejo */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center gap-2 mb-6">
                                <Target className="h-6 w-6 text-indigo-600" />
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Estrategias de Manejo
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {estrategiasManejoData.map(
                                    (estrategia, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                    {estrategia.name}
                                                </span>
                                                <span className="font-medium">
                                                    {estrategia.score}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-indigo-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${estrategia.score}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Recomendaciones mejoradas */}
                        {recomendaciones.map((seccion, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Brain className="h-5 w-5 text-indigo-600" />
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {seccion.titulo}
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    {seccion.items.map((item, itemIdx) => (
                                        <li
                                            key={itemIdx}
                                            className="flex items-start gap-2"
                                        >
                                            <Check className="h-4 w-4 text-indigo-600 mt-1" />
                                            <span className="text-sm text-gray-600">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Tercera fila: Recursos de apoyo horizontales */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Recursos de Apoyo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-3">
                            <button className="btn btn-primary w-full gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Contactar Consejero
                            </button>
                            <button className="btn btn-outline w-full gap-2">
                                <Brain className="h-4 w-4" />
                                Biblioteca de Recursos
                            </button>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                            <h3 className="font-medium text-gray-700 mb-2">
                                Líneas de Ayuda 24/7
                            </h3>
                            <p className="text-sm text-gray-600">
                                Si necesitas apoyo inmediato, no dudes en
                                contactar a nuestras líneas de ayuda:
                            </p>
                            <div className="mt-4 flex gap-4">
                                <a
                                    href="tel:+1234567890"
                                    className="text-primary text-sm flex items-center gap-2"
                                >
                                    <Phone className="h-4 w-4" />
                                    (123) 456-7890
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    className="text-primary text-sm flex items-center gap-2"
                                >
                                    <Phone className="h-4 w-4" />
                                    Línea de Emergencia
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewResultados;
