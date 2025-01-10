import { ClipboardList, GraduationCap, HomeIcon, LibraryBig, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaUserGraduate, FaUsers } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { buttons_docente } from '../assets/ButtonsNav/BtnsSidebar';
import BreadCrumbs from '../components/Navigation/breadCrumbs';
import Sidebar from '../components/Navigation/Sidebar';

function GroupDetails({ actions, store }) {
    const { id, idAsignatura } = useParams();
    const [group, setGroup] = useState(null);
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);  
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [warningMessage, setWarningMessage] = useState(''); 

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                setLoading(true);
                const groupData = await actions.getGroup(id);
                setGroup(groupData);

                const studentsData = await actions.getStudentsForGroup(id);
                setStudents(studentsData);

                const allStudentsData = await actions.getStudentsBySubject(idAsignatura);
                setAllStudents(allStudentsData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching group details:", error);
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [id, actions, idAsignatura]);

    const availableStudents = allStudents.filter(
        (student) => !students.some((assignedStudent) => assignedStudent.id === student.id)
    );

    const handleToggleSelectStudent = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]); 
        }
    };

    const handleAddStudents = async () => {
        try {
            if (selectedStudents.length === 0) {
                console.error("No hay estudiantes seleccionados");
                return;
            }

            for (let studentId of selectedStudents) {
                await actions.addStudentToGroup(studentId, group.id);
            }

            const updatedStudents = await actions.getStudentsForGroup(id);
            setStudents(updatedStudents);
            setSelectedStudents([]); 
            setModalOpen(false); 
        } catch (error) {
            console.error("Error adding students:", error);
        }
    };

    const handleRemoveStudent = async (studentId, groupId) => {
        if (students.length === 2) {
            setWarningMessage('Debes tener al menos dos estudiantes en el grupo');
            setTimeout(() => {
                setWarningMessage('');
            }, 5000); 
            return;
        }

        try {
            await actions.removeStudentFromGroup(studentId, groupId);
            const updatedStudents = await actions.getStudentsForGroup(id);
            setStudents(updatedStudents);
        } catch (error) {
            console.error("Error removing student:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const breadcrumbItems = [
        {
            to: "/home/docente",
            title: "Inicio",
            icon: HomeIcon,
        },
        {
            to: `/home/docente`,
            title: "Asignaturas",
            icon: LibraryBig,
        },
        {
            to: `/home/docente/asignatura/${id}`,
            title: "Base de datos",
            icon: GraduationCap,
        },
        {
            to: `/home/docente/asignatura/${id}/grupos`,
            title: "Gestión de grupos",
            icon: ClipboardList,
            active: true,
        },
        {
            to: ``,
            title: "Detalles del Grupo",
            icon: ClipboardList,
            active: true,
        },
    ];

    return (
        <div>
            <div className="fixed left-0 top-16 h-full bg-gray-800">
                <Sidebar buttons={buttons_docente} id={+idAsignatura} />
            </div>

            <div className="px-10">
                <div className="flex flex-col h-full">
                    {/* Breadcrumbs */}
                    <div className="px-6 py-3 flex items-center space-x-2 text-sm text-gray-600 border-b">
                        <BreadCrumbs items={breadcrumbItems} />
                    </div>
                    <p className="pb-3"></p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-2xl transition-all hover:shadow-3xl">
                <h1 className="text-5xl font-bold text-center text-gray-900 mb-6">Detalles del Grupo</h1>

                {group ? (
                    <div className="space-y-8">
                        {/* Tarjeta de grupo */}
                        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-cyan-500 p-6 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-4">
                                <FaUsers className="text-4xl text-white" />
                                <div>
                                    <h2 className="text-3xl font-semibold text-white">{group.nombre}</h2>
                                    <p className="mt-2 text-lg text-white">{group.nro_estudiantes} Estudiantes</p>
                                </div>
                            </div>
                        </div>

                        {/* Mostrar el mensaje de advertencia */}
                        {warningMessage && (
                            <div className="bg-red-500 text-white p-4 rounded-md mt-4 text-center">
                                {warningMessage}
                            </div>
                        )}

                        {/* Estudiantes */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                                <FaUserGraduate className="text-2xl text-blue-600" />
                                <span>Estudiantes del Grupo</span>
                            </h3>
                            <ul className="mt-4 space-y-4">
                                {students.map((student) => (
                                    <li
                                        key={student.id}
                                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:bg-blue-50"
                                    >
                                        <div className="text-lg text-gray-700 font-semibold">
                                            {student.nombres} {student.apellidos}
                                        </div>
                                        <div className="text-sm text-gray-500">{student.correo}</div>
                                        <button
                                            onClick={() => handleRemoveStudent(student.id, group.id)}
                                            className="btn-custom btn-custom-warning"
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Botón para abrir el modal */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setModalOpen(true);
                                    setSelectedStudents([]); // Limpiar la selección al abrir el modal
                                }}
                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm"
                            >
                                Agregar Estudiantes
                            </button>
                        </div>

                        {/* Modal para seleccionar estudiantes */}
                        {modalOpen && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
                                <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg relative">
                                    {/* Botón X para cerrar el modal */}
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
                                    >
                                        &times;
                                    </button>

                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Seleccionar Estudiantes</h2>
                                    <div className="space-y-4">
                                        {/* Lista de estudiantes disponibles */}
                                        <ul className="space-y-3">
                                            {availableStudents.map((student) => (
                                                <li
                                                    key={student.id}
                                                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${selectedStudents.includes(student.id) ? 'bg-blue-100' : 'bg-white'}`}
                                                    onClick={() => handleToggleSelectStudent(student.id)}
                                                >
                                                    <div>{student.nombres} {student.apellidos}</div>
                                                    <div className="text-sm">{selectedStudents.includes(student.id) ? 'Seleccionado' : 'Seleccionar'}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={handleAddStudents}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
                                        >
                                            Agregar Estudiantes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Grupo no encontrado</p>
                )}
            </div>
        </div>
    );
}

export default GroupDetails;
