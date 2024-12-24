import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import InputForm from "./Fields/ImputForm";
import ReactSwitch from "react-switch";

function TestEstresForm({
  update,
  row,
  actions,
  formRef,
  modalRef,
  handleCloseModal,
}) {
  const [urlPreview, setUrlPreview] = useState(null);
  const [urlError, setUrlError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [iconColor, setIconColor] = useState("text-gray-500");
  const [isActive, setIsActive] = useState(update ? row.estado === 1 : false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm();

  const url = watch("url");

  useEffect(() => {
    if (url) {
      const isGoogleForms = /https:\/\/docs\.google\.com\/forms/.test(url);

      if (isGoogleForms) {
        setUrlPreview(url);
        setUrlError(null);
        setIconColor("text-blue-500");
      } else {
        setUrlPreview(null);
        setUrlError("La URL no es válida. Debe ser un enlace de Google Forms.");
        setIconColor("text-red-500");
      }
    }
  }, [url]);

  const onSubmit = async (data) => {
    const promise = update
      ? actions.updateTestEstres(row.id, { ...data, id: row.id, estado: isActive ? 1 : 0 })
      : actions.createTestEstres({ ...data, estado: isActive ? 1 : 0 });

    toast.promise(promise, {
      loading: <span className="loading loading-spinner"></span>,
      success: update ? (
        <b>Test de estrés actualizado correctamente</b>
      ) : (
        <b>Test de estrés registrado correctamente</b>
      ),
      error: (err) => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 409) {
            return <b>{data.detail}</b>;
          } else {
            return <b>Error al registrar el test de estrés</b>;
          }
        }
        return <b>Error inesperado al registrar el test de estrés</b>;
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

  useEffect(() => {
    if (update) {
      setValue("url", row.url);
      setValue("descripcion", row.descripcion);
      setIsActive(row.estado === 1);
    }
  }, [update, row, setValue]);

  const handleCancel = () => {
    clearErrors();
    handleCloseModal();
  };

  const openPreviewModal = () => {
    if (!urlError) {
      setShowModal(true);
    }
  };

  const closePreviewModal = () => {
    setShowModal(false);
  };

  const handleToggle = (checked) => {
    setIsActive(checked);
  };

  return (
    <div className="w-full px-4 py-2 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-6">
        <div className="grid md:grid-cols-1 md:gap-6">
          <InputForm
            label="URL"
            name="url"
            type="text"
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            icon="Link"
          />
        </div>

        <div className="flex justify-center items-center space-x-2">
          <button
            type="button"
            onClick={openPreviewModal}
            className={`btn ${iconColor} flex items-center space-x-2`}
            disabled={urlError}
          >
            Ver Vista Previa
          </button>
        </div>

        {urlError && (
          <p className="text-red-500 text-sm mt-2">{urlError}</p>
        )}

        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closePreviewModal}
          >
            <div
              className="bg-white p-6 rounded-md w-[90%] md:w-[80%] lg:w-[70%] h-[90%] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-red-500"
                onClick={closePreviewModal}
              >
                X
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Vista previa del formulario
              </h3>
              <div className="h-[80%]">
                <iframe
                  src={urlPreview}
                  width="100%"
                  height="100%"
                  title="Vista previa del formulario"
                  className="border rounded-md"
                ></iframe>
              </div>
            </div>
          </div>
        )}

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

        {!showModal && (
          <div className="flex justify-center items-center space-x-2">
            <span>Estado: {isActive ? "Activo" : "Inactivo"}</span>
            <ReactSwitch
              checked={isActive}
              onChange={handleToggle}
              offColor="#888"
              onColor="#4CAF50"
              onHandleColor="#fff"
              offHandleColor="#fff"
              height={30}
              width={60}
            />
          </div>
        )}

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

export default TestEstresForm;
