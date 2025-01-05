import { useCallback, useEffect, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";
import ModalForm from "../../../components/Modals/ModalForm";
import AsignacionTestForm from "../../../components/Forms/AsignacionTestForm";
import AsignacionTestCards from "../../../util/AsignacionTestCards";
import { useParams } from "react-router-dom";

function AsignacionTestPage({ actions, store }) {
    const { id } = useParams()
    const modalFormRef = useRef(null);
    const formRef = useRef(null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [pending, setPending] = useState(false);

    const handleCreateAsignacionTest = () => {
        modalFormRef.current.openModal();
    };

    const handleCloseModal = async (triggerReset = true) => {
        setData(null);
        setUpdate(false);
        if (triggerReset && modalFormRef.current) {
            modalFormRef.current.closeModal();
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

    const handleDelete = async (id) => {
        try {
            await actions.deleteAsignacionTest(id);
            fetchAsignacionTest();
        } catch (error) {
            console.error("Error al eliminar la asignación:", error);
        }
    };

    const fetchAsignacionTest = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAllAsignacionTest();
            setDataTable(data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchAsignacionTest();
    }, [fetchAsignacionTest]);

    return (
        <div className="flex flex-col h-full">
            <div className="relative w-full h-40 p-6 rounded-md shadow-md">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/src/util/imgs/Background-test.png')`,
                        filter: 'opacity(0.2)',
                        zIndex: -1,
                    }}
                ></div>
                <h1 className="text-3xl font-bold text-sky-700">
                    Asignación de Test
                </h1>
                <div className="flex items-center mt-4">
                    <p className="text-sm font-semibold text-sky-600 mt-2">
                        Crear, editar, eliminar y listar asignaciones de tests
                    </p>
                    <div className="ml-auto">
                        <button className="wave-button" onClick={handleCreateAsignacionTest}>
                            <span className="button-content">
                                <PlusCircle size={20} className="icon" />
                                <span className="button-text">ADD</span>
                            </span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md">
                <AsignacionTestCards
                    data={dataTable}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            </div>

            <ModalForm
                ref={modalFormRef}
                formRef={formRef}
                handleCloseModal={handleCloseModal}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {data ? "Actualizar asignación de test" : "Crear asignación de test"}
                </h2>
                <AsignacionTestForm
                    id = {id}
                    actions={actions}
                    formRef={formRef}
                    modalRef={modalFormRef}
                    update={update}
                    store={store}
                    row={data}
                    handleCloseModal={handleCloseModal}
                />
            </ModalForm>
        </div>

    );
}

export default AsignacionTestPage;
