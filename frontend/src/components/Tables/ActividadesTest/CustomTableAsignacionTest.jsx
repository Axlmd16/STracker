import React from "react";
import DataTable from "react-data-table-component";
import { PlusCircle, Rabbit } from "lucide-react";
import { Link } from "react-router-dom";

const CustomTableAsignacionTest = ({
    id,
    columns,
    data,
    pending,
    title,
    to,
    handleDetails,
}) => {
    // Opciones de paginación
    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const paginationPerPage = 4;

    // Estilos personalizados para la tabla
    const customStyles = {
        headCells: {
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#82858c",
                backgroundColor: "var(--bg-table)",
                padding: "8px",
            },
        },
        cells: {
            style: {
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-cell)",
                padding: "8px",
                cursor: "pointer",
            },
        },
        table: {
            style: {
                backgroundColor: "var(--bg-table)",
            },
        },
        pagination: {
            style: {
                backgroundColor: "var(--bg-table)",
                fontSize: "12px",
                padding: "8px",
            },
            pageButtonsStyle: {
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                padding: "6px",
                margin: "0 2px",
                cursor: "pointer",
                transition: "0.3s",
                color: "#82858c",
                fill: "#82858c",
                backgroundColor: "transparent",
                "&:hover:not(:disabled)": {
                    backgroundColor: "#e2e2e2",
                },
                "&:focus": {
                    outline: "none",
                    backgroundColor: "#e2e2e2",
                },
            },
        },
    };

    return (
        <div className="overflow-x-auto">
            <DataTable
                title={
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-slate-700">
                            {title}
                        </span>
                        <Link to={to}>
                            <button className="btn btn-circle btn-ghost text-blue-900">
                                <PlusCircle size={35} />
                            </button>
                        </Link>
                    </div>
                }
                columns={columns}
                data={data}
                pagination
                onRowDoubleClicked={(row) => handleDetails(row)}
                striped
                paginationPerPage={paginationPerPage}
                highlightOnHover
                progressPending={pending}
                progressComponent={<h1>Cargando...</h1>}
                noDataComponent={
                    <div className="flex flex-col items-center justify-center h-full">
                        <Rabbit size={100} strokeWidth={1} />
                        <h2 className="mt-4 text-lg font-semibold text-gray-700">
                            No se encontraron resultados
                        </h2>
                    </div>
                }
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
        </div>
    );
};

export default CustomTableAsignacionTest;
