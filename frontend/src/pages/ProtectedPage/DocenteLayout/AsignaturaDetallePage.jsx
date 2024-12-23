import { AlertTriangle, BookOpen, Calendar, Clock, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import StadisticsGrid from "../../../components/Cards/StadisticsGrid";
import Sidebar from "../../../components/Navigation/Sidebar";
import DataTableAssignment from "../../../components/Tables/DataTableAssignment";
import StressIndicators from "../../../components/Graphics/StressIndicators";

function AsignaturaDetallePage({ actions, store }) {
    const { id } = useParams();
    const [asignatura, setAsignatura] = useState([]);

    //* Obtener datos de la asignatura
    useEffect(() => {
        const fetchAsignatura = async () => {
            try {
                // const data = await actions.getAsignatura(id);
                const data = await actions.getProvAsignatura(id);
                setAsignatura(data);
            } catch (error) {
                console.error("Error al cargar la asignatura:", error);
                toast.error("Error al cargar la asignatura");
            }
        };

        fetchAsignatura();
    }, [actions, id]);

    //* Datos de ejemplo
    const asignaturaData = {
        nombre: "Matemáticas Discretas",
        paralelo: "A",
        fecha_inicio: "2024-03-01",
        fecha_fin: "2024-07-31",
        nro_horas: 64,
        estudiantes: 35,
        actividades_pendientes: 3,
        tests_pendientes: 2,
    };

    //* Datos de ejemplo para la tabla de actividades
    const actividadesData = {
        headers: ["Actividad", "Fecha Límite", "Estado"],
        rows: [
            [
                "Tarea 1: Conjuntos",
                "2024-04-15",
                <div className="badge badge-warning">Pendiente</div>,
            ],
            [
                "Proyecto Grupal",
                "2024-04-20",
                <div className="badge badge-success">En Progreso</div>,
            ],
        ],
    };

    //* Datos de ejemplo para la tabla de tests
    const testsData = {
        headers: ["Test", "Fecha", "Estado"],
        rows: [
            [
                "Evaluación Parcial 1",
                "2024-04-10",
                <div className="badge badge-error">Próximo</div>,
            ],
            [
                "Quiz Semana 3",
                "2024-04-05",
                <div className="badge badge-info">Preparado</div>,
            ],
        ],
    };

    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                {/* Header de la asignatura */}
                <div className="card bg-white shadow-lg mb-6">
                    <div className="card-body">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <BookOpen className="w-12 h-12 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold mb-2">
                                    {asignatura.nombre}
                                </h1>
                                <div className="flex flex-wrap gap-4">
                                    <div className="badge badge-primary">
                                        Paralelo {asignatura.paralelo}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>
                                            {asignaturaData.estudiantes}{" "}
                                            estudiantes
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {asignatura.nro_horas} horas totales
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de estadísticas */}
                <StadisticsGrid data={asignaturaData} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Actividades Asignadas */}
                    <DataTableAssignment
                        title="Actividades Asignadas"
                        buttonLabel="Nueva Actividad"
                        data={actividadesData}
                        onButtonClick={() =>
                            console.log("Nueva Actividad clickeada")
                        }
                    />

                    {/* Tests Asignados */}
                    <DataTableAssignment
                        title="Tests Asignados"
                        buttonLabel="Nuevo Test"
                        data={testsData}
                        onButtonClick={() =>
                            console.log("Nuevo Test clickeado")
                        }
                    />

                    {/* Indicadores de Estrés */}
                    <StressIndicators className="col-span-1" />

                    {/* Próximos Eventos */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <span>
                                Espacio para informacion sobre los grupos
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsignaturaDetallePage;
