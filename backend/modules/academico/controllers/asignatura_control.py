from models.Asignatura import Asignatura
from core.database import DatabaseEngine


class AsignaturaControl:
    def __init__(self):
        pass
    
    def obtener_asignaturas(self):
        with DatabaseEngine.get_session() as db:
            return db.query(Asignatura).all()
        
    def obtener_asignatura(self, id: int):
        with DatabaseEngine.get_session() as db:
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def crear_asignatura(self, asig):
        with DatabaseEngine.get_session() as db:
            db_asignatura = Asignatura(**asig.dict())
            db.add(db_asignatura)
            db.commit()
            db.refresh(db_asignatura)
            return db_asignatura
        
    def actualizar_asignatura(self, id: int, asig):
        with DatabaseEngine.get_session() as db:
            db.query(Asignatura).filter(Asignatura.id == id).update(asig.dict())
            db.commit()
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def eliminar_asignatura(self, id: int):
        with DatabaseEngine.get_session() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                db.delete(asignatura)
                db.commit()
                return True
            else:
                return False
            
    # def validar_estudiante_en_asignatura(self, estudiante, asignatura):
    #     for e in asignatura.estudiantes:
    #         if e.id == estudiante.id:
    #             raise HTTPException(status_code=400, detail="Estudiante ya se encuentra en la asignatura")
    #         return True
            


    def obtener_detalles(self, id: int): 
        with DatabaseEngine.get_session() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                nro_estudiantes = len(asignatura.estudiantes)
                nro_tareas = len(asignatura.actividades_academicas)
                
                return {"nro_estudiantes": nro_estudiantes,
                        "nro_tareas": nro_tareas}
                    