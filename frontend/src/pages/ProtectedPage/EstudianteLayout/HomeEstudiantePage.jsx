import React, { useState, useEffect } from "react";
import {
    BookOpen,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    Brain,
    Award,
    FileSpreadsheet,
    ClipboardList,
    FileText,
    User,
} from "lucide-react";

function HomeEstudiantePage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);

    //* Funcion para obtener la informacion del usuario autenticado
    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await actions.getUserInfo(store.id_user_auth);
            setUserInfo(userInfo);
        };

        getUserInfo();
    }, [actions, store]);

    return (
        <div className="bg-base-200 min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Panel de Estudiante</h1>
                    <p className="text-base-content/70">
                        Bienvenido de vuelta,{" "}
                        {userInfo?.nombres?.split(" ")[0] +
                            " " +
                            userInfo?.apellidos?.split(" ")[0] || "Estudiante"}
                    </p>
                </div>
            </div>

            {/* Grid de Estadísticas de Asignaturas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-primary">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Materias Activas</div>
                    <div className="stat-value">6</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-secondary">
                        <ClipboardList className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Actividades Pendientes</div>
                    <div className="stat-value">12</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-accent">
                        <Brain className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Tests de Estrés</div>
                    <div className="stat-value">3</div>
                </div>
            </div>

            {/* Grid Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Asignaturas Actuales */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">
                            Mis Asignaturas
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Matemáticas",
                                "Física",
                                "Programación",
                                "Química",
                                "Literatura",
                                "Historia",
                            ].map((subject, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                                >
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    <div>
                                        <div className="font-medium">
                                            {subject}
                                        </div>
                                        <div className="text-sm text-base-content/70">
                                            {index % 2 === 0
                                                ? "Lunes y Miércoles"
                                                : "Martes y Jueves"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actividades Académicas */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">
                            Actividades Académicas
                        </h2>
                        <div className="space-y-4">
                            <div className="alert alert-info">
                                <FileText className="w-5 h-5" />
                                <div>
                                    <div className="font-bold">
                                        Proyecto Grupal
                                    </div>
                                    <div className="text-sm">
                                        Matemáticas - Entrega: 28 Abril
                                    </div>
                                </div>
                            </div>
                            <div className="alert alert-warning">
                                <AlertCircle className="w-5 h-5" />
                                <div>
                                    <div className="font-bold">
                                        Presentación
                                    </div>
                                    <div className="text-sm">
                                        Física - 2 Mayo
                                    </div>
                                </div>
                            </div>
                            <div className="alert alert-success">
                                <CheckCircle className="w-5 h-5" />
                                <div>
                                    <div className="font-bold">
                                        Práctica de Laboratorio
                                    </div>
                                    <div className="text-sm">
                                        Química - 5 Mayo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tests de Estrés */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">
                            Tests de Estrés Asignados
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Brain className="w-5 h-5 text-primary mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Evaluación Mensual
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Pendiente - Vence en 3 días
                                    </div>
                                    <div className="mt-2">
                                        <button className="btn btn-primary btn-sm">
                                            Comenzar Test
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Brain className="w-5 h-5 text-secondary mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Test Pre-exámenes
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Disponible desde: 1 Mayo
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            disabled
                                        >
                                            Próximamente
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Brain className="w-5 h-5 text-accent mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Evaluación de Carga Académica
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Completado - 15 Abril
                                    </div>
                                    <div className="mt-2">
                                        <button className="btn btn-outline btn-sm">
                                            Ver Resultados
                                        </button>
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
