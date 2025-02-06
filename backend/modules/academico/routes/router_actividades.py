
from fastapi import APIRouter, Form, HTTPException
from fastapi.params import Depends
from pydantic import ValidationError
from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.actividad_control import ActividadControl
from modules.academico.controllers.asignatura_control import AsignaturaControl
from modules.academico.controllers.estudiante_asignatura_control import EstudianteAsignaturaControl
from modules.academico.controllers.utils.Utils import crear_actividad_academica, crear_asignacion, crear_resultados_para_estudiantes, generar_intervalos, obtener_estudiantes_en_asignatura
from modules.academico.schemas.actividad_schema import ActividadCreate
from fastapi import UploadFile, File
import shutil
import os
import uuid
import random

from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl
from modules.resultados.schemas.resultado_test_schema import ResultadoTestSchema
from modules.test_estres.controllers.asignacion_test_controller import AsignacionTestController
from modules.test_estres.controllers.test_estres_controller import TestEstresController
from modules.test_estres.schemas.asignacion_test_schema import AsignacionTestSchema


router_actividades = APIRouter(route_class=VerifyTokenRoute)
asignacion_controller = AsignacionTestController()
test_controller = TestEstresController()
rc = ResultadoTestControl()
eac = EstudianteAsignaturaControl()
ac = ActividadControl()


#* CRUD ACTIVIDADES ----------------------------------------------------------------------------------------------------


#* Obtener todas las actividades
@router_actividades.get("/actividades/", tags=["Actividades"])
def get_actividades():
    actividades = ac.obtener_actividades()
    return {"message": "Todas las actividades", "data": actividades}

#* Actualizar estados
@router_actividades.post("/actividades/actualizar-estados", tags=["Actividades"])
def actualizar_estados():
    try:
        ac.actualizar_estados_actividades()
        return {"message": "Estados actualizados correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#* Obtener una actividad
@router_actividades.get("/actividades/{id}", tags=["Actividades"])
def get_actividad(id: int):
    response = ac.obtener_actividad(id)
    if not response:
        return HTTPException(status_code=404, detail="Actividad no encontrada")
    return {"message": f"Actividad con id: {id}", "data": response}

#* Crear actividad academica
# @router_actividades.post("/actividades/", tags=["Actividades"])
# async def guardar_actividad(
#     titulo: str = Form(...),
#     descripcion: str = Form(...),
#     fecha_inicio: str = Form(...),
#     fecha_fin: str = Form(...),
#     asignatura_id: int = Form(...),
#     tipo_actividad: str = Form(...),
#     archivo: UploadFile = File(None),
# ):
#     try:
#         url_archivo = guardar_archivo(archivo) if archivo else None
#         actividad_schema = ActividadCreate(
#             titulo=titulo,
#             descripcion=descripcion,
#             fecha_inicio=fecha_inicio,
#             fecha_fin=fecha_fin,
#             asignatura_id=asignatura_id,
#             tipo_actividad=tipo_actividad,
#             url_archivo=url_archivo
#         )
        
#         response = ac.crear_actividad(actividad_schema)
        
#         if response:
#             return {"message": "Actividad creada correctamente", "data": response}
#         else:
#             raise HTTPException(status_code=400, detail="Error al crear la actividad")
            
#     except ValidationError as err:
#         error_msg = err.errors()[0].get('msg') if err.errors() else "Error de validación"
#         raise HTTPException(status_code=422, detail=error_msg)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")


@router_actividades.post("/actividades/", tags=["Actividades"])
async def guardar_actividad(
    titulo: str = Form(...),
    descripcion: str = Form(...),
    fecha_inicio: str = Form(...),
    fecha_fin: str = Form(...),
    asignatura_id: int = Form(...),
    tipo_actividad: str = Form(...),
    archivo: UploadFile = File(None),
):
    try:
        url_archivo = guardar_archivo(archivo) if archivo else None
        actividad = crear_actividad_academica(
            titulo, descripcion, fecha_inicio, fecha_fin, asignatura_id, tipo_actividad, url_archivo
        )
        asignacion = crear_asignacion(fecha_inicio, fecha_fin, titulo, asignatura_id)
        intervalos = generar_intervalos(fecha_inicio, fecha_fin)
        estudiantes = obtener_estudiantes_en_asignatura(asignatura_id)
        crear_resultados_para_estudiantes(estudiantes, asignacion.id, intervalos)

        return {
            "message": "Actividad, asignación y resultados creados correctamente",
            "data": actividad,
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")

    
#* Editar una actividad
@router_actividades.put("/actividades/{id}", tags=["Actividades"])
def editar_actividad(id: int, actividad):
    response = ac.actualizar_actividad(id, actividad)
    if not response:
        return HTTPException(status_code=404, detail="Actividad no encontrada")
    return {"message": f"Actividad con id: {id} actualizada correctamente", "data": response}


#* Obtener actividades para una asignatura
@router_actividades.get("/actividades_asignatura/{id}", tags=["Actividades"])
def get_asignaciones_por_asignatura(id: int):
    response = ac.obtener_actividades_por_asignatura(id)
    if response == None:
        raise HTTPException(status_code=404, detail="No existen actividades para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": response}



#* --------------------- FUNCIONES ---------------------
def guardar_archivo(archivo: UploadFile) -> str:
    UPLOAD_DIR = "uploads/actividades"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    extension = os.path.splitext(archivo.filename)[1]
    nuevo_nombre = f"{uuid.uuid4()}{extension}"
    ruta_archivo = os.path.join(UPLOAD_DIR, nuevo_nombre)
    
    with open(ruta_archivo, "wb") as buffer:
        shutil.copyfileobj(archivo.file, buffer)
    
    return f"/uploads/actividades/{nuevo_nombre}"