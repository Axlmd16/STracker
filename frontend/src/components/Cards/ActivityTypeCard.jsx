import React from "react";
import {
    FileText,
    MessageSquare,
    BookOpen,
    Info,
    Clock,
    Users,
    CheckCircle,
} from "lucide-react";

const ActivityTypeCard = ({
    icon: Icon,
    title,
    description,
    isSelected,
    onClick,
}) => (
    <button
        onClick={onClick}
        className={`w-full p-4 rounded-xl transition-all duration-300 ${
            isSelected
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
        } flex flex-col items-start gap-2 border-2 ${
            isSelected ? "border-primary" : "border-transparent"
        }`}
    >
        <div
            className={`p-3 rounded-lg ${
                isSelected ? "bg-primary-focus" : "bg-white shadow-sm"
            }`}
        >
            <Icon
                className={`w-6 h-6 ${
                    isSelected ? "text-white" : "text-primary"
                }`}
            />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p
            className={`text-sm ${
                isSelected ? "text-white/90" : "text-gray-500"
            }`}
        >
            {description}
        </p>
    </button>
);

const LeftPanel = ({ activityType, setActivityType }) => {
    const activities = [
        {
            type: "tarea",
            icon: FileText,
            title: "Tarea",
            description: "Asigna trabajos y evalúa el progreso",
        },
        {
            type: "foro",
            icon: MessageSquare,
            title: "Foro",
            description: "Promueve discusiones y debates",
        },
        {
            type: "lectura",
            icon: BookOpen,
            title: "Lectura",
            description: "Comparte material de estudio",
        },
    ];

    return (
        <div className="w-1/4 space-y-6">
            {/* Main Card */}
            <div className="card bg-white shadow-xl">
                <div className="card-body p-6">
                    {/* Header */}
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

                    {/* Activity Type Selector */}
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <ActivityTypeCard
                                key={activity.type}
                                icon={activity.icon}
                                title={activity.title}
                                description={activity.description}
                                isSelected={activityType === activity.type}
                                onClick={() => setActivityType(activity.type)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
