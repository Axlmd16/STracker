import {
    Activity,
    AlertCircle,
    BookOpenCheck,
    Calendar,
    CheckCircle2,
    Clock,
    GraduationCap,
    HomeIcon,
    LibraryBig,
    Link2,
    MessageCircle,
    PencilIcon,
    Send,
    Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";

function AsignacionDetallePage({ actions, store }) {
    //* Estados
    const [asignacion, setAsignacion] = useState({});
    const [asignatura, setAsignatura] = useState({});
    const [loading, setLoading] = useState(true);
    const [retroalimentacion, setRetroalimentacion] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editFeedback, setEditFeedback] = useState("");
    const [estudiante, setEstudiante] = useState({});

    //* Constantes
    const { asignaturaId, asignacionId } = useParams();

    //* Funcion para enviar la retroalimentacion
    const handleSubmitFeedback = async () => {
        try {
            await toast.promise(
                actions.agregarRetroalimentacion(
                    asignacion.resultados[0].id,
                    retroalimentacion
                ),
                {
                    loading: "Enviando retroalimentación...",
                    success: "Retroalimentación enviada",
                    error: "Error al enviar la retroalimentación",
                }
            );
            setRetroalimentacion("");
        } catch (error) {
            toast.error("Error al enviar la retroalimentación");
        }
    };

    //* Funcion para editar la retroalimentacion
    const handleEditFeedback = async () => {
        try {
            await toast.promise(
                actions.agregarRetroalimentacion(
                    asignacion.resultados[0].id,
                    editFeedback
                ),
                {
                    loading: "Actualizando retroalimentación...",
                    success: "Retroalimentación actualizada",
                    error: "Error al actualizar la retroalimentación",
                }
            );
            setAsignacion((prevAsignacion) => {
                const updatedResultados = prevAsignacion.resultados.map(
                    (resultado) => {
                        if (resultado.id === asignacion.resultados[0].id) {
                            return {
                                ...resultado,
                                retroalimentacion: editFeedback,
                            };
                        }
                        return resultado;
                    }
                );
                return {
                    ...prevAsignacion,
                    resultados: updatedResultados,
                };
            });
            setIsEditing(false);
        } catch (error) {
            toast.error("Error al actualizar la retroalimentación");
        }
    };

    //* Funcion para obtener los datos de la asignacion
    useEffect(() => {
        const fetchActividad = async () => {
            try {
                const data = await actions.getAsignacionTest(asignacionId);
                const dataAsignatura = await actions.getAsignatura(
                    asignaturaId
                );
                setAsignatura(dataAsignatura);
                setAsignacion(data);
                console.log("Asignacion:", data);
            } catch (error) {
                console.error("Error al cargar la actividad:", error);
                toast.error("Error al cargar la actividad");
            } finally {
                setLoading(false);
            }
        };

        fetchActividad();
    }, [actions]);

    //* Funcion para obtener el estudiante al que se le asigno la actividad
    useEffect(() => {
        const fetchEstudiante = async () => {
            if (
                asignacion.resultados &&
                asignacion.resultados.length > 0 &&
                asignacion.resultados[0].estudiante_asignatura
            ) {
                try {
                    const data = await actions.getInfoUser(
                        asignacion.resultados[0].estudiante_asignatura
                            .estudiante_id
                    );
                    setEstudiante(data);
                } catch (error) {
                    console.error("Error al cargar el estudiante:", error);
                    toast.error("Error al cargar el estudiante");
                }
            }
        };

        fetchEstudiante();
    }, [actions, asignacion]);

    //* Items del breadcrumb
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
            to: `/home/docente/asignatura/${asignaturaId}/asignaciones/${asignacionId}`,
            title: asignacion.descripcion,
            icon: BookOpenCheck,
            active: true,
        },
    ];

    //* Función para formatear fechas
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    //* Verificar si hay resultado
    const hasResult =
        asignacion.resultados &&
        asignacion.resultados.length > 0 &&
        asignacion.resultados[0].fecha_realizacion;

    //* Función para obtener el nivel de estrés
    const getNivelEstres = (puntaje) => {
        if (puntaje < 30) return { nivel: "Bajo", color: "success" };
        if (puntaje < 70) return { nivel: "Medio", color: "warning" };
        return { nivel: "Alto", color: "error" };
    };

    return (
        <div className="text-sm">
            <div className="fixed left-0 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={asignaturaId} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="">
                        <div className=" space-y-6">
                            {/* Header Section - Mejorado */}
                            <div className="card bg-white shadow-md">
                                {/* Breadcrumbs */}
                                <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                                    <BreadCrumbs items={breadcrumbItems} />
                                </div>
                                <div className="border-b">
                                    <div className="">
                                        <div className="card-body">
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-primary-content rounded-lg w-12 h-12">
                                                        <GraduationCap className="w-6 h-6" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1 className="text-2xl font-bold">
                                                        {asignacion.descripcion}
                                                    </h1>
                                                    <p className="text-base-content/70 text-sm mt-1">
                                                        Test de Estrés Académico
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="card bg-base-200">
                                                    <div className="card-body p-4 flex flex-row items-center gap-3">
                                                        <Calendar className="w-5 h-5 text-primary" />
                                                        <div>
                                                            <p className="text-xs font-medium text-base-content/70">
                                                                Fecha de
                                                                Asignación
                                                            </p>
                                                            <p className="font-semibold">
                                                                {formatDate(
                                                                    asignacion.fecha_asignacion
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card bg-base-200">
                                                    <div className="card-body p-4 flex flex-row items-center gap-3">
                                                        <Clock className="w-5 h-5 text-error" />
                                                        <div>
                                                            <p className="text-xs font-medium text-base-content/70">
                                                                Fecha Límite
                                                            </p>
                                                            <p className="font-semibold">
                                                                {formatDate(
                                                                    asignacion.fecha_limite
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card bg-base-200">
                                                    <div className="card-body p-4 flex flex-row items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Activity className="w-5 h-5" />
                                                            <span className="text-xs font-medium text-base-content/70">
                                                                Estado
                                                            </span>
                                                        </div>
                                                        {hasResult ? (
                                                            <div className="badge badge-success gap-2">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                Completado
                                                            </div>
                                                        ) : (
                                                            <div className="badge badge-warning gap-2">
                                                                <Clock className="w-4 h-4" />
                                                                Pendiente
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Test Details */}
                                <div className="lg:col-span-1">
                                    <div className="card bg-white shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title flex gap-2">
                                                <BookOpenCheck className="w-5 h-5" />
                                                Detalles de la Asignación
                                            </h2>
                                            <div className="divider"></div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-semibold mb-2">
                                                        Descripción
                                                    </h3>
                                                    <p className="text-base-content/70">
                                                        {
                                                            asignacion.test
                                                                ?.descripcion
                                                        }
                                                    </p>
                                                </div>

                                                {/*  */}
                                            </div>
                                            <div className="card-actions mt-6">
                                                <a
                                                    href={asignacion.test?.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary gap-2"
                                                >
                                                    <Link2 className="w-5 h-5" />
                                                    Acceder al Test
                                                </a>

                                                <div>
                                                    <h3 className="font-semibold mb-2">
                                                        Estudiante Asignado
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className="avatar placeholder">
                                                            <div className="bg-primary text-primary-content rounded-full w-8">
                                                                <span className="text-xs">
                                                                    E
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {
                                                                    estudiante.nombres
                                                                }
                                                            </p>
                                                            <p className="text-xs text-base-content/70">
                                                                {
                                                                    estudiante.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results and Feedback Section */}
                                <div className="space-y-6">
                                    {hasResult ? (
                                        <>
                                            <div className="lg:col-span-3">
                                                <div className="card bg-white shadow-xl transition-all duration-300 h-full">
                                                    <div className="card-body">
                                                        <div className="flex justify-between items-start">
                                                            <h2 className="card-title flex gap-2">
                                                                <Activity className="w-5 h-5" />
                                                                Resultado
                                                            </h2>
                                                        </div>
                                                        <div className="divider"></div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                            {/* Results Display */}
                                                            <div className="space-y-6">
                                                                <div className="flex flex-col items-center justify-center p-6 bg-base-200 rounded-xl">
                                                                    <div
                                                                        className="radial-progress text-warning"
                                                                        style={{
                                                                            "--value":
                                                                                asignacion
                                                                                    .resultados[0]
                                                                                    .resultado,
                                                                            "--size":
                                                                                "7rem",
                                                                        }}
                                                                    ></div>
                                                                    <div className="badge badge-warning mt-4">
                                                                        Nivel de
                                                                        Estrés:{" "}
                                                                        {
                                                                            getNivelEstres(
                                                                                asignacion
                                                                                    .resultados[0]
                                                                                    .resultado
                                                                            )
                                                                                .nivel
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="opacity-100">
                                                                {asignacion
                                                                    .resultados[0]
                                                                    .retroalimentacion ? (
                                                                    <div className="space-y-4">
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <h3 className="font-semibold flex items-center gap-2">
                                                                                <MessageCircle className="w-4 h-4" />
                                                                                Retroalimentación
                                                                            </h3>
                                                                            {!isEditing && (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setIsEditing(
                                                                                            true
                                                                                        );
                                                                                        setEditFeedback(
                                                                                            asignacion
                                                                                                .resultados[0]
                                                                                                .retroalimentacion
                                                                                        );
                                                                                    }}
                                                                                    className="btn btn-ghost btn-sm gap-2"
                                                                                >
                                                                                    <PencilIcon className="w-4 h-4" />
                                                                                    Editar
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                        {isEditing ? (
                                                                            <div className="space-y-4">
                                                                                <textarea
                                                                                    className="textarea textarea-bordered w-full h-36"
                                                                                    value={
                                                                                        editFeedback
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setEditFeedback(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                ></textarea>
                                                                                <div className="flex gap-2 justify-end">
                                                                                    <button
                                                                                        className="btn btn-ghost btn-sm"
                                                                                        onClick={() =>
                                                                                            setIsEditing(
                                                                                                false
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Cancelar
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm gap-2"
                                                                                        disabled={
                                                                                            !editFeedback.trim()
                                                                                        }
                                                                                        onClick={
                                                                                            handleEditFeedback
                                                                                        }
                                                                                    >
                                                                                        <Send className="w-4 h-4" />
                                                                                        Actualizar
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="bg-base-200 rounded-lg p-4">
                                                                                <div className="flex items-start gap-3">
                                                                                    <div className="avatar placeholder">
                                                                                        <div className="bg-primary text-primary-content rounded-full w-8">
                                                                                            <span className="text-xs">
                                                                                                D
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <p className="text-sm font-medium mb-1">
                                                                                            Docente
                                                                                        </p>
                                                                                        <span className="text-sm text-base-content/80 whitespace-pre-wrap break-words break-all">
                                                                                            {
                                                                                                asignacion
                                                                                                    .resultados[0]
                                                                                                    .retroalimentacion
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="space-y-4">
                                                                        <h3 className="font-semibold flex items-center gap-2">
                                                                            <MessageCircle className="w-4 h-4" />
                                                                            Enviar
                                                                            Retroalimentación
                                                                        </h3>
                                                                        <textarea
                                                                            className="textarea textarea-bordered w-full h-36"
                                                                            placeholder="Escribe tu retroalimentación para el estudiante..."
                                                                            value={
                                                                                retroalimentacion
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setRetroalimentacion(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        ></textarea>
                                                                        <button
                                                                            className="btn btn-primary btn-sm gap-2 w-full"
                                                                            disabled={
                                                                                !retroalimentacion.trim()
                                                                            }
                                                                            onClick={
                                                                                handleSubmitFeedback
                                                                            }
                                                                        >
                                                                            <Send className="w-4 h-4" />
                                                                            Enviar
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="alert alert-warning shadow-lg">
                                            <AlertCircle className="w-5 h-5" />
                                            <div>
                                                <h3 className="font-bold">
                                                    Test Pendiente
                                                </h3>
                                                <div className="text-sm">
                                                    El estudiante aún no ha
                                                    completado el test de
                                                    estrés.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AsignacionDetallePage;
