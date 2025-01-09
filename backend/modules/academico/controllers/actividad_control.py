from datetime import datetime
from sqlalchemy import and_
from models.ActividadAcademica import ActividadAcademica, EstadoActividadEnum
from core.database import SessionLocal


class ActividadControl:
    def __init__(self):
        pass   
    
    def actualizar_estados_actividades(self):
        with SessionLocal() as db:
            fecha_actual = datetime.now()
            
            # Actualizar a EN_PROGRESO
            db.query(ActividadAcademica).filter(
                and_(
                    ActividadAcademica.estado == EstadoActividadEnum.PENDIENTE,
                    ActividadAcademica.fecha_inicio <= fecha_actual,
                    ActividadAcademica.fecha_fin > fecha_actual
                )
            ).update({"estado": EstadoActividadEnum.EN_PROGRESO})

            # Actualizar a FINALIZADO
            db.query(ActividadAcademica).filter(
                and_(
                    ActividadAcademica.estado != EstadoActividadEnum.FINALIZADO,
                    ActividadAcademica.fecha_fin <= fecha_actual
                )
            ).update({"estado": EstadoActividadEnum.FINALIZADO})

            db.commit()
    
    def obtener_actividades(self):
        with SessionLocal() as db:
            return db.query(ActividadAcademica).all()
        
    def obtener_actividad(self, id: int):
        with SessionLocal() as db:
            return db.query(ActividadAcademica).filter(ActividadAcademica.id == id).first()
        
    def crear_actividad(self, actividad):
        with SessionLocal() as db:
            db_actividad = ActividadAcademica(**actividad.dict())
            db.add(db_actividad)
            db.commit()
            db.refresh(db_actividad)
            return db_actividad
        
    def actualizar_actividad(self, id: int, actividad):
        with SessionLocal() as db:
            db.query(ActividadAcademica).filter(ActividadAcademica.id == id).update(actividad.dict())
            db.commit()
            return db.query(ActividadAcademica).filter(ActividadAcademica.id == id).first()
        
    def eliminar_actividad(self, id: int):
        with SessionLocal() as db:
            actividad = db.query(ActividadAcademica).filter(ActividadAcademica.id == id).first()
            if actividad:
                db.delete(actividad)
                db.commit()
                return True
            else:
                return False
            
    def obtener_actividades_por_asignatura(self, id: int):
        with SessionLocal() as db:
            return db.query(ActividadAcademica).filter(ActividadAcademica.asignatura_id == id).all()
            