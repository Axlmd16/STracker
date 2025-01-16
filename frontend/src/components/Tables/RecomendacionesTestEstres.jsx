import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function RecomendacionesTestEstres({ actions }) {
    const { idTest } = useParams();
    const [pending, setPending] = useState(false);
    const [recomendacionesTest, setRecomendacionesTest] = useState([]);
    const [todasRecomendaciones, setTodasRecomendaciones] = useState([]);
    const [selectedRecomendaciones, setSelectedRecomendaciones] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);
    const [recomendacionAEliminar, setRecomendacionAEliminar] = useState(null);
    const [testInfo, setTestInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchTestEstres = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.obtenerRecomendacionesPorTest(idTest);
            setRecomendacionesTest(data);
        } catch (error) {
            toast.error("Error al cargar las recomendaciones del Test");
        } finally {
            setPending(false);
        }
    }, [actions, idTest]);

    const fetchTestInfo = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getTestEstres(idTest);
            setTestInfo(data);
        } catch (error) {
            toast.error("Error al cargar la información del Test");
        } finally {
            setPending(false);
        }
    }, [actions, idTest]);

    const fetchTodasRecomendaciones = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.obtenerTodasRecomendaciones();
            setTodasRecomendaciones(data);
        } catch (error) {
            toast.error("Error al cargar las recomendaciones");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchTestEstres();
        fetchTestInfo();
    }, [fetchTestEstres, fetchTestInfo]);

    const openModal = () => {
        setIsModalOpen(true);
        fetchTodasRecomendaciones();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecomendaciones([]);
    };

    const handleSelectRecomendacion = (id) => {
        setSelectedRecomendaciones((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleSaveSelectedRecomendaciones = async () => {
        try {
            for (const id_recomendacion of selectedRecomendaciones) {
                await actions.agregarRecomendacionTest(idTest, id_recomendacion);
            }
            toast.success("Recomendaciones asociadas correctamente");
            await fetchTestEstres();
            const totalItems = todasRecomendaciones.filter(recomendacion =>
                !recomendacionesTest.some(r => r.id === recomendacion.id)
            ).length;

            const totalPages = Math.ceil(totalItems / itemsPerPage);
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }

            closeModal();
        } catch (error) {
            toast.error("Error al asociar las recomendaciones");
        }
    };

    const openModalConfirmacion = (recomendacionId) => {
        setRecomendacionAEliminar(recomendacionId);
        setModalConfirmacion(true);
    };

    const closeModalConfirmacion = () => {
        setModalConfirmacion(false);
        setRecomendacionAEliminar(null);
    };

    const handleEliminarRecomendacion = async () => {
        if (!recomendacionAEliminar) return;

        const recomendacionElement = document.getElementById(`recomendacion-${recomendacionAEliminar}`);

        if (recomendacionElement) {
            recomendacionElement.classList.add('recomendacion-desintegrando');
            setTimeout(async () => {
                try {
                    await actions.eliminarRecomendacionTest(idTest, recomendacionAEliminar);
                    toast.success("Recomendación eliminada correctamente");
                    await fetchTestEstres();
                    closeModalConfirmacion();
                } catch (error) {
                    toast.error("Error al eliminar la recomendación");
                }
            }, 100);
        }
    };


    const totalItems = todasRecomendaciones.filter(recomendacion =>
        !recomendacionesTest.some(r => r.id === recomendacion.id)
    ).length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedRecomendaciones = todasRecomendaciones
        .filter(recomendacion =>
            !recomendacionesTest.some(r => r.id === recomendacion.id)
        )
        .slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

    if (pending) {
        return <div className="text-center p-8">Cargando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-extrabold text-center mb-10  
               bg-gradient-to-r from-teal-400 to-cyan-600 text-white 
               py-4 px-6 rounded-lg shadow-md transition-all duration-300">
                Recomendaciones para el Test de Estrés:
                <span className="block text-xl font-medium mt-2 text-gray-200">
                    {testInfo.descripcion}
                </span>
            </h2>

            <button
                onClick={openModal}
                className="btn-custom btn-custom-success"
            >
                Asociar Recomendaciones
            </button>

            {recomendacionesTest.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                    {recomendacionesTest.map((recomendacion) => (
                        <div
                            key={recomendacion.id}
                            id={`recomendacion-${recomendacion.id}`}
                            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 relative"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Recomendación: {recomendacion.titulo}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 text-justify">
                                Descripción: {recomendacion.descripcion}
                            </p>
                            <p className="text-gray-600 text-sm mb-10">
                                Prioridad: {recomendacion.prioridad}
                            </p>

                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={() => openModalConfirmacion(recomendacion.id)}
                                    className="btn-custom btn-custom-warning"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-4 text-gray-500">
                    No hay recomendaciones asociadas.
                </div>
            )}

            {modalConfirmacion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 w-11/12 sm:w-2/3">
                        <h2 className="text-2xl font-semibold mb-6">¿Estás seguro?</h2>
                        <p className="text-gray-700 mb-4">
                            Estás a punto de eliminar esta recomendación. ¿Deseas continuar?
                        </p>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={closeModalConfirmacion}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEliminarRecomendacion}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-[800px] h-[450px] flex flex-col">
                        <h2 className="text-2xl font-semibold mb-4">Seleccionar Recomendaciones</h2>

                        <div className="flex-1 overflow-y-auto">
                            {paginatedRecomendaciones.map((recomendacion) => (
                                <div
                                    key={recomendacion.id}
                                    className="flex items-center justify-between py-2 px-4 border-b"
                                >
                                    <div>
                                        <span className="text-lg font-semibold">{recomendacion.titulo}</span>
                                        <p className="text-sm text-gray-500">{recomendacion.descripcion}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedRecomendaciones.includes(recomendacion.id)}
                                        onChange={() => handleSelectRecomendacion(recomendacion.id)}
                                        className="checkbox"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-4 space-x-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-md ${currentPage === index + 1
                                        ? "bg-teal-500 text-white"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={closeModal}
                                className="btn-custom btn-custom-warning"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveSelectedRecomendaciones}
                                className="btn-custom btn-custom-success"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecomendacionesTestEstres;
