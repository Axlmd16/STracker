from fastapi import APIRouter, HTTPException
from ..controllers.asignacion_test_controller import AsignacionTestController
from ..schemas.asignacion_test_schema import AsignacionTestSchema

router_asignacion_test = APIRouter()
asignacion_controller = AsignacionTestController()

@router_asignacion_test.get("/asignacion_test/", tags=["Asignacion Test"])
def get_asignaciones():
    all_asignaciones = asignacion_controller.obtener_all_asignaciones()
    return {"message": "All asignaciones", "data": all_asignaciones}

@router_asignacion_test.get("/asignacion_test/{id}", tags=["Asignacion Test"])
def get_asignacion(id: int):
    asignacion = asignacion_controller.obtener_asignacion(id)
    if not asignacion:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada")
    return {"message": "Asignacion test", "data": asignacion}

@router_asignacion_test.post("/asignacion_test/", tags=["Asignacion Test"])
def crear_asignacion(asignacion: AsignacionTestSchema):
    asignacion_creada = asignacion_controller.crear_asignacion(asignacion)
    return {"message": "Asignacion test creada", "data": asignacion_creada}

@router_asignacion_test.put("/asignacion_test/{id}", tags=["Asignacion Test"])
def modificar_asignacion(id: int, asignacion: AsignacionTestSchema):
    asignacion_modificada = asignacion_controller.modificar_asignacion(id, asignacion)
    if not asignacion_modificada:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada para modificar")
    return {"message": "Asignacion test modificada", "data": asignacion_modificada}

@router_asignacion_test.delete("/asignacion_test/{id}", tags=["Asignacion Test"])
def eliminar_asignacion(id: int):
    asignacion_eliminada = asignacion_controller.eliminar_asignacion(id)
    if not asignacion_eliminada:
        raise HTTPException(status_code=404, detail="AsignacionTest no encontrada para eliminar")
    return {"message": "Asignacion test eliminada", "data": asignacion_eliminada}

@router_asignacion_test.get("/asignacion_test/asignatura/{asignatura_id}", tags=["Asignacion Test"])
def get_asignaciones_por_asignatura(asignatura_id: int):
    asignaciones = asignacion_controller.obtener_asignaciones_por_asignatura(asignatura_id)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}

@router_asignacion_test.get("/asignaciones_estudiantes/{id_estudiante}", tags=["Asignacion Test"])
def get_asignaciones_para_estudiante(id_estudiante: int):
    asignaciones = asignacion_controller.obtener_asignaciones_para_estudiantes(id_estudiante)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para este estudiante")
    return {"message": "Asignaciones para el estudiante", "data": asignaciones}

#! Nota: Esto debo cambiarlo en otro archivo
@router_asignacion_test.get("/grupo/asignatura/{asignatura_id}", tags=["Grupos"])
def get_grupos_por_asignatura(asignatura_id: int):
    asignaciones = asignacion_controller.obtener_grupos_por_asignatura(asignatura_id)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}

#! Nota: Esto debo cambiarlo en otro archivo
@router_asignacion_test.get("/actividades/asignatura/{asignatura_id}", tags=["Actividades"])
def get_asignaciones_por_asignatura(asignatura_id: int):
    asignaciones = asignacion_controller.obtener_actividades_por_asignatura(asignatura_id)
    if not asignaciones:
        raise HTTPException(status_code=404, detail="No se encontraron asignaciones para esta asignatura")
    return {"message": "Asignaciones para la asignatura", "data": asignaciones}