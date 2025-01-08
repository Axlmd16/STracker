import axios from "axios";

const AsignaturaApi = ({ getStore, getActions, setStore, api }) => ({
    getAsignaturas: async () => {
        const response = await api.get("/asignaturas");
        return response.data.data;
    },

    getAsignatura: async (id) => {
        const response = await api.get(`/asignaturas/${id}`);
        return response.data.data;
    },

    getDetalles: async (id) => {
        const response = await api.get(`/asignaturas/${id}/detalles`);
        return response.data;
    },

    //* Agregar estudiante a asignatura
    createStudentToSubject: async (id, data) => {
        const response = await api.post("/usuarios", data);
        if (response.status === 200) {
            const response2 = await api.post(`/asignaturas/${id}/estudiantes`, {
                id_estudiante: response.data.data.id,
            });
            return response2.data;
        }
    },

    updateEstudiante: async (id, data) => {
        const response = await api.put(`/usuarios/${id}`, data);
        return response.data;
    },

    quitarEstudianteAsignatura: async (id_asignatura, id_estudiante) => {
        console.log("Datos enviados al backend:", {
            estudiante_id: id_estudiante,
            asignatura_id: id_asignatura,
        });

        const response = await api.post(
            `/asignaturas/${id_asignatura}/estudiantes/${id_estudiante}`
        );

        return response.data;
    },

    createAsignatura: async (data) => {
        const response = await api.post("/asignaturas", data);
        return response.data;
    },

    //* Obtener estudiantes por asignatura
    getStudentsBySubject: async (id) => {
        const response = await api.get(`/asignaturas/${id}/estudiantes`);
        return response.data;
    },

    //* Asignaturas de un estudiante
    getAsignaturasEstudiante: async (id) => {
        const response = await api.get(`/asignaturas/estudiante/${id}`);
        return response.data.data;
    },
});

export default AsignaturaApi;
