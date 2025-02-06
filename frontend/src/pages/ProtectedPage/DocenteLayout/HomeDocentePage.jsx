import { AlertTriangle, BarChart, Plus, Users } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import SubjectCard from "../../../components/Cards/SubjectCard";
import ModalForm from "../../../components/Modals/ModalForm";
import AsignaturaForm from "../../../components/Forms/AsignaturaForm";

function HomeDocentePage({ actions, store }) {
    const modalFormRef = useRef(null);
    const formRef = useRef(null);

    const [asignaturas, setAsignaturas] = useState([]);
    const [loading, setLoading] = useState(false);

    //* Funcion para obtener los datos
    useEffect(() => {
        const fetchAsignaturas = async () => {
            setLoading(true);
            try {
                // const data = await actions.getProvAsignaturas();
                const data = await actions.getAsignaturas();
                setAsignaturas(data);
            } catch (error) {
                console.error("Error al cargar las asignaturas:", error);
                toast.error("Error al cargar las asignaturas");
            } finally {
                setLoading(false);
            }
        };

        fetchAsignaturas();
    }, [actions]);

    //* Funcion abrir modal para crear
    const handleOpenModal = () => {
        modalFormRef.current.openModal();
    };

    //* Funcion para cerrar el modal
    const handleCloseModal = async (triggerReset = true) => {
        if (triggerReset && modalFormRef.current) {
            modalFormRef.current.closeModal();
        }
        const data = await actions.getAsignaturas();
        setAsignaturas(data);
    };

    return (
        <div className="bg-base-200">
            <div className="container mx-auto ">
                {/* Header Section */}
                <div className="card bg-white shadow-xl mb-8">
                    <div className="card-body">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="card-title text-3xl font-bold text-primary">
                                    Tus Asignaturas
                                </h1>
                                <p className="text-base-content/70 mt-2">
                                    Gestiona tus materias y contenido académico
                                </p>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleOpenModal}
                            >
                                <Plus className="w-5 h-5" />
                                Agregar Asignatura
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full">
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : asignaturas.length === 0 ? (
                        <div className="card bg-base-100 shadow-xl p-8">
                            <div className="flex flex-col items-center gap-4">
                                <AlertTriangle className="w-16 h-16 text-warning" />
                                <h2 className="text-xl font-semibold">
                                    No hay asignaturas disponibles
                                </h2>
                                <p className="text-base-content/70 text-center">
                                    Comienza agregando tu primera asignatura
                                    usando el botón superior
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {asignaturas.map((asignatura) => (
                                <SubjectCard
                                    key={asignatura.id}
                                    {...asignatura}
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para crear y actualizar */}
            <ModalForm
                ref={modalFormRef}
                formRef={formRef}
                handleCloseModal={handleCloseModal}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {"Crear Asignatura"}
                </h2>
                <AsignaturaForm
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalFormRef}
                    handleCloseModal={handleCloseModal}
                    store={store}
                />
            </ModalForm>
        </div>
    );
}

export default HomeDocentePage;
