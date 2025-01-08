import { Edit, Trash2 } from "lucide-react";

function AsignacionTestCards({ data, handleUpdate, handleDelete }) {
    return (
        <div className="flex flex-col w-full gap-6 p-4 bg-white rounded-lg">
            {data.map((item) => (
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
                            {item.fecha_asignacion}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium text-cyan-600">
                                Fecha Limite:
                            </span>{" "}
                            {item.fecha_limite}
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
        </div>
    );
}

export default AsignacionTestCards;
