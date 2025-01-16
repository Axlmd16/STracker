from fastapi import APIRouter, HTTPException
from ..schemas.recomendacion_schema import RecomendacionSchema
from middlewares.verify_token_route import VerifyTokenRoute
from modules.test_estres.controllers.recomendaciones_controllers import RecomendacionesController

# router_recomendaciones = APIRouter(route_class=VerifyTokenRoute)
router_recomendaciones = APIRouter()
recomendaciones_controller = RecomendacionesController()

@router_recomendaciones.get('/recomendaciones', tags=['Recomendaciones'])
def obtener_recomendaciones():
    todas_recomendaciones = recomendaciones_controller.obtener_recomendaciones()
    return {'mensaje': 'Todas las recomendaciones', 'data': todas_recomendaciones}

@router_recomendaciones.get('/recomendaciones/{id}', tags=['Recomendaciones'])
def obtener_recomendacion(id: int):
    recomendacion = recomendaciones_controller.obtener_recomendacion_por_id(id)
    if not recomendacion:
        raise HTTPException(status_code=404, detail="Recomendacion no encontrada")
    return {"message": "Recomendacion encontrada", "data": recomendacion}

@router_recomendaciones.post('/recomendaciones', tags=['Recomendaciones'])
def crear_recomendacion(recomendacion: RecomendacionSchema):
    nueva_recomendacion = recomendaciones_controller.crear_recomendacion(recomendacion)
    return {"message": "Recomendacion creada", "data": nueva_recomendacion}

@router_recomendaciones.put('/recomendaciones/{id}', tags=['Recomendaciones'])
def modificar_recomendacion(id: int, recomendacion: RecomendacionSchema):
    recomendacion_modificada = recomendaciones_controller.modificar_recomendacion(id, recomendacion)
    if not recomendacion_modificada:
        raise HTTPException(status_code=404, detail="Recomendacion no encontrada para modificar")
    return {"message": "Recomendacion modificada", "data": recomendacion_modificada}

@router_recomendaciones.delete('/recomendaciones/{id}', tags=['Recomendaciones'])
def eliminar_recomendacion(id: int):
    recomendacion_eliminada = recomendaciones_controller.eliminar_recomendacion(id)
    if not recomendacion_eliminada:
        raise HTTPException(status_code=404, detail="Recomendacion no encontrada para eliminar")
    return {"message": "Recomendacion eliminada", "data": recomendacion_eliminada}

@router_recomendaciones.post('/recomendaciones/test/{id_recomendacion}/{id_test}', tags=['Recomendaciones'])
def crear_recomendacion_test(id_recomendacion: int, id_test: int):
    print(f"\n\n\n\n\nid recomendacion: {id_recomendacion}, id test: {id_test}")
    recomendacion_test = recomendaciones_controller.crear_recomendacion_test(id_recomendacion, id_test)
    if recomendacion_test:
        return {"message": "Registro creado en recomendacion_test", "data": recomendacion_test}
    else:
        raise HTTPException(status_code=404, detail="Recomendación o Test no encontrados")

@router_recomendaciones.delete('/recomendaciones/test/{id_recomendacion}/{id_test}', tags=['Recomendaciones'])
def eliminar_recomendacion_test(id_recomendacion: int, id_test: int):
    eliminado = recomendaciones_controller.eliminar_recomendacion_test(id_recomendacion, id_test)
    if eliminado:
        return {"message": "Registro eliminado de recomendacion_test"}
    else:
        raise HTTPException(status_code=404, detail="No se encontró el registro para eliminar")

@router_recomendaciones.get('/recomendaciones/test/{id_test}', tags=['Recomendaciones'])
def obtener_recomendaciones_por_test(id_test: int):
    recomendaciones = recomendaciones_controller.obtener_recomendaciones_por_test(id_test)
    return {"message": "Recomendaciones encontradas", "data": recomendaciones}

@router_recomendaciones.get('/recomendaciones/prioridad/{prioridad}', tags=['Recomendaciones'])
def obtener_recomendaciones_por_prioridad(prioridad: int):
    recomendaciones = recomendaciones_controller.obtener_recomendaciones_por_prioridad(prioridad)
    return {"message": "Recomendaciones encontradas", "data": recomendaciones}