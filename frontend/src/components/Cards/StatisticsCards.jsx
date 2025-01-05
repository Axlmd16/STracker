import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, BookOpen, Brain, FileText } from "lucide-react";

const StatisticsCards = ({ actions, store }) => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await actions.getInfoGeneral();
                setStats(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Cargando estadísticas...</p>;
    if (error) return <p>Error al cargar estadísticas: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Total Usuarios</p>
                        <h3 className="text-2xl font-bold">
                            {stats.total_usuarios}
                        </h3>
                    </div>
                    <Users className="h-10 w-10 text-primary" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Docentes Activos</p>
                        <h3 className="text-2xl font-bold">
                            {stats.total_docentes}
                        </h3>
                    </div>
                    <BookOpen className="h-10 w-10 text-primary" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Tests Activos</p>
                        <h3 className="text-2xl font-bold">
                            {stats.total_test}
                        </h3>
                    </div>
                    <Brain className="h-10 w-10 text-primary" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500">Recomendaciones</p>
                        <h3 className="text-2xl font-bold">
                            {stats.recomendaciones}
                        </h3>
                    </div>
                    <FileText className="h-10 w-10 text-primary" />
                </div>
            </div>
        </div>
    );
};

export default StatisticsCards;
