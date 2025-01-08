from fastapi import APIRouter, HTTPException

from middlewares.verify_token_route import VerifyTokenRoute
from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl


router_resultados = APIRouter(route_class=VerifyTokenRoute)

#* CRUD RESULTADOS ----------------------------------------------------------------------------------------------------

rc = ResultadoTestControl()

#* Obtener todos los resultados
@router_resultados.get("/resultados/", tags=["Resultados"])
def get_resultados():
    resultados = rc.obtener_resultados()
    return {"message": "All results", "data": resultados}

#* Obtener un resultado
@router_resultados.get("/resultados/{id}", tags=["Resultados"])
def get_resultado(id: int):
    response = rc.obtener_resultado(id)
    if not response:
        return HTTPException(status_code=404, detail="Result not found")
    return {"message": f"Result with id: {id}", "data": response}

#* Crear resultado
@router_resultados.post("/resultados/", tags=["Resultados"])
def guardar_resultado(resultado):
    try:
        response = rc.crear_resultado(resultado)
        return {"message": "Result created correctly", "data": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#* Actualizar resultado
@router_resultados.put("/resultados/{id}", tags=["Resultados"])
def editar_resultado(id: int, resultado):
    response = rc.actualizar_resultado(id, resultado)
    if not response:
        return HTTPException(status_code=404, detail="Result not found")
    return {"message": f"Result with id: {id} updated correctly", "data": response}

#* Eliminar resultado
@router_resultados.delete("/resultados/{id}", tags=["Resultados"])
def remover_resultado(id: int):
    response = rc.eliminar_resultado(id)
    if response:
        return {"message": f"Result with id: {id} deleted correctly"}
    else:
        return HTTPException(status_code=404, detail="Result not found")
    
#* Obtener resultados por estudiante
@router_resultados.get("/resultados/estudiante/{estudiante_id}", tags=["Resultados"])
def get_resultados_por_estudiante(estudiante_id: int):
    resultados = rc.obtener_resultados_por_estudiante(estudiante_id)
    return {"message": f"Results for student with id: {estudiante_id}", "data": resultados}