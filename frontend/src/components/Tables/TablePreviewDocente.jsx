import { ArrowLeft, ArrowRight, CircleX } from "lucide-react";
import CustomDataTable from "./CustomDataTable";
import React, { useMemo } from "react";

function TablePreviewDocente({ data, onNext, onCancel, onBack }) {
    //* Columnas de la tabla
    const columns = useMemo(
        () => [
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
        ],
        [data]
    );

    return (
        <div>
            <div>
                <div className="shadow-md rounded-lg p-6 container mt-10 bg-white">
                    <CustomDataTable columns={columns} data={data} />
                </div>

                <div className="flex mt-10">
                    <button className="btn btn-info" onClick={onBack}>
                        <div className="flex items-center">
                            <ArrowLeft size={20} className="mr-2" />
                            <span>Atrás</span>
                        </div>
                    </button>
                    <div className="ml-auto">
                        <button
                            className="btn btn-warning mx-5"
                            onClick={onCancel}
                        >
                            <div className="flex items-center ">
                                <span>Cancelar</span>
                                <CircleX size={20} className="ml-2" />
                            </div>
                        </button>
                        <button className="btn btn-success" onClick={onNext}>
                            <div className="flex items-center">
                                <span>Siguiente</span>
                                <ArrowRight size={20} className="ml-2" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablePreviewDocente;
