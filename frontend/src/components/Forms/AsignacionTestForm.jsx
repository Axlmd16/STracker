import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const dataEstudiantes = [
    { id: 1, nombres: "Juan Pérez", estudiante_asignatura_id: 1 },
    { id: 2, nombres: "María García", estudiante_asignatura_id: 2 },
    { id: 3, nombres: "Carlos López", estudiante_asignatura_id: 3 },
];

const dataGrupos = [
    { id: 1, nombre: "Grupo A" },
    { id: 2, nombre: "Grupo B" },
];

function AsignacionTestForm({
    id,
    update,
    row,
    actions,
    formRef,
    modalRef,
    handleCloseModal,
}) {
    const [pending, setPending] = useState(false);
    const [tests, setTests] = useState([]);
    const [showActivitySelect, setShowActivitySelect] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        clearErrors,
        watch,
    } = useForm({
        defaultValues: {
            tipo_asignacion: "individual",
            estudiante_asignatura_id: null,
            grupo_id: null,
        },
    });

    const seleccion_tipo_asignacion = watch("tipo_asignacion");

    const fetchTestEstres = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAllTestEstres();
            setTests(data);
        } catch (error) {
            toast.error("Error al cargar los test de estres");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchTestEstres();
    }, [fetchTestEstres]);

    const onSubmit = async (data) => {
        if (update && (data.estudiante_asignatura_id || data.grupo_id)) {
            toast.error(
                "No se pueden cambiar el estudiante o el grupo en modo edición. Borre la asignación y cree una nueva."
            );
            return;
        }

        const randomTest =
            tests.length > 0
                ? tests[Math.floor(Math.random() * tests.length)]
                : null;

        const asignacion = {
            fecha_asignacion: data.fecha_asignacion,
            fecha_limite: data.fecha_limite,
            test_id: randomTest ? randomTest.id : null,
            asignatura_id: id,
        };

        const resultadoTest = {
            estudiante_asignatura_id:
                seleccion_tipo_asignacion === "toIndividual"
                    ? parseInt(data.estudiante_asignatura_id, 10) || null // Asegurar que sea un número
                    : null,
            grupo_id:
                seleccion_tipo_asignacion === "toGrupos"
                    ? parseInt(data.grupo_id, 10) || null
                    : null,
        };

        const formData = {
            asignacion,
            resultadoTest,
        };
        console.log("Data a enviar:", formData);

        try {
            const promise = update
                ? actions.updateAsignacionTest(row.id, {
                      ...formData,
                      id: row.id,
                  })
                : actions.createAsignacionTest(formData);

            await toast.promise(promise, {
                loading: "Procesando...",
                success: update
                    ? "Asignación actualizada correctamente"
                    : "Asignación registrada correctamente",
                error: "Error al procesar la asignación",
            });

            handleCloseModal?.();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        clearErrors();
        handleCloseModal?.();
    };

    useEffect(() => {
        if (update && row) {
            setValue(
                "tipo_asignacion",
                row.resultado_test ? "group" : "individual"
            );
            setValue(
                "estudiante_asignatura_id",
                row.resultado_test?.estudiante_asignatura_id
            );
            setValue("grupo_id", row.resultado_test?.grupo_id);
            setValue("descripcion", row.descripcion);
            setValue("fecha_asignacion", row.fecha_asignacion);
            setValue("fecha_limite", row.fecha_limite);
        }
    }, [update, row, setValue]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
            <form
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
                className="space-y-8"
            >
                {/* Assignment Type Selection */}
                <div className="card bg-base-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Tipo de Asignación
                    </h2>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                className="radio radio-primary"
                                value="toIndividual"
                                {...register("tipo_asignacion")}
                                disabled={update}
                            />
                            <span className="label-text">Individual</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                className="radio radio-primary"
                                value="toGrupos"
                                {...register("tipo_asignacion")}
                                disabled={update}
                            />
                            <span className="label-text">Por Grupos</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                className="radio radio-primary"
                                value="toClase"
                                {...register("tipo_asignacion")}
                                disabled={update}
                            />
                            <span className="label-text">Por Clase</span>
                        </label>
                    </div>
                    {update && (
                        <p className="text-sm text-warning mt-2">
                            No se puede cambiar el tipo de asignación en modo
                            edición.
                        </p>
                    )}
                </div>

                {/* Student/Group Selection */}
                <div className="card bg-base-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Selección de Estudiantes
                    </h2>
                    {seleccion_tipo_asignacion === "toIndividual" && (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Seleccionar Estudiante
                                </span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                {...register("estudiante_asignatura_id", {
                                    required: !update
                                        ? "Debe seleccionar un estudiante"
                                        : false,
                                })}
                                disabled={update}
                            >
                                <option value="">
                                    Seleccione un estudiante
                                </option>
                                {dataEstudiantes.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.nombres}
                                    </option>
                                ))}
                            </select>
                            {errors.estudiante_asignatura_id && (
                                <p className="text-error text-sm mt-1">
                                    {errors.estudiante_asignatura_id.message}
                                </p>
                            )}
                        </div>
                    )}

                    {seleccion_tipo_asignacion === "toGrupos" && (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Seleccionar Grupo
                                </span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                {...register("grupo_id", {
                                    required: !update
                                        ? "Debe seleccionar un grupo"
                                        : false,
                                })}
                                disabled={update}
                            >
                                <option value="">Seleccione un grupo</option>
                                {dataGrupos.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.grupo_id && (
                                <p className="text-error text-sm mt-1">
                                    {errors.grupo_id.message}
                                </p>
                            )}
                        </div>
                    )}

                    {update && (
                        <p className="text-sm text-warning mt-2">
                            No se puede cambiar el estudiante o el grupo en modo
                            edición. Para realizar estos cambios, borre la
                            asignación y cree una nueva.
                        </p>
                    )}

                    {seleccion_tipo_asignacion === "toClase" && (
                        <div className="alert alert-info">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="stroke-current shrink-0 w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                La asignación se aplicará a todos los
                                estudiantes de la clase
                            </span>
                        </div>
                    )}
                </div>

                {/* Description Field */}
                <div className="card bg-base-200 p-6">
                    <div className="form-control">
                        <label className="label" htmlFor="descripcion">
                            <span className="label-text">Descripción</span>
                        </label>
                        <textarea
                            id="descripcion"
                            className={`textarea textarea-bordered h-24 ${
                                errors.descripcion ? "textarea-error" : ""
                            }`}
                            {...register("descripcion", {
                                required: "La descripción es obligatoria",
                            })}
                        />
                        {errors.descripcion && (
                            <p className="text-error text-sm mt-1">
                                {errors.descripcion.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Dates */}
                <div className="card bg-base-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Fechas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label" htmlFor="fecha_asignacion">
                                <span className="label-text">
                                    Fecha de Asignación
                                </span>
                            </label>
                            <input
                                type="datetime-local"
                                className={`input input-bordered ${
                                    errors.fecha_asignacion ? "input-error" : ""
                                }`}
                                {...register("fecha_asignacion", {
                                    required:
                                        "La fecha de asignación es obligatoria",
                                })}
                            />
                            {errors.fecha_asignacion && (
                                <p className="text-error text-sm mt-1">
                                    {errors.fecha_asignacion.message}
                                </p>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="fecha_limite">
                                <span className="label-text">Fecha Límite</span>
                            </label>
                            <input
                                type="datetime-local"
                                className={`input input-bordered ${
                                    errors.fecha_limite ? "input-error" : ""
                                }`}
                                {...register("fecha_limite", {
                                    required: "La fecha límite es obligatoria",
                                })}
                            />
                            {errors.fecha_limite && (
                                <p className="text-error text-sm mt-1">
                                    {errors.fecha_limite.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-ghost"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={pending}
                    >
                        {pending ? (
                            <span className="loading loading-spinner"></span>
                        ) : update ? (
                            "Actualizar"
                        ) : (
                            "Registrar"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AsignacionTestForm;
