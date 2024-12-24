import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CustomTableTA from "./CustomTableTA";
import { useNavigate } from "react-router-dom";

function InterfaceTableActividades({ actions, store, id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //* Función para cargar las actividades
    const cargarActividades = async () => {
        setLoading(true);
        try {
            const data = await actions.getActividades();
            setData(data);
        } catch (error) {
            console.error("Error al cargar las actividades:", error);
            toast.error("Error al cargar las actividades");
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

        // Ejecutar la actualización inicial
        actualizarEstados();

        // Configurar el intervalo para actualizaciones periódicas
        const intervalo = setInterval(actualizarEstados, 60000); // cada minuto

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, []);

    const handleDetails = (row) => {
        navigate(`/home/docente/asignatura/${id}/actividades/${row.id}`);
    };

    const capitalize = (text) => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
                center: true,
            },
            {
                name: "Estado",
                selector: (row) => row.estado,
                cell: (row) => (
                    <span
                        className={`px-3 py-1 rounded-full  text-sm ${
                            row.estado === "Pendiente"
                                ? "bg-yellow-400"
                                : row.estado === "EN_PROGRESO"
                                ? "bg-green-300"
                                : "bg-red-400"
                        }`}
                    >
                        {capitalize(row.estado.replace("_", " "))}{" "}
                    </span>
                ),
                sortable: true,
                center: true,
            },
        ],
        [data]
    );

    return (
        <div>
            <div className="">
                <CustomTableTA
                    columns={columns}
                    data={data}
                    title={"Actividades asignadas"}
                    to={`/home/docente/asignatura/${id}/actividades`}
                    handleDetails={handleDetails}
                />
            </div>
        </div>
    );
}

export default InterfaceTableActividades;
