import {
    BookOpen,
    Clock,
    GraduationCap,
    HomeIcon,
    LibraryBig,
    Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import StressIndicators from "../../../components/Graphics/StressIndicators";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";
import InterfaceTableActividades from "../../../components/Tables/ActividadesTest/InterfaceTableActividades";
import DataTableAssignment from "../../../components/Tables/DataTableAssignment";

function AsignaturaDetallePage({ actions, store }) {
    const { id } = useParams();
    const [asignatura, setAsignatura] = useState({});
    const [detalles, setDetalles] = useState({});
    const [loading, setLoading] = useState(true);

    //* Obtener datos de la asignatura
    useEffect(() => {
        const fetchAsignatura = async () => {
            try {
                const data = await actions.getAsignatura(id);
                const dataDetalles = await actions.getDetalles(id);
                setDetalles(dataDetalles);
                setAsignatura(data);
            } catch (error) {
                console.error("Error al cargar la asignatura:", error);
                toast.error("Error al cargar la asignatura");
            } finally {
                setLoading(false);
            }
        };

        fetchAsignatura();
    }, [actions, id]);

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
            to: `/home/docente/asignatura/${id}`,
            title: asignatura.nombre,
            icon: GraduationCap,
            active: true,
        },
    ];

    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {/* Header de la asignatura */}
                        <div className="card bg-white shadow-lg mb-6">
                            {/* Breadcrumbs */}
                            <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                                <BreadCrumbs items={breadcrumbItems} />
                            </div>
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
                                            <div className="badge bg-blue-100 font-medium text-blue-800">
                                                Paralelo {asignatura.paralelo}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>
                                                    {detalles.nro_estudiantes}{" "}
                                                    estudiantes
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>
                                                    {asignatura.nro_horas} horas
                                                    totales
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid de estadísticas */}
                        {/* <StadisticsGrid data={asignaturaData} /> */}

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Indicadores de Estrés */}
                            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6 min-h-[800px]">
                                <StressIndicators className="h-full" />
                            </div>

                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-white shadow-lg rounded-lg p-6 min-h-[400px]">
                                    <InterfaceTableActividades
                                        actions={actions}
                                        store={store}
                                        id={id}
                                    />
                                </div>
                                <div className="bg-white shadow-lg rounded-lg p-6 min-h-[400px]">
                                    <DataTableAssignment
                                        title="Tests Asignados"
                                        buttonLabel="Nuevo Test"
                                        data={testsData}
                                        onButtonClick={() =>
                                            console.log("Nuevo Test clickeado")
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AsignaturaDetallePage;
