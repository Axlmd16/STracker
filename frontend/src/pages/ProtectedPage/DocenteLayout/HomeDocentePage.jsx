import { AlertTriangle, BarChart, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SubjectCard from "../../../components/Cards/SubjectCard";

function HomeDocentePage({ actions, store }) {
    const [asignaturas, setAsignaturas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAsignaturas = async () => {
            setLoading(true);
            try {
                // const data = await actions.getAsignaturas();
                const data = await actions.getProvAsignaturas();
                setAsignaturas(data);
            } catch (error) {
                console.error("Error al cargar las asignaturas:", error);
                toast.error("Error al cargar las asignaturas");
            } finally {
                setLoading(false);
            }
        };

        fetchAsignaturas();
    }, [actions]);

    return (
        <div className="p-4 space-y-6 font-sans">
            {/* Sección de Tus Asignaturas */}
            <div className="container mx-auto p-6">
                <div className="flex flex-col items-center gap-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Tus Asignaturas</h1>
                        <p className="text-base-content/70 mt-2">
                            Gestiona tus materias y contenido académico
                        </p>
                    </div>

                    {loading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : asignaturas.length === 0 ? (
                        <p>No se encontraron asignaturas :(</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {asignaturas.map((asignatura) => (
                                <SubjectCard
                                    key={asignatura.id}
                                    {...asignatura}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeDocentePage;
