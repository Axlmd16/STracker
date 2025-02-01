import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CustomTableTA from "./CustomTableTA";
import { useNavigate } from "react-router-dom";
import {
    EllipsisVertical,
    FilePenLine,
    PencilLine,
    Trash2,
} from "lucide-react";

function InterfaceTableActividades({ actions, store, id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //* Función para cargar las actividades
    const cargarActividades = async () => {
        setLoading(true);
        try {
            const data = await actions.getAcividadesPorAsignatura(id);
            setData(data);
        } catch (error) {
            console.error("Error al cargar las actividades:", error.message);
            toast.error("Error al cargar las actividades:  " + error.message);
        } finally {
            setLoading(false);
        }
    };

    //* Efecto para la carga inicial de datos
    useEffect(() => {
        cargarActividades();
    }, []);

    //* Efecto para la actualización automática de estados
    useEffect(() => {
        const actualizarEstados = async () => {
            try {
                await actions.updateEstadoActividad();
                // Recargar los datos después de actualizar los estados
                await cargarActividades();
            } catch (error) {
                console.error("Error al actualizar estados:", error);
                toast.error("Error al actualizar estados de las actividades");
            }
        };

        actualizarEstados();
        const intervalo = setInterval(actualizarEstados, 60000);
        return () => clearInterval(intervalo);
    }, []);

    const handleDetails = (row) => {
        navigate(`/home/docente/asignatura/${id}/actividades/${row.id}`);
    };

    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const handleUpdate = (row) => {
        console.log("Actualizar", row);
    };

    const handleDelete = (row) => {
        console.log("Eliminar", row);
    };

    const columns = useMemo(
        () => [
            {
                name: "Título",
                selector: (row) => row.titulo,
                sortable: true,
            },
            {
                name: "Fecha Límite",
                selector: (row) => new Date(row.fecha_fin).toLocaleDateString(),
                sortable: true,
                center: "true",
            },
            {
                name: "Estado",
                selector: (row) => row.estado,
                cell: (row) => (
                    <span
                        className={`px-3 py-1 rounded-full  text-sm font-medium  ${
                            row.estado === "PENDIENTE"
                                ? "text-yellow-800 bg-yellow-100"
                                : row.estado === "EN_PROGRESO"
                                ? "text-green-800 bg-green-100"
                                : "text-red-800 bg-red-100"
                        }`}
                    >
                        {capitalize(row.estado.replace("_", " "))}{" "}
                    </span>
                ),
                sortable: true,
                center: "true",
            },
            {
                name: "Acciones",
                cell: (row) => (
                    <div className="dropdown dropdown-right ">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m-1 btn-sm btn-ghost btn-circle"
                        >
                            <EllipsisVertical size={20} />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-white rounded-box z-50 w-auto shadow"
                        >
                            <li>
                                <button
                                    className="btn btn-ghost btn-circle btn-sm my-1 text-primary"
                                    onClick={() => handleUpdate(row)}
                                >
                                    <PencilLine size={20} />
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn btn-ghost btn-circle btn-sm my-1 text-warning"
                                    onClick={() => handleDelete(row)}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </li>
                        </ul>
                    </div>
                ),
                center: true,
            },
        ],
        [data]
    );

    return (
        <div>
            <div className="relative">
                <div className="overflow-x-auto">
                    <CustomTableTA
                        columns={columns}
                        data={data}
                        title={"Actividades asignadas"}
                        to={`/home/docente/asignatura/${id}/actividades`}
                        handleDetails={handleDetails}
                    />
                </div>
            </div>
        </div>
    );
}

export default InterfaceTableActividades;
