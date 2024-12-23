import React from "react";
import DataTable from "react-data-table-component";
import { Rabbit } from "lucide-react";

const CustomDataTable = ({ columns, data, pending }) => {
    // Opciones de paginación
    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    // Establece 5 filas por página
    const paginationPerPage = 5;

    // Estilos personalizados para la tabla
    const customStyles = {
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-table)",
            },
        },
        cells: {
            style: {
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-cell)",
            },
        },
        table: {
            style: {
                backgroundColor: "var(--bg-table)",
            },
        },
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            paginationPerPage={paginationPerPage}
            highlightOnHover
            progressPending={pending}
            progressComponent={<h1>Cargando...</h1>}
            noDataComponent={
                <div className="flex flex-col items-center justify-center h-full">
                    <Rabbit size={300} strokeWidth={1} />
                    <h2 className="mt-4 text-lg font-semibold text-gray-700">
                        No se encontraron resultados
                    </h2>
                </div>
            }
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
        />
    );
};

export default CustomDataTable;
