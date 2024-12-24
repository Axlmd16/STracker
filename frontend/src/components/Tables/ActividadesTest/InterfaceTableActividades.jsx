import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import CustomTableTA from "./CustomTableTA";

function InterfaceTableActividades({ actions, store, id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, [actions]);

    const columns = useMemo(
        () => [
            {
                name: "Título",
                selector: (row) => row.titulo,
                sortable: true,
            },
            {
                name: "Descripción",
                selector: (row) => row.descripcion,
                sortable: true,
            },
            {
                name: "Fecha Inicio",
                selector: (row) =>
                    new Date(row.fecha_inicio).toLocaleDateString(),
                sortable: true,
            },
            {
                name: "Fecha Límite",
                selector: (row) => new Date(row.fecha_fin).toLocaleDateString(),
                sortable: true,
            },
            // {
            //     name: "Estado",
            //     selector: (row) => row.estado,
            //     sortable: true,
            // },
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
                    to={`/home/docente/asignatura/${id}/actividades/nueva`}
                />
            </div>
        </div>
    );
}

export default InterfaceTableActividades;
