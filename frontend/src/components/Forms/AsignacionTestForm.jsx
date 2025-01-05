import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import InputForm from "./Fields/ImputForm";

function AsignacionTestForm({
  id,
  update,
  row,
  store,
  actions,
  formRef,
  modalRef,
  handleCloseModal,
}) {
  const [pending, setPending] = useState(false);
  const [tests, setTests] = useState([]);
  const [activities, setActivities] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showActivitySelect, setShowActivitySelect] = useState(false); 

  console.log(groups);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

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

  const fetchGruposByAsignature = useCallback(async () => {
    setPending(true);
    try {
      const data = await actions.getAllGroupsForAsignature(id);
      setGroups(data);
    } catch (error) {
      toast.error("Error al cargar los grupos");
    } finally {
      setPending(false);
    }
  }, [actions]);

  const fetchAcademicActivities = useCallback(async () => {
    setPending(true);
    try {
      const data = await actions.getAllActivitiesForAsignature(id);
      setActivities(data);
    } catch (error) {
      toast.error("Error al cargar las actividades académicas");
    } finally {
      setPending(false);
    }
  }, [actions]);

  useEffect(() => {
    fetchTestEstres();
    fetchAcademicActivities();
    fetchGruposByAsignature();
  }, [fetchTestEstres, fetchAcademicActivities, fetchGruposByAsignature]);

  useEffect(() => {
    fetchTestEstres();
  }, [fetchTestEstres]);

  const onSubmit = async (data) => {
    const randomTest = tests.length > 0 ? tests[Math.floor(Math.random() * tests.length)] : null;

    const formData = {
      ...data,
      docente_id: store.id_user_auth,
      asignatura_id: id,
      actividad_academica_id: 1,
      id_grupo: data.id_grupo, 
      test_id: randomTest ? randomTest.id : null,
    };
    console.log(`\n\n\n\n\nVALOR GRUPO: ${data.id_grupo}\n\n\n\n\n`)

    const promise = update
      ? actions.updateAsignacionTest(row.id, { ...formData, id: row.id })
      : actions.createAsignacionTest(formData);

    toast.promise(promise, {
      loading: <span className="loading loading-spinner"></span>,
      success: update ? (
        <b>Asignación de test de estrés actualizada correctamente</b>
      ) : (
        <b>Asignación de test de estrés registrada correctamente</b>
      ),
      error: (err) => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 409) {
            return <b>{data.detail}</b>;
          } else {
            return <b>Error al registrar la asignación del test de estrés</b>;
          }
        }
        return <b>Error inesperado al registrar la asignación del test de estrés</b>;
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
      setValue("test_id", row.test_id);
      setValue("fecha_asignacion", row.fecha_asignacion);
      setValue("fecha_limite", row.fecha_limite);
    }
  }, [update, row, setValue]);

  const handleCancel = () => {
    clearErrors();
    handleCloseModal();
  };

  const toggleActivitySelect = () => {
    setShowActivitySelect(!showActivitySelect);
  };

  return (
    <div className="w-full px-4 py-2 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-6">

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
          <label className="label" htmlFor="id_grupo">
            <span className="label-text">Seleccionar Grupo</span>
          </label>
          <select
            id="id_grupo"
            name="id_grupo"
            className={`input input-bordered w-full ${errors.id_grupo ? "input-error" : ""}`}
            {...register("id_grupo", { required: "Este campo es obligatorio" })}
          >
            <option value="">Seleccione un grupo</option>
            {groups.map((group) => (
              <option key={group.grupo_id} value={group.grupo_id}>
                {group.nombre_grupo}
              </option>
            ))}
          </select>
          {errors.id_grupo && (
            <p className="text-error text-sm">{errors.id_grupo.message}</p>
          )}
        </div>
        {/* <div className="grid md:grid-cols-1 md:gap-6">
          <label className="label" htmlFor="actividad_academica_id">
            <span className="label-text">Seleccionar Actividad Académica</span>
          </label>
          <select
            id="actividad_academica_id"
            name="actividad_academica_id"
            className={`input input-bordered w-full ${errors.actividad_academica_id ? "input-error" : ""}`}
            {...register("actividad_academica_id", { required: "Este campo es obligatorio" })}
          >
            <option value="">Seleccione una actividad académica</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.descripcion}
              </option>
            ))}
          </select>
          {errors.actividad_academica_id && (
            <p className="text-error text-sm">{errors.actividad_academica_id.message}</p>
          )}
        </div> */}


        <div className="grid md:grid-cols-1 md:gap-6">
          <label className="label" htmlFor="fecha_asignacion">
            <span className="label-text">Fecha de Asignación</span>
          </label>
          <input
            type="datetime-local"
            id="fecha_asignacion"
            name="fecha_asignacion"
            className={`input input-bordered w-full ${errors.fecha_asignacion ? "input-error" : ""}`}
            {...register("fecha_asignacion", { required: "Este campo es obligatorio" })}
          />
          {errors.fecha_asignacion && <p className="text-error text-sm">{errors.fecha_asignacion.message}</p>}
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <label className="label" htmlFor="fecha_limite">
            <span className="label-text">Fecha Límite</span>
          </label>
          <input
            type="datetime-local"
            id="fecha_limite"
            name="fecha_limite"
            className={`input input-bordered w-full ${errors.fecha_limite ? "input-error" : ""}`}
            {...register("fecha_limite", { required: "Este campo es obligatorio" })}
          />
          {errors.fecha_limite && <p className="text-error text-sm">{errors.fecha_limite.message}</p>}
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <label className="label" htmlFor="actividad_academica_id">
            <span className="label-text">¿Deseas vincular con una actividad académica?</span>
          </label>
          <button
            type="button"
            onClick={toggleActivitySelect}
            className="btn btn-info btn-custom-info"
          >
            {showActivitySelect ? "Ocultar actividad académica" : "Vincular actividad académica"}
          </button>
        </div>

        {showActivitySelect && (
          <div className="grid md:grid-cols-1 md:gap-6">
            <label className="label" htmlFor="actividad_academica_id">
              <span className="label-text">Seleccionar Actividad Académica</span>
            </label>
            <select
              id="actividad_academica_id"
              name="actividad_academica_id"
              className={`input input-bordered w-full ${errors.actividad_academica_id ? "input-error" : ""}`}
              {...register("actividad_academica_id", { required: "Este campo es obligatorio" })}
            >
              <option value="">Seleccione una actividad académica</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.descripcion}
                </option>
              ))}
            </select>
            {errors.actividad_academica_id && (
              <p className="text-error text-sm">{errors.actividad_academica_id.message}</p>
            )}
          </div>
        )}

        <div className="flex justify-center mt-6 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-warning btn-custom-warning"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-success btn-custom-success">
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AsignacionTestForm;
