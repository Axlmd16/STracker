import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImputForm from "./Fields/ImputForm";
import LargeStudentSelectorModal from "./SelectStudentsModal";

function GroupForm({ update, row, actions, formRef, handleCloseModal, idAsignatura }) {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showError, setShowError] = useState(false); 
    const modalRef = useRef(null);

    useEffect(() => {
        if (update) {
            setValue("nombre", row.nombre);
            setValue("nro_estudiantes", row.nro_estudiantes);
            if (row.estudiantes) {
                setSelectedStudents(row.estudiantes);
            }
        }
    }, [update, row, setValue]);

    useEffect(() => {
        setValue("nro_estudiantes", selectedStudents.length);
    }, [selectedStudents, setValue]);

    const onSubmit = async (data) => {
        if (selectedStudents.length < 2) {
            setShowError(true); 
            setTimeout(() => {
                setShowError(false); 
            }, 5000);
            return; 
        }

        const payload = {
            ...data,
            estudiantes: selectedStudents.map((s) => s.id)
        };

        try {
            let grupoResponse;

            grupoResponse = await actions.createGroup(payload);
            const id_grupo = grupoResponse.data.id;
            console.log(`INFO: ${id_grupo}\n\n\n\n`);
            for (let studentId of selectedStudents.map((s) => s.id)) {
                console.log(`ID: ${studentId}, idGRUPO: ${id_grupo}`);
                await actions.addStudentToGroup(studentId, id_grupo);
            }

            toast.success(update ? 'Grupo actualizado correctamente' : 'Grupo registrado correctamente');
            handleCloseModal();
        } catch (error) {
            console.error(error);
            toast.error('Error al registrar el grupo');
        }
    };

    return (
        <div className="w-full px-4 py-2 mt-10">
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-6">
                <ImputForm label="Nombre del grupo" name="nombre" register={register} errors={errors} clearErrors={clearErrors} />
                <ImputForm label="Número de estudiantes" name="nro_estudiantes" type="number" register={register} errors={errors} clearErrors={clearErrors} disabled />

                {/* Modal de selección de estudiantes */}
                <div className="text-center">
                    <LargeStudentSelectorModal
                        ref={modalRef}
                        actions={actions}
                        idAsignatura={idAsignatura}
                        setSelectedStudents={setSelectedStudents}
                        selectedStudents={selectedStudents}
                    />
                </div>

                {/* Lista de estudiantes seleccionados */}
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-semibold">Estudiantes seleccionados:</h3>
                    {selectedStudents.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {selectedStudents.map((student) => (
                                <li key={student.id} className="flex justify-between">
                                    {student.nombres} {student.apellidos}
                                    <button type="button" className="text-red-500 hover:text-red-700"
                                        onClick={() => setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id))}>
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500">No hay estudiantes seleccionados.</p>}
                </div>

                {/* Mensaje de error si hay menos de 2 estudiantes */}
                {showError && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mt-4 text-center">
                        Se requiere mínimo 2 Estudiantes.
                    </div>
                )}

                <div className="flex justify-center mt-6 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <button type="button" onClick={handleCloseModal} className="btn btn-warning">Cancelar</button>
                    <button type="submit" className="btn btn-success">{update ? "Actualizar" : "Registrar"}</button>
                </div>
            </form>
        </div>
    );
}

export default GroupForm;
