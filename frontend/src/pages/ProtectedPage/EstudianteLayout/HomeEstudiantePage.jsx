import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
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
import TestDeEstresCard from "./TestDeEstresCard";

function HomeEstudiantePage({ actions, store }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pending, setPending] = useState(false);
    const [asignaciones, setAsignaciones] = useState([]);

    const fetchAsignacionesEstudiante = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAllAsignacionTestForEstudiante(store.id_user_auth);
            setAsignaciones(data);
        } catch (error) {
            toast.error("Error al cargar las actividades académicas");
        } finally {
            setPending(false);
        }
    }, [actions]);

    //* Funcion para obtener la informacion del usuario autenticado
    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await actions.getUserInfo(store.id_user_auth);
            setUserInfo(userInfo);
        };

        getUserInfo();
    }, [actions, store]);

    useEffect(() => {
        fetchAsignacionesEstudiante();
    }, [fetchAsignacionesEstudiante]);

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
                                {asignaciones?.map((test) => (
                                    <TestDeEstresCard key={test.id} test={test} actions={actions} />
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default HomeEstudiantePage;
