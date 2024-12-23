from models import Asignatura, Usuario
from core.database import SessionLocal
from fastapi import HTTPException


class AsignaturaControl:
    def __init__(self):
        pass
    
    def obtener_asignaturas(self):
        with SessionLocal() as db:
            return db.query(Asignatura).all()
        
    def obtener_asignatura(self, id: int):
        with SessionLocal() as db:
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def crear_asignatura(self, asignatura):
        with SessionLocal() as db:
            db_asignatura = Asignatura(**asignatura.dict())
            db.add(db_asignatura)
            db.commit()
            db.refresh(db_asignatura)
            return db_asignatura
        
    def actualizar_asignatura(self, id: int, asignatura):
        with SessionLocal() as db:
            db.query(Asignatura).filter(Asignatura.id == id).update(asignatura.dict())
            db.commit()
            return db.query(Asignatura).filter(Asignatura.id == id).first()
        
    def eliminar_asignatura(self, id: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id).first()
            if asignatura:
                db.delete(asignatura)
                db.commit()
                return True
            else:
                return False
            
    def validar_estudiante_en_asignatura(self, estudiante, asignatura):
        for e in asignatura.estudiantes:
            if e.id == estudiante.id:
                raise HTTPException(status_code=400, detail="Estudiante ya se encuentra en la asignatura")
            return True
            
    
    def agregar_estudiante_asignatura(self, id_asignatura: int, id_estudiante: int):
        with SessionLocal() as db:
            asignatura = db.query(Asignatura).filter(Asignatura.id == id_asignatura).first()
            estudiante = db.query(Usuario).filter(Usuario.id == id_estudiante).first()
            
            if estudiante and asignatura:
                if self.validar_estudiante_en_asignatura(estudiante, asignatura):
                    asignatura.estudiantes.append(estudiante)
                    db.commit()
                    return True
                
            
    