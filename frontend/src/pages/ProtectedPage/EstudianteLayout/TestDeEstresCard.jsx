import React from "react";
import { Brain } from "lucide-react";

function TestDeEstresCard({ test, actions }) {
    const { descripcion, grupo, fecha_limite, test_id } = test;
    const isPending = !fecha_limite;

    const handleButtonClick = async (event) => {
        const testId = event.target.getAttribute("data-test-id");
        
        const test = await actions.getTestEstres(testId);
        console.log(test);
        const { url } = test;
        console.log(url);
    };

    return (
        <div className="flex justify-center items-center p-3 bg-base-200 rounded-lg">
            <div className="flex gap-4 items-center justify-center">
                <div className="flex items-center justify-center w-10 h-10 bg-circle-bg text-white rounded-full">
                    <Brain className="w-6 h-6" />
                </div>
                <div className="text-left">
                    <div className="font-medium">{descripcion}</div>
                    <div className="text-sm text-base-content/70">
                        {isPending ? "Pendiente" : `Vence en ${fecha_limite}`}
                    </div>
                    <div className="mt-4 mb-4">
                        <button
                            className={`btn-status ${isPending ? "btn-status-start" : "btn-status-view"}`}
                            data-test-id={test_id} 
                            onClick={handleButtonClick} 
                        >
                            {isPending ? "Comenzar Test" : "Ver Resultados"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestDeEstresCard;
