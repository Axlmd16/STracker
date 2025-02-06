from fastapi import APIRouter, HTTPException
from modules.notificacion.controllers.notificacion_controller import NotificacionController
from modules.notificacion.schemas.notificacio_schema import NotificacionSchema
from modules.inicio_sesion.controllers.cuenta_control import CuentaControl
from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv


load_dotenv('.env')

router_notificaciones = APIRouter()
notificaciones_controller = NotificacionController()


@router_notificaciones.get("/notificaciones/usuario/{id}", tags=["Notificaciones"])
def prueba(id: int):
    notificaciones_usuario = notificaciones_controller.obtener_notificaciones_por_usuario(id)
    return {"message": "Notificaciones del usuario", "data": notificaciones_usuario}

@router_notificaciones.post("/notificaciones/{id}/{titulo}/{mensaje}", tags=["Notificaciones"])
def prueba(id: int, titulo: str, mensaje: str):
    notificaion = notificaciones_controller.crear_notificacion(id, titulo, mensaje)
    return notificaion
