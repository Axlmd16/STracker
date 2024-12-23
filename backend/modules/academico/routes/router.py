from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.asignatura_control import AsignaturaControl
from modules.academico.schemas.asignatura_schema import AsignaturaCreate, AsignaturaResponse, AsignaturaUpdate
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

@router_asignatura.post("/asignaturas/", response_model=AsignaturaResponse)
def guardar_asignatura(asignatura: AsignaturaCreate):
    try:
        response = ac.crear_asignatura(asignatura)
        return {"message": "Subject created correctly", "data": response}
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
    
@router_asignatura.post("/asignaturas/agregar_estudiante/{id_asignatura}/{id_estudiante}")
def agregar_estudiante_asignatura(id_asignatura: int, id_estudiante: int):
    response = ac.agregar_estudiante_asignatura(id_asignatura, id_estudiante)
    if response == True:
        return {"message": f"Estudiante con id: {id_estudiante} agregado a la asignatura con id: {id_asignatura}"}
    else:
        raise HTTPException(status_code=404, detail="Estudiante o asignatura no encontrada")
    
