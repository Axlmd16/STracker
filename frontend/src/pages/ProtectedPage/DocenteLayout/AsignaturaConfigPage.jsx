import {
    AlertTriangle,
    Book,
    BookOpen,
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
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { buttons_docente } from "../../../assets/ButtonsNav/BtnsSidebar";
import BreadCrumbs from "../../../components/Navigation/breadCrumbs";
import Sidebar from "../../../components/Navigation/Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ImputForm from "../../../components/Forms/Fields/ImputForm";
import SelectForm from "../../../components/Forms/Fields/SelectForm";

function AsignaturaConfigPage({ actions, store }) {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Aquí iría la lógica para guardar los cambios
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
            title: "Matemáticas Discretas",
            icon: GraduationCap,
        },
        {
            to: `/home/docente/asignatura/${id}/configuracion`,
            title: "Configuración",
            icon: Settings,
            active: true,
        },
    ];

    //* Constantes
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(true);
    const [asignatura, setAsignatura] = useState({});

    //* Funcion para obtener los datos de la asignatura
    useEffect(() => {
        const fetchAsignatura = async () => {
            try {
                const data = await actions.getAsignatura(id);
                setAsignatura(data);
                setValue("nombre", data.nombre);
                setValue("codigo", data.nombre);
                setValue("paralelo", data.paralelo);
                setValue("descripcion", data.descripcion);
                setValue("horas", data.nro_horas);
                setValue("fecha_inicio", data.fecha_inicio);
                setValue("fecha_fin", data.fecha_fin);
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
                {/* {loading ? ( */}
                {/* <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div> */}
                {/* ) : ( */}

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
                                        onClick={handleEdit}
                                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Editar</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Guardar</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Basic Information */}
                        <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-6 flex items-center">
                                <Book className="w-5 h-5 mr-2 text-gray-500" />
                                Información Básica
                            </h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 space-y-2">
                                    <ImputForm
                                        label="Nombre"
                                        name="nombre"
                                        register={register}
                                        errors={errors}
                                        clearErrors={clearErrors}
                                        icon={BookOpen}
                                        disabled={!isEditing}
                                    />
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
                                <div className="space-y-2">{/* zzz */}</div>
                                <div className="col-span-2">
                                    {/* <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Descripción
                                        </label>
                                        <textarea
                                            name="description"
                                            value={subjectData.description}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            className="w-full p-2 border rounded-lg bg-gray-50 disabled:opacity-75"
                                        />
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* Schedule and Hours */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                                    Horas Lectivas
                                </h2>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Total de Horas
                                    </label>
                                    <input
                                        type="number"
                                        name="hours"
                                        value={subjectData.hours}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 border rounded-lg bg-gray-50 disabled:opacity-75"
                                    />
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                    Fechas del Curso
                                </h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fecha de Inicio
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={subjectData.startDate}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full p-2 border rounded-lg bg-gray-50 disabled:opacity-75"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fecha de Finalización
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={subjectData.endDate}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full p-2 border rounded-lg bg-gray-50 disabled:opacity-75"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-6 text-red-600 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                    Zona de Peligro
                                </h2>
                                {showDeleteConfirm ? (
                                    <div className="space-y-4">
                                        {/* <Alert variant="destructive">
                                        <AlertTriangle className="w-4 h-4" />
                                        <AlertDescription>
                                            ¿Estás seguro de que deseas eliminar esta asignatura? Esta acción no se puede deshacer.
                                        </AlertDescription>
                                    </Alert> */}
                                        zzzz
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() =>
                                                    setShowDeleteConfirm(false)
                                                }
                                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setShowDeleteConfirm(true)
                                        }
                                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Eliminar Asignatura</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsignaturaConfigPage;
