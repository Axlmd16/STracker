import { Pencil, Trash2Icon } from "lucide-react";
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

    // Exponemos fetchDocentes para que se pueda llamar desde el padre
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

    //* Columnas de la tabla
    const columns = useMemo(
        () => [
            {
                name: "Nro.",
                selector: (row) => filteredData.indexOf(row) + 1,
                sortable: true,
                width: "150px",
            },
            {
                name: "Nombres",
                selector: (row) => row.nombres,
                sortable: true,
            },
            {
                name: "Apellidos",
                selector: (row) => row.apellidos,
                sortable: true,
            },
            {
                name: "Cedula",
                selector: (row) => row.cedula,
                sortable: true,
            },
            {
                name: "Email",
                selector: (row) => row.email,
                sortable: true,
            },
            {
                name: "Telefono",
                selector: (row) => row.telefono,
                sortable: true,
            },
            {
                name: "Acciones",
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
