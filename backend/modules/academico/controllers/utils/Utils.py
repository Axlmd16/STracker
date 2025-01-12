from datetime import datetime, timedelta
from fastapi import Form, UploadFile, File, HTTPException

from modules.academico.controllers.actividad_control import ActividadControl
from modules.academico.controllers.estudiante_asignatura_control import EstudianteAsignaturaControl
from modules.academico.schemas.actividad_schema import ActividadCreate
from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl
from modules.resultados.schemas.resultado_test_schema import ResultadoTestSchema
from modules.test_estres.controllers.asignacion_test_controller import AsignacionTestController
from modules.test_estres.controllers.test_estres_controller import TestEstresController
from modules.test_estres.schemas.asignacion_test_schema import AsignacionTestSchema


asignacion_controller = AsignacionTestController()
test_controller = TestEstresController()
rc = ResultadoTestControl()
eac = EstudianteAsignaturaControl()
ac = ActividadControl()

# Función para dividir el rango de fechas en intervalos de 3 días
def generar_intervalos(fecha_inicio: str, fecha_fin: str, dias_intervalo: int = 3):
    formato = "%Y-%m-%dT%H:%M" if "T" in fecha_inicio else "%Y-%m-%d"
    inicio = datetime.strptime(fecha_inicio, formato)
    fin = datetime.strptime(fecha_fin, formato)
    intervalos = []

    while inicio <= fin:
        intervalos.append(inicio)
        inicio += timedelta(days=dias_intervalo)
    return intervalos


# Función para crear una actividad académica
def crear_actividad_academica(
    titulo, descripcion, fecha_inicio, fecha_fin, asignatura_id, tipo_actividad, url_archivo
):
    actividad_schema = ActividadCreate(
        titulo=titulo,
        descripcion=descripcion,
        fecha_inicio=fecha_inicio,
        fecha_fin=fecha_fin,
        asignatura_id=asignatura_id,
        tipo_actividad=tipo_actividad,
        url_archivo=url_archivo,
    )
    return ac.crear_actividad(actividad_schema)

# Función para crear una asignación
def crear_asignacion(fecha_inicio, fecha_fin, titulo, asignatura_id):
    asignacion_schema = AsignacionTestSchema(
        fecha_asignacion=fecha_inicio,
        fecha_limite=fecha_fin,
        descripcion=f"Evaluación de estrés para la actividad: {titulo}",
        test_id=test_controller.ramdon_id_test(),
        asignatura_id=asignatura_id,
    )
    return asignacion_controller.crear_asignacion(asignacion_schema)

# Función para obtener estudiantes en una asignatura
def obtener_estudiantes_en_asignatura(asignatura_id):
    return eac.obtener_estudiantes_en_asignatura(asignatura_id)

# Función para crear resultados para cada estudiante y cada intervalo
def crear_resultados_para_estudiantes(estudiantes, asignacion_id, intervalos):
    print(f"Estudiantes: {estudiantes}")    
    for estudiante in estudiantes:
        for intervalo in intervalos:
            resultado_schema = ResultadoTestSchema(
                estudiante_asignatura_id=estudiante["estudiante_asignatura_id"],  # Cambio aquí
                asignacion_id=asignacion_id,
            )
            rc.crear_resultado(resultado_schema)

