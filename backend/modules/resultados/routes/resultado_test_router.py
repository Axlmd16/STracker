from fastapi import APIRouter, HTTPException
import datetime

from middlewares.verify_token_route import VerifyTokenRoute
from modules.academico.controllers.asignatura_control import AsignaturaControl
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from modules.resultados.controllers.resultado_test_controller import ResultadoTestControl
from modules.resultados.schemas.resultado_test_schema import IdRespuestaFormulario, RespuestaFormulario, ResultadoTestSchema, UpdateRetroalimentacionResultado
from modules.test_estres.controllers.asignacion_test_controller import AsignacionTestController
from redis import Redis


# router_resultados = APIRouter(route_class=VerifyTokenRoute)
router_resultados = APIRouter()
redis_client = Redis(host="localhost", port=6379, db=0)

#* CRUD RESULTADOS ----------------------------------------------------------------------------------------------------

rc = ResultadoTestControl()
ac = AsignacionTestController()
nc = NotificacionController()
asc = AsignaturaControl()

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
def recibir_respuesta(respuesta: RespuestaFormulario):
    id_unico = redis_client.get("id_unico")
    
    if id_unico is not None:
        id_unico = id_unico.decode("utf-8") 

    try:
            id_resultado = id_unico.split("-")[2]
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


@router_resultados.post("/redis/guardar-id-unico/")
async def guardar_id_unico(data: IdRespuestaFormulario):
    try:
        redis_client.setex(f"id_unico", 3600, data.id_unico)  
        return {"message": "ID único guardado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

    
#* Validar si el la asignacion ya fue realizada
@router_resultados.get("/resultados/{id}/validar", tags=["Resultados"])
def validar_resultado(id: int):
    resultado = rc.obtener_resultado_estudiante(id)
    if resultado is None:
        raise HTTPException(status_code=404, detail="Resultado no encontrado")
    
    if resultado.fecha_realizacion is not None:
        nc.notificar_usuario(resultado.estudiante_asignatura.asignatura.docente_id, "Test ya realizado", f"El estudiante ya completo el test", datetime.datetime.now())
            
        return {"message": "Resultado ya realizado", "data": True}
    
    return {"message": "Resultado aún no realizado", "data": False}

#* Obtener info de nivel de estres de la asignatura
@router_resultados.get("/resultados/asignatura/{asignatura_id}", tags=["Resultados"])
def get_info_estres_asignatura(asignatura_id: int):
    data = rc.obtener_niveles_estres_por_asignatura(asignatura_id)
    return {"message": "Niveles de estres por asignatura", "data": data}
         

@router_resultados.delete("/redis/eliminar-id-unico/")
async def eliminar_id_unico():
    try:
        redis_client.delete("id_unico")
        return {"message": "ID único eliminado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
@router_resultados.get("/redis/obtener-id-unico/")
async def obtener_id_unico():
    try:
        id_unico = redis_client.get("id_unico")
        if id_unico is None:
            return {"message": "ID único no encontrado"}
        return {"message": "ID único encontrado", "data": id_unico}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
    
#* Obtener historial de resultados de un estudiante de todas las asignaturas
@router_resultados.get("/resultados/estudiante/{estudiante_id}/historial", tags=["Resultados"])
def get_historial_resultados_estudiante(estudiante_id: int):
    #TODO: Optimizar la consulta para retornoar solo la info necesaria
    data = rc.obtener_resultados_por_estudiante(estudiante_id)
    return {"message": "Historial de resultados por estudiante", "data": data}

#* Actualizar el resultado para agregar la retroalimentacion
@router_resultados.put("/resultados/{id}/retroalimentacion", tags=["Resultados"])
def agregar_retroalimentacion_resultado(id: int, retroalimentacion: UpdateRetroalimentacionResultado):
   try:
       response = rc.agregar_retroalimentacion_resultado(id, retroalimentacion.retroalimentacion)
       if response:
           nc.notificar_usuario(rc.obtener_resultado(id).estudiante_asignatura.estudiante_id, "Retroalimentación agregada", f"Se ha agregado retroalimentación a tu nivel de estres", datetime.datetime.now())
           return {"message": "Retroalimentacion agregada correctamente"}
       else:
           raise HTTPException(status_code=404, detail="Resultado no encontrado")
   except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e)
    )
    