from models.Asignacion import AsignacionTest
from core.database import SessionLocal

class AsignacionTestController:
    def __init__(self):
        pass

    def obtener_all_asignaciones(self):
        with SessionLocal() as db:
            return db.query(AsignacionTest).all()

    def obtener_asignacion(self, id: int):
        with SessionLocal() as db:
            return db.query(AsignacionTest).filter(AsignacionTest.id == id).first()

    def crear_asignacion(self, asignacion):
        with SessionLocal() as db:
            db_asignacion = AsignacionTest(**asignacion.dict())
            db.add(db_asignacion)
            db.commit()
            db.refresh(db_asignacion)
            return db_asignacion

    def modificar_asignacion(self, id: int, asignacion):
        with SessionLocal() as db:
            db_asignacion = db.query(AsignacionTest).filter(AsignacionTest.id == id).first()
            if db_asignacion:
                for key, value in asignacion.dict(exclude_unset=True).items():
                    setattr(db_asignacion, key, value)
                db.commit()
                db.refresh(db_asignacion)
                return db_asignacion
            return None

    def eliminar_asignacion(self, id: int):
        with SessionLocal() as db:
            db_asignacion = db.query(AsignacionTest).filter(AsignacionTest.id == id).first()
            if db_asignacion:
                db.delete(db_asignacion)
                db.commit()
                return True
            return False
