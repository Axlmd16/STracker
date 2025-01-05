import React from "react";
import {
    Users,
    BookOpen,
    Brain,
    FileText,
    Bell,
    Search,
    Settings,
    LogOut,
} from "lucide-react";
import UserCard from "../../../components/Cards/UserCard";
import { Link } from "react-router-dom";
import StatisticsCards from "../../../components/Cards/StatisticsCards";
import TestsCard from "../../../components/Cards/TestsCard";

function HomeAdminPage({ actions, store }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Contenido principal */}
            <div className="container mx-auto px-6 py-8">
                <StatisticsCards actions={actions} store={store} />
                {/* Secciones principales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gestión de Usuarios */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">
                                Gestión de Usuarios
                            </h2>
                            <Link
                                to="/home/administrador/cuentas"
                                className="btn btn-primary btn-sm"
                            >
                                Ver todos
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <UserCard actions={actions} store={store} />
                        </div>
                    </div>

                    {/* Test de Estrés */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">
                                Test de Estrés Recientes
                            </h2>
                            <Link
                                to="/home/administrador/tests"
                                className="btn btn-primary btn-sm"
                            >
                                Ver todos
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {/* Lista de tests recientes */}
                            <TestsCard actions={actions} store={store} />
                        </div>
                    </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">
                        Acciones Rápidas
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="p-4 rounded-lg bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all">
                            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                            <span className="text-sm font-medium text-primary">
                                Nuevo Usuario
                            </span>
                        </button>
                        <button className="p-4 rounded-lg bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all">
                            <BookOpen className="h-6 w-6 text-primary mx-auto mb-2" />
                            <span className="text-sm font-medium text-primary">
                                Nuevo Docente
                            </span>
                        </button>
                        <button className="p-4 rounded-lg bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all">
                            <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
                            <span className="text-sm font-medium text-primary">
                                Crear Test
                            </span>
                        </button>
                        <button className="p-4 rounded-lg bg-primary bg-opacity-10 hover:bg-opacity-20 transition-all">
                            <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                            <span className="text-sm font-medium text-primary">
                                Nueva Recomendación
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdminPage;
