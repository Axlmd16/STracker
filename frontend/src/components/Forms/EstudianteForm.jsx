import { IdCard, Mail, Phone, UserIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImputForm from "./Fields/ImputForm";

function EstudianteForm({
    update,
    row,
    actions,
    formRef,
    modalRef,
    handleCloseModal,
    idAsignatura,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    //* Funcion para enviar los datos
    const onSubmit = async (data) => {
        const promise = update
            ? actions.updateEstudiante(row.id, { ...data, id: row.id })
            : actions.createStudentToSubject(idAsignatura, data);

        toast.promise(promise, {
            loading: <span className="loading loading-spinner"></span>,
            success: update ? (
                <b>Estudiante actualizado correctamente</b>
            ) : (
                <b>Estdiante registrado correctamente</b>
            ),
            error: (err) => {
                if (err.response) {
                    const { status, data } = err.response;
                    if (status === 409) {
                        return <b>{data.detail}</b>;
                    } else {
                        return <b>Error al registrar el estudiante</b>;
                    }
                }
                return <b>Error inesperado al registrar el estudiante</b>;
            },
        });

        try {
            await promise;

            if (modalRef && modalRef.current) {
                handleCloseModal();
            }
        } catch (error) {
            console.log(error);
        }
    };

    //* Funcion para setear los datos
    useEffect(() => {
        if (update) {
            setValue("nombres", row.nombres);
            setValue("apellidos", row.apellidos);
            setValue("email", row.email);
            setValue("telefono", row.telefono);
            setValue("cedula", row.cedula);
        }
    }, [update, row, setValue]);

    //* Limpiar errores al cancelar
    const handleCancel = () => {
        clearErrors();
        handleCloseModal();
    };

    return (
        <div className="w-full px-4 py-2 mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
                className="space-y-6"
            >
                <div className="grid md:grid-cols-2 md:gap-6">
                    <ImputForm
                        label="Nombres"
                        name="nombres"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={UserIcon}
                    />
                    <ImputForm
                        label="Apellidos"
                        name="apellidos"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={UserIcon}
                    />
                </div>
                <ImputForm
                    label="Dirección de correo electrónico"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    icon={Mail}
                />
                <br />
                <div className="grid md:grid-cols-2 md:gap-6 ">
                    <ImputForm
                        label="Telefono"
                        name="telefono"
                        type="tel"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={Phone}
                    />
                    <ImputForm
                        label="Numero de cedula"
                        name="cedula"
                        type="tel"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={IdCard}
                    />
                </div>

                <input
                    type="text"
                    value={"ESTUDIANTE"}
                    hidden={true}
                    {...register("rol", { required: true })}
                />

                <div className="flex justify-center mt-6 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-warning"
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                        {update ? "Actualizar" : "Registrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EstudianteForm;
