import React from "react";
import {
    BookOpen,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    Brain,
    Award,
    FileSpreadsheet,
} from "lucide-react";

function HomeEstudiantePage({ actions, store }) {
    return (
        <div className="bg-base-200 min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Panel de Estudiante</h1>
                    <p className="text-base-content/70">
                        Bienvenido de vuelta, Juan Pérez
                    </p>
                </div>
                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Promedio General</div>
                        <div className="stat-value text-primary">8.5</div>
                    </div>
                </div>
            </div>

            {/* Actividades Pendientes */}
            <div className="card bg-base-100 shadow-lg mb-6">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">
                        Próximas Actividades
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="alert alert-warning">
                            <AlertCircle className="w-5 h-5" />
                            <div>
                                <div className="font-bold">
                                    Entrega Proyecto Final
                                </div>
                                <div className="text-sm">
                                    Matemáticas - Vence en 2 días
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-error">
                            <FileSpreadsheet className="w-5 h-5" />
                            <div>
                                <div className="font-bold">Examen Parcial</div>
                                <div className="text-sm">
                                    Física - Mañana 10:00 AM
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-info">
                            <CheckCircle className="w-5 h-5" />
                            <div>
                                <div className="font-bold">Tarea Grupal</div>
                                <div className="text-sm">
                                    Programación - Próxima semana
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-primary">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Materias Activas</div>
                    <div className="stat-value">6</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-secondary">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Horas Semanales</div>
                    <div className="stat-value">24</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-accent">
                        <Brain className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Tareas Pendientes</div>
                    <div className="stat-value text-accent">8</div>
                </div>
                <div className="stat bg-base-100 shadow rounded-box">
                    <div className="stat-figure text-success">
                        <Award className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Asistencia</div>
                    <div className="stat-value text-success">92%</div>
                </div>
            </div>

            {/* Asignaturas y Actividades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de Asignaturas */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Mis Asignaturas</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Asignatura</th>
                                            <th>Profesor</th>
                                            <th>Progreso</th>
                                            <th>Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Matemáticas</td>
                                            <td>Dr. García</td>
                                            <td>
                                                <progress
                                                    className="progress progress-primary w-20"
                                                    value="70"
                                                    max="100"
                                                ></progress>
                                            </td>
                                            <td>8.5</td>
                                        </tr>
                                        <tr>
                                            <td>Física</td>
                                            <td>Dra. Martínez</td>
                                            <td>
                                                <progress
                                                    className="progress progress-primary w-20"
                                                    value="85"
                                                    max="100"
                                                ></progress>
                                            </td>
                                            <td>9.0</td>
                                        </tr>
                                        <tr>
                                            <td>Programación</td>
                                            <td>Ing. Rodríguez</td>
                                            <td>
                                                <progress
                                                    className="progress progress-primary w-20"
                                                    value="60"
                                                    max="100"
                                                ></progress>
                                            </td>
                                            <td>8.0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendario y Eventos */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Próximos Eventos</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Calendar className="w-5 h-5 text-primary mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Examen Parcial
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Física
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        24 Abril, 10:00 AM
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Calendar className="w-5 h-5 text-secondary mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Presentación Grupal
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Programación
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        26 Abril, 2:00 PM
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-3 bg-base-200 rounded-lg">
                                <Calendar className="w-5 h-5 text-accent mt-1" />
                                <div>
                                    <div className="font-medium">
                                        Entrega Proyecto
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        Matemáticas
                                    </div>
                                    <div className="text-sm text-base-content/70">
                                        28 Abril, 11:59 PM
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
