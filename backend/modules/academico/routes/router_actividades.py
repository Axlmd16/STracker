
from fastapi import APIRouter, Form, HTTPException
from fastapi.params import Depends
from pydantic import ValidationError
from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.actividad_control import ActividadControl
from modules.academico.schemas.actividad_schema import ActividadCreate
from fastapi import UploadFile, File
import shutil
import os
import uuid


router_actividades = APIRouter(route_class=VerifyTokenRoute)

#* CRUD ACTIVIDADES ----------------------------------------------------------------------------------------------------

ac = ActividadControl()

#* Obtener todas las actividades
@router_actividades.get("/actividades/")
def get_actividades():
    actividades = ac.obtener_actividades()
    return {"message": "Todas las actividades", "data": actividades}

#* Actualizar estados
@router_actividades.post("/actividades/actualizar-estados")
def actualizar_estados():
    try:
        ac.actualizar_estados_actividades()
        return {"message": "Estados actualizados correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#* Obtener una actividad
@router_actividades.get("/actividades/{id}")
def get_actividad(id: int):
    response = ac.obtener_actividad(id)
    if not response:
        return HTTPException(status_code=404, detail="Actividad no encontrada")
    return {"message": f"Actividad con id: {id}", "data": response}

#* Crear actividad academica
@router_actividades.post("/actividades/")
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
        # Manejar el archivo si existe
        url_archivo = None
        if archivo:
            # Crear directorio si no existe
            UPLOAD_DIR = "uploads/actividades"
            os.makedirs(UPLOAD_DIR, exist_ok=True)
            
            # Generar nombre 
            extension = os.path.splitext(archivo.filename)[1]
            nuevo_nombre = f"{uuid.uuid4()}{extension}"
            ruta_archivo = os.path.join(UPLOAD_DIR, nuevo_nombre)
            
            # Guardar el archivo
            with open(ruta_archivo, "wb") as buffer:
                shutil.copyfileobj(archivo.file, buffer)
            
            # Guardar la URL relativa
            url_archivo = f"/uploads/actividades/{nuevo_nombre}"

        actividad_schema= ActividadCreate(
            titulo=titulo,
            descripcion=descripcion,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            asignatura_id=asignatura_id,
            tipo_actividad=tipo_actividad,
            url_archivo=url_archivo
        )
        
        # Crear la actividad
        response = ac.crear_actividad(actividad_schema)
        
        if response:
            return {"message": "Actividad creada correctamente", "data": response}
        else:
            raise HTTPException(status_code=400, detail="Error al crear la actividad")
            
    except ValidationError as err:
        error_msg = err.errors()[0].get('msg') if err.errors() else "Error de validación"
        raise HTTPException(status_code=422, detail=error_msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
    
#* Editar una actividad
@router_actividades.put("/actividades/{id}")
def editar_actividad(id: int, actividad):
    response = ac.actualizar_actividad(id, actividad)
    if not response:
        return HTTPException(status_code=404, detail="Actividad no encontrada")
    return {"message": f"Actividad con id: {id} actualizada correctamente", "data": response}