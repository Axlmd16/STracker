import React, { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { format, subMonths, subWeeks, isWithinInterval } from "date-fns";
import { es } from "date-fns/locale";
import { Frown, Laugh, Meh } from "lucide-react";

function HistorialEstresEstudiante({ actions, store }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [periodoTiempo, setPeriodoTiempo] = useState("semana");

    useEffect(() => {
        const getHistorial = async () => {
            const historial = await actions.getResultadosResueltosPorEstudiante(
                store.id_user_auth
            );
            const datosFormateados = historial.map((item) => ({
                ...item,
                fecha_realizacion: new Date(item.fecha_realizacion),
                resultado: Number(item.resultado),
            }));
            setData(datosFormateados);
            setFilteredData(datosFormateados);
            setLoading(false);
        };

        getHistorial();
    }, [actions, store]);

    useEffect(() => {
        const filtrarPorPeriodo = () => {
            const ahora = new Date();
            let fechaInicio;

            switch (periodoTiempo) {
                case "semana":
                    fechaInicio = subWeeks(ahora, 1);
                    break;
                case "mes":
                    fechaInicio = subMonths(ahora, 1);
                    break;
                case "3meses":
                    fechaInicio = subMonths(ahora, 3);
                    break;
                default:
                    setFilteredData(data);
                    return;
            }

            const datosFiltrados = data.filter((item) =>
                isWithinInterval(item.fecha_realizacion, {
                    start: fechaInicio,
                    end: ahora,
                })
            );
            setFilteredData(datosFiltrados);
        };

        filtrarPorPeriodo();
    }, [periodoTiempo, data]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatearFecha = (fecha) => {
        if (!fecha) return "";
        return format(new Date(fecha), "dd MMM yyyy", { locale: es });
    };

    const formatearNivelEstres = (nivel) => {
        if (nivel >= 80) {
            return "Alto";
        }

        if (nivel >= 50) {
            return "Medio";
        }

        return "Bajo";
    };

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">
                        {formatearFecha(label)}
                    </p>
                    <p className="text-primary">
                        Nivel de estrés:{" "}
                        {formatearNivelEstres(payload[0].value) +
                            " (" +
                            payload[0].value +
                            "%)"}
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomizedDot = (item) => {
        const { cx, cy, stroke, payload } = item;
        if (payload.resultado >= 80) {
            return <Frown size={20} x={cx - 8} y={cy - 8} fill="#e66372" />;
        }

        if (payload.resultado >= 50) {
            return <Meh size={20} x={cx - 8} y={cy - 8} fill="#f59e0b" />;
        }

        return <Laugh size={20} x={cx - 8} y={cy - 8} fill="#10b981" />;
    };

    return (
        <div className="card bg-white shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-4">
                    Historial de Niveles de Estrés
                </h2>

                <div className="flex gap-4 mb-6">
                    <select
                        className="select select-info w-full max-w-xs select-sm font-semibold text-gray-800 "
                        value={periodoTiempo}
                        onChange={(e) => setPeriodoTiempo(e.target.value)}
                    >
                        <option value="todo">Todo el historial</option>
                        <option value="semana">Última semana</option>
                        <option value="mes">Último mes</option>
                        <option value="3meses">Últimos 3 meses</option>
                    </select>
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={filteredData}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                className="opacity-30"
                            />
                            <XAxis
                                dataKey="fecha_realizacion"
                                tickFormatter={formatearFecha}
                                angle={-45}
                                textAnchor="end"
                                height={70}
                                className="text-sm"
                            />
                            <YAxis
                                className="text-sm"
                                domain={[0, 10]}
                                tickCount={6}
                            />
                            <Tooltip content={customTooltip} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="resultado"
                                name="Nivel de Estrés"
                                stroke="#8b5cf6"
                                fill="#c4b5fd"
                                strokeWidth={2}
                                dot={<CustomizedDot />}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default HistorialEstresEstudiante;
