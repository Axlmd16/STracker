import React, { useState, useEffect } from "react";
import { Search, User, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";

const StudentSearch = ({ actions, store, id }) => {
    const [estudiantes, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await actions.getStudentsAvailable(id);
                setData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al cargar los estudiantes", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions, id]);

    const filteredStudents = estudiantes.filter((student) => {
        const fullName = `${student.nombres} ${student.apellidos}`;
        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.cedula.includes(searchTerm)
        );
    });

    const handleStudentToggle = (student) => {
        setSelectedStudents((prev) => {
            const isSelected = prev.find((s) => s.id === student.id);
            if (isSelected) {
                return prev.filter((s) => s.id !== student.id);
            } else {
                return [...prev, student];
            }
        });
    };

    const removeSelectedStudent = (studentId) => {
        setSelectedStudents((prev) => prev.filter((s) => s.id !== studentId));
    };

    const handleAddStudents = async (students) => {
        try {
            console.log("Agregando estudiantes", students);
            console.log("ID de la asignatura", id);

            // Mostrar un mensaje de carga mientras se procesan las solicitudes
            toast.promise(actions.addStudentsToSubject(id, students), {
                loading: "Agregando estudiantes...",
                success: "Estudiantes agregados correctamente",
                error: "Error al agregar estudiantes",
            });
        } catch (error) {
            console.error("Error al agregar estudiantes", error);
            toast.error("Error al agregar estudiantes");
        }
    };

    return (
        <div className="w-full mt-6">
            {loading ? (
                <div className="w-full h-24 flex items-center justify-center">
                    <div className="loading loading-spinner loading-md text-primary"></div>
                </div>
            ) : (
                <>
                    {/* Sección de búsqueda */}
                    <div className="relative my-4">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar por cédula o nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-sm w-full pl-8"
                        />
                    </div>

                    {/* Lista de estudiantes seleccionados */}
                    {selectedStudents.length > 0 && (
                        <div className="p-2 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">
                                Estudiantes seleccionados:
                            </h3>
                            <div className="flex flex-wrap gap-2 my-4">
                                {selectedStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="badge bg-green-200 gap-2 shadow-md border-none"
                                    >
                                        <User className="h-3 w-3" />
                                        <span>
                                            {student.nombres}{" "}
                                            {student.apellidos}
                                        </span>
                                        <button
                                            onClick={() =>
                                                removeSelectedStudent(
                                                    student.id
                                                )
                                            }
                                            className="hover:text-error"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lista de estudiantes filtrados */}
                    <div className="h-64 overflow-auto border border-base-300 rounded-lg">
                        <div className="p-4 space-y-2">
                            {filteredStudents.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg"
                                >
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={selectedStudents.some(
                                                (s) => s.id === student.id
                                            )}
                                            onChange={() =>
                                                handleStudentToggle(student)
                                            }
                                        />
                                        <div>
                                            <p className="text-sm font-medium">
                                                {student.nombres}{" "}
                                                {student.apellidos}
                                            </p>
                                            <p className="text-sm text-base-content/70">
                                                CI: {student.cedula}
                                            </p>
                                            <p className="text-xs text-base-content/70">
                                                {student.asignatura}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredStudents.length === 0 && (
                                <div className="text-center py-4 text-base-content/70">
                                    No se encontraron estudiantes
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botón de agregar estudiantes */}
                    <div className="flex justify-center mt-6">
                        <button
                            className={`btn bg-blue-200 rounded-md btn-sm shadow-md border-none${
                                selectedStudents.length === 0
                                    ? " btn-disabled"
                                    : ""
                            }`}
                            onClick={() => handleAddStudents(selectedStudents)}
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            <span className="font-medium text-blue-950">
                                Agregar {selectedStudents.length} estudiante
                                {selectedStudents.length !== 1 ? "s" : ""} a la
                                asignatura
                            </span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentSearch;
