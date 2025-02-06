import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PerfilPage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pending, setPending] = useState(false);
    const [asignaturasEstudiante, setAsignaturasEstudiante] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [notificacionesPorPagina] = useState(3); // 3 asignaturas por página

    const fetchUserInfo = useCallback(async () => {
        setPending(true);
        try {
            const userId = store.id_user_auth;
            if (userId) {
                const info = await actions.getInfoUser(userId);
                setUserInfo(info);
            }
        } catch (error) {
            console.error("Error al cargar la información del usuario", error);
        } finally {
            setPending(false);
        }
    }, [actions, store.id_user_auth]);

    const fetchUserInfoAsignaturas = useCallback(async () => {
        setPending(true);
        try {
            const userId = store.id_user_auth;
            if (userId) {
                const info = await actions.obtenerAsignaturaEstudiante(userId);
                setAsignaturasEstudiante(info);
            }
        } catch (error) {
            console.error("Error al cargar la información de las asignaturas", error);
        } finally {
            setPending(false);
        }
    }, [actions, store.id_user_auth]);

    useEffect(() => {
        fetchUserInfo();
        fetchUserInfoAsignaturas();
    }, [fetchUserInfo, fetchUserInfoAsignaturas]);

    // Lógica para mostrar las asignaturas de la página actual
    const indexOfLastAsignatura = paginaActual * notificacionesPorPagina;
    const indexOfFirstAsignatura = indexOfLastAsignatura - notificacionesPorPagina;
    const asignaturasPaginaActual = asignaturasEstudiante.slice(indexOfFirstAsignatura, indexOfLastAsignatura);

    // Cambiar de página
    const handlePageChange = (pagina) => {
        setPaginaActual(pagina);
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(asignaturasEstudiante.length / notificacionesPorPagina);

    if (pending) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
                <p className="text-center text-gray-500">Cargando información del usuario...</p>
            </div>
        );
    }

    if (!userInfo) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <p className="text-center text-gray-500">No se pudo cargar la información del usuario.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg">
            <div className={`grid ${asignaturasEstudiante.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
                {/* Información del Usuario */}
                <div className={`bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8 rounded-lg shadow-2xl relative max-h-[500px] overflow-hidden ${asignaturasEstudiante.length === 0 ? 'mx-auto' : ''}`}>
                    <div className="absolute -top-4 -left-6 w-24 h-24 bg-gray-300 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-6 -right-8 w-32 h-32 bg-gray-400 rounded-full opacity-20"></div>
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                        Información del Usuario
                    </h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <span className="font-semibold text-gray-700">Nombres:</span>
                            <span className="text-gray-800">{userInfo.nombres}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <span className="font-semibold text-gray-700">Apellidos:</span>
                            <span className="text-gray-800">{userInfo.apellidos}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <span className="font-semibold text-gray-700">Teléfono:</span>
                            <span className="text-gray-800">{userInfo.telefono}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <span className="font-semibold text-gray-700">Cédula:</span>
                            <span className="text-gray-800">{userInfo.cedula}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="text-gray-800">{userInfo.email}</span>
                        </div>
                    </div>
                </div>

                {/* Sección de Asignaturas (solo si hay asignaturas) */}
                {asignaturasEstudiante.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8 rounded-lg shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-4 -left-6 w-24 h-24 bg-gray-300 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-6 -right-8 w-32 h-32 bg-gray-400 rounded-full opacity-20"></div>
                        <h3 className="text-3xl text-center font-bold text-gray-700 mb-8">Mis Asignaturas</h3>
                        <div className="space-y-6">
                            {asignaturasPaginaActual.map((asignatura) => {
                                const fechaFin = new Date(asignatura.fecha_fin);
                                const fechaActual = new Date();
                                const isFinalizada = fechaActual > fechaFin;

                                return (
                                    <div
                                        key={asignatura.id}
                                        className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${isFinalizada ? 'border-red-400' : 'border-gray-500'}`}
                                    >
                                        <h4 className="text-xl font-bold text-gray-700 mb-4 text-center">
                                            {asignatura.nombre}
                                        </h4>
                                        <div
                                            className={`bg-gradient-to-br ${isFinalizada ? 'from-gray-200 to-gray-100' : 'from-gray-200 to-gray-100'} p-4 rounded-md shadow-sm`}
                                        >
                                            <ul className="space-y-3">
                                                <li className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-800">Número de horas:</span>
                                                    <span className="text-gray-800 font-semibold">{asignatura.nro_horas} horas</span>
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-800">Paralelo:</span>
                                                    <span className="text-gray-800 font-semibold">{asignatura.paralelo}</span>
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-800">Fecha de Inicio:</span>
                                                    <span className="text-gray-800 font-semibold">
                                                        {new Date(asignatura.fecha_inicio).toLocaleDateString()}
                                                    </span>
                                                </li>
                                                <li className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-800">Fecha de Fin:</span>
                                                    <span className="text-gray-800 font-semibold">
                                                        {new Date(asignatura.fecha_fin).toLocaleDateString()}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        {isFinalizada && (
                                            <div className="text-center text-red-400 font-semibold mt-4">
                                                Finalizada
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Paginación, solo si hay 4 o más asignaturas */}
                        {asignaturasEstudiante.length >= 4 && (
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handlePageChange(paginaActual - 1)}
                                    disabled={paginaActual === 1}
                                    className="btn btn-sm btn-outline text-gray-600"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <span className="text-sm text-gray-500">
                                    Página {paginaActual} de {totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(paginaActual + 1)}
                                    disabled={paginaActual === totalPages}
                                    className="btn btn-sm btn-outline text-gray-600"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerfilPage;
