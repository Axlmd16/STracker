import { HeartPulse, HomeIcon, Import, PlusCircle } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../../../components/Modals/Modal";
import ModalForm from "../../../components/Modals/ModalForm";
import ImportDataPage from "./ImportDataPage";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import DataTableRecomendaciones from "../../../components/Tables/DataTableRecomendaciones";
import RecomendacionForm from "../../../components/Forms/RecomendacionForm";

function PageRecomendaciones({ actions, store }) {
    const modalFormRef = useRef(null);
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const tableRef = useRef(null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [pending, setPending] = useState(false);

    const handleCrearRecomendacion = () => {
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
            const data = await actions.obtenerTodasRecomendaciones();
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

    //* Items
    const breadcrumbItems = [
        {
            to: "/home/administrador",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: "/home/administrador/recomendaciones",
            title: "Gestion de recomendaciones",
            icon: HeartPulse,
            active: true,
        },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white rounded-md shadow-md">
                <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-700">
                        Recomendaciones
                    </h1>
                    <div className="flex items-center mt-4">
                        <p className="text-sm text-gray-500 mt-2">
                            Crear, editar, eliminar y listar recomendaciones
                        </p>
                        <div className="ml-auto">
                            <button
                                className="wave-button"
                                onClick={handleCrearRecomendacion}
                            >
                                <span className="button-content">
                                    <PlusCircle size={20} className="icon" />
                                    <span className="button-text">ADD</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <DataTableRecomendaciones
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
                    {data
                        ? "Actualizar Recomendacion"
                        : "Crear Recomendacion"}
                </h2>
                <RecomendacionForm
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
                    Importar recomendacion
                    <ImportDataPage
                        actions={actions}
                        store={store}
                        modalRef={modalRef}
                        userRole={"RECOMENDACION"}
                    />
                </h2>
            </Modal>
        </div>
    );
}

export default PageRecomendaciones;
