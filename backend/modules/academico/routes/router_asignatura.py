from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.asignatura_control import AsignaturaControl
from modules.academico.controllers.estudiante_asignatura_control import EstudianteAsignaturaControl
from modules.academico.schemas.asignatura_schema import AsignaturaCreate, AsignaturaResponse, AsignaturaUpdate, EstudianteAsignatura
from modules.academico.schemas.estudiante_asignatura_schema import EstudianteAsig, EstudianteAsignaturaBase
from modules.inicio_sesion.controllers.usuario_control import UsuarioControl


router_asignatura = APIRouter(route_class=VerifyTokenRoute)

uc = UsuarioControl()
ac = AsignaturaControl()
eac = EstudianteAsignaturaControl()

#* CRUD ASIGNATURAS ----------------------------------------------------------------------------------------------------
@router_asignatura.get("/asignaturas/", tags=["Aginaturas"])
def get_asignaturas():
    asignaturas = ac.obtener_asignaturas()
    return {"message": "All subjects", "data": asignaturas}

@router_asignatura.get("/asignaturas/{id}",  tags=["Aginaturas"])
def get_asignatura(id: int):
    response = ac.obtener_asignatura(id)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": f"Subject with id: {id}", "data": response}

#* Obtener mas detalles de la asignatura
@router_asignatura.get("/asignaturas/{id}/detalles",  tags=["Aginaturas"])
def get_asignatura_detalles(id: int):
    response = ac.obtener_detalles(id)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return JSONResponse(content=response, status_code=200)

@router_asignatura.post("/asignaturas/", tags=["Aginaturas"])
def guardar_asignatura(asignatura: AsignaturaCreate):
    
    try:
        response = ac.crear_asignatura(asignatura)
        if response:
            return {"message": "Subject created correctly", "data": response}
        else:
            raise HTTPException(status_code=400, detail="Error creating subject")
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router_asignatura.put("/asignaturas/{id}", response_model=AsignaturaResponse,  tags=["Aginaturas"])
def editar_asignatura(id: int, asignatura: AsignaturaUpdate):
    response = ac.actualizar_asignatura(id, asignatura)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": f"Subject with id: {id} updated correctly", "data": response}

@router_asignatura.delete("/asignaturas/{id}",  tags=["Aginaturas"])
def remover_asignatura(id: int):
    response = ac.eliminar_asignatura(id)
    if response:
        return {"message": f"Subject with id: {id} deleted correctly"}
    else:
        raise HTTPException(status_code=404, detail="Subject not found")
    
#* ESTUDIANTES EN ASIGNATURAS ----------------------------------------------------------------------------------------------------
@router_asignatura.post("/asignaturas/{id}/estudiantes/",  tags=["Aginaturas"])
def agregar_estudiante_asignatura(id: int, estudiante: EstudianteAsignatura):
    asignatura = ac.obtener_asignatura(id)
    estudiante = uc.obtener_usuario(estudiante.id_estudiante)
    
    if not asignatura:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    if not estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    
    response = eac.agregar_estudiante_a_asignatura(id, estudiante.id)
    if response:
        return {"status": 200, "message": "Estudiante agregado correctamente a la asignatura"}
    else:
        raise HTTPException(status_code=400, detail="Error al agregar estudiante a la asignatura")
    
@router_asignatura.delete("/asignaturas/{id}/estudiantes/{id_est}",  tags=["Aginaturas"])
def remover_estudiante_asignatura(id: int, id_est: int):
    
    asignatura = ac.obtener_asignatura(id)
    estudiante = uc.obtener_usuario(id_est)
    
    if not asignatura:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    if not estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    
    response = eac.quitar_estudiante_de_asignatura(asignatura.id, estudiante.id)
    
    if response == True:
        return {"status": 200, "message": "Estudiante eliminado de la asignatura correctamente"}


@router_asignatura.get("/asignaturas/{id}/estudiantes/",  tags=["Aginaturas"])
def obtener_estudiantes_asignatura(id: int):
    data = eac.obtener_estudiantes_en_asignatura(id)
    return JSONResponse(content=data, status_code=200)


#* Funcion para obtener las asignaturas de un estudiante
@router_asignatura.get("/asignaturas/estudiante/{id}",  tags=["Aginaturas"])
def obtener_asignaturas_estudiante(id: int):
    data = eac.obtener_asignaturas_estudiante(id)
    return {"message": f"Subjects for student with id: {id}", "data": data}


