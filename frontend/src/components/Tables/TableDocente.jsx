import {
    IdCard,
    Mail,
    Pencil,
    Phone,
    Trash2Icon,
    UsersRound,
    LayoutGrid,
    ListOrdered,
    ToggleRight,
    ScanEye,
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

const TableCuentas = forwardRef(({ actions }) => {
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    //* Obtener data
    const fetchData = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getCuentas();
            setData(data);
            setFilteredData(data);
        } catch (error) {
            toast.error("Error al cargar las cuentas de usuario");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    //* Filtrar data
    const handleSearch = useCallback(
        (e) => {
            const value = e.target.value.toLowerCase();
            const filtered = data.filter((cuenta) =>
                ["username", "estado", "rol"].some((key) =>
                    cuenta[key].toLowerCase().includes(value)
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

    //* Funcion para actualizar estado de la cuenta
    const handleUpdateState = async (row) => {
        const estado = row.estado;
        Swal.fire({
            title: "Estás seguro?",
            text: "Se cambiará el estado de la cuenta",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#8da579",
            cancelButtonColor: "#ccb078",
            confirmButtonText: "Sí, cambiar!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await actions.updateEstadoCuenta(row.id, !estado);
                    fetchData();
                    toast.success("Estado actualizado correctamente");
                } catch (error) {
                    console.log(error);
                    toast.error("Error al actualizar el estado");
                }
            }
        });
    };

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
            },
            {
                name: (
                    <div className="flex justify-center">
                        <UsersRound className="mr-2" size={20} />
                        <span>Nombre de usuario</span>
                    </div>
                ),
                selector: (row) => row.username,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <ScanEye className="mr-2" size={20} />
                        <span>Rol</span>
                    </div>
                ),
                selector: (row) => row.rol,
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <ToggleRight className="mr-2" size={20} />
                        <span>Estado</span>
                    </div>
                ),
                selector: (row) =>
                    row.estado === true ? (
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                            Activo
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                            Inactivo
                        </span>
                    ),
                sortable: true,
            },
            {
                name: (
                    <div className="flex justify-center">
                        <LayoutGrid className="mr-2" size={20} />
                        <span>Acciones</span>
                    </div>
                ),
                selector: (row) => (
                    <div className="flex">
                        <div className="form-control w-52">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={row.estado}
                                    onChange={() => handleUpdateState(row)}
                                />
                            </label>
                        </div>
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

export default TableCuentas;
