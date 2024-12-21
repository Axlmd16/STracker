import React, { useRef } from "react";
import TableDocente from "../../../components/Tables/TableDocente";
import ModalForm from "../../../components/Modals/ModalForm";
import DocenteForm from "../../../components/Forms/DocenteForm";

function PageDocenteCrud({ actions, store }) {
    const modalRef = useRef(null);
    const formRef = useRef(null);

    const handleCreateDocente = () => {
        modalRef.current.openModal();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Encabezado */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Docentes
                </h1>
                <div className="flex items-center mt-4">
                    <p className="text-sm text-gray-500 mt-2">
                        Crear, editar, eliminar y listar docentes
                    </p>
                    <div className="ml-auto">
                        <button
                            className="btn btn-primary mt-4"
                            onClick={handleCreateDocente}
                        >
                            Crear docente
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenedor de la tabla */}
            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <TableDocente actions={actions} store={store} />
            </div>

            {/* Modal para crear docente */}
            <ModalForm ref={modalRef} formRef={formRef}>
                <h2 className="text-xl font-semibold mb-4">Crear Docente</h2>
                <DocenteForm
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalRef}
                />
            </ModalForm>
        </div>
    );
}

export default PageDocenteCrud;
