import {
    BookOpen,
    CalendarArrowDown,
    CalendarArrowUp,
    CaseUpper,
    Hourglass,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImputForm from "./Fields/ImputForm";
import SelectForm from "./Fields/SelectForm";

function AsignaturaForm({
    actions,
    formRef,
    modalRef,
    handleCloseModal,
    store,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    //* Funcion para enviar los datos
    const onSubmit = async (data) => {
        const promise = actions.createAsignatura(data);
        toast.promise(promise, {
            loading: <span className="loading loading-spinner"></span>,
            success: <b>Asignatura registrada correctamente</b>,

            error: (err) => {
                if (err.response) {
                    const { status, data } = err.response;
                    if (status === 409) {
                        return <b>{data.detail}</b>;
                    } else {
                        return <b>Error al registrar la asignatura</b>;
                    }
                }
                return <b>Error inesperado al registrar la asignatura</b>;
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

    //* Limpiar errores al cancelar
    const handleCancel = () => {
        clearErrors();
        handleCloseModal();
    };

    const options = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
    ];

    return (
        <div className="w-full px-4 py-2 mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
                className="space-y-6"
            >
                <ImputForm
                    label="Nombre"
                    name="nombre"
                    type="text"
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    icon={BookOpen}
                />
                <div className="grid md:grid-cols-2 md:gap-6">
                    <ImputForm
                        label="Nro de horas"
                        name="nro_horas"
                        type="number"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={Hourglass}
                    />
                    <SelectForm
                        label="Paralelo"
                        name="paralelo"
                        register={register}
                        options={options}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={CaseUpper}
                    />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 ">
                    <ImputForm
                        label="Fecha de inicio"
                        name="fecha_inicio"
                        type="date"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={CalendarArrowUp}
                    />
                    <ImputForm
                        label="Fecha de fin"
                        name="fecha_fin"
                        type="date"
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        icon={CalendarArrowDown}
                    />
                </div>

                <input
                    type="number"
                    value={store.id_user_auth}
                    hidden={true}
                    {...register("docente_id", { required: true })}
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
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AsignaturaForm;
