import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

function SendDataSpinner({ data, onCancel, actions, id }) {
    const [progress, setProgress] = useState(0);
    const hasRunRef = useRef(false);

    useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        let interval;
        const minTime = 4000;
        const startTime = Date.now();

        const sendData = async () => {
            try {
                interval = setInterval(() => {
                    setProgress((prevProgress) => {
                        const elapsedTime = Date.now() - startTime;
                        const newProgress = Math.min(
                            (elapsedTime / minTime) * 100,
                            95
                        );
                        return Math.floor(newProgress);
                    });
                }, 100);

                if (id) {
                    await actions.importarEstudiantes(id, data);
                } else {
                    await actions.importarDocentes(data);
                }

                clearInterval(interval);
                setProgress(100);

                setTimeout(() => {
                    onCancel();
                    toast.success("Datos importados correctamente");
                }, 1000);
            } catch (error) {
                console.error("Error al importar los datos", error);
                clearInterval(interval);
                setProgress(0);
                onCancel();
                toast.error("Error al importar los datos");
            }
        };

        sendData();

        return () => clearInterval(interval);
    }, [data, onCancel, actions]);

    return (
        <div className="container mx-auto p-5 flex justify-center mt-14">
            <div className="flex justify-center items-center h-full">
                <div
                    className="radial-progress"
                    style={{
                        "--value": progress,
                        "--size": "12rem",
                        "--thickness": "2px",
                    }}
                    role="progressbar"
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
}

export default SendDataSpinner;
