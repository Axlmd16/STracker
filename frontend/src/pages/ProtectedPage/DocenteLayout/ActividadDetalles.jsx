import {
    Activity,
    AlertTriangle,
    BookOpenCheck,
    Brain,
    Calendar,
    Clock,
    Download,
    FileText,
    GraduationCap,
    HomeIcon,
    LibraryBig,
    Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";

function ActividadDetalles({ actions, store }) {
    const stressData = [
        { dia: "01/03", nivelEstres: 3, participacion: 20 },
        { dia: "02/03", nivelEstres: 4, participacion: 22 },
        { dia: "03/03", nivelEstres: 6, participacion: 18 },
        { dia: "04/03", nivelEstres: 7, participacion: 15 },
        { dia: "05/03", nivelEstres: 5, participacion: 19 },
        { dia: "06/03", nivelEstres: 4, participacion: 21 },
        { dia: "07/03", nivelEstres: 3, participacion: 23 },
    ];

    const stressDistribution = [
        { name: "Bajo (1-3)", value: 8, color: "#22C55E" },
        { name: "Medio (4-6)", value: 10, color: "#EAB308" },
        { name: "Alto (7-10)", value: 6, color: "#EF4444" },
    ];

    //* Estados
    const [actividad, setActividad] = useState({});
    const [detalles, setDetalles] = useState({});
    const [asignatura, setAsignatura] = useState({});
    const [loading, setLoading] = useState(true);

    //* Constantes
    const { asignaturaId, actividadId } = useParams();
    const fechaInicio = new Date(actividad.fecha_inicio);
    const fechaFin = new Date(actividad.fecha_fin);

    const diferenciaFechas = fechaFin - fechaInicio;
    const duracionHoras = diferenciaFechas / 3600000;

    const duracion =
        duracionHoras > 24
            ? (duracionHoras / 24).toFixed(0)
            : duracionHoras.toFixed(2);
    const unidad = duracionHoras > 24 ? "días" : "horas";

    //* Funcion para obtener los datos de la actividad
    useEffect(() => {
        const fetchActividad = async () => {
            try {
                const data = await actions.getActividad(actividadId);
                const dataDetalles = await actions.getDetalles(asignaturaId);
                const dataAsignatura = await actions.getAsignatura(
                    asignaturaId
                );
                setAsignatura(dataAsignatura);
                setDetalles(dataDetalles);
                setActividad(data);
            } catch (error) {
                console.error("Error al cargar la actividad:", error);
                toast.error("Error al cargar la actividad");
            } finally {
                setLoading(false);
            }
        };

        fetchActividad();
    }, [actions]);

    //* Funcion para obtener los datos de la actividad
    const getTipoActividadColor = (tipo) => {
        const colors = {
            FORO: "bg-blue-100 text-blue-800",
            ACTIVIDAD_EN_CLASE: "bg-green-100 text-green-800",
            ACTIVIDAD_EXTRA_CLASE: "bg-purple-100 text-purple-800",
        };
        return colors[tipo] || "bg-gray-100 text-gray-800";
    };

    const breadcrumbItems = [
        {
            to: "/home/docente",
            title: "",
            icon: HomeIcon,
        },
        {
            to: `/home/docente`,
            title: "Asignaturas",
            icon: LibraryBig,
        },
        {
            to: `/home/docente/asignatura/${asignaturaId}`,
            title: asignatura.nombre,
            icon: GraduationCap,
        },
        {
            to: `/home/docente/asignatura/${asignaturaId}/actividades/${actividadId}`,
            title: actividad.titulo,
            icon: BookOpenCheck,
            active: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={asignaturaId} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="min-h-screen bg-gray-200">
                        {/* Header Section - Full Width */}
                        <div className="col-span-12 bg-white rounded-lg shadow-md ">
                            {/* Header con fondo y breadcrumbs */}
                            <div className="bg-white border-b">
                                <div className="max-w-screen-2xl mx-auto">
                                    {/* Breadcrumbs */}
                                    <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                                        <BreadCrumbs items={breadcrumbItems} />
                                    </div>

                                    {/* Header Content */}

                                    <div className="px-6 py-4 rounded-md">
                                        <div className="flex justify-between items-start">
                                            {/* Left side - Title and info */}
                                            <div className="space-y-4">
                                                <div className="space-y-5">
                                                    <h1 className="text-2xl font-bold text-gray-900">
                                                        {actividad.titulo}
                                                    </h1>
                                                    <div className="flex items-center space-x-4">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoActividadColor(
                                                                actividad.tipo_actividad
                                                            )}`}
                                                        >
                                                            {actividad.tipo_actividad
                                                                .split("_")
                                                                .map(
                                                                    (word) =>
                                                                        word
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                        word
                                                                            .slice(
                                                                                1
                                                                            )
                                                                            .toLowerCase() +
                                                                        " "
                                                                )}
                                                        </span>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            <span>
                                                                Fecha límite:{" "}
                                                                {actividad.fecha_fin
                                                                    ? new Date(
                                                                          actividad.fecha_fin
                                                                      ).toLocaleDateString() +
                                                                      " a las " +
                                                                      new Date(
                                                                          actividad.fecha_fin
                                                                      ).toLocaleTimeString()
                                                                    : "Sin definir"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right side - Stats */}
                                            <div className="flex space-x-3">
                                                <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-center mb-1">
                                                        <Users className="w-5 h-5 text-primary mr-2" />
                                                        <div className="text-2xl font-bold text-primary">
                                                            {" "}
                                                            {
                                                                detalles.nro_estudiantes
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Estudiantes
                                                    </div>
                                                </div>
                                                <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center justify-center mb-1">
                                                        <Activity className="w-5 h-5 text-primary mr-2" />
                                                        <div className="text-2xl font-bold text-primary">
                                                            5.2
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Nivel Estrés
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mt-6 prose prose-sm max-w-none text-gray-600">
                                            {actividad.descripcion}
                                        </div>

                                        {/* Activity Details */}
                                        <div className="mt-6 grid grid-cols-3 gap-6">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    Duración: {duracion}{" "}
                                                    {unidad}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>
                                                    Participación: 18/24
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Brain className="w-4 h-4" />
                                                <span>Complejidad: Media</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-screen-2xl mx-auto mt-6">
                            <div className="grid grid-cols-12 gap-6">
                                {/* Main Content Grid */}
                                <div className="col-span-8 space-y-6">
                                    {/* Stress Level Chart */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-lg font-semibold">
                                                Nivel de Estrés y Participación
                                            </h2>
                                            <div className="flex items-center space-x-2">
                                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                                <span className="text-sm text-gray-500">
                                                    Promedio: 4.6
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-64">
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <LineChart data={stressData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis
                                                        dataKey="dia"
                                                        fontSize={12}
                                                        tick={{
                                                            fill: "#6B7280",
                                                        }}
                                                    />
                                                    <YAxis
                                                        fontSize={12}
                                                        tick={{
                                                            fill: "#6B7280",
                                                        }}
                                                        domain={[0, 24]}
                                                    />
                                                    <Tooltip />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="nivelEstres"
                                                        stroke="#6366F1"
                                                        strokeWidth={2}
                                                        name="Nivel de Estrés"
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="participacion"
                                                        stroke="#22C55E"
                                                        strokeWidth={2}
                                                        name="Participación"
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Files Section */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Archivos Adjuntos
                                        </h2>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="w-5 h-5 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700">
                                                            {actividad.url_archivo ? (
                                                                actividad.url_archivo &&
                                                                actividad.url_archivo
                                                                    .split("/")
                                                                    .pop()
                                                            ) : (
                                                                <span className="text-gray-500 font-medium">
                                                                    No hay
                                                                    archivos
                                                                    adjuntos en
                                                                    esta
                                                                    actividad
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                {actividad.url_archivo ? (
                                                    <a
                                                        href={`http://localhost:8000${actividad.url_archivo}`}
                                                        download={actividad.url_archivo
                                                            .split("/")
                                                            .pop()}
                                                        className="p-2 text-gray-500 btn btn-circle btn-sm"
                                                        target="_blank"
                                                    >
                                                        <Download size={16} />
                                                    </a>
                                                ) : (
                                                    <p></p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Content */}
                                <div className="col-span-4 space-y-6">
                                    {/* Stress Distribution */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Distribución de Estrés
                                        </h2>
                                        <div className="h-64">
                                            <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                            >
                                                <PieChart>
                                                    <Pie
                                                        data={
                                                            stressDistribution
                                                        }
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                    >
                                                        {stressDistribution.map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={index}
                                                                    fill={
                                                                        entry.color
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            {stressDistribution.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center">
                                                            <div
                                                                className="w-3 h-3 rounded-full mr-2"
                                                                style={{
                                                                    backgroundColor:
                                                                        item.color,
                                                                }}
                                                            ></div>
                                                            <span className="text-sm text-gray-600">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium">
                                                            {item.value}{" "}
                                                            estudiantes
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="bg-white rounded-lg shadow-sm p-6">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Estadísticas Rápidas
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm font-medium text-gray-500">
                                                        Nivel Máximo
                                                    </div>
                                                    <div className="text-lg font-semibold text-red-500">
                                                        7.0
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm font-medium text-gray-500">
                                                        Nivel Mínimo
                                                    </div>
                                                    <div className="text-lg font-semibold text-green-500">
                                                        3.0
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm font-medium text-gray-500">
                                                        Promedio
                                                    </div>
                                                    <div className="text-lg font-semibold text-yellow-500">
                                                        4.6
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActividadDetalles;
