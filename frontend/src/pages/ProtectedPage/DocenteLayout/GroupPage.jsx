import {
  ClipboardList,
  GraduationCap,
  HomeIcon,
  LibraryBig,
  PlusCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ModalForm from "../../../components/Modals/ModalForm";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import GroupForm from "../../../components/Forms/GroupForm";
import GroupCards from "../../../util/GroupCards";
import Sidebar from "../../../components/Navigation/Sidebar";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";

function GroupPage({ actions, store }) {
  const { id } = useParams();
  const modalFormRef = useRef(null);
  const formRef = useRef(null);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [pending, setPending] = useState(false);
  const idAsignatura = +id;

  const handleCreateGroup = () => {
    modalFormRef.current.openModal();
  };

  const handleCloseModal = async (triggerReset = true) => {
    setData(null);
    setUpdate(false);
    if (triggerReset && modalFormRef.current) {
      modalFormRef.current.closeModal();
    }
    fetchGroups(); 
  };

  const handleUpdate = (row) => {
    setData(row);
    setUpdate(true);
    modalFormRef.current.openModal();
  };

  const handleDelete = async (id) => {
    try {
      await actions.deleteGroup(id);
      fetchGroups(); 
    } catch (error) {
      console.error("Error al eliminar el grupo:", error);
    }
  };

  const fetchGroups = useCallback(async () => {
    setPending(true);
    try {
      const data = await actions.getAllGroupsForAsignature(id);
      setDataTable(data); 
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setPending(false);
    }
  }, [actions, id]);

  useEffect(() => {
    fetchGroups(); 
  }, [fetchGroups]);

  //* Breadcrumbs items
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
      to: `/home/docente/asignatura/${id}/grupos`,
      title: "Gestión de grupos",
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
          {/* Breadcrumbs */}
          <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
            <BreadCrumbs items={breadcrumbItems} />
          </div>
          <div className="relative w-full h-40 p-6 rounded-md shadow-md bg-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/src/util/imgs/Background-group.png')`,
                filter: "opacity(0.2)",
                zIndex: -1,
              }}
            ></div>
            <h1 className="text-3xl font-semibold text-black">
              Gestión de Grupos
            </h1>
            <div className="flex items-center mt-4">
              <p className="text-sm text-black mt-2">
                Crear, editar, eliminar y listar grupos
              </p>
              <div className="ml-auto">
                <button
                  className="wave-button"
                  onClick={handleCreateGroup}
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
            <GroupCards
              idAsignatura = {idAsignatura}
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
                ? "Actualizar grupo"
                : "Crear nuevo grupo"}
            </h2>
            <GroupForm
              idAsignatura={idAsignatura}
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
      </div>
    </div>
  );
}

export default GroupPage;
