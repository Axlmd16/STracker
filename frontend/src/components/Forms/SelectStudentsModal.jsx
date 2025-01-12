import { useEffect, useState } from "react";

const LargeStudentSelectorModal = ({
  actions,
  idAsignatura,
  setSelectedStudents,
  selectedStudents
}) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([...selectedStudents]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await actions.getStudentsBySubject(idAsignatura);
        setStudents(response);
      } catch (error) {
        console.error("Error al obtener estudiantes del grupo:", error);
      }
    };
    fetchStudents();
  }, [actions, idAsignatura]);

  const filteredStudents = students.filter((student) =>
    student.nombres.toLowerCase().includes(search.toLowerCase())
  );

  const addStudent = (student) => {
    if (!selected.some((s) => s.id === student.id)) {
      setSelected([...selected, student]);
    }
  };

  const removeStudent = (student) => {
    setSelected(selected.filter((s) => s.id !== student.id));
  };

  const handleSave = () => {
    setSelectedStudents(selected);
    setOpen(false);
  };

  useEffect(() => {
    setSelected(selectedStudents);
  }, [selectedStudents]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Seleccionar Estudiantes</h2>

            <div className="flex space-x-8">
              {/* Lista de estudiantes disponibles */}
              <div className="w-1/2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-4 overflow-auto">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Estudiantes Disponibles</h3>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Buscar estudiante"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <li
                      key={student.id}
                      className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all"
                      onClick={() => addStudent(student)}
                    >
                      <span className="text-gray-700 text-sm">{student.nombres} {student.apellidos}</span>
                      <button
                        onClick={() => addStudent(student)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-all text-xs"
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lista de estudiantes seleccionados */}
              <div className="w-1/2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-4 overflow-auto">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Estudiantes Seleccionados</h3>
                <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto">
                  {selected.map((student) => (
                    <li
                      key={student.id}
                      className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all"
                      onClick={() => removeStudent(student)}
                    >
                      <span className="text-gray-700 text-sm">{student.nombres} {student.apellidos}</span>
                      <button
                        onClick={() => removeStudent(student)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all text-xs"
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 transition-all text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-all text-sm"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm"
      >
        Agregar Participantes
      </button>
    </>
  );
};

export default LargeStudentSelectorModal;
