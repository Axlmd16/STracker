import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import InputForm from "./Fields/ImputForm";
import ReactSwitch from "react-switch";

function RecomendacionForm({
  update,
  row,
  actions,
  formRef,
  modalRef,
  handleCloseModal,
}) {
  const [isActive, setIsActive] = useState(update ? row.estado === 1 : false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (update) {
      setValue("titulo", row.titulo);
      setValue("descripcion", row.descripcion);
      setValue("prioridad", row.prioridad);
      setIsActive(row.estado === 1);
    }
  }, [update, row, setValue]);

  const onSubmit = async (data) => {
    const promise = update
      ? actions.actualizarRecomendacion(row.id, data)
      : actions.crearRecomendacion(data);

    toast.promise(promise, {
      loading: <span className="loading loading-spinner"></span>,
      success: update ? (
        <b>Recomendacion actualizada correctamente</b>
      ) : (
        <b>Recomendacion registrada correctamente</b>
      ),
      error: (err) => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 409) {
            return <b>{data.detail}</b>;
          } else {
            return <b>Error al registrar la recomendacion</b>;
          }
        }
        return <b>Error inesperado al registrar la recomendacion</b>;
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

  const handleCancel = () => {
    clearErrors();
    handleCloseModal();
  };


  return (
    <div className="w-full px-4 py-2 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-6">
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="form-control">
            <label className="label" htmlFor="titulo">
              <span className="label-text">Título</span>
            </label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              className={`input input-bordered w-full ${errors.titulo ? "input-error" : ""}`}
              {...register("titulo", { required: "Este campo es obligatorio" })}
            />
            {errors.titulo && (
              <p className="text-error text-sm">{errors.titulo.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="form-control">
            <label className="label" htmlFor="descripcion">
              <span className="label-text">Descripción</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="5"
              className={`input input-bordered w-full ${errors.descripcion ? "input-error" : ""}`}
              {...register("descripcion", { required: "Este campo es obligatorio" })}
            />
            {errors.descripcion && (
              <p className="text-error text-sm">{errors.descripcion.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="form-control">
            <label className="label" htmlFor="prioridad">
              <span className="label-text">Prioridad</span>
            </label>
            <select
              id="prioridad"
              name="prioridad"
              className={`input input-bordered w-full ${errors.prioridad ? "input-error" : ""}`}
              {...register("prioridad", { required: "Este campo es obligatorio" })}
            >
              <option value={1}>1 - Baja</option>
              <option value={2}>2 - Media</option>
              <option value={3}>3 - Alta</option>
            </select>
            {errors.prioridad && (
              <p className="text-error text-sm">{errors.prioridad.message}</p>
            )}
          </div>
        </div>

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

export default RecomendacionForm;
