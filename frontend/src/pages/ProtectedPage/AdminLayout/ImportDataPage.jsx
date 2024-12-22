import React, { useState } from "react";
import ImportForm from "../../../components/Forms/ImportForm";
import TablePreviewDocente from "../../../components/Tables/TablePreviewDocente";
import SendDataSpinner from "../../../components/Load/SendDataSpinner";

function ImportDocentePage({ actions, store, modalRef }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep((prevStep) => prevStep + 1);
        }, 1000);
    };

    const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));
    const handleCancel = () => {
        modalRef.current.closeModal();
        setStep(0);
        setData([]);
    };

    return (
        <div>
            {/* Barra de pasos */}
            <div className="container mx-auto p-5 flex justify-center">
                <ul className="steps steps-vertical lg:steps-horizontal text-md">
                    <li
                        className={`step ${
                            step >= 0 ? "step-primary" : ""
                        } mx-10`}
                    >
                        Carga de datos
                    </li>
                    <li className={`step ${step >= 1 ? "step-primary" : ""}`}>
                        Confirmación
                    </li>
                    <li className={`step ${step >= 2 ? "step-primary" : ""}`}>
                        Registro
                    </li>
                </ul>
            </div>
            <hr className="border-t-4 border-gray-400" />

            {loading && (
                <div className="flex justify-center items-center my-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {/* Contenido basado en el paso actual */}
            {!loading && (
                <div>
                    {step === 0 && (
                        <ImportForm onNext={handleNext} onDataLoad={setData} />
                    )}
                    {step === 1 && (
                        <TablePreviewDocente
                            data={data}
                            onNext={handleNext}
                            onCancel={handleCancel}
                            onBack={handleBack}
                        />
                    )}
                    {step === 2 && (
                        <SendDataSpinner
                            data={data}
                            onCancel={handleCancel}
                            actions={actions}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ImportDocentePage;
