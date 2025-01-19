import {
    IdCard,
    Mail,
    Pencil,
    Trash2Icon,
    ListOrdered,
    LayoutGrid,
    Eye,
} from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-hot-toast";
import CustomDataTable from "./CustomDataTable";
import SearchBar from "../Navigation/search_bar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DataTableRecomendaciones = forwardRef(
    ({ actions, handleUpdate, fetchData, data, pending, searchKeys }, ref) => {
        const [filteredData, setFilteredData] = useState([]);
        const navigate = useNavigate();

        useEffect(() => {
            setFilteredData(data);
        }, [data]);

        useImperativeHandle(ref, () => ({
            reload: fetchData,
        }));

        const handleRecomendacionesClick = (id) => {
            navigate(`/home/administrador/tests/recomendaciones/${id}`);
        };

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
                        await actions.eliminarRecomendacion(row.id);
                        fetchData();
                        toast.success("Recomendacion eliminada correctamente");
                    } catch (error) {
                        console.error(error);
                        toast.error("Error al eliminar la recomendacion");
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
                    width: "150px",
                },
                // {
                //     name: (
                //         <div className="flex justify-center">
                //             <span>ID</span>
                //         </div>
                //     ),
                //     selector: (row) => row.id,
                //     sortable: true,
                //     width: "80px"
                // },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Titulo</span>
                        </div>
                    ),
                    selector: (row) => row.titulo,
                    sortable: true,
                    width: "200px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Descripción</span>
                        </div>
                    ),
                    selector: (row) => row.descripcion,
                    sortable: true,
                    width: "400px"
                },
                {
                    name: (
                        <div className="flex justify-center">
                            <span>Prioridad</span>
                        </div>
                    ),
                    selector: (row) => row.prioridad,
                    sortable: true,
                    width: "150px"
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

export default DataTableRecomendaciones;
