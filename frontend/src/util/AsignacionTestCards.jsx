import { Edit, Trash2 } from "lucide-react";

function AsignacionTestCards({ data, handleUpdate, handleDelete }) {
    return (
        <div className="flex flex-col w-full gap-6 p-4 bg-gray-100 rounded-lg">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center bg-gray-900 text-white rounded-lg shadow-lg p-6 relative overflow-hidden"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-300 to-teal-600 rounded-full flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                        <span className="text-lg font-bold text-gray-900">
                            {item.descripcion.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-xl font-bold text-white">
                            {item.descripcion}
                        </h3>
                        <p className="text-sm text-gray-300 mt-2">
                            <span className="font-medium text-teal-200">Fecha de asignación:</span>{" "}
                            {item.fecha_asignacion}
                        </p>
                        <p className="text-sm text-gray-300 mt-2">
                            <span className="font-medium text-teal-200">Fecha Limite:</span>{" "}
                            {item.fecha_limite}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <button
                            onClick={() => handleUpdate(item)}
                            className="animated-button flex items-center gap-2 text-teal-200"
                        >
                            <Edit size={16} />
                            <span className="hidden sm:inline">Editar</span>
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="animated-button flex items-center gap-2 delete-button"
                        >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Eliminar</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AsignacionTestCards;
