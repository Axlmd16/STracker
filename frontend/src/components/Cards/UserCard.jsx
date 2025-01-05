import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserIcon, Phone, Mail, IdCard, Shield } from "lucide-react";

const UserCard = ({ actions, store }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await actions.getUltimosUsuarios();
                setUsers(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading)
        return (
            <span>
                <div className="flex justify-center items-center min-h-[400px]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </span>
        );
    if (error) return <p>Error al cargar usuarios: {error.message}</p>;

    const getRolColor = (rol) => {
        const colors = {
            ADMIN: "bg-purple-100 text-purple-800",
            PROFESOR: "bg-blue-100 text-blue-800",
            ESTUDIANTE: "bg-green-100 text-green-800",
        };
        return colors[rol] || "bg-gray-100 text-gray-800";
    };

    const getInitials = (nombres, apellidos) => {
        return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                                    {getInitials(user.nombres, user.apellidos)}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-medium text-gray-900">
                                            {user.nombres} {user.apellidos}
                                        </h4>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRolColor(
                                                user.rol
                                            )}`}
                                        >
                                            {user.rol}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Mail className="w-4 h-4" />
                                            <span>{user.email}</span>
                                        </div>
                                        {user.telefono && (
                                            <div className="flex items-center space-x-1">
                                                <Phone className="w-4 h-4" />
                                                <span>{user.telefono}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-1">
                                            <IdCard className="w-4 h-4" />
                                            <span>{user.cedula}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                                    <Shield className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
                <span className="text-gray-600 text-sm font-medium float-end">
                    Mostrando {users.length} usuarios
                </span>
            </div>
        </div>
    );
};

export default UserCard;
