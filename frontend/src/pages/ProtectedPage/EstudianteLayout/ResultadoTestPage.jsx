import { AlertCircle, CheckCircle2, PlayCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ViewResultados from "../../../components/ViewsSets/ViewResultados";

const ResultadoTestPage = ({ actions }) => {
    const location = useLocation();
    const [resultado, setResultado] = useState(
        location.state?.resultado || null
    );
    const [testState, setTestState] = useState({
        isActive: false,
        isCompleted: false,
        info: null,
    });
    const [loading, setLoading] = useState(false);
    const [processingResults, setProcessingResults] = useState(false);
    const fetchTestInfo = useCallback(async () => {
        if (!resultado?.asignacion?.test_id) return;
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

    const fetchUpdatedResult = useCallback(async () => {
        if (!resultado?.id) return;
        try {
            const updatedResult = await actions.obtenerResultado(resultado.id);
            if (updatedResult) {
                setResultado(updatedResult);
            }
        } catch (error) {
            console.error("Error al obtener resultado actualizado:", error);
        }
    }, [actions, resultado?.id]);

    useEffect(() => {
        fetchTestInfo();
    }, [fetchTestInfo]);

    const verifyCompletion = useCallback(async () => {
        if (!resultado?.id) return;

        setProcessingResults(true);
        try {
            const response = await actions.verificarResultado(resultado.id);
            if (response === true) {
                await fetchUpdatedResult();
                setTestState((prev) => ({
                    ...prev,
                    isCompleted: true,
                }));
                setProcessingResults(false);
            } else {
                toast("Procesando resultados, inténtalo en unos segundos", {
                    icon: "⏳",
                });
                setTimeout(() => {
                    verifyCompletion();
                }, 3000);
            }
        } catch (error) {
            console.error(
                "Error al verificar la finalización del test:",
                error
            );
            toast.error("Error al verificar la finalización del test");
            setProcessingResults(false); // Finaliza el procesamiento incluso en error
        }
    }, [actions, resultado?.id, fetchUpdatedResult]);

    const startTest = () => {
        if (!testState.info?.url) {
            toast.error("No se pudo obtener la URL del test");
            return;
        }

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

    if (loading || processingResults) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-base-200">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-lg font-medium">
                        Procesando resultados, por favor espera...
                    </p>
                </div>
            </div>
        );
    }

    if (resultado?.fecha_realizacion) {
        return <ViewResultados actions={actions} resultado={resultado} />;
    }

    return (
        <div className="relative min-h-screen bg-base-200">
            {testState.isActive && !testState.isCompleted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-base-100 p-6 shadow-xl">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-6 w-6 text-warning" />
                            <h3 className="text-lg font-semibold">
                                Test en Progreso
                            </h3>
                        </div>
                        <p className="mt-3 text-base-content/80">
                            Por favor, complete el test en la ventana abierta
                            antes de volver a esta página.
                        </p>
                    </div>
                </div>
            )}

            <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
                {!testState.isActive && !testState.isCompleted && (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <h2 className="text-2xl font-bold">
                            Evaluación de Estrés
                        </h2>
                        <p className="max-w-md text-base-content/80">
                            Está a punto de comenzar su evaluación. El test se
                            abrirá en una nueva ventana.
                        </p>
                        <button
                            onClick={startTest}
                            className="btn btn-primary gap-2"
                            disabled={!testState.info?.url}
                        >
                            <PlayCircle className="h-5 w-5" />
                            Comenzar Test
                        </button>
                    </div>
                )}

                {testState.isCompleted && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                            <CheckCircle2 className="h-8 w-8 text-success" />
                        </div>
                        <h2 className="text-2xl font-bold">
                            ¡Test Completado!
                        </h2>
                        <p className="max-w-md text-base-content/80">
                            Has finalizado exitosamente la evaluación. La página
                            se actualizará en breve para mostrar tus resultados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultadoTestPage;
