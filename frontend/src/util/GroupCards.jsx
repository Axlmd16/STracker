import { Trash2, Edit, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";  

function GroupCards({ data, handleDelete, idAsignatura }) {
    const navigate = useNavigate(); 

    const handleNavigate = (groupId) => {
        navigate(`/home/docente/gruposDetallesUpdate/${groupId}/${idAsignatura}`);  
    };

    return (
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
                            <p className="text-gray-600 mt-2">
                                Estudiantes: <span className="font-semibold text-gray-900">{group.nro_estudiantes}</span>
                            </p>
                            
                            <div className="flex justify-end mt-6 space-x-2">
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => handleNavigate(group.id)}  
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleDelete(group.id)}
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
    );
}

export default GroupCards;
