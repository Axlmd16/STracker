from models.ActividadAcademica import ActividadAcademica
from core.database import SessionLocal


class ActividadControl:
    def __init__(self):
        pass   
    
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