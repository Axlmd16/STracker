import { HomeIcon, Import, UserRoundPlus, Users2Icon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DocenteForm from "../../../components/Forms/DocenteForm";
import Modal from "../../../components/Modals/Modal";
import ModalForm from "../../../components/Modals/ModalForm";
import DataTableUser from "../../../components/Tables/DataTableUser";
import ImportDataPage from "./ImportDataPage";
import { toast } from "react-hot-toast";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";

function PageDocenteCrud({ actions, store }) {
    //* Referencias y estados
    const modalFormRef = useRef(null);
    const modalRef = useRef(null);
    const formRef = useRef(null);

    const tableRef = useRef(null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [pending, setPending] = useState(false);

    //* Funcion abrir modal para crear
    const handleCreateDocente = () => {
        modalFormRef.current.openModal();
    };

    //* Funcion abrir modal para importar datos
    const handleImportDocente = () => {
        modalRef.current.openModal();
    };

    //* Funcion para cerrar el modal
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

    //* Función para manejar la actualización
    const handleUpdate = (row) => {
        setData(row);
        setUpdate(true);
        modalFormRef.current.openModal();
    };

    //* Funcion para obtener los datos
    const fetchDocentes = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getDocentes();
            setDataTable(data);
        } catch (error) {
            toast.error("Error al cargar los datos");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchDocentes();
    }, [fetchDocentes]);

    //* Items
    const breadcrumbItems = [
        {
            to: "/home/administrador",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: "/home/administrador/docentes",
            title: "Gestion de docentes",
            icon: Users2Icon,
            active: true,
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Encabezado */}
            <div className="bg-white rounded-md shadow-md">
                <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
                <div className="p-6">
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
            </div>

            {/* Contenedor de la tabla */}
            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <DataTableUser
                    ref={tableRef}
                    actions={actions}
                    handleUpdate={handleUpdate}
                    fetchData={fetchDocentes}
                    data={dataTable}
                    pending={pending}
                    searchKeys={["nombres", "apellidos", "cedula"]}
                />
            </div>

            {/* Modal para crear y actualizar */}
            <ModalForm
                ref={modalFormRef}
                formRef={formRef}
                handleCloseModal={handleCloseModal}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {data ? "Actualizar docente" : "Crear docente"}
                </h2>
                <DocenteForm
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalFormRef}
                    update={update}
                    row={data}
                    handleCloseModal={handleCloseModal}
                />
            </ModalForm>

            {/* Modal para importar */}
            <Modal ref={modalRef}>
                <h2 className="text-xl font-semibold mb-4">
                    Importar docentes
                    <ImportDataPage
                        actions={actions}
                        store={store}
                        modalRef={modalRef}
                        userRole={"DOCENTE"}
                    />
                </h2>
            </Modal>
        </div>
    );
}

export default PageDocenteCrud;
