import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

function AsignacionTestCards({ data, handleUpdate, handleDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-col w-full gap-6 p-4 bg-white rounded-lg">
            {paginatedData.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center bg-gray-200 text-gray-800 rounded-lg shadow-xl p-6 relative overflow-hidden"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                        <span className="text-lg font-bold text-white">
                            {item.descripcion ? item.descripcion[0] : "T"}
                        </span>
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-xl font-bold text-gray-900">
                            {item.descripcion}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-cyan-600">
                                Fecha de asignación:
                            </span>{" "}
                            {formatDate(item.fecha_asignacion)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-cyan-600">
                                Fecha Limite:
                            </span>{" "}
                            {formatDate(item.fecha_limite)}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <button
                            onClick={() => handleUpdate(item)}
                            className="btn-accion btn-editar"
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="btn-accion btn-eliminar"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Paginacion */}
            {data.length >= 10 && (
                <div className="flex justify-center mt-4 gap-4">
                    <button
                        onClick={handlePreviousPage}
                        className="btn-custom btn-custom-purple"
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        className="btn-custom btn-custom-purple"
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}

export default AsignacionTestCards;
