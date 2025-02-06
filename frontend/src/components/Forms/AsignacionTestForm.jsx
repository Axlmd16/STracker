import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function AsignacionTestForm({
    id,
    update,
    row,
    actions,
    formRef,
    modalRef,
    handleCloseModal,
    cambioEstado
}) {
    const [pending, setPending] = useState(false);
    const [tests, setTests] = useState([]);
    const [showActivitySelect, setShowActivitySelect] = useState(false);
    const [estudiantes, setEstudiantes] = useState([]);
    const [grupos, setGrupos] = useState([]);

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
            tipo_asignacion: "toIndividual",
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

    const fetchGrupos = useCallback(async () => {
        try {
            const gruposData = await actions.getGroupsByAsignatura(id);
            setGrupos(gruposData);
        } catch (error) {
            // toast.error("Error al cargar los estudiantes o grupos");
        }
    }, [actions, id]);
    
    const fetchEstudiantes = useCallback(async () => {
        try {
            const estudiantesData = await actions.getStudentsBySubject(id);
            setEstudiantes(estudiantesData);
        } catch (error) {
            // toast.error("Error al cargar los estudiantes o grupos");
        }
    }, [actions, id]);

    useEffect(() => {
        fetchTestEstres();
        fetchGrupos();
        fetchEstudiantes();
    }, [fetchTestEstres, fetchEstudiantes, fetchGrupos]);

    const onSubmit = async (data) => {

        console.log("\n\n\n\nEsta es la data:", data, "\n\n\n\n");

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
            descripcion: data.descripcion,
            test_id: randomTest ? randomTest.id : null,
            asignatura_id: id,
        };

        // Aquí manejamos la asignación condicional de los IDs de estudiante y grupo
        const resultadoTest = {
            estudiante_asignatura_id:
                seleccion_tipo_asignacion === "toIndividual"
                    ? parseInt(data.estudiante_asignatura_id, 10) || null
                    : null,
            grupo_id:
                seleccion_tipo_asignacion === "toGrupos"
                    ? parseInt(data.grupo_id, 10) || null
                    : null,
        };

        if (seleccion_tipo_asignacion === "toClase") {
            resultadoTest.estudiante_asignatura_id = null;
            resultadoTest.grupo_id = null;
        }

        console.log(`\n\n\n\nAsignacion: ${JSON.stringify(asignacion)}\n\n\n\n`);
        console.log(`\n\n\n\nResultado Test: ${JSON.stringify(resultadoTest)}\n\n\n\n`);

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
            cambioEstado()
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
                row.resultado_test ? "group" : "toIndividual"
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
                                {estudiantes.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.nombres} {student.apellidos}
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
                                {grupos.map((group) => (
                                    <option key={group.grupo_id} value={group.grupo_id}>
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
                            No se puede cambiar el estudiante o el grupo en
                            modo edición.
                        </p>
                    )}
                </div>

                <div className="card bg-base-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Fechas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Fecha de Asignación
                                </span>
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                {...register("fecha_asignacion")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Fecha Limite</span>
                            </label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                {...register("fecha_limite")}
                            />
                        </div>
                    </div>
                </div>

                <div className="card bg-base-200 p-6">
                    <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Descripción de la asignación"
                            {...register("descripcion")}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        className="btn-custom btn-custom-warning w-1/2"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-custom btn-custom-success w-1/2"
                        disabled={pending}
                    >
                        {update ? "Actualizar" : "Registrar"} Asignación
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AsignacionTestForm;
