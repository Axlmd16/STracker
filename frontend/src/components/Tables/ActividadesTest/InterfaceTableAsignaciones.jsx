import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CustomTableTA from "./CustomTableTA";
import { useNavigate } from "react-router-dom";
import CustomTableAsignacionTest from "./CustomTableAsignacionTest";

function InterfaceTableAsignaciones({ actions, store, id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //* Función para cargar las actividades
    const cargarTestAsignados = async () => {
        setLoading(true);
        try {
            const data = await actions.getAllAsignacionTestForAsignature(id);
            setData(data);
        } catch (error) {
            console.error("Error al cargar las asignaciones:", error);
            toast.error("Error al cargar las asignaciones:  " + error.message);
        } finally {
            setLoading(false);
        }
    };

    //* Efecto para la carga inicial de datos
    useEffect(() => {
        cargarTestAsignados();
    }, [actions, id]);

    const handleDetails = (row) => {
        navigate(`/home/docente/asignatura/${id}/asignaciones/${row.id}`);
    };

    const columns = useMemo(
        () => [
            {
                name: "Título",
                selector: (row) => row.descripcion,
                sortable: true,
            },
            {
                name: "Fecha Límite",
                selector: (row) =>
                    new Date(row.fecha_asignacion).toLocaleDateString(),
                sortable: true,
                center: "true",
            },
        ],
        [data]
    );

    return (
        <div>
            <div className="">
                <CustomTableAsignacionTest
                    id={id}
                    columns={columns}
                    data={data}
                    title={"Test asignadas"}
                    to={`/home/docente/asignatura/${id}/asignaciones`}
                    handleDetails={handleDetails}
                />
            </div>
        </div>
    );
}

export default InterfaceTableAsignaciones;
