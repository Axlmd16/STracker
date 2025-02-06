import { Import, PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TestEstresForm from "../../../components/Forms/TestEstresForm";
import Modal from "../../../components/Modals/Modal";
import ModalForm from "../../../components/Modals/ModalForm";
import ImportDataPage from "./ImportDataPage";
import DataTableTestEstres from "../../../components/Tables/DataTableTestEstres";

function PageTestEstresCrud({ actions, store }) {
    const modalFormRef = useRef(null);
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const tableRef = useRef(null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [pending, setPending] = useState(false);

    const handleCreateTestEstres = () => {
        modalFormRef.current.openModal();
    };

    const handleCloseModal = async (triggerReset = true) => {
        setData(null);
        setUpdate(false);

        if (tableRef.current) {
            await tableRef.current.reload();
        }

        if (triggerReset) {
            if (modalFormRef.current) {
                modalFormRef.current.closeModal();
            }
        }
    };

    const handleUpdate = (row) => {
        setData(row);
        setUpdate(true);
        modalFormRef.current.openModal();
    };

    const fetchTestEstres = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAllTestEstres();
            setDataTable(data);
        } catch (error) {
            toast.error("Error al cargar los datos");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchTestEstres();
    }, [fetchTestEstres]);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Test de Estrés
                </h1>
                <div className="flex items-center mt-4">
                    <p className="text-sm text-gray-500 mt-2">
                        Crear, editar, eliminar y listar test de estrés
                    </p>
                    {/* <div className="ml-auto">
                        <button
                            className="btn btn-primary mt-4 btn-circle"
                            onClick={handleCreateTestEstres}
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div> */}
                     <div className="ml-auto">
                        <div className="ml-auto">
                            <button className="btn-form" onClick={handleCreateTestEstres}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <PlusCircle size={20} className="btn-icon" />
                                <span className="btn-text">Agregar</span>
                            </button>
                        </div>
                        </div>
                    </div>
            </div>

            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <DataTableTestEstres
                    ref={tableRef}
                    actions={actions}
                    handleUpdate={handleUpdate}
                    fetchData={fetchTestEstres}
                    data={dataTable}
                    pending={pending}
                    searchKeys={["url", "descripcion"]}
                />
            </div>

            <ModalForm
                ref={modalFormRef}
                formRef={formRef}
                handleCloseModal={handleCloseModal}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {data ? "Actualizar test de estrés" : "Crear test de estrés"}
                </h2>
                <TestEstresForm
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalFormRef}
                    update={update}
                    row={data}
                    handleCloseModal={handleCloseModal}
                />
            </ModalForm>

            <Modal ref={modalRef}>
                <h2 className="text-xl font-semibold mb-4">
                    Importar tests de estrés
                    <ImportDataPage
                        actions={actions}
                        store={store}
                        modalRef={modalRef}
                        userRole={"TEST_ESTRES"}
                    />
                </h2>
            </Modal>
        </div>
    );
}

export default PageTestEstresCrud;
