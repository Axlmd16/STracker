import { AlertCircle, CheckCircle2, PlayCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const ResultadoTestPage = ({ actions }) => {
    const location = useLocation();
    const { resultado } = location.state || {};
    const [testState, setTestState] = useState({
        isActive: false,
        isCompleted: false,
        info: null,
    });
    const [loading, setLoading] = useState(false);

    const fetchTestInfo = useCallback(async () => {
        setLoading(true);
        try {
            const data = await actions.getTestEstres(
                resultado.asignacion.test_id
            );
            setTestState((prev) => ({ ...prev, info: data }));
        } catch (error) {
            console.error("Error al obtener información del test:", error);
            toast.error("Error al obtener información del test" + error);
        } finally {
            setLoading(false);
        }
    }, [actions, resultado?.asignacion?.test_id]);

    useEffect(() => {
        fetchTestInfo();
    }, [fetchTestInfo]);

    const verifyCompletion = useCallback(async () => {
        setLoading(true);
        try {
            const isCompleted = await actions.verifyTestCompletion(
                resultado.asignacion.test_id
            );
            if (isCompleted) {
                setTestState((prev) => ({
                    ...prev,
                    isCompleted: true,
                }));
            } else {
                toast.error("El test no fue completado correctamente");
            }
        } catch (error) {
            console.error(
                "Error al verificar la finalización del test:",
                error
            );
            toast.error("Error al verificar la finalización del test" + error);
        } finally {
            setTestState((prev) => ({
                ...prev,
                isActive: false,
            }));
            setLoading(false);
        }
    }, [actions, resultado?.asignacion?.test_id]);

    //* Función para abrir el test en una nueva ventana
    const startTest = () => {
        setTestState((prev) => ({ ...prev, isActive: true }));

        const id_unico = [
            resultado.asignacion.asignatura_id,
            resultado.asignacion.test_id,
            resultado.id,
            resultado.estudiante_asignatura_id,
        ].join("-");

        const formURL = `${testState.info.url}&entry.1292276143=${id_unico}`;
        const testWindow = window.open(formURL, "_blank");

        const checkTestWindow = setInterval(() => {
            if (testWindow?.closed) {
                clearInterval(checkTestWindow);
                verifyCompletion();
            }
        }, 500);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-lg font-medium text-gray-600">
                        Cargando test...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-50">
            {testState.isActive && !testState.isCompleted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-6 w-6 text-yellow-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Test en Progreso
                            </h3>
                        </div>
                        <p className="mt-3 text-gray-600">
                            Por favor, complete el test en la ventana abierta
                            antes de volver a esta página. No cierre esta
                            ventana.
                        </p>
                    </div>
                </div>
            )}

            <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
                {!testState.isActive && !testState.isCompleted && (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Evaluación de Estrés
                        </h2>
                        <p className="max-w-md text-gray-600">
                            Está a punto de comenzar su evaluación. El test se
                            abrirá en una nueva ventana. Por favor, asegúrese de
                            completarlo sin interrupciones.
                        </p>
                        <button
                            onClick={startTest}
                            className="btn btn-primary gap-2"
                        >
                            <PlayCircle className="h-5 w-5" />
                            Comenzar Test
                        </button>
                    </div>
                )}

                {testState.isCompleted && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            ¡Test Completado!
                        </h2>
                        <p className="max-w-md text-gray-600">
                            Has finalizado exitosamente la evaluación. Tus
                            resultados están siendo procesados y estarán
                            disponibles próximamente.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultadoTestPage;
