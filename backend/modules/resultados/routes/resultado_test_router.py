from fastapi import APIRouter, HTTPException
import datetime

from middlewares.verify_token_route import VerifyTokenRoute
from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl
from modules.resultados.schemas.resultado_test_schema import RespuestaFormulario, ResultadoTestSchema
from modules.test_estres.controllers.asignacion_test_controller import AsignacionTestController


# router_resultados = APIRouter(route_class=VerifyTokenRoute)
router_resultados = APIRouter()

#* CRUD RESULTADOS ----------------------------------------------------------------------------------------------------

rc = ResultadoTestControl()
ac = AsignacionTestController()

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

#* Obtener resultados del test desde el formulario
@router_resultados.post("/respuestas/formulario/", tags=["Resultados"])
async def recibir_respuesta(respuesta: RespuestaFormulario):
    try:
        id_resultado = respuesta.id_unico.split("-")[2]
        resultado = rc.obtener_resultado(int(id_resultado))
        
        if not resultado:
            raise HTTPException(status_code=404, detail="Result not found")
        
        data_nueva = ResultadoTestSchema(
            fecha_realizacion=datetime.datetime.now(),
            resultado=respuesta.puntuacion,
            estudiante_asignatura_id=resultado.estudiante_asignatura_id,
            asignacion_id=resultado.asignacion_id
        )
        
        response = rc.actualizar_resultado(int(id_resultado), data_nueva)
        
        if response == None:
            raise HTTPException(status_code=500, detail="Error al actualizar el resultado")

        return {"message": "Respuesta recibida correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar la respuesta: {e}")
    
    
#* Validar si el la asignacion ya fue realizada
@router_resultados.get("/resultados/{id}/validar", tags=["Resultados"])
def validar_resultado(id: int):
    resultado = rc.obtener_resultado(id)
    if resultado is None:
        raise HTTPException(status_code=404, detail="Resultado no encontrado")
    
    if resultado.fecha_realizacion is not None:
        return {"message": "Resultado ya realizado", "data": True}
    
    return {"message": "Resultado aún no realizado", "data": False}

#* Obtener info de nivel de estres de la asignatura
@router_resultados.get("/resultados/asignatura/{asignatura_id}", tags=["Resultados"])
def get_info_estres_asignatura(asignatura_id: int):
    data = rc.obtener_niveles_estres_por_asignatura(asignatura_id)
    return {"message": "Niveles de estres por asignatura", "data": data}
         