from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.asignatura_control import AsignaturaControl
from modules.academico.schemas.asignatura_schema import AsignaturaCreate, AsignaturaResponse, AsignaturaUpdate, EstudianteAsignatura
from modules.inicio_sesion.controllers.usuario_control import UsuarioControl


router_asignatura = APIRouter(route_class=VerifyTokenRoute)

uc = UsuarioControl()
ac = AsignaturaControl()

#* CRUD ASIGNATURAS ----------------------------------------------------------------------------------------------------
@router_asignatura.get("/asignaturas/")
def get_asignaturas():
    asignaturas = ac.obtener_asignaturas()
    return {"message": "All subjects", "data": asignaturas}

@router_asignatura.get("/asignaturas/{id}")
def get_asignatura(id: int):
    response = ac.obtener_asignatura(id)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": f"Subject with id: {id}", "data": response}

#* Obtener mas detalles de la asignatura
@router_asignatura.get("/asignaturas/{id}/detalles")
def get_asignatura_detalles(id: int):
    response = ac.obtener_detalles(id)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return JSONResponse(content=response, status_code=200)

@router_asignatura.post("/asignaturas/")
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
    

    
@router_asignatura.put("/asignaturas/{id}", response_model=AsignaturaResponse)
def editar_asignatura(id: int, asignatura: AsignaturaUpdate):
    response = ac.actualizar_asignatura(id, asignatura)
    if not response:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": f"Subject with id: {id} updated correctly", "data": response}

@router_asignatura.delete("/asignaturas/{id}")
def remover_asignatura(id: int):
    response = ac.eliminar_asignatura(id)
    if response:
        return {"message": f"Subject with id: {id} deleted correctly"}
    else:
        raise HTTPException(status_code=404, detail="Subject not found")
    
#* ESTUDIANTES EN ASIGNATURAS ----------------------------------------------------------------------------------------------------
@router_asignatura.post("/asignaturas/{id}/estudiantes/")
def agregar_estudiante_asignatura(id: int, estudiante: EstudianteAsignatura):
    response = ac.agregar_estudiante_asignatura(id, estudiante.id_estudiante)
    if response:
        return {"status": 200, "message": "Estudiante agregado correctamente a la asignatura"}
    
# @router_asignatura.delete("/asignaturas/{id}/estudiantes/")
# def remover_estudiante_asignatura(id: int, estudiante: EstudianteAsignatura):
#     response = ac.remover_estudiante_asignatura(id, estudiante.id_estudiante)
    
#     if response:
#         return {"status": 200, "message": "Estudiante removido correctamente de la asignatura"}

@router_asignatura.get("/asignaturas/{id}/estudiantes/")
def obtener_estudiantes_asignatura(id: int):
    data = ac.obtener_estudiantes_asignatura(id)
    return JSONResponse(content=data, status_code=200)


