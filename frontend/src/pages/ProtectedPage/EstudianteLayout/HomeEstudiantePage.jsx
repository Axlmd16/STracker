import { Battery, User } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ActividadesPendientesCard from "../../../components/Cards/ActvididadesCard";
import AsignaturaCardEstudiante from "../../../components/Cards/AsignaturaCardEstudiante";
import RecomendacionesCard from "../../../components/Cards/RecomendacionesCard";
import TestDeEstresCard from "../../../components/Cards/TestDeEstresCard";

function HomeEstudiantePage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pending, setPending] = useState(false);

    //* Funcion para obtener la informacion del usuario autenticado
    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await actions.getUserInfo(store.id_user_auth);
            setUserInfo(userInfo);
        };

        getUserInfo();
    }, [actions, store]);

    return (
        <div className="bg-base-200 min-h-screen">
            {/* Header Mejorado */}
            <div className="bg-base-100 shadow-lg mb-6">
                <div className="container mx-auto p-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-12">
                                    <User className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Monitor de Bienestar Estudiantil
                                </h1>
                                <p className="text-base-content/70">
                                    {userInfo?.nombres?.split(" ")[0] +
                                        " " +
                                        userInfo?.apellidos?.split(" ")[0] ||
                                        "Estudiante"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-base-200 p-3 rounded-lg">
                            <Battery className="w-6 h-6 text-warning" />
                            <div>
                                <div className="text-sm font-medium">
                                    Nivel de Estrés
                                </div>
                                <div className="text-xl font-bold text-warning">
                                    Moderado
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full">
                <div className="mb-6">
                    {/* Tarjetas de asignaturas */}
                    <AsignaturaCardEstudiante actions={actions} store={store} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
                    <div className="xl:col-span-2">
                        <TestDeEstresCard actions={actions} store={store} />

                        <ActividadesPendientesCard
                            actions={actions}
                            store={store}
                        />
                    </div>

                    {/* Stress Graph and Main Content */}
                    <div className="xl:col-span-3">
                        {/* Gráfica de Estrés */}
                        <div className="card bg-base-100 shadow-lg mb-6">
                            <div className="card-body">
                                <h2 className="card-title text-xl">
                                    Tendencias de Estrés
                                </h2>
                                <div className="h-80 bg-base-200 rounded-xl flex items-center justify-center mt-4">
                                    <p className="text-base-content/70">
                                        Gráfica de tendencias de estrés
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendaciones */}
                    <div className="xl:col-span-1">
                        <RecomendacionesCard actions={actions} store={store} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeEstudiantePage;
