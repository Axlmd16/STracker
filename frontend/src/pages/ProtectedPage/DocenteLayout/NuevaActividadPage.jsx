import {
    BookOpen,
    CalendarArrowDown,
    CalendarArrowUp,
    Upload,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import LeftPanel from "../../../components/Cards/ActivityTypeCard.jsx";
import ImputForm from "../../../components/Forms/Fields/ImputForm";
import TextAreaForm from "../../../components/Forms/Fields/TextAreaForm";
import Sidebar from "../../../components/Navigation/Sidebar";

function NuevaActividadPage({ actions, store }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    //* Funcion para enviar los datos
    const onSubmit = async (data) => {
        const promise = actions.createActividad(data);
        toast.promise(promise, {
            loading: <span className="loading loading-spinner"></span>,
            success: <b>Actividad registrada correctamente</b>,

            error: (err) => {
                if (err.response) {
                    const { status, data } = err.response;
                    if (status === 409) {
                        return <b>{data.detail}</b>;
                    } else {
                        return <b>Error al registrar la actividad</b>;
                    }
                }
                return <b>Error inesperado al registrar la actividad</b>;
            },
        });

        try {
            await promise;
            navigate(`/home/docente/asignatura/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        clearErrors();
        navigate(`/home/docente/asignatura/${id}`);
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>

            <div className="">
                <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                    <div className="flex gap-6 h-full">
                        <LeftPanel />

                        <div className="w-3/4">
                            <div className="card bg-white shadow-xl">
                                <div className="card-body p-8">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-10"
                                    >
                                        {/* Información General Section */}
                                        <section>
                                            <h2 className="text-xl font-semibold mb-8 pb-2 border-b">
                                                Información General
                                            </h2>
                                            <div className="grid grid-cols-2 gap-8">
                                                {/* Left Column - Title and Description */}
                                                <div className="space-y-8">
                                                    <div className="relative">
                                                        <ImputForm
                                                            label="Titulo"
                                                            name="titulo"
                                                            type="text"
                                                            register={register}
                                                            errors={errors}
                                                            clearErrors={
                                                                clearErrors
                                                            }
                                                            icon={BookOpen}
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <TextAreaForm
                                                            label="Descripción"
                                                            name="descripcion"
                                                            type="text"
                                                            register={register}
                                                            errors={errors}
                                                            required={false}
                                                            clearErrors={
                                                                clearErrors
                                                            }
                                                            icon={BookOpen}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Right Column - Dates */}
                                                <div className="space-y-8">
                                                    <div className="relative">
                                                        <ImputForm
                                                            label="Desde:"
                                                            name="fecha_inicio"
                                                            type="datetime-local"
                                                            register={register}
                                                            errors={errors}
                                                            clearErrors={
                                                                clearErrors
                                                            }
                                                            icon={
                                                                CalendarArrowUp
                                                            }
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <ImputForm
                                                            label="Hasta:"
                                                            name="fecha_fin"
                                                            type="datetime-local"
                                                            register={register}
                                                            errors={errors}
                                                            clearErrors={
                                                                clearErrors
                                                            }
                                                            icon={
                                                                CalendarArrowDown
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                type="number"
                                                value={id}
                                                hidden={true}
                                                {...register("asignatura_id", {
                                                    required: true,
                                                })}
                                            />
                                        </section>

                                        {/* Archivos Adjuntos Section */}
                                        <section>
                                            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">
                                                Archivos Adjuntos
                                            </h2>
                                            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 transition-all duration-300 hover:border-gray-400">
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
                                                        <Upload className="w-8 h-8 text-gray-500" />
                                                    </div>
                                                    <p className="text-gray-600 mb-4">
                                                        Arrastra y suelta
                                                        archivos aquí o
                                                    </p>
                                                    <label className="btn btn-primary btn-md">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            multiple
                                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
                                                        />
                                                        Seleccionar archivos
                                                    </label>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Action Buttons */}
                                        <section className="flex justify-end gap-4 pt-4 border-t">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="btn btn-outline btn-warning min-w-32"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-success min-w-32"
                                            >
                                                Registrar
                                            </button>
                                        </section>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevaActividadPage;
