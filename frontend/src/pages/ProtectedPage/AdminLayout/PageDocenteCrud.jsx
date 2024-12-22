import React, { useRef } from "react";
import TableDocente from "../../../components/Tables/TableDocente";
import ModalForm from "../../../components/Modals/ModalForm";
import DocenteForm from "../../../components/Forms/DocenteForm";
import { Import, UserRoundPlus } from "lucide-react";
import Modal from "../../../components/Modals/Modal";
import ImportDocentePage from "./ImportDataPage";

function PageDocenteCrud({ actions, store }) {
    const modalFormRef = useRef(null);
    const modalRef = useRef(null);
    const formRef = useRef(null);

    const handleCreateDocente = () => {
        modalFormRef.current.openModal();
    };

    const handleImportDocente = () => {
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
                            className="btn btn-primary mt-4 btn-circle"
                            onClick={handleCreateDocente}
                        >
                            <UserRoundPlus size={20} />
                        </button>
                        <button
                            className="btn btn-circle ml-3 bg-info"
                            onClick={handleImportDocente}
                        >
                            <Import size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenedor de la tabla */}
            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <TableDocente actions={actions} store={store} />
            </div>

            {/* Modal para crear docente */}
            <ModalForm ref={modalFormRef} formRef={formRef}>
                <h2 className="text-xl font-semibold mb-4">Crear Docente</h2>
                <DocenteForm
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalFormRef}
                />
            </ModalForm>

            <Modal ref={modalRef}>
                <h2 className="text-xl font-semibold mb-4">
                    Importar docentes
                    <ImportDocentePage
                        actions={actions}
                        store={store}
                        modalRef={modalRef}
                    />
                </h2>
            </Modal>
        </div>
    );
}

export default PageDocenteCrud;
