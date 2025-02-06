from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import text
from core.database import DatabaseEngine
from models.Notificacion import Notificacion
import colorama
import os

from models.Usuario import Usuario


class NotificacionController:
    def __init__(self):
        pass

    def obtener_todas_notificaciones(self):
        with DatabaseEngine.get_session() as db:
            return db.query(Notificacion).all()

    def obtener_notificaciones_por_usuario(self, usuario_id):
        with DatabaseEngine.get_session() as db:
            return db.query(Notificacion).filter(Notificacion.usuario_id == usuario_id).all()

    def obtener_estudiante_para_notificacion(self, estudiante_asignatura_id: int):
        with DatabaseEngine.get_session() as db:
            estudiante_asignatura = db.execute(
                text("SELECT estudiante_id FROM estudiante_asignatura WHERE id = :estudiante_asignatura_id"),
                {"estudiante_asignatura_id": estudiante_asignatura_id}
            ).fetchone()

            if not estudiante_asignatura:
                raise HTTPException(status_code=404, detail="Estudiante asignatura no encontrado")

            estudiante_id = estudiante_asignatura[0]

            usuario = db.execute(
                text("SELECT * FROM usuario WHERE id = :estudiante_id"),
                {"estudiante_id": estudiante_id}
            ).fetchone()

            if not usuario:
                raise HTTPException(status_code=404, detail="Usuario no encontrado para este estudiante")

            return {
                "id": usuario[0],
                "nombres": usuario[1],
                "apellidos": usuario[2],
                "email": usuario[3],
            }

    def crear_notificacion_estudiante(self, estudiante_asignatura_id, titulo, nombre_asignatura):
        with DatabaseEngine.get_session() as db:
            estudiante = self.obtener_estudiante_para_notificacion(estudiante_asignatura_id)
            mensaje = f"Estimado estudiante {estudiante["nombres"]} {estudiante["apellidos"]}\nEn la asignatura '{nombre_asignatura}' hay un nuevo test disponible para realizar. No pierdas la oportunidad de completarlo dentro del plazo establecido."
            notificacion = Notificacion(titulo=titulo, mensaje=mensaje, fecha=datetime.now(), usuario_id=estudiante["id"])
            email = estudiante["email"]
            info_notificacion = [notificacion.titulo, notificacion.mensaje, email]
            db.add(notificacion)
            db.commit()
            db.refresh(notificacion)
            return info_notificacion

    #* Para recuperar contraseñas
    def verificar_usuario(self, email: str, cedula: str):
        with DatabaseEngine.get_session() as db:
            usuario = db.execute(
                text("SELECT * FROM usuario WHERE email = :email AND cedula = :cedula"),
                {"email": email, "cedula": cedula}
            ).fetchone()

            if not usuario:
                return None

            return {
                "id": usuario[0],
            }

    def notificar_usuario(self, user_id, titulo, mensaje, fecha):
        with DatabaseEngine.get_session() as db:
            docente = db.query(Usuario).filter(Usuario.id == user_id).first()
            if not docente:
                raise HTTPException(status_code=404, detail="Docente no encontrado")
            notificacion = Notificacion(titulo=titulo, mensaje=mensaje, fecha=fecha, usuario_id=user_id)
            db.add(notificacion)
            db.commit()
            db.refresh(notificacion)
            return notificacion

