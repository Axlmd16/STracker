import React, { useState, useEffect, useCallback } from "react";
import {
    BookOpen,
    Brain,
    Heart,
    AlertCircle,
    FileText,
    Activity,
    Battery,
    Coffee,
    Clock,
    Calendar,
    User,
} from "lucide-react";
import TestDeEstresCard from "./TestDeEstresCard";
import { toast } from "react-hot-toast";

function HomeEstudiantePage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pending, setPending] = useState(false);
    const [asignaciones, setAsignaciones] = useState([]);

    //* Funcion para obtener la informacion del usuario autenticado
    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await actions.getUserInfo(store.id_user_auth);
            setUserInfo(userInfo);
        };

        getUserInfo();
    }, [actions, store]);

    const fetchAsignacionesEstudiante = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getResultadosPorEstudiante(
                store.id_user_auth
            );
            setAsignaciones(data);
        } catch (error) {
            toast.error("Error al cargar las actividades académicas");
        } finally {
            setPending(false);
        }
    }, [actions, store]);

    useEffect(() => {
        fetchAsignacionesEstudiante();
    }, [fetchAsignacionesEstudiante]);

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

            {/* Contenido Principal */}
            <div className="container mx-auto p-4">
                {/* Grid Principal de 3 Columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Columna 1: Actividades y Evaluaciones */}
                    <div className="space-y-6">
                        {/* Actividades Pendientes */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Actividades Pendientes
                                </h2>
                                <div className="space-y-3">
                                    <div className="alert bg-base-200">
                                        <Calendar className="w-5 h-5" />
                                        <div>
                                            <div className="font-bold">
                                                Entrega Proyecto Final
                                            </div>
                                            <div className="text-sm">
                                                Matemáticas - Mañana
                                            </div>
                                        </div>
                                    </div>
                                    <div className="alert bg-base-200">
                                        <Calendar className="w-5 h-5" />
                                        <div>
                                            <div className="font-bold">
                                                Presentación Grupal
                                            </div>
                                            <div className="text-sm">
                                                Física - 2 días
                                            </div>
                                        </div>
                                    </div>
                                    <div className="alert bg-base-200">
                                        <Calendar className="w-5 h-5" />
                                        <div>
                                            <div className="font-bold">
                                                Práctica de Laboratorio
                                            </div>
                                            <div className="text-sm">
                                                Química - Próxima semana
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Evaluaciones de Estrés */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <div className="space-y-3">
                                    <div className="card bg-base-100 shadow-lg">
                                        <h2 className="card-title text-xl mb-4">
                                            Tests de Estrés Asignados
                                        </h2>

                                        <div className="space-y-4">
                                            {asignaciones?.map((resultado) => (
                                                <TestDeEstresCard
                                                    key={resultado.id}
                                                    test={resultado}
                                                    actions={actions}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Gráfica y Factores de Estrés */}
                    <div className="space-y-6">
                        {/* Espacio para Gráfica */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Tendencias de Estrés
                                </h2>
                                <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
                                    <p className="text-base-content/70">
                                        Gráfica de tendencias
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna 3: Materias y Recomendaciones */}
                    <div className="space-y-6">
                        {/* Materias */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Materias Actuales
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        "Matemáticas",
                                        "Física",
                                        "Programación",
                                        "Química",
                                    ].map((subject, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                                        >
                                            <BookOpen className="w-5 h-5 text-primary" />
                                            <div>
                                                <div className="font-medium">
                                                    {subject}
                                                </div>
                                                <div className="text-sm text-base-content/70">
                                                    Exigencia:{" "}
                                                    {index % 2 === 0
                                                        ? "Alta"
                                                        : "Media"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recomendaciones */}
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title">Recomendaciones</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-3 items-start">
                                        <div className="bg-success/20 p-2 rounded-lg">
                                            <Heart className="w-4 h-4 text-success" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                Descansos Regulares
                                            </h3>
                                            <p className="text-sm text-base-content/70">
                                                15 min cada 2 horas
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="bg-primary/20 p-2 rounded-lg">
                                            <Clock className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                Rutina de Sueño
                                            </h3>
                                            <p className="text-sm text-base-content/70">
                                                Aumenta tus horas de descanso
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeEstudiantePage;
