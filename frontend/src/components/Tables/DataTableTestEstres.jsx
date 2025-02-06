import {
    IdCard,
    Mail,
    Pencil,
    Trash2Icon,
    ListOrdered,
    LayoutGrid,
    Eye 
} from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-hot-toast";
import CustomDataTable from "./CustomDataTable";
import SearchBar from "../Navigation/search_bar";
import Swal from "sweetalert2";

const DataTableTestEstres = forwardRef(
    ({ actions, handleUpdate, fetchData, data, pending, searchKeys }, ref) => {
        const [filteredData, setFilteredData] = useState([]);

        useEffect(() => {
            setFilteredData(data);
        }, [data]);

        useImperativeHandle(ref, () => ({
            reload: fetchData,
        }));

        //* Filtrar datos según el término de búsqueda
        const handleSearch = useCallback(
            (e) => {
                const value = e.target.value.toLowerCase();
                const filtered = data.filter((item) =>
                    searchKeys.some((key) =>
                        item[key]?.toLowerCase().includes(value)
                    )
                );
                setFilteredData(filtered);
            },
            [data, searchKeys]
        );

        //* Función para manejar actualizaciones
        const handleUpdateClick = (row) => {
            handleUpdate(row);
        };

        //* Función para manejar eliminación
        const handleDeleteClick = async (row) => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#8da579",
                cancelButtonColor: "#ccb078",
                confirmButtonText: "Sí, borrar!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await actions.deleteTestEstres(row.id);
                        fetchData();
                        toast.success("Test de estrés eliminado correctamente");
                    } catch (error) {
                        console.error(error);
                        toast.error("Error al eliminar el test de estrés");
                    }
                }
            });
        };

        //* Definición de las columnas de la tabla
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
                    width: "80px",
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>ID</span>
                        </div>
                    ),
                    selector: (row) => row.id,
                    sortable: true,
                     width: "80px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Descripción</span>
                        </div>
                    ),
                    selector: (row) => row.descripcion,
                    sortable: true,
                     width: "250px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Ver Test</span>
                        </div>
                    ),
                    cell: (row) => (
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.open(row.url, "_blank")}
                                className="text-blue-500"
                                title="Ver en nueva pestaña"
                            >
                                <Eye size={20} />
                            </button>
                        </div>
                    ),
                     width: "140px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>URL</span>
                        </div>
                    ),
                    selector: (row) => row.url, 
                    sortable: true,
                     width: "250px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Estado</span>
                        </div>
                    ),
                    selector: (row) => (row.estado == 1 ? "Activo" : "Inactivo"), 
                    sortable: true,
                    width: "120px", 
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
                                className="btn btn-sm btn-circle text-blue-700"
                                onClick={() => handleUpdateClick(row)}
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                className="btn btn-sm btn-circle mx-3 text-red-500"
                                onClick={() => handleDeleteClick(row)}
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
                <div className="float-end mb-4">
                    <SearchBar handleSearch={handleSearch} />
                </div>
                <CustomDataTable
                    columns={columns}
                    data={filteredData}
                    pending={pending}
                />
            </div>
        );
    }
);

export default DataTableTestEstres;
