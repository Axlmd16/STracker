import {
    AlertTriangle,
    Book,
    Calendar,
    CaseUpper,
    Clock,
    Edit3,
    GraduationCap,
    HomeIcon,
    LibraryBig,
    Save,
    Settings,
    Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import SelectForm from "../../../components/Forms/Fields/SelectForm";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";

function AsignaturaConfigPage({ actions, store }) {
    //* Constantes
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(true);
    const [asignatura, setAsignatura] = useState({});

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [subjectData, setSubjectData] = useState({
        name: "Matemáticas Discretas",
        code: "MAT-234",
        hours: 64,
        parallel: "A",
        startDate: "2024-03-01",
        endDate: "2024-07-31",
        description:
            "Curso fundamental de matemáticas discretas que cubre teoría de conjuntos, lógica, y estructuras algebraicas.",
    });

    const handleSave = async (data) => {
        // Aquí iría la lógica para guardar los cambios
        // console.log(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //* Breadcrumbs items
    const breadcrumbItems = [
        {
            to: "/home/docente",
            title: "",
            icon: HomeIcon,
        },
        {
            to: `/home/docente`,
            title: "Asignaturas",
            icon: LibraryBig,
        },
        {
            to: `/home/docente/asignatura/${id}`,
            title: asignatura.nombre,
            icon: GraduationCap,
        },
        {
            to: `/home/docente/asignatura/${id}/configuracion`,
            title: "Configuración",
            icon: Settings,
            active: true,
        },
    ];

    //* Funcion para obtener los datos de la asignatura
    useEffect(() => {
        const fetchAsignatura = async () => {
            try {
                const data = await actions.getAsignatura(id);
                setAsignatura(data);
                setValue("nombre", data.nombre);
                setValue("paralelo", data.paralelo);
                setValue("nro_horas", data.nro_horas);
                setValue("fecha_inicio", data.fecha_inicio.split("T")[0]);
                setValue("fecha_fin", data.fecha_fin.split("T")[0]);
            } catch (error) {
                console.error("Error al cargar la asignatura:", error);
                toast.error("Error al cargar la asignatura");
            } finally {
                setLoading(false);
            }
        };

        fetchAsignatura();
    }, [actions, id]);

    const options = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
    ];

    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={id} />
            </div>
            <div className="flex-grow ml-16 mt-16 p-6 overflow-y-auto fixed top-0 left-0 right-0 bottom-0 bg-base-200">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="">
                            {/* Header */}
                            <div className="mb-6  bg-white rounded-lg shadow-sm ">
                                {/* Breadcrumbs */}
                                <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                                    <BreadCrumbs items={breadcrumbItems} />
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Configuración de Asignatura
                                    </h1>
                                    <div className="flex items-center space-x-3">
                                        {!isEditing ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                <span>Editar</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>Guardar</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="container mx-auto p-3">
                                <div className="grid grid-cols-3 gap-8">
                                    {/* Basic Information Card */}
                                    <div className="col-span-2 bg-white rounded-xl shadow-sm">
                                        <div className="p-6 border-b border-gray-100">
                                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                                <Book className="w-5 h-5 mr-2 text-blue-600" />
                                                Información de la Asignatura
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Nombre de la Asignatura
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register("nombre", {
                                                            required:
                                                                "Este campo es obligatorio",
                                                        })}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full p-3 border rounded-lg bg-gray-50 disabled:opacity-75 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                                            errors.nombre
                                                                ? "border-red-500"
                                                                : ""
                                                        }`}
                                                    />

                                                    {errors.nombre && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                errors.nombre
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hours and Parallel Card */}
                                    <div className="bg-white rounded-xl shadow-sm">
                                        <div className="p-6 border-b border-gray-100">
                                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                                Horas y Paralelo
                                            </h2>
                                        </div>
                                        <div className="p-6 space-y-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Horas Totales
                                                </label>
                                                <input
                                                    type="number"
                                                    {...register("nro_horas", {
                                                        required:
                                                            "Este campo es obligatorio",
                                                    })}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full p-3 border rounded-lg bg-gray-50 disabled:opacity-75 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                />
                                                {errors.hours && (
                                                    <p className="text-red-500 text-sm">
                                                        {
                                                            errors.nro_horas
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Paralelo
                                                </label>
                                                <SelectForm
                                                    label="Paralelo"
                                                    name="paralelo"
                                                    register={register}
                                                    options={options}
                                                    errors={errors}
                                                    clearErrors={clearErrors}
                                                    icon={CaseUpper}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates Card */}
                                    <div className="col-span-2 bg-white rounded-xl shadow-sm">
                                        <div className="p-6 border-b border-gray-100">
                                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                                Fechas del Curso
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Fecha de Inicio
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register(
                                                            "fecha_inicio",
                                                            {
                                                                required:
                                                                    "Este campo es obligatorio",
                                                            }
                                                        )}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full p-3 border rounded-lg bg-gray-50 disabled:opacity-75 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                                            errors.fecha_inicio
                                                                ? "border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.fecha_inicio && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                errors
                                                                    .fecha_inicio
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Fecha de Finalización
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register(
                                                            "fecha_fin",
                                                            {
                                                                required:
                                                                    "Este campo es obligatorio",
                                                            }
                                                        )}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full p-3 border rounded-lg bg-gray-50 disabled:opacity-75 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                                            errors.fecha_fin
                                                                ? "border-red-500"
                                                                : ""
                                                        }`}
                                                    />
                                                    {errors.fecha_fin && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                errors.fecha_fin
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Section */}
                                    <div className="bg-white rounded-xl shadow-sm">
                                        <div className="p-6 border-b border-gray-100">
                                            <h2 className="text-xl font-semibold flex items-center text-red-600">
                                                <AlertTriangle className="w-5 h-5 mr-2" />
                                                Zona de Peligro
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            {showDeleteConfirm ? (
                                                <div className="space-y-4">
                                                    <Alert variant="destructive">
                                                        <AlertTriangle className="w-4 h-4" />
                                                        <AlertDescription>
                                                            ¿Estás seguro de que
                                                            deseas eliminar esta
                                                            asignatura? Esta
                                                            acción no se puede
                                                            deshacer.
                                                        </AlertDescription>
                                                    </Alert>
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() =>
                                                                setShowDeleteConfirm(
                                                                    false
                                                                )
                                                            }
                                                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                                            Confirmar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setShowDeleteConfirm(
                                                            true
                                                        )
                                                    }
                                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>
                                                        Eliminar Asignatura
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AsignaturaConfigPage;
