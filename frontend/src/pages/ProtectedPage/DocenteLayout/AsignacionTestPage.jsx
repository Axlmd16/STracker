import {
    ClipboardList,
    GraduationCap,
    HomeIcon,
    LibraryBig,
    PlusCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import AsignacionTestForm from "../../../components/Forms/AsignacionTestForm";
import ModalForm from "../../../components/Modals/ModalForm";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";
import AsignacionTestCards from "../../../util/AsignacionTestCards";
import ModalConfirmacion from "./ModalConfirmacion";
import { toast } from "react-hot-toast";

function AsignacionTestPage({ actions, store }) {
    const { id } = useParams();
    const modalFormRef = useRef(null);
    const formRef = useRef(null);
    const [data, setData] = useState(null);
    const [update, setUpdate] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [pending, setPending] = useState(false);
    const [actualizarEstado, setActualizarEstado] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const handleCreateAsignacionTest = () => {
        modalFormRef.current.openModal();
    };

    const handleCloseModal = async (triggerReset = true) => {
        setData(null);
        setUpdate(false);
        if (triggerReset && modalFormRef.current) {
            modalFormRef.current.closeModal();
        }
    };

    const cambioEstado = () => {
        setActualizarEstado(!actualizarEstado);
        fetchAsignacionTest();
    };

    const handleUpdate = (row) => {
        setData(row);
        setUpdate(true);
        modalFormRef.current.openModal();
    };

    const handleDelete = (id) => {
        setIdToDelete(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await actions.deleteAsignacionTest(idToDelete);
            fetchAsignacionTest();
            setModalOpen(false);
            toast.success("Asignación eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar la asignación:", error);
            setModalOpen(false);
        }
    };

    const handleCloseModalConfirmation = () => {
        setModalOpen(false);
    };

    const fetchAsignacionTest = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getAllAsignacionTestForAsignature(id);
            setDataTable(data);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setPending(false);
        }
    }, [actions, id]);

    useEffect(() => {
        fetchAsignacionTest();
    }, [fetchAsignacionTest]);

    const breadcrumbItems = [
        {
            to: "/home/docente",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: `/home/docente`,
            title: "Asignaturas",
            icon: LibraryBig,
        },
        {
            to: `/home/docente/asignatura/${id}`,
            title: "Base de datos",
            icon: GraduationCap,
        },
        {
            to: `/home/docente/asignatura/${id}/asignaciones`,
            title: "Gestion de asignaciones",
            icon: ClipboardList,
            active: true,
        },
    ];

    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                <div className="flex flex-col h-full">
                    <div className="px-6 py-3 flex items-center space-x-2 text-sm text-white border-b">
                        <BreadCrumbs items={breadcrumbItems} />
                    </div>
                    <div className="relative w-full h-40 p-6 rounded-md shadow-md bg-white">
                        {/* <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                // backgroundImage: `url('/src/util/imgs/Background-test.png')`,
                                filter: "opacity(0.2)",
                                zIndex: -1,
                            }}
                        ></div> */}
                        <h1 className="text-3xl font-semibold text-black">
                            Asignación de Test
                        </h1>
                        <div className="flex items-center mt-4">
                            <p className="text-sm text-black mt-2">
                                Crear, editar, eliminar y listar asignaciones de
                                tests
                            </p>
                            <div className="ml-auto">
                                <button
                                    className="wave-button"
                                    onClick={handleCreateAsignacionTest}
                                >
                                    <span className="button-content">
                                        <PlusCircle
                                            size={20}
                                            className="icon"
                                        />
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
                            {data
                                ? "Actualizar asignación de test"
                                : "Crear asignación de test"}
                        </h2>
                        <AsignacionTestForm
                            id={id}
                            actions={actions}
                            formRef={formRef}
                            modalRef={modalFormRef}
                            update={update}
                            store={store}
                            row={data}
                            handleCloseModal={handleCloseModal}
                            cambioEstado={cambioEstado}
                        />
                    </ModalForm>

                    <ModalConfirmacion
                        isOpen={modalOpen}
                        onClose={handleCloseModalConfirmation}
                        onConfirm={handleConfirmDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default AsignacionTestPage;
