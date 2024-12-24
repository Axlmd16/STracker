import React, { useRef, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Navigation/Sidebar";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import ModalForm from "../../../components/Modals/ModalForm";
import Modal from "../../../components/Modals/Modal";
import { Import, UserRoundPlus } from "lucide-react";
import DocenteForm from "../../../components/Forms/DocenteForm";
import ImportDataPage from "../AdminLayout/ImportDataPage";
import DataTableUser from "../../../components/Tables/DataTableUser";
import { toast } from "react-hot-toast";
import EstudianteForm from "../../../components/Forms/EstudianteForm";

function StudentsSubjectPage({ actions, store }) {
    const { id } = useParams();
    //* Referencias y estados
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
    const fetchData = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getStudentsBySubject(id);
            setDataTable(data);
        } catch (error) {
            toast.error("Error al cargar los datos");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                <div className="flex flex-col h-full">
                    {/* Encabezado */}
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-700">
                            Estudiantes
                        </h1>
                        <div className="flex items-center mt-4">
                            <p className="text-sm text-gray-500 mt-2">
                                Crear, editar, eliminar y listar estudiantes
                            </p>
                            <div className="ml-auto">
                                <button
                                    className="btn btn-primary mt-4 btn-circle"
                                    onClick={handleCreateDocente}
                                >
                                    <UserRoundPlus size={20} />
                                </button>
                                {/* <button
                                    className="btn btn-circle ml-3 bg-info"
                                    onClick={handleImportDocente}
                                >
                                    <Import size={20} />
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* Contenedor de la tabla */}
                    <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                        <DataTableUser
                            ref={tableRef}
                            actions={actions}
                            handleUpdate={handleUpdate}
                            fetchData={fetchData}
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
                            {data
                                ? "Actualizar estudiante"
                                : "Agregar estudiante"}
                        </h2>
                        <EstudianteForm
                            actions={actions}
                            formRef={formRef}
                            modalRef={modalFormRef}
                            update={update}
                            row={data}
                            handleCloseModal={handleCloseModal}
                            idAsignatura={id}
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
                                userRole={"ESTUDIANTE"}
                            />
                        </h2>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default StudentsSubjectPage;
