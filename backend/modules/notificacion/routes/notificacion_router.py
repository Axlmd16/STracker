from fastapi import APIRouter, HTTPException
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from modules.notificacion.schemas.notificacio_schema import NotificacionResultadoSchema, NotificacionSchema

router_notificaciones = APIRouter()
notificaciones_controller = NotificacionController()

# @router_notificaciones.get("/notificaciones", tags=["Notificaciones"])
# def get_notificaciones():
#     todas_notificaciones = notificaciones_controller.obtener_todas_notificaciones()
#     return {"message": "Todas las notificaciones", "data": todas_notificaciones}

@router_notificaciones.get("/notificaciones/usuario/{id}", tags=["Notificaciones"])
def prueba(id: int):
    notificaciones_usuario = notificaciones_controller.obtener_notificaciones_por_usuario(id)
    return {"message": "Notificaciones del usuario", "data": notificaciones_usuario}

@router_notificaciones.post("/notificaciones/{id}/{titulo}/{mensaje}", tags=["Notificaciones"])
def prueba(id: int, titulo: str, mensaje: str):
    notificaion = notificaciones_controller.crear_notificacion(id, titulo, mensaje)
    return notificaion

@router_notificaciones.post("/notificaciones/", tags=["Notificaciones"])
def guardar_notificacion(notificacion: NotificacionSchema):
    notificacion = notificaciones_controller.crear_notificacion(notificacion)
    return notificacion
