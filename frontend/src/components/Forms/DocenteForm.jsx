import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImputForm from "./Fields/ImputForm";
import { IdCard, Mail, Phone, UserIcon } from "lucide-react";

function DocenteForm({ update = false, data, actions, formRef, modalRef }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (update) {
                await actions.updateDocente(data);
                toast.success("Docente actualizado correctamente");
            } else {
                await actions.createDocente(data);
                toast.success("Docente registrado correctamente");
            }

            if (modalRef && modalRef.current) {
                modalRef.current.closeModal();
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 409) {
                    toast.error(data.detail);
                } else {
                    toast.error("Error al registrar el docente");
                }
            } else {
                toast.error("Error inesperado al registrar el docente");
            }

            console.log(error);
        }
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
                    value={"DOCENTE"}
                    hidden={true}
                    {...register("rol", { required: true })}
                />

                <div className="flex justify-center mt-6">
                    <button type="submit" className="btn btn-primary">
                        {update ? "Actualizar" : "Registrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DocenteForm;
