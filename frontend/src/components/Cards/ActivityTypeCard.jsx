import React from "react";
import { FileText, Info } from "lucide-react";

const LeftPanel = ({ activities, name, register, clearErrors, watch }) => {
    const selectedValue = watch(name); // Obtén el valor seleccionado del formulario

    return (
        <div className="w-1/4 ">
            <div className="card bg-white shadow-xl h-full">
                <div className="card-body p-6">
                    <div className="space-y-4 mb-6">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            <Info className="w-4 h-4" />
                            Nueva Actividad
                        </div>
                        <h1 className="text-2xl font-bold leading-tight">
                            Nueva Actividad Académica
                        </h1>
                        <p className="text-gray-600">
                            Crea y configura una nueva actividad para tus
                            estudiantes
                        </p>
                    </div>
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <label
                                key={activity.value} // Asegúrate de que cada actividad tenga un valor único
                                className={`w-full p-4 rounded-xl transition-all duration-300 cursor-pointer flex flex-col items-start gap-2 border-2 ${
                                    selectedValue === activity.value
                                        ? "bg-primary text-white shadow-lg scale-105 border-primary"
                                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-transparent"
                                }`}
                            >
                                <input
                                    type="radio"
                                    value={activity.value}
                                    {...register(name, { required: true })}
                                    className="hidden"
                                    onFocus={() => clearErrors(name)}
                                />
                                <div
                                    className={`p-3 rounded-lg ${
                                        selectedValue === activity.value
                                            ? "bg-primary-focus"
                                            : "bg-white shadow-sm"
                                    }`}
                                >
                                    <FileText
                                        className={`w-6 h-6 ${
                                            selectedValue === activity.value
                                                ? "text-white"
                                                : "text-primary"
                                        }`}
                                    />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    {activity.title}
                                </h3>
                                <p
                                    className={`text-sm ${
                                        selectedValue === activity.value
                                            ? "text-white/90"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {activity.description}
                                </p>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
