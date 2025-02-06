import { HomeIcon, Import, KeySquare, UserRoundPlus } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DocenteForm from "../../../components/Forms/DocenteForm";
import Modal from "../../../components/Modals/Modal";
import ModalForm from "../../../components/Modals/ModalForm";
import DataTableUser from "../../../components/Tables/DataTableUser";
import ImportDataPage from "./ImportDataPage";
import { toast } from "react-hot-toast";
import TableCuentas from "../../../components/Tables/TableDocente";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";

function CuentaCrudPage({ actions, store }) {
    //* Referencias y estados
    const tableRef = useRef(null);

    //* Funcion para obtener los datos
    const fetchDocentes = useCallback(async () => {
        setPending(true);
        try {
            const data = await actions.getDocentes();
            setDataTable(data);
        } catch (error) {
            toast.error("Error al cargar los datos");
        } finally {
            setPending(false);
        }
    }, [actions]);

    useEffect(() => {
        fetchDocentes();
    }, [fetchDocentes]);

    //* Items
    const breadcrumbItems = [
        {
            to: "/home/administrador",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: "/home/administrador/cuentas",
            title: "Gestion de cuentas de usuario",
            icon: KeySquare,
            active: true,
        },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Encabezado */}
            <div className="bg-white rounded-md shadow-md">
                {/* Breadcrumbs */}
                <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                    <BreadCrumbs items={breadcrumbItems} />
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-700">
                        Cuentas de Usuarios
                    </h1>
                    <div className="flex items-center mt-4">
                        <p className="text-sm text-gray-500 mt-2">
                            Crear, editar, eliminar y listar docentes
                        </p>
                    </div>
                </div>
            </div>

            {/* Contenedor de la tabla */}
            <div className="flex-grow mt-6 bg-white p-6 rounded-md shadow-md overflow-x-auto">
                <TableCuentas actions={actions} />
            </div>
        </div>
    );
}

export default CuentaCrudPage;
