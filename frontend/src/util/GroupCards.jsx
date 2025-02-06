import { useState } from "react";
import { Trash2, Edit, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GroupCards({ data, handleDelete, idAsignatura }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const handleNavigate = (groupId) => {
        navigate(`/home/docente/gruposDetallesUpdate/${groupId}/${idAsignatura}`);
    };

    const confirmDelete = (groupId) => {
        setSelectedGroupId(groupId);
        setShowModal(true);
    };

    const onDeleteConfirmed = () => {
        if (selectedGroupId !== null) {
            handleDelete(selectedGroupId);
            setShowModal(false);
            setSelectedGroupId(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {data.length > 0 ? (
                    data.map((group) => (
                        <div
                            key={group.id}
                            className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-300"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-10 rounded-xl"
                                style={{
                                    backgroundImage: "url('/src/util/imgs/Background-group.png')",
                                }}
                            ></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-sky-700">{group.nombre}</h3>
                                    <Users className="text-sky-600" size={22} />
                                </div>
                                {/* <p className="text-gray-600 mt-2">
                                    Estudiantes: <span className="font-semibold text-gray-900">{group.nro_estudiantes}</span>
                                </p> */}

                                <div className="flex justify-end mt-6 space-x-2">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => handleNavigate(group.id)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => confirmDelete(group.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center text-lg">
                        No hay grupos registrados.
                    </p>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-128">
                        <h2 className="text-xl font-semibold text-gray-800">
                            ¿Estás seguro de eliminar este grupo?
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="btn-custom btn-custom-warning"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn-custom btn-custom-success"
                                onClick={onDeleteConfirmed}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GroupCards;
