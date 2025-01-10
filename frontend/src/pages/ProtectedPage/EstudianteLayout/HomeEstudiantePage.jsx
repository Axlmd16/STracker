import React, { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import ActividadesPendientesCard from "../../../components/Cards/ActvididadesCard";
import AsignaturaCardEstudiante from "../../../components/Cards/AsignaturaCardEstudiante";
import TestDeEstresCard from "../../../components/Cards/TestDeEstresCard";

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

    // Mock data mejorado para el historial
    const historialData = [
        { fecha: "Ene 2024", puntaje: 75, promedio: 70 },
        { fecha: "Feb 2024", puntaje: 65, promedio: 68 },
        { fecha: "Mar 2024", puntaje: 80, promedio: 72 },
        { fecha: "Abr 2024", puntaje: 72, promedio: 71 },
        { fecha: "May 2024", puntaje: 68, promedio: 69 },
        { fecha: "Jun 2024", puntaje: 77, promedio: 73 },
    ];



                    {/* Columna Central */}
                    <div className="xl:col-span-8">
                        <div className="mb-6">
                            <AsignaturaCardEstudiante
                                actions={actions}
                                store={store}
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 ">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Evolución Temporal
                            </h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={historialData}>
                                        <defs>
                                            <linearGradient
                                                id="colorPuntaje"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="colorPromedio"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#82ca9d"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#82ca9d"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="fecha" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="puntaje"
                                            stroke="#8884d8"
                                            fillOpacity={1}
                                            fill="url(#colorPuntaje)"
                                            name="Nivel de Estrés"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="promedio"
                                            stroke="#82ca9d"
                                            fillOpacity={1}
                                            fill="url(#colorPromedio)"
                                            name="Promedio Grupal"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
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
