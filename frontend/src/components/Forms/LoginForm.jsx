import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = ({ actions, store }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await actions.iniciar_sesion(data);

        if (result === true) {
            if (store.isAuthenticated) {
                if (store.access_role === "ADMINISTRADOR") {
                    navigate("/home/administrador");
                } else if (store.access_role === "DOCENTE") {
                    navigate("/home/docente");
                } else if (store.access_role === "ESTUDIANTE") {
                    navigate("/home/estudiante");
                }
                toast.success("Bienvenido de vuelta", {
                    duration: 3500,
                    position: "top-center",
                });
            }
        } else {
            toast.error(result, {
                duration: 3500,
                position: "top-center",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-96 p-6  rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Iniciar Sesión
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            className="block text-gray-700 font-medium mb-1"
                            htmlFor="username"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.username
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                            placeholder="Ingresa tu usuario"
                            {...register("username", { required: true })}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm block mt-1">
                                El nombre de usuario es requerido.
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 font-medium mb-1"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                            }`}
                            placeholder="••••••••"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm block mt-1">
                                La contraseña es requerida.
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                    >
                        Ingresar
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    ¿Olvidaste tu contraseña?{" "}
                    <a href="/recuperar/password" className="text-blue-600 hover:underline">
                        Recuperar
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
