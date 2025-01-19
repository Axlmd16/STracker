import React, { useEffect, useState } from "react";

import ActividadesPendientesCard from "../../../components/Cards/ActvididadesCard";
import AsignaturaCardEstudiante from "../../../components/Cards/AsignaturaCardEstudiante";
import TestDeEstresCard from "../../../components/Cards/TestDeEstresCard";
import HistorialEstresEstudiante from "../../../components/Graphics/HistorialEstresEstudiante";

function HomeEstudiantePage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await actions.getUserInfo(store.id_user_auth);
            setUserInfo(userInfo);
        };

        getUserInfo();
    }, [actions, store]);

    return (
        <div className="p-3">
            {/* Main Content */}
            <div className=" ">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Columna Izquierda */}
                    <div className="xl:col-span-4 flex flex-col gap-6">
                        <TestDeEstresCard actions={actions} store={store} />
                        <ActividadesPendientesCard
                            actions={actions}
                            store={store}
                        />
                    </div>

                    {/* Columna Central */}
                    <div className="xl:col-span-8">
                        <div className="mb-6">
                            <AsignaturaCardEstudiante
                                actions={actions}
                                store={store}
                            />
                        </div>

                        <HistorialEstresEstudiante
                            actions={actions}
                            store={store}
                        />
                    </div>

                    {/* Columna Derecha */}
                    <div className="xl:col-span-3">
                        <div className="sticky top-6">
                            {/* <RecomendacionesCard
                                actions={actions}
                                store={store}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeEstudiantePage;
