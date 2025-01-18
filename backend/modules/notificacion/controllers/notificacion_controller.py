from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import text
from core.database import DatabaseEngine
from models.Notificacion import Notificacion
import os

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
                "telefono": usuario[4],
            }

    def crear_notificacion(self, estudiante_asignatura_id, titulo, mensaje):
        with DatabaseEngine.get_session() as db:
            estudiante = self.obtener_estudiante_para_notificacion(estudiante_asignatura_id)

            notificacion = Notificacion(titulo=titulo, mensaje=mensaje, fecha=datetime.now(), usuario_id=estudiante["id"])
            db.add(notificacion)
            db.commit()
            db.refresh(notificacion)
            numero_estudiante = f"+{estudiante['telefono']}"
            self.enviar_notificacion(numero_estudiante, mensaje) #TODO: Terminar de implementar enviar_notificaciones a wahtsapp
            return notificacion

    def enviar_notificacion(self, numero_estudiante, mensaje):
        pass
