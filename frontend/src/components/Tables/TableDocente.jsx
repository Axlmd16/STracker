import {
    IdCard,
    Mail,
    Pencil,
    Phone,
    Trash2Icon,
    UsersRound,
    LayoutGrid,
    ListOrdered,
} from "lucide-react";
import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    forwardRef,
    useImperativeHandle,
} from "react";
import { toast } from "react-hot-toast";
import CustomDataTable from "./CustomDataTable";
import SearchBar from "../Navigation/search_bar";
import Swal from "sweetalert2";

const TableDocente = forwardRef(({ actions, handleUpdate }, ref) => {
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    //* Obtener data
    const fetchDocentes = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getDocentes();
            setData(data);
            setFilteredData(data);
        } catch (error) {
            toast.error("Error al cargar los docentes");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchDocentes();
    }, [fetchDocentes]);

    useImperativeHandle(ref, () => ({
        reload: fetchDocentes,
    }));

    //* Filtrar data
    const handleSearch = useCallback(
        (e) => {
            const value = e.target.value.toLowerCase();
            const filtered = data.filter((docente) =>
                ["nombres", "apellidos", "cedula"].some((key) =>
                    docente[key].toLowerCase().includes(value)
                )
            );
            setFilteredData(filtered);
        },
        [data]
    );

    //* Funcion para actualizar
    const handleUpdateClick = (row) => {
        handleUpdate(row);
    };

    //* Funcion para eliminar
    async function handleDeleteClick(row) {
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8da579",
            cancelButtonColor: "#ccb078",
            confirmButtonText: "Sí, borrar!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await actions.deleteDocente(row.id);
                    fetchDocentes();
                    toast.success("Docente eliminado correctamente");
                } catch (error) {
                    console.log(error);
                    toast.error("Error al eliminar el docente");
                }
            }
        });
    }

    //* Columnas de la tabla
    const columns = useMemo(
        () => [
            {
                name: (
                    <div className="flex justify-center">
                        <ListOrdered className="mr-2" size={20} />
                        <span>Nro</span>
                    </div>
                ),
                selector: (row) => filteredData.indexOf(row) + 1,
                sortable: true,
                width: "130px",
            },
            {
                name: (
                    <div className="flex justify-center">
                        <UsersRound className="mr-2" size={20} />
                        <span>Nombres</span>
                    </div>
                ),
                selector: (row) => row.nombres,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <UsersRound className="mr-2" size={20} />
                        <span>Apellidos</span>
                    </div>
                ),
                selector: (row) => row.apellidos,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <IdCard className="mr-2" size={20} />
                        <span>Cédula</span>
                    </div>
                ),
                selector: (row) => row.cedula,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <Mail className="mr-2" size={20} />
                        <span>Email</span>
                    </div>
                ),
                selector: (row) => row.email,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <Phone className="mr-2" size={20} />
                        <span>Telefono</span>
                    </div>
                ),
                selector: (row) => row.telefono,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <LayoutGrid className="mr-2" size={20} />
                        <span>Acciones</span>
                    </div>
                ),
                cell: (row) => (
                    <div className="flex">
                        <button
                            className="btn-ghost btn btn-sm btn-circle text-blue-700"
                            onClick={() => handleUpdateClick(row)}
                        >
                            <Pencil size={20} />
                        </button>
                        <button
                            className="btn-ghost btn btn-sm btn-circle mx-5 text-red-500"
                            onClick={() => {
                                handleDeleteClick(row);
                            }}
                        >
                            <Trash2Icon size={20} />
                        </button>
                    </div>
                ),
            },
        ],
        [filteredData]
    );

    return (
        <div>
            <div className="float-end mb-10">
                <SearchBar handleSearch={handleSearch} />
            </div>
            <CustomDataTable
                columns={columns}
                data={filteredData}
                pending={pending}
            />
        </div>
    );
});

export default TableDocente;
